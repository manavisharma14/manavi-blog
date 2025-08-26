"use client"
import {useState, useEffect} from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Blog = {
    id: string;          // or _id: string, depending on your API
    title: string;
    content: string;
    date: string;        // ISO string from API
  };
export default function BlogList(){
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleDelete = async (id: string) => {
        try { 
            const response = await fetch(`/api/blog/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if(!response.ok){
                throw new Error('Failed to delete blog');
            }
            setBlogs(prev => prev.filter(blog => blog.id !== id));
        } catch(error) {
            console.error('Error deleting blog:', error);
            setError(true);
        }
    }

    

    useEffect(() => {
        const fetchBlogs = async() => {
            try{
                const response = await fetch('/api/blog', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if(!response.ok){
                    throw new Error('Failed to fetch blogs');
                }
                const data = await response.json();
                setBlogs(data);
                setLoading(false);
            } catch(error){
                console.error('Error fetching blogs:', error);
                setLoading(false);
            }
        }
        fetchBlogs();
    }, []);

    if(error){
        return <div className="text-red-500 text-center">Error fetching blogs</div>;
    }
    if(blogs.length === 0 && !loading){
        return <div className="text-gray-500 text-center">No blogs available</div>;
    }

// bg-[#868d74]

const pastelColors = [
    "bg-pink-50",
    "bg-purple-50",
    "bg-blue-50",
    "bg-green-50",
    "bg-yellow-50",
    "bg-indigo-50",
    "bg-rose-50",
];

    return (
        <div className=' p-10'>
            <h1 className="text-center font-bold text-3xl mb-20">Blog List</h1>
            <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-32 p-4'>
                {blogs.map((blog, index) => {
                    const bgColor = pastelColors[index % pastelColors.length]; // cycle colors
                    return (
                        <li 
                            key={blog.id} 
                            className={`mb-6 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ${bgColor}`}
                        >
                            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
                            <p className="text-gray-600 mb-4">{new Date(blog.date).toLocaleDateString()}</p>
                            <p className="text-gray-800">{blog.content}</p>
                            {/* <Button onClick={() => handleDelete(blog.id)}><Trash2 /></Button> */}
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}