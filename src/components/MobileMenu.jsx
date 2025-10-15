import React from 'react';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

const MobileMenu = ({ closeMenu }) => {
  return (
    <div className="lg:hidden absolute top-0 left-0 w-screen h-screen bg-white z-50">
      <button
        type="button"
        aria-label="Close menu"
        className="absolute right-6 top-5"
        onClick={closeMenu}
      >
        <IoClose className="text-[45px]" />
      </button>

      <ul className="h-[95%] flex flex-col justify-center items-center gap-18 text-[35px]">
        <li>
          <Link to="/rent">Rent equipment</Link>
        </li>
        <li>
          <Link to="/map">Map</Link>
        </li>
        <li>
          <Link to="/accommodation">Accommodation</Link>
        </li>
        <li className="w-full px-8">
          <Link to="/contact" className="flex flex-col items-center">
            <span>Contact us</span>
            <div className="w-full h-[4px] bg-primary" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;


