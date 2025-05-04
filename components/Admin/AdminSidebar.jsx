"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { HomeIcon, MessageCircleIcon, PencilRulerIcon, ScrollTextIcon, Users2Icon } from "lucide-react"

export default function AdminSidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const [isCollapsed, setIsCollapsed] = useState(false)

    const isActive = (path) => {
        if (path === "/admin") {
            return pathname === "/admin"
        }
        return pathname.startsWith(path)
    }

    const handleLogout = () => {
        localStorage.removeItem("isAdminLoggedIn")
        router.push("/admin/login")
    }

    const SideBarLinks = [
        {name: "Dashboard", href: "/admin", icon: HomeIcon},
        {name: "Blogs", href: "/admin/blogs", icon: ScrollTextIcon},
        {name: "Projects", href: "/admin/projects", icon: PencilRulerIcon},
        {name: "Testimonials", href: "/admin/testimonials", icon: Users2Icon},
        {name: "Messages", href: "/admin/messages", icon: MessageCircleIcon},
    ];

    return (
        <aside
            className={`bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 ${
                isCollapsed ? "w-16" : "w-64"
            } transition-all duration-300 hidden md:block`}
        >
            <div className="p-4 flex justify-between items-center">
                {!isCollapsed && <h2 className="text-xl font-bold">Admin Panel</h2>}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {isCollapsed ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 5l7 7-7 7M5 5l7 7-7 7"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                            />
                        )}
                    </svg>
                </button>
            </div>

            <nav className="mt-6">
                <ul className="space-y-2">
                    {SideBarLinks.map((link,index)=>(
                        <li key={index}>
                        <Link
                            href={link.href}
                            className={`flex items-center px-4 py-2 ${
                                isActive(link.href) && pathname === link.href
                                ? "bg-zinc-200 dark:bg-zinc-700"
                                : "hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                } transition-colors`}
                                >
                            <link.icon className="mr-2"/>
                            {!isCollapsed && <span>{link.name}</span>}
                        </Link>
                    </li>
                    ))}
                </ul>
            </nav>

        </aside>
    )
}
