import { cn } from "@/libs/cn";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import RevealHero from "../animations/RevealHero";
import Reveal from "../animations/Reveal";

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
                
                <RevealHero bgColor="bg-cyan-400">
                <span className="text-3xl md:text-5xl font-bold">
                    Hi, I'm&nbsp;
                    <span
                        className={cn(
                            "inline-block w-max bg-clip-text text-transparent",
                            "bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent"
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
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                        Contact Me
                    </Link>
                    <Link href={'/projects'} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                        View my Work
                    </Link>
                </div>
                </Reveal>

            </div>

            <Reveal className="order-1 md:order-2">
                <Link href={`https://github.com/${username}`}>
                <Image
                    src={`https://github.com/${username}.png`}
                    alt={username}
                    width={150}
                    height={150}
                    className={"cursor-pointer w-20 md:w-40 ml-1 md:ml-auto rounded-xl"}
                />
                </Link>
            </Reveal>

        </section>
    );
}