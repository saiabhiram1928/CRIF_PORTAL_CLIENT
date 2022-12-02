const Columns = [
    {
      Header: "Sample Code",
      accessor: "sample_code",
      Cell: ({ value }) => String(value),
    },
    {
      Header: "Liquid/Powder",
      accessor: "liquid_powder",
      Cell: ({ value }) => String(value),
    },
    {
      Header: "Solubility",
      accessor: "solubility",
      Cell: ({ value }) => String(value),
    },
    {
      Header: "Exp. Wavelength",
      accessor: "exp_wavelength",
      Cell: ({ value }) => String(value),
    },
    {
      Header: "Type of Analysis",
      accessor: "analysis",
      Cell: ({ value }) => String(value),
    },
    {
      Header: "Temperature",
      accessor: "temperature",
      Cell: ({ value }) => String(value),
    },
  ];
  
  export default Columns;
  