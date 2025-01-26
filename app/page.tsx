import Image from "next/image";
import { Navbar } from "./components/Navbar";
import { redirect } from "next/navigation";
import { auth } from "./lib/auth";
import Hero from "./landing/Hero";
import Booking from "@/public/big.png"
import Introduction from "./landing/Introduction";
import Features from "./landing/Features";
import FooterDetails from "./landing/FooterDetail";
import Footer from "./landing/Footer";

export default async function Home() {
  const session = await auth()
  if(session?.user){
    return redirect('/dashboard')
  }
  return ( 
    <div className="min-w-screen bg-black mx-auto px-4 sm:px-6 lg:px-8">    
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
        <div className="flex items-center justify-center">
          <Introduction/>
        </div>
        <div className="flex items-center justify-center">
          <Features />
        </div>
        <div className="flex items-center">
          <FooterDetails/>
        </div>
        <div className="pt-[5rem] flex justify-center ">
          <Footer/>
        </div>
    </div>
  )
}