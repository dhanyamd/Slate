import Image from "next/image"
import FeatureCard from "./FeatureCard"
import Tag from "./Tag"
import Preview from "@/public/preview.png"
import Bookings from "@/public/bookings.png"
import Track from "@/public/evtype.png"

const features = [
    "Build events",
    "Cancel events",
    "Customize time",
    "Link your calendar",
    "Auto preview",
    "Easy onboarding"
]

export default function Features(){
    return (
        <section className="py-20">
            <div className="container">
                <div className="flex justify-center">
                <Tag>Features</Tag>
                </div>
            <h2 className="text-6xl font-medium text-center mt-6">Where power meets {""} 
                <span className="text-rose-500">Simplicity</span></h2>
            <div className="mt-12 grid grid-cols-1 gap-8 ">
                <FeatureCard title="Real-time tracking events" description="Manage, track and cancel meetings with a unique invite link for each!">
                <div>
                    <div className="flex items-center justify-center border-2 mt-4 border-cyan-400 rounded-3xl">
                       <Image src={Track} alt="edit-events" className="place-items-center rounded-3xl w-full"/>
                    </div>
                    </div>
                </FeatureCard>
                <FeatureCard title="Interactive previews" description="Enagage your clients with prototypes that react to user actions">
                <div className="flex items-center justify-center border-2 border-indigo-500 mt-4 rounded-3xl">
                       <Image src={Preview} alt="preview" className="place-items-center rounded-3xl w-full"/>
                    </div>
                </FeatureCard>
                <FeatureCard title="Keyboard quick actions" description="Powerful commands for you to create events more quickly">
                <div className=" flex items-center justify-center border-2 mt-4 border-red-500 rounded-3xl">
                    <Image src={Bookings} alt="book" className="place-items-center rounded-3xl w-full "/>
                    </div>
                </FeatureCard>
             
            </div>
            <div>
                {features.map((feature) => (
                    <div key={feature}>
                        <span></span>
                        <span>{feature}</span>
                        </div>
                ))}
            </div>
            </div>
        </section>
    )
}
