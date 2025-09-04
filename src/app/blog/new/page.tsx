"use client"
import { useState } from 'react';
import {Input} from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
// import { blogSchema } from '@/lib/blogSchema';

export default function NewBlogPage() {

    const [form, setForm] = useState({title: '', content: '', imageUrl: ''});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
      };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        
        console.log('Form submitted:', form);

        // zod validation

        // const validationResult = blogSchema.safeParse(form);
        // if (!validationResult.success) {
        //     setError(validationResult.error.issues.map((issue) => issue.message).join(', '));
        //     setLoading(false);
        //     return;
        // }
        


        try {
            const response = await fetch('/api/blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(form)
            });
            if(response.ok){
                const data = await response.json();
                console.log('Blog added successfully:', data);
                setForm({title: '', content: '', imageUrl: ''});
            }

            if(!response.ok){
                throw new Error('Failed to add blog');
            }
        } catch (error) {
            console.error('Error adding blog:', error);
            setError('Failed to add blog. Please try again.');
        }
        setLoading(false);
    }
    return (
        <div className='p-10 mx-auto max-w-2xl'>
            <h1 className='mb-10 items-center justify-center text-center'>My new blog</h1>
            <form onSubmit={handleSubmit}>
                <Input 
                    name="title"
                    type="text"
                    placeholder="Blog Title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full mb-4 border px-4 py-5 mb-5 rounded"
                />



                <Textarea
                    name="content"
                    placeholder="Blog Content"
                    value={form.content}
                    onChange={handleChange}
                    className="w-full mb-4 border h-64 px-4 py-5 mb-5 rounded"
                />

<Input
  type="text"
  placeholder="Image URL"
  name="imageUrl"
  value={form.imageUrl}
  onChange={handleChange}
  className="w-full max-w-md mb-4 border px-4 py-3 rounded"
/>

                <Button 
                    type="submit"
                    disabled={loading}
                    className='bg-blue-500 block mx-auto align-center text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'>
                    Submit Blog
                </Button>


            </form>
        </div>

    )
}