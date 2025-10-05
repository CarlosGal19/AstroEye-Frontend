import CustomGlobe from "../components/Globes/CustomGlobe";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../config/axios";

export default function Site() {

    const params = useParams();
    const siteId = Number(params.siteId);

    const [siteData, setSiteData] = useState(null);
    const [sitePoints, setSitePoints] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await axiosInstance.get(`/sites/${siteId}`);
            const fetchedSiteData = data.data;
            setSiteData(fetchedSiteData);

            const data_2 = await axiosInstance.get(`/points/site/${siteId}`);
            const pointsResult = data_2.data["points"];
            const fetchedPoints = Array.isArray(pointsResult) ? pointsResult : [];
            setSitePoints(fetchedPoints);

        }
        fetchData();
    }, [siteId]);


    return (
        <CustomGlobe imageUrl={siteData?.imageBase64 || ""} points={sitePoints} />
    )
}
