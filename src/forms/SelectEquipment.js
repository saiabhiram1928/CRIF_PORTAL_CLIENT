import React from "react";
import styles from "./FormStyles.module.css";
import gstyles from "../styles/Global.module.css";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

import selectStyle from "../components/Forms/SelectStyle";
import Equipments from "../data/Equipments";

const SelectEquipment = (props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    props.setChosenEquipment(data);
  };

  return (
    <form className={styles["card-form"]} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["two-fields"]}>
        <div
          className={gstyles["field-container"]}
          style={{ width: "49%", height: "3.4vw" }}
        >
          <Controller
            name="equipment_name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                className={gstyles["select-field"]}
                menuPlacement="bottom"
                styles={selectStyle}
                options={Equipments}
                maxMenuHeight="14vw"
                placeholder="Equipment Name"
                {...field}
              />
            )}
            defaultValue=""
          />
          <p className={gstyles["field-error"]}>
            {errors.equipment_name?.type === "required" &&
              "Equipment Name is Required"}
          </p>
        </div>

        <input
          className={gstyles["submit-button"]}
          type="submit"
          style={{
            width: "8%",
            height: "2.4vw",
          }}
          value="Select"
        ></input>
      </div>
    </form>
  );
};

export default SelectEquipment;
