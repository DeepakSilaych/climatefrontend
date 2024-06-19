import React from 'react';
import { Link } from 'react-router-dom';
import '../WhoWeAre.css';
import Header from '../components/Header';
import iitbLogo from '../iitb.png';
import csLogo from '../icons/cs.png';
import hdfcLogo from '../icons/hdfc.png';
import mcmrLogo from '../icons/mcmbg.png';

import twitterIcon from '../icons/twitter.png';
import youtubeIcon from '../icons/youtube.png';
import facebookIcon from '../icons/facebook.png';

const About = () => {
    return (
        <>
            {/* <Header/> */}
            <section className='bg-white w-screen overflow-x-hidden overflow-y-scroll'>
                <div className='w-screen mx-auto py-10'>
                    <h1 className='text-4xl text-blue-700 font-bold text-center py-1'>ABOUT</h1>
                    <p className='text-2xl font-light w-3/4 mx-auto my-8 leading-[2rem]' >
                        A group of students, faculty, and staff from the Interdisciplinary Programme in Climate Studies (IDPCS) at IIT Bombay is developing an experimental rainfall forecasting system and a flood monitoring system to help Mumbai adapt to its persistent flood situation every monsoon, by dissemination of near-real-time water logging information to Mumbaikars using this website portal and Mumbai Flood App developed by our team. This is an HDFC-ERGO IIT Bombay (HE-IITB) Innovation Lab initiative funded by HDFC ERGO, and in collaboration with MCGM Centre for Municipal Capacity Building and Research (MCMCR).
                        <br/>
                        <br/>
                        The hyperlocal rainfall forecasts are based on global forecasting systems (GFS) and AI/ML modeling. The widgets in the <em>Rainfall</em> tab on the Home page in this web portal and app display forecasts at hourly intervals for 24 hours along with daily forecasts for the next three days, at the MCGM automatic weathers stations (AWS). For the rainfall forecast widget, visit the <em>Rainfall</em> tab on the Home page. 
                        <br/>
                        <br/>
                        We are also in the process of installing nine water-level monitoring stations at different flood-prone hotspots across Mumbai. These stations will display near-real-time waterlogging scenarios during monsoon. For complete details, visit the <em>Water level</em> tab on the Home Page.
                        <br/>
                        <br/>
                        Join us in this initiative to help Mumbai manage its day-to-day life during monsoon. Report flood in your area using  <a to="" className='underline'>THIS</a> form. Help us help you.
                    </p>
                </div>
            </section>
            <div className="who-we-are h-full">
                
                <h1>WHO WE ARE</h1>
                <div className="content">
                    <div className="left-section">
                        <div className="section">
                            <br></br>
                            <h2>Implementing Partners</h2>
                            <div className="partners">
                                <img src={iitbLogo} alt="IIT Logo" />
                                <img src='img/cs.png' alt="Climate Studies Logo" />
                            </div>
                        </div>
                        <div className="section">
                            <br></br>
                            <h2>Sponsoring Partner</h2>
                            <div className="partners">
                                <img src={hdfcLogo} alt="HDFC Ergo Logo" />
                            </div>
                        </div>
                        <div className="section">
                            <h2>Project Partner</h2>
                            <div className="partners">
                                <img src={mcmrLogo} alt="MCGM Center Logo" />
                            </div>
                        </div>
                    </div>
                    <div className="right-section">
                        <div className="iit-team">
                            <br></br>
                            <h2>IIT Bombay Team</h2>
                            <a href="https://www.linkedin.com/in/subimal-ghosh-640b46a/" className='flex hover:underline' to="">
                                Prof. Subimal Ghosh
                                <img src='img/redirect.svg' alt="Redirect" className='w-4 ml-4 flex flex-col justify-center' />
                            </a>
                            <a href="https://www.linkedin.com/in/raghu-murtugudde-b1438a3b/" className='flex hover:underline' to="">
                                Prof. Raghu Murtugudde
                                <img src='img/redirect.svg' alt="Redirect" className='w-4 ml-4 flex flex-col justify-center' />
                            </a>
                            <a href="https://www.linkedin.com/in/aniket-navalkar-4805bb3a/" className='flex hover:underline' to="">
                                Dr. Aniket Navalkar
                                <img src='img/redirect.svg' alt="Redirect" className='w-4 ml-4 flex flex-col justify-center' />
                            </a>
                            <a href="https://www.linkedin.com/in/mayank-gupta-b32a3225/" className='flex hover:underline' to="">
                                Dr. Mayank Gupta
                                <img src='img/redirect.svg' alt="Redirect" className='w-4 ml-4 flex flex-col justify-center' />
                            </a>
                            <a href="https://www.linkedin.com/in/dr-sanghita-basu-73190b60/" className='flex hover:underline' to="">
                                Dr. Sanghita Basu
                                <img src='img/redirect.svg' alt="Redirect" className='w-4 ml-4 flex flex-col justify-center' />
                            </a>
                            <a href="https://www.facebook.com/archismita.banerjee.5" className='flex hover:underline' to="">
                                Archismita Banerjee
                                <img src='img/redirect.svg' alt="Redirect" className='w-4 ml-4 flex flex-col justify-center' />
                            </a>
                            <a href="https://www.linkedin.com/in/puja-tripathy-82a324173/" className='flex hover:underline' to="">
                                Puja Tripathy
                                <img src='img/redirect.svg' alt="Redirect" className='w-4 ml-4 flex flex-col justify-center' />
                            </a>
                            <a href="https://www.linkedin.com/in/sheeba-sekharan/" className='flex hover:underline' to="">
                                Sheeba Sekharan
                                <img src='img/redirect.svg' alt="Redirect" className='w-4 ml-4 flex flex-col justify-center' />
                            </a>
                            <p className='text-gray-500'>
                                Website & App developed by IIT Bombay students: <br/>
                                <a className='pl-8 flex text-gray-500 hover:text-black hover:underline ' href="https://www.linkedin.com/in/deepaksilaych/">
                                    Deepak Silaych
                                    <img src='img/redirect.svg' alt="Redirect" className='w-4 ml-4 flex flex-col justify-center' />
                                </a>
                                <a href='https://www.linkedin.com/in/gulshan-kumar-69b54b25b/' className='pl-8 flex text-gray-500 hover:text-black hover:underline ' >
                                    Gulshan Kumar 
                                    <img src='img/redirect.svg' alt="Redirect" className='w-4 ml-4 flex flex-col justify-center' />
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="social-media-icons">
                    
                    <a href="https://x.com/ClimateIITB" target="_blank" rel="noopener noreferrer">
                        <img src={twitterIcon} alt="Twitter" />
                    </a>
                    <a href="https://www.youtube.com/@IDPinClimateStudiesIITBombay" target="_blank" rel="noopener noreferrer">
                        <img src={youtubeIcon} alt="YouTube" />
                    </a>
                    <a href="https://www.facebook.com/IITBclimate" target="_blank" rel="noopener noreferrer">
                        <img src={facebookIcon} alt="Facebook" />
                    </a>
                </div>
            </div>
        </>
    );
};

export default About;
