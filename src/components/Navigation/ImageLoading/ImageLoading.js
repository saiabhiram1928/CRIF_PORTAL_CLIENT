import React from "react";
import ColorPalette from "../../../styles/ColorPalette";
import PuffLoader from "react-spinners/PuffLoader";

const ImageLoading = (props) => {
  return (
    <div
      style={{
        ...props.style,
      }}
    >
      <PuffLoader color={ColorPalette.purple.primary} size={props.size} />
    </div>
  );
};

export default ImageLoading;
