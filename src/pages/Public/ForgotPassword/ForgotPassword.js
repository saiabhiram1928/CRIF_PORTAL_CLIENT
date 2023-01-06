import React from "react";
import styles from "./ForgotPassword.module.css";
import gstyles from "../../../styles/Global.module.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../components/Authenticate/AuthContext";
import { auth } from "../../../components/Authenticate/FirebaseApp";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PuffLoader from "react-spinners/PuffLoader";
import ErrorToast from "../../../components/Alerts/Toast/ErrorToast";
import { Link } from "react-router-dom";

import ColorPalette from "../../../styles/ColorPalette";

const MySwal = withReactContent(Swal);

// ! Change Styling and file names for ForgotPassword page

const ForgotPassword = () => {
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
                        <PuffLoader
                            color={ColorPalette.purple.primary}
                            size="4vw"
                        />
                    </div>
                ),
                text: "Sending Link",
                showConfirmButton: false,
                showCancelButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
            });
            await auth.sendPasswordResetEmail(data.email).then((response) => {
                MySwal.close();
                toast(
                    <ErrorToast message="Password Reset Link send successfully" />
                );
            });
        } catch (err) {
            MySwal.close();
            toast.dark(<ErrorToast message={err.message.split(".")[0]} />);
        }
    };

    return (
        <div className={styles["forgotPassword__root"]}>
            <div className={styles["forgotPassword__topcolor"]}></div>
            <div className={styles["forgotPassword__midcolor"]}></div>
            <div className={styles["forgotPassword__bottomcolor"]}></div>

            <div className={styles["forgotPassword__card"]}>
                <div className={styles["forgotPassword__card__logo__div"]}>
                    <img
                        className={
                            styles["forgotPassword__card__logo__div__image"]
                        }
                        src={process.env.PUBLIC_URL + "/logo192b.png"}
                        alt=""
                    ></img>
                    <p
                        className={
                            styles["forgotPassword__card__logo__div__text"]
                        }
                    >
                        Central Research Instrumentation Facility
                    </p>
                </div>

                <hr className={styles["forgotPassword__card__separator"]} />

                <form
                    className={styles["forgotPassword__card__form"]}
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
                            {errors.email?.type === "required" &&
                                "Email is Required"}
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
                        value="Send password reset email"
                    ></input>
                    <div className={styles["create-account"]}>
                        <Link
                            className={styles["create-account-link"]}
                            to="/signin"
                            replace
                        >
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
