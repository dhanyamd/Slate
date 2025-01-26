import { DeleteEventTypeAction } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";


export const maxDuration = 60

export default function DeleteEventType({params} : {params : {eventTypeId : string}}){
    return (
        <Card className="max-w-[450px] w-full">
            <CardHeader>
                <CardTitle>Delete event type</CardTitle>
               <CardDescription>
                Are you sure you want to delete this event?
               </CardDescription>
            </CardHeader>
            <CardFooter className="w-full flex justify-between">
                <Button variant="secondary" asChild>
                <Link href="/dashboard">
                Cancel
                </Link>
                </Button>
                <form action={DeleteEventTypeAction}>
                <input type="hidden" name="id" value={params.eventTypeId}/>
                <SubmitButton text="Delete event" variant="destructive"/>
                </form>
            </CardFooter>
        </Card>
    )
}