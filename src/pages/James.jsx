import ImageCard from "../components/Images/Card";
import { useEffect, useState } from "react";
import axiosInstance from "../config/axios";

export default function James() {

    const [images, setImages] = useState([]);

    useEffect(() => {
        async function fetchImages() {
            const data = await axiosInstance.get('/images/images/james_webb');
            setImages(data.data);
        }
        fetchImages();
    }, []);

    return (
        <main className="p-6">
            <h1 className="text-4xl font-bold text-white text-center my-10">
                Most Viewed Images
            </h1>

            {images && images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {images.map((image) => (
                        <ImageCard key={image.imageId} image={image} />
                    ))}
                </div>
            ) : (
                <p className="text-center mt-10 text-gray-400">
                    No images available.
                </p>
            )}
        </main>
    );
}
