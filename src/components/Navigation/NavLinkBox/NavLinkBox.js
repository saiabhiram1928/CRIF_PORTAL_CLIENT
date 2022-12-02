import React from "react";
import styles from "./NavLinkBox.module.css";

import { NavLink } from "react-router-dom";

const NavLinkBox = (props) => {
  if (props.to === props.path) {
    return (
      <NavLink
        exact
        to={props.to}
        className={styles["sidebar__navlink"]}
        activeClassName={styles["sidebar__navlink-active"]}
      >
        <button className={styles["sidebar__navlink__box-active"]}>
          <div className={styles["sidebar__navlink__box-grid"]}>
            <div className={styles["sidebar__icon"]}>{props.icon}</div>
            <div className={styles["sidebar__text"]}>{props.text}</div>
          </div>
        </button>
      </NavLink>
    );
  } else {
    return (
      <NavLink
        exact
        to={props.to}
        className={styles["sidebar__navlink"]}
        activeClassName={styles["sidebar__navlink-active"]}
      >
        <button className={styles["sidebar__navlink__box"]}>
          <div className={styles["sidebar__navlink__box-grid"]}>
            <div className={styles["sidebar__icon"]}>{props.icon}</div>
            <div className={styles["sidebar__text"]}>{props.text}</div>
          </div>
        </button>
      </NavLink>
    );
  }
};

export default NavLinkBox;
