import React from "react";

const InfoGeneral = (props: any) => {
  return (
    <div
      className="tab-pane fade show active profile-overview"
      id="profile-overview"
    >
      <h5 className="card-title-profile">Details du profile </h5>

      <div className="row">
        <div className="col-lg-3 col-md-4 label ">Nom et prénoms</div>
        <div className="col-lg-9 col-md-8">
          {props.userInfo?.firstName} {props.userInfo?.lastName}
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">E-mail</div>
        <div className="col-lg-9 col-md-8">{props.userInfo?.email}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Addresse 1</div>
        <div className="col-lg-9 col-md-8">
          {props.userInfo?.customers[0]?.addressOne}
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Addresse 2</div>
        <div className="col-lg-9 col-md-8">
          {props.userInfo?.customers[0]?.addressTwo}
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Téléphone</div>
        <div className="col-lg-9 col-md-8">{props.userInfo?.phone}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Rôle</div>
        <div className="col-lg-9 col-md-8">{props.userInfo?.role.name}</div>
      </div>
    </div>
  );
};

export default InfoGeneral;
