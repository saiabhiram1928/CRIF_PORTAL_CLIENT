import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import {AiOutlineSearch} from 'react-icons/ai';

import ActionTextField from "../../Forms/ActionTextField/ActionTextField";

const GlobalFilter = ({ filter, setFilter }, props) => {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value.trim() || undefined);
  }, 100);
  return (
    <ActionTextField
      type="text"
      placeHolder="Search"
      width="15vw"
      height="2vw"
      iconSize="1vw"
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
    >
      <AiOutlineSearch style={{ width: "100%", height: "100%", display:"flex" }} />
    </ActionTextField>
  );
};

export default GlobalFilter;
