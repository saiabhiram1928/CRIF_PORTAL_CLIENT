import React from "react";
import styles from "./TextFieldWIcon.module.css";

const TextFieldWIcon = (props) => {
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
        />
      </div>
  );
};

export default TextFieldWIcon;
