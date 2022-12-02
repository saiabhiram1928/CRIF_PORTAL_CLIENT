import React from "react";

import { Line } from "react-chartjs-2";

const LinePlotCompare = (props) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.label1,
        data: props.data1,
        fill: props.fill1,
        backgroundColor: props.bgColor1,
        borderColor: props.brdColor1,
        lineTension: 0.4,
      },
      {
        label: props.label2,
        data: props.data2,
        fill: props.fill2,
        backgroundColor: props.bgColor2,
        borderColor: props.brdColor2,
        lineTension: 0.4,
      },
    ],
  };

  const legend = { display: false };

  const options = {
    maintainAspectRatio: false,
    interaction: {
      mode: "x",
      intersect: false,
    },
    tooltips: {
      mode: "x-axis",
      intersect:false,
    },
    elements: { point: { radius: 4 } },
    layout: {
      padding: {
        top: 10,
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            padding: -40,
            z: 1,
            fontColor: "rgba(255,255,255,0.8)",
            weight: "400",
          },
          gridLines: {
            display: true,
            color: "rgba(255,255,255,0.1)",
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0,
            display: false,
          },
          gridLines: {
            display: true,
            color: "rgba(255,255,255,0.1)",
          },
        },
      ],
    },
  };

  return (
    <div
      style={{
        width: props.width,
        height: props.height,
        marginLeft: "-1vw",
      }}
    >
      <Line data={data} legend={legend} options={options} />
    </div>
  );
};

export default LinePlotCompare;
