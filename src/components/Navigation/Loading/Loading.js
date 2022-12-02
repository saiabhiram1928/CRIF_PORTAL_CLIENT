import React from "react";
import ColorPalette from "../../../styles/ColorPalette";
import PuffLoader from "react-spinners/PuffLoader";

const Loading = (props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PuffLoader color={ColorPalette.purple.primary} size={props.size} />
    </div>
  );
};

export default Loading;
