import React, { useRef } from "react";
import Layout from "../../../components/layouts/layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  addCustomerInUser,
  getUserById,
  patchUserById,
  deleteUserById,
} from "../../../services/user.service";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  fetchCustomers,
  getCustomerByName,
} from "../../../services/customer.service";
import styles from "./Index.module.scss";
import { toast } from "react-toastify";
import AutoCompletionCompany from "../../../components/account/Inputs/AutoCompletionCompany";
import ServiceInput from "../../../components/account/Inputs/ServiceInput";
import StatusCompteCheckbox from "../../../components/account/Inputs/StatusCompteCheckbox";
import RoleSelect from "../../../components/account/Inputs/RoleSelect";
import EmailInput from "../../../components/account/Inputs/EmailInput";
import FirstNameInput from "../../../components/account/Inputs/FirstNameInput";
import LastNameInput from "../../../components/account/Inputs/LastNameInput";
import PhoneInput from "../../../components/account/Inputs/PhoneInput";
import Swal from "sweetalert2";
import { getAllCourseByCustomerId } from "../../../services/course.service";

const Details = (id: any) => {
  const [userDetails, setUserDetails] = useState({} as any);
  const [isEdit, setIsEdit] = useState(false);
  const formikRef = useRef({} as any);
  const router = useRouter();

  const [allCustomer, setAllCustomer] = useState([]);
  const [firstNameCompany, setFirstNameCompany] = useState("");
  const [customerSelected, setCustomerSelected] = useState({} as any);
  const [pwdGenerate, setPwdGenerate] = useState("");
  const [pwdValue, setPwdValue] = useState("");
  const [pwdConfirmValue, setPwdComfirmValue] = useState("");
  const [mdpIsEqual, setMdpIsEqual] = useState(false);
  const [submitSuccess, setSubmiSucces] = useState(false);
  const [checked, setChecked] = useState(false);
  const [companyExist, setCompanyExist] = useState(false);
  const [roleId, setRoleId] = useState("0");
  
  const [isDeleteUser, setIsDeleteUser] = useState(true)

  const closeModalButton: any = useRef(null);

  const [typeRoles, setTypeRoles] = useState({
    admin: false,
    coursier: false,
    client: false,
  });

  const closeModal = () => {
    closeModalButton.current.click();
  };

  useEffect(() => {}, [pwdGenerate, mdpIsEqual, pwdValue, pwdConfirmValue]);

  useEffect(() => {}, [submitSuccess, checked, typeRoles, roleId]);

  useEffect(() => {
    getAllCustomers();
  }, []);

  useEffect(() => {}, [customerSelected, roleId]);

  const getAllCustomers = () => {
    fetchCustomers()
      .then((res) => {
        setAllCustomer(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const userId = parseInt(id.id);
    if (userId != null) {
      getUserById(userId)
        .then((res) => {
          setUserDetails(res);
          setCustomerSelected(res?.customers[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (userDetails.customers?.length > 0) {
      console.log(userDetails.customers[0].id)
      const customerId = userDetails.customers[0].id
      countNomberOfMail(customerId)
    }
  }, [userDetails]);

  useEffect(() => {
  
  }, [isDeleteUser])
  

  const clickEditUser = () => {
    const fields = [
      "isActif",
      "roleId",
      "email",
      "firstName",
      "lastName",
      "phone",
      "service",
    ];

    fields.forEach((field) => {
      formikRef.current.setFieldValue(
        field,
        typeof userDetails[field] === "undefined" ? "null" : userDetails[field],
        false
      );
    });

    console.log(userDetails)
    if (userDetails.customers?.length > 0) {
      setCompanyExist(true);
    }
    if (isEdit) {
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  };

  const deleteUser = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-danger mx-3",
        cancelButton: "btn btn-warning",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        text: (isDeleteUser) ? "Voulez-vous vraiment supprimer ?"  : "L'utilisateur ne peut plus être supprimé car  il est lié à une demande",
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: isDeleteUser,
        confirmButtonText: "Oui",
        cancelButtonText: "Annuler",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteUserById(userDetails.id)
            .then((res) => {
              toast.success("Le compte a ete supprimer avec success");
              router.push("/account");
            })
            .catch((error) => {
              console.log(error);
              toast.error(error.response?.data.message);
            });
        }
      });
  };

  const validationClient = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Champs Obligatoire"),
    service: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Champs Obligatoire"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Champs Obligatoire"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Champs Obligatoire"),
    phone: Yup.string().max(15, "Max 15").required("Champs Obligatoire"),
  });

  const validationAdminCoursier = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Champs Obligatoire"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Champs Obligatoire"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Champs Obligatoire"),
    phone: Yup.string().max(15, "Max 15").required("Champs Obligatoire"),
  });

  const countNomberOfMail = (id: any) =>{
    getAllCourseByCustomerId(id)
    .then((res) =>{
      if (res.length) {
        setIsDeleteUser(false)
      }
    // console.log(res.length)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <Layout>
      <div className="pagetitle">
        <h1>Details de l'utilisateur</h1>
      </div>

      <section className="section profile">
        <div className="row">
          <div className="col-xxl-12 col-md-12">
            <div className="card info-card sales-card">
              <div className="row">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="profile-card">
                      <img
                        src="/static/images/profile-img.png"
                        alt="Profile"
                        className="rounded-circle"
                      />
                    </div>
                    <div>
                      <h2>{userDetails?.firstName} {userDetails?.lastName}</h2>
                      <h3>{userDetails?.role?.name}</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="card-body">
                  <Link href="/account">
                    <a className="btn ava-btn-normal btn-next">
                      <i className="bi bi-list"></i> Liste des utilisateurs
                    </a>
                  </Link>
                  <button
                    className={`btn ava-btn-normal btn-next  ml-5 ${styles.hoverwarning}`}
                    data-bs-toggle="modal"
                    data-bs-target="#basicModal"
                    onClick={() => {
                      clickEditUser();
                    }}
                  >
                    <i className="bi bi-pencil-square"></i> Modifier utilisateur
                  </button>
                  <button
                    className={`btn ava-btn-normal btn-next  ml-5 ${styles.hoverdanger}`}
                    onClick={() => {
                      deleteUser();
                    }}
                  >
                    <i className="bi bi-trash"></i> Supprimer utilisateur
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="col-xl-8">
                      <div className="card-body pt-3">
                        <ul className="nav nav-tabs nav-tabs-bordered">
                          <li className="nav-item">
                            <button
                              className="nav-link active"
                              data-bs-toggle="tab"
                              data-bs-target="#user-overview"
                            >
                              Information générale
                            </button>
                          </li>

                          <li className="nav-item">
                            <button
                              className="nav-link"
                              data-bs-toggle="tab"
                              data-bs-target="#user-other"
                            ></button>
                          </li>
                        </ul>

                        <div className="tab-content pt-2">
                          <div
                            className="tab-pane fade show active profile-overview"
                            id="user-overview"
                          >
                            <div className="row">
                              <div className="col-md-6">
                                <div className="mt-2">
                                  <span className="label">Nom :</span>{" "}
                                  <span>{userDetails?.firstName}</span>
                                </div>
                                <div className="mt-2">
                                  <span className="label">Prénom :</span>{" "}
                                  <span>{userDetails?.lastName}</span>
                                </div>
                                <div className="mt-2">
                                  <span className="label">Email :</span>{" "}
                                  <span>{userDetails?.email}</span>
                                </div>
                                <div className="mt-2">
                                  <span className="label">Telephone :</span>{" "}
                                  <span>{userDetails?.phone}</span>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="mt-2">
                                  <span className="label ">Status :</span>
                                  {userDetails?.isActif ? (
                                    <span className="badge bg-primary mx-2">
                                      Activé
                                    </span>
                                  ) : (
                                    <span className="badge bg-danger mx-2">
                                      Desactivé
                                    </span>
                                  )}
                                  <span>{}</span>
                                </div>
                                <div className="mt-2">
                                  <span className="label">Société</span>
                                  {userDetails?.customers?.[0]?.companyName
                                    .length > 0 ? (
                                    <span className="mx-2">
                                      {" "}
                                      {userDetails?.customers?.[0]?.companyName}
                                    </span>
                                  ) : (
                                    <span className="badge text-dark bg-light mx-2">
                                      Aucun
                                    </span>
                                  )}
                                </div>
                                <div className="mt-2">
                                  <span className="label">Service :</span>{" "}
                                  <span>
                                    {userDetails?.service != "null" ||
                                    userDetails?.service.length > 0 ? (
                                      userDetails?.service
                                    ) : (
                                      <span className="badge text-dark bg-light mx-2">
                                        Aucun
                                      </span>
                                    )}
                                  </span>
                                </div>
                                <div className="mt-2">
                                  <span className="label">Role :</span>{" "}
                                  <span>{userDetails?.role?.name}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal fade" id="basicModal">
                <div className="modal-dialog modal-fullscreen">
                  <div className="modal-content">
                    <div className="modal-header">
                      <div className="pagetitlemodal">
                        <h1>Modification compte utilisateur</h1>
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
                            innerRef={formikRef}
                            initialValues={{
                              isActif: false,
                              roleId: "",
                              email: "",
                              firstName: "",
                              lastName: "",
                              phone: "",
                              service: "",
                            }}
                            validationSchema={
                              typeRoles.client
                                ? validationClient
                                : validationAdminCoursier
                            }
                            onSubmit={(values) => {
                              if (
                                typeRoles.admin ||
                                typeRoles.client ||
                                typeRoles.coursier
                              ) {
                                if (
                                  typeRoles.client &&
                                  !typeRoles.admin &&
                                  !typeRoles.coursier
                                ) {
                                  let newAccount = {
                                    firstName: values.firstName,
                                    lastName: values.lastName,
                                    email: values.email,
                                    phone: values.phone,
                                    service: values.service,
                                    isActif: values.isActif,
                                    roleId: userDetails.roleId,
                                  };

                                  let customerList = {};
                                  let userId = parseInt(id.id);

                                  if (customerSelected) {
                                    customerList = {
                                      customerList: [
                                        {
                                          id: parseInt(customerSelected.id),
                                        },
                                      ],
                                    };
                                  }

                                  // console.log(customerList)
                                  // console.log(newAccount)

                                  if (Object.keys(customerList).length > 0) {
                                    setTimeout(() => {
                                      addCustomerInUser(userId, customerList)
                                        .then((response) => {
                                          setUserDetails(response?.data);
                                          if (submitSuccess) {
                                            setSubmiSucces(false);
                                          }
                                        })
                                        .catch((error) => {
                                          console.log(error);
                                          toast.error(
                                            error.response?.data.message
                                          );
                                        });
                                    }, 1000);
                                  }

                                  patchUserById(id.id, newAccount)
                                    .then((res) => {
                                      toast.success(
                                        "Le compte a ete modfier avec success"
                                      );
                                      // setUserDetails(res);
                                      closeModal();
                                    })
                                    .catch((error) => {
                                      toast.error(error.response?.data.message);
                                    });
                                } else {
                                  let newAccount = {
                                    firstName: values.firstName,
                                    lastName: values.lastName,
                                    email: values.email,
                                    phone: values.phone,
                                    service: values.service,
                                    isActif: values.isActif,
                                    roleId: userDetails.roleId,
                                  };

                                  // console.log(newAccount)
                                  patchUserById(id.id, newAccount)
                                    .then((res) => {
                                      toast.success(
                                        "Le compte a ete modfier avec success"
                                      );
                                      setUserDetails(res);
                                      closeModal();
                                    })
                                    .catch((error) => {
                                      toast.error(error.response?.data.message);
                                    });
                                }
                              }
                            }}
                          >
                            <Form>
                              <div className="row mt-3">
                                <div className="col-md-4">
                                  <div>
                                    <StatusCompteCheckbox />
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <RoleSelect
                                    setTypeRoles={setTypeRoles}
                                    typeRoles={typeRoles}
                                    setRoleId={setRoleId}
                                    userDetails={userDetails}
                                  />
                                </div>
                                <div className="col-md-4"></div>
                              </div>
                              <div className="row">
                                <div className="col-md-4">
                                  <LastNameInput />
                                </div>
                                <div className="col-md-4">
                                  <FirstNameInput />
                                </div>
                                <div className="col-md-4">
                                  <EmailInput />
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-md-4">
                                  <PhoneInput />
                                </div>
                                {typeRoles.client &&
                                !typeRoles.admin &&
                                !typeRoles.coursier ? (
                                  <>
                                    <div className="col-md-4">
                                      <div className="form-floating">
                                        <AutoCompletionCompany
                                          allCustomer={allCustomer}
                                          setCustomerSelected={
                                            setCustomerSelected
                                          }
                                          companyExist={companyExist}
                                          setCompanyExist={setCompanyExist}
                                          customerSelected={customerSelected}
                                          isEdit={isEdit}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <ServiceInput />
                                    </div>
                                  </>
                                ) : (
                                  <span className="d-none"></span>
                                )}
                              </div>
                              <div className="ava-btn-action d-flex justify-content-around flex-wrap  mt-4">
                                <button
                                  onClick={closeModal}
                                  type="reset"
                                  className="btn btn-secondary ava-btn-normal btn-cancel"
                                >
                                  Annuler
                                  <i className="bi bi-x"></i>
                                </button>
                                <button
                                  type="submit"
                                  className={"btn ava-btn-normal btn-save"}
                                >
                                  Sauvegarder
                                  <i className="bi bi-check2"></i>
                                </button>
                              </div>
                            </Form>
                          </Formik>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Details;

Details.getInitialProps = async (context: any) => {
  return {
    id: context.query.id,
  };
};
