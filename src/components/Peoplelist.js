import React from "react";
import Card from "../components/card";

export default function Peoplelist(props) {
  return (
    <div className="App">
      <div className="main-content">
        {props.people.map((person, index) => {
          return <Card person={person} key={index} sendData={props.sendData} />;
        })}
      </div>
      -{/* -----------loading logo code----------- */}
      <div
        className="lds-facebook"
        ref={props.loadingDataRef}
        style={{
          display: props.loadingData ? "block" : "none",
        }}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      {/* -----------section ending----------- */}
      <div className="invinsible">invinsible div for loading</div>
    </div>
  );
}
