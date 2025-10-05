import Menu from "../components/Main/Menu";
import { useEffect, useState } from "react";
import axiosInstance from "../config/axios";

export default function MainMenu() {

    const [globes, setGlobes] = useState([]);

    useEffect(() => {
        async function fetchSites() {
            const response = await axiosInstance.get('/sites');
            setGlobes(response.data);
        }
        fetchSites();
    }, []);

    return (
        <Menu sites={globes} />
    );
}
