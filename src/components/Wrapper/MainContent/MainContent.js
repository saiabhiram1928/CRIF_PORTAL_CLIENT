import React from "react";
import styles from "./MainContent.module.css"

const MainContent = (props) => {
  return <div className={styles["main-content"]}>{props.children}</div>;
};

export default MainContent;
