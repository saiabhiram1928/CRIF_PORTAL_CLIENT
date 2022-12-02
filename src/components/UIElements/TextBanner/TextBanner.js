import React from "react";

import styles from "./TextBanner.module.css";

const TextBanner = (props) => {
  return (
    <div className={styles["text-banner"]} style={{height:props.height, backgroundColor:props.bgColor, alignItems: props.alignItems}}>{props.children}</div>
  );
};

export default TextBanner;
