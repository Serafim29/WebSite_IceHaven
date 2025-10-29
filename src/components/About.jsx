import React from 'react'
import AnimatedLink from './AnimatedLink'
import {LuArrowUpRight} from 'react-icons/lu'

const About = () => {
  return (
    <section id='about' className='py-16 flex flex-col xl:flex-row items-center justify-between'>
        <div className='w-full xl:w-1/2'>
            <div className='w-full xl:w-[70%] flex flex-col gap-6'>
                    <h2 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl leading-tight font-semibold'>Why will this resort be your favorite?</h2>
                <div className='text-[11px] sm:w-[70%] md:w-[60%] lg:[50%] md:text-[12px] xl:text-[14px] xl:w-full 2xl:text-[16px] space-y-3 font-medium '>
                    <p>Our ski resort iss a place where your winter holiday dreams come to life.</p>
                    <p>Imagine yourself surrounded bysnow-covered peaks, breathing in the fresh mountain air.
                                        Here, you'll find slopes for every kill level--from gentle beginner trails to challenging routes for seasoned athletes.
                                        After an active day, enjoy cozy rooms with panoramic views, ocal cuisinet our restaurants, and rejuventaing SPA facilities.
                    </p>
                    <p>Every detail has been creafted to make your stay truly unforgettable.</p>
                </div>
                <div className='hidden xl:block xl:w-full'>
                        <AnimatedLink to="#" showLine={true} className='inline-block max-w-fit mt-[25px]'>
                            <div className='flex items-center gap-3'>
                                <span className='text-[18px] uppercase font-semibold'>Read more </span>
                                <LuArrowUpRight className='text-[25px]'/>
                            </div>
                        </AnimatedLink>
                </div>
            </div>
        </div>
        <div className='w-full mt-[5%] xl:w-1/2'>
            <img src="/images/about.png" alt="" className='w-full h-full object-cover rounded-lg' />
            <div className='w-full xl:hidden'>
                        <AnimatedLink to="#" showLine={true} className='inline-block max-w-fit mt-[25px]'>
                            <div className='flex items-center gap-11 xl:gap-3'>
                                <span className='text-[18px] uppercase font-semibold'>Read more </span>
                                <LuArrowUpRight className='text-[25px]'/>
                            </div>
                        </AnimatedLink>
            </div>
        </div>
    </section>

  )
}
export default About









{/*
    const About = () => {
  return (
    <section id='about' className='py-16 flex items-center justify-between'>
        <div className='w-1/2'>
            <div className='w-[70%] flex flex-col gap-6'>
                    <h2 className='txt-xs xl:text-5xl leading-tight font-semibold'>Why will this resort be your favorite?</h2>
                <div className='space-y-3 text-[14px] font-medium'>
                    <p>Our ski resort iss a place where your winter holiday dreams come to life.</p>
                    <p>Imagine yourself surrounded bysnow-covered peaks, breathing in the fresh mountain air.
                                        Here, you'll find slopes for every kill level--from gentle beginner trails to challenging routes for seasoned athletes.
                                        After an active day, enjoy cozy rooms with panoramic views, ocal cuisinet our restaurants, and rejuventaing SPA facilities.
                    </p>
                    <p>Every detail has been creafted to make your stay truly unforgettable.</p>
                </div>
                <div className='hidden xl:w-full'>
                        <AnimatedLink to="#" showLine={true} className='inline-block max-w-fit mt-[25px]'>
                            <div className='flex items-center gap-3'>
                                <span className='text-[18px] uppercase font-semibold'>Read more </span>
                                <LuArrowUpRight className='text-[25px]'/>
                            </div>
                        </AnimatedLink>
                </div>
            </div>
        </div>
        <div className='w-1/2'>
            <img src="/images/about.png" alt="" className='w-full h-full object-cover rounded-lg' />
        </div>
    </section>

  )
}

export default About
*/}