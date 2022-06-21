import Link from "next/link";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Formik } from "formik";
import { toast } from "react-toastify";
import Layout from "../../../../components/layouts/layout";
import * as receiverService from "../../../../services/receiver.service";
import {
  ReceiverForm,
  yupValidationSchema,
  yupValidationSchemaSociete
} from "../../../../components/pages/receiver/ReceiverForm";

const UpdateReceiver: FunctionComponent<any> = (props) => {
  const router = useRouter();
  const receiverId: any = router.query.id;
  const closeModalButton: any = useRef(null);
  const [customer, setCustomer] = useState({
    id: props.receiver.customerId,
  });

  const closeModal = () => {
    closeModalButton.current.click();
  };

  const [typeValidation, setTypeValidation] = useState(props.receiver.type)

  useEffect(() => {
  }, [typeValidation])

  const initForm = {
    lastName: props.receiver.lastName,
    firstName: props.receiver.firstName,
    companyName: props.receiver.companyName,
    phone: props.receiver.phone,
    addressOne: props.receiver.addressOne,
    addressTwo: props.receiver.addressTwo,
    zipCode: props.receiver.zipCode,
    city: props.receiver.city,
    type: props.receiver.type,
    isNPAI: props.receiver.isNPAI,
    customerId: props.receiver.customerId,
  };

  const updateReceiver = async (data: any) => {
    receiverService
      .putReceiver(receiverId, data)
      .then((res: any) => {
        if (res.status === 201 || res.status === 200) {
          props.updatedReceiver(res.data);
          toast.success("Information destinataire modifiée avec succès");
          closeModal();
        } else toast.error("Erreur lors de la modification du destinataire");
      })
      .catch(() => {
        toast.error("Erreur lors de la modification du destinataire");
      });
    router.push(`/receiver/${router.query.id}`);
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
              <h1>Modifier un destinataire</h1>
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
                  initialValues={initForm}
                  validationSchema={typeValidation === "SOCIETE" ? yupValidationSchemaSociete : yupValidationSchema}
                  enableReinitialize={true}
                  onSubmit={(values, { resetForm }) => {
                    const receiver = values;
                    receiver.customerId = Number(receiver.customerId);
                    checkIsParticular(receiver);
                    updateReceiver(receiver);
                    resetForm();
                  }}
                >
                  <ReceiverForm
                    isFilled={true}
                    receiver={props.receiver}
                    setTypeValidation={setTypeValidation}
                    customer={customer}
                    isEdit={true}
                    setCustomer={setCustomer}
                    defaultCustomer={props.defaultCustomer}
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

export default UpdateReceiver;
