const selectStyle = {
    control: (provided) => {
      const minHeight = "0vw";
      const height = "100%";
      const alignContent = "center";
      const padding = "0vw";
  
      return {
        ...provided,
        minHeight,
        height,
        alignContent,
        padding,
  
        border: 0,
        boxShadow: 0,
      };
    },
    placeholder: (provided) => {
      const color = "rgba(0,0,0,0.5)";
  
      return {
        ...provided,
        color,
      };
    },
    dropdownIndicator: (provided) => {
      const padding = "0.3vw";
      const width = "2vw";
      const height = "2vw";
      return { ...provided, padding, width, height };
    },
    menu: (provided) => {
      const border = "0.12vw solid rgba(0, 0, 0, 0.1)";
      const borderRadius = "0vw";
      const marginTop = "0.2vw";
      const padding = "0w";
      return {
        ...provided,
        border,
        borderRadius,
        marginTop,
        padding,
        boxShadow: 0,
      };
    },
    menuList: (provided) => {
      const margin = "0vw";
      const padding = "0vw";
      return {
        ...provided,
        margin,
        padding,
      };
    },
    option: (provided) => {
      const padding = "0.4vw";
      const height = "2.2vw";
      const display = "flex";
      const alignItems = "center";
      return { ...provided, padding, height, display, alignItems };
    },
    valueContainer: (provided) => {
      const padding = "0vw 0.4vw";
      return { ...provided, padding };
    },
  };
  
  export default selectStyle;
  