import React from "react";

import { Line } from "react-chartjs-2";

const LinePlotNG = (props) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        fill: props.fill,
        backgroundColor: props.bgColor,
        borderColor: props.brdColor,
        lineTension: 0.4,
      },
    ],
  };

  const legend = { display: false };

  const options = {
    maintainAspectRatio: false,
    elements: { point: { radius: 0 } },
    tooltips: {
      enabled: false,
    },
    layout: {
      padding: {
        top: 10,
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          display: false,
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
            min: 0,
          },
          display: false,
        },
      ],
    },
  };

  return (
    <div
      style={{
        width: props.width,
        height: props.height,
        marginLeft: "-1%",
      }}
    >
      <Line data={data} legend={legend} options={options} />
    </div>
  );
};

export default LinePlotNG;
