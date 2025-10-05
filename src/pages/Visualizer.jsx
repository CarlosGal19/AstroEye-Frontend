import ImageViewer from "../components/Visualizer/ImageViewer";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import axiosInstance from "../config/axios";

export default function Visualizer() {

    const [imageData, setImageData] = useState({});

    const params = useParams();
    const imageId = Number(params.imageId);

    useEffect(() => {
        async function fetchImageData() {
            const data = await axiosInstance.get(`/images/${imageId}`);
            setImageData(data.data);
        }
        fetchImageData();
    }, [imageId]);


    return (
        <ImageViewer title={imageData.title} description={imageData.description} imageUrl={imageData.imageUrl} />
    );
}
