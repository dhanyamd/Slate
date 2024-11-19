import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function Footer(){
    return (
        <footer className="bg-black rounded-t-2xl bottom-0 text-[#BCBCBC] text-sm py-10 text-center">
            <div className="container">
                <div className="inline-flex relative font-semibold text-4xl">
                 <span className="text-rose-500  pr-2"> &#10038; </span>  Slate
                </div>
            <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
              <a href="# " className="hover:text-rose-400">About</a>
              <a href="#" className="hover:text-rose-400">Features</a>
              <a href="#" className="hover:text-rose-400">Customers</a>
              <a href="#" className="hover:text-rose-400">Blogs</a>
            </nav>
            <div className="flex justify-center hover:cursor-pointer gap-6 mt-6">
                <a href="https://github.com/dhanyamd">
                <FaGithub />
                </a>
                <a href="https://x.com/dhanya13_md">
                <FaXTwitter />
                </a>
               <a href="https://dhanya13md@gmail.com">
               <IoMdMail/>
               </a>
            </div>
            <div className="mt-5">
             Made with <span className="p-1 text-sky-500"> &#9829; </span> by dhanya
            </div>
            </div>
        </footer>
    )
}