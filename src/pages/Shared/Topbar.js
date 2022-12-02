import React, { useState } from "react";
import styles from "./Styles.module.css";
import gstyles from "../../styles/Global.module.css";
import { toast } from "react-toastify";
import { VscSignOut } from "react-icons/vsc";
import { BsArrowsFullscreen } from "react-icons/bs";
import { useAuth } from "../../components/Authenticate/AuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import PuffLoader from "react-spinners/PuffLoader";
import ColorPalette from "../../styles/ColorPalette";

import ErrorToast from "../../components/Alerts/Toast/ErrorToast";

const MySwal = withReactContent(Swal);

const Topbar = () => {
  const { logout } = useAuth();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const handleLogout = async () => {
    try {
      MySwal.fire({
        width: "40%",
        title: (
          <div className={gstyles["alert-loader"]}>
            <PuffLoader color={ColorPalette.purple.primary} size="4vw" />
          </div>
        ),
        text: "Signing Out",
        showConfirmButton: false,
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      });
      await logout().then(() => {
        MySwal.close();
      });
    } catch (err) {
      MySwal.close();
      toast.dark(<ErrorToast message={err.message.split(".")[0]} />);
    }
  };

  const fullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    }
  };

  return (
    <div className={styles["topbar"]}>
      <div className={styles["topbar__options"]}>
        <div onClick={fullScreen} className={styles["topbar__options__icons"]}>
          <BsArrowsFullscreen />
        </div>
        <div
          onClick={handleLogout}
          className={styles["topbar__options__icons"]}
        >
          <VscSignOut />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
