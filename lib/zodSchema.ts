import { conformZodMessage } from "@conform-to/zod"
import { z } from "zod"

export const onBoardingSchema = z.object({
    fullname: z.string().min(3).max(150),
    userName: z
        .string()
        .min(3)
        .max(150)
        .regex(/^[a-zA-Z0-9-]+$/, {
            message: "Username can only contain letters, numbers and -"
        })
})

export function onboardUsernameValidation(options?: {
    isUsernameUnique: () => Promise<boolean>
}) {
    return z.object({
        userName: z
            .string()
            .min(3)
            .max(150)
            .regex(/^[a-zA-Z0-9-]+$/, {
                message: "Username can only contain letters, numbers and -"
            })
            //custom username validation 
            .pipe(
                z.string().superRefine((_, ctx) => {
                    if (typeof options?.isUsernameUnique !== "function") {
                        ctx.addIssue({
                            code: "custom",
                            fatal: true,
                            message: conformZodMessage.VALIDATION_UNDEFINED
                        })
                        return
                    }
                    return options.isUsernameUnique().then((isUnique) => {
                        if (!isUnique) {
                            ctx.addIssue({
                                code: "custom",
                                message: "Username is already used"
                            })
                        }
                    })
                })
            ),
        fullname: z.string().min(3).max(150)
    })
}