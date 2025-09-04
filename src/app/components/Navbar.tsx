import Link from "next/link";
export default function Navbar(){
    return (
        <nav className="flex justify-between px-10 pt-6">
            <Link href='/' className="font-extrabold text-xl">Manavi Writes</Link>
            <div className="font-bold">
                <Link href='/' className="mx-4 text-gray-600 hover:text-gray-900">Home</Link>
                {/* <Link href='/blog' className="mx-4 text-gray-600 hover:text-gray-900">Blog</Link> */}
            </div>
        </nav>
    )
}