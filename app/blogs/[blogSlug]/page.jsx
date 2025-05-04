"use client";

import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.bubble.css";

import { cn } from "@/libs/cn";
import { ArrowLeftIcon, Eye, EyeIcon, LoaderCircleIcon } from "lucide-react";
import { GetBlogBySlug } from "@/actions/blogs";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { formatTimestamp } from "@/utils/common";

export default function Blog() {
  const [blog, setBlog] = useState(null);
  const { blogSlug } = useParams();
 
  useEffect(() => {
    const get = async () => {
      const data = JSON.parse(await GetBlogBySlug(blogSlug));
      const b = {...data.blog, datetime: new Date(data.blog.datetime).toISOString().split('T')[0].toString()}
      setBlog(b);
      console.log(b);
    };

    get();
  }, []);

  const containerRef = useCallback((container)=>{
    if(!container || !blog)return;

    container.innerHTML = "";
    const editor = document.createElement('div');
    container.append(editor);
    const q = new Quill(editor, {
      readOnly: true,
      theme: "snow",
      modules: { 
        syntax: { hljs },
        toolbar: false 
      },
    });
    q.setContents(blog.content);
  },[blog]);


  if (!blog)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoaderCircleIcon className="animate-spin text-black dark:text-white size-20" />
      </div>
    );

  return(
    <section
        id="blog-section"
        className={cn(
            "flex flex-col gap-6 p-10 mx-auto max-w-4xl relative",
        )}
    >
      <span className="text-3xl md:text-5xl font-extrabold">
        {blog.title}
      </span>

      <div className="flex flex-row items-center gap-2 text-zinc-600 dark:text-zinc-400"> 
          <Image
            src={`https://github.com/jayendrabharti.png`}
            alt={"jayendrabharti"}
            width={150}
            height={150}
            onClick={() => window.open(`https://github.com/jayendrabharti`)}
            className={"cursor-pointer size-6 rounded-full"}
            />
          <span 
            className="font-semibold"
          >Jayendra Bharti / {formatTimestamp(blog.datetime,2)}</span>

          <EyeIcon className="ml-auto"/>
          <span className="text-zinc-500">{blog.views} views</span>
      </div>

      <Image
        src={blog.coverImage}
        alt="coverImage"
        width={500}
        height={500}
        className="w-full"
      />

      <div 
        id="container"
        className="container w-full border-t-2 border-zinc-300 dark:border-zinc-700 pt-10" 
        ref={containerRef}
      />

    </section>
  )
}
