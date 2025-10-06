
import { useState } from "react";
import PointData from "../Modal/ModalData";
import axiosInstance from "../../config/axios";

export default function ImageCard({ image }) {
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [pointData, setPointData] = useState(null);

    const handleClick = async (point) => {
        setSelectedPoint(point);

        const data = await axiosInstance.get(`/images/cardData/${point}`);
        setPointData(data.data);
    };

    return (
        <main>
            <div className="flex flex-col items-center rounded-xl p-4 w-full max-w-sm hover:scale-105 transition-transform hover:cursor-pointer"
                onClick={() => handleClick(Number(image.imageId))}
            >
                <div className="w-2/3 aspect-square overflow-hidden flex items-center justify-center bg-black/20 rounded-lg">
                    <img
                        src={image.base64}
                        alt={image.title || "Untitled Image"}
                        className="object-cover w-full h-full"
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
