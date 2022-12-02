import React, { useState, useEffect } from "react";
import gstyles from "../../../styles/Global.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PuffLoader from "react-spinners/PuffLoader";
import { useAuth } from "../../../components/Authenticate/AuthContext";

import ColorPalette from "../../../styles/ColorPalette";
import ObjectDifference from "../../../functions/ObjectDifference";
import equipmentColumns from "../../../tables/ManageEqupiments";
import useIsMounted from "../../../functions/useIsMounted";

import MainContent from "../../../components/Wrapper/MainContent/MainContent";
import TextBanner from "../../../components/UIElements/TextBanner/TextBanner";
import MarginBox from "../../../components/Utility/MarginBox";
import GridTemplate from "../../../components/Grid/GridTemplate/GridTemplate";
import GridCard from "../../../components/Grid/GridCard/GridCard";
import SizedFlexBox from "../../../components/Utility/SizedFlexBox";
import CompleteTable from "../../../components/Tables/CompleteTable/CompleteTable";
import Loading from "../../../components/Navigation/Loading/Loading";
import ErrorToast from "../../../components/Alerts/Toast/ErrorToast";

const MySwal = withReactContent(Swal);

const ManageEquipments = () => {
  const { userDetails } = useAuth();
  const isMounted = useIsMounted();
  const [equipmentsData, setEquipmentsData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const getEquipmentsData = async () => {
      setLoadingData(true);
      await axios
        .get(process.env.REACT_APP_BACKEND_API_URL + "/equipments/getAll")
        .then((response) => {
          if (isMounted.current) {
            setEquipmentsData(response.data);
            setLoadingData(false);
          }
        })
        .catch((err) => {
          toast.dark(
            <ErrorToast message={err.response.data.message || err.message} />
          );
        });
    };
    getEquipmentsData();
  }, [isMounted]);

  const updateEquipmentsData = async (data) => {
    let processedData = {};
    processedData.difference = ObjectDifference(data, equipmentsData);
    if (processedData.difference.length > 0) {
      MySwal.fire({
        width: "40%",
        title: (
          <div className={gstyles["alert-loader"]}>
            <PuffLoader color={ColorPalette.purple.primary} size="4vw" />
          </div>
        ),
        text: "Updating Database",
        showConfirmButton: false,
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      });
      await axios
        .post(
          process.env.REACT_APP_BACKEND_API_URL +
            "/equipments/updateFacultyInCharge",
          processedData
        )
        .then(() => {
          setEquipmentsData(data);
          MySwal.close();
        })
        .catch((err) => {
          MySwal.close();
          toast.dark(
            <ErrorToast message={err.response.data.message || err.message} />
          );
        });
    }
  };

  return (
    <MainContent>
      <TextBanner height="8vw" bgColor={ColorPalette.violet.light}>
        <p className={gstyles["banner-main-text-dark"]}>Manage Equipments</p>
        <MarginBox margin="0.3vw" />
        {loadingData ? (
          <p className={gstyles["banner-sub-text-dark"]}>
            Total Registered Equipments: Calculating
          </p>
        ) : (
          <p className={gstyles["banner-sub-text-dark"]}>
            Total Registered Equipments: {Object.keys(equipmentsData).length}
          </p>
        )}
      </TextBanner>
      <GridTemplate
        rows="repeat(14, 1fr)"
        cols="repeat(12, 1fr)"
        width="75vw"
        height="35.5vw"
      >
        <GridCard rowStart={1} rowEnd={15} colStart={1} colEnd={13}>
          <SizedFlexBox
            height="10%"
            width="100%"
            justifyContent="space-between"
            alignContent="center"
          >
            <p className={gstyles["grid-card-plot-title"]}>
              Registered Equipments
            </p>
          </SizedFlexBox>
          <SizedFlexBox
            height="90%"
            width="100%"
            justifyContent="flex-start"
            alignContent="center"
          >
            <div
              style={{ width: "96%", marginLeft: "auto", marginRight: "auto" }}
            >
              {loadingData ? (
                <Loading size="3vw" />
              ) : (
                <CompleteTable
                  columns={equipmentColumns}
                  data={equipmentsData}
                  saveData={updateEquipmentsData}
                  defaultSort="equipment_code"
                />
              )}
            </div>
          </SizedFlexBox>
        </GridCard>
      </GridTemplate>
    </MainContent>
  );
};

export default ManageEquipments;
