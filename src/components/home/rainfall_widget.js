import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import { fetchAllData } from '../../utils/RainfallApis';
import clou from '../../icons/cloudy.png';
import img1 from '../../icons/download.png'; // Add your image imports here
import img2 from '../../icons/download.png';
import img3 from '../../icons/download.png';
import plac from '../../icons/placeholder1.png';

export default function RainfallWidget({ selectedOption }) {
    const [data, setData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (selectedOption) {
            console.log('rainfal', selectedOption);
            fetchAllData(selectedOption.id)
                .then(data => setData(data))
                .catch(error => console.error('Error fetching station data:', error));
        }
    }, [selectedOption]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className='relative text-xl min-w-[30vw] max-w-[40rem] bg-black bg-opacity-80 rounded-xl h-max mx-0 my-0 flex flex-col p-2 py-4 shadow-lg z-10'>
            <div className='relative flex justify-center '>
                {/* Display current date, time, and temperature */}
                <div className='w-1/3 flex justify-evenly text-sm text-white  font-bold flex-col text-center'>
                                      
                    <img src={plac} alt="IIT Logo" width="40" height="40" className='mx-14'/>
                    
                    {data.station.name}
                </div>
                <div className='w-1/3 flex justify-evenly mx-0'>
                    <div className='flex flex-col text-center'>
                        <button className=" zigzag-button alert-button" onClick={() => alert('Report Flood')}>
                            Report Flood
                        </button>
                    </div>
                </div>
                <div className='w-1/3 flex justify-evenly mx-0'>
                    <div className='flex flex-col text-center'>
                        <img src={clou} alt="IIT Logo" width="30" height="30" align="center" className='mx-2'/>
                        <span className='text-white text-lg font-bold'>{data.data.temperature}°C</span>                        
                    </div>
                </div>
            </div>
            <div className='flex-col align-bottom justify-center h-max relative'>
                <RainfallBarChart />
            </div>
            <div className='flex-col align-bottom justify-center h-max'>
                <DailyPredictionChart />
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
    );
}

// Options for the new charts
const barChartOptions = {
    title: "Hourly Rainfall Forecast",
    titleTextStyle: { color: "white", fontSize: 16, alignment: 'center' },
    
    hAxis: { 
        titleTextStyle: { color: "#fff" }, 
        textStyle: { color: "white", fontSize: 10 },
        slantedText: true,
        slantedTextAngle: 90,
    },
    vAxis: { 
        title: "Rainfall (mm)",
        titleTextStyle: { color: "#fff" },
        textStyle: { color: "white", fontSize: 10 }, 
        minValue: 0,
        gridlines: { count: 6, color: '#ccc', width: '0.1px' }, // Add 6 horizontal reference lines
    },
    chartArea: { width: "90%", height: "50%" },
    backgroundColor: 'transparent',
    legend: { position: 'bottom', alignment: 'center', textStyle: { color: '#fff' } },
    colors: ['#D4D4D4', '#7E8EF1'],
    isStacked: true,
};

const dailyPredictionOptions = {
    title: "Daily Rainfall Forecast",
    titleTextStyle: { color: "#fff", fontSize: 16 },
    hAxis: { 
        titleTextStyle: { color: "#fff" }, 
        textStyle: { color: "#fff" },
        slantedTextAngle: 0,
        textStyle: { color: "#fff" }, fontSize: 8,
    },
    vAxis: { 
        title: "Rainfall (mm)",  
        titleTextStyle: { color: "#fff" },
        textStyle: { color: "#fff" }, fontSize: 8,
        minValue: 0,
        gridlines: { color: 'none' } 
    },
    chartArea: { width: "90%", height: "50%" },
    backgroundColor: 'transparent',
    // legend: { position: 'down', alignment: 'end', textStyle: { color: '#fff' } }, 
    // series: {
    //     0: { color: 'green', labelInLegend: '0 to 7 mm' },
    //     1: { color: 'yellow', labelInLegend: '7 to 36 mm' },
    //     2: { color: 'orange', labelInLegend: '36 to 124 mm' },
    //     3: { color: 'red', labelInLegend: 'above 124 mm' },
    // },
};

// Dummy data for the new charts
const rainfallBarChartData = [
    ["Time", "Rainfall (Past 6 hrs)", "Rainfall (Next 24 hrs)"],
    ["10 AM", 1.5, 0],
    ["11 AM", 2, 0],
    ["12 PM", 0.5, 0],
    ["1 PM", 1, 0],
    ["2 PM", 3, 0],
    ["3 PM", 2.5, 0],
    ["4 PM", 0, 3],
    ["5 PM", 0, 4.5],
    ["6 PM", 0, 5],
    ["7 PM", 0, 3],
    ["8 PM", 0, 4.5],
    ["9 PM", 0, 5],
    ["10 PM", 0, 3.5],
    ["11 PM", 0, 2.5],
    ["12 AM", 0, 3],
    ["1 AM", 0, 4],
    ["2 AM", 0, 3.5],
    ["3 AM", 0, 3],
    ["4 AM", 0, 2.5],
    ["5 AM", 0, 4],
    ["6 AM", 0, 3],
    ["7 AM", 0, 2.5],
    ["8 AM", 0, 4],
    ["9 AM", 0, 3.5],
    ["10 AM", 0, 2],
    ["11 AM", 0, 4],
    ["12 PM", 0, 3],
    ["1 PM", 0, 3.5],
    ["2 PM", 0, 4],
    ["3 PM", 0, 5],
];

// Dummy data for daily prediction chart with color
const dailyPredictionChartData = [
    ["Day", "Rainfall", { role: "style" }],
    ["2 Days Ago", 1.5, "#00215E"], // Green
    ["Day Before Yesterday", 2, "#00215E"], // Green
    ["Yesterday", 50, "#00215E"], // Red
    ["Today", 150, getColor(150)], // Orange
    ["Tomorrow", 20, getColor(20)], // Orange
    ["Day After Tomorrow", 3.5, getColor(3.5)] // Yellow
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

function RainfallBarChart() {
    return (
        <Chart
            chartType="ColumnChart"
            width="100%"
            height="200px"
            data={rainfallBarChartData}
            options={barChartOptions}
            className='bg-black bg-opacity-20 rounded-xl m-0 font-roboto text-sm'
        />
    );
}

function DailyPredictionChart() {
    return (
        <Chart
            chartType="ColumnChart"
            width="100%"
            height="150px"
            data={dailyPredictionChartData}
            options={dailyPredictionOptions}
            flex="column"
            className='bg-black bg-opacity-20 rounded-xl mt-2'
        />
    );
}

// Add this CSS for the button animation and zigzag border
const styles = `
<style>
.btoon{
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
            5% 0%, 10% 10%, 15% 0%, 20% 10%, 25% 0%, 30% 10%, 35% 0%, 40% 10%, 
            45% 0%, 50% 10%, 55% 0%, 60% 10%, 65% 0%, 70% 10%, 75% 0%, 80% 10%, 
            85% 0%, 90% 10%, 95% 0%, 100% 10%, 100% 90%, 95% 100%, 90% 90%, 85% 100%, 
            80% 90%, 75% 100%, 70% 90%, 65% 100%, 60% 90%, 55% 100%, 50% 90%, 
            45% 100%, 40% 90%, 35% 100%, 30% 90%,30% 90%,30% 90%, 25% 100%, 20% 90%, 15% 100%, 
            10% 90%, 5% 100%, 0% 90%, 0% 10%
        );
    }
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
</style>
`;

document.head.insertAdjacentHTML('beforeend', styles);
