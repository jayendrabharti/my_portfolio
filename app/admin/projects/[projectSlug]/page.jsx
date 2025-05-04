"use client";

import { Code, LoaderCircleIcon } from "lucide-react";
import ProjectForm from "@/components/Admin/ProjectForm";
import { GetProjectBySlug, UpdateProjectBySlug } from "@/actions/projects";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Project() {

    const router = useRouter();
    const [project, setProject] = useState(null);
    const { projectSlug } = useParams();

    useEffect(()=>{
        const get = async()=>{
            const data = JSON.parse(await GetProjectBySlug(projectSlug));
            setProject(data.project);
        };

        get();
    },[]);

    const handleSubmit = async(values) => {
      console.log("Form submitted with values:", values);
      const res = JSON.parse(await UpdateProjectBySlug(projectSlug,values));
      console.log(res);
      if(res.success){
        alert("Project updated successfully!");
        router.push('/admin/projects');
      }else{     
        alert("Project not udated!");
      }
  }

    if(!project)return(
        <div className="w-full h-full flex justify-center items-center">
            <LoaderCircleIcon className="animate-spin text-black dark:text-white size-20"/>
        </div>
    )

  return (
    <div className="w-full py-10 px-4">
      <header className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center gap-3">
          <Code size={32} className="text-zinc-600 dark:text-zinc-300" />
          <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">
            Project Showcase
          </h1>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          Submit your project to be featured in our developer showcase.
        </p>
      </header>

      <div className="max-w-3xl mx-auto">
        <ProjectForm
            initialValues={project}
            onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}