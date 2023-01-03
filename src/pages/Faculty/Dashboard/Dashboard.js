import React, { useState, useEffect, useCallback } from "react";
import gstyles from "../../../styles/Global.module.css";
import style from "./Dashboard.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PuffLoader from "react-spinners/PuffLoader";
import { toast } from "react-toastify";
import { useAuth } from "../../../components/Authenticate/AuthContext";

import MainContent from "../../../components/Wrapper/MainContent/MainContent";
import TextBanner from "../../../components/UIElements/TextBanner/TextBanner";
import ErrorToast from "../../../components/Alerts/Toast/ErrorToast";
import Loading from "../../../components/Navigation/Loading/Loading";
import MarginBox from "../../../components/Utility/MarginBox";
import GridCard from "../../../components/Grid/GridCard/GridCard";
import ColorPalette from "../../../styles/ColorPalette";

const MySwal = withReactContent(Swal);

const Dashboard = () => {
    const { userDetails } = useAuth();
    const [loadingData, setLoadingData] = useState(true);
    const [applications, setApplications] = useState([]);

    const getApplicationsData = useCallback(async () => {
        setLoadingData(true);
        await axios
            .get(
                process.env.REACT_APP_BACKEND_API_URL +
                    "/applications/getAllForFaculty",
                {
                    params: {
                        name:
                            userDetails.first_name +
                            " " +
                            userDetails.last_name,
                        status: "FACULTY REVIEW",
                    },
                }
            )
            .then(async (response) => {
                let applicationsRender = [];
                if (response.data.length > 0) {
                    for (var item of response.data) {
                        // ? Do something about this logic :
                        // TODO: Currently image is coming using statically served link from backend. Ultimate goal to preserve privacy is to send image as the stream of data to frontend. Convert that data to bit64 then serve it as an image.
                        let image;
                        let base64Image;
                        let path = `${process.env.REACT_APP_BACKEND_API_URL}/${item.email}/${item.application_id}`;
                        console.log("Original Path : ", path);
                        try {
                            image = await axios.post(
                                process.env.REACT_APP_BACKEND_API_URL +
                                    "/files/downloadPaymentSlip",
                                {
                                    params: {
                                        email: item.email,
                                        application_id: item.application_id,
                                    },
                                    responseType: "arraybuffer",
                                }
                            );
                            // ! This logic is not working
                            base64Image = btoa(
                                new Uint8Array(image.data).reduce(
                                    (data, byte) =>
                                        data + String.fromCharCode(byte),
                                    ""
                                )
                            );
                            // ? Using Static link generated from backend here
                            path = `${process.env.REACT_APP_BACKEND_API_URL}\\${image.data.filePath}`;
                            console.log("Mooded Path : ", path);
                        } catch (err) {
                            console.log(err);
                        }

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
                                    <div key="samplesRender">
                                        {samplesRender}
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <div
                                            className={style["normal-button"]}
                                            onClick={async () => {
                                                MySwal.fire({
                                                    width: "50%",
                                                    title: (
                                                        <img
                                                            src={path}
                                                            alt="Payment Slip"
                                                            width="50%"
                                                            height="100%"
                                                        />
                                                    ),
                                                    text: "Payment Slip",
                                                    showCancelButton: false,
                                                    confirmButtonText: "Done",
                                                    allowOutsideClick: false,
                                                    allowEscapeKey: false,
                                                    allowEnterKey: false,
                                                });
                                            }}
                                        >
                                            <p className={style["button-text"]}>
                                                VIEW PROOF OF PAYMENT
                                            </p>
                                        </div>
                                        <div
                                            className={style["reject-button"]}
                                            onClick={async () => {
                                                MySwal.fire({
                                                    width: "40%",
                                                    title: (
                                                        <p
                                                            className={
                                                                gstyles[
                                                                    "alert-title"
                                                                ]
                                                            }
                                                        >
                                                            Are You Sure ?
                                                        </p>
                                                    ),
                                                    text: "This Operation will Reject this Application",
                                                    showCancelButton: true,
                                                    confirmButtonText: "Reject",
                                                    allowOutsideClick: false,
                                                    allowEscapeKey: false,
                                                    allowEnterKey: false,
                                                }).then(async (result) => {
                                                    if (result.isConfirmed) {
                                                        MySwal.fire({
                                                            width: "40%",
                                                            title: (
                                                                <div
                                                                    className={
                                                                        gstyles[
                                                                            "alert-loader"
                                                                        ]
                                                                    }
                                                                >
                                                                    <PuffLoader
                                                                        color={
                                                                            ColorPalette
                                                                                .purple
                                                                                .primary
                                                                        }
                                                                        size="4vw"
                                                                    />
                                                                </div>
                                                            ),
                                                            text: "Rejecting Application",
                                                            showConfirmButton: false,
                                                            showCancelButton: false,
                                                            allowOutsideClick: false,
                                                            allowEscapeKey: false,
                                                            allowEnterKey: false,
                                                        });
                                                        await axios.get(
                                                            process.env
                                                                .REACT_APP_BACKEND_API_URL +
                                                                "/applications/rejectApplication",
                                                            {
                                                                params: {
                                                                    application_id:
                                                                        item.application_id,
                                                                },
                                                            }
                                                        );
                                                        await axios.get(
                                                            process.env
                                                                .REACT_APP_BACKEND_API_URL +
                                                                "/mailer/sendMail",
                                                            {
                                                                params: {
                                                                    email: item.email,
                                                                    subject:
                                                                        "CRIF APPLICATION REJECTED",
                                                                    message: `You application (id : ${item.application_id}) has been rejected`,
                                                                },
                                                            }
                                                        );
                                                        MySwal.close();
                                                        getApplicationsData();
                                                        MySwal.fire({
                                                            title: (
                                                                <p
                                                                    className={
                                                                        gstyles[
                                                                            "alert-title"
                                                                        ]
                                                                    }
                                                                >
                                                                    Application
                                                                    Rejected
                                                                    Successfully
                                                                </p>
                                                            ),
                                                        });
                                                    }
                                                });
                                            }}
                                        >
                                            <p className={style["button-text"]}>
                                                REJECT APPLICATION
                                            </p>
                                        </div>
                                        <div
                                            className={style["approve-button"]}
                                            onClick={async () => {
                                                MySwal.fire({
                                                    width: "40%",
                                                    title: (
                                                        <p
                                                            className={
                                                                gstyles[
                                                                    "alert-title"
                                                                ]
                                                            }
                                                        >
                                                            Are You Sure ?
                                                        </p>
                                                    ),
                                                    text: "This Operation will Approve this Application",
                                                    showCancelButton: true,
                                                    confirmButtonText:
                                                        "Approve",
                                                    allowOutsideClick: false,
                                                    allowEscapeKey: false,
                                                    allowEnterKey: false,
                                                }).then(async (result) => {
                                                    if (result.isConfirmed) {
                                                        MySwal.fire({
                                                            width: "40%",
                                                            title: (
                                                                <div
                                                                    className={
                                                                        gstyles[
                                                                            "alert-loader"
                                                                        ]
                                                                    }
                                                                >
                                                                    <PuffLoader
                                                                        color={
                                                                            ColorPalette
                                                                                .purple
                                                                                .primary
                                                                        }
                                                                        size="4vw"
                                                                    />
                                                                </div>
                                                            ),
                                                            text: "Approving Application",
                                                            showConfirmButton: false,
                                                            showCancelButton: false,
                                                            allowOutsideClick: false,
                                                            allowEscapeKey: false,
                                                            allowEnterKey: false,
                                                        });
                                                        await axios.get(
                                                            process.env
                                                                .REACT_APP_BACKEND_API_URL +
                                                                "/applications/facultyApproveApplication",
                                                            {
                                                                params: {
                                                                    application_id:
                                                                        item.application_id,
                                                                },
                                                            }
                                                        );
                                                        await axios.get(
                                                            process.env
                                                                .REACT_APP_BACKEND_API_URL +
                                                                "/mailer/sendMail",
                                                            {
                                                                params: {
                                                                    email: item.email,
                                                                    subject:
                                                                        "CRIF APPLICATION APPROVED BY FACULTY",
                                                                    message: `You application (id : ${item.application_id}) has been been forwarded to faculty in-charge`,
                                                                },
                                                            }
                                                        );
                                                        MySwal.close();
                                                        getApplicationsData();
                                                        MySwal.fire({
                                                            title: (
                                                                <p
                                                                    className={
                                                                        gstyles[
                                                                            "alert-title"
                                                                        ]
                                                                    }
                                                                >
                                                                    Application
                                                                    Approved
                                                                    Successfully
                                                                </p>
                                                            ),
                                                        });
                                                    }
                                                });
                                            }}
                                        >
                                            <p className={style["button-text"]}>
                                                APPROVE APPLICATION
                                            </p>
                                        </div>
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
                                        No Pending Applications
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
                toast.dark(
                    <ErrorToast
                        message={err.response.data.message || err.message}
                    />
                );
            });
    }, [userDetails]);

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
                    Your Access Level : Faculty
                </p>
            </TextBanner>
            {loadingData ? <Loading size="3vw" /> : <>{applications}</>}
        </MainContent>
    );
};

export default Dashboard;
