
import Link from 'next/link'
import React from 'react'
import { DahboardLinks } from '../components/DahboardLinks'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { ThemeToggle } from '../components/ThemeToggle'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { redirect } from 'next/navigation'
import prisma from '../lib/db'
import { getUser } from '../lib/hooks'
import { signOut } from '../lib/auth'
import { Toaster } from '@/components/ui/sonner'

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      userName: true,
      grantId: true,
    }
  })
  if (!data?.userName) {
    return redirect('/onboarding')
  }
  /* if(!data.grantId){
       return redirect('/onboarding/grant-id')
   }*/
  return data;
}

export default async function Dashboardlayout({ children }: { children: React.ReactNode }) {
  const session = await getUser();
  const data = await getData(session.user?.id as string)
  return (
    <>
      <div className='min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
        <div className='hidden md:block border-r bg-muted/40'>
          <div className='flex h-full max-h-screen flex-col gap-2'>
            <div className='flex h-14 items-center pl-10 border-b px-4 lg:h-[60px] lg:px-6'>
              <Link href="/" className='flex items-center gap-2 pl-4' >

                <p className='text-2xl font-semibold leading-10'>Slate</p>
              </Link>
            </div>

            <div className='flex-1'>
              <nav className='grid items-start ox-2 lg:px-4'>
                <DahboardLinks />
              </nav>
            </div>
          </div>
        </div>

        <div className='flex flex-col'>
          <header className='h-14 flex items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
            <Sheet>
              <SheetTrigger>
                <Button
                  className='md:hidden shrink-0'
                  size="icon"
                  variant="outline"
                >
                  <Menu className='size-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className='flex flex-col'>
                <nav className='grid gap-2 mt-10'>
                  <span className='font-semibold leading-relaxed text-2xl pl-5'>Slate</span>
                  <DahboardLinks />
                </nav>
              </SheetContent>
            </Sheet>

            <div className='ml-auto flex items-center gap-x-4'>
              <ThemeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className='rounded-full'>
                    <img className='w-full h-full rounded-full' src={session?.user?.image as string} alt='DP' width={20} height={20} />
                  </Button>
                </DropdownMenuTrigger >
                <DropdownMenuContent asChild align='end'>
                  <DropdownMenuLabel>
                    My account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <form className='w-full' action={async () => {
                      "use server"
                      await signOut()
                    }}>
                      <button className='w-full text-left'>
                        Log out
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className='flex flex-1 flex-col gap-4 p-4 lg:p-6 lg:gap-6'>
            {children}
          </main>
        </div>
      </div>
      <Toaster richColors closeButton/>
    </>
  )
}

