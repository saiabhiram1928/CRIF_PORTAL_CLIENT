import React from "react";
import styles from "./GridCard.module.css";

const GridCard = (props) => {
  return (
    <div
      className={styles["main-grid-card"]}
      style={{
        gridRowStart: props.rowStart,
        gridRowEnd: props.rowEnd,
        gridColumnStart: props.colStart,
        gridColumnEnd: props.colEnd,
        overflow: props.overflow,
        backgroundColor: props.bgColor,
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
};

export default GridCard;
