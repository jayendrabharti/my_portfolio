"use client";
import { PenSquare } from "lucide-react";
import BlogForm from "@/components/Admin/BlogForm";
import { CreateBlog } from "@/actions/blogs";
import { useRouter } from "next/navigation";

export default function NewBlogs() {
 
    const router = useRouter();

    const handleSubmit = async(values) => {
        const res = JSON.parse(await CreateBlog(values));
        console.log(res);
        if(res.success){
            alert("Blog submitted successfully!");
            router.push('/admin/blogs')
        }else{
            alert("Blog not created! Refresh and retry!!");
        }
    }

    return (
        <div className="w-full min-h-screen bg-zinc-100 dark:bg-zinc-900 py-10 px-4">
            <header className="max-w-3xl mx-auto mb-8">
                <div className="flex items-center gap-3">
                    <PenSquare size={32} className="text-zinc-600 dark:text-zinc-300" />
                    <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">
                        Blog Management
                    </h1>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                    Create and manage your blog posts with ease.
                </p>
            </header>

            <div className="max-w-3xl mx-auto">
                <BlogForm
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}