"use client";
import { cn } from "@/libs/cn";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import Reveal from "./animations/Reveal";
import RevealHero from "./animations/RevealHero";

const TechList = [
    { name: "HTML", imageSrc: "/svg/html.svg" },
    { name: "CSS", imageSrc: "/svg/css.svg" },
    { name: "JavaScript", imageSrc: "/svg/javascript.svg" },
    { name: "Tailwind CSS", imageSrc: "/svg/tailwind.svg" },
    { name: "React JS", imageSrc: "/svg/reactjs.svg" },
    { name: "Vite", imageSrc: "/svg/vite.svg" },
    { name: "Node JS", imageSrc: "/svg/nodejs.svg" },
    { name: "Firebase", imageSrc: "/svg/firebase.svg" },
    { name: "Vercel", imageSrc: "/svg/vercel.svg" },
    { name: "Next JS", imageSrc: "/svg/nextjs.svg" },
    { name: "Sanity.io", imageSrc: "/svg/sanity.svg" },
    { name: "C", imageSrc: "/svg/c.svg" },
    { name: "C++", imageSrc: "/svg/cplusplus.svg" },
    { name: "Electron", imageSrc: "/svg/electron.svg" },
    { name: "Express.js", imageSrc: "/svg/express.svg" },
    { name: "GitHub", imageSrc: "/svg/github.svg" },
    { name: "Google Cloud", imageSrc: "/svg/googlecloud.svg" },
    { name: "MongoDB", imageSrc: "/svg/mongodb.svg" },
    { name: "MySQL", imageSrc: "/svg/mysql.svg" },
    { name: "NPM", imageSrc: "/svg/npm.svg" },
    { name: "PostgreSQL", imageSrc: "/svg/postgresql.svg" },
    { name: "Postman", imageSrc: "/svg/postman.svg" },
    { name: "Python", imageSrc: "/svg/python.svg" },
    { name: "Railway", imageSrc: "/svg/railway.svg" },
    { name: "Socket.io", imageSrc: "/svg/socketio.svg" },
    { name: "Supabase", imageSrc: "/svg/supabase.svg" },
    { name: "Three.js", imageSrc: "/svg/threejs.svg" },
    { name: "TypeScript", imageSrc: "/svg/typescript.svg" },
    { name: "Cloudflare", imageSrc: "/svg/cloudflare.svg" }
];

export default function TechStack() {
    const [expanded, setExpanded] = useState(false);

    return (
        <section
            id="tech-stack-section"
            className={cn(
                "p-10 mx-auto max-w-4xl flex flex-col",
            )}
        >   
            <RevealHero>
            <span className="text-3xl md:text-5xl font-bold mb-10">
                Tech I use
            </span>
            </RevealHero>

            <div 
                className=" flex flex-row justify-center items-center flex-wrap gap-5"
            >
            {(expanded ? TechList : TechList.slice(0, 12)).map((tech, index) => (
                <Reveal
                    key={index}
                    className="group p-2 md:p-4 flex flex-col justify-between items-center rounded-2xl aspect-square text-center gap-2"
                    type="scaleOut"
                >
                    <img
                        src={tech.imageSrc}
                        alt={tech.name}
                        className="size-10 md:size-20 group-hover:scale-150 group-hover:-translate-y-1/4 transition-all duration-200"
                    />
                    <span
                        className="font-bold w-full text-xs md:text-md"
                        >{tech.name}</span>
                </Reveal>
            ))}
            </div>

            <button
                onClick={() =>{ 
                    setExpanded(prev=>{
                        if(!prev){
                            document.getElementById("tech-stack-section").scrollIntoView({behavior:"smooth"})
                        }
                        return !prev;
                    });
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl w-max mx-auto mt-8"
            >
                {expanded? <ChevronUp/> : <ChevronDown />}
                {expanded ? "Show Less" : "Show More"}
            </button>
        </section>
    );
}