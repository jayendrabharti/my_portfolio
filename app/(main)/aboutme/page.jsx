"use client";
import { cn } from "@/libs/cn";
import Balancer from "react-wrap-balancer";
import Image from "next/image";
import TechStack from "@/components/TechStack";
import RevealHero from "@/components/animations/RevealHero";
import Reveal from "@/components/animations/Reveal";

const username = "jayendrabharti"

export default function AboutMe() {
    return (
        <>
        
        <section
            id="about-section"
            className={cn(
                "flex flex-col gap-4 text-left p-10 mx-auto max-w-4xl",
            )}
        >
            <div>
                
                <RevealHero>
                <span className="text-3xl md:text-5xl font-bold">
                    About me
                </span>
                </RevealHero>

                <Reveal>
                <p className="mt-4 text-zinc-400">
                    <Balancer>
                    A Full-Stack Developer passionate about building fast, modern, and
                    user-friendly web apps. Let's turn ideas into functional digital
                    experiences.
                    </Balancer>
                </p>
                </Reveal>

            </div>
        </section>
        
        <TechStack/>
        </>
    );
}