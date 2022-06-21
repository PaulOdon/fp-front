import Link from "next/link";
import React, { FC, FunctionComponent, useEffect, useRef, useState } from "react";
import Layout from "../../../components/layouts/layout";
import SimpleForm from "../../../components/account/simpleForm/simpleForm";
import SocieteForm from "../../../components/account/societeForm/societeForm";

const AddCustomerModal = (props: any) => {

  const closeModalButton: any = useRef(null);
  const [isResetForm, setIsResetForm] = useState(false)

  const closeModal = () => {
    closeModalButton.current.click();
    setIsResetForm(!isResetForm)
  };
  
  return (
    <div className="modal-content">
    <div className="modal-header">
      <div className="pagetitlemodal">
        <h1>Création compte utilisateur</h1>
      </div>
      <button
        ref={closeModalButton}
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>
    <div className="modal-body">
      <div className="card custom-card">
        <div className="card-header">
          <div className="row">
            <div className="col-md-5">
              <button
                type="button"
                className="btn ava-btn-normal btn-next"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              >
                <i className="bi bi-list"></i> Liste des utilisateurs
              </button>
            </div>
            <div className="col-md-7">
             
            </div>
          </div>
        </div>
        <div className="card-body">
            <SocieteForm
              closeModal={closeModal}
              isResetForm={isResetForm}
              allUser={props.allUser}
              setAllUser={props.setAllUser}
            />
          {/* )} */}
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddCustomerModal;


