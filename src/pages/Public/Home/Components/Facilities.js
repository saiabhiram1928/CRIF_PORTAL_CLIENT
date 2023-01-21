import React, { useEffect } from "react";
import {Link} from "react-router-dom";
export default function Facilities(){
    useEffect(()=>{
        let coll = document.getElementsByClassName("collapsible");
        let i;
  
        for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            let content = this.nextElementSibling;
            if (content.style.maxHeight){
            content.style.maxHeight = null;
            } else {
            content.style.maxHeight = content.scrollHeight + "px";
            } 
        });
        }

    },[])
    return (
        <>
            <div className="container">
                <div className="item"> 
                    {/* <!-- Liquid Chromatography-High Resolution Mass Spectrometry (LC-HRMS) --> */}
                    <div className="item">
                        <button className="collapsible">Liquid Chromatography-High Resolution Mass Spectrometry (LC-HRMS)</button>
                        <div className="content"><br/>
                            <img src="https://oldweb.nitw.ac.in/media/uploads/2022/03/04/img_5656.JPG" alt="Liquid Chromatography-High Resolution Mass Spectrometry (LC-HRMS).jpeg"/>
                            <p><strong>Make: </strong>Agilent Technologies</p>
                            <p><strong>Model: </strong> QTOF 6530</p>
                            <p><strong>Cost: </strong>1,22,87,540.00</p>
                            <p><strong>Applications: </strong>The molecular structure of petroleum components, industrial products, pharmaceuticals and biomolecules can be judged. The purity of the finished chemical industrial products is established.</p>
                            <p><strong>Specifications: </strong><br/>
                                <u>MASS Spectrometer</u>
                                <ul>
                                    <li>Mass Range m/z 100-20000 High mass range m/z 50-3200 High-resolution mode</li>
                                    <li>Sensitivity (1 pg. Reserpine signal noise ratio &gt;180:1)</li>
                                    <li>Mass Accuracy &lt;2ppm </li>
                                    <li>Resolution (FWHM) 20000</li>
                                    <li>Ionization Method: ESI & APCI
                                        <ul style={{listStyle: "none"}}>
                                            <li>1&#41; ESI positive & negative</li>
                                            <li>2&#41; APCI positive & negative</li>
                                        </ul>
                                    </li>
                                </ul>
                                <u>LC  SYSTEM</u>
                                <ul>
                                    <li>Pump:1290 infinity quaternary pump with 1200 bar maximum pressure</li>
                                    <li>Detector:1260 infinity Diode array detector(DAD)190-950nm&#41;</li>
                                    <li>Flow rate:0.001-5ml/min</li>
                                </ul>
                                <p><strong>Requisition Form: </strong><a href="https://oldweb.nitw.ac.in/media/uploads/2022/04/05/lc-hrms.pdf">User Requisition Form for LCHRMS</a></p>
                                <button className = "btn btn-lg item-btn"><Link to = "/signin" replace>Book Now!</Link></button>
                            </p>
                        </div>
                    </div>
                    
                    {/* <!-- X Band ESR Spectroscopy --> */}
                    <div className="item">
                        <button className="collapsible">X Band ESR Spectroscopy</button>
                        <div className="content"><br/>
                            <img src="https://oldweb.nitw.ac.in/media/uploads/2022/03/04/img_5662.JPG" alt="X Band ESR Spectroscopy.jpeg"/>
                            <p><strong>Make: </strong>JEOL RESONANCE Inc. Japan</p>
                            <p><strong>Model: </strong> JES-FA100</p>
                            <p><strong>Cost: </strong>97,19,783.00</p>
                            <p><strong>Applications: </strong>ESR Spectrometer is used for the measurement of species that contain unpaired electrons (Free radicals, transition metal complexes, molecular structure, valence electron wave functions, electron transport, crystal & ligand field splitting, relaxation mechanisms and reaction kinetics, odd-electron molecules, rare earth ions etc. ESR is a powerful non-destructive and non-intrusive analytical method. ESR yields meaningful structural information even from ongoing chemical or physical processes, without influencing the process itself.</p>
                            <p><strong>Specifications: </strong><br/>
                                <ul>
                                    <li>Standard Frequency X band)- 8.75-9.65 GHz</li>
                                    <li>Sensitivity - 7x109 spins/0.6mT</li>
                                    <li>Resolution – 3 μT or better-Temperature study - Variable Temperature facility (-153 to +25 °C)</li>
                                </ul><p><strong>Requisition Form: </strong><a href="https://oldweb.nitw.ac.in/media/uploads/2022/04/05/esr.pdf">User Requisition Form for X Band ESR Spectroscopy</a></p>
                                <button className = "btn btn-lg item-btn"><Link to = "/signin" replace>Book Now!</Link></button>
                            </p>
                        </div>
                    </div>
                    
                    {/* <!-- Inductively Coupled Plasma Optical-Emission spectroscopy --> */}
                    <div className="item">
                        <button className="collapsible">Inductively Coupled Plasma Optical-Emission spectroscopy</button>
                        <div className="content"><br/>
                            <img src="https://oldweb.nitw.ac.in/media/uploads/2022/03/04/img_5751.JPG" alt="Inductively Coupled Plasma Optical-Emission spectroscopy.jpeg"/>
                            <p><strong>Make: </strong>Agilent Technologies</p>
                            <p><strong>Model: </strong>700 series</p>
                            <p><strong>Cost: </strong>27,58,005.00</p>
                            <p><strong>Applications: </strong>This technique is used for quantitative and qualitative determination of the metals and metalloids in the following sample.
                                <ol>
                                    <li>Biological</li>
                                    <li>Environmental</li>
                                    <li>Pharmaceutical</li>
                                    <li>Industrial</li>
                                    <li>Aqueous and Organic</li>
                                </ol>
                            </p>
                            <p><strong>Specifications: </strong><br/>
                                <u>Plasma Generator</u>
                                <ul>
                                    <li>RF Generator: Solid-state generator with quick (&lt;1 hour) warm-up</li>
                                    <li>Frequency: 27.12 MHz or higher</li>
                                    <li>Power: Up to 1500 watts (computer-adjustable)</li>
                                    <li>Controls: Fully computer-controlled and software-driven</li>
                                    <li>Argon: Argon flow rates monitored</li>
                                    <li>Plasma Detection: Plasma should be radially viewed / or axially viewed/ or dually viewed (through protective screens)</li>
                                    <li>Chiller: Internal (by Peltier) or External along with equipment for RF coil cooling</li>
                                </ul>
                                <u>Optical System</u>
                                <ul>
                                    <li>Wavelength range: 170to 770 mm wider</li>
                                    <li>Focal length: more than 0.5 meters for holographic grating/More than 0.32 meter for Echelle grating</li>
                                    <li>Optical Resolution:
                                        <ul style={{listStyleType : "square"}}>
                                            <li>Better than 10 pm in the UV range (below 300 nm)</li>
                                            <li>Better than 17 pm in the visible range (above 350nm)</li>
                                            <li style={{listStyle : "none"}}>UV purge: Nitrogen/argon pure/gas sealed for 165 to 190nm please specify the gas consumption during the analytical flow (considering UV elements), standby and shutdown mode.</li>
                                        </ul>
                                    </li>
                                </ul>
                                <p><strong>Requisition Form: </strong><a href="https://oldweb.nitw.ac.in/media/uploads/2022/04/05/icpoes.pdf">User Requisition Form for ICP-OES</a></p>
                                <button className = "btn btn-lg item-btn"><Link to = "/signin" replace>Book Now!</Link></button>
                            </p>
                        </div>
                    </div>
                    
            
                    {/* <!-- UV-Vis NIR Spectrophotometer --> */}
                    <div className="item">
                        <button className="collapsible">UV-Vis NIR Spectrophotometer</button>
                        <div className="content"><br/>
                            <img src="https://oldweb.nitw.ac.in/media/uploads/2022/03/04/img_5649.JPG" alt="UV-Vis NIR Spectrophotometer.jpeg"/>
                            <p><strong>Make: </strong>Agilent Technologies</p>
                            <p><strong>Model: </strong>Carry 5000</p>
                            <p><strong>Cost: </strong>39,49,816.00</p>
                            <p><strong>Applications: </strong>The electronic transitions and band gaps of semiconductors, thin films, etc. can be determined. Electronic structures of polymers, complexes, biomolecules, materials, pharmaceuticals and other products can be evaluated.</p>
                            <p><strong>Specifications: </strong><br/>
                                <ul>
                                    <li>Photometric System: Double Beam, Double Monochromatic</li>
                                    <li>Wavelength Range: 3300 to 175 nm (+)</li>
                                    <li>Bandwidth: 0.01 and 0.04 nm (+)</li>
                                    <li>Resolution: 0.048 and 0.2 nm (+)</li>
                                </ul>
                                <p><strong>Requisition Form: </strong><a href="https://oldweb.nitw.ac.in/media/uploads/2022/04/05/uv-vis-nir.pdf">User Requisition Form for UV Vis NIR Spectrometer</a></p>
                                <button className = "btn btn-lg item-btn"><Link to = "/signin" replace>Book Now!</Link></button>
                            </p>
                        </div>
                    </div>
                    
            
                    {/* <!-- Flouresence Workstation --> */}
                    <div className="item">
                        <button className="collapsible">Flouresence Workstation</button>
                        <div className="content"><br/>
                            <img src="https://oldweb.nitw.ac.in/media/uploads/2022/03/04/img_5753.JPG" alt="Flouresence Workstation.jpeg"/>
                            <p><strong>Make: </strong>HORIBA INSTRUMENTS INCORPORATED, USA</p>
                            <p><strong>Model: </strong>FL-1000</p>
                            <p><strong>Cost: </strong>74,48,136.00</p>
                            <p><strong>Applications: </strong>Molecular and solid-state fluorescence emission can be monitored and quantum lifetime measurements can be evaluated. Materials in all states and biological samples can be investigated.</p>
                            <p><strong>Specifications: </strong><br/>
                                <ul>
                                    <li>Excitation & Emission Wavelength Range: 200nm – 1000nm</li>
                                    <li>Wavelength Accuracy: 0.5</li>
                                </ul>
                                <p><strong>Requisition Form: </strong><a href="https://oldweb.nitw.ac.in/media/uploads/2022/05/26/pl.pdf">User Requisition Form for Fluorescence</a></p>
                                <button className = "btn btn-lg item-btn"><Link to = "/signin" replace>Book Now!</Link></button>
                            </p>
                        </div>
                    </div>

                    {/* <!-- Circular Dichroism-Optical Rotatory Dispersion (CD-ORD) Spectrometer --> */}
                    <div className="item">
                        <button className="collapsible">Circular Dichroism-Optical Rotatory Dispersion (CD-ORD) Spectrometer</button>
                        <div className="content"><br/>
                            <img src="https://fsm.ethz.ch/facilities/jasco-j-815-circular-dichroism/_jcr_content/par/textimage/image.imageformat.lightbox.1224161116.jpg" alt="Circular Dichroism-Optical Rotatory Dispersion (CD-ORD) Spectrometer.jpeg"/>
                            <p><strong>Make: </strong>Biologic Science Instruments</p>
                            <p><strong>Model: </strong>MOS-500</p>
                            <p><strong>Cost: </strong>74,48,136.00</p>
                            <p><strong>Applications: </strong>Non-Linear optical materials, enantiomeric compounds, biochemical express themselves in CD and ORD. Any subtle change in their structural or molecular profile would be reflected in their CD spectra. Advanced research can be thought of.</p>
                            <p><strong>Specifications: </strong><p>
                                    ●	Wavelength Accuracy: 0.1<br/>
                                    ●	Wavelength resolution: 0.1 nm<br/>
                                    ●	Spectral Bandwidth : 0-16nm<br/>
                                    ●	Scan Speed : 0 to 10,000 nm/min<br/>
                                    ●	Slit Width : 0 to 400 μm<br/>
                                    ●	CD resolution: 0.0001 mdeg<br/>
                                    ●	Detector: PMT<br/></p>
                                    <p><strong>Requisition Form: </strong><a href="https://oldweb.nitw.ac.in/media/uploads/2022/04/05/cd-ord.pdf">User Requisition Form for CD-ORD</a></p>
                                
                                <button className = "btn btn-lg item-btn"><Link to = "/signin" replace>Book Now!</Link></button>
                            </p>
                        </div>
                    </div>
                    
                    {/* <!-- Universal Testing Machine (UTM) --> */}
                    <div className="item">
                        <button className="collapsible">Universal Testing Machine (UTM)</button>
                    <div className="content"><br/>
                        <img src="https://oldweb.nitw.ac.in/media/uploads/2022/03/04/img_5651.JPG" alt="Universal Testing Machine (UTM).jpeg"/>
                        <p><strong>Make: </strong>JINAN TESTING EQUIPMENT IE CORPORATION, China</p>
                        <p><strong>Model: </strong>WDW-100S</p>
                        <p><strong>Cost: </strong>61,93,158.00</p>
                        <p><strong>Applications: </strong>It can perform many standard tensile and compression tests on materials, components and structures. Physical and mechanical attributes of metals, alloys, finished solid products, etc., can be studied. Aforesaid tests can also be performed under sub-zero (-100C) and high-temperature (up to 1000C) conditions.</p>
                        <p><strong>Specifications: </strong><br/>
                            <ul>
                                <li>Maximum Load : ± 100kN</li>
                                <li>Temperature : -1000C to 3000C (chamber),3000C to 10000C (3-Zone split furnace)</li>
                                <li>Available extensometers: 25mm, Resolution=0.1μm (15% maximum strain),12.5mm. Resolution=0.1μm</li>
                                <li>Day Light: 1400 mm</li>
                                <li>Speed range: 0.0005 mm/min to 500mm/min</li>
                            </ul>
                            <p><strong>Requisition Form: </strong><a href="https://oldweb.nitw.ac.in/media/uploads/2022/04/05/utm.pdf">User Requisition Form for UTM</a></p>
                            <button className = "btn btn-lg item-btn"><Link to = "/signin" replace>Book Now!</Link></button>
                        </p>
                    </div>
                    </div>
                    
                    {/* <!-- Trinocular Polarizing Microscope --> */}
                    <div className="item">
                        <button className="collapsible">Trinocular Polarizing Microscope</button>
                    <div className="content"><br/>
                        <img src="https://oldweb.nitw.ac.in/media/uploads/2022/04/06/trainoc.jpg" alt="Trinocular Polarizing Microscope.jpeg"/>
                        <p><strong>Make: </strong>Olympus</p>
                        <p><strong>Model: </strong>BX53</p>
                        <p><strong>Cost: </strong>12,43,448.00</p>
                        <p><strong>Applications: </strong>Trinocular Polarizing Upright Research Microscope withInfinity corrected optical system. External power supply. Coaxialcoarse and fine focussing 1 micron, with torque adjustable focusstopper with built-in filter cassettes (NCB filter, Blue and otherconversion filters)</p>
                        <p><strong>Specifications: </strong><br/>
                            <ul>
                                <li>Transmitted Illumination:12v 100w halogen external with power supply 12v 100w lamp halogen lamp 12v 100w (2Nos).</li>
                                <li>Polarizer: Intermediate tube with 360deg rotatable polarizer for transmitted light fitted below the condenser with a swing in the swing-out facility.</li>
                                <li>Eye Piece tube: Three-way trinocular eyepiece tube 100/0,0/100,20/80 or 50/50 light distribution.</li>
                                <li>Eyepiece Type: 10*eyepiece with 22 mm or better field of view and dioptre adjustment on both eyepiece and one-piece with a crosshair.</li>
                            </ul>
                            <button className = "btn btn-lg item-btn"><Link to = "/signin" replace>Book Now!</Link></button>
                        </p>
                    </div>
                    </div>
                    
                    {/* <!-- NMR Spectroscopy --> */}
                    <div className="item">
                        <button className="collapsible">NMR Spectroscopy</button>
                    <div className="content"><br/>
                        <img src="https://oldweb.nitw.ac.in/media/uploads/2022/03/04/img_5659.JPG" alt="NMR Spectroscopy.jpeg"/>
                        <p><strong>Make: </strong>Bruker</p>
                        <p><strong>Model: </strong>Ascend 400 MHz</p>
                        <p><strong>Cost: </strong>1,85,00,00</p>
                        <p><strong>Applications: </strong>Molecular Structure Determination of
                            <ul>
                                <li>Condenser: Achromatic strain-free condenser N.A0.90with iris diaphragm. Compensator: Quartz wedge lambda tint plate and bedeck.</li>
                                <li>Reflected illuminated: Attached with halogen illumination lamp 100w halogen illuminated with external power supply incident light polarizer 360degrotatable analyser with filler Organic compounds, Pharmaceuticals and Drugs. Structure and atomic arrangements in molecules and crystals can be investigated. Kinetic and temperature studies of reaction mixtures.</li>
                                <li><strong>1D-NMR:</strong> 1H, 13C, 31P, 19F, DEPT-135, DEPT-90, DEPT-45,1D_NOESY,Water Suppression, VT Temperature</li>
                                <li><strong>2D-NMR:</strong>
                                    <ul style={{listStyle : "none"}}>
                                        <li><strong>*HOMO:</strong> NOESY, COSY, TOCSY</li>
                                        <li><strong>*HETERO:</strong> HSQC, HMBC</li>
                                    </ul>
                                </li>
                            </ul>
                        </p>
                        <p><strong>Specifications: </strong><br/>
                            <ul>
                                <li>UltraShield<sup>TM</sup> Plus 9.4T magnet</li>
                                <li>5 mm BBFOPLUS probe, optimized for X-nuclei direct observation. Broadband in a frequency range between 31P and 15N. This probe has 2H "lock" channel and z gradient that allows us to carry out 2D spectroscopy and hetero correlation 19F/1H and 1H/19F.</li>
                                <li>Control temperature unit (from -50 °C to 50 °C).</li>
                            </ul>
                            <p><strong>Requisition Form: </strong><a href="https://oldweb.nitw.ac.in/media/uploads/2022/04/05/crif-nmr-forms.pdf">User Requisition Form for NMR Spectroscopy</a></p>
                            <button className = "btn btn-lg item-btn"><Link to = "/signin" replace>Book Now!</Link></button>
                        </p>
                    </div>
                    </div>
                    
                    {/* <!-- Scanning Electron Microscope (SEM) --> */}
                    <div className="item">
                        <button className="collapsible">Scanning Electron Microscope (SEM)</button>
                        <div className="content"><br/>
                            <img src="https://oldweb.nitw.ac.in/media/uploads/2022/03/04/img_5748.JPG" alt="Scanning Electron Microscope (SEM).jpeg"/>
                            <p><strong>Make: </strong>TESCAN</p>
                            <p><strong>Model: </strong>VEGA3 LMU</p>
                            <p><strong>Cost: </strong>1,00,00,000</p>
                            <p><strong>Applications: </strong>Surface Studies, Nano Particle imaging, Phase transitions, Corrosion products and all kinds of solid material studies.</p>
                            <p><strong>Specifications: </strong><br/>
                                <ul>
                                    <li>Electron Gun: Tungsten heated cathode / optionally LaB6</li>
                                    <li> Resolution: 1 μm in the secondary electron mode at a working distance of 5 mm</li>
                                </ul>
                                <button className = "btn btn-lg item-btn"><Link to = "/signin" replace>Book Now!</Link></button>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="item">
                    {/* <!-- X-Ray Diffraction (XRD) --> */}
                    <div className="item">
                    <button className="collapsible">X-Ray Diffraction (XRD)</button>
                    <div className="content"><br/>
                    <img src="https://oldweb.nitw.ac.in/media/uploads/2022/03/04/img_5646_W3SUwES.JPG" alt="X-Ray Diffraction (XRD).jpeg"/>
                    <p><strong>Make: </strong>Panalytical</p>
                    <p><strong>Model: </strong>X-pert powder</p>
                    <p><strong>Cost: </strong>1,00,00,000</p>
                    <p><strong>Applications: </strong>Powder XRD equipment can be used for the characterization of powder samples for the phase analysis, Identifying crystalline phases and orientation and crystallographic information. This equipment can also capture data from the bulk polycrystalline samples after the required sample preparation. Structural properties such as Lattice parameters, Strain, Grain size, texture and epitaxy can be determined from the data. The XRD diffraction data will be provided to the user and the user can investigate the above materials' properties by analysing the data.</p>
                    <p><strong>Specifications: </strong><br/>
                        <ul>
                            <li>Source: Cu target X-Ray tube</li>
                            <li>X-Ray Power: 2KW</li>
                            <li>Operation Modes: Vertical & Horizontal</li>
                            <li>Accuracy: ±0.0025</li>
                            <li>2º θ Measurement range: 60 to130º</li>
                            <li>Diffractometer radius: 130 to 230 mm</li>
                            <li>Radiation: Cu Kα;</li>
                            <li>Software: X’perthighscore plus</li>
                        </ul>
                        <button className = "btn btn-lg item-btn"><Link to = "/signin" replace>Book Now!</Link></button>
                    </p>
                </div>
                </div>
            
         
         
                {/* <!-- TGDTA --> */}
                <div className="item">
                    <button className="collapsible">TGDTA</button>
                <div className="content"><br/>
                    <img src="https://oldweb.nitw.ac.in/media/uploads/2022/04/06/tgdta.jpg" alt="TGDTA.jpeg"/>
                    <p><strong>Make: </strong>Netzsch</p>
                    <p><strong>Model: </strong>Regulars STA 2500</p>
                    <p><strong>Cost: </strong>22,79,273.62</p>
                    <p><strong>Applications: </strong>High-performance analytical instruments by NETZSCH Analysing & Testing allow for comprehensive analysis of the thermal properties of a great variety of materials. Select the appropriate testing methods for your polymers and other organic materials, metals and alloys, ceramics, glass, building materials or other inorganic materials from among our various series of instruments.</p>
                    <p><strong>Specifications: </strong><br/>
                        <ul>
                            <li>Temp. range: RT to 1700oC</li>
                            <li>Heating Rate: 0.1o-100oC/min.</li>
                            <li>Weight:10mg to 40mg</li>
                            <li>Atmosphere: Argon, Nitrogen</li>
                            <li>Purge gas flow:50,</li>
                            <li>Protective gas flow: 20</li>
                            <li>Sample capacity(Max): 200mg</li>
                            <li>Pans:30micro litre</li>
                        </ul><p><strong>Requisition Form: </strong><a href="https://oldweb.nitw.ac.in/media/uploads/2022/05/11/tgdta.pdf">User Requisition Form for TGDTA</a></p>
                        <button className = "btn btn-lg item-btn"><Link to = "/signin" replace>Book Now!</Link></button>
                    </p>
                </div>
                </div>
            
                {/* <!-- Impedance Analyser --> */}
                <div className="item">
                    <button className="collapsible">Impedance Analyser</button>
                <div className="content"><br/>
                    <img src="https://oldweb.nitw.ac.in/media/uploads/2022/04/06/impedence.jpg" alt="Impedance Analyser.jpeg"/>
                    <p><strong>Make: </strong>Biologic</p>
                    <p><strong>Model: </strong>MTZ35</p>
                    <p><strong>Cost: </strong>31,81,094.45</p>
                    <p><strong>Applications: </strong>Impedance analysers are often used for characterization of many electrochemical devices, such as photovoltaic cells, fuel cells and batteries that are commonly utilized in renewable energy applications. Depending upon the specifications of these devices, they are quite expensive and their use in many low-cost applications is limited. This study demonstrates a practical impedance analyser application based on the cross-correlation method. Some techniques for extending the bandwidth of the analyser and smoothing out the frequency response are presented. The theoretical studies are verified on a digitally controlled boost converter that identifies a second-order impedance network</p>
                    <p><strong>Specifications: </strong><br/>
                        <ul>
                            <li>Temp:1100c</li>
                            <li>Frequency range:10-35MHz</li>
                            <li>Accuracy:0.05</li>
                            <li>Insulation material: Alumina Fibre</li>
                            <li>Heating System: Super Kanthal 1350°C wire built in a cement cylinder</li>
                            <li>Temperature Range: Ambient up to 1100°C</li>
                            <li>Temperature Controller: PM6 Walton PID controller</li>
                            <li>Temperature Sensors: K-Type Thermocouple</li>
                            <li>Temperature Control Accuracy: Better than +/-1°C</li>
                            <li>Temperature scan: adjustable (from 0.1 °C/min to 20 °C/min)</li>
                            <li>Safety Features: Emergency stop button; Buzzer sound alarm; Temperature safety limit</li>
                        </ul><p><strong>Requisition Form: </strong><a href="https://oldweb.nitw.ac.in/media/uploads/2022/04/05/impedence.pdf">User Requisition Form for Impendance Analyser</a></p>
                        <button className = "btn btn-lg item-btn"><Link to = "/signin" replace>Book Now!</Link></button>
                    </p>
                </div>
                </div>

                {/* <!-- UV Spot Light Source  --> */}
                <div className="item">
                    <button className="collapsible">UV Spot Light Source</button>
                <div className="content"><br/>
                    <img src="https://image.made-in-china.com/43f34j00wnSazYqlrLoN/Futansi-365nm-385nm-395nm-405nm-UV-LED-Curing-System-UV-LED-Spot-Curing-Light-Source.jpg" alt="UV Spot Light Source.jpeg"/>
                    <p><strong>Make: </strong>New age instruments</p>
                    <p><strong>Model: </strong>Lamp L9588-06A</p>
                    <p><strong>Applications: </strong>UV spotlight sources provide optimal conditions for UV adhesive curing, as well as UV-Vis sources for all types of applications, including R&D and small-lot production.

                        <br/>It is used in different applications 
                        <br/>1. Solar cells and Photovoltaic
                        <br/>2. Thin films
                        <br/>3. Adhesive bonding
                        <br/>Optical devices are comprised of a bundle of micron-sized optical fibre. Used as a lens to transmit light or an image with high efficiency and low distortion. Unlike a normal optical lens, no focusing distance is required. Ideal when designing and building compact optical devices.
                        </p>
                    <p><strong>Specifications: </strong><br/><p>
                        <br/> ● Radiant wavelength ranger: Refer to the selection guide.
                        <br/> ● Lamp for maintenance: Refer to the selection guide.
                        <br/> ● Lamp service life: Refer to the selection guide.
                        <br/> ● Uv intensity&#60;Typ&#61;A: 4500mw /cm2L 
                        <br/> ● Lamp replacement position : Rear.
                        <br/> ● Operating ambient temperature:+5oc-+35oc
                        <br/> ● Storage ambient temperature: -10oc to+70oc.
                        <br/> ● Power supply input: 100Vac to 240vac single phase 47Hz to 63 Hz 
                        <br/> ● Power consumption: 280VA
                        <br/> ● Operating and storage Humidity: Less than 80%.
                        <br/> ● Weight: 6.4kg
                        <br/> ● Protective glasses: Goggles to protect eyes from UV light.
                        <br/> ● Sensitive area: 1mm.
                        <br/> ● Calibrated Wavelength:365nm.
                        <br/> ● Optical power measurement range:0—1999Mw/CM2.            
                        <br/> ● Fibre guide for light source L9588-06A
                        <br/> ● Core material: Synthetic silica 
                        <br/> ● Output diameter: 5mm.
                        <br/> ● Furcate: Single.
                        <br/> ● Length:1m <br/>
                        </p>

                        <button className = "btn btn-lg item-btn"><Link to = "/signin" replace>Book Now!</Link></button>
                    </p>
                </div>
                </div>

                {/* <!-- Indfurr Furnace  --> */}
                <div className="item">
                    <button className="collapsible">Indfurr Furnace</button>
                <div className="content"><br/>
                    <img src="https://www.indfurr.com/yahoo_site_admin/assets/images/Control_System_for_High_Vacuum_Tubular_Furnace.33022615_std.jpg" alt="Indfurr Furnace.jpeg"/>
                    <p><strong>Make: </strong>Indfurr Furnace</p>
                    <p><strong>Specifications: </strong><br/><p>
                        <br/> ● Max Temp:1600
                        <br/> ● Working chamber: 100mm*100mmH*150mmD
                        <br/> ● Mode of Heating: 4Nos 90bend U shape molybdenum Di silicide element
                        <br/> ● Sensor: Pt, Rh,
                        <br/> ● Accuracy: About+/-2c <br/>

                        </p>

                        <button className = "btn btn-lg item-btn"><Link to = "/signin" replace>Book Now!</Link></button>
                    </p>
                </div>
                </div>
            
                {/* <!-- 18000C Furnace --> */}
                <div className="item">
                    <button className="collapsible">1800°C Furnace</button>
                <div className="content"><br/>
                    <img src="https://oldweb.nitw.ac.in/media/uploads/2022/04/06/impedence.jpg" alt="18000C Furnace.jpeg"/>
                    <p><strong>Make: </strong>Nabertherm</p>
                    <p><strong>Model: </strong>LTH02/16</p>
                    <p><strong>Cost: </strong>10,75,647.00</p>
                    <p><strong>Specifications: </strong><br/>
                        <ul>
                            <li>Max temp- 1800°C</li>
                            <li>Chamber dimentions:90*150*150mm</li>
                            <li>Chamber volume: 2lit</li>
                            <li>Power rating:3.0</li>
                            <li>Adjustable air inlet</li>
                            <li>Type B thermocouple</li>
                            <li>Max programs: 9 Steps</li>
                        </ul><p><strong>Requisition Form: </strong><a href="https://oldweb.nitw.ac.in/media/uploads/2022/05/11/furnace.pdf">User Requisition Form for Furnace</a></p>
                        <button className = "btn btn-lg item-btn"><Link to = "/signin" replace>Book Now!</Link></button>
                    </p>
                </div>
                </div>

                {/* <!-- 17000C Furnace/16000C Furnace --> */}
                <div className="item">
                    <button className="collapsible">1700°C Furnace/1600°C Furnace</button>
                    <div className="content"><br/>
                        <img src="https://oldweb.nitw.ac.in/media/uploads/2022/04/06/furnace-1600.jpg" alt="furnace-1600.jpeg"/><br/>
                        <img src="https://oldweb.nitw.ac.in/media/uploads/2022/04/06/furnace-1700.jpg" alt="furnace-1700.jpeg"/>
                        <p><strong>Make: </strong>OKAY</p>
                        <p><strong>Model: </strong>LTH02/16</p>
                        <p><strong>Specifications: </strong><br/>
                            <ul>
                                <li>Max temp:1700°C</li>
                                <li>Heating element: Mo, Disilicide,</li>
                                <li>Heating Space:150w*150 H*150mm</li>
                                <li>Segments:16</li>
                                <li>Condenser: Achromatic strain-free condenser N.A0.90with iris diaphragm.</li>
                                <li>Compensator: Quartz wedge lambda tint plate and bedeck.</li>
                            </ul><p><strong>Requisition Form: </strong><a href="https://oldweb.nitw.ac.in/media/uploads/2022/05/11/furnace.pdf">User Requisition Form for Furnace</a></p>
                            <button className = "btn btn-lg item-btn"><Link to = "/signin" replace>Book Now!</Link></button>
                        </p>
                    </div>
                </div>
            
                {/* <!-- Electrochemical Workstation --> */}
                <div className="item">
                    <button className="collapsible">Electrochemical Workstation</button>
                <div className="content"><br/>
                    <img src="https://oldweb.nitw.ac.in/media/uploads/2022/04/06/workstation.jpg" alt="Electrochemical Workstation.jpeg"/>
                    <p><strong>Make: </strong>ZAHNER</p>
                    <p><strong>Model: </strong>IM6e</p>
                    <p><strong>Cost: </strong>14,36,575.00</p>
                    <p><strong>Specifications: </strong><br/>
                        <ul>
                            <li>Frequency Range DC-1MHz</li>
                            <li>ADC/DAC resolution 16 bit</li>
                            <li>Shell Ground</li>
                            <li>Harmonic reject &gt;60dB@ 0.5 full scale</li>
                            <li>Dimensions 364 x 160 x376 mm * Weight 12 Kg</li>
                        </ul>
                        <button className = "btn btn-lg item-btn"><Link to = "/signin" replace>Book Now!</Link></button>
                    </p>
                </div>
                </div>
            
                {/* <!-- Vacuum Arc Melting --> */}
                <div className="item">
                    <button className="collapsible">Vacuum Arc Melting</button>
                <div className="content"><br/>
                    <img src="https://oldweb.nitw.ac.in/media/uploads/2022/04/06/arc-melting.jpg" alt="Vacuum Arc Melting.jpeg"/>
                    <p><strong>Make: </strong>VEC Solutions</p>
                    <p><strong>Cost: </strong>8,61,343.00</p>
                    <p><strong>Specifications: </strong><br/>
                        <ul>
                            <li>Fast response time</li>
                            <li>Covering range from 0.5mb to 10-3 mbar</li>
                            <li>Rugged construction of sensors</li>
                            <li>Single gauge head for entire measuring range</li>
                            <li>Metal G.H with standard KF-10 coupling</li>
                            <li>Measuring range: 0.5mbar 1x10-3mbar  </li>
                            <li>Mode: Analog</li>
                            <li>Tolerance (Accuracy):20 %</li>
                            <li>Power Supply : 230V Ac single phase 50 Hz</li>
                            <li>G.H. Connection: KF-10</li>
                            <li>Response Time: about 1 sec</li>
                            <li>Principle: Thermal Conductivity</li>
                            <li>Output: 0 to 100 mV DC at fsd used for controller</li>
                        </ul><p><strong>Requisition Form: </strong><a href="https://oldweb.nitw.ac.in/media/uploads/2022/04/05/varf.pdf">User Requisition Form for Vaccum Arc Re-Melting</a></p>
                        <button className = "btn btn-lg item-btn"><Link to = "/signin" replace>Book Now!</Link></button>
                    </p>
                </div>
                </div>
            
                {/* <!-- Differential Scanning Calorimeter --> */}
                <div className="item">
                    <button className="collapsible">Differential Scanning Calorimeter</button>
                    <div className="content"><br/>
                        <img src="https://oldweb.nitw.ac.in/media/uploads/2022/04/06/dsc.jpg" alt="Differential Scanning Calorimeter.jpeg"/>
                        <p><strong>Make: </strong>PerkinElmer</p>
                        <p><strong>Model: </strong>DSC8000</p>
                        <p><strong>Specifications: </strong><br/>
                            <ul>
                                <li>Range -180 C to 750 C</li>
                                <li>Accuracy ±0.05 C Using on-set temperatures of Indium melting peak</li>
                                <li>Precision ±0.008 C</li>
                                <li>Data points/sec 33</li>
                                <li>Controlled heating rates 0.01 to 300 C/min</li>
                                <li>Controlled cooling rates 0.01 to 150 C/min</li>
                                <li>Controlled Cooling Ambient coolant – nitrogen purge</li>
                            </ul>
                            <ul style={{listStyle : "none"}}>
                                <li>10 C/min to 22 C</li>
                                <li>20 C/min to 35 C</li>
                                <li>50 C/min to 70 C</li>
                                <li>100 C/min to 125 C</li>
                            </ul><p><strong>Requisition Form: </strong><a href="https://oldweb.nitw.ac.in/media/uploads/2022/05/11/dsc.pdf">User Requisition Form for DSC</a></p>
                            <button className = "btn btn-lg item-btn"><Link to = "/signin" replace>Book Now!</Link></button>
                        </p>
                    </div>
                </div>

                </div>
            </div>
        </>
    )
}