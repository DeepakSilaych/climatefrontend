import React from 'react';

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
            <div style={itemStyle}><span style={colorBoxStyle('grey')}></span> No Rain</div>
            <div style={itemStyle}><span style={colorBoxStyle('cornflowerblue')}></span> Light Rain: 0.1 - 7.5 mm</div>
            <div style={itemStyle}><span style={colorBoxStyle('lightgreen')}></span> Moderate Rain: 7.6 - 35.5 mm</div>
            <div style={itemStyle}><span style={colorBoxStyle('yellow')}></span> Heavy Rain: 35.6 - 75.5 mm</div>
            <div style={itemStyle}><span style={colorBoxStyle('orange')}></span> Very Heavy Rain: 75.6 - 124.4 mm</div>
            <div style={itemStyle}><span style={colorBoxStyle('red')}></span> Extreme Rain: 124.5 mm & above</div>
            
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
            <h4>Waterlevel Warning (per hour)</h4>
            <div style={itemStyle}><span style={colorBoxStyle('green')}></span>0 - 10mm </div>
            <div style={itemStyle}><span style={colorBoxStyle('yellow')}></span>10 - 15mm</div>
            <div style={itemStyle}><span style={colorBoxStyle('orange')}></span>15 - 20mm</div>
            <div style={itemStyle}><span style={colorBoxStyle('red')}></span> 20mm & above</div>
        </div>
    );
}

export {TrainLegends}