import Link from "next/link";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import Layout from "../../../components/layouts/layout";
import { Formik } from "formik";
import { toast } from "react-toastify";
import * as receiverService from "../../../services/receiver.service";
import {
  ReceiverForm,
  yupValidationSchema,
  yupValidationSchemaSociete,
} from "../../../components/pages/receiver/ReceiverForm";
import { useAuth } from "../../../context/auth/UseAuth";

const CreateReceiver: FunctionComponent<any> = (props) => {
  const closeModalButton: any = useRef();
  const [customer, setCustomer] = useState({
    id: 0,
  });

  const [typeValidation, setTypeValidation] = useState()
  const [isFilled, setIsFilled] = useState(false);


  useEffect(() => {
   
  }, [typeValidation, isFilled])

  const typeYupValidation = () => {
    if (typeValidation === "SOCIETE") {
      return yupValidationSchemaSociete;
    }
    if (typeValidation === "PARTICULIER") {
      return yupValidationSchema;
    }
    return yupValidationSchema;
  };

  const initReceiverForm = {
    isNPAI: false,
    lastName: "",
    firstName: "",
    companyName: "",
    phone: "",
    addressOne: "",
    addressTwo: "",
    zipCode: "",
    city: "",
    type: "",
    customerId: 0,
  };

  const closeModal = () => {
    closeModalButton.current.click();
  };

  const { user } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const [defaultSelectIsClient, setDefaultSelectIsClient] = useState({} as any);

  useEffect(() => {
    if (user.role?.name === "Client") {
      setIsClient(true);
      setIsFilled(true)
      setDefaultSelectIsClient(user.customers[0]);
      setCustomer({ ...customer, ["id"]: user.customers[0].id });
    }
  }, []);

  const createReceiver = async (data: any) => {
    await receiverService
      .postReceiver(data)
      .then((res: any) => {
        if (res.status === 201 || res.status === 200) {
          props.lastestCreatedReceiver(res.data);
          if (props.isFormCourse){
            props.setIdInputReceiver(res.data.id)
          }
          toast.success("Destinataire créé avec succès");
          closeModal();
        } else toast.error("Erreur lors de la création du destinataire");
      })
      .catch(() => {
        toast.error("Erreur lors de la création du destinataire");
      });
  };

  const checkIsParticular = async (receiver: any) => {
    if (receiver != null && receiver.companyName != null) {
      if (receiver.type === "PARTICULIER") {
        receiver.companyName = "";
      } else {
        receiver.companyName = receiver.companyName;
      }
    }
  };

  return (
    <div className={`modal fade`} id={props.id} tabIndex={-1}>
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="modal-header">
            <div className="pagetitlemodal">
              <h1>Création d'un nouveau destinataire</h1>
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
              <div className="card-body">
                <Formik
                  initialValues={initReceiverForm}
                  validationSchema={typeYupValidation}
                  enableReinitialize={true}
                  onSubmit={(values, { resetForm }) => {
                    if(isFilled){
                      console.log(values)
                      const receiver = values;
                      receiver.customerId = customer.id;
                      console.log(values)
                      checkIsParticular(receiver);
                      createReceiver(receiver);
                      resetForm();
                    }
                  }}
                >
                  <ReceiverForm 
                  setIsFilled={setIsFilled} 
                  isFilled={isFilled} 
                  setTypeValidation={setTypeValidation} 
                  customer={customer} 
                  setCustomer={setCustomer} 
                  isClient={isClient}
                  defaultSelectIsClient={defaultSelectIsClient}
                  isReloadCustomer={props.isReloadCustomer}
                  />
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReceiver;
