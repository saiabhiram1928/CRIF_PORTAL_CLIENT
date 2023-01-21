import React, { useEffect } from "react";
import Person from "./Person";
export default function People(){
    return(
        <>
        <section id = "people">
        <hr align = "center"/>
        <h2>CRIF Team</h2>
        <div class="team">
        <div class="container container-fluid cardsare">
            <div class="row align-items-center">
              <Person name = "Prof. V Rajeshwara Rao" work = "Dean (Research & Consultancy), NITW" mail = "vrajesw@nitw.ac.in"/>
              <Person name = "Dr. T Krishna Sai" work = "Principal Scientific Officer, CRIF" mail = "pso_crif@nitw.ac.in"/>
              <Person name = "Shri. V Sudhakar" work = "Technical Officer, CRIF" mail = "techofficer_crif@nitw.ac.in"/>
              <Person name = "Shri. Harish Madupu" work = "Technical Officer, CRIF" mail = "techofficer_crif@nitw.ac.in"/>
            </div>
        </div></div>
    </section>
        </>
    )
}