import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export function YearlyGraph({ annualAttendance,holliday }) {
    ChartJS.register(ArcElement, Tooltip, Legend);

    let labels = [];
    let DonutData = [];

    for (let i = 0; i < annualAttendance?.length; i++) {
        labels.push(annualAttendance[i]._id);
        if(annualAttendance[i]._id === "holliday"){
            DonutData.push(annualAttendance[i].count/holliday)
        }else{
            DonutData.push(annualAttendance[i].count);
        }
    }

    const data = {
        labels: labels,
        // labels: ["Absent", "Present", "Holliday",],
        datasets: [
            {
                label: "Total",
                data: DonutData,
                // data: [12, 19, 3],
                backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(148, 110, 211)"],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)","rgb(148, 110, 221)"],
                borderWidth: 1,
            },
        ],
    };

    return <Doughnut data={data} />;
}