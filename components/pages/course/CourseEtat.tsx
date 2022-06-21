import React, { useEffect, useState } from "react";
import { getAllStatus } from "../../../services/status.service";

const CourseEtat = (props: any) => {
  const [allStatus, setAllStatus] = useState([{} as any]);

  useEffect(() => {
    // fetchAllStatus();
  }, [props.courseDetails]);

  const fetchAllStatus = () => {
    getAllStatus()
      .then((res) => {
        setAllStatus(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="ava-breadcrumb">
      <nav>
        <ol className="breadcrumb">
          <li
            className={`${
                 props.courseDetails.status?.name === "Brouillon" 
              || props.courseDetails.status?.name === "En attente" 
              || props.courseDetails.status?.name === "Livré"
              || props.courseDetails.status?.name === "NPAI"
              || props.courseDetails.status?.name === "La Poste"
                ? "completed"
                : ""
            }`}
          >
            <i className="bi bi-arrow-repeat"></i> <span>Brouillon</span>
          </li>
          <li
            className={`${
              props.courseDetails.status?.name === "En attente"
              || props.courseDetails.status?.name === "Livré"
              || props.courseDetails.status?.name === "NPAI"
              || props.courseDetails.status?.name === "La Poste"
                ? "completed"
                : ""
            }`}
          >
            <i className="bi bi-hourglass-split"></i> <span>En attente</span>
          </li>
          <li
            className={`${
              props.courseDetails.status?.name === "Livré" ? "completed" : ""
            }`}
          >
            <i className="bi bi-check-circle"></i> <span>Livré avec AR</span>
          </li>
          <li
            className={`${
              props.courseDetails.status?.name === "NPAI" ? "completed" : ""
            }`}
          >
            <i className="bi bi-exclamation-diamond"></i> <span>NPAI</span>
          </li>
          <li
            className={`${
              props.courseDetails.status?.name === "La Poste" ? "completed" : ""
            }`}
          >
            <i className="bi bi-mailbox"></i> <span>Transmis à la poste</span>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default CourseEtat;
