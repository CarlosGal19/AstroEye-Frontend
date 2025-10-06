import ImageCard from "../components/Images/Card";
import { useEffect, useState } from "react";
import axiosInstance from "../config/axios";
import Loader from "../Loading";

export default function Images() {
    const [images, setImages] = useState([]);
    const [showPromptInput, setShowPromptInput] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(true);

    // Load most viewed images initially
    useEffect(() => {
        async function fetchImages() {
            const data = await axiosInstance.get('/images');
            setImages(data.data);
            setLoading(false);
        }
        fetchImages();
    }, []);

    const handlePromptSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setLoading(true);

        try {
            const data = await axiosInstance.get(`/images/images/ai`, {
                params: { prompt }
            });
            console.log(data.data);
            setImages(data.data);
        } catch (error) {
            console.error("Error fetching images from AI:", error);
        } finally {
            setLoading(false);
            setPrompt(""); // clear input
        }
    };

    return (
        <main className="p-6">
            <h1 className="text-4xl font-bold text-white text-center my-10">
                Most Viewed Images
            </h1>

            {/* AI Prompt */}
            <div className="flex flex-col items-center mb-8 w-full max-w-xl mx-auto">
                <p className="text-gray-300 text-center mb-2">
                    Describe what you want to see, and our AI will suggest existing images from the database.
                </p>

                <button
                    onClick={() => setShowPromptInput(!showPromptInput)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-colors duration-200 mb-3 hover:cursor-pointer"
                >
                    {showPromptInput ? "Cancel" : "Search with AI"}
                </button>

                {showPromptInput && (
                    <form onSubmit={handlePromptSubmit} className="flex w-full gap-3">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe what you want to see..."
                            className="flex-1 bg-gray-900 text-gray-200 placeholder-gray-400 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-colors duration-200"
                        >
                            {loading ? "Searching..." : "Search"}
                        </button>
                    </form>
                )}
            </div>

            {/* Images Grid */}
            {loading ? (
                <Loader />
            ) : images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {images.map((image) => (
                        <ImageCard key={image.imageId} image={image} />
                    ))}
                </div>
            ) : (
                <p className="text-center mt-10 text-gray-400">
                    No images found for this prompt. Try another description.
                </p>
            )}
        </main>
    );
}
