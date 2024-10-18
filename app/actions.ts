import { onBoardingSchema } from "@/lib/zodSchema";
import prisma from "./lib/db";
import { getUser } from "./lib/hooks";
import {parseWithZod} from "@conform-to/zod"

export async function onBoardingRoute(formData : FormData){
    const session = await getUser();

    const submission = parseWithZod(formData,{
      schema : onBoardingSchema
    })

    if(submission.status !== "success"){
      return  submission.reply()
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