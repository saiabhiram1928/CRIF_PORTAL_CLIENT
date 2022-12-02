import React from "react";
import styles from "./TableField.module.css";

const TableField = (props) => {
  return (
    <input
      className={styles["text-field__field"]}
      type={props.type}
      name={props.name}
      placeholder={props.placeHolder}
      onChange={props.onChange}
      onBlur={props.onBlur}
      value={props.value}
    />
  );
};

export default TableField;
