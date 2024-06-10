import React from 'react';

const RainfallLegend = () => {
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
        marginBottom: '5px',
    };

    const colorBoxStyle = (background) => ({
        display: 'inline-block',
        width: '10px',
        height: '10px',
        marginRight: '5px',
        borderRadius: '50%',
        border: '2px solid #000',
        background
    });

    return (
        <div style={legendStyle} className='z-30 font-merriweather'>
            <h4>Rainfall (per day)</h4>
            <div style={itemStyle}><span style={colorBoxStyle('green')}></span> No Rain</div>
            <div style={itemStyle}><span style={colorBoxStyle('#acff26')}></span>Light Rain:- 0.1 - 7.5 mm</div>
            <div style={itemStyle}><span style={colorBoxStyle('yellow')}></span>Moderate Rain:- 7.6 - 35.5 mm</div>
            <div style={itemStyle}><span style={colorBoxStyle('orange')}></span>Heavy Rain:- 35.6 - 124.4 mm</div>
            <div style={itemStyle}><span style={colorBoxStyle('red')}></span>Extreme Rain:- 124.5 mm & above</div>
        </div>
    );
};

export default RainfallLegend;
