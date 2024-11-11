import { createMeetingAction } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButton";
import prisma from "@/app/lib/db";
import { RealCalendar } from "@/components/bookForm/RealCalendar";
import { Timetable } from "@/components/Timetabe";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CalendarX, Clock, Video  } from "lucide-react";
import { notFound } from "next/navigation";

async function getData(eventUrl : string, username : string){
    const data = await prisma.eventTypes.findFirst({
        where : {
            url : eventUrl,
            user : {
                userName : username
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

export default async function BookingFormRoute({params, searchParams} : {params : {username : string, eventUrl : string};
 searchParams: {date? : string, time? : string}
}){
    const data = await getData(params.eventUrl, params.username)
    const selectedDate = searchParams.date ? new Date(searchParams.date) : new Date
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday : "long",
        day : "numeric",
        month : "long",
    }).format(selectedDate)
    //basically !! converts showForm into boolean
    const showForm = !!searchParams.date && !!searchParams.time
    return ( //from-neutral-600  to-zinc-40
        <div className="min-h-screen rounded-sm w-screen flex items-center justify-center">
            {showForm ? (
                    <Card className="max-w-[600px] w-full">
                    <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr]">
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
                          {formattedDate}
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
                   
                    <Separator orientation="vertical" className="w-[1px] h-full"/>
                    <form className="flex flex-col gap-y-4 pl-3" action={createMeetingAction}>
                    
              <input type="hidden" name="eventTypeId" value={data.id} />
              <input type="hidden" name="userName" value={params.username} />
              <input type="hidden" name="fromTime" value={searchParams.time} />
              <input type="hidden" name="eventData" value={searchParams.date} />
              <input
                type="hidden"
                name="meetingLength"
                value={data.duration}
              />
                        <div className="flex flex-col gap-y-2">
                      <Label>Your name</Label>
                      <Input name="name" placeholder="Your name"/>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Your email</Label>
                           <Input name="email" placeholder="john@gmail.com"/>
                        </div>
                        <SubmitButton className="w-full mt-9" text="Book meeting"/>
                    </form>
                   
                    </CardContent>
                    </Card> 
            ) : (
                <Card className="max-w-[1000px] items-center rounded-2xl w-full mx-auto">
                <CardContent className="p-5 mt-4 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr]">
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
                      {formattedDate}
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
                <span className="pr-4">
                <Separator orientation="vertical" className="w-[1px] h-full" />
                </span>
                <RealCalendar daysofWeek={data.user?.availability as any}/>
                <span className="pl-4">
                <Separator orientation="vertical" className="w-[1px] h-full"/>
                </span>
                <Timetable meetingDuration={data.duration} selectedDate={selectedDate} userName={params.username}/>
                </CardContent>
                </Card> 
            )}
      
        </div>
    )
}