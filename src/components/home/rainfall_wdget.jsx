import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import { fetchStationData } from '../../utils/RainfallApis';
import plac from '../../icons/loc.png';
import abcd from '../../icons/abcd.png';
import ab from '../../icons/ab.png';
import ka from '../../icons/ka.png';
import { ArrowBigRight, ArrowBigLeft } from 'lucide-react';
import { MoveRight } from 'lucide-react';
import { MoveLeft } from 'lucide-react';

export default function RainfallWidget({ selectedOption }) {
    const [data, setData] = useState(null);
    const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' }));

    useEffect(() => {
        const interval = setInterval(() => {
            const newtime = String(new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', timeZone: 'Asia/Kolkata' }) + ", " + new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' }));
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
                Current Time: {time} (in IST)
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
    title: "Observed Hourly Rainfall (data from MCGM)",
    titleTextStyle: { color: "white", fontSize: 12, fontName: 'Nunito Sans', alignment: 'center' },
    hAxis: { 
        titleTextStyle: { color: "#fff" }, 
        textStyle: { color: "white", fontSize: 12 },
        slantedText: true,
        slantedTextAngle: 90,
        baselineColor: 'white',
    },
    vAxis: { 
        title: "Rainfall (mm)",
        titleTextStyle: { color: "#fff" },
        textStyle: { color: "white", fontSize: 8 },
        gridlines: { count: 7, color: 'grey', width: '1px' },
        baselineColor: 'white',
        viewWindow: {
            min: 0,
            max: 60
        },
        ticks: [0, 10, 20, 30, 40, 50, 60]
    },
    chartArea: { width: "80%", height: "50%" },
    backgroundColor: 'transparent',
    legend: { position: 'none' },
    // legend: { position: 'bottom', alignment: 'center', textStyle: { color: '#fff', fontName: 'Nunito Sans', fontSize: 10 } },
    colors: ['#ADADC9', '#ADADC9'], // Colors for observed and forecasted rainfall
    isStacked: true,
};

const dailyPredictionOptions = {
    title: "Daily Rainfall Forecast",
    titleTextStyle: { color: "#fff", fontSize: 12, fontName: 'Nunito Sans' },
    hAxis: { 
        titleTextStyle: { color: "#fff" }, 
        textStyle: { color: "#fff" },
        slantedTextAngle: 0,
        gridlines: { color: 'grey', count: 4 },
        baselineColor: 'white',
    },
    vAxis: { 
        title: "Rainfall (mm)",  
        titleTextStyle: { color: "#fff" },
        textStyle: { color: "#fff", fontSize: 8 },
        gridlines: { color: 'grey', count: 5, width: 1 },
        baselineColor: 'white',
        viewWindow: {
            min: 2,  // Adjusted minimum value
            max: 300
        },
        ticks: [2, 50, 100, 150, 200, 250, 300]  // Explicitly set the ticks you want to display
    },
    legend: { position: 'none' },  // Hide the legend
    chartArea: { width: "80%", height: "70%" },
    backgroundColor: 'transparent',
    colors: ['#ADADC9', '#779933', '#FF0000'], // Add color for the star series
    isStacked: true,
    series: {
        2: { type: 'line', pointShape: 'star', pointSize: 10, lineWidth: 0 } // Custom marker for stars
    },
    tooltip: { isHtml: true, ignoreBounds: true }
};

const dailyPredictionOptions2 = {
    title: "Past Forecasted Rainfall (1-day lead) for this season",
    titleTextStyle: { color: "#fff", fontSize: 12, fontName: 'Nunito Sans' },
    hAxis: { 
        titleTextStyle: { color: "#fff" }, 
        textStyle: { color: "#fff" },
        
        baselineColor: 'white',
    },
    vAxis: { 
        title: "Rainfall (mm)",  
        titleTextStyle: { color: "#fff" },
        textStyle: { color: "#fff", fontSize: 8 },
        
        gridlines: {count: 7, color: 'grey' },
        baselineColor: 'white',
        viewWindow: {
            min: 2,
            max: 300
        },
        ticks: [2, 50, 100, 150, 200, 250, 300]
    },
    
    chartArea: { width: "80%", height: "50%" },
    backgroundColor: 'transparent',
    legend: { position: 'bottom', alignment: 'center', textStyle: { color: '#fff', fontName: 'Nunito Sans', fontSize: 10 } },
    colors: ['#ADADC9', '#779933'],
    isStacked: false,
};

const rainfallBarChartData = (data) => [
    ["Time", "Observed Rainfall"],
    ...data.hrly_data.map(item => [
        item.hour,
        item.total_rainfall
    ])
];

// const rainfallBarChartData = (data) => [
//     ["Time", "Observed Rainfall", "Observed Rainfall"],
//     ...data.hrly_data.map((item, index) => [
//         item.hour,
//         index < 6 ? item.total_rainfall : null, 
//         index >= 6 ? item.total_rainfall : null
//     ])
// ];

// const dailyPredictionChartData = (data) => {
//     const combinedData = [
//         ...data.daily_data.slice(3).map(item => [
//             new Date(item.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
//             item.observed,
//             item.predicted
//         ]),
//         ...Object.entries(data.daily_data).slice(3, 6).map(([date, total_rainfall], index) => [
//             new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
//             null, // observed rainfall is null for the last three entries
//             total_rainfall,
//             getColor(total_rainfall)// Apply getColor to the first predicted value only
//         ])
//     ];

//     return [
//         ["Day", "Observed", "Predicted", { role: 'style' }, "Star", { role: 'tooltip', p: { html: true } }],
//         ...combinedData.map((item, index) => [
//             item[0],
//             item[1] ?? 0,
//             index < 3 ? null : (item[2] ?? 0), // For the first three values, set the predicted bar height to 0
//             index >= 3 ? item[3] : null, // Apply getColor to the last three bars
//             index < 3 ? item[2] : null, // Add star values for the first three entries
//             index < 3 ? `<div style="padding:1px;">${item[0]}<br><b>Predicted:</b>${item[2]?.toFixed(2)}mm</div>` : null // Tooltip for stars
//         ])
//     ];
// };

const dailyPredictionChartData = (data) => {
    const combinedData = data.daily_data.map((item, index) => {
        const dateLabel = formatDateToIST(item.date);
        const observed = index < data.daily_data.length - 3 ? item.observed : null; // Show observed for all but the last three
        const predicted = item.predicted;
        const color = index >= data.daily_data.length - 3 ? getColor(predicted) : null; // Apply color to the last three

        return [
            dateLabel,
            observed,
            index < data.daily_data.length - 3 ? null : predicted, // Show predicted bar value for the last three entries only
            color,
            
            index < data.daily_data.length - 3 ? predicted : null, // Add star values for the first three entries
            index >= data.daily_data.length - 3 ? `<div style="padding:0px;">${dateLabel}<b>Predicted:</b>${predicted.toFixed(2)}mm</div>` : null // Tooltip for the last three
         
        ];
    });

    return [
        ["Day", "Observed", "Predicted", { role: 'style' }, "", { role: 'tooltip', p: { html: true } }],
        ...combinedData.map((item, index) => [
            item[0],
            item[1],
            item[2],
            item[3],
            item[4],
            item[5] // Tooltip
        ])
    ];
};



const formatDateToIST = (date) => {
    const options = { day: '2-digit', month: 'short', timeZone: 'Asia/Kolkata' };
    return new Date(date).toLocaleDateString('en-IN', options);
};

const seasonalRainfallChartData = (data, start, end) => {
    return [
        ["Date", "Observed", "Past Predicted"],
        ...data.seasonal_data.slice(start, end).map(item => [
            formatDateToIST(item.date),
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
        return 'color: #D4D4D4;';// Grey
    }
}

function RainfallBarChart({ data }) {
    return (
        <Chart
            chartType="LineChart"
            width="100%"
            height="200px"
            data={rainfallBarChartData(data)}
            options={{
                ...barChartOptions,
                pointSize: 5,  // Add this line to show dots
                dataOpacity: 0.8, 
            }}
            className='bg-black bg-opacity-0 rounded-xl m-0 font-roboto text-sm'
        />
    );
}

function DailyPredictionChart({ data }) {
    return (
        <>
            <style>
                {`
                    .google-visualization-chart .google-visualization-gridline {
                        stroke-dasharray: 8, 8; /* Create a dotted effect */
                        stroke-width: 0.5px; /* Reduce the thickness */
                    }
                `}
            </style>
            <div className="relative">
            <div className="absolute left-1/2 top-9 transform -translate-x-1/2 h-36 border-l border-blue-500 border z-20"></div>

<div className="flex justify-between items-center text-xs text-white px-2 top-9 absolute left-0 right-0">
    {/* Left section */}
    <div className="flex items-center font-NunitoSans mx-2 ml-16">
        Past Data
        <MoveLeft className="ml-1 " />
    </div>

    {/* Right section */}
    <div className="flex items-center font-NunitoSans mx-2 mr-16">
        <MoveRight className="mr-1" />
        Forecasted
    </div>
</div>


                <Chart
                    chartType="ColumnChart"
                    width="100%"
                    height="200px"
                    data={dailyPredictionChartData(data)}
                    options={dailyPredictionOptions}
                    className='bg-black bg-opacity-20 rounded-xl mt-2'
                />
            </div>
        </>
    );
}
const PastRainfallChart = ({ data }) => {
    const totalDataPoints = data.seasonal_data.length;
    const initialRange = {
        start: Math.max(totalDataPoints - 6, 0),  // Ensure start is not negative
        end: totalDataPoints
    };

    const [range, setRange] = useState(initialRange);

    const handleNext = () => {
        if (range.end < totalDataPoints) {
            setRange({ start: range.start + 1, end: range.end + 1 });
        }
    };

    const handlePrev = () => {
        if (range.start > 0) {
            setRange({ start: range.start - 1, end: range.end - 1 });
        }
    };
    

    return (
        
            <div className="relative">
   


            <div className="flex justify-center items-center text-xs text-white mb-2 mt-2">
                <div className="flex items-center font-Nunito Sans mx-2">
                    <img src={ab} alt="Observed Icon" width="14" height="5" className="mr-1"/>
                    Observed
                </div>
                <div className="flex items-center font-Nunito Sans mx-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="red" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                    Past Predicted
                </div>
                <div className="flex items-center font-Nunito Sans mx-2">
                    <img src={abcd} alt="Predicted Icon" width="80" height="80" className="mr-1"/>
                    Forecasted
                </div>
            </div>
            <Chart
                chartType="LineChart"
                width="100%"
                height="250px"
                data={seasonalRainfallChartData(data, range.start, range.end)}
                options={{
                    ...dailyPredictionOptions2,
                    pointSize: 5,  // Add this line to show dots
                    dataOpacity: 0.8,  // Optional: Adjust opacity for better visibility
                }}
                className='bg-black bg-opacity-20 rounded-xl'
            />
            <button onClick={handlePrev} disabled={range.start === 0} className="absolute left-4 bottom-2 text-white text-sm">
                <ArrowBigLeft />
            </button>
            <button onClick={handleNext} disabled={range.end >= totalDataPoints} className="absolute right-8 bottom-2 text-white text-sm">
                <ArrowBigRight />
            </button>
        </div>
    );
};


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











         
