import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DashboardNewPage(){
    return (
        <div className="w-full h-full justify-center items-center ">
        <Card>
            <CardHeader>
                <CardTitle>
                    Add a new appoint type
                </CardTitle>
                <CardDescription>Create new appointment type that allows people to book you!</CardDescription>
            </CardHeader>

            <form>
                <CardContent className="grid gap-y-5">
                    <div className="flex flex-col gap-y-2">
                    <Label>Title</Label>
                    <Input placeholder="30 mins meeting"/>
                    </div>
                    <div className="flex flex-col gap-y-2">
                  <Label>URL Slug</Label>
                  <div className="flex rounded-md">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">Slate.xyz</span>
                    <Input className="rounded-l-none" placeholder="Example-url-1"/>
                  </div>
                    </div>
                </CardContent>
            </form>
        </Card>
        </div>
    )
}