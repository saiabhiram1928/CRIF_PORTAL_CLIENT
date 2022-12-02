import React, { useState } from "react";
import gstyles from "../../styles/Global.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PuffLoader from "react-spinners/PuffLoader";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../components/Authenticate/AuthContext";

import ColorPalette from "../../styles/ColorPalette";
import MainContent from "../../components/Wrapper/MainContent/MainContent";
import TextBanner from "../../components/UIElements/TextBanner/TextBanner";
import MarginBox from "../../components/Utility/MarginBox";
import GridTemplate from "../../components/Grid/GridTemplate/GridTemplate";
import GridCard from "../../components/Grid/GridCard/GridCard";
import GridCardTrans from "../../components/Grid/GridCardTrans/GridCardTrans";
import SizedFlexBox from "../../components/Utility/SizedFlexBox";
import CompleteTableFlexible from "../../components/Tables/CompleteTableFlexible/CompleteTableFlexible";
import Loading from "../../components/Navigation/Loading/Loading";
import ErrorToast from "../../components/Alerts/Toast/ErrorToast";

import ICPOESForm from "../../forms/ICPOES";
import SafetyForm from "../../forms/Safety";
import ProjectInfoForm from "../../forms/ProjectInfo";
import ICPOESColumns from "../../tables/ICPOES";

const MySwal = withReactContent(Swal);

const ICPOES = () => {
  const { userDetails } = useAuth();
  const [formData, setFormData] = useState([]);
  const [safetyData, setSafetyData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentState, setCurrentState] = useState(1);

  const goToSafetyDeclaration = () => {
    setCurrentState(2);
  };

  const goToProjectInformation = () => {
    setCurrentState(3);
  };

  const goToOfflinePayment = () => {
    setCurrentState(4);
  };

  const goToOnlinePayment = () => {
    setCurrentState(5);
  };

  const submitApplication = () => {
    let applicationData = { ...safetyData, ...projectData };
    applicationData.email = userDetails.email;
    applicationData.role = userDetails.role;
    applicationData.instrument_code = "ICPOES";
    applicationData.pricing = totalPrice;
    MySwal.fire({
      width: "40%",
      title: <p className={gstyles["alert-title"]}>Are You Sure ?</p>,
      text: "This Operation will Submit your Application",
      showCancelButton: true,
      confirmButtonText: "Submit",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          width: "40%",
          title: (
            <div className={gstyles["alert-loader"]}>
              <PuffLoader color={ColorPalette.purple.primary} size="4vw" />
            </div>
          ),
          text: "Submitting Application",
          showConfirmButton: false,
          showCancelButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
        });
        await axios
          .post(
            process.env.REACT_APP_BACKEND_API_URL + "/applications/createItem",
            applicationData
          )
          .catch((err) => {
            MySwal.close();
            toast.dark(
              <ErrorToast message={err.response.data.message || err.message} />
            );
          });
        let counter = 0;
        Object.keys(formData).forEach(async (key) => {
          counter++;
          formData[key].ref_id = counter;
          await axios.post(
            process.env.REACT_APP_BACKEND_API_URL + "/icpoes/createItem",
            formData[key]
          );
        });

        setFormData([]);
        setSafetyData([]);
        setProjectData([]);
        setTotalPrice(0);
        setLoadingData(false);
        MySwal.close();
        MySwal.fire({
          title: (
            <p className={gstyles["alert-title"]}>
              Application Submitted Successfully
            </p>
          ),
          text: "Payment: " + totalPrice,
        });
      }
    });
  };

  const updateFormData = (data) => {
    setFormData(data);
  };

  return (
    <MainContent>
      <TextBanner height="8vw" bgColor={ColorPalette.violet.light}>
        <p className={gstyles["banner-main-text-dark"]}>Application Form</p>
      </TextBanner>
      <GridTemplate cols="repeat(12, 1fr)" width="75vw">
        {currentState === 1 && (
          <>
            <GridCard colStart={1} colEnd={13} overflow="visible">
              <SizedFlexBox
                width="100%"
                justifyContent="space-between"
                alignContent="center"
              >
                <p className={gstyles["grid-card-plot-title"]}>Add Sample</p>
              </SizedFlexBox>

              <SizedFlexBox
                width="100%"
                justifyContent="space-between"
                alignContent="center"
              >
                <ICPOESForm
                  formData={formData}
                  setFormData={setFormData}
                  setLoadingData={setLoadingData}
                  setTotalPrice={setTotalPrice}
                  totalPrice={totalPrice}
                />
              </SizedFlexBox>
            </GridCard>

            <GridCard colStart={1} colEnd={13}>
              <SizedFlexBox
                width="100%"
                justifyContent="space-between"
                alignContent="center"
              >
                <p
                  className={gstyles["grid-card-plot-title"]}
                  style={{ marginBottom: "1vw" }}
                >
                  Sample Details
                </p>
                <button
                  className={gstyles["submit-button"]}
                  style={{
                    width: "10%",
                    marginRight: "1.4vw",
                    marginTop: "1vw",
                  }}
                  onClick={goToSafetyDeclaration}
                >
                  Continue
                </button>
              </SizedFlexBox>
              <SizedFlexBox
                width="100%"
                justifyContent="flex-start"
                alignContent="center"
              >
                <div
                  style={{
                    width: "96%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {loadingData ? (
                    <Loading size="3vw" />
                  ) : (
                    <React.Fragment>
                      <CompleteTableFlexible
                        columns={ICPOESColumns}
                        data={formData}
                        saveData={updateFormData}
                      />
                      <MarginBox margin="2vw" />
                    </React.Fragment>
                  )}
                </div>
              </SizedFlexBox>
            </GridCard>
            <GridCard colStart={1} colEnd={13} overflow="visible">
              <SizedFlexBox
                width="100%"
                justifyContent="center"
                alignContent="center"
              >
                <p
                  className={gstyles["grid-card-text"]}
                  style={{
                    textAlign: "center",
                    whiteSpace: "pre-line",
                    fontSize: "1.1vw",
                  }}
                >
                  Total Pricing: {totalPrice} INR
                </p>
              </SizedFlexBox>
            </GridCard>
          </>
        )}
        {currentState === 2 && (
          <>
            <GridCard colStart={1} colEnd={13} overflow="visible">
              <SizedFlexBox
                width="100%"
                justifyContent="space-between"
                alignContent="center"
              >
                <p className={gstyles["grid-card-plot-title"]}>
                  Safety Declaration
                </p>
              </SizedFlexBox>

              <SizedFlexBox
                width="100%"
                justifyContent="space-between"
                alignContent="center"
              >
                <SafetyForm
                  setSafetyData={setSafetyData}
                  setLoadingData={setLoadingData}
                  goToProjectInformation={goToProjectInformation}
                />
              </SizedFlexBox>
            </GridCard>
          </>
        )}
        {currentState === 3 && (
          <>
            <GridCard colStart={1} colEnd={13} overflow="visible">
              <SizedFlexBox
                width="100%"
                justifyContent="space-between"
                alignContent="center"
              >
                <p className={gstyles["grid-card-plot-title"]}>Declaration</p>
              </SizedFlexBox>

              <SizedFlexBox
                width="100%"
                justifyContent="space-between"
                alignContent="center"
              >
                <p className={gstyles["grid-card-text"]}>
                  I confirm that the samples submitted for analysis are for
                  research purpose only and the above furnished details are
                  correct and true to the best of my knowledge.
                  <br />I understand that I will be held responsible for any
                  damages arising from incorrect information provided by me
                  against the safety declaration information.
                  <br />
                  <br />
                  It is certified that sample is new (not reported in
                  literature)
                  <br />
                  <br />I agree to acknowledge Central Research Instrumentation
                  Facility (CRIF), NIT Warangal for providing (Instrument)
                  analytical facility for my research work, in my publication. I
                  also agree to send the publication reference to
                  techofficer_crif@nitw.ac.in
                  <br />
                  (Journal name/ Volume number/ Names of the authors/ Date of
                  issue of the publication)
                </p>
              </SizedFlexBox>
            </GridCard>
            <GridCard colStart={1} colEnd={13} overflow="visible">
              <SizedFlexBox
                width="100%"
                justifyContent="space-between"
                alignContent="center"
              >
                <p className={gstyles["grid-card-plot-title"]}>
                  Project Information
                </p>
              </SizedFlexBox>

              <SizedFlexBox
                width="100%"
                justifyContent="space-between"
                alignContent="center"
              >
                <ProjectInfoForm
                  setProjectData={setProjectData}
                  setLoadingData={setLoadingData}
                  goToOfflinePayment={goToOfflinePayment}
                  goToOnlinePayment={goToOnlinePayment}
                />
              </SizedFlexBox>
            </GridCard>
          </>
        )}
        {currentState === 4 && (
          <>
            <GridCard colStart={1} colEnd={13} overflow="visible">
              <SizedFlexBox
                width="100%"
                justifyContent="space-between"
                alignContent="center"
              >
                <p className={gstyles["grid-card-plot-title"]}>
                  Offline Payment Details
                </p>
              </SizedFlexBox>

              <SizedFlexBox
                width="100%"
                justifyContent="space-between"
                alignContent="center"
              >
                <p className={gstyles["grid-card-text"]}>
                  Account Number : Account Number
                  <br />
                  Bank Name : Bank Name
                  <br />
                  IFSC Code : IFSC Code
                  <br />
                  Total Pricing : {totalPrice}
                </p>
              </SizedFlexBox>
              <SizedFlexBox
                width="100%"
                justifyContent="space-between"
                alignContent="center"
              >
                <p className={gstyles["grid-card-text"]}>
                  Kindly make the payment according to the above details. Upload
                  the proof of payment document in the payments tab.
                </p>
              </SizedFlexBox>
            </GridCard>
            <GridCardTrans colStart={1} colEnd={13}>
              <SizedFlexBox
                width="100%"
                justifyContent="right"
                alignContent="right"
              >
                <button
                  onClick={submitApplication}
                  className={gstyles["submit-button"]}
                  style={{ padding: "0.5vw 1vw 0.5vw 1vw" }}
                >
                  Submit
                </button>
              </SizedFlexBox>
            </GridCardTrans>
          </>
        )}
        {currentState === 5 && (
          <>
            <GridCard colStart={1} colEnd={13} overflow="visible">
              <SizedFlexBox
                width="100%"
                justifyContent="space-between"
                alignContent="center"
              >
                <p className={gstyles["grid-card-plot-title"]}>
                  Online Payment Details
                </p>
              </SizedFlexBox>

              <SizedFlexBox
                width="100%"
                justifyContent="space-between"
                alignContent="center"
              >
                <p className={gstyles["grid-card-text"]}>
                  Account Number : Account Number
                  <br />
                  Bank Name : Bank Name
                  <br />
                  IFSC Code : IFSC Code
                  <br />
                  Total Pricing : {totalPrice}
                </p>
              </SizedFlexBox>
              <SizedFlexBox
                width="100%"
                justifyContent="space-between"
                alignContent="center"
              >
                <p className={gstyles["grid-card-text"]}>
                  Kindly make the payment according to the above details. Upload
                  the proof of payment document in the payments tab.
                </p>
              </SizedFlexBox>
            </GridCard>
            <GridCardTrans colStart={1} colEnd={13}>
              <SizedFlexBox
                width="100%"
                justifyContent="right"
                alignContent="right"
              >
                <button
                  onClick={submitApplication}
                  className={gstyles["submit-button"]}
                  style={{ padding: "0.5vw 1vw 0.5vw 1vw" }}
                >
                  Submit
                </button>
              </SizedFlexBox>
            </GridCardTrans>
          </>
        )}
      </GridTemplate>
      <MarginBox margin="2vw" />
    </MainContent>
  );
};

export default ICPOES;
