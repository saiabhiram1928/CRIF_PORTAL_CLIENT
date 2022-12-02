import React from "react";
import styles from "./RootLoading.module.css";
import ColorPalette from "../../../styles/ColorPalette";
import BarLoader from "react-spinners/BarLoader";

const RootLoading = () => {
  return (
    <div className={styles["root-loading-div"]}>
      <img
        className={styles["root-loading-image"]}
        src={process.env.PUBLIC_URL + "/logo512.png"}
        alt=""
      ></img>
      <BarLoader
        css={{ backgroundColor: ColorPalette.blue.transparent, marginTop: "2vw" }}
        color={ColorPalette.blue.primary}
        height="0.22vw"
        width="12vw"
      />
    </div>
  );
};

export default RootLoading;
