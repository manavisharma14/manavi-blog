"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Blog = {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
};

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blog');
        if (!response.ok) throw new Error('Failed to fetch blogs');
        const data = await response.json();
        setBlogs(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(true);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (error) return <div className="text-red-500 text-center">Error fetching blogs</div>;
  if (blogs.length === 0 && !loading) return <div className="text-gray-500 text-center">No blogs available</div>;

  const pastelColors = [
    "bg-pink-50", "bg-purple-50", "bg-blue-50",
    "bg-green-50", "bg-yellow-50", "bg-indigo-50", "bg-rose-50",
  ];

  return (
    <div className='p-6 sm:p-10'>
      {/* <h1 className="text-center font-bold text-3xl mb-10">Blog List</h1> */}
      <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
        {blogs.map((blog, index) => {
          const bgColor = pastelColors[index % pastelColors.length];
          return (
            <Link key={blog.id} href={`/blog/${blog.id}`} className="block group">
              <li className={`p-4 rounded-xl border shadow-sm hover:shadow-lg transition-all duration-300 ${bgColor}`}>
                <div className="w-full aspect-square relative mb-4 rounded overflow-hidden">
                  <Image
                    src={blog.imageUrl || '/placeholder.png'}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                </div>
                <h2 className="text-xl font-semibold mb-1 group-hover:underline">{blog.title}</h2>
                <p className="text-gray-600 text-sm">{new Date(blog.date).toLocaleDateString()}</p>
              </li>
            </Link>
          )
        })}
      </ul>
    </div>
  );
}