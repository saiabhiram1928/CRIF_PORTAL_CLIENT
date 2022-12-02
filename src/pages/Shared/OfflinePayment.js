import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import gstyles from "../../styles/Global.module.css";
import { useAuth } from "../../components/Authenticate/AuthContext";

import MainContent from "../../components/Wrapper/MainContent/MainContent";
import GridTemplate from "../../components/Grid/GridTemplate/GridTemplate";
import GridCard from "../../components/Grid/GridCard/GridCard";
import GridCardTrans from "../../components/Grid/GridCardTrans/GridCardTrans";
import SelectEquipment from "../../forms/SelectEquipment";
import SizedFlexBox from "../../components/Utility/SizedFlexBox";
import MarginBox from "../../components/Utility/MarginBox";
import Guideliness from "../../data/Guideliness";
import {
  IntStuTariff,
  ExtStuTariff,
  IndustryTariff,
} from "../../data/Tariff";

const Equipments = () => {
  const { userDetails } = useAuth();
  const [chosenEquipment, setChosenEquipment] = useState();
  let tariff = {};

  if (userDetails.role === "int_stu") {
    tariff = IntStuTariff;
  } else if (userDetails.role === "ext_stu") {
    tariff = ExtStuTariff;
  } else if (userDetails.role === "industry") {
    tariff = IndustryTariff;
  }

  return (
    <MainContent>
      <MarginBox margin="5vw" />
      <GridTemplate cols="repeat(12, 1fr)" width="75vw">
        <GridCard colStart={1} colEnd={13} overflow="visible">
          <SizedFlexBox
            height="30%"
            width="100%"
            justifyContent="space-between"
            alignContent="center"
          >
            <p className={gstyles["grid-card-plot-title"]}>Select Equipment</p>
          </SizedFlexBox>

          <SizedFlexBox
            height="65%"
            width="100%"
            justifyContent="space-between"
            alignContent="center"
          >
            <SelectEquipment setChosenEquipment={setChosenEquipment} />
          </SizedFlexBox>
        </GridCard>

        {chosenEquipment && Guideliness[chosenEquipment.equipment_name.value] && (
          <GridCard colStart={1} colEnd={13} overflow="visible">
            <SizedFlexBox
              width="100%"
              justifyContent="space-between"
              alignContent="center"
            >
              <p className={gstyles["grid-card-plot-title"]}>Guideliness</p>
            </SizedFlexBox>

            <SizedFlexBox
              width="100%"
              justifyContent="space-between"
              alignContent="center"
            >
              <p
                className={gstyles["grid-card-text"]}
                style={{ whiteSpace: "pre-line" }}
              >
                {Guideliness[chosenEquipment.equipment_name.value]}
              </p>
            </SizedFlexBox>
          </GridCard>
        )}

        {chosenEquipment && tariff[chosenEquipment.equipment_name.value] && (
          <GridCard colStart={1} colEnd={13} overflow="visible">
            <SizedFlexBox
              width="100%"
              justifyContent="space-between"
              alignContent="center"
            >
              <p className={gstyles["grid-card-plot-title"]}>Tariff</p>
            </SizedFlexBox>

            <SizedFlexBox
              width="100%"
              justifyContent="space-between"
              alignContent="center"
            >
              <p
                className={gstyles["grid-card-text"]}
                style={{ whiteSpace: "pre-line" }}
              >
                {tariff[chosenEquipment.equipment_name.value]}
              </p>
            </SizedFlexBox>
          </GridCard>
        )}

        {chosenEquipment && (
          <GridCardTrans colStart={1} colEnd={13}>
            <SizedFlexBox
              width="100%"
              justifyContent="right"
              alignContent="right"
            >
              <NavLink exact to={"/" + chosenEquipment.equipment_name.value}>
                <button
                  className={gstyles["submit-button"]}
                  style={{ padding: "0.5vw 1vw 0.5vw 1vw" }}
                >
                  Continue
                </button>
              </NavLink>
            </SizedFlexBox>
          </GridCardTrans>
        )}
      </GridTemplate>
    </MainContent>
  );
};

export default Equipments;
