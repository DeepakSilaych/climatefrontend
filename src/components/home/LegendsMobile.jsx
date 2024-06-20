// LegendsMobile.jsx
import React from 'react';
import {useNavigate } from 'react-router-dom';

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
        window.location.reload();
        Navigate('/');
      };

    return (
        <div style={legendStyle} className='z-30 font-merriweather opacity-100'>
            <h4>RAINFALL (tomorrow)</h4>
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
    const legendStyle = {
        position: 'absolute',
        bottom: '10px',
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

    return (
        <div style={legendStyle} className='z-30 font-merriweather'>
            <h4>
                Real-time Rainfall at Railway Stations (mm)
            </h4>
            <div style={itemStyle}><span style={colorBoxStyle('green')}></span> 0 - 10mm </div>
            <div style={itemStyle}><span style={colorBoxStyle('yellow')}></span> 10 - 15mm</div>
            <div style={itemStyle}><span style={colorBoxStyle('orange')}></span> 15 - 20mm</div>
            <div style={itemStyle}><span style={colorBoxStyle('red')}></span> 20mm & above</div>
        </div>
    );
};


export { RainfallLegendMobile,WaterlevelLegendMobile, TrainLegendMobile };
