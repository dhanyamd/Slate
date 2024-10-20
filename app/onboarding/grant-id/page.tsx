import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Cat from "@/public/5GJg.gif"
export default function OnboardingWithNylas(){
    return (
        <div className="min-h-screen flex items-center justify-center">
       <Card>
        <CardHeader>
            <CardTitle>
                You are almost done! 🎉
            </CardTitle>
            <CardDescription>We must now connect your calendar to your account!</CardDescription>
          
             <Image src={Cat} alt="cat" className="w-full rounded-lg" />
              
        </CardHeader>
        <CardContent>
            <Button asChild className="w-full">
                <Link href="/api/auth">
                <CalendarCheck2 className="size-4 mr-2"/>
                Connect calendar to your account
                </Link>
            </Button>
        </CardContent>
       </Card>
        </div>
    )
}
