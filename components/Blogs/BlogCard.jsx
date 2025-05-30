import { EyeIcon, PencilIcon, StarIcon, Trash2Icon } from 'lucide-react';
import { cn } from '@/libs/cn';
import Link from 'next/link';
import Image from 'next/image';
import { formatTimestamp } from '@/utils/common';
import Reveal from '../animations/Reveal';
import BlogViews from './BlogViews';

export default function BlogCard({ blog, deleteBlog ,admin = false, className="" }){

  
const Card = ()=>(
  <Reveal>
  <div
      className={cn(
        "h-full group relative flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900",
        "transition-all duration-300 hover:shadow-2xl dark:hover:shadow-zinc-800",
        "hover:scale-105",
        className,
        !admin && "cursor-pointer"
      )}
    >
      
      <div className="relative h-48 md:h-64 overflow-hidden">
        <Image 
          src={blog.coverImage} 
          alt={blog.title}
          width={300}
          height={300}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="flex flex-1 flex-col justify-between p-6 bg-zinc-50 dark:bg-zinc-950">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 line-clamp-1 flex flex-row items-center">
            {admin && blog.featured && <StarIcon className='mr-1 stroke-yellow-400 fill-yellow-400'/>}
            {blog.title}
          </h3>
        
          <div className="mt-4 flex flex-wrap gap-2">
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

          <div className='flex w-full flex-row justify-between mt-4'>
              <div className="text-zinc-500 flex flex-row items-center">
                <EyeIcon className="ml-auto mr-1"/>
                <span>
                  <BlogViews slug={blog.slug}/>&nbsp;views
                </span>
              </div>
          
              <span className='text-xs text-zinc-900 dark:text-zinc-50 w-max mt-2'>
                  {formatTimestamp(blog.datetime,2)}
                  {/* {formatDistanceToNow(new Date(blog.datetime), { addSuffix: true })} */}
              </span>

          </div>

        </div>
        
      </div>


      {admin && 

        <div 
          className='absolute top-0 right-0 flex-row flex gap-2  p-2 backdrop-blur-xs'
        >
        <button 
            onClick={()=>deleteBlog(blog.slug)}
            className={cn(
              'flex flex-row items-center',
              'bg-red-500',
              `hover:bg-red-200`,
              'text-black dark:text-white text-sm',
              'py-1 px-2 rounded-lg',
              "duration-100 transition-all active:scale-90"
            )}
            >
            Delete
            <Trash2Icon className='ml-2 size-4'/>
        </button>
        <Link 
            href={`/admin/blogs/${blog.slug}`}
            className={cn(
              'flex flex-row items-center',
              'bg-zinc-200 dark:bg-zinc-800',
              `hover:bg-zinc-100 dark:hover:bg-zinc-950`,
              'text-black dark:text-white text-sm',
              'py-1 px-2 rounded-lg',
              "duration-100 transition-all active:scale-90"
            )}
          >
            Edit
            <PencilIcon className='ml-2 size-4'/>
        </Link>
        <Link 
            href={`/admin/blogs/${blog.slug}/editor`}
            className={cn(
              'flex flex-row items-center',
              'bg-zinc-200 dark:bg-zinc-800',
              `hover:bg-zinc-100 dark:hover:bg-zinc-950`,
              'text-black dark:text-white text-sm',
              'py-1 px-2 rounded-lg',
              "duration-100 transition-all active:scale-90"
            )}
          >
            Edit Content
            <PencilIcon className='ml-2 size-4'/>
        </Link>


        </div>
      }

    </div>
    </Reveal>
)

  if(admin)return <Card/>;
  
  return (
    <Link href={`/blogs/${blog.slug}`}>
      <Card/>
    </Link>
  );


}