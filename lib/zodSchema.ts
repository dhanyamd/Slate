import {z} from "zod"
export const onBoardingSchema = z.object({
    fullname : z.string().min(3).max(150),
    userName : z
               .string()
               .min(3)
               .max(150)
               .regex(/^[a-zA-Z0-9-]+$/, {
                message : "Username can only contain letters, numbers and -"
               })
})