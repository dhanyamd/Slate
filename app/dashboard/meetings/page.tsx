import prisma from "@/app/lib/db"
import { nylas } from "@/app/lib/nylas"

async function getData(userId : string){
  const data = await prisma.user.findUnique({
    where : {
        id : userId
    },
    select : {
        grantEmail : true,
        grantId : true
    }
  })
  if(!data){
    throw new Error("User not found")
  }
  
  const userdata = await nylas.events.list({
    identifier : data.grantId as string,
    queryParams : {
        calendarId : data.grantEmail as string
    }
  });
  return userdata
}
export default function MeetingsRoute(){
    return (
        <div>

        </div>
    )
}