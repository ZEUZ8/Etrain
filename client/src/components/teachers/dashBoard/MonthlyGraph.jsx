import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

export function MonthlyGraph({ monthlyAttendance,holliday }) {
    ChartJS.register(ArcElement, Tooltip, Legend);

    let labels = [];
    let DonutData = [];
    console.log(holliday)

    for (let i = 0; i < monthlyAttendance?.length; i++) {
        labels.push(monthlyAttendance[i]._id);
        if(monthlyAttendance[i]._id === "holliday"){
            DonutData.push(monthlyAttendance[i].count/holliday)
        }else{
            DonutData.push(monthlyAttendance[i].count);
        }
    }

    console.log(labels,'the labesls')
    console.log(DonutData,'the do')

    const data = {
        labels: labels,
        // labels: ["Red", "Blue", "Yellow"],
        datasets: [
            {
                label: "Total",
                data: DonutData,
                // data: [12, 19, 3],
                backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(155, 89, 214, 0.2)", "rgba(0, 128, 0, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(155, 89, 214, 1)", "rgba(0, 128, 0, 1)"],
                borderWidth: 1,
            },
        ],
    };

    return <Pie data={data} />;
}