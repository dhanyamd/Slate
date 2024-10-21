'use server'
import { onBoardingSchema, onboardUsernameValidation, SettingsSchema } from "@/app/lib/zodSchema";
import { parseWithZod } from "@conform-to/zod"
import { redirect } from "next/navigation";
import { getUser } from "./lib/hooks";
import prisma from "./lib/db";

export async function onBoardingRoute(prevState: any, formData: FormData) {
  const session = await getUser();

  const submission = await parseWithZod(formData, {
    schema: onboardUsernameValidation({
      async isUsernameUnique() {
        const exisitngUsername = await prisma.user.findUnique({
          where: {
            userName: formData.get("userName") as string,
          },
        })
        return !exisitngUsername
      },
    }),

    async: true,
  });

  if (submission.status !== "success") {
    return submission.reply()
  }
  const data = await prisma.user.update({
    where: {
      id: session.user?.id
    },
    data: {
      userName: submission.value.userName,
      name: submission.value.fullname,
      availability : {
        createMany : {
          data : [
            {
              day : "Monday",
              fromTime : '8:00',
              tillTime : '18:00'
            },
            {
              day : "Tuesday",
              fromTime : '8:00',
              tillTime : '18:00'
            },
            {
              day : "Wednesday",
              fromTime : '8:00',
              tillTime : '18:00'
            },
            {
              day : "Thursday",
              fromTime : '8:00',
              tillTime : '18:00'
            },
            {
              day : "Friday",
              fromTime : '8:00',
              tillTime : '18:00'
            },
            {
              day : "Saturday",
              fromTime : '8:00',
              tillTime : '18:00'
            },
            {
              day : "Sunday",
              fromTime : '8:00',
              tillTime : '18:00'
            },
          ]
        }
      }
    }
  })
  return redirect("/onboarding/grant-id")
}

export async function SettingsAction(prevState : any,formData : FormData){
  const session = await getUser();

  const submission = parseWithZod(formData, {
    schema : SettingsSchema
  })
  if(submission.status !== "success"){
    return submission.reply();
  }

  const user = await prisma.user.update({
    where : {
      id : session?.user?.id,
    },
    data : {
      name : submission.value.fullName,
      image : submission.value.profileImage
    }
  })
  return redirect('/dashboard')
}