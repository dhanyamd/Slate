import { AuthModal } from "../components/AuthModal";

export default function FooterDetails(){
    return (
    
        <div className="mt-[8rem] flex">
            <div className="flex flex-col md:text-6xl max-w-7xl md:max-w-full text-3xl">
                <div className="text-white/95">
                Get instant access
                </div>
            <div className="mt-5 font-medium md:block hidden md:text-xl md:max-w-xl max-w-md text-2xl text-neutral-500 " >
                No more heavy events scheduling and management. Celebrate the joy of 
                accomplishment with an app designed to track your busy meetings 
                effortlessly 
            </div>
            </div>
            <div className="flex flex-col lg:pl-[6rem] justify-center mb-2 items-center ml-5 md:ml-64">
               <div className="font-semibold text-fuchsia-500 text-lg">
                   <span className="mr-10">Try for free today!</span> 
               </div>
               <div className="w-full p-7">
               <AuthModal className="bg-purple-600 hover:bg-purple-500 w-[200px]">

               </AuthModal>
               <div className="text-sm md:hidden block font-normal text-neutral-500 pt-5">
               No more heavy events scheduling and management. Celebrate the joy of 
                accomplishment with an app designed to track your busy meetings 
                effortlessly 
               </div>
               </div>
              
         </div>
      
        </div>
    
    )
}