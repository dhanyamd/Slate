'use client'
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Link2 } from "lucide-react";
import { toast } from "sonner";

export function CopyLink({meetingUrl} : {meetingUrl : string}){
    const handleCopy = async() => {
      try{
       await navigator.clipboard.writeText(meetingUrl)
       toast.success("URL has been copied")
      }catch(error){
        console.log(error)
        toast.error("URL couldn't be copied")
      }
    }
  return (
    <DropdownMenuItem className="pr-7" onSelect={handleCopy}>
       Copy
    </DropdownMenuItem>
  )
}