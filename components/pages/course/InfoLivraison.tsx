import React, { useEffect } from "react";

const InfoLivraison = (props: any) => {
  useEffect(() => {
    console.log();
  }, [props.mailDetails, props.courseDetails]);
  let adressTwo: any = props.mailDetails?.addressTwoReceiver;
  if (props.mailDetails?.addressTwoReceiver === "") {
    adressTwo = "";
  } else {
    adressTwo = " | " + props.mailDetails?.addressTwoReceiver;
  }
  return (
    <fieldset>
      <legend>Livraison</legend>
      <div className="ava-post-item">
        <i className="bi bi-people-fill"></i>
        <label htmlFor="fcompany">
          {props.mailDetails?.firstNameReceiver}{" "}
          {props.mailDetails?.lastNameReceiver}
          <br />
          {props.mailDetails?.serviceReceiver == "NULL"
            ? props.mailDetails?.serviceReceiver
            : ""}
        </label>
      </div>
      <br />
      <div className="ava-post-item">
        <i className="bi bi-pin-map-fill"></i>
        <label htmlFor="fcompany">
          {props.mailDetails?.addressOnReceiver + adressTwo} <br />
          {props.mailDetails?.zipCodeReceiver == "NULL"
            ? ""
            : props.mailDetails?.zipCodeReceiver}
          {" " + props.mailDetails?.cityReceiver}
        </label>
      </div>
      <br />
      <div className="ava-post-item">
        <i className="bi bi-phone-fill"></i>
        <label htmlFor="fcompany">{props.mailDetails?.phoneReceiver}</label>
      </div>
      <div className="ava-post-item">
        <i className="bi bi-truck"></i>
        <label htmlFor="fcompany">
          {props.mailDetails?.companyNameReceiver}
        </label>
      </div>
    </fieldset>
  );
};

export default InfoLivraison;
