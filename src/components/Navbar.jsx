import { useState } from 'react'
import { Link } from 'react-router-dom'
import AnimatedLink from './AnimatedLink'
import MobileMenu from './MobileMenu'
import { BsCart3 } from 'react-icons/bs'
import { useCart } from '../context/CartContext'

const Navbar = () => {
    const { toggleCart } = useCart()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav className='flex justify-between items-center'>
            <div>
                <Link to="/" className='text-[20px] md:text-[30px] lg:text-[35px] font-black font-inter tracking-tight'>Ice Haven</Link>
            </div>

            <div className='hidden lg:flex items-center gap-6 xl:justify-between xl:gap-4 xl:w-1/2'>
                <ul className='flex items-center gap-6 xl:gap-12 text-[19px]'>
                    <li><AnimatedLink to="/rent">Rent equipment</AnimatedLink></li>
                    <li><AnimatedLink to="/map">Map</AnimatedLink></li>
                    <li><AnimatedLink to="/accommodation">Accommodation</AnimatedLink></li>
                </ul>

                <div className='flex items-center gap-4'>
                    <button onClick={toggleCart}>
                        <BsCart3 className='text-[24px] text-primary hover:text-primary/60 transition-all cursor-pointer' />
                    </button>
                    <AnimatedLink to="/contact" showLine={true}>
                        <span>Contact us</span>
                    </AnimatedLink>
                </div>
            </div>

            <div className='lg:hidden'>
                <AnimatedLink showLine={true} onClick={handleMenuClick} classNameText='md:text-[19px]'>
                    <span>Menu</span>
                </AnimatedLink>
            </div>
            {isMenuOpen && <MobileMenu closeMenu={handleMenuClick} />}
        </nav>
    )
}

export default Navbar