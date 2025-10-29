import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { IoArrowBack, IoClose } from "react-icons/io5"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { useCart } from '../context/CartContext'

const ApartmentDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, openCart } = useCart()

  const [apartment, setApartment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const swiperRef = useRef(null)

  useEffect(() => {
    fetch(`http://localhost:3000/apartments/${id}`)
      .then(res => res.json())
      .then(data => {
        setApartment(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const handleRent = () => {
    if (!apartment) return
    const cartItem = {
      id: `apt-${apartment.id}`,
      name: apartment.name,
      price: apartment.pricePerNight,
      image: apartment.images?.[0] || '',
      type: 'Apartment'
    }
    addToCart(cartItem)
    openCart()
  }

  const openLightbox = (index) => {
    setActiveImageIndex(index)
    setIsLightboxOpen(true)
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (!isLightboxOpen) return
      if (e.key === 'Escape') setIsLightboxOpen(false)
      if (e.key === 'ArrowLeft') setActiveImageIndex((i) => (i - 1 + (apartment?.images?.length || 0)) % (apartment?.images?.length || 1))
      if (e.key === 'ArrowRight') setActiveImageIndex((i) => (i + 1) % (apartment?.images?.length || 1))
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isLightboxOpen, apartment])

  if (loading) {
    return (
      <main className='py-8'>
        <div className='flex items-center justify-center h-[60vh]'>
          <p className='text-[18px] font-semibold'>Loading...</p>
        </div>
      </main>
    )
  }

  if (!apartment) {
    return (
      <main className='py-8'>
        <div className='flex flex-col items-center justify-center h-[60vh]'>
          <p className='text-[18px] font-semibold mb-4'>Apartment not found</p>
          <button
            onClick={() => navigate('/accommodation')}
            className='px-6 py-2 border-[2px] border-primary rounded-lg text-[14px] font-semibold hover:bg-primary hover:text-white transition-all'
          >
            Back to Accommodation
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className='py-8'>
      <button
        onClick={() => navigate(-1)}
        className='flex items-center gap-2 text-[14px] font-semibold mb-6 hover:text-primary transition-all'
      >
        <IoArrowBack /> Back
      </button>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-start'>
        <div className='relative group'>
          <Swiper
            onSwiper={(instance) => (swiperRef.current = instance)}
            modules={[Navigation]}
            spaceBetween={12}
            loop={true}
            className='w-full h-[420px] rounded-xl overflow-hidden border-[2px] border-primary shadow-[0_10px_30px_rgba(0,0,0,0.08)]'
          >
            {apartment.images?.map((img, idx) => (
              <SwiperSlide key={idx}>
                <button
                  type='button'
                  onClick={() => openLightbox(idx)}
                  className='w-full h-[420px] block'
                >
                  <img src={img} alt={`${apartment.name} ${idx + 1}`} className='w-full h-[420px] object-cover' />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            aria-label='Previous image'
            onClick={() => swiperRef.current?.slidePrev()}
            className='hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-3 w-auto h-auto p-2 text-primary hover:text-primary/80 transition-colors z-10'
          >
            <FaArrowLeft className='text-[22px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]' />
          </button>
          <button
            aria-label='Next image'
            onClick={() => swiperRef.current?.slideNext()}
            className='hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-3 w-auto h-auto p-2 text-primary hover:text-primary/80 transition-colors z-10'
          >
            <FaArrowRight className='text-[22px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]' />
          </button>
          <div className='absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-[12px] font-semibold'>
            Click image to view fullscreen
          </div>
        </div>

        <div>
          <div className='flex items-start justify-between mb-2'>
            <h1 className='text-4xl font-semibold'>{apartment.name}</h1>
            {apartment.rating && (
              <span className='px-3 py-1 rounded-full bg-primary/10 text-primary text-[13px] font-semibold'>⭐ {apartment.rating.toFixed(1)}</span>
            )}
          </div>
          <p className='text-[15px] text-primary/70 mb-2'>{apartment.type} • {apartment.location}</p>
          <div className='flex flex-wrap items-center gap-3 text-[13px] text-primary/80 mb-4'>
            <span className='px-3 py-1 rounded-full border-[2px] border-primary/40'>{apartment.capacity} guests</span>
            {typeof apartment.bedrooms === 'number' && <span className='px-3 py-1 rounded-full border-[2px] border-primary/40'>{apartment.bedrooms} bedrooms</span>}
            {typeof apartment.bathrooms === 'number' && <span className='px-3 py-1 rounded-full border-[2px] border-primary/40'>{apartment.bathrooms} bathrooms</span>}
            {apartment.areaSqm && <span className='px-3 py-1 rounded-full border-[2px] border-primary/40'>{apartment.areaSqm} m²</span>}
          </div>

          <p className='text-[16px] mb-6 leading-relaxed'>{apartment.description}</p>

          {apartment.amenities?.length > 0 && (
            <div className='mb-6'>
              <h3 className='text-[16px] font-semibold mb-2'>Amenities</h3>
              <div className='flex flex-wrap gap-2'>
                {apartment.amenities.map((a) => (
                  <span key={a} className='px-3 py-1 text-[12px] border-[2px] border-primary/50 rounded-full hover:border-primary transition-all'>{a}</span>
                ))}
              </div>
            </div>
          )}

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
            <div className='p-4 border-[2px] border-primary/30 rounded-lg'>
              <h4 className='text-[14px] font-semibold mb-1'>House rules</h4>
              <ul className='text-[13px] text-primary/80 list-disc ml-5 space-y-1'>
                <li>No smoking</li>
                <li>No parties or events</li>
                <li>Quiet hours 22:00–07:00</li>
              </ul>
            </div>
            <div className='p-4 border-[2px] border-primary/30 rounded-lg'>
              <h4 className='text-[14px] font-semibold mb-1'>Check-in/out & Cancellation</h4>
              <p className='text-[13px] text-primary/80'>Check-in: {apartment.checkIn || '15:00'} • Check-out: {apartment.checkOut || '11:00'}</p>
              <p className='text-[13px] text-primary/80 mt-1'>{apartment.cancellationPolicy || 'Standard policy applies.'}</p>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <span className='text-2xl font-bold'>${apartment.pricePerNight}<span className='text-[14px] font-medium text-primary/70'>/night</span></span>
            <button
              onClick={handleRent}
              className='px-6 py-3 bg-primary text-white rounded-lg text-[14px] font-semibold hover:bg-primary/90 transition-all shadow-[0_8px_20px_rgba(0,0,0,0.08)]'
            >
              Rent apartment
            </button>
          </div>
        </div>
      </div>

      {isLightboxOpen && (
        <div className='fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4'>
          <button
            aria-label='Close'
            onClick={() => setIsLightboxOpen(false)}
            className='absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 text-primary flex items-center justify-center hover:bg-white transition-all'
          >
            <IoClose className='text-[22px]' />
          </button>
          <button
            aria-label='Previous image'
            onClick={() => setActiveImageIndex((i) => (i - 1 + apartment.images.length) % apartment.images.length)}
            className='hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-primary items-center justify-center hover:bg-primary hover:text-white transition-all'
          >
            <FaArrowLeft className='text-[18px]' />
          </button>
          <img
            src={apartment.images[activeImageIndex]}
            alt={`${apartment.name} fullscreen`}
            className='max-h-[85vh] max-w-[92vw] rounded-lg shadow-2xl object-contain'
          />
          <button
            aria-label='Next image'
            onClick={() => setActiveImageIndex((i) => (i + 1) % apartment.images.length)}
            className='hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-primary items-center justify-center hover:bg-primary hover:text-white transition-all'
          >
            <FaArrowRight className='text-[18px]' />
          </button>
        </div>
      )}
    </main>
  )
}

export default ApartmentDetails


