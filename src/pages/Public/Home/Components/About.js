import React from 'react';

export default function NavBar(){
    return(
    <>
        <section id = "about">
        <div className = "main-img">
            <img src="https://oldweb.nitw.ac.in/media/uploads/2022/03/04/img20220303103559-copy.jpg" alt="" className = "main"/>
            <h1>CRIF</h1>
            <p>Central Research Instrumentation Facility</p>
        </div>
        <hr align = "center"/>
        <h2>About</h2>
        <p>Central Research Instrumentation Facility (CRIF) is an integrated facility to provide high-end analytical services to academic and industrial research. The CRIF works with a motto to bring out the research output of scholars matching the international standards. The central facility caters to the department requirements under one umbrella by fostering interdisciplinary research. Students from the different branches of science and engineering come here for research and experimentation, creating a vibrant cross-disciplinary atmosphere. The CRIF is committed to expanding to facilitate state-of-the-art laboratory services to all academia and industries located across the country.</p>
        </section>
    </>
    );
}