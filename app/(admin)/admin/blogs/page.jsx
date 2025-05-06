"use client";

import { DeleteBlogBySlug, GetBlogs } from "@/actions/blogs";
import { DeleteProjectBySlug, GetProjects } from "@/actions/projects";
import BlogCard from "@/components/Blogs/BlogCard";
import ProjectCard from "@/components/Projects/ProjectCard";
import { PlusIcon, LoaderCircleIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Blogs() {

    const [blogs,setBlogs] = useState(null);

    useEffect(()=>{
        const get = async()=>{
            const data = JSON.parse(await GetBlogs());
            setBlogs(data.blogs);
        }
        get();
    },[])

    const deleteBlog = async (slug) => {
        const confirmDelete = confirm("Are you sure you want to delete this Blog?");
        if (!confirmDelete) return;

        const data = JSON.parse(await DeleteBlogBySlug(slug));
        if (data.success) {
            setBlogs((prev) => prev.filter((blog) => blog.slug !== slug));
            alert("Deleted Successfully");
        } else {
            alert("Not able to delete!! Refresh and try again!!");
        }
    };

    if(!blogs)return(
        <div className="w-full h-full flex justify-center items-center">
            <LoaderCircleIcon className="animate-spin text-black dark:text-white size-20"/>
        </div>
    )

    return (
        <div className="w-full min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-4">
            <div className="">
                <Link
                    href={'/admin/blogs/new'}
                    className="flex flex-row items-center bg-zinc-300 dark:bg-zinc-700 text-black dark:text-white w-max p-2 rounded-lg ml-auto font-bold transition-all duration-200 active:scale-75"
                >
                    <PlusIcon/>
                    Add Blog
                </Link>
            </div>
            {!blogs.length && 
                <span 
                    className="text-2xl font-bold"
                >No Blogs Yet</span>
            }
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog, index) => (
                    <BlogCard 
                        key={index}
                        blog={blog} 
                        admin={true}
                        deleteBlog={deleteBlog}
                    />
                ))}
            </div>
        </div>
    );
}