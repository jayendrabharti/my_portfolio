"use client";

import { DeleteProjectBySlug, GetProjects } from "@/actions/projects";
import ProjectCard from "@/components/Projects/ProjectCard";
import { PlusIcon, LoaderCircleIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Projects() {

    const [projects,setProjects] = useState(null);

    useEffect(()=>{
        const get = async()=>{
            const data = JSON.parse(await GetProjects());
            setProjects(data.projects);
        }
        get();
    },[])

    const deleteProject = async (slug) => {
        const confirmDelete = confirm("Are you sure you want to delete this project?");
        if (!confirmDelete) return;

        const data = JSON.parse(await DeleteProjectBySlug(slug));
        if (data.success) {
            setProjects((prevProjects) => prevProjects.filter((project) => project.slug !== slug));
            alert("Deleted Successfully");
        } else {
            alert("Not able to delete!! Refresh and try again!!");
        }
    };

    if(!projects)return(
        <div className="w-full h-full flex justify-center items-center">
            <LoaderCircleIcon className="animate-spin text-black dark:text-white size-20"/>
        </div>
    )

    return (
        <div className="w-full min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-4">
            <div className="">
                <Link
                    href={'/admin/projects/new'}
                    className="flex flex-row items-center bg-zinc-300 dark:bg-zinc-700 text-black dark:text-white w-max p-2 rounded-lg ml-auto font-bold transition-all duration-200 active:scale-75 mb-3"
                >
                    <PlusIcon/>
                    Add Project
                </Link>
            </div>
            {!projects.length && 
                <span 
                    className="text-2xl font-bold"
                >No Projects Yet</span>
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <ProjectCard 
                        key={index} 
                        project={project} 
                        admin={true}
                        deleteProject={deleteProject}
                    />
                ))}
            </div>
        </div>
    );
}