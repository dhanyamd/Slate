import ButtonGroup from "@/components/ButtonGroup";
import { AuthModal } from "../components/AuthModal";

export default function FooterDetails(){
    return (
    
        <div className="mt-[8rem] flex">
            <div className="flex flex-col md:text-6xl text-3xl">
                <div>
                Get instant access
                </div>
            <div className="mt-5 font-medium md:text-xl md:max-w-xl text-2xl text-neutral-500 " >
                No more heavy events scheduling and management. Celebrate the joy of 
                accomplishment with an app designed to track your busy meetings 
                effortlessly 
            </div>
            </div>
            <div className="flex flex-col justify-center mb-2 items-center ml-64">
               <div className="font-semibold text-fuchsia-500 text-lg">
                    Try for free today!
               </div>
               <div className="w-full p-7">
               <AuthModal className="bg-purple-600 hover:bg-purple-500 w-[200px]">

               </AuthModal>
               </div>
         </div>
        </div>
    
    )
}