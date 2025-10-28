import React from 'react'

const SkiResortHero = ({leftText, rightText, img}) => {
  return (
        <div className='hidden uppercase font-lanze text-[301px] 2xl:text-[351px] xl:flex items-start leading-none mt-[70px]'>
                <div className='w-1/2 flex items-start gap-4'>
                    <span>{leftText}</span>
                    <img src={img} alt="hero" className='h-[0.82em] lg:w-[53%] object-cover rounded-xl'/>
                </div>
                <span className='w-1/2'>{rightText}</span>
        </div>
  )
}

export default SkiResortHero
