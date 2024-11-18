import Image from "next/image";
import { Navbar } from "./components/Navbar";
import { redirect } from "next/navigation";
import { auth } from "./lib/auth";
import Hero from "./landing/Hero";
import Booking from "@/public/big.png"
import Introduction from "./landing/Introduction";
import Features from "./landing/Features";

export default async function Home() {
  const session = await auth();
  if(session?.user){
    return redirect('/dashboard')
  }
  return (
    <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">    
       <Navbar />
        <div className="flex flex-col justify-center pt-[1rem] items-center ">
           <Hero/>
        </div>
        <div className="place-items-center">
       <Image 
       src={Booking}
       alt="bookform"
       />
        </div>
        <div>
          <Introduction/>
        </div>
        <div>
          <Features />
        </div>
    </div>
  )
}