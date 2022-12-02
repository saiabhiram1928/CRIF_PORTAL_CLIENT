import React from "react";
import styles from "./FormStyles.module.css";
import gstyles from "../styles/Global.module.css";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

import selectStyle from "../components/Forms/SelectStyle";
import MarginBox from "../components/Utility/MarginBox";

const Safety = (props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    props.setLoadingData(true);
    let processedData = data;
    processedData.toxicity = data.toxicity.value;

    props.setSafetyData(processedData);
    props.setLoadingData(false);
    props.goToProjectInformation();
  };

  const toxicityOptions = [
    { value: "Non-Hazardous", label: "Non-Hazardous" },
    { value: "Hazardous", label: "Hazardous" },
  ];

  return (
    <form className={styles["card-form"]} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["two-fields"]}>
        <div
          className={gstyles["field-container"]}
          style={{ width: "49%", height: "3.4vw" }}
        >
          <input
            className={gstyles["text-field"]}
            style={{ width: "100%", height: "2.4vw" }}
            type="text"
            placeholder="Sample Properties (Ex: Carcinogenic/Explosive/Corrosive/Others)"
            {...register("sample_properties", {
              required: true,
            })}
          />
          <p className={gstyles["field-error"]}>
            {errors.sample_properties?.type === "required" &&
              "Sample Properties is Required"}
          </p>
        </div>

        <div
          className={gstyles["field-container"]}
          style={{ width: "49%", height: "3.4vw" }}
        >
          <input
            className={gstyles["text-field"]}
            style={{ width: "100%", height: "2.4vw" }}
            type="text"
            placeholder="Incompatibility With Any Material"
            {...register("incompatibility", {
              required: true,
            })}
          />
          <p className={gstyles["field-error"]}>
            {errors.incompatibility?.type === "required" &&
              "Incompatibility is Required"}
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
            name="toxicity"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                className={gstyles["select-field"]}
                menuPlacement="bottom"
                styles={selectStyle}
                options={toxicityOptions}
                maxMenuHeight="14vw"
                placeholder="Toxicity"
                {...field}
              />
            )}
            defaultValue=""
          />
          <p className={gstyles["field-error"]}>
            {errors.toxicity?.type === "required" && "Toxicity is Required"}
          </p>
        </div>

        <div
          className={gstyles["field-container"]}
          style={{ width: "49%", height: "3.4vw" }}
        >
          <input
            className={gstyles["text-field"]}
            style={{ width: "100%", height: "2.4vw" }}
            type="text"
            placeholder="Health Hazards : Yes (Specify) / No"
            {...register("health_hazard", {
              required: true,
            })}
          />
          <p className={gstyles["field-error"]}>
            {errors.health_hazard?.type === "required" &&
              "Health Hazards is Required"}
          </p>
        </div>
      </div>
      <MarginBox margin="0.6vw" />
      <div className={styles["two-fields"]}>
        <div
          className={gstyles["field-container"]}
          style={{ width: "49%", height: "3.4vw" }}
        >
          <input
            className={gstyles["text-field"]}
            style={{ width: "100%", height: "2.4vw" }}
            type="text"
            placeholder="First Aid Methods"
            {...register("first_aid", {
              required: true,
            })}
          />
          <p className={gstyles["field-error"]}>
            {errors.first_aid?.type === "required" &&
              "First Aid Methods is Required"}
          </p>
        </div>

        <div
          className={gstyles["field-container"]}
          style={{ width: "49%", height: "3.4vw" }}
        >
          <input
            className={gstyles["text-field"]}
            style={{ width: "100%", height: "2.4vw" }}
            type="text"
            placeholder="Sample Disposal Methods"
            {...register("sample_disposal", {
              required: true,
            })}
          />
          <p className={gstyles["field-error"]}>
            {errors.sample_disposal?.type === "required" &&
              "Sample Disposal Methods is Required"}
          </p>
        </div>
      </div>
      <MarginBox margin="0.6vw" />
      <div className={styles["two-fields"]}>
        <div
          className={gstyles["field-container"]}
          style={{ width: "100%", height: "3.4vw" }}
        >
          <input
            className={gstyles["text-field"]}
            style={{ width: "100%", height: "2.4vw" }}
            type="text"
            placeholder="Additional Information (If Any)"
            {...register("additional_information")}
          />
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
  );
};

export default Safety;
