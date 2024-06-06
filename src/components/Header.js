import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'

function Header() {
    return (
        <header className="h-12 mx-auto shadow-xl flex flex-col justify-center bg-black bg-opacity-80 absolute top-0 w-screen z-20 ">
            <div className="h-full flex justify-evenly w-11/12 mx-auto">
                <div className='h-full flex gap-5 mt-[.5rem]'>
                    
                    <img src="/img/hdfcergo.png" alt="logo" style={{height: '2rem'}} />
                    <img src="/img/c.png" alt="logo" style={{height: '2rem'}} />
                    <img src="/img/mcm.jpg" alt="logo" style={{height: '2rem'}} />
                    <img src="/img/iitb-logo.png" alt="logo" className='' 
                    style={{ height: '2rem' }}
                    />
                </div>
                <h1 className=' w-2/3 font-bold text-xl flex flex-col justify-center h-full text-right font-merriweather' style={{color: 'white'}}>Experimental Mumbai Flood Warning System</h1>
                <ul className="flex w-1/3 space-x-5 h-full justify-end">
                    <li className='flex flex-col justify-center'>
                        <Link to="/" className="p-2 rounded-xl text-white bold text-sm flex flex-col justify-center hover:bg-white hover:text-black font-serif">Home</Link>
                    </li>
                    <li className='flex flex-col justify-center'>
                        <Link to="/train" className="p-2 rounded-xl text-white bold text-sm flex flex-col justify-center hover:bg-white hover:text-black font-serif">Train</Link>
                    </li>
                    <li className='flex flex-col justify-center'>
                        <Link to="/past" className="p-2 rounded-xl text-white bold text-sm flex flex-col justify-center hover:bg-white hover:text-black font-serif">Past Data</Link>
                    </li>
                    <li className='flex flex-col justify-center'>
                            <Link to="/about" className="p-2 rounded-xl text-white bold text-sm flex flex-col justify-center hover:bg-white hover:text-black font-serif">About</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
