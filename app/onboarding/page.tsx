'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { onBoardingRoute } from "../actions";
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod";
import { onBoardingSchema } from "@/app/lib/zodSchema";
import { SubmitButton } from "../components/SubmitButton";

export default function OnboardingRoute() {
  const [lastResult, action] = useFormState(onBoardingRoute, undefined)

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: onBoardingSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <div className="min-h-screen w-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Slate</CardTitle>
          <CardDescription>We need the following details to set up your profile!</CardDescription>
        </CardHeader>
        <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate >
          <CardContent className="grid gap-y-5">
            <div className="grid gap-y-3 ">
              <Label>Full name</Label>
              <Input
                name={fields.fullname.name}
                defaultValue={fields.fullname.initialValue}
                key={fields.fullname.key}
                placeholder="John doe" />
              <p className="text-red-500 text-sm">{fields.fullname.errors}</p>
            </div>
            <div className="grid gap-y-2">
              <Label>Username</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted 
       text-sm text-muted-foreground">Slate/</span>
                <Input
                  name={fields.userName.name}
                  defaultValue={fields.userName.initialValue}
                  key={fields.userName.key}
                  className="rounded-l-none" placeholder="unique-user-1" />
              </div>
              <p className="text-red-500 text-sm">{fields.userName.errors}</p>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton text="Submit" className="w-full" />
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}