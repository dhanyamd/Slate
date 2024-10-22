import { EmptyState } from "../components/EmptyState";
import prisma from "../lib/db";
import { getUser } from "../lib/hooks";

async function getData( id : string){
  const data = await prisma.user.findUnique({
    where : {
      id : id
    },
    select : {
      userName : true,
      eventType : {
        select : {
          id : true,
          active : true,
          url : true,
          title : true,
          duration : true
        }
      }
    }
  })
  if(!data){
    return null
  }
  return data;
}
export default async function DashboardPage() {
  const session = await getUser();
  const data = await getData(session?.user?.id as string)
  return (
    <>
    {data?.eventType.length === 0 ? (
      <EmptyState 
      title="You have no event types"
      description="You can create your first evnt by clicking the button below"
      buttonText="Add event type"
      href="/dashboard/new"
      />
    ) : (
      <p></p>
    )}
    </>
  )
}