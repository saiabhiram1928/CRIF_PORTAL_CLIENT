import React from 'react';
import { Link } from "react-router-dom";
export default function NavBar(){
    return(
    <>
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top bg-body-tertiary">
        <img className = "navbar-img" src = {process.env.PUBLIC_URL + "/logo192.png"} />
        <a className="navbar-brand">CRIF</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                {/* <!-- change section href here--> */}
                    <a className="nav-link" href="#about">About Us</a> 
                </li>
                <li className="nav-item dropdown-center" >
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-hover="dropdown">Facilities</a>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li><a className="dropdown-item" href="#facilities">Liquid Chromatography-High Resolution Mass Spectrometry (LC-HRMS)</a></li>
                        <li><a className="dropdown-item" href="#facilities">X Band ESR Spectroscopy</a></li>
                        <li><a className="dropdown-item" href="#facilities">Inductively Coupled Plasma Optical-Emission spectroscopy</a></li>
                        <li><a className="dropdown-item" href="#facilities">UV-Vis NIR Spectrophotometer</a></li>
                        <li><a className="dropdown-item" href="#facilities">Flouresence Workstation</a></li>
                        <li><a className="dropdown-item" href="#facilities">Circular Dichroism-Optical Rotatory Dispersion (CD-ORD) Spectrometer</a></li>
                        <li><a className="dropdown-item" href="#facilities">Universal Testing Machine (UTM)</a></li>
                        <li><a className="dropdown-item" href="#facilities">Trinocular Polarizing Microscope</a></li>
                        <li><a className="dropdown-item" href="#facilities">NMR Spectroscopy</a></li>
                        <li><a className="dropdown-item" href="#facilities">Scanning Electron Microscope (SEM)</a></li>
                        <li><a className="dropdown-item" href="#facilities">X-Ray Diffraction (XRD)</a></li>
                        <li><a className="dropdown-item" href="#facilities">TGDTA</a></li>
                        <li><a className="dropdown-item" href="#facilities">Impedance Analyser</a></li>
                        <li><a className="dropdown-item" href="#facilities">Uv Spot Light Source</a></li>
                        <li><a className="dropdown-item" href="#facilities">Indfurr Furnace</a></li>
                        <li><a className="dropdown-item" href="#facilities">1800C Furnace</a></li>
                        <li><a className="dropdown-item" href="#facilities">1700C Furnace/1600C Furnace</a></li>
                        <li><a className="dropdown-item" href="#facilities">Electrochemical Workstation</a></li>
                        <li><a className="dropdown-item" href="#facilities">Vacuum Arc Melting</a></li>
                        <li><a className="dropdown-item" href="#facilities">Differential Scanning Calorimeter</a></li>
                    </ul>
                </li>
                <li className="nav-item">
                {/* <!-- change section href here--> */}
                    <a className="nav-link" href="#people">People</a> 
                </li>
                <li className="nav-item">
                {/* <!-- change section href here--> */}
                    <a className="nav-link" href="#contact">Contact Us</a> 
                </li>
                <li className="nav-item">
                {/* <!-- change section href here--> */}
                    <Link className = "nav-link" to = "/signin" replace>Book Now!</Link>
                </li>
            </ul>
        </div>
        </nav>
    </>
    );
}