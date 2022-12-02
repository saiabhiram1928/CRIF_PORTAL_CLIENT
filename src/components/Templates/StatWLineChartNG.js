import React from "react";
import styles from "./Template.module.css";

import { AiOutlineRise, AiOutlineFall } from "react-icons/ai";
import LinePlotNG from "../Plots/LinePlot/LinePlotNG";
import SizedFlexBox from "../Utility/SizedFlexBox";
import ColorPalette from "../../styles/ColorPalette";

const StatWLineChartNG = (props) => {
  return (
    <React.Fragment>
      <SizedFlexBox
        height="40%"
        width="100%"
        justifyContent="space-between"
        alignContent="center"
      >
        <div>
          <p className={styles["grid-card-stat-plot-value"]}>{props.value}</p>
          <p className={styles["grid-card-stat-plot-name"]}>{props.name}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p className={styles["grid-card-stat-plot-icon"]}>
            {props.hasIncreased ? (
              <AiOutlineRise style={{ color: ColorPalette.green.primary }} />
            ) : (
              <AiOutlineFall style={{ color: ColorPalette.red.primary }} />
            )}
          </p>
          {props.hasIncreased ? (
            <p
              className={styles["grid-card-stat-plot-icon-value"]}
              style={{ color: ColorPalette.green.primary }}
            >
              {props.change}%
            </p>
          ) : (
            <p
              className={styles["grid-card-stat-plot-icon-value"]}
              style={{ color: ColorPalette.red.primary }}
            >
              {props.change}%
            </p>
          )}
        </div>
      </SizedFlexBox>
      <LinePlotNG
        labels={props.labels}
        data={props.data}
        fill={props.fill}
        bgColor={props.bgColor}
        brdColor={props.brdColor}
        width="102%"
        height="61%"
      />
    </React.Fragment>
  );
};

export default StatWLineChartNG;
