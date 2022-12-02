import React from "react";
import styles from "./SubmitButton.module.css";

const SubmitButton = (props) => {
  return (
    <input
      className={styles["submit-button"]}
      type="submit"
      style={{ width: props.width, height: props.height }}
      value={props.value}
    ></input>
  );
};

export default SubmitButton;
