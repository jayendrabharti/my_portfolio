"use client";

import { useEffect, useState } from "react";

export default function BlogViews({ slug, increment=false}) {
    const [views,setViews] = useState("---");
    const [error,setError] = useState(null);
    
    useEffect(()=>{
        const get = async()=>{
            try {
                const response = await fetch(`/api/blogs/views/${slug}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ increment: increment}),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch views");
                }
                const data = await response.json();
                setViews(data.views);
            } catch (err) {
                setError(err.message);
            }
        };
        get();
    },[])
    
    if(error)return "Error";
    return views;
}