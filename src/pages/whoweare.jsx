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

const WhoWeAre = () => {
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
                        Join us in this initiative to help Mumbai manage its day-to-day life during monsoon. Report flood in your area using  <Link to="" className='underline'>THIS</Link> form. Help us help you.
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
                                <img src={csLogo} alt="Climate Studies Logo" />
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
                            <ul>
                                <li>Prof. Subimal Ghosh</li>
                                <li>Prof. Raghu Murtugudde</li>
                                <li>Dr. Aniket Navalkar</li>
                                <li>Dr. Mayank Gupta</li>
                                <li>Dr. Sanghita Basu</li>
                                <li>Puja Tripathy</li>
                            </ul>
                            <p>
                                Website & App developed by IIT Bombay students, Deepak Silaych & Gulshan Kumar
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

export default WhoWeAre;
