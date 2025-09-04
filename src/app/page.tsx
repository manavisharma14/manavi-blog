import Image from "next/image";
import BlogList from "./components/BlogList";
export default function Home() {

  const getBlogs = async () => {
    try {
      const response = await fetch('/api/blog', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if(!response.ok){
        throw new Error('Failed to fetch blogs');
      }
    } catch(error){
      console.error('Error fetching blogs:', error);
      return [];
    }
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center p-20 gap-20 mx-auto">
      <div className="max-w-2xl">
        <Image
          src="/manaviimage.png"
          alt="Manavi Logo"
          width={900}
          height={900}
          className=" shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out max-w-xl"
        />
      </div>
      
      <div className="flex flex-col gap-10 items-center max-w-3xl bg-purple-50 ">
        <h1 className="mt-8 text-4xl font-extrabold">About Me</h1>
        <p className="m-8 justify-center text-justify">


Hey! I’m Manavi Sharma, a curious human who finds joy in building things, writing and pursuing ideas that matter. I’m constantly learning, constantly creating, sometimes through code, sometimes through the lens of words, sometimes just through observation. 


This blog is where I reflect, ramble and capture my experiences while they shape me. It’s part diary / journal, part brain dumps, part gentle rebellion against the pressure to always have everything figured out. You'll find stories, lessons, half-baked ideas, and possibly find a little bit of clarity.


Thanks for stopping by, stay as long as you like 🌻</p>
      </div>
    </div>
    <div>
      <BlogList />
    </div>

    

    </div>
  );
}
