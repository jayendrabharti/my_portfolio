import { cn } from "@/libs/cn"
import BlogCard from "@/components/Blogs/BlogCard";
import { GetBlogs } from "@/actions/blogs";

export const dynamic = 'force-dynamic';

export default async function Blogs(){

    const { blogs } = JSON.parse(await GetBlogs());

    return(
        <section
            id="blog-section"
            className={cn(
                "gap-4 flex flex-col text-left p-10 mx-auto max-w-4xl",
            )}
        >
            <span className="text-3xl md:text-5xl font-bold">
                Blogs
            </span>

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