import React from "react";
import styles from "./Avatar.module.css";

const Avatar = (props) => {
  return (
    <div
      className={styles["avatar"]}
      style={{ backgroundImage: props.image }}
    ></div>
  );
};

export default Avatar;
