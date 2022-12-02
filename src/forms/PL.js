import React from "react";
import styles from "./FormStyles.module.css";
import gstyles from "../styles/Global.module.css";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../components/Authenticate/AuthContext";
import Select from "react-select";

import selectStyle from "../components/Forms/SelectStyle";
import MarginBox from "../components/Utility/MarginBox";

const PL = (props) => {
  const { userDetails } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  let tariff = {
    int_stu: { Emission: 100, Excitation: 150 },
    ext_stu: { Room: 500, Variable: 1000, Low: 1000 },
    industry: { Room: 1500, Variable: 2500, Low: 2500 },
  };

  const onSubmit = (data) => {
    props.setLoadingData(true);
    let formData = props.formData;
    let processedData = {};
    processedData.sample_code = data.sample_code;
    processedData.solubility = data.solubility;
    processedData.liquid_powder = data.liquid_powder.value;
    processedData.temperature = data.temperature.value;
    processedData.analysis = data.analysis.value;
    processedData.excitation_wavelength = data.excitation_wavelength;
    processedData.emission_range = data.emission_range;
    processedData.health_hazard = data.health_hazard.value;
    processedData.fire_hazard = data.fire_hazard.value;
    processedData.specific_hazard = "";
    processedData.instability_hazard = data.instability_hazard.value;

    for (var item of data.specific_hazard) {
      processedData.specific_hazard =
        processedData.specific_hazard + "&" + item.value;
    }
    processedData.specific_hazard = processedData.specific_hazard.substring(1);
    formData.push(processedData);
    props.setFormData(formData);
    props.setTotalPrice(
      props.totalPrice + tariff[userDetails.role][processedData.analysis]
    );
    reset({ sample_code: "", solubility: "", emission_range: "", excitation_wavelength: "" });
    props.setLoadingData(false);
  };

  const liquidPowderOptions = [
    { value: "Liquid", label: "Liquid" },
    { value: "ThinFilm", label: "ThinFilm" },
    { value: "Powder", label: "Powder" },
  ];

  const analysisOptions = [
    { value: "Emission", label: "Emission" },
    { value: "Excitation", label: "Excitation" },
  ];

  const temperatureOptions = [
    { value: "Room", label: "Room" },
    { value: "Variable", label: "Variable" },
    { value: "Low", label: "Low (77K)" },
  ];

  const healthHazardOptions = [
    { value: "Normal", label: "Normal" },
    { value: "Slightly Hazardous", label: "Slightly Hazardous" },
    { value: "Hazardous", label: "Hazardous" },
    { value: "Extreme Danger", label: "Extreme Danger" },
    { value: "Deadly", label: "Deadly" },
  ];

  const fireHazardOptions = [
    { value: "Will Not Burn", label: "Will Not Burn" },
    { value: "Above 200F", label: "Above 200F" },
    { value: "Below 200F", label: "Below 200F" },
    { value: "Below 100F", label: "Below 100F" },
    { value: "Below 73F", label: "Below 73F" },
  ];

  const specificHazardOptions = [
    { value: "Stable", label: "Stable" },
    { value: "Acid", label: "Acid" },
    { value: "Alkali", label: "Alkali" },
    { value: "Corrosive", label: "Corrosive" },
    { value: "Oxidizer", label: "Oxidizer" },
    { value: "Radiation Hazard", label: "Radiation Hazard" },
    { value: "Use No Water", label: "Use No Water" },
  ];

  const instabilityHazardOptions = [
    { value: "Stable", label: "Stable" },
    { value: "Unstable If Heated", label: "Unstable If Heated" },
    { value: "Violent Chemical Change", label: "Violent Chemical Change" },
    { value: "Shock and Heat May Denote", label: "Shock and Heat May Denote" },
    { value: "May Detonate", label: "May Detonate" },
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
            placeholder="Sample Code"
            {...register("sample_code", {
              required: true,
            })}
          />
          <p className={gstyles["field-error"]}>
            {errors.sample_code?.type === "required" &&
              "Sample Code is Required"}
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
            placeholder="Solubility"
            {...register("solubility", {
              required: true,
            })}
          />
          <p className={gstyles["field-error"]}>
            {errors.solubility?.type === "required" && "Solubility is Required"}
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
            name="liquid_powder"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                className={gstyles["select-field"]}
                menuPlacement="bottom"
                styles={selectStyle}
                options={liquidPowderOptions}
                maxMenuHeight="14vw"
                placeholder="Liquid / Powder"
                {...field}
              />
            )}
            defaultValue=""
          />
          <p className={gstyles["field-error"]}>
            {errors.liquid_powder?.type === "required" &&
              "Liquid / Powder is Required"}
          </p>
        </div>

        <div
          className={gstyles["field-container"]}
          style={{ width: "49%", height: "3.4vw" }}
        >
          <Controller
            name="temperature"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                className={gstyles["select-field"]}
                menuPlacement="bottom"
                styles={selectStyle}
                options={temperatureOptions}
                maxMenuHeight="14vw"
                placeholder="Recording Temperature"
                {...field}
              />
            )}
            defaultValue=""
          />
          <p className={gstyles["field-error"]}>
            {errors.temperature?.type === "required" &&
              "Recoding Temperature is Required"}
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
            placeholder="Excitation Wavelength"
            {...register("excitation_wavelength", {
              required: true,
            })}
          />
          <p className={gstyles["field-error"]}>
            {errors.excitation_wavelength?.type === "required" &&
              "Excitation Wavelength is Required"}
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
            placeholder="Emission Range"
            {...register("emission_range", {
              required: true,
            })}
          />
          <p className={gstyles["field-error"]}>
            {errors.emission_range?.type === "required" &&
              "Emission Range is Required"}
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
            name="analysis"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                className={gstyles["select-field"]}
                menuPlacement="bottom"
                styles={selectStyle}
                options={analysisOptions}
                maxMenuHeight="14vw"
                placeholder="Type of Analysis"
                {...field}
              />
            )}
            defaultValue=""
          />
          <p className={gstyles["field-error"]}>
            {errors.analysis?.type === "required" &&
              "Type of Analysis is Required"}
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
            name="health_hazard"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                className={gstyles["select-field"]}
                menuPlacement="bottom"
                styles={selectStyle}
                options={healthHazardOptions}
                maxMenuHeight="14vw"
                placeholder="Health Hazard"
                {...field}
              />
            )}
            defaultValue=""
          />
          <p className={gstyles["field-error"]}>
            {errors.health_hazard?.type === "required" &&
              "Health Hazard is Required"}
          </p>
        </div>

        <div
          className={gstyles["field-container"]}
          style={{ width: "49%", height: "3.4vw" }}
        >
          <Controller
            name="fire_hazard"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                className={gstyles["select-field"]}
                menuPlacement="bottom"
                styles={selectStyle}
                options={fireHazardOptions}
                maxMenuHeight="14vw"
                placeholder="Fire Hazard"
                {...field}
              />
            )}
            defaultValue=""
          />
          <p className={gstyles["field-error"]}>
            {errors.fire_hazard?.type === "required" &&
              "Fire Hazard is Required"}
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
            name="specific_hazard"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                className={gstyles["select-field"]}
                isMulti
                menuPlacement="bottom"
                styles={selectStyle}
                options={specificHazardOptions}
                maxMenuHeight="14vw"
                placeholder="Specific Hazard"
                {...field}
              />
            )}
            defaultValue=""
          />
          <p className={gstyles["field-error"]}>
            {errors.specific_hazard?.type === "required" &&
              "Specific Hazard is Required"}
          </p>
        </div>

        <div
          className={gstyles["field-container"]}
          style={{ width: "49%", height: "3.4vw" }}
        >
          <Controller
            name="instability_hazard"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                className={gstyles["select-field"]}
                menuPlacement="bottom"
                styles={selectStyle}
                options={instabilityHazardOptions}
                maxMenuHeight="14vw"
                placeholder="Instability Hazard"
                {...field}
              />
            )}
            defaultValue=""
          />
          <p className={gstyles["field-error"]}>
            {errors.instability_hazard?.type === "required" &&
              "Instability Hazard is Required"}
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
          value="Add"
        ></input>
      </div>
    </form>
  );
};

export default PL;
