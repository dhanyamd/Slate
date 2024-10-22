import { SubmitButton } from "@/app/components/SubmitButton";
import prisma from "@/app/lib/db";
import { getUser } from "@/app/lib/hooks";
import { times } from "@/app/lib/times";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { notFound } from "next/navigation";

async function getData(id : string){
  const data = await prisma.availability.findMany({
    where : {
        userId : id
    }
  })
    if(!data){
        return notFound();
    }
    return data;
}
export default async function AvailabilityRoute(){
    const session = await getUser();
    const data = await getData(session.user?.id as string)
    return (
        <Card>
            <CardHeader>
                <CardTitle>Availability</CardTitle>
            <CardDescription>In this section, you can manage our availability</CardDescription>
            </CardHeader>
            <form>
                <CardContent className="flex flex-col gap-y-4">
                {data.map((item) => (
                    <div key={item.id} 
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4">
                        <input type="hidden" name={`id-${item.id}`} value={item.id}/>
                    <div className="flex items-center gap-x-3">
                     <Switch name={`isActive-${item.id}`} defaultChecked={item.isActive}/>
                     <p>{item.day}</p>
                    </div>
                    <Select name={`fromTime-${item.id}`} defaultValue={item.fromTime}>
                        <SelectTrigger className="w-full" >
                            <SelectValue placeholder='8:00' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {times.map((time) => (
                                    <SelectItem value={time.time} key={time.id}>
                                         {time.time}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Select name={`tillTime-${item.id}`} defaultValue={item.tillTime}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder='Till time' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {times.map((time) => (
                                    <SelectItem value={time.time} key={time.id}>
                                         {time.time}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    </div>
                ))}
                </CardContent>
                <CardFooter>
                    <SubmitButton text="Save changes"/>
                </CardFooter>
            </form>
        </Card>
    )
}