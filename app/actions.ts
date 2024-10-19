'use server'
import { onBoardingSchema, onboardUsernameValidation } from "@/lib/zodSchema";
import prisma from "./lib/db";
import { getUser } from "./lib/hooks";
import {parseWithZod} from "@conform-to/zod"

export async function onBoardingRoute(prevState : any,formData : FormData){
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

    if(submission.status !== "success"){
      return submission.reply()
    }
    const data = await prisma.user.update({
        where : {
          id : session.user?.id
        },
        data : {
            userName : submission.value.userName,
            name : submission.value.fullname
        }
    })
}