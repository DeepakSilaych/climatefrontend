import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import { fetchStationData } from '../../utils/RainfallApis';
import clou from '../../icons/cloudy.png';
import img1 from '../../icons/download.png'; // Add your image imports here
import img2 from '../../icons/download.png';
import img3 from '../../icons/download.png';
import plac from '../../icons/placeholder1.png';

export default function RainfallWidget({ selectedOption }) {
    const [data, setData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
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
            <div className='relative text-xl min-w-[30vw] max-w-[40rem] bg-[rgba(0,0,0,.5)] rounded-xl h-max mx-0 my-0 flex flex-col p-2 py-2 shadow-lg z-10'>
                <div className='relative flex justify-center '>
                    <div className='w-1/3 flex justify-evenly text-xs text-white font-bold flex-col text-center'>
                        <img src={plac} alt="IIT Logo" width="20" height="20" className='mx-14 '/>
                        <span className='text-white text-xs font-bold'>{data.station.name}</span> 
                    </div>
                </div>
                <div className='flex-col align-bottom justify-center h-max relative'>
                    <RainfallBarChart data={data} />
                </div>
                <div className='flex-col align-bottom justify-center h-max'>
                    <DailyPredictionChart data={data} />
                </div>
                <button 
                    className="btoon hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4"
                    onClick={() => setModalOpen(true)}
                >
                    View Past Rainfall
                </button>

                {modalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-4 rounded-lg relative">
                            <button 
                                className="absolute top-2 right-2 text-gray-500 hover:text-black-700"
                                onClick={() => setModalOpen(false)}
                            >
                                &times;
                            </button>
                            <div className="flex flex-row items-center">
                                <img src={img1} alt="Image 1" className="mb-4 w-1/3"/>
                                <img src={img2} alt="Image 2" className="mb-4 w-1/3"/>
                                <img src={img3} alt="Image 3" className="mb-4 w-1/3"/>
                            </div>
                        </div>
                    </div>
                )}
            </div>  
        </>
    );
}

// Options for the new charts
const barChartOptions = {
    title: "Hourly Rainfall Forecast",
    titleTextStyle: { color: "white", fontSize: 12, fontName: 'Merriweather', alignment: 'center' },
    hAxis: { 
        titleTextStyle: { color: "#fff" }, 
        textStyle: { color: "white", fontSize: 8 },
        slantedText: true,
        slantedTextAngle: 90,
    },
    vAxis: { 
        title: "Rainfall (mm)",
        titleTextStyle: { color: "#fff" },
        textStyle: { color: "white", fontSize: 8 }, 
        minValue: 0,
        gridlines: { count: 10, color: 'transparent', width: '1px' },
    },
    chartArea: { width: "90%", height: "50%" },
    backgroundColor: 'transparent',
    legend: { position: 'bottom', alignment: 'center', textStyle: { color: '#fff', fontName: 'Merriweather', fontSize: 10 } },
    colors: ['#D4D4D4', '#7E8EF1'],
    isStacked: true,
};

const dailyPredictionOptions = {
    title: "Daily Rainfall Forecast",
    titleTextStyle: { color: "#fff", fontSize: 12, fontName: 'Merriweather' },
    hAxis: { 
        titleTextStyle: { color: "#fff" }, 
        textStyle: { color: "#fff" },
        slantedTextAngle: 0,
        textStyle: { color: "#fff", fontSize: 8 },
    },
    vAxis: { 
        title: "Rainfall (mm)",  
        titleTextStyle: { color: "#fff" },
        textStyle: { color: "#fff", fontSize: 8 },
        minValue: 0,
        gridlines: { color: 'none' } 
    },
    chartArea: { width: "90%", height: "50%" },
    backgroundColor: 'transparent',
};

// Transform API data for rainfall bar chart
const rainfallBarChartData = (data) => [
    ["Time", "Rainfall (Past 6 hrs)", "Rainfall (Next 24 hrs)", { role: 'style' }],
    ...data.hrly_data.map((item, index) => [
        new Date(`1970-01-01T${item.hour}:00Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Extract time
        index < 6 ? item.total_rainfall : 0, 
        index >= 6 ? item.total_rainfall : 0,
        item.total_rainfall === 0 ? 'point { size: 10; shape-type: star; fill-color: #FF0000; }' : null // Style for zero rainfall
    ])
];

// Transform API data for daily prediction chart
const dailyPredictionChartData = (data) => [
    ["Day", "Rainfall", { role: "style" }],
    ...Object.entries(data.daily_data).map(([date, total_rainfall], index) => [
        new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }), // Use date for daily data
        total_rainfall, 
        index < 3 ? 'color: #D4D4D4;' : // Grey color for the first three bars
        (total_rainfall === 0 ? 'stroke-color: #FF0000; stroke-width: 4;' : getColor(total_rainfall)) // Conditional styling for the rest
    ])
];

// Function to determine color based on rainfall value
function getColor(rainfall) {
    if (rainfall > 124) {
        return "#FF0000"; // Red
    } else if (rainfall >= 36 && rainfall <= 124) {
        return "#FFA500"; // Orange
    } else if (rainfall >= 7 && rainfall < 36) {
        return "#FFFF00"; // Yellow
    } else {
        return "green"; // Green
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
            height="150px"
            data={dailyPredictionChartData(data)}
            options={dailyPredictionOptions}
            className='bg-black bg-opacity-20 rounded-xl mt-2'
        />
    );
}

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
    padding: 10px;
    border: none;
    border-radius: 5px;
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
    border-radius: 30px;
    clip-path: polygon(
        5% 0%, 10% 10%, 15% 0%, 20% 10%, 25% 0%, 30% 10%, 35% 0%, 40% 10%, 45% 0%, 50% 10%, 
        55% 0%, 60% 10%, 65% 0%, 70% 10%, 75% 0%, 80% 10%, 85% 0%, 90% 10%, 95% 0%, 100% 10%, 
        100% 100%, 95% 90%, 90% 100%, 85% 90%, 80% 100%, 75% 90%, 70% 100%, 65% 90%, 60% 100%, 
        55% 90%, 50% 100%, 45% 90%, 40% 100%, 35% 90%, 30% 100%, 25% 90%, 20% 100%, 15% 90%, 
        10% 100%, 5% 90%, 0% 100%, 0% 0%
    );
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