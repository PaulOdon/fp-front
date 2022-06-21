import Link from "next/link";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Layout from "../../../components/layouts/layout";
import * as customerService from "../../../services/customer.service";
import styles from "./Index.module.scss";
import UpdateCustomer from "./update";

const IndexPage: FunctionComponent = () => {
  const [customer, setCustomer] = useState({} as any);
  const router = useRouter();
  const customerId: any = router.query.id;
  const swal = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger mx-3",
      cancelButton: "btn btn-warning",
    },
    buttonsStyling: false,
  });

  const updatedCustomer = (customer: any) => {
    setCustomer(customer);
  };

  const getOneCustomer = () => {
    customerService.getOneCustomer(customerId).then((data) => {
      if (data) {
        setCustomer(data);
      } else {
        console.log("erreur ");
      }
    });
  };

  const confirmDelete = () =>
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
          deleteOneCustomer();
        } else {
          console.log("cancel delete customer");
        }
      });

  const deleteOneCustomer = () => {
    customerService.deteteOneCustomer(customerId).then((res: any) => {
      if (res) {
        toast.success("L'information du client a  été supprimé avec succès");
        router.push("/customer");
      } else {
        toast.error(
          "Erreur lors de la supperession de l'information du client"
        );
      }
    });
  };

  useEffect(() => {
    getOneCustomer();
  }, [router.query.id]);

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
                      <h2>{customer.companyName}</h2>
                      <h3>
                        {customer.lastName} {customer.firstName}
                      </h3>
                      <h4>{customer.type}</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="card-body">
                  <Link href="/customer">
                    <a className="btn ava-btn-normal btn-next">
                      <i className="bi bi-list"></i> Liste des clients
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
                                <span className="label">Téléphone : </span>
                                {customer.phone}
                              </div>
                              <div className="mt-2">
                                <span className="label">Adresse : </span>
                                {customer.addressOne}
                              </div>
                              <div className="mt-2">
                                <span className="label">Adresse 2 : </span>
                                {customer.addressTwo ? customer.addressTwo : ""}
                              </div>
                              <div className="mt-2">
                                <span className="label">Email : </span>
                                {customer.email ? customer.email : ""}
                              </div>
                              <div className="mt-2">
                                <span className="label">Code postale : </span>
                                {customer.zipCode}
                              </div>
                              <div className="mt-2">
                                <span className="label">Ville : </span>
                                {customer.city}
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

              {/* edit customer modal */}

              <UpdateCustomer
                id="basicModal"
                customer={customer}
                updatedCustomer={updatedCustomer}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;
