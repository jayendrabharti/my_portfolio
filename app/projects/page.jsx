"use client";
import { cn } from "@/libs/cn"
import { useState, useEffect } from "react";
import { GetProjects } from "@/actions/projects";
import { LoaderCircleIcon } from "lucide-react";
import ProjectCard from "@/components/Projects/ProjectCard";

export default function Projects(){

    const [projects,setProjects] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        const get = async()=>{
            try{
                const data = JSON.parse(await GetProjects());
                if(data.success){
                    setProjects(data.projects);
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
            id="project-section"
            className={cn(
                "flex flex-col gap-4 text-left p-10 mx-auto max-w-4xl",
            )}
        >

            <span className="text-3xl md:text-5xl font-bold">
                Projects
            </span>

            {!projects.length && 
                <span 
                    className="text-2xl font-bold"
                >No Projects Yet</span>
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <ProjectCard 
                        key={index} 
                        project={project} 
                        // className="aspect-square"
                    />
                ))}
            </div>

        </section>
    )
}