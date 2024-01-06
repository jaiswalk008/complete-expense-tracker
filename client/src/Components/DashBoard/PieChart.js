import React from "react";
import {Pie} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto'
import './DashBoard.css';
const PieChart = ({chartData}) =>{
    return (
        <div className="pieChart">
            <Pie data={chartData} />
        </div>
    )
}
export default PieChart;