import Image from "next/image";
import BlogList from "./components/BlogList";

export default function Home() {
  return (
    <div>
      {/* About Me Section */}
      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-6 sm:p-10 lg:p-20 gap-10 lg:gap-20 mx-auto">
        
        {/* Manavi's Image */}
        <div className="w-full flex justify-center lg:justify-end">
          <Image
            src="/manaviimage.png"
            alt="Manavi"
            width={500}
            height={500}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out rounded"
            priority
          />
        </div>

        {/* About Me Text */}
        <div className="flex flex-col gap-6 items-center text-center lg:text-left max-w-3xl bg-purple-50 p-6 rounded shadow">
          <h1 className="text-4xl font-extrabold mt-2">About Me</h1>
          <p className="text-base sm:text-lg text-gray-700 text-justify">
            Hey! I’m Manavi Sharma, a curious human who finds joy in building things, writing and pursuing ideas that matter. I’m constantly learning, constantly creating, sometimes through code, sometimes through the lens of words, sometimes just through observation.  
            <br /><br />
            This blog is where I reflect, ramble, and capture my experiences while they shape me. It’s part diary, part brain dump, part gentle rebellion against the pressure to always have everything figured out. You’ll find stories, lessons, half-baked ideas, and maybe a little clarity.
            <br /><br />
            Thanks for stopping by, stay as long as you like 🌻
          </p>
        </div>
      </div>

      {/* Blog List Section */}
      <div>
        <BlogList />
      </div>
    </div>
  );
}