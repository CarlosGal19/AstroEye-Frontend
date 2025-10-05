"use client";

import { useEffect, useRef } from "react";
import OpenSeadragon from "openseadragon";

export default function ImageViewer({ imageUrl }) {

    const viewerRef = useRef(null);

    useEffect(() => {
        if (!viewerRef.current) return;

        const viewer = OpenSeadragon({
            element: viewerRef.current,
            prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
            tileSources: imageUrl,
            showNavigator: true,
            navigatorPosition: "TOP_RIGHT",
        });

        return () => viewer.destroy();
    }, [imageUrl]);

    return (
        <div
            ref={viewerRef}
            style={{ width: "100%", height: "600px", backgroundColor: "#000" }}
        />
    );
};
