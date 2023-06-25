import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

export function PieGraph({ attendance }) {
    ChartJS.register(ArcElement, Tooltip, Legend);

    let labels = [];
    let DonutData = [];
    const [holliday,setHolliday] = useState(false)

    for (let i = 0; i < attendance?.length; i++) {
        labels.push(attendance[i]._id);
        DonutData.push(attendance[i].count);
      
    }

    if(holliday){
      var data = {
        labels: "Holliday",
        // labels: ["Red", "Green"],
        datasets: [
            {
                label: "Leave",
                // data: DonutData,
                data: [1],
                backgroundColor: ["(154, 182, 235, 0.5)"],
                borderColor: [ "(154, 182, 235, 1)"],
                borderWidth: 1,
            },
        ],
    };

    }else{
      var data = {
        labels: labels,
        // labels: ["Red", "Green"],
        datasets: [
            {
                label: "Total ",
                data: DonutData,
                // data: [12, 19,67,77],
                backgroundColor: [ "rgba(54, 162, 235, 0.2)","rgba(255, 99, 132, 0.2)"],
                borderColor: [ "rgba(54, 162, 235, 1)","rgba(255, 99, 132, 1)"],
                borderWidth: 1,
            },
        ],
    };
    }

    return <Pie data={data} />;
}