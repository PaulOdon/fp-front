import React, { useEffect } from "react";

const InfoEnlevement = (props: any) => {
  useEffect(() => {}, [props.mailDetails, props.courseDetails]);
  let adressTwo: any = props.mailDetails?.addressTwoSender;
  if (props.mailDetails?.addressTwoSender === "") {
    adressTwo = "";
  } else {
    adressTwo = " | " + props.mailDetails?.addressTwoSender;
  }
  return (
    <fieldset>
      <legend>Enlèvement</legend>
      {props.isClient ? (
        <>
          <div className="ava-post-item">
            <i className="bi bi-people-fill"></i>
            <label htmlFor="fcompany">
              {props.courseDetails?.userCreator?.firstName}{" "}
              {props.courseDetails?.userCreator?.lastName}
              <br />
              {props.courseDetails?.userCreator?.service === "null" ||
              props.courseDetails?.userCreator?.service === null
                ? ""
                : props.courseDetails?.userCreator?.service}
            </label>
          </div>
          <br />
          <div className="ava-post-item">
            <i className="bi bi-pin-map-fill"></i>
            <label htmlFor="fcompany">
              {props.mailDetails?.addressOnSender + adressTwo} <br />
              {props.mailDetails?.zipCodeSender}
              {" " + props.mailDetails?.citySender}
            </label>
          </div>
          <br />
          <div className="ava-post-item">
            <i className="bi bi-phone-fill"></i>
            <label htmlFor="fcompany">
              {props.courseDetails?.userCreator?.phone}
            </label>
          </div>
          <div className="ava-post-item">
            <i className="bi bi-at"></i>
            <label htmlFor="fcompany">
              {props.courseDetails?.userCreator?.email
                ? props.courseDetails?.userCreator?.email
                : ""}
            </label>
          </div>
          <div className="ava-post-item">
            <i className="bi bi-truck"></i>
            <label htmlFor="fcompany">
              {props.mailDetails?.companyNameSender}
            </label>
          </div>
        </>
      ) : (
        <>
          <div className="ava-post-item">
            <i className="bi bi-people-fill"></i>
            <label htmlFor="fcompany">
              {props.mailDetails.firstNameSender}{" "}
              {props.mailDetails.lastNameSender}
              <br />
              {props.mailDetails.serviceSender === "null" ||
              props.mailDetails.serviceSender === null
                ? ""
                : props.mailDetails.serviceSender}
            </label>
          </div>
          <br />
          <div className="ava-post-item">
            <i className="bi bi-pin-map-fill"></i>
            <label htmlFor="fcompany">
              {props.mailDetails?.addressOnSender + adressTwo} <br />
              {props.mailDetails?.zipCodeSender}
              {" " + props.mailDetails?.citySender}
            </label>
          </div>
          <br />
          <div className="ava-post-item">
            <i className="bi bi-phone-fill"></i>
            <label htmlFor="fcompany">{props.mailDetails.phoneSender}</label>
          </div>
          <div className="ava-post-item">
            <i className="bi bi-at"></i>
            <label htmlFor="fcompany">
              {props.courseDetails?.customer?.email}
            </label>
          </div>
          <div className="ava-post-item">
            <i className="bi bi-truck"></i>
            <label htmlFor="fcompany">
              {props.mailDetails?.companyNameSender}
            </label>
          </div>
        </>
      )}
    </fieldset>
  );
};

export default InfoEnlevement;
