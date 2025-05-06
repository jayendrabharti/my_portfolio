import { ExternalLink, Github, Pencil, PencilIcon, StarIcon, Trash2Icon } from 'lucide-react';
import { cn } from '@/libs/cn';
import Link from 'next/link';
import Image from 'next/image';
import Reveal from '../animations/Reveal';

export default function ProjectCard({ project,deleteProject ,admin = false,className=""}){

  return (
    <Reveal>
    <div 
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900",
        "transition-all duration-300 hover:shadow-md dark:hover:shadow-zinc-800/30",
        className
      )}
    >
      
      <div className="relative h-48 md:h-64 overflow-hidden">
        <Image 
          src={project.image} 
          alt={project.title}
          width={300}
          height={300}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="flex flex-1 flex-col justify-between p-6 bg-zinc-50 dark:bg-zinc-950">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 line-clamp-1 flex flex-row items-center">
            {admin && project.featured && <StarIcon className='mr-1 stroke-yellow-400 fill-yellow-400'/>}
            {project.title}
          </h3>
          
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
            {project.description}
          </p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag,index) => (
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
        </div>
        
        <div className="mt-6 flex items-center gap-4">
          <a 
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-zinc-800 hover:text-zinc-600 dark:text-zinc-200 dark:hover:text-zinc-400 transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>Code</span>
          </a>
          
          <a 
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-zinc-800 hover:text-zinc-600 dark:text-zinc-200 dark:hover:text-zinc-400 transition-colors ml-auto"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Live Demo</span>
          </a>
        </div>
      </div>


      {admin && 

        <div className='absolute top-0 right-0 flex-row flex gap-2  p-2 backdrop-blur-xs'>
          <button 
              onClick={()=>deleteProject(project.slug)}
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
              href={`/admin/projects/${project.slug}`} 
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
        </div>
      }


    </div>
    </Reveal>
  );
}