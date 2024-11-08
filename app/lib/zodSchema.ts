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

/*export function onboardUsernameValidation(options?: {
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
}*/

export function onboardUsernameValidation(options?: {
    isUsernameUnique: () => Promise<boolean>;
  }) {
    return z.object({
      userName: z
        .string()
        .min(3)
        .max(150)
        .regex(/^[a-zA-Z0-9-]+$/, {
          message: "Username must contain only letters, numbers, and hyphens",
        })
        // Pipe the schema so it runs only if the email is valid
        .pipe(
          // The callback cannot be async here
          // As we run zod validation synchronously on the client
          z.string().superRefine((_, ctx) => {
            // This makes Conform to fallback to server validation
            // by indicating that the validation is not defined
            if (typeof options?.isUsernameUnique !== "function") {
              ctx.addIssue({
                code: "custom",
                message: conformZodMessage.VALIDATION_UNDEFINED,
                fatal: true,
              });
              return;
            }
  
            // If it reaches here, then it must be validating on the server
            // Return the result as a promise so Zod knows it's async instead
            return options.isUsernameUnique().then((isUnique) => {
              if (!isUnique) {
                ctx.addIssue({
                  code: "custom",
                  message: "Username is already used",
                });
              }
            });
          })
        ),
      fullname: z.string().min(3).max(150),
    });
  }

export const SettingsSchema = z.object({
  fullName : z.string().min(3).max(150),
  profileImage : z.string()
})

export const eventTypeSchema = z.object({
  title: z.string().min(3).max(150),
  duration: z.number().min(1).max(100),
  url: z.string().min(3).max(150),
  description: z.string().min(3).max(300),
  videoCallSoftware: z.string(),
});