import React from "react";

import { Doughnut } from "react-chartjs-2";
import { primaryPalette, secondaryPalette } from "../../../styles/ColorPalette";

const DoughnutPlot = (props) => {
  const brdColors = primaryPalette.slice(0, props.data.length);
  const bgColors = secondaryPalette.slice(0, props.data.length);
  const data = {
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        backgroundColor: bgColors,
        borderColor: brdColors,
      },
    ],
  };

  const legend = { display: false };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div
      style={{
        width: props.width,
        height: props.height,
        alignSelf: "center",
      }}
    >
      <Doughnut data={data} legend={legend} options={options} />
    </div>
  );
};

export default DoughnutPlot;