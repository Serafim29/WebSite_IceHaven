import React from 'react'
import { useState,useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
 
const EventsCalendar = () => {
 
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("Sporting Events");
 
    useEffect(() => {
        fetch('http://localhost:3000/categories')
        .then(res => res.json())
        .then(data => setCategories(data))
        .catch(err => console.log(err))
    }, [])
 
    const currentCategory = categories.find(category => category.name === activeCategory);
 
    console.log(currentCategory);
 
 
  return (
    <section id='events-calendar' className='py-16'>
        <div className="container-custom">
            <h1 className="text-[100px] font-lanze uppercase font-black text-center mb-2 leading-none">events calendar</h1>
        </div>
        <div className='flex items-center justify-center gap-[50px] mb-6 w-[70%] mx-auto'>
            {
                categories.map((category,index) => (
                    <button
                    key={index}
                    className={`cursor-pointer text-[42px] font-semibold hover:scale-105 transition-all duration-300 ${activeCategory === category.name ? 'text-primary' : 'text-primary/60'}`}
                    onClick={() => setActiveCategory(category.name)}>
                        {category.name}
                    </button>
                ))
            }
        </div>
 
        <p className='text-[17px] font-semibold text-center mb-6'>{currentCategory?.description}</p>
 
        <div className='relative'>
            <Swiper
            modules={[Navigation]}
            spaceBetween={100}
            slidesPerView={3}
            loop={true}
            navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
            }}
            className='pb-20'
            key={activeCategory}
            >
                {currentCategory?.events?.map((event, index) => (
                    <SwiperSlide key={index}>
                        <div className='border-[2px] border-primary rounded-lg p-6 overflow-hidden h-full flex flex-col '>
                            <div className='h-[300px]'>
                                <img src={event.img} alt="" className='w-full h-full object-cover rounded-lg' />
                            </div>
                            <div>
                                <h3 className='text-[16px] font-base mt-2'>"{event.title}"</h3>
 
                                <div className='flex items-center flex-wrap gap-2 mt-3'>
                                    <span className='px-2 py-1 text-center border-[2px] border-primary rounded-full text-[12px] font-semibold'>Date: {event.tags.date}</span>
                                    <span className='px-2 py-1 text-center border-[2px] border-primary rounded-full text-[12px] font-semibold'>Time: {event.tags.time}</span>
                                    <span className='px-2 py-1 text-center border-[2px] border-primary rounded-full text-[12px] font-semibold'>Location: {event.tags.location}</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
 
            <div className='flex justify-center items-center mt-12'>
                <div className='flex items-center gap-6 border-[2px] border-primary rounded-full px-3 py-1'>
                    <button className='swiper-button-prev-custom cursor-pointer'>
                        <BsArrowLeft className='text-[30px] hover:text-primary/60 hover:scale-105 transition-all duration-300' />
                    </button>
                    <button className='swiper-button-next-custom cursor-pointer'>
                        <BsArrowRight className='text-[30px] hover:text-primary/60 hover:scale-105 transition-all duration-300' />
                    </button>
                </div>
            </div>
        </div>
    </section>
  )
}
 
export default EventsCalendar
 