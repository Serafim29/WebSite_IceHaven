import React from 'react'
import { Link } from 'react-router-dom'
import { LuArrowUpRight } from "react-icons/lu";
 
const Hero = () => {
    return (
        <section id='hero' className='mt-[15%]'>
            <div className='flex'>
                <div className='w-1/2 pt-[30px]'>
                    <p className='text-[16px] font-semibold leading-tight w-[340px]'>Book your stay now to be part <br /> of an unforgettable mountain adventure <br /> and enjoy impeccable service</p>
                    <Link to="/rent" className='inline-block max-w-fit mt-[35px]'>
                        <div className='flex items-center gap-3'>
                            <span className='text-[18px] uppercase font-semibold'>Book a place</span>
                            <LuArrowUpRight className='text-[25px]'/>
                        </div>
                        <div className='w-full h-[2px] bg-primary mt-1'></div>
                    </Link>
                </div>
                <div className='w-1/2'>
                    <p className='text-5xl font-semibold leading-tight'>A snowy paradise for your holiday with care and comfort. Inspiring slopes and a warm atmosphere.</p>
                </div>
            </div>
            <div className='uppercase font-lanze text-[320px] flex items-start leading-none mt-[70px]'>
                <div className='w-1/2 flex items-start gap-4'>
                    <span>ski</span>
                    <img src="/images/hero.jpeg" alt="hero" className='h-[0.82em] w-[1.15em] object-cover rounded-xl'/>
                </div>
                <span className='w-1/2 -ml-4'>resort</span>
            </div>
        </section>
    )
}
 
export default Hero