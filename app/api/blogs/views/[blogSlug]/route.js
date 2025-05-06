import { GetBlogBySlug, UpdateBlogBySlug } from '@/actions/blogs';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
    const { blogSlug } = await params;

    const { increment } = await req.json();
    
    const { blog } = JSON.parse(await GetBlogBySlug(blogSlug));

    if(increment){
        await UpdateBlogBySlug(blogSlug,{ views: blog.views + 1 });
    }

    return NextResponse.json({ views: blog.views });
}
