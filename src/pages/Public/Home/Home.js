import React from 'react';
import NavBar from "./Components/NavBar";
import About from "./Components/About";
import Facilities from './Components/Facilities.js';
import People from "./Components/People"
import Contact from "./Components/Contact"
import "./Home.css";
import Conatct from './Components/Contact';

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <div className="except">
        <About/>
        <section id = "facilities">
          <hr align = "center"/>
          <h2>Facilities</h2>
          <Facilities />
          <People />
          <Contact />
        </section>
      </div>
      <footer>National Institute of Technology Warangal 2023</footer>
    </>
  );
}
