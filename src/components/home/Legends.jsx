import React from 'react';
import waterLevelIcon from './csl.jpeg';

const RainfallLegend = () => {
    const legendStyle = {
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        background: 'white',
        padding: '3px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        fontSize: '10px',
    };

    const itemStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '3px',
    };

    const colorBoxStyle = (background) => ({
        display: 'inline-block',
        width: '15px',
        height: '15px',
        marginRight: '3px',
        borderRadius: '50%',
        border: '1px solid #000',
        background
    });

    return (
        <div style={legendStyle} className='z-30 font-merriweather text-xs'>
            <h4 style={{ margin: '0 20px 5px 40px' }}>Rainfall Forecast (Tomorrow)</h4>
            <div style={itemStyle}><span style={colorBoxStyle('grey')}></span> No Rain (0 mm)</div>
            <div style={itemStyle}><span style={colorBoxStyle('lightgreen')}></span>Light Rainfall (0.1 - 15.5 mm)</div>
            <div style={itemStyle}><span style={colorBoxStyle('skyblue')}></span>Moderate Rainfall (15.6 -64.4 mm)</div>
            <div style={itemStyle}><span style={colorBoxStyle('yellow')}></span>Heavy Rainfall (64.5 - 115.5 mm)</div>
            <div style={itemStyle}><span style={colorBoxStyle('orange')}></span>Very Heavy Rainfall (115.6 - 204.4 mm)</div>
            <div style={itemStyle}><span style={colorBoxStyle('red')}></span>Extremely Heavy Rainfall (&gt;=204.5 mm)</div>            
        </div>
        
    );
};
export default RainfallLegend;


const TrainLegends = () => {
    const legendStyle = {
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        background: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',   
    };

    const itemStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '2px',
    };

    const colorBoxStyle = (background) => ({
        display: 'inline-block',
        width: '15px',
        height: '15px',
        marginRight: '5px',
        borderRadius: '50%',
        border: '2px solid #000',
        background
    });

    return (
        <div style={legendStyle} className='z-30 font-merriweather'>
            <h4>Real-time Rainfall at Railway Stations (mm)</h4>
            <div style={itemStyle}><span style={colorBoxStyle('green')}></span>0 - 10mm </div>
            <div style={itemStyle}><span style={colorBoxStyle('yellow')}></span>10 - 15mm</div>
            <div style={itemStyle}><span style={colorBoxStyle('orange')}></span>15 - 20mm</div>
            <div style={itemStyle}><span style={colorBoxStyle('red')}></span> 20mm & above</div>
        </div>
    );
}

const CrowdsourceLegends = ({csPinToggle}) => {
    const legendStyle = {
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        background: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
        fontSize: '12px',
        display: 'flex', // Ensure the container is flex to align items
        alignItems: 'center',
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
                <h4>Reported Water Level</h4>
                <img src={waterLevelIcon} alt="Water Level Icon" style={{ width: '160px', height: '280px', marginRight: '5px' }} />
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



export {TrainLegends, CrowdsourceLegends};