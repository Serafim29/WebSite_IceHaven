import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoSearch } from "react-icons/io5"
import { useCart } from '../context/CartContext'

const Accommodation = () => {
  const navigate = useNavigate()
  const { addToCart, openCart } = useCart()

  const [apartments, setApartments] = useState([])
  const [filteredApartments, setFilteredApartments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilters, setSelectedFilters] = useState({
    type: [],
    location: [],
    capacity: []
  })

  useEffect(() => {
    fetch('http://localhost:3000/apartments')
      .then(res => res.json())
      .then(data => {
        setApartments(data)
        setFilteredApartments(data)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    let filtered = [...apartments]

    if (selectedFilters.type.length > 0) {
      filtered = filtered.filter(item => selectedFilters.type.includes(item.type))
    }

    if (selectedFilters.location.length > 0) {
      filtered = filtered.filter(item => selectedFilters.location.includes(item.location))
    }

    if (selectedFilters.capacity.length > 0) {
      filtered = filtered.filter(item => selectedFilters.capacity.includes(String(item.capacity)))
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredApartments(filtered)
  }, [selectedFilters, searchTerm, apartments])

  const getUniqueValues = (key) => {
    return [...new Set(apartments.map(item => key === 'capacity' ? String(item[key]) : item[key]))]
  }

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => {
      const currentValues = prev[filterType]
      if (currentValues.includes(value)) {
        return { ...prev, [filterType]: currentValues.filter(v => v !== value) }
      }
      return { ...prev, [filterType]: [...currentValues, value] }
    })
  }

  const clearFilters = () => {
    setSelectedFilters({ type: [], location: [], capacity: [] })
    setSearchTerm('')
  }

  const handleAddToCart = (apartment) => {
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

  return (
    <main className='py-8'>
      <div className='mb-8'>
        <h1 className='text-5xl font-semibold mb-2'>Accommodation</h1>
        <p className='text-[16px] font-medium'>Find and book the perfect stay near the slopes</p>
      </div>

      <div className='flex gap-8'>
        <aside className='w-[290px] shrink-0'>
          <div className='border-[2px] border-primary rounded-lg p-6 sticky top-8'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-[22px] font-semibold'>Filters</h2>
              {(Object.values(selectedFilters).some(arr => arr.length > 0) || searchTerm) && (
                <button
                  onClick={clearFilters}
                  className='text-[12px] font-semibold text-primary/60 hover:text-primary transition-all'
                >
                  Clear all
                </button>
              )}
            </div>

            <div className='mb-6'>
              <label className='text-[14px] font-semibold mb-2 block'>Search</label>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search apartments...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full px-4 py-2 pr-10 border-[2px] border-primary rounded-lg text-[14px] font-medium focus:outline-none focus:border-primary/60 transition-all'
                />
                <IoSearch className='absolute right-3 top-1/2 -translate-y-1/2 text-[20px] text-primary/60' />
              </div>
            </div>

            <div className='mb-6'>
              <h3 className='text-[16px] font-semibold mb-3'>Type</h3>
              <div className='space-y-2'>
                {getUniqueValues('type').map((type) => (
                  <label key={type} className='flex items-center gap-2 cursor-pointer group'>
                    <input
                      type='checkbox'
                      checked={selectedFilters.type.includes(type)}
                      onChange={() => handleFilterChange('type', type)}
                      className='w-4 h-4 accent-primary cursor-pointer'
                    />
                    <span className='text-[14px] font-medium group-hover:text-primary/60 transition-all'>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className='mb-6'>
              <h3 className='text-[16px] font-semibold mb-3'>Location</h3>
              <div className='space-y-2'>
                {getUniqueValues('location').map((loc) => (
                  <label key={loc} className='flex items-center gap-2 cursor-pointer group'>
                    <input
                      type='checkbox'
                      checked={selectedFilters.location.includes(loc)}
                      onChange={() => handleFilterChange('location', loc)}
                      className='w-4 h-4 accent-primary cursor-pointer'
                    />
                    <span className='text-[14px] font-medium group-hover:text-primary/60 transition-all'>{loc}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className='mb-2'>
              <h3 className='text-[16px] font-semibold mb-3'>Capacity</h3>
              <div className='space-y-2'>
                {getUniqueValues('capacity').map((cap) => (
                  <label key={cap} className='flex items-center gap-2 cursor-pointer group'>
                    <input
                      type='checkbox'
                      checked={selectedFilters.capacity.includes(cap)}
                      onChange={() => handleFilterChange('capacity', cap)}
                      className='w-4 h-4 accent-primary cursor-pointer'
                    />
                    <span className='text-[14px] font-medium group-hover:text-primary/60 transition-all'>{cap} guests</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className='flex-1'>
          <div className='mb-4'>
            <p className='text-[14px] font-semibold text-primary/60'>
              Showing {filteredApartments.length} of {apartments.length} apartments
            </p>
          </div>

          {filteredApartments.length === 0 ? (
            <div className='text-center py-20'>
              <p className='text-[18px] font-semibold text-primary/60'>No apartments found</p>
              <button
                onClick={clearFilters}
                className='mt-4 px-6 py-2 border-[2px] border-primary rounded-lg text-[14px] font-semibold hover:bg-primary hover:text-white transition-all'
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {filteredApartments.map((apt) => (
                <div key={apt.id} className='relative border-[2px] border-primary rounded-xl overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.10)] transition-shadow'>
                  {apt.rating && (
                    <div className='absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-white/90 text-primary text-[12px] font-bold border border-primary/30'>⭐ {apt.rating.toFixed(1)}</div>
                  )}
                  <button
                    onClick={() => navigate(`/accommodation/${apt.id}`)}
                    className='block w-full text-left'
                  >
                    <img src={apt.images?.[0]} alt={apt.name} className='w-full h-48 object-cover group-hover:scale-[1.02] transition-transform duration-300' />
                  </button>
                  <div className='p-4'>
                    <div className='flex items-center justify-between mb-1'>
                      <h3 className='text-[18px] font-semibold'>{apt.name}</h3>
                      <span className='text-[14px] font-semibold text-primary'>${apt.pricePerNight}/night</span>
                    </div>
                    <p className='text-[13px] text-primary/70 mb-3'>{apt.type} • {apt.location} • {apt.capacity} guests</p>
                    <div className='flex flex-wrap gap-2 mb-3'>
                      {typeof apt.bedrooms === 'number' && <span className='px-2.5 py-1 rounded-full border-[2px] border-primary/30 text-[11px]'>{apt.bedrooms} br</span>}
                      {typeof apt.bathrooms === 'number' && <span className='px-2.5 py-1 rounded-full border-[2px] border-primary/30 text-[11px]'>{apt.bathrooms} ba</span>}
                      {apt.areaSqm && <span className='px-2.5 py-1 rounded-full border-[2px] border-primary/30 text-[11px]'>{apt.areaSqm} m²</span>}
                    </div>
                    <div className='flex items-center gap-3'>
                      <button
                        onClick={() => navigate(`/accommodation/${apt.id}`)}
                        className='px-4 py-2 border-[2px] border-primary rounded-lg text-[14px] font-semibold hover:bg-primary hover:text-white transition-all'
                      >
                        View details
                      </button>
                      <button
                        onClick={() => handleAddToCart(apt)}
                        className='px-4 py-2 bg-primary text-white rounded-lg text-[14px] font-semibold hover:bg-primary/90 transition-all shadow'
                      >
                        Rent apartment
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Accommodation


