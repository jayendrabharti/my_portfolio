"use client";
import { cn } from "@/libs/cn";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import Reveal from "./animations/Reveal";
import RevealHero from "./animations/RevealHero";
import { TechList } from "@/data/MyData";

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