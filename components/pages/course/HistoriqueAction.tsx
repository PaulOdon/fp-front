import React, { useEffect, useState } from "react";
import { getHistoryByCourseId } from "../../../services/history.service";
import Moment from "react-moment";
import "moment-timezone";

const HistoriqueAction = (props: any) => {
  const [allHistorical, setAllHistorical] = useState([{} as any]);

  useEffect(() => {
    fetchAllHistorical();
  }, [props.courseId]);

  useEffect(() => {}, [allHistorical]);

  const fetchAllHistorical = () => {
    if (props.courseId) {
      getHistoryByCourseId(props.courseId)
        .then((res) => {
          setAllHistorical(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getFirstTextLog = (status: any) => {
    switch (status) {
      case "Brouillon":
        return "Course créée le";
        break;
      case "En attente":
        return "Enlèvement constaté le";
        break;
      case "Livré":
        return "Courrier remis en main propre le ";
        break;
      case "NPAI":
        return "Courrier NPAI,";
        break;
      case "La Poste":
        return "Courrier renvoyé à la poste";
        break;

      default:
        break;
    }
  };

  return (
    <div className="ava-filter mt-4">
      <div className="ava-separator">
        <span className="ava-separator-thread-date">
          {" "}
          Déroulement de la course{" "}
        </span>
      </div>
      {allHistorical?.map((history, index) => {
        return (
          <div className="ava-thread-message" key={index}>
            <i className="bi bi-info-circle"></i>
            <span></span> {getFirstTextLog(history.status)}{" "}
            <span>
              <Moment format="DD/MM/YYYY HH:mm">{history.date}</Moment>
            </span>{" "}
            par{" "}
            <span>
              {history.firstName} {history.lastName}
            </span>{" "}
            ({history.role})
          </div>
        );
      })}
    </div>
  );
};

export default HistoriqueAction;
