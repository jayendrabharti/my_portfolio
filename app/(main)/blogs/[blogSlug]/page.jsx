import "highlight.js/styles/atom-one-dark.css";
import "quill/dist/quill.snow.css";

import { cn } from "@/libs/cn";
import { ArrowLeftIcon, CalendarDaysIcon, EyeIcon } from "lucide-react";
import { GetBlogBySlug, GetBlogs } from "@/actions/blogs";
import Image from "next/image";
import { formatTimestamp } from "@/utils/common";
import Link from "next/link";
import BlogViews from "@/components/Blogs/BlogViews";
import NotFound from "../../not-found";
import { Merriweather } from 'next/font/google';


const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif',
});

export async function generateStaticParams() {
  const { blogs } = JSON.parse(await GetBlogs());
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

export default async function Blog({params}) {

  const { blogSlug } = await params;
  const data = JSON.parse(await GetBlogBySlug(blogSlug));

  if(!data.success)return NotFound();

  const blog = {...data.blog, datetime: new Date(data.blog.datetime).toISOString().split('T')[0].toString()}

  return(
    <section
        id="blog-section"
        className={cn(
            "flex flex-col gap-6 p-5 md:p-10 mx-auto contain-content max-w-4xl relative",
        )}
    >
      <Link href={`/blogs`} className="flex flex-row items-center gap-1 ml-auto bg-zinc-300 dark:bg-zinc-700 px-2 py-1 rounded-full hover:ring-4 ring-zinc-500 active:scale-75 transition-all duration-150">
        <ArrowLeftIcon className="size-5"/>
        Blogs
      </Link>
      <span className="text-2xl md:text-5xl font-extrabold">
        {blog.title}
      </span>

      <div className="flex flex-row items-center gap-2 text-zinc-600 dark:text-zinc-400">
          <Link href={`https://github.com/jayendrabharti`}>
          <Image
            src={`https://github.com/jayendrabharti.png`}
            alt={"jayendrabharti"}
            width={150}
            height={150}
            className={"cursor-pointer aspect-square w-10 rounded-full"}
          />
          </Link> 
          <span 
            className="font-semibold"
          >
            Jayendra Bharti /&nbsp;
            <span className="w-max inline-block">
              {formatTimestamp(blog.datetime,2)}
            </span>
          </span>

          <EyeIcon className="ml-auto"/>
          <span className="text-zinc-500">
            <BlogViews slug={blog.slug} increment={true}/>&nbsp;views
          </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {blog.tags.map((tag,index) => (
        <span
            key={index}
          className={cn(
            "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
            "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
            "transition-colors duration-200 italic",
          )}
        >
          {tag}
        </span>
        ))}
      </div>

      <Image
        src={blog.coverImage}
        alt="coverImage"
        width={500}
        height={500}
        className="w-full"
      />

      <div className="container w-full border-t-2 border-zinc-300 dark:border-zinc-700 pt-6">
        <div className="ql-container ql-snow ql-disabled">
          <div 
            className={`ql-editor ${merriweather.className}`} 
            dangerouslySetInnerHTML={{__html: blog.displayContent}}
          />
        </div>
      </div>

    </section>
  )
}
