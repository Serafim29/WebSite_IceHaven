import React from 'react'
import { IoClose } from 'react-icons/io5'
import { BiTrash } from 'react-icons/bi'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
 
const CartDrawer = () => {
 
    const { cartItems, isCartOpen, toggleCart, updateQuantity, getTotalPrice, removeFromCart, clearCart } = useCart()
    const navigate = useNavigate()
    if (!isCartOpen) return null;
 
    return (
        <>
            <div className='fixed inset-0 bg-black/50 z-40 transition-opacity' />
            <div className='fixed right-0 top-0 w-full md:w-[500px] bg-white z-50 flex flex-col h-screen'>
                <div className='flex items-center justify-between p-6 border-b-[2px] border-primary'>
                    <h2 className='text-[24px] font-medium'>Your Cart</h2>
                    <button onClick={toggleCart} className='text-[30px] text-primary hover:text-primary/60 transition-all'>
                        <IoClose />
                    </button>
                </div>
 
                <div className='flex-1 overflow-y-auto p-4'>
                    {cartItems.length === 0 ? (
                        <div className='flex flex-col items-center justify-center h-full text-center'>
                            <p className='text-[30px] font-semibold '>Your cart is empty</p>
                            <p className='text-[18px] font-medium mt-2'>Add items to your cart to get started</p>
                            <button onClick={() => navigate('/rent')} className='cursor-pointer mt-5 px-4 py-2 border-[2px] border-primary rounded-lg text-[14px] font-semibold hover:bg-primary hover:text-white transition-all'>
                                Rent Now
                            </button>
                        </div>
                    ) : (
                        <div className='space-y-4'>
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className='border-[2px] border-primary rounded-lg p-4'
                                >
                                    <div className='flex gap-4'>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className='w-20 h-[100px] object-cover rounded-lg'
                                        />
                                        <div className='flex-1'>
                                            <h3 className='text-[16px] font-semibold mb-1'>{item.name}</h3>
                                            <p className='text-[12px] font-medium text-black/70 mb-2'>
                                                {item.brand} • {item.size} • {item.color}
                                            </p>
                                            <div className='flex items-center gap-3'>
                                                <div className='flex items-center gap-2 border-[2px] border-primary rounded-lg'>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className='px-3 py-1 text-gray-700 hover:text-primary transition-all text-[19px] font-semibold cursor-pointer'
                                                    >
                                                        -
                                                    </button>
                                                    <span className='text-[14px] font-semibold min-w-[20px] text-center text-gray-700'>
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className='px-3 py-1 text-gray-700 hover:text-primary transition-all text-[19px] font-semibold cursor-pointer'
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className='p-2 rounded-lg cursor-pointer'
                                                >
                                                    <BiTrash className='text-[19px] text-gray-600 hover:text-primary transition-all' />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='text-right'>
                                            <p className='text-[16px] font-bold text-gray-700'>${item.price * item.quantity}</p>
                                            <p className='text-[12px] font-medium text-primary/60'>${item.price}/day</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
 
                    }
 
                </div>
                    {
                        cartItems.length > 0 && (
                            <div className='border-t-[2px] border-primary p-4 space-y-4'>
                                <div className='flex items-center justify-between mb-4'>
                                    <span className='text-[18px] font-semibold'>Total:</span>
                                    <span className='text-[28px] font-bold'>${getTotalPrice()}</span>
                                </div>
                                <button className='cursor-pointer w-full py-2 text-base font-semibold text-white bg-emerald-500 rounded-lg hover:bg-primary/50 transition-all' onClick={() => navigate('/checkout')}>Checkout</button>
                                <button className='cursor-pointer w-full py-2 text-base font-semibold text-white bg-primary rounded-lg hover:bg-primary/50 transition-all' onClick={clearCart}>Clear Cart</button>
                            </div>
                        )
                    }
            </div>
        </>
    )
}
 
export default CartDrawer