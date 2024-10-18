import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OnboardingRoute(){
    return (
        <div className="min-h-screen w-screen flex justify-center items-center">
       <Card>
        <CardHeader>
        <CardTitle>Welcome to Slate</CardTitle>
        <CardDescription>We need the following details to set up your profile!</CardDescription>
        </CardHeader>
        <form>
        <CardContent className="grid gap-y-5">
        <div className="grid gap-y-3 ">
      <Label>Full name</Label>
      <Input placeholder="John doe"/>
        </div>
        <div className="grid gap-y-2">
       <Label>Username</Label>
       <div className="flex rounded-md">
       <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted 
       text-sm text-muted-foreground">Slate</span>
       <Input className="rounded-l-none" placeholder="unique-user-1"/>
       </div>
        </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full bg-rose-500">Submit</Button>
        </CardFooter>
        </form>
       </Card>
        </div>
    )
}