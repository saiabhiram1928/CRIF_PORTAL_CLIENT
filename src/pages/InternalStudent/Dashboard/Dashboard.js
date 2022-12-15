import React, { useState, useEffect, useCallback } from "react";
import gstyles from "../../../styles/Global.module.css";
import style from "./Dashboard.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../../components/Authenticate/AuthContext";

import MainContent from "../../../components/Wrapper/MainContent/MainContent";
import TextBanner from "../../../components/UIElements/TextBanner/TextBanner";
import ErrorToast from "../../../components/Alerts/Toast/ErrorToast";
import Loading from "../../../components/Navigation/Loading/Loading";
import MarginBox from "../../../components/Utility/MarginBox";
import GridCard from "../../../components/Grid/GridCard/GridCard";
import ColorPalette from "../../../styles/ColorPalette";

const Dashboard = () => {
    const { userDetails } = useAuth();
    const [loadingData, setLoadingData] = useState(true);
    const [applications, setApplications] = useState([]);

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState({});

    // ! change logic for paymentslip upload
    const handleUploadBtnClick = (e) => {
        e.preventDefault();
        document.getElementById(`paymentSlipChooseFile-${e.target.id}`).click();
        const updateKey = e.target.id;
        console.log(typeof updateKey, e.target.files[0]);
        setFileName((prevState) => ({
            ...prevState,
            updateKey: e.target.files[0],
        }));
    };

    const handlePaymentSlipUpload = async (e) => {
        const formData = new FormData();
        formData.append("paymentSlip", {});
        console.log(formData.get("paymentSlip"));
        await axios
            .post(
                process.env.REACT_APP_BACKEND_API_URL +
                    "/applications/uploadPaymentSlip",
                {
                    params: { email: userDetails.email },
                    formData,
                },
                {
                    headers: {
                        Accept: "multipart/form-data",
                    },
                }
            )
            .then((res) => {
                console.log(res);
                const id = e.target.id.split("-")[1];
                setFileName((prevState) => ({ ...prevState, [id]: null }));
            })
            .catch((err) => {
                console.log(err);
            });
        console.log("THE END");
    };

    const getApplicationsData = useCallback(async () => {
        setLoadingData(true);
        await axios
            .get(
                process.env.REACT_APP_BACKEND_API_URL +
                    "/applications/getAllByEmailForDashboard",
                {
                    params: { email: userDetails.email },
                }
            )
            .then((response) => {
                let applicationsRender = [];
                console.log(response.data);
                if (response.data.length > 0) {
                    for (var item of response.data) {
                        let samplesRender = [];
                        for (var sample of item.data) {
                            let sampleRender = [];
                            let counter = 1;
                            Object.keys(sample).forEach((key) => {
                                if (key !== "application_id") {
                                    if (
                                        counter % 4 === 0 ||
                                        counter % 4 === 3
                                    ) {
                                        sampleRender.push(
                                            <div
                                                key={counter}
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    width: "25%",
                                                    textAlign: "right",
                                                }}
                                            >
                                                <p className={style["value2"]}>
                                                    {sample[key]}
                                                </p>
                                                <p className={style["label2"]}>
                                                    {key}
                                                </p>
                                            </div>
                                        );
                                    } else {
                                        sampleRender.push(
                                            <div
                                                key={counter}
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    width: "25%",
                                                    textAlign: "left",
                                                }}
                                            >
                                                <p className={style["value2"]}>
                                                    {sample[key]}
                                                </p>
                                                <p className={style["label2"]}>
                                                    {key}
                                                </p>
                                            </div>
                                        );
                                    }
                                    counter++;
                                }
                            });

                            var tracker = 1000;
                            while (sampleRender.length % 4 !== 0) {
                                sampleRender.push(
                                    <div
                                        key={tracker}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            width: "25%",
                                            textAlign: "right",
                                        }}
                                    ></div>
                                );
                                tracker++;
                            }

                            samplesRender.push(
                                <div
                                    key={sample.ref_id}
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        justifyContent: "space-evenly",
                                        rowGap: "1vw",
                                        margin: "auto",
                                        marginTop: "1vw",
                                        marginBottom: "1vw",
                                        backgroundColor: "rgba(0,0,0,0.05)",
                                        padding: "2vw",
                                        borderRadius: "1vw",
                                    }}
                                >
                                    {sampleRender}
                                </div>
                            );
                        }
                        applicationsRender.push(
                            <div
                                className={style["outercard"]}
                                key={`ref${item.application_id}`}
                            >
                                <div className={style["innercard"]}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginBottom: "0.5vw",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                textAlign: "left",
                                                width: "25%",
                                            }}
                                        >
                                            <p className={style["value"]}>
                                                {item.application_id}
                                            </p>
                                            <p className={style["label"]}>
                                                Application Id
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                textAlign: "left",
                                                width: "25%",
                                            }}
                                        >
                                            <p className={style["value"]}>
                                                {item.instrument_code}
                                            </p>
                                            <p className={style["label"]}>
                                                Instrument Code
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                textAlign: "right",
                                                width: "25%",
                                            }}
                                        >
                                            <p className={style["value"]}>
                                                {item.status}
                                            </p>
                                            <p className={style["label"]}>
                                                Status
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                textAlign: "right",
                                                width: "25%",
                                            }}
                                        >
                                            <p className={style["value"]}>
                                                {item.pricing}
                                            </p>
                                            <p className={style["label"]}>
                                                Pricing
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginBottom: "0.5vw",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                textAlign: "left",
                                                width: "25%",
                                            }}
                                        >
                                            <p className={style["value"]}>
                                                {item.department}
                                            </p>
                                            <p className={style["label"]}>
                                                Student Department
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                textAlign: "left",
                                                width: "25%",
                                            }}
                                        >
                                            <p className={style["value"]}>
                                                {item.role}
                                            </p>
                                            <p className={style["label"]}>
                                                Student Type
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                textAlign: "right",
                                                width: "25%",
                                            }}
                                        >
                                            <p className={style["value"]}>
                                                {item.supervisor_name}
                                            </p>
                                            <p className={style["label"]}>
                                                Supervisor Name
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                textAlign: "right",
                                                width: "25%",
                                            }}
                                        >
                                            <p className={style["value"]}>
                                                {item.supervisor_department}
                                            </p>
                                            <p className={style["label"]}>
                                                Supervisor Department
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginBottom: "0.5vw",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                textAlign: "left",
                                                width: "25%",
                                            }}
                                        >
                                            <p className={style["value"]}>
                                                {item.toxicity}
                                            </p>
                                            <p className={style["label"]}>
                                                Toxicity
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                textAlign: "left",
                                                width: "25%",
                                            }}
                                        >
                                            <p className={style["value"]}>
                                                {item.incompatibility}
                                            </p>
                                            <p className={style["label"]}>
                                                Incompatibility
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                textAlign: "right",
                                                width: "25%",
                                            }}
                                        >
                                            <p className={style["value"]}>
                                                {item.health_hazard}
                                            </p>
                                            <p className={style["label"]}>
                                                Health Hazard
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                textAlign: "right",
                                                width: "25%",
                                            }}
                                        >
                                            <p className={style["value"]}>
                                                {item.sample_properties}
                                            </p>
                                            <p className={style["label"]}>
                                                Sample Properties
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginBottom: "0.5vw",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                textAlign: "left",
                                                width: "25%",
                                            }}
                                        >
                                            <p className={style["value"]}>
                                                {item.first_aid}
                                            </p>
                                            <p className={style["label"]}>
                                                First Aid
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                textAlign: "left",
                                                width: "25%",
                                            }}
                                        >
                                            <p className={style["value"]}>
                                                {item.disposal}
                                            </p>
                                            <p className={style["label"]}>
                                                Disposal
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                textAlign: "right",
                                                width: "50%",
                                            }}
                                        >
                                            <p className={style["value"]}>
                                                {item.additional_info}
                                            </p>
                                            <p className={style["label"]}>
                                                Additional Information
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "right",
                                            marginBottom: "0.5vw",
                                        }}
                                    >
                                        <button
                                            id={item.application_id}
                                            className={gstyles["submit-button"]}
                                            style={{
                                                width: "100%",
                                                height: "2.4vw",
                                                textAlign: "center",
                                            }}
                                            onClick={handleUploadBtnClick}
                                            disabled={
                                                fileName[
                                                    `${item.application_id}`
                                                ] === null
                                            }
                                        >
                                            {" "}
                                            Upload Payment Slip
                                        </button>
                                        <input
                                            id={`paymentSlipChooseFile-${item.application_id}`}
                                            type="file"
                                            name="file"
                                            style={{
                                                marginLeft: "100px",
                                                display: "none",
                                                fontSize: "10px",
                                            }}
                                            onChange={handlePaymentSlipUpload}
                                        />
                                    </div>

                                    <div key="samplesRender">
                                        {samplesRender}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                } else {
                    applicationsRender.push(
                        <GridCard colStart={1} colEnd={13} key="applications">
                            <div style={{ padding: "1.2vw 1.5vw" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <p
                                        className={style["applications_title"]}
                                        key="applicationtitle"
                                    >
                                        No Applications
                                    </p>
                                </div>
                            </div>
                        </GridCard>
                    );
                }
                setApplications(applicationsRender);
                setLoadingData(false);
            })
            .catch((err) => {
                console.log(err);
                toast.dark(
                    <ErrorToast
                        message={err.response.data.message || err.message}
                    />
                );
            });
    }, [userDetails, fileName]);

    useEffect(() => {
        getApplicationsData();
    }, [getApplicationsData]);

    return (
        <MainContent>
            <TextBanner height="8vw" bgColor={ColorPalette.violet.light}>
                <p className={gstyles["banner-main-text-dark"]}>
                    Hello, {userDetails.first_name} {userDetails.last_name} !
                </p>
                <MarginBox margin="0.3vw" />
                <p className={gstyles["banner-sub-text-dark"]}>
                    Your Access Level : Internal Student
                </p>
            </TextBanner>
            {loadingData ? <Loading size="3vw" /> : <>{applications}</>}
        </MainContent>
    );
};

export default Dashboard;
