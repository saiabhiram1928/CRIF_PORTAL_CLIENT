import React, { useState, useEffect } from 'react'
import { useAuth } from '../Authenticate/AuthContext';
import TextBanner from "../UIElements/TextBanner/TextBanner";
import ColorPalette from "../../styles/ColorPalette"
import gstyles from "../../styles/Global.module.css";
import MarginBox from "../Utility/MarginBox";
import MainContent from '../Wrapper/MainContent/MainContent';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from 'axios';
import Loading from '../Navigation/Loading/Loading';
import { BsCheckLg } from 'react-icons/bs';
import style from '../../pages/Faculty/Incharge/Incharge.module.css';
import ErrorToast from '../Alerts/Toast/ErrorToast'
import { toast,ToastContainer } from "react-toastify"


const handleDownload=async (e , item)=>{
    console.log(item)
    await axios.post(
        process.env.REACT_APP_BACKEND_API_URL +
            "/files/getFilePath",
        {
            params: {
                email: item.email,
                application_id: item.application_id,
                type : "Results"
            },
            responseType: "arraybuffer",
        }
    ).then(async (response) => {
        const aTag= document.createElement('a')
        let filePath = response.data.filePath;
        filePath = filePath.replace("public/" ,"")
        const url =`http://localhost:8050/${filePath}`
        aTag.href= url
        aTag.target="_blank"
        aTag.setAttribute('download' , filePath)
        document.body.appendChild(aTag)
        aTag.click()
        aTag.remove()
    }).catch((err) =>{
        toast.dark(
            <ErrorToast
                message={err.response.data.message || err.message}
            />
        );
    })
}



const Card = ({ item }) => {
    return (
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
                className={style["approve-button"]} 
                 style={{ 
                    margin : "10px auto"
                   }} onClick= {(e)=> handleDownload(e , item)} value = {item.email}  id={item.application_id}>
                    <p className={style["button-text"]} >Download</p>
                </div>
            </div>
            </div>
            )
}




const Superuser = () => {

    const { userDetails } = useAuth();
    const [loading, setLoading] = useState(true)
    const [Application, setApplication] = useState([])
    useEffect(() => {
        getApplicationsData();
    }, [])
    const getApplicationsData = async () => {
        const apiEndpoint= userDetails.role ==='admin' ? "getResultsForAdmin" : "getResultsForSuperUsers"
        setLoading(true)
        await axios.get(
            process.env.REACT_APP_BACKEND_API_URL +
            `/applications/${apiEndpoint}`,
            {
                params: {
                    name:
                        userDetails.first_name +
                        " " +
                        userDetails.last_name,
                    status: "RESULTS UPLOADED",
                },
            }
        ).then(async (response) => {
            console.log(response);
            setApplication(response)
            setLoading(false)
        }).catch((err) => {
            toast.dark(
                <ErrorToast
                    message={err.response.data.message || err.message}
                />
            );
        })
    }
  
    

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
                    {
                        loading ? (<Loading size="3vw" />) : (
                            Application.data.map((Application) => {
                                return <Card item={Application} />
                            })
                        )
                    }

                </MainContent>
                )
}

 export default Superuser