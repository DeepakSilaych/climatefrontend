// LegendsMobile.jsx
import React from 'react';
import {useNavigate } from 'react-router-dom';
import waterLevelIcon from './cs2bg.png';
const RainfallLegendMobile = () => {
    const Navigate = useNavigate();
    const legendStyle = {
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        background: 'rgba(255, 255, 255, 255)',
        padding: '5px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.9)',
        fontSize: '6px',
        zIndex: 1000,
    };

    const itemStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '3px',
    };

    const colorBoxStyle = (background) => ({
        display: 'inline-block',
        width: '12px',
        height: '12px',
        marginRight: '5px',
        borderRadius: '50%',
        background
    });
    const handleclick = () => {
        localStorage.setItem('selectedTab', 3);
        window.location.href = '/'; 
      };

      const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div style={legendStyle} className='z-30 font-merriweather opacity-100'>
            <h4>RAINFALL ({formattedDate})</h4>
            <div style={itemStyle}><span style={colorBoxStyle('grey')}></span> No Rain (0mm)</div>
            <div style={itemStyle}><span style={colorBoxStyle('lightgreen')}></span> Light Rain (0.1 - 15.5 mm)</div>
            <div style={itemStyle}><span style={colorBoxStyle('skyblue')}></span> Moderate Rain (15.6 - 64.4 mm)</div>
            <div style={itemStyle}><span style={colorBoxStyle('yellow')}></span> Heavy Rain (64.5 - 115.5 mm)</div>
            <div style={itemStyle}><span style={colorBoxStyle('orange')}></span> Very Heavy Rain (115.6 - 204.4 mm)</div>
            <div style={itemStyle}><span style={colorBoxStyle('red')}></span> Extremely Heavy Rain (&gt;= 204.5 mm)</div>
            <div className='w-100 flex flex-col justify-evenly mx-0'>
                    <div className='flex flex-col text-center text-xs'>
                        <button className="  alert-button" onClick={handleclick}>
                            Report Flood
                        </button>
                    </div>
                </div>
        </div>
    );
};

const WaterlevelLegendMobile = () => {
    const Navigate = useNavigate();
    const legendStyle = {
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        background: 'rgba(255, 255, 255, 0.8)',
        padding: '5px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
        fontSize: '6px',
        zIndex: 1000,
    };

    const itemStyle = {
        display: 'flex', 
        alignItems: 'center',
        marginBottom: '3px',
    };

    const colorBoxStyle = (background) => ({
        display: 'inline-block',
        width: '12px',
        height: '12px',
        marginRight: '5px',
        borderRadius: '50%',
        background
    });


    const handleclick = () => {
        localStorage.setItem('selectedTab', 3);
        window.location.reload();
        Navigate('/');
      };

    return (
        <div style={legendStyle} className='z-30 font-merriweather'>
            
            <div className='w-100 flex flex-col justify-evenly mx-0'>
                    <div className='flex flex-col text-center text-xs'>
                        <button className=" zigzag-button alert-button" onClick={handleclick}>
                            Report Flood
                        </button>
                    </div>
                </div>
        </div>
    );
};

const TrainLegendMobile = () => {
    const Navigate = useNavigate();
    const legendStyle = {
        position: 'absolute',
        bottom: '40px',
        left: '10px',
        background: 'rgba(255, 255, 255, 0.8)',
        padding: '5px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
        fontSize: '12px',
    };

    const itemStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '3px',
    };

    const colorBoxStyle = (background) => ({
        display: 'inline-block',
        width: '12px',
        height: '12px',
        marginRight: '5px',
        borderRadius: '50%',
        background
    });
    const handleclick = () => {
        localStorage.setItem('selectedTab', 3);
        window.location.reload();
        Navigate('/');
      };

    return (
        <div style={legendStyle} className='z-30 font-merriweather'>
            <h4>
                Real-time Rainfall at Railway Stations (mm)
            </h4>
            <div style={itemStyle}><span style={colorBoxStyle('green')}></span> 0 - 10mm </div>
            <div style={itemStyle}><span style={colorBoxStyle('yellow')}></span> 10 - 15mm</div>
            <div style={itemStyle}><span style={colorBoxStyle('orange')}></span> 15 - 20mm</div>
            <div style={itemStyle}><span style={colorBoxStyle('red')}></span> 20mm & above</div>
            <p style={{ fontStyle: 'italic', fontSize: '10px' }}>
                * Maximum 15-minute rainfall in the last one hour.
            </p>
            <div className='w-64 right-1 flex flex-col justify-evenly mx-0'>
                    <div className='flex flex-col text-center text-xs'>
                        <button className="  alert-button" onClick={handleclick}>
                            Report Flood
                        </button>
                    </div>
                </div>
        </div>
    );
};
const CrowdsourceLegendsMobile = ({csPinToggle}) => {
    const legendStyle = {
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        background: 'white',
        padding: '5px',
        borderRadius: '5px',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
        fontSize: '12px',
        zIndex: 1000,
    };

    const itemStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '5px',
    };

    const colorBoxStyle = (background) => ({
        display: 'inline-block',
        width: '20px',
        height: '20px',
        marginRight: '5px',
        background
    });

   

    return (
        <div style={legendStyle} className='z-30 font-merriweather'>
        {!csPinToggle ?
            <div>
            <h2>Reported Water Level</h2>
            <img src={waterLevelIcon} alt="Water Level Icon" style={{ width: '90px', height: '160px', marginLeft: '20px' }} />
            <p style={{ fontStyle: 'italic', fontSize: '8px' }}>
                Note: The map shows water-logging<br />information from the last 24 hours.
            </p>
        </div>
        
        
            :
            <div> 
                <h1>
                    Click on Map to Report Water Level
                </h1>
            </div>
        }
        
           
        </div>
    );
};


export { RainfallLegendMobile,WaterlevelLegendMobile, TrainLegendMobile, CrowdsourceLegendsMobile };
