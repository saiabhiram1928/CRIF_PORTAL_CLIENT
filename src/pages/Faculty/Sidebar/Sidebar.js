import React from "react";
import styles from "./Sidebar.module.css";
import { useAuth } from "../../../components/Authenticate/AuthContext";
import { useLocation } from "react-router-dom";
import { BsFillCheckCircleFill, BsShieldFillCheck } from "react-icons/bs";

import Avatar from "../../../components/UIElements/Avatar/Avatar";
import NavLinkBox from "../../../components/Navigation/NavLinkBox/NavLinkBox";
import MarginBox from "../../../components/Utility/MarginBox";

const usePathname = () => {
  const location = useLocation();
  return location.pathname;
};

const Sidebar = () => {
  const path = usePathname();
  const { userDetails } = useAuth();

  return (
    <div className={styles["sidebar"]}>
      <MarginBox margin="2vw" />
      <div className={styles["sidebar__avatar-container"]}>
        {userDetails.img === "none" && (
          <Avatar image="url('https://www.gstatic.com/images/branding/product/2x/avatar_square_blue_120dp.png')" />
        )}
        {userDetails.img !== "none" && (
          <Avatar image={`url('${userDetails.img}')`} />
        )}
      </div>
      <p className={styles["sidebar__username"]}>
        {userDetails.first_name + " " + userDetails.last_name}
      </p>
      <p className={styles["sidebar__email"]}>{userDetails.email}</p>
      <NavLinkBox
        to="/"
        path={path}
        icon={<BsFillCheckCircleFill />}
        text="Faculty Approval"
      ></NavLinkBox>
      <NavLinkBox
        to="/incharge"
        path={path}
        icon={<BsShieldFillCheck />}
        text="Incharge Approval"
      ></NavLinkBox>
    </div>
  );
};

export default Sidebar;
