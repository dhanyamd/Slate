import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/Logo.png"
import { AuthModal } from "./AuthModal";

export function Navbar(){
    return (
       <div className="flex py-5 items-center sticky justify-between">
       <Link href="/" className="flex items-center gap-1">
       <h4 className="text-3xl font-semibold pb-1">
        <span className="text-white/95">Slate</span>
       </h4>
       </Link>
       <div className="hidden md:block">
        <div className="text-pretty text-lg flex  hover:cursor-pointer gap-x-7 text-neutral-400 sticky ">
           <h1 className="hover:text-primary">Product </h1>
           <h1 className="hover:text-primary ">Blogs</h1>
           <h1 className="hover:text-primary ">About</h1>
           <h1 className="hover:text-primary ">FAQ</h1>
           </div>
        </div>
      <AuthModal className="w-[120px]"/>
       </div>
       
    )
}