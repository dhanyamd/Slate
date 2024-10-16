import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/Logo.png"
import { AuthModal } from "./AuthModal";

export function Navbar(){
    return (
       <div className="flex py-5 items-center justify-between">
       <Link href="/" className="flex items-center gap-2">
       <Image src={Logo} alt="logo" className="size-8 rounded-xl"/>
       <h4 className="text-3xl font-semibold pb-1">
        Sl<span className="text-rose-500">ate</span>
       </h4>
       </Link>

      <AuthModal/>
       </div>
    )
}