import React, { useState, useEffect, useCallback } from "react";
import gstyles from "../../../styles/Global.module.css";
import style from "./Incharge.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PuffLoader from "react-spinners/PuffLoader";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../../../components/Authenticate/AuthContext";

import MainContent from "../../../components/Wrapper/MainContent/MainContent";
import TextBanner from "../../../components/UIElements/TextBanner/TextBanner";
import useIsMounted from "../../../functions/useIsMounted";
import ErrorToast from "../../../components/Alerts/Toast/ErrorToast";
import Loading from "../../../components/Navigation/Loading/Loading";
import MarginBox from "../../../components/Utility/MarginBox";
import GridCard from "../../../components/Grid/GridCard/GridCard";
import ColorPalette from "../../../styles/ColorPalette";
import { ClickAwayListener, ListItemSecondaryAction } from "@material-ui/core";
import { set } from "react-hook-form";
import { BsCheckLg } from "react-icons/bs";


const MySwal = withReactContent(Swal);

const Dashboard = () => {
    const { userDetails } = useAuth();
    const [loadingData, setLoadingData] = useState(true);
    const [isIncharge, setIsIncharge] = useState(false);
    const [applications, setApplications] = useState([]);
    const isMounted = useIsMounted();
    const handleUpload = async (e) => {
        const application_id = e.target.id;
        const student_mail = e.target.value;
        const file = await MySwal.fire({
            title: 'upload',
            input: 'file',
            inputAttributes: {
                'accept': 'image/* ,.pdf, .zip ',
                'aria-label': 'Upload the results'
            }
        })
        await MySwal.fire({
            title: 'Please check the file name and application id ?',
            text: `File name ${file.value.name} \n Application_id ${application_id}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Upload it!'
        }).then(async (result) => {
            if (file.value && result.isConfirmed) {
                const formData = new FormData();
                formData.append("file", file.value)
                console.log(file.value, application_id)
                await axios
                    .post(
                        process.env.REACT_APP_BACKEND_API_URL +
                        "/files/uploadResults",
                        formData,
                        {
                            params: { email: student_mail, application_id: application_id, folderName: "Results" },
                        }
                    ).then(async (res) => {
                        if (res.status === 200) {
                            MySwal.fire({
                                icon: 'success',
                                title: 'File is successfully uploaded',
                                text: "Results are sent to your mail",
                                showConfirmButton: false,
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                allowEnterKey: false,
                                timer: 4000
                            })
                            await axios.get(
                                process.env
                                    .REACT_APP_BACKEND_API_URL +
                                "/applications/inchargeUploadedResults",
                                {
                                    params: {
                                        application_id: application_id,
                                    },
                                }
                            );
                            const resofMail = await axios.get(
                                process.env
                                    .REACT_APP_BACKEND_API_URL +
                                "/mailer/sendResultsToMail",
                                {
                                    params: {
                                        email: student_mail,
                                        application_id: application_id,
                                        subject:
                                            "CRIF UPLOADED THE RESULTS",
                                        message: `Please Check the Attacments for Results \n Application : ${application_id} \n Account : ${student_mail} `,
                                    },
                                }
                            )
                            MySwal.close();
                            if (resofMail.status === 404) {
                                toast.dark(
                                    <ErrorToast
                                        message={res.response.data.message || res.message}
                                    />
                                )
                            } else {
                                toast.success(`Mail Sent Successfully to ${student_mail}`, {
                                    position: toast.POSITION.TOP_CENTER
                                })
                            }
                            getApplicationsData();

                        }
                    }).catch((err) => {
                        toast.dark(
                            <ErrorToast
                                message={err.response.data.message || err.message}
                            />
                        )
                    })
            } else if (!file.value) {
                await MySwal.fire({
                    icon: 'error',
                    title: 'Please upload the file!',
                    showCancelButton: false,
                    allowEscapeKey: false,
                })
            }
        })
    }


    useEffect(() => {
        const checkIfIncharge = async () => {
            await axios
                .get(
                    process.env.REACT_APP_BACKEND_API_URL +
                    "/equipments/checkIfIncharge",
                    {
                        params: { email: userDetails.email },
                    }
                )
                .then((response) => {
                    if (isMounted.current) {
                        if (response.data[0].count > 0) {
                            setIsIncharge(true);
                        }
                    }
                })
                .catch((err) => {
                    toast.dark(
                        <ErrorToast
                            message={err.response.data.message || err.message}
                        />
                    );
                });
        };
        checkIfIncharge();
    }, [isMounted]);

    const getApplicationsData = useCallback(async () => {

        setLoadingData(true);
        await axios
            .get(
                process.env.REACT_APP_BACKEND_API_URL +
                "/applications/getAllForIncharge",
                {
                    params: {
                        name:
                            userDetails.first_name +
                            " " +
                            userDetails.last_name,
                        status: "INCHARGE REVIEW",
                    },
                }
            )

            .then(async (response) => {


                let applicationsRender = [];
                // console.log(response);
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
                                        <button
                                            className={style["reject-button"]}
                                            id ={item.application_id}
                                            value={item.email}
                                            onClick={async (e) => {
                                                const application_id=e.target.id
                                                const email=e.target.value
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
                                                                       application_id,
                                                                },
                                                            }
                                                        );
                                                        await axios.get(
                                                            process.env
                                                                .REACT_APP_BACKEND_API_URL +
                                                            "/mailer/sendMail",
                                                            {
                                                                params: {
                                                                    email: email,
                                                                    subject:
                                                                        "CRIF APPLICATION REJECTED",
                                                                    message: `You application (id : ${application_id}) has been rejected`,
                                                                    // attachement :false 
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
                                                REJECT APPLICATION
                                            
                                        </button>
                                        {
                                            item.status === "INCHARGE REVIEW" ? (
                                                <button
                                                    className={style["approve-button"]}
                                                    value ={item.email}
                                                    id={item.application_id}
                                                    onClick={async (e) => {
                                                        const application_id =e.target.id
                                                        const email =e.target.value
                                                        console.log(application_id , email)
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
                                                                    "/applications/inchargeApproveApplication",
                                                                    {
                                                                        params: {
                                                                            application_id:
                                                                                application_id,
                                                                        },
                                                                    }
                                                                );
                                                                await axios.get(
                                                                    process.env
                                                                        .REACT_APP_BACKEND_API_URL +
                                                                    "/mailer/sendMail",
                                                                    {
                                                                        params: {
                                                                            email: email,
                                                                            subject:
                                                                                "CRIF APPLICATION APPROVED BY FACULTY INCHARGE",
                                                                            message: `Your application (id : ${application_id}) has been been forwarded to Admin`,
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

                                                     {item.application_id}

                                                </button>

                                            ) : (
                                                (<button className={style["approve-button"]} onClick={(e) => handleUpload(e)}
                                                 value={item.email} id={item.application_id} >

                                                        {item.email}

                                                </button>)
                                            )
                                        }
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
            {isIncharge ? (
                loadingData ? (
                    <Loading size="3vw" />
                ) : (
                    <>{applications}</>
                )
            ) : (
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
                                Only for Faculty In-Charges
                            </p>
                        </div>
                    </div>
                </GridCard>
            )}
        </MainContent>
    );
};

export default Dashboard;
