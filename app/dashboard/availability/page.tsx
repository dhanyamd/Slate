import prisma from "@/app/lib/db";
import { getUser } from "@/app/lib/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    return data 
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
                    <div className="flex items-center gap-x-3">
                     <Switch defaultChecked={item.isActive}/>
                    </div>
                    </div>
                ))}
                </CardContent>
            </form>
        </Card>
    )
}