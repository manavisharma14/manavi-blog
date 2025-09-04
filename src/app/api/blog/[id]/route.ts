import { NextRequest } from "next/server";
import { prisma } from '@/lib/prisma'
import { NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params } : {params : Promise<{ id : string}>}){
    const { id } = await params;
    try {
        console.log("API HIT ✅ - DELETE");
        await prisma.blog.delete({
            where: { id },
        });
        return new Response(JSON.stringify({ message: "Blog deleted successfully" }), { status: 200 });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return new Response(JSON.stringify({ error: "Failed to delete blog" }), { status: 500 });
    }
}


export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    try {
        const { id } = await params;
      const blog = await prisma.blog.findUnique({
        where: { id: id },
      });
  
      if (!blog) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      }
  
      return NextResponse.json(blog);
    } catch (error) {
      console.error('Error fetching blog:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }