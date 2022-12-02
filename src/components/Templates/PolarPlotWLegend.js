import React from "react";
import gstyles from "../../styles/Global.module.css";

import { primaryPalette } from "../../styles/ColorPalette";
import Legend from "../Plots/Legend/Legend";
import PolarPlot from "../Plots/PolarPlot/PolarPlot";
import SizedFlexBox from "../Utility/SizedFlexBox";

const PolarPlotWLegend = (props) => {
  const legendColors = primaryPalette.slice(0, props.data.length);
  let legendItems = [];
  for (var i = 0; i < props.data.length; i++) {
    legendItems.push([props.labels[i], legendColors[i]]);
  }
  return (
    <React.Fragment>
      <SizedFlexBox
        height="18%"
        width="100%"
        justifyContent="space-between"
        alignContent="center"
      >
        <p className={gstyles["grid-card-plot-title"]}>{props.title}</p>
      </SizedFlexBox>
      <SizedFlexBox
        height="78%"
        width="100%"
        justifyContent="flex-start"
        alignContent="center"
      >
        <PolarPlot
          labels={props.labels}
          data={props.data}
          width="70%"
          height="95%"	
        />
        <Legend
          legendItems={legendItems}
          key="1"
          textColor={props.textColor}
        />
      </SizedFlexBox>
    </React.Fragment>
  );
};

export default PolarPlotWLegend;
