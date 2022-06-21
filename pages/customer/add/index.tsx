import Link from "next/link";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import { toast } from "react-toastify";
import * as customerService from "../../../services/customer.service";
import CustomerForm from "../../../components/pages/customer/CustomerForm";
import {
  yupValidationSchema,
  yupValidationSchemaParticulier
} from "../../../components/pages/customer/CustomerForm";

const CreateCustomer: FunctionComponent<any> = (props: any) => {
  const closeModalButton: any = useRef(null);
  const [typeValidation, setTypeValidation] = useState("PARTICULIER")
  
  useEffect(() => {
   
  }, [typeValidation])

  const typeYupValidation = () => {
    if (typeValidation === "SOCIETE") {
      return yupValidationSchema
    }
    if (typeValidation === "PARTICULIER") {
      return yupValidationSchemaParticulier
    }
    return yupValidationSchema
  }
  

  const initCustomerForm = {
    lastName: "",
    firstName: "",
    companyName: "",
    phone: "",
    addressOne: "",
    addressTwo: "",
    zipCode: "",
    city: "",
    type: "PARTICULIER",
    isActif: true,
    email: ""
  };

  const closeModal = () => {
    closeModalButton.current.click();
  };

  const createCustomer = async (data: any) => {
    customerService
      .createCustomer(data)
      .then((res: any) => {
        if (res.status === 201 || res.status === 200) {
          props.lastestCreatedCustomer(res.data);
          if (props.isFormCourse){
            props.setIdInputCustomer(res.data.id)
          }
          toast.success("Client créé avec succès");
          closeModal();
        } else {
          console.log(res);
          toast.error("Erreur lors de la création du client");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erreur lors de la création du client");
      });
  };

  

  return (
    <div className="modal fade" id={props.id}>
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="modal-header">
            <div className="pagetitlemodal">
              <h1>Créer un client</h1>
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
                  initialValues={initCustomerForm}
                  validationSchema={typeYupValidation}
                  enableReinitialize={true}
                  onSubmit={(values, { resetForm }) => {
                    const customer = values;
                    createCustomer(customer);
                    resetForm();
                  }}
                >
                  <CustomerForm setTypeValidation={setTypeValidation} customer={{}} />
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomer;
