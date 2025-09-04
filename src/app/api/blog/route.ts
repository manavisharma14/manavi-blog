import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'


export async function POST(req: NextRequest){
    try {
        console.log("API HIT ✅");
        const body = await req.json();
        const {title, content, imageUrl} = body;
        if(!title || !content || !imageUrl){
            return NextResponse.json({error: "All fields are required"}, {status: 400});
        }

        // Add blog to the database


    const blog = await prisma.blog.create({
      data: { title, content, imageUrl, date: new Date()  },
    });

        // Log the added blog
        console.log("Blog added:", blog);
        
        console.log("Blog added:", {title, content, imageUrl});
        return NextResponse.json({message: "Blog added successfully"}, {status: 200});
    }
    catch(error){
        console.log("Error adding blog", error);
        return NextResponse.json({error: "Failed to add blog"}, {status: 500});
    }
}

export async function GET(){
    try {
        const blogs = await prisma.blog.findMany({
            orderBy: {
                date: 'desc',
            }

        });
        return NextResponse.json(blogs, {status:200})
    } catch (error) {
        console.log("Error fetching blogs", error);
        return NextResponse.json({error: "Failed to fetch blogs"}, {status: 500});
    }
}