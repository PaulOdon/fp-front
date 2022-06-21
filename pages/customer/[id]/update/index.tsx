import Link from "next/link";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Formik } from "formik";
import { toast } from "react-toastify";
import * as customerService from "../../../../services/customer.service";
import CustomerForm from "../../../../components/pages/customer/CustomerForm";
import {
  yupValidationSchemaParticulier,
  yupValidationSchema,
} from "../../../../components/pages/customer/CustomerForm";

const UpdateCustomer: FunctionComponent<any> = (props: any) => {
  const router = useRouter();
  const customerId: any = router.query.id;
  const closeModalButton: any = useRef(null);
  const closeModal = () => {
    closeModalButton.current.click();
  };

  const [typeValidation, setTypeValidation] = useState(props.customer.type)

  useEffect(() => {
  }, [typeValidation])

  

  const initCustomerForm = {
    lastName: props.customer.lastName,
    firstName: props.customer.firstName,
    companyName: props.customer.companyName,
    phone: props.customer.phone,
    addressOne: props.customer.addressOne,
    addressTwo: props.customer.addressTwo,
    zipCode: props.customer.zipCode,
    city: props.customer.city,
    type: props.customer.type,
    isActif: props.customer.isActif,
    email: props.customer.email
  };

  const updateCustomer = async (data: any) => {
    customerService
      .updateCustomer(customerId, data)
      .then((res: any) => {
        if (res.status === 201 || res.status === 200) {
          props.updatedCustomer(res.data);
          toast.success("Information client modifié avec succès");
          closeModal();
        } else toast.error("Erreur lors de la modification du client");
      })
      .catch(() => {
        toast.error("Erreur lors de la modification du client");
      });
  };

  return (
    <div className="modal fade" id={props.id}>
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="modal-header">
            <div className="pagetitlemodal">
              <h1>Modifier un client</h1>
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
                  validationSchema={typeValidation === "PARTICULIER" ? yupValidationSchemaParticulier : yupValidationSchema}
                  enableReinitialize={true}
                  onSubmit={(values, { resetForm }) => {
                    const customer = values;
                    updateCustomer(customer);
                    resetForm();
                  }}
                >
                  <CustomerForm setTypeValidation={setTypeValidation}  customer={props.customer} />
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCustomer;
