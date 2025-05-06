import Blog from "@/models/blog";
import Message from "@/models/message";
import Project from "@/models/project";
import Link from "next/link"

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {

    const blogCount = await Blog.countDocuments();
    const projectCount = await Project.countDocuments();
    const messageCount = await Message.countDocuments();

    const stats = [
        { label: "Blog Posts", value: blogCount },
        { label: "Projects", value: projectCount },
        { label: "Testimonials", value: 0 },
        { label: "Messages", value: messageCount },
    ]

    return (
            <main className="flex-1 p-6 bg-zinc-50 dark:bg-zinc-900">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">Admin Dashboard</h1>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg shadow-sm">
                                <h2 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">{stat.label}</h2>
                                <p className="text-3xl font-bold mt-2 text-zinc-900 dark:text-zinc-100">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Link
                                href="/admin/blogs/new"
                                className="p-4 bg-zinc-200 dark:bg-zinc-700 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors text-center"
                            >
                                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                </div>
                                <span className="font-medium text-zinc-900 dark:text-zinc-100">New Blog Post</span>
                            </Link>

                            <Link
                                href="/admin/projects/new"
                                className="p-4 bg-zinc-200 dark:bg-zinc-700 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors text-center"
                            >
                                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                        />
                                    </svg>
                                </div>
                                <span className="font-medium text-zinc-900 dark:text-zinc-100">Add Project</span>
                            </Link>

                            <Link
                                href="/admin/testimonials/new"
                                className="p-4 bg-zinc-200 dark:bg-zinc-700 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors text-center"
                            >
                                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                        />
                                    </svg>
                                </div>
                                <span className="font-medium text-zinc-900 dark:text-zinc-100">Add Testimonial</span>
                            </Link>

                            <Link
                                href="/admin/about"
                                className="p-4 bg-zinc-200 dark:bg-zinc-700 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors text-center"
                            >
                                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                                <span className="font-medium text-zinc-900 dark:text-zinc-100">Edit About Me</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
    )
}
