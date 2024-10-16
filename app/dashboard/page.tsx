import { redirect } from "next/navigation";
import { auth } from "../lib/auth"
import { getUser } from "../lib/hooks";

export async function DashboardPage(){
    const session = await getUser();
  return (
    <div>

    </div>
  )
}