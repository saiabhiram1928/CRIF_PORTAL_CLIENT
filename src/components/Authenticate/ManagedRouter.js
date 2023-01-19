import React from "react";
import gstyles from "../../styles/Global.module.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../Authenticate/AuthContext";

// <-- Public -->
import SignIn from "../../pages/Public/SignIn/SignIn";
import SignUp from "../../pages/Public/SignUp/SignUp";
import ForgotPassword from "../../pages/Public/ForgotPassword/ForgotPassword";
import Home from "../../pages/Public/Home/Home";

// <-- General -->
import PageNotFound from "../../pages/Shared/PageNotFound";

// <-- Admin -->
import AdminDashboard from "../../pages/Admin/Dashboard/Dashboard";
import ManageEquipments from "../../pages/Admin/ManageEquipments/ManageEquipments";
import Applications from "../../pages/Admin/Applications/Applications";
import AdminFormat from "../../pages/Admin/Format";

// <-- Faculty -->
import FacultyDashboard from "../../pages/Faculty/Dashboard/Dashboard";
import InchargeDashboard from "../../pages/Faculty/Incharge/Incharge";
import FacultyFormat from "../../pages/Faculty/Format";

// <-- Student -->
import InternalStudentDashboard from "../../pages/InternalStudent/Dashboard/Dashboard";
import InternalStudentFormat from "../../pages/InternalStudent/Format";

// <-- Shared -->
import Equipments from "../../pages/Shared/Equipments";
import CDORD from "../../pages/Shared/CDORD";
import ESR from "../../pages/Shared/ESR";
import ICPOES from "../../pages/Shared/ICPOES";
import PL from "../../pages/Shared/PL";

const ManagedRouter = () => {
    const { userDetails, currentUser } = useAuth();
    return (
        <React.Fragment>
            <ToastContainer
                autoClose={4000}
                className={gstyles["toast-root-container"]}
            />

            {!currentUser && (
                <Switch>
                    <Route exact path="/home">
                      <Home />
                    </Route>
                    <Route exact path="/signin">
                      <SignIn />
                    </Route>
                
                    <Route exact path="/signup">
                      <SignUp />
                    </Route>
                
                    <Route exact path="/forgot-password">
                        <ForgotPassword />
                    </Route>
                    
                    <Route path="*">
                      <Redirect to="/home" />
                    </Route>

                </Switch>
            )}

            {currentUser && userDetails && userDetails.role === "admin" && (
                <AdminFormat>
                    <Switch>
                        <Route exact path="/">
                            <AdminDashboard />
                        </Route>

                        <Route exact path="/manage-equipments">
                            <ManageEquipments />
                        </Route>

                        <Route exact path="/applications">
                            <Applications />
                        </Route>

                        <Route path="*">
                            <PageNotFound />
                        </Route>
                    </Switch>
                </AdminFormat>
            )}

            {currentUser && userDetails && userDetails.role === "faculty" && (
                <FacultyFormat>
                    <Switch>
                        <Route exact path="/">
                            <FacultyDashboard />
                        </Route>

                        <Route exact path="/incharge">
                            <InchargeDashboard />
                        </Route>

                        <Route path="*">
                            <PageNotFound />
                        </Route>
                    </Switch>
                </FacultyFormat>
            )}

            {currentUser && userDetails && userDetails.role === "int_stu" && (
                <InternalStudentFormat>
                    <Switch>
                        <Route exact path="/">
                            <InternalStudentDashboard />
                        </Route>

                        <Route exact path="/equipments">
                            <Equipments />
                        </Route>

                        <Route exact path="/cd-ord">
                            <CDORD />
                        </Route>

                        <Route exact path="/esr">
                            <ESR />
                        </Route>

                        <Route exact path="/icp-oes">
                            <ICPOES />
                        </Route>

                        <Route exact path="/pl">
                            <PL />
                        </Route>

                        <Route path="*">
                            <PageNotFound />
                        </Route>
                    </Switch>
                </InternalStudentFormat>
            )}
        </React.Fragment>
    );
};

export default ManagedRouter;
