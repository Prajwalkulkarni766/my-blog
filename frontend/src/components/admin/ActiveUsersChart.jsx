import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";
import RadioOptions from "./RadioOptions";

export default function ActiveUsersChart() {
  const [timeframe, setTimeframe] = useState("dau"); // Default to DAU
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const dummyData = {
    dau: {
      dates: [
        "2023-09-01",
        "2023-09-02",
        "2023-09-03",
        "2023-09-04",
        "2023-09-05",
      ],
      activeUsers: [12, 15, 13, 14, 16],
    },
    mau: {
      dates: ["Jan", "Feb", "Mar", "Apr", "May"],
      activeUsers: [12, 14, 16, 18, 10],
    },
  };

  useEffect(() => {
    const { dates, activeUsers } = dummyData[timeframe];
    setChartData({
      labels: dates,
      datasets: [
        {
          label: `Active Users (${timeframe.toUpperCase()})`,
          data: activeUsers,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, [timeframe]);

  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  const activeUsersChartOption = [
    {
      label: "Daily Active Users (DAU)",
      value: "dau",
      id: "dauRadioButton",
    },
    {
      label: "Monthly Active Users (MAU)",
      value: "mau",
      id: "mauRadioButton",
    },
  ];

  return (
    <>
      <h3>Active Users</h3>

      <RadioOptions
        options={activeUsersChartOption}
        timeframe={timeframe}
        onChange={handleTimeframeChange}
      />

      <BarChart data={chartData} />
    </>
  );
}
