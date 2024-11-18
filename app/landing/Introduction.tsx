import React from 'react'
import Tag from './Tag'

const text=`You are racing against time and heavy schedules everyday. Let us make it easy for you`

export default function Introduction() {
  return (
   <section className='py-24 lg:py-40'>
    <div className='container'>
        <div className='flex justify-center'>
        <Tag >Introducing Slate</Tag>
        </div>
        <div className='text-4xl md:text-6xl lg:text-7xl text-center font-medium mt-10'>
            <span>Your time and availability is very worthy. </span>
            <span className='text-white/15'>{text}</span>{""}
            <span className='text-rose-400 block'>That's why we built Slate, a lightweight tool  
                <span> to handle your busy events effectively</span> </span>
        </div>
    </div>
   </section>
  )
}

