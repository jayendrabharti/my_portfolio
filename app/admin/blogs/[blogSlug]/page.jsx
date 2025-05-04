"use client";

import { Code, LoaderCircleIcon } from "lucide-react";
import BlogForm from "@/components/Admin/BlogForm";
import { GetBlogBySlug, UpdateBlogBySlug } from "@/actions/blogs";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Blog() {
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const { blogSlug } = useParams();
 
  useEffect(() => {
    const get = async () => {
      const data = JSON.parse(await GetBlogBySlug(blogSlug));
      const b = {...data.blog, datetime: new Date(data.blog.datetime).toISOString().split('T')[0].toString()}
      setBlog(b);
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

  if (!blog)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoaderCircleIcon className="animate-spin text-black dark:text-white size-20" />
      </div>
    );

  return (
    <div className="w-full py-10 px-4">
      <header className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center gap-3">
          <Code size={32} className="text-zinc-600 dark:text-zinc-300" />
          <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">
            Blog Showcase
          </h1>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          Submit your blog to be featured in our developer showcase.
        </p>
      </header>

      <div className="max-w-3xl mx-auto">
        <BlogForm initialValues={blog} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
