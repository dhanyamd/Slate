import Image from "next/image"
import FeatureCard from "./FeatureCard"
import Tag from "./Tag"
import Preview from "@/public/preview.png"
import Preview1 from "@/public/2.png"
import Track from "@/public/evtype.png"
import Key from "./Key"

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
        <section className="py-8">
            <div className="container">
                <div className="flex justify-center">
                <Tag>Features</Tag>
                </div>
            <h2 className="text-6xl font-medium text-center mt-6">Where power meets {""} 
                <span className="text-rose-500">Simplicity</span></h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 ">
                <FeatureCard className="col-span-2" title="Real-time tracking events" description="Manage, track and cancel meetings with a unique invite link for each!">
                <div>
                    <div className="flex items-center justify-center border-2 mt-4 border-cyan-400 rounded-3xl">
                       <Image src={Track} alt="edit-events" className="place-items-center rounded-3xl w-full"/>
                    </div>
                    </div>
                </FeatureCard>
                <FeatureCard className="col-span-2"  title="Interactive previews" description="Enagage your clients with prototypes that react to user actions" >
                <div className="flex items-center justify-center border-2 h-[300px] border-indigo-500 mt-12 rounded-3xl">
                       <Image src={Preview1} alt="preview" className="place-items-center object-fit h-[250px] rounded-3xl w-full"/>
                    </div>
                </FeatureCard>
                <FeatureCard className="col-span-2 md:col-start-2" title="Keyboard quick actions" description="Powerful commands for you to create events more quickly">
                    <div className=" aspect-video border-2 border-green-500 rounded-3xl flex text-neutral-950 items-center gap-4 justify-center">
                     <Key className="w-28">shift</Key>
                     <Key>alt</Key>
                     <Key>C</Key>
                    </div>
                </FeatureCard>
             
            </div>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
                {features.map((feature) => (
                    <div key={feature} className="bg-neutral-900 gap-3  dark:text-white items-center border border-white/10 inline-flex px-3 py-1.5 rounded-2xl">
                        <span className="bg-rose-400 dark: text-neutral-950 size-5 text-xl rounded-full inline-flex items-center justify-center">&#10038;</span>
                        <span className="font-medium">{feature}</span>
                        </div>
                ))}
            </div>
            </div>
        </section>
    )
}
