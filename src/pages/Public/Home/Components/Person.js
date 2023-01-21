import React, { useEffect } from "react";
export default function Person(props){
    return (
        <>
    <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="card">
            <img src="" class="card-img-top" alt=""/>
            <div class="card-body">
              <h5 class="card-title ">{props.name}</h5>
              <p class="card-text ">{props.work}</p>
              <p class="card-text "><span> Mail : </span><a href={"mailto:"+props.mail}>{props.mail}</a></p>
            </div>
        </div>
    </div></>
    )
}