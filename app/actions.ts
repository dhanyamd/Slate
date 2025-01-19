'use server'
import { eventTypeSchema, onBoardingSchema, onboardUsernameValidation, SettingsSchema } from "@/app/lib/zodSchema";
import { parseWithZod } from "@conform-to/zod"
import { redirect } from "next/navigation";
import { getUser } from "./lib/hooks";
import prisma from "./lib/db";
import { revalidatePath } from "next/cache";
import { nylas } from "./lib/nylas";

export async function onBoardingAction(prevState: any, formData: FormData) {
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

export async function updateAVailabilityAction(formData : FormData){
    const session = await getUser();
    const rawData = Object.fromEntries(formData.entries());

    const availabilityData = Object.keys(rawData)
    .filter((key) => key.startsWith("id-"))
    .map((key) => {
      const id = key.replace("id-", "");
       
      return {
        id,
        isActive : rawData[`isActive-${id}`] == "on",
        fromTime : rawData[`fromTime-${id}`] as string,
        tillTime : rawData[`tillTime-${id}`] as string
      }
    })
    try{
      //avoids multiple db calls 
      await prisma.$transaction(
        availabilityData.map((item) => prisma.availability.update({
          where : {
            id : item.id
          },
          data : {
            isActive : item.isActive,
            fromTime : item.fromTime,
            tillTime : item.tillTime
          }
        }))
      )
      revalidatePath('/dashboard/availability')
    }catch(error){
     console.log(error)
    }
}

export async function CreateEventTypeAction(prevState: any, formData : FormData){
  const session = await getUser();

  const submission = await parseWithZod(formData, {
    schema : eventTypeSchema
  })

  if(submission.status !== "success"){
    return submission.reply();
  }
  await prisma.eventTypes.create({
    data : {
      title : submission.value.title,
      duration : submission.value.duration,
      url : submission.value.url,
      description : submission.value.description,
      videoCallSoftware : submission.value.videoCallSoftware,
      userId : session.user?.id as string
    }
  })
  return redirect('/dashboard')
}

export async function createMeetingAction(formData : FormData){
   const getUser = await prisma.user.findUnique({
    where : {
      userName : formData.get("userName") as string
    },
    select : {
      grantEmail: true,
      grantId : true
    }
   })
   if(!getUser){
    throw new Error("User not found")
   }

   const eventType = await prisma.eventTypes.findUnique({
    where : {
      id : formData.get("eventTypeId") as string
    },
    select : {
      title : true,
      description : true
    }
   })

   const fromTime = formData.get("fromTime") as string
   const eventDate = formData.get("eventData") as string
   const meetingLength = Number(formData.get("meetingLength")) 

   const startDateTime = new Date(`${eventDate}T${fromTime}:00`)
   console.log(startDateTime)
   //minutes converted to milliseconds
   const endDateTime = new Date(startDateTime.getTime() + meetingLength * 60000)
   console.log(endDateTime)
  
    nylas.events.create({
    identifier : getUser.grantId as string,
    requestBody : {
      title : eventType?.title,
      description : eventType?.description,
      when : {
        startTime : Math.floor(startDateTime.getTime()/1000),
        endTime : Math.floor(endDateTime.getTime()/1000)
      },
      conferencing: {
        autocreate: {},
        provider: "Google Meet",
      },
      participants: [
        {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          status: "yes",
        },
      ],
    },
    queryParams: {
      calendarId: getUser?.grantEmail as string,
      notifyParticipants: true,
    },
  });

  return redirect(`/success`);
}

export async function cancelMeetingAction( formData : FormData){
  const session = await getUser()
  
  const userData = await prisma.user.findUnique({
    where : {
      id : session.user?.id
    },
    select : {
      grantEmail : true,
      grantId : true
    }
  })
  if(!userData){
    throw new Error("User not found")
  }
 
  const data = await nylas.events.destroy({
    eventId: formData.get("eventId") as string,
    identifier: userData?.grantId as string,
    queryParams: {
      calendarId: userData?.grantEmail as string,
    },
  });

  revalidatePath("/dashboard/meetings");
}

export async function updateEventTypeStatusAction(
  prevState: any,
  {
    eventTypeId,
    isChecked,
  }: {
    eventTypeId: string;
    isChecked: boolean;
  }
) {
  try {
    const session = await getUser();

    const data = await prisma.eventTypes.update({
      where: {
        id: eventTypeId,
        userId: session.user?.id as string,
      },
      data: {
        active: isChecked,
      },
    });

    revalidatePath(`/dashboard`);
    return {
      status: "success",
      message: "EventType Status updated successfully",
    }
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
}

export async function EditEventTypeAction(prevState : any,formData : FormData){
  const session = await getUser()
 
  const submission =  parseWithZod(formData, {
    schema : eventTypeSchema
  })
  if(submission.status !== "success"){
    return submission.reply();
  }
  const data = await prisma.eventTypes.update({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id as string,
    },
    data: {
      title: submission.value.title,
      duration: submission.value.duration,
      url: submission.value.url,
      description: submission.value.description,
      videoCallSoftware: submission.value.videoCallSoftware,
    },
  });

  return redirect("/dashboard");
}

export async function DeleteEventTypeAction(formData: FormData) {
  const session = await getUser();

  const data = await prisma.eventTypes.delete({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id as string,
    },
  });

  return redirect("/dashboard");
}
