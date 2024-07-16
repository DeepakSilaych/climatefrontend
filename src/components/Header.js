import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'

function Header() {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1000);
    React.useEffect(() => {
        window.addEventListener('resize', () => {
            setIsMobile(window.innerWidth < 1000);
        });
    }, []);
    return (    
        <header className="h-[5rem] mx-auto shadow-xl flex flex-col justify-center bg-[#F3F8FF] w-full max overflow-hidden z-50">
            <div className={`h-full flex justify-evenly ${isMobile ? 'w-full' : 'w-11/12'} mx-auto`}>
                <div className='h-full flex gap-5 mt-[.5rem]'>
                    <Link to="https://www.iitb.ac.in/"><img src="/img/iitb copy.png" alt="logo" className='' style={{ height: '3.5rem',marginTop: '0.5rem' }}/></Link>
                    <Link to="https://www.climate.iitb.ac.in/"><img src="/img/cs.png" alt="logo" style={{height: '2.5rem', marginTop: '1rem'}} /></Link>
                    <Link to="https://www.hdfcergo.com/"><img src="/img/hebg.png" alt="logo" style={{height: '4.5rem', marginTop: '0rem'}} /></Link>
                    <Link to="https://mcmcr.mcgm.gov.in/"><img src="/img/mcm.jpg" alt="logo" style={{height: '2.5rem', marginTop: '1rem'}} /></Link>
                    
                </div>
                {!isMobile &&
                <h1 className=' w-1/3 font-bold text-2xl flex flex-col justify-center h-full text-right text-black font-merriweather ' style={{color: 'black', marginLeft: '80px'}}>MUMBAI FLOOD EXPERIMENT</h1> }
                <ul className="flex w-1/3 space-x-5 h-full justify-end">
                    <li className='flex flex-col justify-center'>
                        <Link to="/" className="p-2 rounded-xl text-black bold text-lg flex flex-col justify-center hover:bg-blue-200 hover:text-black font-serif">Home</Link>
                    </li>
                     <li className='flex flex-col justify-center'>
                        <Link to="/train" className="p-2 rounded-xl text-black bold text-lg flex flex-col justify-center hover:bg-blue-200 hover:text-black font-serif">Rail</Link>
                    </li>
                    <li className='flex flex-col justify-center'>
                        <Link to="/tweet" className="p-2 rounded-xl text-black bold text-lg flex flex-col justify-center hover:bg-blue-200 hover:text-black font-serif">Tweet</Link>
                    </li>
                    {/* <li className='flex flex-col justify-center'>
                        <Link to="/past" className="p-2 rounded-xl text-black bold text-lg flex flex-col justify-center hover:bg-white hover:text-black font-serif">Past Data</Link>
                    </li>  */}
                    <li className='flex flex-col justify-center'>
                            <Link to="/about" className="p-2 rounded-xl text-black bold text-lg flex flex-col justify-center hover:bg-blue-200 hover:text-black font-serif">About</Link>
                    </li>
                </ul>
            </div>

        </header>
    );
}

export default Header;
