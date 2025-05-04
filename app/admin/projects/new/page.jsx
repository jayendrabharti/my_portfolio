"use client";

import { Code } from "lucide-react";
import ProjectForm from "@/components/Admin/ProjectForm";
import { CreateProject } from "@/actions/projects";
import { useRouter } from "next/navigation";

export default function NewProject() {

  const router = useRouter();

  const handleSubmit = async(values) => {
    console.log("Form submitted with values:", values);
    const res = JSON.parse(await CreateProject(values));
    console.log(res);
    if(res.success){
      alert("Project submitted successfully!");
      router.push('/admin/projects')
    }else{
      alert("Project not created! Refresh and retry!!");
    }
  }


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
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}