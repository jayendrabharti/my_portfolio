"use client";
import { cn } from "@/libs/cn"
import { useState, useEffect } from "react";
import { LoaderCircleIcon } from "lucide-react";
import BlogCard from "@/components/Blogs/BlogCard";
import { GetBlogs } from "@/actions/blogs";
import { useRouter } from "next/navigation";
export default function Blogs(){

    const router = useRouter();
    const [blogs,setBlogs] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        const get = async()=>{
            try{
                const data = JSON.parse(await GetBlogs());
                if(data.success){
                    setBlogs(data.blogs);
                    setLoading(false);
                }else{
                    setError(data.error);
                    setLoading(false);
                }
            }catch(err){
                setError(err);
                setLoading(false);
            }
        }
        get();
    },[])

    if(loading)return(
        <div className="flex w-full h-full items-center justify-center">
            <LoaderCircleIcon className="size-20 animate-spin"/>
        </div>
    )

    if(error)return(
        <div className="flex w-full h-full items-center justify-center">
            <span className="text-xl font-bold">{error}</span>
        </div>
    )


    return(
        <section
            id="blog-section"
            className={cn(
                "gap-4 items-center text-left p-10 mx-auto max-w-4xl",
            )}
        >
            {!blogs.length && 
                <span 
                    className="text-2xl font-bold"
                >No Blogs Yet</span>
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {blogs.map((blog, index) => (
                    <BlogCard 
                        key={index} 
                        blog={blog} 
                    />
                ))}
            </div>

        </section>
    )
}