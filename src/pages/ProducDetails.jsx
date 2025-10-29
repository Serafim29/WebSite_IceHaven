import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5"
import { useCart } from '../context/CartContext'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, openCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product)
      openCart()
    }
  }

  if (loading) {
    return (
      <main className='py-8'>
        <div className='flex items-center justify-center h-[60vh]'>
          <p className='text-[18px] font-semibold'>Loading...</p>
        </div>
      </main>
    )
  }

  if (!product) {
    return (
      <main className='py-8'>
        <div className='flex flex-col items-center justify-center h-[60vh]'>
          <p className='text-[18px] font-semibold mb-4'>Product not found</p>
          <button
            onClick={() => navigate('/rent')}
            className='px-6 py-2 border-[2px] border-primary rounded-lg text-[14px] font-semibold hover:bg-primary hover:text-white transition-all'
          >
            Back to Products
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className='py-8'>
      <button
        onClick={() => navigate('/rent')}
        className='flex items-center gap-2 mb-8 text-[16px] font-semibold hover:text-primary/60 transition-all group'
      >
        <IoArrowBack className='text-[20px] group-hover:-translate-x-1 transition-all' />
        <span>Back to Equipment</span>
      </button>

      <div className='flex gap-8'>
        {/* Product Image */}
        <div className='w-1/2'>
          <div className='border-[2px] border-primary rounded-lg overflow-hidden sticky top-8'>
            <img
              src={product.image}
              alt={product.name}
              className='w-full h-[500px] object-cover'
            />
          </div>
        </div>

        {/* Product Details */}
        <div className='w-1/2'>
          <div className='mb-6'>
            <h1 className='text-5xl font-semibold mb-4'>{product.name}</h1>
            <div className='flex items-center gap-3 mb-4'>
              <span className='px-3 py-1 border-[2px] border-primary rounded-full text-[14px] font-semibold'>
                {product.brand}
              </span>
              <span className='px-3 py-1 border-[2px] border-primary rounded-full text-[14px] font-semibold'>
                {product.type}
              </span>
            </div>
          </div>

          <div className='mb-8'>
            <h2 className='text-[22px] font-semibold mb-3'>Description</h2>
            <p className='text-[16px] font-medium text-primary/80 leading-relaxed'>
              {product.description}
            </p>
          </div>

          <div className='border-[2px] border-primary rounded-lg p-6 mb-8'>
            <h3 className='text-[20px] font-semibold mb-4'>Specifications</h3>
            <div className='space-y-3'>
              <div className='flex justify-between items-center'>
                <span className='text-[16px] font-semibold text-primary/60'>Brand:</span>
                <span className='text-[16px] font-semibold'>{product.brand}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-[16px] font-semibold text-primary/60'>Type:</span>
                <span className='text-[16px] font-semibold'>{product.type}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-[16px] font-semibold text-primary/60'>Size:</span>
                <span className='text-[16px] font-semibold'>{product.size}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-[16px] font-semibold text-primary/60'>Color:</span>
                <span className='text-[16px] font-semibold'>{product.color}</span>
              </div>
            </div>
          </div>

          <div className='border-[2px] border-primary rounded-lg p-6'>
            <div className='flex items-center justify-between mb-4'>
              <div>
                <p className='text-[16px] font-medium text-primary/60 mb-1'>Rental Price</p>
                <p className='text-[42px] font-bold'>${product.price}<span className='text-[20px] font-semibold'>/day</span></p>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className='w-full py-4 border-[2px] border-primary rounded-lg text-[18px] font-semibold hover:bg-primary hover:text-white transition-all'
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductDetails