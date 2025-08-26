import { Button } from "@/components/ui/button"
import Link from "next/link";
export default function BlogPage() {
    return(
        <div className="min-h-screen flex items-center justify-center p-20 gap-20 mx-auto">
            <div className="max-w-2xl">
                <h1 className="text-4xl font-extrabold">Blog</h1>
                <Link href='/blog/new'><Button>Add Blog</Button></Link>
                
            </div>
        </div>
    )
}