
import { getUser } from "../lib/hooks.ts";

export default async function DashboardPage() {
  const session = await getUser();
  return (
    <div>

    </div>
  )
}