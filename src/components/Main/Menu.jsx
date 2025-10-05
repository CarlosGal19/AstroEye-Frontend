import "@google/model-viewer";
import FixedGlobe from "../Globes/FixedGlobe";
import '@google/model-viewer'; // Import the web component
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Menu({ sites }) {

    const navigate = useNavigate();
    const modelViewerRef = useRef(null);

    useEffect(() => {
        if (modelViewerRef.current) {
            modelViewerRef.current.addEventListener('load', () => {
                console.log('Model loaded!');
            });
        }
    }, []);

    return (
        <main className="h-full flex flex-col items-center justify-center relative">

            <h1 className="text-6xl text-[#ededed] text-center m-12">Choose an option for starting</h1>
            <div className="w-full h-5/6 overflow-hidden flex justify-evenly items-center">
                {sites.map((globe) => (
                    <div
                        key={globe.siteId}
                        className={`
                  flex flex-col items-center w-1/5
                  transform transition-all duration-700
                  cursor-pointer
                `}
                        onClick={() => navigate(`/site/${globe.siteId}`)}
                    >
                        <FixedGlobe globeImg={globe.imageUrl} site={globe.name} />
                    </div>
                ))}
                <div className="flex flex-col items-center w-1/5">
                    <div
                        className="hover:scale-105 transform transition-all duration-700 cursor-pointer"
                        onClick={() => navigate(`/james`)}
                    >
                        <model-viewer
                            ref={modelViewerRef}
                            alt="James Webb Space Telescope"
                            src="/james/James Webb Space Telescope (B).glb" // Cambia por tu ruta
                            ar
                            auto-rotate
                            disable-zoom
                            shadow-intensity="1"
                            environment-image="neutral"
                            style={{ width: "500px", height: "350px" }}
                        />
                    </div>
                    <h2 className="text-2xl text-[#ededed] text-center">Taken photos with JamesWebb</h2>
                </div>
            </div>
        </main>
    );
}
