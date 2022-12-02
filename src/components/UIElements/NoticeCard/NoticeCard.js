import React from "react";
import styles from "./NoticeCard.module.css";

import ImageLoader from "../ImageLoader/ImageLoader";

const NoticeCard = (props) => {
  let images = props.imgs.split(",");
  images.pop();
  let imageRender = [];
  if (images.length > 0) {
    for (var item of images) {
      imageRender.push(<ImageLoader key={item} item={item} />);
    }
  }

  let files = props.files.split(",");
  files.pop();
  let fileRender = [];
  let count = 0;
  if (files.length > 0) {
    for (var file of files) {
      count += 1;
      fileRender.push(
        <a key={file} href={file} target="_blank" rel="noreferrer">
          <div className={styles["notice-card-button"]}>
            <p className={styles["notice-card-button-text"]}>
              Download Resouce #{count}
            </p>
          </div>
        </a>
      );
    }
  }
  return (
    <div
      className={styles["notice-card"]}
      style={{
        overflow: props.overflow,
        backgroundColor: props.bgColor,
        ...props.style,
      }}
    >
      <p className={styles["notice-card-title"]}>{props.subject}</p>
      <p className={styles["notice-card-text"]}>{props.message}</p>
      <div
        style={{
          marginTop: "1.2vw",
        }}
      >
        {imageRender}
      </div>
      <div
        style={{
          marginTop: "1.2vw",
        }}
      >
        {fileRender}
      </div>
      <p className={styles["notice-card-time"]}>{props.time}</p>
    </div>
  );
};

export default NoticeCard;
