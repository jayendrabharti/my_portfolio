import { cn } from "@/libs/cn"
import { GetProjects } from "@/actions/projects";
import ProjectCard from "@/components/Projects/ProjectCard";

export const dynamic = 'force-dynamic';

export default async function Projects(){

    const { projects } = JSON.parse(await GetProjects());
    
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
                    />
                ))}
            </div>

        </section>
    )
}