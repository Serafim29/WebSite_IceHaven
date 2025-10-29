import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import 'swiper/css'
import 'swiper/css/navigation'

const EventsCalendar = () => {
  const [activeCategory, setActiveCategory] = useState('sporting')
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch categories from mock API
    setIsLoading(true)
    fetch('http://localhost:3000/categories')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched categories:', data)
        setCategories(data)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error fetching categories:', error)
        setIsLoading(false)
      })
  }, [])

  const currentCategory = categories.find(cat => cat.id === activeCategory)
  const currentEvents = currentCategory?.events || []

  console.log('Active category:', activeCategory)
  console.log('Current events:', currentEvents)

  if (isLoading) {
    return (
      <section className='py-16 md:py-24'>
        <div className='container-custom'>
          <h2 className='text-[45px] md:text-[70px] lg:text-[90px] xl:text-[100px] font-black text-center mb-8 md:mb-12 font-lanze tracking-tighter leading-none'>
            EVENTS CALENDAR
          </h2>
          <p className='text-center text-primary'>Loading events...</p>
        </div>
      </section>
    )
  }

  return (
    <section className='py-16 md:py-24'>
      <div className='container-custom'>
        {/* Title */}
        <h2 className='text-[45px] md:text-[70px] lg:text-[90px] xl:text-[100px] font-black text-center mb-8 md:mb-12 font-lanze tracking-tighter leading-none'>
          EVENTS CALENDAR
        </h2>

        {/* Category Tabs */}
        <div className='flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12 mb-4 md:mb-6'>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`text-[28px] md:text-[40px] lg:text-[48px] xl:text-[56px] font-black font-lanze transition-colors duration-300 leading-none ${
                activeCategory === category.id
                  ? 'text-primary'
                  : 'text-[#e8a4a4] hover:text-primary/50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Category Description */}
        <p className='text-center text-primary text-[13px] md:text-[15px] lg:text-[16px] max-w-4xl mx-auto mb-10 md:mb-14 font-normal leading-relaxed px-4'>
          {currentCategory?.description}
        </p>

        {/* Events Swiper */}
        <div className='relative'>
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 28,
              },
            }}
            className='pb-20'
            key={activeCategory}
          >
            {currentEvents.map((event, index) => (
              <SwiperSlide key={index}>
                <div className='border-[3px] border-primary rounded-[24px] overflow-hidden bg-white h-full flex flex-col shadow-sm'>
                  {/* Event Image */}
                  <div className='aspect-[4/3] overflow-hidden p-3'>
                    <img
                      src={event.image}
                      alt={event.title}
                      className='w-full h-full object-cover rounded-[16px]'
                    />
                  </div>

                  {/* Event Content */}
                  <div className='p-5 md:p-6 flex-1 flex flex-col'>
                    <h3 className='text-primary text-[15px] md:text-[16px] font-semibold mb-5 flex-1 leading-snug'>
                      "{event.title}"
                    </h3>

                    {/* Event Tags */}
                    <div className='flex flex-wrap gap-2'>
                      <span className='px-4 py-1.5 border-[2px] border-primary rounded-full text-primary text-[11px] md:text-[12px] font-medium whitespace-nowrap'>
                        Date: {event.tags.date}
                      </span>
                      <span className='px-4 py-1.5 border-[2px] border-primary rounded-full text-primary text-[11px] md:text-[12px] font-medium whitespace-nowrap'>
                        Time: {event.tags.time}
                      </span>
                      <span className='px-4 py-1.5 border-[2px] border-primary rounded-full text-primary text-[11px] md:text-[12px] font-medium whitespace-nowrap'>
                        Location: {event.tags.location}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>

        {/* Bottom Center Navigation */}
        <div className='flex justify-center mt-12'>
          <div className='flex items-center gap-2 border-[3px] border-primary rounded-full px-3 py-2 bg-white'>
            <button
              className='swiper-button-prev-custom text-primary hover:scale-110 transition-transform'
              aria-label='Previous slide'
            >
              <IoChevronBack size={32} />
            </button>
            <button
              className='swiper-button-next-custom text-primary hover:scale-110 transition-transform'
              aria-label='Next slide'
            >
              <IoChevronForward size={32} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventsCalendar