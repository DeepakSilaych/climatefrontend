import React from 'react';
import { Link } from 'react-router-dom';
import '../WhoWeAre.css';
import Header from '../components/Header';
import iitbLogo from '../iitb.png';
import csLogo from '../icons/cs.png';
import hdfcLogo from '../icons/hdfc.png';
import mcmrLogo from '../icons/mcmbg.png';
import bmc from '../icons/bmc.png';

import twitterIcon from '../icons/twitter.png';
import youtubeIcon from '../icons/youtube.png';
import facebookIcon from '../icons/facebook.png';
import qrCode from '../icons/qrCode.png'; // Assuming qrCode.png is the QR image

const About = () => {
    return (
        <>
            {/* <Header/> */}
            <section className='bg-white w-screen overflow-x-hidden overflow-y-scroll'>
                <div className='w-screen mx-auto py-10'>
                    <h1 className='text-4xl text-blue-700 font-bold text-center py-1'>ABOUT</h1>
                    <p className='text-2xl font-light w-3/4 mx-auto my-8 leading-[2rem]' >
                    We are a team of students, faculty, and staff from the Interdisciplinary Programme in Climate Studies (IDPCS) at IIT Bombay, developing an experimental rainfall forecasting and flood monitoring system to help Mumbai adapt to its persistent monsoon flooding. By disseminating near-real-time waterlogging information through a dedicated website portal and the Mumbai Flood App, we aim to provide Mumbaikars with timely and accurate updates. This initiative is part of the HDFC-ERGO IIT Bombay (HE-IITB) Innovation Lab, funded by HDFC ERGO and in collaboration with the MCGM Centre for Municipal Capacity Building and Research (MCMCR).
                        <br/>
                        <br/>
                        Our hyperlocal rainfall forecasts are derived from global forecasting systems (GFS) and enhanced through AI/ML modeling. The Rainfall tab on the Home page of the web portal and app displays hourly forecasts for the next 24 hours and daily forecasts for the following three days at MCGM automatic weather stations (AWS). For more details on the rainfall forecast, visit the Rainfall tab.
                        <br/>
                        <br/>
                        Additionally, we are installing nine water-level monitoring stations at various flood-prone hotspots across Mumbai. These stations will provide near-real-time waterlogging updates during the monsoon. For comprehensive information, visit the Water Level tab on the Home Page.
                        <br/>
                        <br/>
                        
                        Join us in this initiative to help Mumbai manage its day-to-day life during monsoon. Report flood in your area using THE form. Help us help you.
                    </p>
                </div>
                <div className='w-screen mx-auto py-10'>
                    <h1 className='text-3xl text-blue-700 font-bold text-center py-1'>Acknowledgements</h1>
                    <p className='text-2xl font-light w-3/4 mx-auto my-8 leading-[2rem]' >
                    Installation of the water-level monitoring sensors would not have been possible without the timely assistance, guidance, and wholehearted support from the below-mentioned personnel:
                        <br/><br/>
                        1. Ward officers, Executive Engineers, Assistant Engineers, and Junior Engineers of the H West, F South, F North, E and L Wards for granting permissions and helping in identifying flooding hotspots;
                        <br/>
                        <br/>
                        2. Faculty at the Department of Geography, University of Mumbai for their collaborative efforts in the flood monitoring experiment. We thank the VC, Registrar and the Campus Development Unit of the University of Mumbai for granting space and electricity for installing the canal sensor on MU campus;
                        <br/>
                        <br/>
                        
                        3. EE and AE Water Works, MCGM staff at Water Works Department, Powai for allowing to use their premises for installing canal sensor on Mithi River; 
                        <br/>
                        <br/>
                        4. DESLM, BEST for allowing installation of road sensors on BEST poles;
                        <br/>
                        <br/>
                         5. Chief Engineer and Officials of Customer Care, Electric Supply, BEST for prompt response to electrical connection requests;
                         <br/>
                        <br/>
                         6.	Secretary, Chairman and Residents of Mandarpan Coop Housing society, RA Kidwai Road Wadala for their cooperation and no objection to installing electric meter in their premises;
                         <br/>
                        <br/>
                         7.	Mr Omkar Sunil Chavan and the residents of his compound for their cooperation and support for installing canal sensor at Andheri Subway;
                         <br/>
                         <br/>
                          8. Officials and Staff at Adani Electricity for prompt response to application request for electric meters.
                    </p>
                </div>
            </section>
            <div className="who-we-are h-full">
                
                <h1>WHO WE ARE</h1>
                <div className="content bg-white">
                    <div className="left-section">
                        
                        <div className="section">
                            <br></br>
                            <h2>Implementing Partners</h2>
                            <div className="partners">
                                <img src={iitbLogo} alt="IIT Logo" />
                                <img src={csLogo} alt="Climate Studies Logo" />
                            </div>
                            {/* <div className="download-app mt-0 text-center">
                            <h2 className='text-xl font-bold'>Download the app now</h2>
                            <img src={qrCode} alt="QR Code for app download" className='mx-auto mt-4 h-44 w-44' />
                        </div> */}
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
                        <div className="section">
                            <h2>Data Source</h2>
                            <div className="partners">
                                <img src={bmc} alt="MCGM Center Logo" />
                            </div>
                        </div>
                    </div>
                    <div className="download-app flex flex-col mt-14 right-0">
                            <h2 className='text-xl font-bold'>Download the 'Mumbai Flood App' Now</h2>
                            <img src={qrCode} alt="QR Code for app download" className='mx-auto mt-4 h-80 w-64' />
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
                            <a href="https://www.linkedin.com/in/shrabani-tripathy-37979310b/" className='flex hover:underline' to="">
                                Dr. Shrabani Tripathy
                                <img src='img/redirect.svg' alt="Redirect" className='w-4 ml-4 flex flex-col justify-center' />
                            </a>
                            <a href="https://www.linkedin.com/in/sautrik-chaudhuri-094064141/" className='flex hover:underline' to="">
                                Sautrik Chaudhuri
                                <img src='img/redirect.svg' alt="Redirect" className='w-4 ml-4 flex flex-col justify-center' />
                            </a>
                            <a href="https://www.linkedin.com/in/jisha-joseph-33a5b7aa/" className='flex hover:underline' to="">
                                Dr. Jisha Joseph
                                <img src='img/redirect.svg' alt="Redirect" className='w-4 ml-4 flex flex-col justify-center' />
                            </a>
                            <a href="https://www.linkedin.com/in/deepaksilaych/" className='flex hover:underline' to="">
                            Deepak Silaych
                                <img src='img/redirect.svg' alt="Redirect" className='w-4 ml-4 flex flex-col justify-center' />
                            </a>
                            <a href="https://www.linkedin.com/in/gulshan-kumar-69b54b25b/" className='flex hover:underline' to="">
                            Gulshan Kumar 
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
