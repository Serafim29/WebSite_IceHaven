import React from 'react'
import AnimatedLink from './AnimatedLink'
import { LuArrowUpRight } from "react-icons/lu";
 
const About = () => {
    return (
        <section id='about' className='py-16 flex items-center justify-between'>
            <div className='w-1/2'>
                <div className='w-[70%] flex flex-col gap-6'>
                    <h2 className='text-5xl leading-tight font-semibold'>Why will this resort be your favorite ?</h2>
                    <div className='space-y-3 text-[14px] font-medium'>
                        <p>Our ski resort is a place where your winter holiday dreams come to life.</p>
                        <p>We offer a unique blend of adventure and relaxation, with world-class skiing and snowboarding, as well as a variety of other winter activities. Here, you'll find slopes for all skill levels, from beginner to expert, and a range of terrain to suit every taste.</p>
                        <p>Every detail has been crafted to make you stay truly unforgettable.</p>
                    </div>
                    <div className='w-full'>
                        <AnimatedLink to="#" showLine={true} classNameLink='inline-block max-w-fit mt-[25px]'>
                            <div className='flex items-center gap-3'>
                                <span className='text-[18px] uppercase font-semibold'>Read more</span>
                                <LuArrowUpRight className='text-[25px]' />
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
 