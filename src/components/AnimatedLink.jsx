import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import gsap from 'gsap';
 
const AnimatedLink = ({ to = "#", children, className = "", showLine = false }) => {
    const linkRef = useRef(null);
    const lineRef = useRef(null);
 
    const handleMouseEnter = () => {
        const textElements = linkRef.current.querySelectorAll('.animated-text');
 
        gsap.to(textElements, {
            y: '-100%',
            duration: 0.4,
            ease: 'power2.inOut'
        })
        if (showLine) {
            gsap.to(lineRef.current, {
                width: '0%',
                duration: 0.4,
                ease: 'power2.inOut'
            })
        }
    }
 
    const handleMouseLeave = () => {
        const textElements = linkRef.current.querySelectorAll('.animated-text');
 
        gsap.to(textElements, {
            y: '0%',
            duration: 0.4,
            ease: 'power2.inOut'
        })
        if (showLine) {
            gsap.to(lineRef.current, {
                width: '100%',
                duration: 0.4,
                ease: 'power2.inOut'
            })
        }
    }
 
    return (
        <Link
            to={to}
            className={`font-semibold text-[19px] ${className}`}
            ref={linkRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className='overflow-hidden relative h-[24px]'>
                <span className='animated-text block'>{children}</span>
                <span className='animated-text block absolute top-full left-0'>{children}</span>
            </div>
            {
                showLine && (
                    <div className='w-full h-[2px] bg-primary' ref={lineRef}></div>
                )
            }
        </Link>
    )
}
 
export default AnimatedLink