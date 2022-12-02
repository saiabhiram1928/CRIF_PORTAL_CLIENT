import React from "react";
import { useState, useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import {
  TiArrowSortedUp,
  TiArrowSortedDown,
  TiArrowUnsorted,
} from "react-icons/ti";

import styles from "./SortableTableFlexible.module.css";
import GlobalFilter from "../Filters/GlobalFilter";
import MarginBox from "../../Utility/MarginBox";

const Table = ({ columns, data, updateData, defaultSort, desc }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      updateData,
      initialState: {
        sortBy: [
          {
            id: defaultSort,
            desc: desc,
          },
        ],
      },
    },
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  return (
    <React.Fragment>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <MarginBox margin="1vw" />
      <div className={styles["table-div"]}>
        <table {...getTableProps()} className={styles["main-table"]}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span className={styles["sort-icon"]}>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TiArrowSortedUp />
                        ) : (
                          <TiArrowSortedDown />
                        )
                      ) : (
                        <TiArrowUnsorted />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

const SortableTableFlexible = (props) => {
  const columns = useMemo(() => props.columns, [props.columns]);

  const [data, setData] = useState(() => props.data);

  const updateData = (rowIndex, columnId, value) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  return (
    <Table
      columns={columns}
      data={data}
      updateData={updateData}
      defaultSort={props.defaultSort}
      desc={props.desc}
    />
  );
};

export default SortableTableFlexible;
