import React from "react";
import styles from "./Toast.module.css";
import { MdErrorOutline } from "react-icons/md";

const ErrorToast = (props) => {
  return (
    <div className={styles["toast-container"]}>
      <div className={styles["toast-icon"]}>
        <MdErrorOutline size="2vw" />
      </div>
      <div className={styles["toast-message-div"]}>
        <p className={styles["toast-message"]}>{props.message}</p>
      </div>
    </div>
  );
};

export default ErrorToast;
