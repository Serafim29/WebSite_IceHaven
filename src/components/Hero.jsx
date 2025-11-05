import React from 'react'
import { Link } from 'react-router-dom'
import { LuArrowUpRight } from "react-icons/lu";
import AnimatedLink from './AnimatedLink'
import HeroMobile from './HeroMobile';
import SkiResortHero from './SkiResortHero';

const Hero = () => {
    return (
        <section id='hero' className='mt-[10%] lg:mt-[15%]'>

            <div className='hidden xl:flex justify-between'>
                <div className='w-1/2 pt-[30px]'>
                    <div className='w-[340px]'>
                        <p className='text-[16px] 2xl:text-[18px] font-semibold leading-tight'>Book your stay now to be part <br /> of an unforgettable mountain adventure <br /> and enjoy impeccable service</p>
                    </div>
                    <AnimatedLink to="/rent" showLine={true} className='inline-block max-w-fit mt-[35px]'>
                        <div className='flex items-center gap-3'>
                            <span className='text-[18px] uppercase font-semibold'>Book a place</span>
                            <LuArrowUpRight className='text-[25px]'/>
                        </div>
                    </AnimatedLink>
                </div>
                <div className='w-1/2'>
                    <p className='text-4xl 2xl:text-5xl font-semibold  leading-tight'>A snowy paradise for your holiday with care and comfort. Inspiring slopes and a warm atmosphere.</p>
                </div>
            </div>
            <SkiResortHero
                leftText="SKI"
                rightText="RESORT"
                img="/images/hero.jpeg"
            >
            </SkiResortHero>

            <div className='xl:hidden'>
                <HeroMobile/>
            </div>
            
        </section>
    )
}
export default Hero