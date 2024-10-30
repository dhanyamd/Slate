import prisma from "@/app/lib/db";
import { Calendar } from "@/components/bookForm/Calendar";
import { RealCalendar } from "@/components/bookForm/RealCalendar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarX, Clock, Video  } from "lucide-react";
import { notFound } from "next/navigation";

async function getData(eventUrl : string, userName : string){
    const data = await prisma.eventTypes.findFirst({
        where : {
            url : eventUrl,
            user : {
                userName : userName
            },
            active : true
        },
        select : {
            id : true,
            title : true,
            description : true,
            duration : true,
            videoCallSoftware : true,
            user : {
                select : {
                    image : true,
                    name : true,
                    availability : {
                        select : {
                            day : true,
                            isActive : true
                        }
                    }
                }
            }
        }
    })
    if(!data){
        return notFound()
    }
    return data;
}

export default async function BookingFormRoute({params} : {params : {username : string, eventUrl : string}}){
    const data = await getData(params.eventUrl, params.username)
    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
           <Card className="max-w-[1000px] w-full mx-auto">
            <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr]">
            <div>
                <img 
                className="size-10 rounded-full"
                src={data.user.image as string} alt="pfp"/>
                <p className="text-sm font-medium mt-2 text-muted-foreground">{data.user.name}</p>
                <h1 className="text-xl font-semibold mt-2 ">{data.title}</h1>
                <p className="text-sm font-medium text-muted-foreground max-w-64 ">{data.description}</p>
                <div className="flex flex-col mt-5 gap-y-3">
                <p className="flex items-center">
                <CalendarX className="size-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  23 Oct 2024
                </span>
                </p>
                <p className="flex items-center">
                <Clock className="size-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {data.duration} Minutes
                </span>
                </p>
                <p className="flex items-center">
                <Video className="size-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                 {data.videoCallSoftware}
                </span>
                </p>
                </div>
            </div>
            <span className="px-2">
            <Separator orientation="vertical" className="w-[1px] h-full" />
            </span>
            <RealCalendar daysofWeek={data.user?.availability as any}/>
            </CardContent>
            </Card> 
        </div>
    )
}