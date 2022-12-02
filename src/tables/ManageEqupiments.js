const Columns = [
  {
    Header: "Equipment Name",
    accessor: "equipment_name",
    Cell: ({ value }) => String(value),
  },
  {
    Header: "Equipment Code",
    accessor: "equipment_code",
    Cell: ({ value }) => String(value),
  },
  {
    Header: "Faculty In-Charge",
    accessor: "faculty_in_charge",
  },
];

export default Columns;
