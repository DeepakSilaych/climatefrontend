import React from 'react';
import '../WhoWeAre.css';
import Header from '../components/Header';
import iitbLogo from '../iitb.png';
import csLogo from '../icons/cs.png';
import hdfcLogo from '../icons/hdfc.png';
import mcmrLogo from '../icons/mcmr.png';
import instagramIcon from '../icons/instagram.png';
import twitterIcon from '../icons/twitter.png';
import youtubeIcon from '../icons/youtube.png';
import facebookIcon from '../icons/facebook.png';

const WhoWeAre = () => {
    return (
        <>
            {/* <Header/> */}
            <section className='bg-white w-screen overflow-x-hidden'>
                <div className='w-3/4 mx-auto pt-20'>
                    <h1 className='text-5xl text-blue-700 font-bold text-center py-5'>ABOUT</h1>
                    <p className='text-3xl font-light w-3/4 mx-auto leading-[3.4rem]' >
                    Climate Studies at IIT Bombay, in collaboration with HDFC Ergo, hopes to harness the power of social media to monitor Mumbai floods -- by taking help from its residents and asking them to post details about floods in their neighborhoods, and collecting this data to issue real-time geographically-specific flood alerts/warnings. The gathered data shall be used to improve flood emergency response and rescue efforts, and help develop accurate flood forecasts in the future.
                        <br />
                    Real-time information at hand can help save lives during disasters. At best, we hope to help Mumbaikars plan their monsoon days effectively. Our ultimate aim is to create a flood resilience plan for the Mumbai metropolitan region. 
                    </p> 
                </div>


                <div className=' bg-cover bg-fixed'>
                    <div className='px-1/4 h-max  mx-auto py-30 bg-[rgba(255,255,255,.7)]'>
                        <div className=' w-3/4 mx-auto'>
                        <h1 className='text-5xl text-blue-700 font-bold text-center py-5 [text-shadow:_.1px_.1px_1px_rgb(0_0_0)]'>Flooding</h1>
                        <div className='flex gap-16 justify-center'>
                            <p className='text-3xl w-3/4 mx-auto leading-[3.4rem] font-light [text-shadow:_.1px_.1px_1px_rgb(0_0_0)]' >
                                Our platform gives updates on flood hotspots on roads and river water levels in Mumbai. <br />
                                Using live data feeds, stay informed about flood conditions across different locations, helping you make smart decisions and stay safe. 
                                <br />
                                Join us in protecting communities and boosting flood preparedness with our dedicated flood monitoring services.
                            </p>
                            <span className='flex flex-col justify-center'>
                                <img className='border border-black' src='/img/index/s2.png' />
                            </span> 
                        </div>
                    </div>
                    </div>
                </div>

                <div className='w-3/4 mx-auto pt-60'>
                    <h1 className='text-5xl text-blue-700 font-bold text-center py-5'>CROWDSOURCING</h1>
                    <div className='flex gap-16 justify-center'>
                        <span className='flex flex-col justify-center w-1/2  h-full'>
                        <img className='border border-black' src='/img/index/s2.png' />
                        </span>
                        <p className='text-3xl font-light w-3/4 mx-auto leading-[3rem]' >
                            To help Mumbai adapt better to its persistent flood situation every monsoon, we have developed a crowd-sourced flood mapping platform (a web portal and an app) to disseminate near – real – time waterlogging information to Mumbaikars. <br/  > <br />
                            We aim to use data sourced from netizens on X (formerly Twitter). You can use hashtags #mumbairain and #mumbaiflooddata, and geotag yourself to report live incidents of flooding in your locality this upcoming monsoon. <br /><br />
                            Alternatively, fill this FORM to send us live waterlogging information from wherever you are. 

                        </p>
                    </div>
                </div>

                
                <div className='w-3/4 mx-auto pt-30' >
                    <h1 className='text-5xl text-blue-700 font-bold text-center py-5'>MUMBAI RAIL WATER LOGGING</h1>
                    <div className='flex gap-16 justify-center'>
                        <p className='text-3xl font-light w-3/4 mx-auto leading-[3.4rem]' >
                        We have developed a Google Maps-based utility to map the efficiency of travelling to important critical facilities like schools and colleges, important stations, major hospitals and health centers during floods.
<br></br>
This will help track the resilience of urban infrastructure to floods.
                        </p>
                        <span className='flex flex-col justify-center'>
                            <img className='border border-black' src='/img/index/s4.png' />
                        </span>
                    </div>
                </div>
                <hr className='w-3/4 mx-auto my-30' />


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
                            <h2>Project Partners</h2>
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
                                Website & App developed by <br/>IIT Bombay students, Deepak <br/>Silaych & Gulshan Kumar
                            </p>
                        </div>
                    </div>
                </div>
                <div className="social-media-icons">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src={instagramIcon} alt="Instagram" />
                    </a>
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
