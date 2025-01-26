import { EditEventTypeForm } from "@/app/components/EditEventTypeForm";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
export const maxDuration = 60

async function getData(eventTypeId : string){
    const data = await prisma.eventTypes.findUnique({
        where : {
            id : eventTypeId
        },
        select : {
            title : true,
            description : true,
            duration : true,
            url : true,
            videoCallSoftware : true,
            id : true
        }
    });
    if(!data){
        return notFound()
    }
    return data
}

export default async function EditRoute({params} : {params : {eventTypeId : string}}){
  const data = await getData(params.eventTypeId)
  
  return (
  
    <EditEventTypeForm
    description={data.description}
    duration={data.duration}
    title={data.title}
    url={data.url}
    key={data.id}
    id={data.id}
    callProvider={data.videoCallSoftware}
  />
  )
}