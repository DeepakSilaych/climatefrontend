// HeaderMobile.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HeaderMobile() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1000);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="h-[5rem] mx-auto shadow-xl bg-[#F3F8FF] w-full max overflow-hidden z-20 mb-2">
            <div className={`h-full flex justify-between items-center ${isMobile ? 'w-full px-4' : 'w-11/12 mx-auto'}`}>
                <div className='flex gap-3 items-center'>
                    <Link to="https://www.iitb.ac.in/"><img src="/img/iitb copy.png" alt="logo" className='h-10' /></Link>
                    <Link to="https://www.climate.iitb.ac.in/"><img src="/img/cs.png" alt="logo" className='h-8' /></Link>
                    <Link to="https://www.hdfcergo.com/"><img src="/img/hdfcergo.png" alt="logo" className='h-8' /></Link>
                    <Link to="https://mcmcr.mcgm.gov.in/"><img src="/img/mcm.jpg" alt="logo" className='h-8' /></Link>
                </div>

                <h1 className='font-bold text-xs text-center text-black font-merriweather flex-grow'>
                    MUMBAI FLOOD EXPERIMENT
                </h1>

                <div className='flex gap-3'>
                    <div className="dropdown">
                        <button className="dropdown-btn" onClick={toggleDropdown}>
                            {/* Replace "Menu" text with an icon or any other suitable element */}
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div className="dropdown-content absolute bg-white rounded right-2 z-40">
                                <div className="dropdown-item hover:bg-gray-200 h-full w-full px-2 py-1">
                                    <Link to="/" className="dropdown-link">Home</Link>
                                </div>
                                <div className="dropdown-item hover:bg-gray-200 h-full w-full px-2 py-1">
                                    <Link to="/train" className="dropdown-link">Rail</Link>
                                </div>
                                <div className="dropdown-item hover:bg-gray-200 h-full w-full px-2 py-1">
                                    <Link to="/tweet" className="dropdown-link">Tweet</Link>
                                </div>
                                <div className="dropdown-item hover:bg-gray-200 h-full w-full px-2 py-1">
                                    <Link to="/about" className="dropdown-link">About</Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderMobile;
