import HeroSection from "@/components/Home/HeroSection";
import Projects from "../projects/page";
import Blogs from "../blogs/page";
import TechStack from "@/components/TechStack";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
return(<>

<HeroSection/>
{/* 
<TechStack/> */}

<Projects/>
    <Link 
        href={'/projects'}
        className="mx-auto flex flex-row items-center text-zinc-600 dark:text-zinc-400 hover:text-black hover:dark:text-white font-bold gap-1"
    >
        <ChevronDown/>
        View All Projects
    </Link>

<Blogs/>
    <Link 
        href={'/blogs'}
        className="mx-auto flex flex-row items-center text-zinc-600 dark:text-zinc-400 hover:text-black hover:dark:text-white font-bold gap-1"
    >
        <ChevronDown/>
        View All Blogs
    </Link>

</>)}