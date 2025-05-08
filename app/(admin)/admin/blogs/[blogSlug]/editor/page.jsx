"use client";

import { LoaderCircleIcon } from "lucide-react";
import { GetBlogBySlug, UpdateBlogBySlug } from "@/actions/blogs";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BlogEditor from "@/components/Blogs/BlogEditor";
import { cn } from '@/libs/cn';

export default function EditBlog() {

    const { blogSlug } = useParams();
    
    const router = useRouter();
    
    const [blog, setBlog] = useState(null);
    const [content,setContent] = useState(null);
    const [displayContent,setDisplayContent] = useState("");
    const [loading,setLoading] = useState(true);
 
  useEffect(() => {
    const get = async () => {
        const data = JSON.parse(await GetBlogBySlug(blogSlug));
        const b = {...data.blog, datetime: new Date(data.blog.datetime).toISOString().split('T')[0].toString()}
        setBlog(b);
        setContent(b.content);
        setDisplayContent(b.displayContent);
        setLoading(false);    
    };

    get();
  }, []);

  const handleSubmit = async (values) => {
    console.log("Form submitted with values:", values);
    const res = JSON.parse(await UpdateBlogBySlug(blogSlug, values));
    console.log(res);
    if (res.success) {
      alert("Blog updated successfully!");
      router.push("/admin/blogs");
    } else {
      alert("Blog not updated!");
    }
  };

  const save = async()=>{
    await handleSubmit({content: content, displayContent: displayContent});
  }

  if (loading)
    return (
      <div className={cn(
        "w-full h-full flex justify-center items-center",
      )}>
        <LoaderCircleIcon className="animate-spin text-black dark:text-white size-20" />
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto py-3 px-4 flex flex-col relative">
        <span className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 flex flex-row items-center mb-2">
            {blog.title}
        </span>

        <div className="flex bg-zinc-100 dark:bg-zinc-900">
            <button
                className="bg-blue-500 px-4 py-1 rounded-full font-bold hover:ring-4 ring-blue-800 duration-100 transition-all z-50 active:scale-75 ml-auto m-3 text-white"
                onClick={save}
            >
                Save
            </button>
        </div>

        <div className="max-w-3xl mx-auto text-black dark:text-white">
          <BlogEditor 
              content={content}
              setContent={setContent}
              setDisplayContent={setDisplayContent}
          />
        </div>
    </div>
  );
}
