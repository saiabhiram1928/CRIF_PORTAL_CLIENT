import React, { useState } from "react";

import MainContent from "../../components/Wrapper/MainContent/MainContent";

const PageNotFound = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const loadingComplete = () => {
    if (imageLoaded === false) {
      setImageLoaded(true);
    }
  };

  return (
    <MainContent>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "18vh",
          flexDirection: "column",
          visibility: imageLoaded ? "visible" : "hidden",
        }}
      >
        <img
          src="/404.svg"
          alt="PAGE NOT FOUND"
          style={{ width: "50%" }}
          onLoad={loadingComplete}
        />
        <p
          style={{
            fontSize: "3.2vw",
            fontFamily: "Montserrat",
            fontWeight: 600,
            margin: "auto",
            marginTop: "3%",
            color: "rgba(0,0,0,0.8)",
          }}
        >
          PAGE NOT FOUND
        </p>
      </div>
    </MainContent>
  );
};

export default PageNotFound;
