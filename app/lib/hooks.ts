import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function getUser() {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/");
  }

  return session;
}


