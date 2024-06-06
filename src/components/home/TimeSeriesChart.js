import React from 'react';
import { Chart } from 'react-google-charts';

export default function TimeSeriesChart() {
    const data = [
        ["Time", "Value"],
        ["00:00", 10],
        ["01:00", 20],
        ["02:00", 15],
        ["03:00", 25],
        ["04:00", 18],
        ["05:00", 30],
    ];

    const options = {
        title: 'Dummy Time Series Chart',
        hAxis: {
            title: 'Time',
        },
        vAxis: {
            title: 'Value',
        },
    };

    return (
        <Chart
            chartType="LineChart"
            width="100%"
            height="300px"
            data={data}
            options={options}
        />
    );
}
