import { NextRequest } from "next/server";
import { prisma } from '@/lib/prisma'

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