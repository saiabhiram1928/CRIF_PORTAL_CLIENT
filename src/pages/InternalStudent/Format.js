import React from "react";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import Sidebar from "./Sidebar/Sidebar";
import Topbar from "../Shared/Topbar";

const Format = (props) => {
  return (
    <React.Fragment>
      <Sidebar />
      <Topbar />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        {props.children}
      </MuiPickersUtilsProvider>
    </React.Fragment>
  );
};

export default Format;
