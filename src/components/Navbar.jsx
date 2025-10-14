import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center'>
      <div>
        <Link to="/" className='font-black text-[35px] font-inter tracking-tight'>Ice Haven</Link>
      </div>
      <div className='flex items-center justify-between gap-4 w-1/2'>
        <ul className='flex items-center gap-12 text-[19px]'>
          <li className=''><Link className='font-semibold' to="/rent">Rent equipment</Link></li>
          <li className=''><Link className='font-semibold' to="#">Map</Link></li>
          <li className=''><Link className='font-semibold' to="#">Accommodation</Link></li>
        </ul>
        <Link to="#" className='font-semibold text-[19px]'>
          <span>Contact us</span>
          <div className='w-full h-[2px] bg-primary'></div>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar