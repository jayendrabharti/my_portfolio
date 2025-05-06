"use client";

import { cn } from "@/libs/cn";
import { anurati } from "@/utils/fonts";
import { HomeIcon, Users2Icon, MessageCircleIcon, InfoIcon, Menu, PencilRulerIcon, ScrollTextIcon, UsersIcon, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "../ThemeSwitch";
import { useState } from "react";
import UserButton from "../UserButton";

export const NavBarLinks = [
  {name: "Dashboard", href: "/admin", icon: HomeIcon},
  {name: "Blogs", href: "/admin/blogs", icon: ScrollTextIcon},
  {name: "Projects", href: "/admin/projects", icon: PencilRulerIcon},
  {name: "Testimonials", href: "/admin/testimonials", icon: Users2Icon},
  {name: "Messages", href: "/admin/messages", icon: MessageCircleIcon},
];

export default function AdminNavBar() {

  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  
  return (
    <nav
      className={cn(
        `w-full`,
        `border-b-2 border-zinc-300 dark:border-zinc-800`,
        `sticky top-0 left-0 z-50`,
        `py-4 flex flex-row items-center`,
        `transition-all duration-200`,
        expanded ? "bg-zinc-200 dark:bg-zinc-800" : "bg-zinc-100 dark:bg-zinc-900",        
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between",
          "mx-auto px-10",
          "w-full max-w-4xl",
        )}
      >
        <Link
          href="/"
          className={cn(
            anurati.className,
            "text-2xl font-bold cursor-pointer",
          )}
        >
          JB
        </Link>

        <div
          className={cn(
            `flex flex-col md:flex-row`,
            `items-start md:items-center justify-end`,
            `gap-3 md:gap-1.5`,
            `top-full w-full left-0`,
            "py-4 px-10 md:p-0",
            "absolute md:static",
            "transition-all duration-200",
            expanded ? "scale-y-100 translate-y-0" : "-translate-y-1/2 scale-y-0 md:scale-y-100 md:translate-y-0",
            expanded && "bg-zinc-200 dark:bg-zinc-800",
           `border-b-2 md:border-0 border-zinc-300 dark:border-zinc-500`,

          )}
        >
          {NavBarLinks.map((link, index) => {
            const active = pathname === link.href;
            return (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  "px-1.5 py-1 rounded-md",
                  "transition-colors duration-200",
                  "hover:bg-white dark:hover:bg-black font-semibold",
                  "flex flex-row items-center",
                  active ? "text-cyan-500" : "text-zinc-400 hover:text-cyan-700",
                  "w-full md:w-max md:text-sm text-md"
                )}
                onClick={()=>setExpanded(false)}
              >
                <link.icon className="inline-block mr-1" size={14} />
                {link.name}
              </Link>
            );
          })}
          
          <div  className={"ml-auto md:ml-0 flex flex-row"} >
            <UserButton/>
            <ThemeSwitch/>
          </div>

        </div>

        <button
          onClick={(e) => {
            setExpanded((prev) => !prev);
            e.stopPropagation();
          }}
          className="flex md:hidden active:scale-50 transition-all duration-200"
        >
          {expanded 
          ? 
          <X className="size-8 transition-all duration-100" /> 
          : 
          <Menu className="size-8 transition-all duration-100" />
          }
        </button>

      </div>
    </nav>
  );
}
