import React from "react";
import styles from "./ActionTextField.module.css";

const ActionTextField = (props) => {
  return (
      <div
        className={styles["text-field__container"]}
        style={{ width: props.width, height: props.height }}
      >
        <div
          className={styles["text-field__icon"]}
          style={{ width: props.iconSize, height: props.iconSize }}
        >
          {props.children}
        </div>
        <input
          className={styles["text-field__field"]}
          type={props.type}
          name={props.name}
          placeholder={props.placeHolder}
          onChange={props.onChange}
          value={props.value}
        />
      </div>
  );
};

export default ActionTextField;
