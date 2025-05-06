"use server";

import Project from "@/models/project";
import { connectToDB } from "@/utils/database";
import { revalidatePath } from "next/cache";

export async function GetProjects() {
    try {
        await connectToDB();
        const projects = await Project.find();
        return JSON.stringify({ success: true, projects: projects });

    } catch (error) {
        return JSON.stringify({ success: false, error: error.message });
    }
}

export async function GetProjectBySlug(slug) {
    try {
        await connectToDB();
        const project = await Project.findOne({slug: slug});
        return JSON.stringify({ success: true, project: project });

    } catch (error) {
        return JSON.stringify({ success: false, error: error.message });
    }
}

export async function UpdateProjectBySlug(slug,values) {
    try {
        await connectToDB();
        const project = await Project.findOneAndUpdate({slug: slug},values);
        
        revalidatePath(`/`);
        revalidatePath(`/projects`);
        
        return JSON.stringify({ success: true, project: project });

    } catch (error) {
        return JSON.stringify({ success: false, error: error.message });
    }
}

export async function DeleteProjectBySlug(slug) {
    try {
        await connectToDB();
        const project = await Project.findOneAndDelete({slug: slug});

        revalidatePath(`/`);
        revalidatePath(`/projects`);

        return JSON.stringify({ success: true, project: project });

    } catch (error) {
        return JSON.stringify({ success: false, error: error.message });
    }
}

export async function CreateProject(projectData) {
    try {
        await connectToDB();
        const project = await Project.create(projectData);

        revalidatePath(`/`);
        revalidatePath(`/projects`);

        return JSON.stringify({ success: true, project: project });

    } catch (error) {
        return JSON.stringify({ success: false, error: error.message });
    }
}