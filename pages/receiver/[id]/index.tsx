import Link from "next/link";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Layout from "../../../components/layouts/layout";
import * as receiverService from "../../../services/receiver.service";
import * as customerService from "../../../services/customer.service";
import styles from "./Index.module.scss";
import UpdateReceiver from "./update";
import Can from "../../../context/auth/Can";

const IndexPage: FunctionComponent = () => {
  const [receiverDetail, setReceiverDetail] = useState({} as any);
  const router = useRouter();
  const [receiverId, setReceiverId]: [any, any] = useState();
  const [customerId, setCustomerId] = useState();
  const [customer, setCustomer] = useState(null);
  const swal = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger mx-3",
      cancelButton: "btn btn-warning",
    },
    buttonsStyling: false,
  });

  const updatedReceiver = (receiver: any) => {
    setReceiverDetail(receiver);
  };

  const getCustomerById = async (id: any) => {
    const data = await customerService.getOneCustomer(id);
    setCustomer(data);
  };

  useEffect(() => {
    setReceiverId(router.query.id);
  }, [router.query]);

  const getOneReceiver = () => {
    receiverService.getOneReceiver(receiverId).then((data) => {
      if (data) {
        setReceiverDetail(data);
        setCustomerId(data.customerId);
      } else {
        console.log("Erreur ...");
      }
    });
  };

  const confirmDelete = () => {
    swal
      .fire({
        text: "Voulez-vous vraiment supprimer ?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Oui",
        cancelButtonText: "Annuler",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteOneReceiver();
        } else {
          console.log("Annulation");
        }
      });
  };

  const deleteOneReceiver = () => {
    receiverService
      .deleteOneReceiver(receiverId)
      .then((res: any) => {
        if (res) {
          toast.success(
            "L'information du destinataire a été supprimé avec succès"
          );
          router.push("/receiver");
        } else {
          toast.error(
            "Erreur lors de la suppression de l'information du destinataire"
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOneReceiver();
  }, [receiverId]);

  useEffect(() => {
    getCustomerById(customerId);
  }, [customerId]);

  return (
    <Layout>
      <div className="pagetitle">
        <h1></h1>
      </div>

      <section className="section profile">
        <div className="row">
          <div className="col-xxl-12 col-md-12">
            <div className="card info-card sales-card">
              <div className="row">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="profile-card">
                      <h2>{receiverDetail.companyName}</h2>
                      <h3>
                        {receiverDetail.lastName} {receiverDetail.firstName}
                        <Can permissions={["user:read"]}>
                          {" "}
                          (Destinataire de{" "}
                          <span style={{ borderBottom: "2px dotted #111" }}>
                            {" "}
                            {receiverDetail?.customer?.companyName}
                          </span>
                          )
                        </Can>
                      </h3>
                      <h4>{receiverDetail.type}</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="card-body">
                  <Link href="/receiver">
                    <a className="btn ava-btn-normal btn-next">
                      <i className="bi bi-list"></i> Liste des destinataires
                    </a>
                  </Link>
                  <button
                    className={`btn ava-btn-normal btn-next ml-5 ${styles.hoverwarning}`}
                    data-bs-toggle="modal"
                    data-bs-target="#basicModal"
                  >
                    <i className="bi bi-person-check-fill"></i> Modifier
                  </button>

                  <button
                    onClick={confirmDelete}
                    className={`btn ava-btn-normal btn-next  ml-5 ${styles.hoverdanger}`}
                  >
                    <i className="bi bi-trash"></i> Supprimer
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="d-flex align-items-center">
                  <div className="col-xl-8">
                    <div className="card-body pt-3">
                      <ul className="nav nav-tabs nav-tabs-bordered">
                        <li className="nav-item">
                          <button className="nav-link active">
                            Information générale
                          </button>
                        </li>
                      </ul>
                      <div className="tab-content pt-2">
                        <div
                          className="tab-pane fade show active profile-overview"
                          id="user-overview"
                        >
                          <div className="row">
                            <div className="col-12">
                              <div className="mt-2">
                                <span className="label">NPAI : </span>
                                {receiverDetail.isNPAI ? "Oui" : "Non"}
                              </div>
                              <div className="mt-2">
                                <span className="label">Téléphone : </span>
                                {receiverDetail.phone}
                              </div>
                              <div className="mt-2">
                                <span className="label">Adresse : </span>
                                {receiverDetail.addressOne}
                              </div>
                              <div className="mt-2">
                                <span className="label">Adresse 2 : </span>
                                {receiverDetail.addressTwo
                                  ? receiverDetail.addressTwo
                                  : ""}
                              </div>
                              <div className="mt-2">
                                <span className="label">Code postale : </span>
                                {receiverDetail.zipCode}
                              </div>
                              <div className="mt-2">
                                <span className="label">Ville : </span>
                                {receiverDetail.city}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade profile-edit pt-3"
                          id="user-other"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <UpdateReceiver
        id="basicModal"
        receiver={receiverDetail}
        updatedReceiver={updatedReceiver}
        defaultCustomer={customer}
      />
    </Layout>
  );
};

export default IndexPage;
