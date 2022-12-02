import React from "react";
import styles from "./GridCardTrans.module.css";

const GridCardTrans = (props) => {
  return (
    <div
      className={styles["main-grid-card-trans"]}
      style={{
        gridRowStart: props.rowStart,
        gridRowEnd: props.rowEnd,
        gridColumnStart: props.colStart,
        gridColumnEnd: props.colEnd,
        overflow: props.overflow,
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
};

export default GridCardTrans;
