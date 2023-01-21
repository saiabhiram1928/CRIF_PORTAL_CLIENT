import React from "react";
import styles from "./SignUp.module.css";
import gstyles from "../../../styles/Global.module.css";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../../../components/Authenticate/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PuffLoader from "react-spinners/PuffLoader";

import ErrorToast from "../../../components/Alerts/Toast/ErrorToast";
import ColorPalette from "../../../styles/ColorPalette";

const MySwal = withReactContent(Swal);

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup } = useAuth();
  const history = useHistory();

  const onSubmit = async (data) => {
    let role;
    try {
      MySwal.fire({
        width: "40%",
        title: (
          <div className={gstyles["alert-loader"]}>
            <PuffLoader color={ColorPalette.purple.primary} size="4vw" />
          </div>
        ),
        text: "Creating Account",
        showConfirmButton: false,
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      });
      if (data.email.split("@")[1].split(".")[1] === "nitw") {
        if (data.email.split("@")[1].split(".")[0] === "student") {
          role = "int_stu";
        } else if (data.email.split("@")[1].split(".")[0] === "faculty") {
          role = "faculty";
        }
      } else {
        if (data.email.split("@")[1].split(".")[0] === "student") {
          role = "ext_stu";
        } else {
          role = "industry";
        }
      }
      await signup(data.email, data.password).then(async () => {
        await axios
          .post(process.env.REACT_APP_BACKEND_API_URL + "/users/createItem", {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            role: role,
            img: "none",
          })
          .then(() => {
            MySwal.close();
            history.push("/");
            window.location.reload();
          })
          .catch((err) => {
            toast.dark(
              <ErrorToast message={err.response.data.message || err.message} />
            );
          });
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
              type="text"
              placeholder="First Name"
              {...register("first_name", { required: true })}
            />
            <p className={gstyles["field-error"]}>
              {errors.first_name?.type === "required" &&
                "First Name is Required"}
            </p>
          </div>

          <div
            className={gstyles["field-container"]}
            style={{ width: "100%", height: "3.4vw" }}
          >
            <input
              className={gstyles["text-field"]}
              style={{ width: "100%", height: "2.4vw" }}
              type="text"
              placeholder="Last Name"
              {...register("last_name", { required: true })}
            />
            <p className={gstyles["field-error"]}>
              {errors.last_name?.type === "required" && "Last Name is Required"}
            </p>
          </div>

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
              type="text"
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
            />
            <p className={gstyles["field-error"]}>
              {errors.password?.type === "required" && "Password is Required"}
              {errors.password?.type === "minLength" &&
                "Minimum 6 Characters for Password"}
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
            value="Create Account"
          ></input>
        </form>
        <div className={styles["create-account"]}>
          <Link className={styles["create-account-link"]} to="/signin" replace>
            Login to Existing Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
