import React, { useState, useEffect } from "react";
import LineChart from "./LineChart";
import RadioOptions from "./RadioOptions";
import { getRegistrationCount } from "../../utils/api";

export default function UserGrowthChart() {
  const [timeframe, setTimeframe] = useState("daily");
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [fetchedData, setFetchedData] = useState({});

  const radioOptions = [
    {
      label: "Daily",
      value: "daily",
      id: "dailyRadioButton",
    },
    {
      label: "Weekly",
      value: "weekly",
      id: "weeklyRadioButton",
    },
    {
      label: "Monthly",
      value: "monthly",
      id: "monthlyRadioButton",
    },
  ];

  useEffect(() => {
    if (!fetchedData[timeframe]) {
      getRegistrationCount(timeframe, (data) => {
        setFetchedData((prev) => ({
          ...prev,
          [timeframe]: data,
        }));
        setChartData(data);
      });
    } else {
      setChartData(fetchedData[timeframe]); // Use cached data
    }
  }, [timeframe, fetchedData]);

  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  return (
    <>
      <h3>New Users Over Time</h3>

      <RadioOptions
        options={radioOptions}
        onChange={handleTimeframeChange}
        timeframe={timeframe}
      />

      <LineChart data={chartData} />
    </>
  );
}
