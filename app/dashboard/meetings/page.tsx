import { EmptyState } from "@/app/components/EmptyState";
import prisma from "@/app/lib/db"
import { getUser } from "@/app/lib/hooks";
import { nylas } from "@/app/lib/nylas"
import { format, fromUnixTime } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video } from "lucide-react";
import { SubmitButton } from "@/app/components/SubmitButton";
import { Separator } from "@/components/ui/separator";
import { cancelMeetingAction } from "@/app/actions";

async function getData(userId : string){
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      grantId: true,
      grantEmail: true,
    },
  });

  if (!userData) {
    throw new Error("User not found");
  }
  const data = await nylas.events.list({
    identifier: userData?.grantId as string,
    queryParams: {
      calendarId: userData?.grantEmail as string,
    },
  });

  return data;
}

export default async function MeetingsRoute(){
    const session = await getUser()
    const data = await getData(session.user?.id as string)
   console.log(data);

    return (
       <>
       {data.data.length < 1 ? (
        <EmptyState 
        buttonText="Create a new event type"
        title="No meetings found"
        description="you dont have any meetings yet"
        href="/dashboard/new"
        />
       ) : (
       <Card>
        <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>See the upcoming event type booked by you and it's link</CardDescription>
        </CardHeader>
        <CardContent>
            {data.data.map((item) => (
               <form action={cancelMeetingAction}>
                <input type="hidden" name="eventId" value={item.id}/>
                 <div className="grid grid-cols-3 justify-between items-center">
                 <div className="text-muted-foreground text-sm">
                    <p>{format(fromUnixTime(item.when.startTime), "EEE, dd MMM")}</p>
                    <p className="text-muted-foreground text-xs pt-1">
                      {format(fromUnixTime(item.when.startTime), "hh:mm a")} - {" "}
                      {format(fromUnixTime(item.when.endTime), "hh:mm a")}
                    </p>
                    <div className="flex items-center mt-1">
                    <Video className="size-4 mr-2 text-primary"/>
                    <a
                        className="text-sm text-primary underline underline-offset-4"
                        //opens a new tab
                        target="_blank"
                        href={item.conferencing.details.url}
                      >Join meeting</a>
                    </div>
                 </div>
                 <div className="flex flex-col items-start">
                    <h2 className="text-sm font-medium">{item.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      You and {item.participants[0].name}
                    </p>
                  </div>
                  <SubmitButton 
                    text="Cancel event"
                    variant="destructive"
                    className="w-fit flex ml-auto"
                    />
                </div>
               {data.data.length > 1 ? (
                <Separator/>
               ) : (
                ""
               )}
               </form>
            ))}
        </CardContent>
       </Card>
       )}
       </>
    )
}