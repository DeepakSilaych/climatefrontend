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
        width: '20px',
        height: '20px',
        marginRight: '5px',
        borderRadius: '50%',
        border: '2px solid #000',
        background
    });

    return (
        <div style={legendStyle} className='z-30'>
            <h4>Rainfall (in last 15min)</h4>
            <div style={itemStyle}><span style={colorBoxStyle('green')}></span> No Rain</div>
            <div style={itemStyle}><span style={colorBoxStyle('#acff26')}></span> 0.1 - 7.5 mm</div>
            <div style={itemStyle}><span style={colorBoxStyle('yellow')}></span> 7.5 - 35.5 mm</div>
            <div style={itemStyle}><span style={colorBoxStyle('orange')}></span> 35.5 - 124.4 mm</div>
            <div style={itemStyle}><span style={colorBoxStyle('red')}></span> 124.4 mm & above</div>
        </div>
    );
};

export default RainfallLegend;
