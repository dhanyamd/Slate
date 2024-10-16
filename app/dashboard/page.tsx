
import { getUser } from "../lib/hooks";

export default async function DashboardPage(){
    const session = await getUser();
  return (
    <div>

    </div>
  )
}