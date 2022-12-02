import React from "react";
import styles from "./GridTemplate.module.css";

const GridTemplate = (props) => {
  return (
    <div
      className={styles["main-grid"]}
      style={{
        gridTemplateRows: props.rows,
        gridTemplateColumns: props.cols,
        width: props.width,
        height: props.height,
        gridRowGap: props.gridRowGap,
      }}
    >
      {props.children}
    </div>
  );
};

export default GridTemplate;
