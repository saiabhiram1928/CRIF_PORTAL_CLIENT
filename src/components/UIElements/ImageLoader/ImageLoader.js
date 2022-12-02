import React, { useState } from "react";
import styles from "./ImageLoader.module.css";

import ImageLoading from "../../Navigation/ImageLoading/ImageLoading";

const ImageLoader = (props) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const loadingComplete = () => {
    if (imageLoaded === false) {
      setImageLoaded(true);
    }
  };

  return (
    <div className={styles["notice-card-image-div"]}>
      <img
        src={props.item}
        alt="404 NOT FOUND"
        className={styles["notice-card-image"]}
        style={{
          visibility: imageLoaded ? "visible" : "hidden",
        }}
        onLoad={loadingComplete}
      ></img>
      <ImageLoading
        size="3vw"
        style={{
          margin: "auto",
          paddingRight: "2.1vw",
          paddingBottom: "2.1vw",
          gridColumnStart: 1,
          gridRowStart: 1,
          visibility: imageLoaded ? "hidden" : "visible",
        }}
      />
    </div>
  );
};

export default ImageLoader;
