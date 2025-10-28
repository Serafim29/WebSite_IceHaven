import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoSearch } from "react-icons/io5"
import { useCart } from '../context/CartContext'
 
const RentPage = () => {
  const navigate = useNavigate()
  const { addToCart, openCart } = useCart()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilters, setSelectedFilters] = useState({
    type: [],
    brand: [],
    size: [],
    color: []
  })
 
  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setFilteredProducts(data)
      })
      .catch(err => console.log(err))
  }, [])
 
  useEffect(() => {
    let filtered = [...products]
 
    if (selectedFilters.type.length > 0) {
      filtered = filtered.filter(product => selectedFilters.type.includes(product.type))
    }
 
    if (selectedFilters.brand.length > 0) {
      filtered = filtered.filter(product => selectedFilters.brand.includes(product.brand))
    }
 
    if (selectedFilters.size.length > 0) {
      filtered = filtered.filter(product => selectedFilters.size.includes(product.size))
    }
 
    if (selectedFilters.color.length > 0) {
      filtered = filtered.filter(product => selectedFilters.color.includes(product.color))
    }
 
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
 
    setFilteredProducts(filtered)
  }, [selectedFilters, searchTerm, products])
 
  const getUniqueValues = (key) => {
    return [...new Set(products.map(product => product[key]))]
  }
 
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => {
      const currentValues = prev[filterType]
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [filterType]: currentValues.filter(v => v !== value)
        }
      } else {
        return {
          ...prev,
          [filterType]: [...currentValues, value]
        }
      }
    })
  }
 
  // Clear all filters
  const clearFilters = () => {
    setSelectedFilters({
      type: [],
      brand: [],
      size: [],
      color: []
    })
    setSearchTerm('')
  }
 
  return (
    <main className='py-8'>
      <div className='mb-8'>
        <h1 className='text-5xl font-semibold mb-2'>Equipment Rental</h1>
        <p className='text-[16px] font-medium'>Find the perfect ski or snowboard for your adventure</p>
      </div>
 
      <div className='flex gap-8'>
        <aside className='w-1/4 flex-shrink-0'>
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
                  placeholder='Search products...'
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
              <h3 className='text-[16px] font-semibold mb-3'>Brand</h3>
              <div className='space-y-2'>
                {getUniqueValues('brand').map((brand) => (
                  <label key={brand} className='flex items-center gap-2 cursor-pointer group'>
                    <input
                      type='checkbox'
                      checked={selectedFilters.brand.includes(brand)}
                      onChange={() => handleFilterChange('brand', brand)}
                      className='w-4 h-4 accent-primary cursor-pointer'
                    />
                    <span className='text-[14px] font-medium group-hover:text-primary/60 transition-all'>{brand}</span>
                  </label>
                ))}
              </div>
            </div>
 
            <div className='mb-6'>
              <h3 className='text-[16px] font-semibold mb-3'>Size</h3>
              <div className='space-y-2'>
                {getUniqueValues('size').map((size) => (
                  <label key={size} className='flex items-center gap-2 cursor-pointer group'>
                    <input
                      type='checkbox'
                      checked={selectedFilters.size.includes(size)}
                      onChange={() => handleFilterChange('size', size)}
                      className='w-4 h-4 accent-primary cursor-pointer'
                    />
                    <span className='text-[14px] font-medium group-hover:text-primary/60 transition-all'>{size}</span>
                  </label>
                ))}
              </div>
            </div>
 
            <div className='mb-6'>
              <h3 className='text-[16px] font-semibold mb-3'>Color</h3>
              <div className='space-y-2'>
                {getUniqueValues('color').map((color) => (
                  <label key={color} className='flex items-center gap-2 cursor-pointer group'>
                    <input
                      type='checkbox'
                      checked={selectedFilters.color.includes(color)}
                      onChange={() => handleFilterChange('color', color)}
                      className='w-4 h-4 accent-primary cursor-pointer'
                    />
                    <span className='text-[14px] font-medium group-hover:text-primary/60 transition-all'>{color}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>
 
        <div className='flex-1'>
          <div className='mb-4'>
            <p className='text-[14px] font-semibold text-primary/60'>
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
 
          {filteredProducts.length === 0 ? (
            <div className='text-center py-20'>
              <p className='text-[18px] font-semibold text-primary/60'>No products found</p>
              <button
                onClick={clearFilters}
                className='mt-4 px-6 py-2 border-[2px] border-primary rounded-lg text-[14px] font-semibold hover:bg-primary hover:text-white transition-all'
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className='border-[2px] border-primary rounded-lg p-4 hover:scale-[1.02] transition-all duration-300 cursor-pointer'
                >
                  <div className='h-[200px] mb-4 overflow-hidden rounded-lg'>
                    <img
                      src={product.image}
                      alt={product.name}
                      className='w-full h-full object-cover hover:scale-110 transition-all duration-300'
                    />
                  </div>
                  <h3 className='text-[18px] font-semibold mb-2'>{product.name}</h3>
                  <div className='space-y-1 mb-3'>
                    <p className='text-[14px] font-medium text-primary/80'>
                      <span className='font-semibold'>Brand:</span> {product.brand}
                    </p>
                    <p className='text-[14px] font-medium text-primary/80'>
                      <span className='font-semibold'>Type:</span> {product.type}
                    </p>
                    <p className='text-[14px] font-medium text-primary/80'>
                      <span className='font-semibold'>Size:</span> {product.size}
                    </p>
                    <p className='text-[14px] font-medium text-primary/80'>
                      <span className='font-semibold'>Color:</span> {product.color}
                    </p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center justify-between mb-2'>
                      <span className='text-[20px] font-semibold'>${product.price}/day</span>
                    </div>
                    <div className='flex gap-2'>
                      <button 
                        onClick={() => navigate(`/rent/${product.id}`)}
                        className='flex-1 px-4 py-2 border-[2px] border-primary rounded-lg text-[14px] font-semibold hover:bg-primary/10 transition-all'
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => {
                          addToCart(product)
                          openCart()
                        }}
                        className='flex-1 px-4 py-2 border-[2px] border-primary rounded-lg text-[14px] font-semibold hover:bg-primary hover:text-white transition-all'
                      >
                        Add to Cart
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
 
export default RentPage