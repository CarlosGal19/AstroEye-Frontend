"use client";

import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import PointData from "../Modal/ModalData";
import axiosInstance from "../../config/axios";

export default function CustomGlobe({ imageUrl, points }) {

    const globeRef = useRef(null);
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [pointData, setPointData] = useState(null);

    useEffect(() => {
        if (!globeRef.current) return;

        const controls = globeRef.current.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.25;
    }, []);

    const colorOptions = ['#4B2E3A', '#1A1F71', '#2F4F4F', '#3B0A45', '#264653'];

    const mappedPoints = points.map(p => ({
        ...p,
        imageTitle: p.imageTitle,
        lat: p.pointLat,
        lng: p.pointLng,
        color: colorOptions[Math.floor(Math.random() * colorOptions.length)]
    }));

    const handlePointClick = async (point) => {
        setSelectedPoint(point);

        // const res = await fetch(`/api/pointData?pointId=${point.pointId}`);
        // const res = await fetch(`http://localhost:4000/points/${point.pointId}`);
        // const data = await res.json();
        const data = await axiosInstance.get(`/points/${point.pointId}`);
        console.log(data.data);
        setPointData(data.data);
    };

    return (
        <div className="overflow-hidden w-full h-11/12">
            <Globe
                ref={globeRef}
                globeImageUrl={imageUrl}
                backgroundImageUrl="/background/8k_stars_milky_way.jpg"
                pointsData={mappedPoints}
                pointAltitude={0.025}
                pointRadius={2}
                pointColor="color"
                pointResolution={16}
                pointsTransitionDuration={500}
                pointLabel="imageTitle"
                onPointClick={handlePointClick}
            />

            {selectedPoint && pointData && (
                <PointData pointData={pointData} setPointData={setPointData} setSelectedPoint={setSelectedPoint} />
            )}

        </div>
    );
}
