import { SettingsForm } from '@/app/components/SettingsForm'
import prisma from '@/app/lib/db'
import { getUser } from '@/app/lib/hooks'
import { notFound } from 'next/navigation'
import React from 'react'

export const runtime = 'edge'
export const preferredRegion = 'home'
export const maxDuration = 300

async function getData(id : string){
    const data = await prisma.user.findUnique({
        where : {
            id : id
        },
        select : {
            email : true,
            name : true,
            image : true
        }
    })
    if(!data){
        return notFound()
    }
    return data 
}

export default async function SettingsRoute(){
    const session = await getUser();
    const data = await getData(session.user?.id as string);

    return (
    <SettingsForm 
    fullName={data.name as string}
    email={data.email}
    profileImage={data.image as string}
    />
    )
}
