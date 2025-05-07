import { cn } from "@/libs/cn";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import RevealHero from "../animations/RevealHero";
import Reveal from "../animations/Reveal";
import { BsGithub } from "react-icons/bs";

export default async function HeroSection() {

    const username = "jayendrabharti";

    return (
        <section
            id="hero-section"
            className={cn(
                "grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center p-10 mx-auto max-w-4xl",
            )} 
        >
            <div className="order-2 md:order-1">
                
                <RevealHero>
                <span className="text-3xl md:text-5xl font-bold">
                    Hi, I'm&nbsp;
                    <span
                        className={cn(
                            "inline-block w-max bg-clip-text text-transparent",
                            "bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent"
                        )}
                    >JAYENDRA BHARTI</span>
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
                
                <Reveal type="scaleOut">
                <div className="mt-6 flex justify-start gap-4">
                    <Link
                        href={'/contact'} 
                        className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-full flex flex-row items-center font-bold transition-all duration-100 active:scale-75"
                        >
                        Contact Me
                    </Link>

                    <Link 
                        href={'/projects'}  
                        className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] transition-all duration-100 active:scale-75"
                    >

                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 px-3 py-1 text-sm font-bold backdrop-blur-3xl text-zinc-600 dark:text-zinc-400 hover:text-black hover:dark:text-white transition-all duration-200">
                                View my Work
                            </span>

                    </Link>
                </div>
                </Reveal>

            </div>

            <Reveal className="order-1 md:order-2">
                <Link 
                    href={`https://github.com/${username}`} 
                    className="w-max block relative rounded-2xl aspect-square overflow-hidden transition-all duration-200 hover:rotate-x-12 hover:-rotate-y-12"
                    target="_blank"
                >
                    <div 
                        className="absolute top-0 left-0 w-full h-full bg-black/50 opacity-0 hover:opacity-100 transition-all duration-200 flex flex-col justify-center items-center"
                    >
                        <BsGithub/>
                    </div>
                    <Image  
                        src={`https://github.com/${username}.png`}
                        alt={username}
                        width={150}
                        height={150}
                        className={"cursor-pointer w-30 md:w-40"}
                    />
                </Link>
            </Reveal>

        </section>
    );
}