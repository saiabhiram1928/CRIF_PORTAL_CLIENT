import React from "react";
import cx from "classnames";
import { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import {
  TiArrowSortedUp,
  TiArrowSortedDown,
  TiArrowUnsorted,
} from "react-icons/ti";

import styles from "./CompleteTable.module.css";
import gstyles from "../../../styles/Global.module.css";
import GlobalFilter from "../Filters/GlobalFilter";
import MarginBox from "../../Utility/MarginBox";
import TableField from "../../Forms/TableField/TableField";

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateData,
}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <TableField
      type="text"
      width="15vw"
      height="100%"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

const defaultColumn = {
  Cell: EditableCell,
};

const Table = ({ columns, data, updateData, defaultSort }) => {
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
      defaultColumn,
      updateData,
      initialState: {
        sortBy: [
          {
            id: defaultSort,
            desc: false,
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

const CompleteTable = (props) => {
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

  const resetData = () => setData(props.data);
  const saveData = () => props.saveData(data);

  return (
    <>
      <Table
        columns={columns}
        data={data}
        updateData={updateData}
        defaultSort={props.defaultSort}
      />
      <div className={styles["table-button-div"]}>
        <button
          className={cx(styles["table-button"], gstyles["blue-button"])}
          onClick={resetData}
        >
          Reset
        </button>
        <button
          className={cx(styles["table-button"], gstyles["green-button"])}
          onClick={saveData}
        >
          Update
        </button>
      </div>
    </>
  );
};

export default CompleteTable;
