import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function DashboardNewPage(){
    return (
        <div className="w-full h-full justify-center items-center ">
        <Card>
            <CardHeader>
                <CardTitle>
                    Add a new appointment type
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
                    <Input className="rounded-l-none" placeholder="something-url-1"/>
                  </div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                   <Label>Description</Label>
                   <Textarea placeholder="What do you want to talk about in the meeting!"/>
                    </div>
                    <div className="grid gap-y-2">
              <Label>Duration</Label>
              <Select
               // name={fields.duration.name}
               // key={fields.duration.key}
               // defaultValue={fields.duration.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select the duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="15">15 Mins</SelectItem>
                    <SelectItem value="30">30 Mins</SelectItem>
                    <SelectItem value="45">45 Mins</SelectItem>
                    <SelectItem value="60">1 Hour</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

            </div>
                <div className="grid gap-y-2">
                  <Label>Video Call Provider</Label>
                    </div>
                </CardContent>
            </form>
        </Card>
        </div>
    )
}