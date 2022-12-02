import React from "react";
import styles from "./SignIn.module.css";
import gstyles from "../../../styles/Global.module.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../../../components/Authenticate/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PuffLoader from "react-spinners/PuffLoader";
import ErrorToast from "../../../components/Alerts/Toast/ErrorToast";

import ColorPalette from "../../../styles/ColorPalette";

const MySwal = withReactContent(Swal);

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      MySwal.fire({
        width: "40%",
        title: (
          <div className={gstyles["alert-loader"]}>
            <PuffLoader color={ColorPalette.purple.primary} size="4vw" />
          </div>
        ),
        text: "Signing In",
        showConfirmButton: false,
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      });
      await login(data.email, data.password).then(() => {
        MySwal.close();
      });
    } catch (err) {
      MySwal.close();
      toast.dark(<ErrorToast message={err.message.split(".")[0]} />);
    }
  };

  return (
    <div className={styles["signin__root"]}>
      <div className={styles["signin__topcolor"]}></div>
      <div className={styles["signin__midcolor"]}></div>
      <div className={styles["signin__bottomcolor"]}></div>

      <div className={styles["signin__card"]}>
        <div className={styles["signin__card__logo__div"]}>
          <img
            className={styles["signin__card__logo__div__image"]}
            src={process.env.PUBLIC_URL + "/logo192b.png"}
            alt=""
          ></img>
          <p className={styles["signin__card__logo__div__text"]}>
            Central Research Instrumentation Facility
          </p>
        </div>

        <hr className={styles["signin__card__separator"]} />

        <form
          className={styles["signin__card__form"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            className={gstyles["field-container"]}
            style={{ width: "100%", height: "3.4vw" }}
          >
            <input
              className={gstyles["text-field"]}
              style={{ width: "100%", height: "2.4vw" }}
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            <p className={gstyles["field-error"]}>
              {errors.email?.type === "required" && "Email is Required"}
            </p>
          </div>

          <div
            className={gstyles["field-container"]}
            style={{ width: "100%", height: "3.4vw" }}
          >
            <input
              className={gstyles["text-field"]}
              style={{ width: "100%", height: "2.4vw" }}
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            <p className={gstyles["field-error"]}>
              {errors.password?.type === "required" && "Password is Required"}
            </p>
          </div>

          <input
            className={gstyles["submit-button"]}
            type="submit"
            style={{
              width: "100%",
              height: "2.4vw",
              borderRadius: "0.5vw",
              backgroundColor: ColorPalette.blue.primary,
              fontSize: "1vw",
            }}
            value="Login"
          ></input>
        </form>
        <div className={styles["create-account"]}>
          <Link className={styles["create-account-link"]} to="/signup" replace>
            Create Account Instead
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
