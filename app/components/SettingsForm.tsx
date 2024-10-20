"use client"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitButton } from "./SubmitButton"
import { useFormState } from "react-dom"
import { SettingsAction } from "../actions"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { SettingsSchema } from "../lib/zodSchema"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { UploadDropzone } from "../lib/uploadthing"
import { toast } from "sonner"

interface iAppProps{
    fullName : string;
    profileImage : string;
    email : string
}

export function SettingsForm({fullName, profileImage, email} : iAppProps){
    const [lastResult, action] = useFormState(SettingsAction, undefined);
    const[currentProfileImage, setcurrentProfileImage] = useState(profileImage)
    const [form, fields] = useForm({
        // Sync the result of last submission
        lastResult,
    
        // Reuse the validation logic on the client
        onValidate({ formData }) {
          return parseWithZod(formData, { schema: SettingsSchema });
        },
    
        // Validate the form on blur event triggered
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
      });
      const handleDeleteImage = () => {
        setcurrentProfileImage("");
      };
    
    return (
        <Card>
        <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings!</CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
            <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-y-2">
            <Label>Full name</Label>
            <Input
            name={fields.fullName.name}
            key={fields.fullName.key}
            defaultValue={fullName} placeholder="John doe"/>
            <p className="text-red-500">{fields.fullName.errors}</p>
            </div>
            <div className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <Input defaultValue={email} placeholder="test123@gmail.com"/>
            </div>

            <div className="flex flex-col gap-y-2">
            <Label className="pb-2">Profile Image</Label>
            <input type="hidden" name={fields.profileImage.name} key={fields.profileImage.key} value={currentProfileImage} />
           {currentProfileImage ? (
            <div className="relative size-16">
              <img 
              src={currentProfileImage}
              alt="profile image"
              className="rounded-lg size-16"
              />
                 <Button
                  type="button"
                  onClick={handleDeleteImage}
                  variant="destructive"
                  size="icon"
                  className="absolute size-6 -top-3 -right-3"
                >
                  <X className="size-4" />
                </Button>
             </div>
           ): (
           <UploadDropzone 
           endpoint="imageUploader"
           onClientUploadComplete={(res) => {
            setcurrentProfileImage(res[0].url);
            toast.success("Profile image uploaded");
           }}
           onUploadError={(error) => {
            console.log("Something went wrong!", error);
            toast.error(error.message);
           }}
           />
           ) }
          <p className="text-red-500">{fields.profileImage.errors}</p>

            </div>

            </CardContent>
            <CardFooter>
                <SubmitButton text="Save Changes"/>
            </CardFooter>
        </form>
    </Card>
    )
}