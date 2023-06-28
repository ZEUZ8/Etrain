import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

export function StudentPieGraph({ monthlyAttendance }) {
    ChartJS.register(ArcElement, Tooltip, Legend);

    let labels = [];
    let DonutData = [];

    for (let i = 0; i < monthlyAttendance?.length; i++) {
        labels.push(monthlyAttendance[i]._id);
        DonutData.push(monthlyAttendance[i].count);
    }

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


