import prisma from "@/app/lib/db"
import { nylas } from "@/app/lib/nylas"
import { Prisma } from "@prisma/client"
import {format} from "date-fns"

interface iAppProps{
    selectedDate : Date,
    userName : string
}

async function getData(userName : string, selectedDate : Date){
 const currentDay = format(selectedDate, "EEEE")

 const startOfDay = new Date(selectedDate);
 startOfDay.setHours(0,0,0,0);

 const endOfDay = new Date(selectedDate)
 endOfDay.setHours(23,59,59,999)
 const data = await prisma.availability.findFirst({
    where : {
        day : currentDay as Prisma.EnumDayFilter,
        User : {
            userName : userName
        }
    },
    select : {
        fromTime : true,
        tillTime : true,
        id : true,
        User : {
            select : {
                grantEmail : true,
                grantId : true
            }
        }
    }
 })
 const nylasCalendarData = await nylas.calendars.getFreeBusy({
    identifier : data?.User?.grantId as string,
    requestBody : {
        startTime : Math.floor(startOfDay.getTime()/1000),
        endTime : Math.floor(endOfDay.getTime()/1000),
        emails : [data?.User?.grantEmail as string]
    }

 })
 console.log(data)
 return {
    data,
    nylasCalendarData
 } 
}

export async function Timetable({selectedDate, userName} : iAppProps){
    const {data, nylasCalendarData} = await getData(userName, selectedDate)
    return (
        <div>
            <p className="text-base font-semibold">{format(selectedDate, "EEE")} {""}
            <span className="text-sm text-muted-foreground">{format(selectedDate, "MMM. d")}</span>
            </p>
        </div>
    )
}