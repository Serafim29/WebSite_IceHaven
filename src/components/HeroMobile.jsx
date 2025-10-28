import React from 'react'
import { Link } from 'react-router-dom'
import { LuArrowUpRight } from "react-icons/lu";
import AnimatedLink from './AnimatedLink'

const HeroMobile = () => {
  return (
    <section id='hero' className='xl:hidden'>
            <div className='uppercase font-lanze text-[39vw] md:text-[41vw] flex flex-col items-start leading-[0.92]'>
                <div className='w-full flex items-start gap-2'>
                    <span>ski</span>
                    <img src="/images/hero.jpeg" alt="hero" className='h-[0.78em] w-[1.3em] object-cover rounded-md'/>
                </div>
                <div className='w-1/2'>
                    <span>resort</span>
                </div>
            </div>

            <div className='w-[90%] md:w-[80%] flex flex-col mt-[5%] md:mt-[2%] leading-none'>
                <div className='w-full'>
                    <p className='text-xl md:text-3xl font-semibold leading-tight'>A snowy paradise for your holiday with care and comfort. Inspiring slopes and a warm atmosphere.</p>
                </div>
                
                <div className='pt-[10%] md:pt-[4%]'>
                    <div className='w-[90%]'>
                        <p className='text-[11px] md:text-xl font-normal leading-tight'>Book your stay now to be part <br /> of an unforgettable mountain adventure <br /> and enjoy impeccable service</p>
                    </div>
                    
                    <AnimatedLink to="/rent" showLine={true} className='inline-block max-w-fit mt-[35px]'>
                        <div className='flex items-center gap-11'>
                            <span className='text-[18px] uppercase font-semibold'>Book a place</span>
                            <LuArrowUpRight className='text-[25px]'/>
                        </div>
                    </AnimatedLink>
                </div>
            </div>
        </section>
  )
}

export default HeroMobile
