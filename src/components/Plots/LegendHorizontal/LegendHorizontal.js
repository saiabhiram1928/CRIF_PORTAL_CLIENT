import React from "react";
import styles from "./LegendHorizontal.module.css";
import { GiPlainCircle } from "react-icons/gi";

const LegendHorizontal = (props) => {
  let legend = [];
  let i = 0;
  for (var legendItem of props.legendItems) {
    legend.push(
      <div className={styles["legend-horizontal__item"]} key={i.toString()}>
        <GiPlainCircle
          className={styles["legend-horizontal__item__icon"]}
          style={{ color: legendItem[1] }}
        />
        <p
          className={styles["legend-horizontal__item__text"]}
          style={{ color: props.textColor }}
        >
          {legendItem[0]}
        </p>
      </div>
    );
    i += 1;
  }
  return <div className={styles["legend-horizontal"]}>{legend}</div>;
};

export default LegendHorizontal;
