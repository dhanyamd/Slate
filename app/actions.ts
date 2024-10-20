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
      name: submission.value.fullname
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