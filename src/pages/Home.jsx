import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
    const navigate = useNavigate();

    return (
        <div
            className="w-screen h-screen bg-black bg-cover bg-center flex flex-col items-center justify-center text-white"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1950&q=80')",
            }}
        >
            <div className="absolute inset-0 bg-black/70"></div>

            <div className="relative z-10 text-center px-4">
                <h1 className="text-5xl sm:text-6xl font-bold mb-6">
                    Welcome to AstroEye
                </h1>
                <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-8">
                    Explore high-resolution images captured by NASA. Experience the beauty
                    of the universe in an intuitive, fast, and modern way.
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => navigate("/images")}
                        className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 rounded-lg font-semibold shadow-lg shadow-blue-500/50 hover:cursor-pointer"
                    >
                        Explore Images
                    </button>

                    <button
                        onClick={() => navigate("/Menu")}
                        className="bg-purple-600 hover:bg-purple-700 transition-colors px-6 py-3 rounded-lg font-semibold shadow-lg shadow-purple-500/50 hover:cursor-pointer"
                    >
                        Explore Sites
                    </button>
                </div>

            </div>
        </div>
    );
}
