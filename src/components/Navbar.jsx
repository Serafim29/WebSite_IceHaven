import { useState } from 'react'
import { Link } from 'react-router-dom'
import AnimatedLink from './AnimatedLink'
import MobileMenu from './MobileMenu'
import { BsCart3 } from "react-icons/bs"
import { useCart } from '../context/CartContext'

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { toggleCart, getTotalItems } = useCart()
  
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const totalItems = getTotalItems()

  return (
    <nav className='flex justify-between items-center'>
      <div>
        <Link to="/" className='text-[20px] md:text-[30px] lg:text-[35px] font-black font-inter tracking-tight'>Ice Haven</Link>
      </div>


      <div className='hidden lg:flex items-center gap-6 xl:justify-between xl:gap-4 xl:w-1/2'>
        <ul className='flex items-center gap-6 xl:gap-12 text-[19px]'>
          <li><AnimatedLink to="/rent">Rent equipment</AnimatedLink></li>
          <li><AnimatedLink >Map</AnimatedLink></li>
          <li><AnimatedLink >Accommodation</AnimatedLink></li>
        </ul>
        <div className='flex items-center gap-4'>
          <button 
            onClick={toggleCart}
            className='relative p-2 hover:bg-primary/10 rounded-lg transition-all'
          >
            <BsCart3 className='text-[24px]' />
            {totalItems > 0 && (
              <span className='absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                {totalItems}
              </span>
            )}
          </button>
          <AnimatedLink showLine={true}>
            <span>Contact us</span>
          </AnimatedLink>
        </div>
      </div>

      <div className='lg:hidden flex items-center gap-3'>
        <button 
          onClick={toggleCart}
          className='relative p-2 hover:bg-primary/10 rounded-lg transition-all'
        >
          <BsCart3 className='text-[20px] md:text-[24px]' />
          {totalItems > 0 && (
            <span className='absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center'>
              {totalItems}
            </span>
          )}
        </button>
        <AnimatedLink showLine={true} onClick={handleMenuClick} classNameText='md:text-[19px]'>
          <span>Menu</span>
        </AnimatedLink>
      </div>
      {isMenuOpen && <MobileMenu closeMenu={handleMenuClick}/>}
    </nav>
  )
}

export default Navbar