'use client'
import { CreateEventTypeAction } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButton";
import { eventTypeSchema } from "@/app/lib/zodSchema";
import ButtonGroup from "@/components/ButtonGroup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";

export const maxDuration = 60

type VideoCallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams"

export default function DashboardNewPage(){
    const [activePlatfrom, setActivePlatform] = useState<VideoCallProvider>("Google Meet") 
    const togglePlatform = (platform: VideoCallProvider) => {
      setActivePlatform(platform);
    };
    const [lastResult, action] = useFormState(CreateEventTypeAction, undefined)
    const [form, fields] = useForm({
        lastResult,

        onValidate({formData}){
            return parseWithZod(formData, {
                schema : eventTypeSchema
            })
        },

        shouldValidate : "onBlur",
        shouldRevalidate : "onInput"
    })
    return (
        <div className="w-full h-full justify-center items-center ">
        <Card>
            <CardHeader>
                <CardTitle>
                    Add a new appointment type
                </CardTitle>
                <CardDescription>Create new appointment type that allows people to book you!</CardDescription>
            </CardHeader>

            <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
                <CardContent className="grid gap-y-5">
                    <div className="flex flex-col gap-y-2">
                    <Label>Title</Label>
                    <Input name={fields.title.name} key={fields.title.key} defaultValue={fields.title.initialValue} placeholder="30 mins meeting"/>
                    <p className="text-red-500 text-sm">{fields.title.errors}</p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                  <Label>URL Slug</Label>
                  <div className="flex rounded-md">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">Slate.xyz</span>
                    <Input 
                    name={fields.url.name} key={fields.url.key} defaultValue={fields.url.initialValue}
                    className="rounded-l-none" placeholder="something-url-1"/>
                  </div>
                  <p className="text-red-500 text-sm">{fields.url.errors}</p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                   <Label>Description</Label>
                   <Textarea 
                   name={fields.description.name} key={fields.description.key} defaultValue={fields.description.initialValue}
                   placeholder="What do you want to talk about in the meeting!"/>
                 <p className="text-red-500 text-sm">{fields.description.errors}</p>

                    </div>
                    <div className="grid gap-y-2">
              <Label>Duration</Label>
              <Select
               name={fields.duration.name}
                key={fields.duration.key}
                defaultValue={fields.duration.initialValue}
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
              <p className="text-red-500 text-sm">{fields.duration.errors}</p>


            </div>
                <div className="grid gap-y-2">
                  <Label>Video Call Provider</Label>
                  <input type="hidden" name={fields.videoCallSoftware.name} value={activePlatfrom}/>
                  <ButtonGroup>
                  <Button
                  onClick={() => togglePlatform("Zoom Meeting")}
                  type="button"
                  className="w-full"
                  variant={
                    activePlatfrom === "Zoom Meeting" ? "secondary" : "outline"
                  }
                >
                  Zoom
                </Button>
                <Button
                  onClick={() => togglePlatform("Google Meet")}
                  type="button"
                  className="w-full"
                  variant={
                    activePlatfrom === "Google Meet" ? "secondary" : "outline"
                  }
                >
                  Google Meet
                </Button>
                <Button
                  variant={
                    activePlatfrom === "Microsoft Teams"
                      ? "secondary"
                      : "outline"
                  }
                  type="button"
                  className="w-full"
                  onClick={() => togglePlatform("Microsoft Teams")}
                >
                  Microsoft Teams
                </Button>
              </ButtonGroup>
            </div>
          </CardContent>
          <CardFooter className="w-full flex justify-between">
            <Button asChild variant="secondary">
              <Link href="/dashboard">Cancel</Link>
            </Button>
                    <SubmitButton text="Create Event Type"/>
                </CardFooter>
            </form>
        </Card>
        </div>
    )
}