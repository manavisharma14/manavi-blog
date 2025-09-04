import { notFound } from 'next/navigation';
import Image from 'next/image';

type Blog = {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
};

async function getBlog(id: string): Promise<Blog | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${id}`, {
      next: { revalidate: 60 }, // cache and revalidate every 60 seconds
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const id = await params;
    const blog = await getBlog(id.id);

  if (!blog) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-6">{new Date(blog.date).toLocaleDateString()}</p>
      
      {blog.imageUrl ? (
  <div className="relative w-full aspect-video mb-8 rounded overflow-hidden">
    <Image
      src={blog.imageUrl}
      alt={blog.title}
      fill
      className="object-cover"
      priority
    />
  </div>
) : (
  <div className="bg-gray-200 w-full aspect-video mb-8 flex items-center justify-center text-sm text-gray-500 rounded">
    No imagee
  </div>
)}

      <div className="prose prose-lg max-w-none">
      <p className="whitespace-pre-line">{blog.content}</p>
      </div>
    </div>
  );
}