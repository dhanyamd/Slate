import { Button } from "@/components/ui/button";
import { AuthModal } from "../components/AuthModal";
import { AuthModalParttwo } from "./AuthModaltwo";

export default function Hero(){
    return (
        <section className="py-24">
          <div className="container flex flex-col items-center justify-center">
          <div className="inline-flex py-1 cursor-pointer hover:border-pink-500 border-2 px-3 bg-gradient-to-r from-teal-500 to-lime-500 text-neutral-950 rounded-full font-semibold">
           &#10038; check it out now → </div>
          <h1 className="text-6xl font-medium text-center max-w-5xl mt-6">
             Impactful calendar scheduler {""}
            <span> to handle meetings 🪄</span> </h1>
          <p className="text-center text-xl max-w-3xl text-white/50 mt-6">
            Manage, book and schedule events at
             your convenience. Customize your calendar 
             and availability times and send unique invites. 
          </p>
          <div className="rounded-full  mt-6">
             <AuthModalParttwo />
          </div>
          </div>
        </section>
    )
}