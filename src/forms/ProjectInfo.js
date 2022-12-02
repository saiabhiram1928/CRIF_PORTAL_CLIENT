import React, { useState, useEffect } from "react";
import styles from "./FormStyles.module.css";
import gstyles from "../styles/Global.module.css";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";

import useIsMounted from "../functions/useIsMounted";

import selectStyle from "../components/Forms/SelectStyle";
import MarginBox from "../components/Utility/MarginBox";
import ErrorToast from "../components/Alerts/Toast/ErrorToast";
import Loading from "../components/Navigation/Loading/Loading";

const ProjectInfo = (props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const isMounted = useIsMounted();
  const [facultyOptions, setFacultyOptions] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const getFacultyData = async () => {
      setLoadingData(true);
      await axios
        .get(process.env.REACT_APP_BACKEND_API_URL + "/users/getFaculty")
        .then((response) => {
          if (isMounted.current) {
            const options = [];
            Object.keys(response.data).forEach((key) => {
              options.push({
                value: response.data[key].name,
                label: response.data[key].name,
              });
            });
            setFacultyOptions(options);
            setLoadingData(false);
          }
        })
        .catch((err) => {
          toast.dark(
            <ErrorToast message={err.response.data.message || err.message} />
          );
        });
    };

    getFacultyData();
  }, [isMounted]);

  const onSubmit = (data) => {
    props.setLoadingData(true);
    let processedData = {};
    processedData.student_dept = data.student_dept.value;
    processedData.supervisor_dept = data.supervisor_dept.value;
    processedData.supervisor_name = data.supervisor_name.value;
    processedData.payment_mode = data.payment_mode.value;
    props.setProjectData(processedData);
    props.setLoadingData(false);
    if (processedData.payment_mode === "Offline") {
      props.goToOfflinePayment();
    } else {
      props.goToOnlinePayment();
    }
  };

  const departmentOptions = [
    { value: "CSE", label: "Computer Science Engineering" },
    { value: "ECE", label: "Electronics & Communication Engineering" },
    { value: "EEE", label: "Electrical Engineering" },
    { value: "MECH", label: "Mechanical Engineering" },
    { value: "CIVIl", label: "Civil Engineering" },
    { value: "CHEM", label: "Chemical Engineering" },
    { value: "MME", label: "Metalurgical & Materials Engineering" },
    { value: "BIOTECH", label: "Biotechnology Engineering" },
    { value: "CHEMISTRY", label: "Chemistry" },
    { value: "HSS", label: "Humanities and Social Sciences" },
    { value: "MATH", label: "Mathematics" },
    { value: "PHYSICS", label: "Physics" },
    { value: "SOM", label: "School of Management" },
  ];

  const paymentOptions = [
    { value: "Offline", label: "Offline" },
    { value: "Online", label: "Online" },
  ];

  return (
    <>
      {loadingData ? (
        <Loading size="3vw" />
      ) : (
        <form className={styles["card-form"]} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["two-fields"]}>
            <div
              className={gstyles["field-container"]}
              style={{ width: "49%", height: "3.4vw" }}
            >
              <Controller
                name="student_dept"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    className={gstyles["select-field"]}
                    menuPlacement="top"
                    styles={selectStyle}
                    options={departmentOptions}
                    maxMenuHeight="14vw"
                    placeholder="Student Department"
                    {...field}
                  />
                )}
                defaultValue=""
              />
              <p className={gstyles["field-error"]}>
                {errors.student_dept?.type === "required" &&
                  "Student Department is Required"}
              </p>
            </div>

            <div
              className={gstyles["field-container"]}
              style={{ width: "49%", height: "3.4vw" }}
            >
              <Controller
                name="supervisor_dept"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    className={gstyles["select-field"]}
                    menuPlacement="top"
                    styles={selectStyle}
                    options={departmentOptions}
                    maxMenuHeight="14vw"
                    placeholder="Supervisor Department"
                    {...field}
                  />
                )}
                defaultValue=""
              />
              <p className={gstyles["field-error"]}>
                {errors.supervisor_dept?.type === "required" &&
                  "Supervisor Department is Required"}
              </p>
            </div>
          </div>
          <MarginBox margin="0.6vw" />
          <div className={styles["two-fields"]}>
            <div
              className={gstyles["field-container"]}
              style={{ width: "49%", height: "3.4vw" }}
            >
              <Controller
                name="supervisor_name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    className={gstyles["select-field"]}
                    menuPlacement="top"
                    styles={selectStyle}
                    options={facultyOptions}
                    maxMenuHeight="14vw"
                    placeholder="Supervisor Name"
                    {...field}
                  />
                )}
                defaultValue=""
              />
              <p className={gstyles["field-error"]}>
                {errors.student_dept?.type === "required" &&
                  "Student Department is Required"}
              </p>
            </div>

            <div
              className={gstyles["field-container"]}
              style={{ width: "49%", height: "3.4vw" }}
            >
              <Controller
                name="payment_mode"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    className={gstyles["select-field"]}
                    menuPlacement="top"
                    styles={selectStyle}
                    options={paymentOptions}
                    maxMenuHeight="14vw"
                    placeholder="Payment Mode"
                    {...field}
                  />
                )}
                defaultValue=""
              />
              <p className={gstyles["field-error"]}>
                {errors.payment_mode?.type === "required" &&
                  "Payment Mode is Required"}
              </p>
            </div>
          </div>
          <MarginBox margin="0.6vw" />
          <div className={styles["right-field"]}>
            <input
              className={gstyles["submit-button"]}
              type="submit"
              style={{
                width: "8%",
                height: "2.4vw",
              }}
              value="Continue"
            ></input>
          </div>
        </form>
      )}
    </>
  );
};

export default ProjectInfo;
