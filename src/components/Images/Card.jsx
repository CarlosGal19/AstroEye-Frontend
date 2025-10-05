
import { useState } from "react";
import PointData from "../Modal/ModalData";

export default function ImageCard({ image }) {
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [pointData, setPointData] = useState(null);

    const handleClick = async (point) => {
        setSelectedPoint(point);
        console.log(point);

        // const res = await fetch(`/api/imageData?imageId=${point}`);
        const res = await fetch(`http://localhost:4000/images/cardData/${point}`);
        const data = await res.json();
        console.log(data);
        setPointData(data);
    };

    return (
        <main>
            <div
                className="flex flex-col items-center rounded-xl p-4 w-full max-w-sm hover:scale-105 transition-transform hover:cursor-pointer"
                onClick={() => handleClick(Number(image.imageId))}
            >
                <div className="w-full aspect-square relative">
                    <img
                        src={image.base64}
                        alt={image.title || "Untitled Image"}
                        className="object-contain rounded-lg"
                        width="auto"
                    />
                </div>
                <h2 className="text-lg font-semibold mt-3 text-white text-center">
                    {image.title || ""}
                </h2>
            </div>
            {selectedPoint && pointData && (
                <PointData
                    pointData={pointData}
                    setPointData={setPointData}
                    setSelectedPoint={setSelectedPoint}
                />
            )}
        </main>
    );
}
