"use server";

import Blog from "@/models/blog";
import { connectToDB } from "@/utils/database";

export async function GetBlogs() {
    try {
        await connectToDB();
        const blogs = await Blog.find();
        return JSON.stringify({ success: true, blogs: blogs });

    } catch (error) {
        return JSON.stringify({ success: false, error: error.message });
    }
}

export async function GetBlogBySlug(slug) {
    try {
        await connectToDB();
        const blog = await Blog.findOne({ slug: slug });
        return JSON.stringify({ success: true, blog: blog });

    } catch (error) {
        return JSON.stringify({ success: false, error: error.message });
    }
}

export async function UpdateBlogBySlug(slug, values) {
    try {
        await connectToDB();
        const blog = await Blog.findOneAndUpdate({ slug: slug },values);
        return JSON.stringify({ success: true, blog: blog });

    } catch (error) {
        return JSON.stringify({ success: false, error: error.message });
    }
}

export async function DeleteBlogBySlug(slug) {
    try {
        await connectToDB();
        const blog = await Blog.findOneAndDelete({ slug: slug });
        return JSON.stringify({ success: true, blog: blog });

    } catch (error) {
        return JSON.stringify({ success: false, error: error.message });
    }
}

export async function CreateBlog(blogData) {
    try {
        await connectToDB();
        const blog = await Blog.create(blogData);
        return JSON.stringify({ success: true, blog: blog });

    } catch (error) {
        console.log(error);
        return JSON.stringify({ success: false, error: error.message });
    }
}
