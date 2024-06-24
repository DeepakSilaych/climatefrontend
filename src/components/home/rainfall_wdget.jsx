import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import { fetchStationData } from '../../utils/RainfallApis';
import plac from '../../icons/loc.png';



export default function RainfallWidget({ selectedOption }) {
    const [data, setData] = useState(null);
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            const newtime = String(new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short' }) + ", " + new Date().toLocaleTimeString());
            setTime(newtime);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (selectedOption) {
            fetchStationData(selectedOption.station_id)
                .then(data => setData(data))
                .catch(error => console.error('Error fetching station data:', error));
        }
    }, [selectedOption]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='w-2/3 flex justify-evenly text-xs text-slate-600 font-bold flex-row text-center align-middle mx-20'>
                Current Time: {time}
            </div>
            <div className='relative text-xl min-w-[30vw] max-w-[40rem] bg-[rgba(0,0,0,.8)] rounded-xl h-max mx-0 my-0 flex flex-col p-1 py-1 shadow-lg z-10'>
                <div className='relative flex justify-center '>
                    <div className=' flex justify-evenly text-xs text-white font-bold flex-col text-center'>
                        <img src={plac} alt="IIT Logo" width="15" height="15" className='right-0'/>
                    </div>
                    <div className='flex justify-evenly text-xs text-white font-bold flex-col text-center'>
                        <span className='text-white text-xs font-bold mx-1 my-2'>{data.station.name}</span> 
                    </div>
                </div>
                <div className='flex-col align-bottom justify-center h-max relative'>
                    <RainfallBarChart data={data} />
                </div>
                <div className='flex-col align-bottom justify-center h-max'>
                    <DailyPredictionChart data={data} />
                </div>
                <div className='flex-col align-bottom justify-center h-max'>
                    <PastRainfallChart data={data} />
                </div>
            </div>  
        </>
    );
}

const barChartOptions = {
    title: "Hourly Rainfall Forecast",
    titleTextStyle: { color: "white", fontSize: 12, fontName: 'Merriweather', alignment: 'center' },
    hAxis: { 
        titleTextStyle: { color: "#fff" }, 
        textStyle: { color: "white", fontSize: 8 },
        slantedText: true,
        slantedTextAngle: 90,
        baselineColor: 'white',
    },
    vAxis: { 
        title: "Rainfall (mm)",
        titleTextStyle: { color: "#fff" },
        textStyle: { color: "white", fontSize: 8 },
        gridlines: { count: 3, color: 'grey', width: '1px' },
        baselineColor: 'white',
        viewWindow: {
            min: 0,
            max: 30
        }
    },
    chartArea: { width: "80%", height: "50%" },
    backgroundColor: 'transparent',
    legend: { position: 'bottom', alignment: 'center', textStyle: { color: '#fff', fontName: 'Merriweather', fontSize: 10 } },
    colors: ['#D4D4D4', '#00ffff'], // Colors for observed and forecasted rainfall
    isStacked: true,
};

const dailyPredictionOptions = {
    title: "Daily Rainfall Forecast",
    titleTextStyle: { color: "#fff", fontSize: 12, fontName: 'Merriweather' },
    hAxis: { 
        titleTextStyle: { color: "#fff" }, 
        textStyle: { color: "#fff" },
        slantedTextAngle: 0,
        gridlines: { color: 'white' },
        baselineColor: 'white',
    },
    vAxis: { 
        title: "Rainfall (mm)",  
        titleTextStyle: { color: "#fff" },
        textStyle: { color: "#fff", fontSize: 8 },
        
        gridlines: {count: 6, color: 'grey' },
        baselineColor: 'white',
        viewWindow: {
            min: '0',
            max: 250
        }
    },
    
    chartArea: { width: "75%", height: "70%" },
    backgroundColor: 'transparent',
    legend: { position: 'bottom', alignment: 'center', textStyle: { color: '#fff', fontName: 'Merriweather', fontSize: 10 } },
    colors: ['#D4D4D4', '#00ffff'],
    isStacked: true,
};

const dailyPredictionOptions2 = {
    title: "Seasonal Rainfall Forecast",
    titleTextStyle: { color: "#fff", fontSize: 12, fontName: 'Merriweather' },
    hAxis: { 
        titleTextStyle: { color: "#fff" }, 
        textStyle: { color: "#fff" },
        
        baselineColor: 'white',
    },
    vAxis: { 
        title: "Rainfall (mm)",  
        titleTextStyle: { color: "#fff" },
        textStyle: { color: "#fff", fontSize: 8 },
        
        gridlines: {count: 6, color: 'grey' },
        baselineColor: 'white',
        viewWindow: {
            min: 0,
            max: 200
        }
    },
    
    chartArea: { width: "80%", height: "50%" },
    backgroundColor: 'transparent',
    legend: { position: 'bottom', alignment: 'center', textStyle: { color: '#fff', fontName: 'Merriweather', fontSize: 10 } },
    colors: ['#D4D4D4', '#00ffff'],
    isStacked: true,
};

const rainfallBarChartData = (data) => [
    ["Time", "Observed Rainfall", "Forecasted Rainfall"],
    ...data.hrly_data.map((item, index) => [
        item.hour,
        index < 6 ? item.total_rainfall : null, 
        index >= 6 ? item.total_rainfall : null
    ])
];

const dailyPredictionChartData = (data) => [
    ["Day", "Rainfall (in mm)", { role: "style" }, { role: "annotation" }],
    ...Object.entries(data.daily_data).map(([date, total_rainfall], index) => [
        new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
        total_rainfall, 
        index < 3 ? 'color: #D4D4D4;' : getColor(total_rainfall),
        index === 2 ? "Observed" : (index === 3 ? "Predicted" : null)
    ])
];

const seasonalRainfallChartData = (data, start, end) => {
    // Assuming data.seasonal_data is an array of objects with `date`, `observed`, and `predicted` properties
    return [
        ["Date", "Observed", "Predicted"],
        ...data.seasonal_data.slice(start, end).map(item => [
            new Date(item.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
            item.observed,
            item.predicted
        ])
    ];
};

function getColor(rainfall) {
    if (rainfall > 204.5) {
        return 'color: #FF0000;'; // Red
    }
    else if (rainfall > 115.5) {
        return 'color: #FFA500;'; // Orange
    }
    else if (rainfall > 64.4) {
        return 'color: #FFFF00;'; // Yellow
    }
    else if (rainfall > 15.5) {
        return 'color: #87CEEB;'; // Skyblue
    }
    else if (rainfall > 0) {
        return 'color: #90EE90;'; // Lightgreen
    }
    else {
        return 'color: #D4D4D4;'; // Grey
    }
}

function RainfallBarChart({ data }) {
    return (
        <Chart
            chartType="ColumnChart"
            width="100%"
            height="200px"
            data={rainfallBarChartData(data)}
            options={barChartOptions}
            className='bg-black bg-opacity-0 rounded-xl m-0 font-roboto text-sm'
        />
    );
}

function DailyPredictionChart({ data }) {
    return (
        <Chart
            chartType="ColumnChart"
            width="100%"
            height="200px"
            data={dailyPredictionChartData(data)}
            options={dailyPredictionOptions}
            className='bg-black bg-opacity-20 rounded-xl mt-2'
        />
    );
}

const PastRainfallChart = ({ data }) => {
    const [range, setRange] = useState({ start: 0, end: 6 });

    const handleNext = () => {
        if (range.end < data.seasonal_data.length) {
            setRange(prevRange => ({
                start: prevRange.start + 1,
                end: prevRange.end + 1
            }));
        }
    };

    const handlePrev = () => {
        if (range.start > 0) {
            setRange(prevRange => ({
                start: prevRange.start - 1,
                end: prevRange.end - 1
            }));
        }
    };

    return (
        <div className="relative">
            {/* <button onClick={handlePrev} disabled={range.start === 0} className="absolute left-4 bottom-2 text-white text-sm">Prev</button> */}
            <Chart
                chartType="ColumnChart"
                width="100%"
                height="300px"
                data={seasonalRainfallChartData(data, range.start, range.end)}
                options={dailyPredictionOptions2}
                className='bg-black bg-opacity-20 rounded-xl mt-2'
            />
            <button onClick={handleNext} disabled={range.end >= data.seasonal_data.length} className="absolute right-8 bottom-2 text-white text-sm">Next</button>
        </div>
    );
};



// Add this CSS for the button animation and zigzag border
const styles = `
<style>
.btoon {
    background-color: #C39898;
}
.alert-button {
    background-color: red;
    color: white;
    font-weight: bold;
    padding: 8px;
    border: none;
    border-radius: 10px;
    animation: pulse 1s infinite;
}

.zigzag-button {
    position: relative;
    background-color: red;
    color: white;
    font-weight: bold;
    padding: 10px;
    border: none;
    z-index: 1;
    overflow: hidden;
    border-radius: 80px;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', styles);
