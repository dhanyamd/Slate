import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import Logo from "@/public/Logo.png"
import { signIn, signOut } from "../lib/auth";
import { GithubAuthButton, GoogleAuthButton } from "./SubmitButton";
export function AuthModal(){
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-rose-500">Try for Free</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[360px]">
         <DialogHeader className="flex flex-row gap-2 justify-center items-center">
            <Image src={Logo} alt="Logo" className="size-11 rounded-xl"/>
            <h4 className="text-3xl font-semibold pb-2">
             Sl<span className="text-primary">ate</span>
            </h4>
         </DialogHeader>
         <div className="flex flex-col mt-5 gap-3">
            <form action={async() => {
                "use server"
                await signIn('google')
            }} className="w-full">
           <GoogleAuthButton/>
            </form>
            <form action={async() => {
                "use server"
                await signIn('github')
            }}>
            <GithubAuthButton/>
            </form>
         </div>
        </DialogContent>
    </Dialog>
  )
}