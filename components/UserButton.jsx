"use client";

import { cn } from "@/libs/cn";
import { LogOut, UserLockIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export default function UserButton({className=""}){

    const { data: session } = useSession();
    const [menuOpen,setMenuOpen] = useState(false);

if(session)
return (
    <div className="relative">
        <Image
            src={session.user.image}
            alt={session.user.email}
            width={50}
            height={50}
            className={cn(
                "rounded-full size-10 cursor-pointer border",
                "border-gray-300 dark:border-gray-700",
                className
            )}
            onClick={() => setMenuOpen((prev) => !prev)}
        />
        <div
            className={cn(
                "absolute top-full right-full mt-2 w-48 bg-white dark:bg-zinc-800",
                "shadow-lg rounded-lg p-4 z-[100] border",
                "border-zinc-200 dark:border-zinc-700",
                "duration-200 transition-transform",
                menuOpen ? "scale-100 translate-y-0 translate-x-0" : "scale-0 -translate-y-1/2 translate-x-1/2"
            )}
        >
            <span className="block text-zinc-900 dark:text-zinc-100 font-medium">
                {session.user.name}
            </span>
            
            <span className="block text-zinc-600 dark:text-zinc-400 text-sm">
                {session.user.email}
            </span>

            <Link 
                href={'/admin'}
                onClick={()=>setMenuOpen(false)}
                className="flex flex-row items-center justify-between w-full dark:bg-zinc-900 bg-zinc-200 p-2 mt-4 rounded-lg duration-200 transition-all active:scale-75 group hover:ring-4 hover:ring-zinc-600"
            >
                Admin Dashboard
                <UserLockIcon className="duration-200 transition-all mr-2 group-hover:mr-0"/>
            </Link>

            <button 
                onClick={()=>{
                    signOut();
                    setMenuOpen(false);
                }}
                className="flex flex-row items-center justify-between w-full dark:bg-zinc-900 bg-zinc-200 p-2 mt-4 rounded-lg duration-200 transition-all active:scale-75 group hover:ring-4 hover:ring-zinc-600"
            >
                Sign Out
                <LogOut className="duration-200 transition-all mr-2 group-hover:mr-0"/>
            </button>

        </div>
    </div>
);}