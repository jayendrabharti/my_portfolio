import { GetBlogs } from '@/actions/blogs';
import { NextResponse } from 'next/server';

export const GET = async (request) => {
    try {

        const { blogs } = JSON.parse(await GetBlogs());

        return new NextResponse(JSON.stringify({blogs: blogs}), { status: 200 });

    } catch (error) {
        return new NextResponse("Failed to fetch blogs.", { status: 500 });
    }
}