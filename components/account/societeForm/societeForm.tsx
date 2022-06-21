import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import {
  getCustomerByName,
  fetchCustomers,
} from "../../../services/customer.service";
import { register } from "../../../services/auth.service";
import { toast } from "react-toastify";
import { addCustomerInUser } from "../../../services/user.service";
import StatusCompteCheckbox from "../Inputs/StatusCompteCheckbox";
import GenererMdpCheckbox from "../Inputs/GenererMdpCheckbox";
import RoleSelect from "../Inputs/RoleSelect";
import EmailInput from "../Inputs/EmailInput";
import FirstNameInput from "../Inputs/FirstNameInput";
import LastNameInput from "../Inputs/LastNameInput";
import PhoneInput from "../Inputs/PhoneInput";
import LoginInput from "../Inputs/LoginInput";
import MdpInput from "../Inputs/MdpInput";
import MdpConfirmInput from "../Inputs/MdpConfirmInput";
import AutoCompletionCompany from "../Inputs/AutoCompletionCompany";
import ServiceInput from "../Inputs/ServiceInput";
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import { TextError } from "../../shared/error/TextError";

const SocieteForm = (props: any) => {
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
  const router = useRouter();

  useEffect(() => {}, [pwdGenerate, mdpIsEqual, pwdValue, pwdConfirmValue]);

  useEffect(() => {}, [submitSuccess, checked]);

  const [typeRoles, setTypeRoles] = useState({
    admin: false,
    coursier: false,
    client: false,
  });

  useEffect(() => {
    resetAllInput();
  }, [props.isResetForm]);

  const resetAllInput = () => {
    setChecked(false);
    setPwdGenerate("");
    setPwdComfirmValue("");
    setPwdValue("");
    setTypeRoles({ admin: false, client: false, coursier: false });
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  useEffect(() => {}, [customerSelected]);

  useEffect(() => {}, [roleId, typeRoles]);

  const getAllCustomers = () => {
    fetchCustomers()
      .then((res) => {
        setAllCustomer(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {}, [props.isResetForm])

  const validationClient = Yup.object({
    firstName: Yup.string()
      .max(15, "Doit être de 15 caractères ou moins")
      .required("Ce champ est obligatoire"),
    service: Yup.string()
      .max(15, "Doit être de 15 caractères ou moins")
      .required("Ce champ est obligatoire"),
    lastName: Yup.string()
      .max(20, "Doit être de 20 caractères ou moins")
      .required("Ce champ est obligatoire"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Ce champ est obligatoire"),
    phone: Yup.string().max(15, "Max 15").required("Ce champ est obligatoire"),
  });

  const validationAdminCoursier = Yup.object({
    firstName: Yup.string()
      .max(15, "Doit être de 15 caractères ou moins")
      .required("Ce champ est obligatoire"),
    lastName: Yup.string()
      .max(20, "Doit être de 20 caractères ou moins")
      .required("Ce champ est obligatoire"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Ce champ est obligatoire"),
    phone: Yup.string().max(15, "Max 15").required("Ce champ est obligatoire"),
  });

  return (
    <>
      <Formik
        initialValues={{
          isActif: true,
          roleId: "",
          email: "",
          firstName: "",
          lastName: "",
          phone: "",
          mdp: "",
          service: "",
        }}
        validationSchema={
          typeRoles.client ? validationClient : validationAdminCoursier
        }
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (typeRoles.admin || typeRoles.client || typeRoles.coursier) {
            if (typeRoles.client && !typeRoles.admin && !typeRoles.coursier) {
              values.mdp = pwdValue;
              let newAccount = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone,
                password: values.mdp,
                service: values.service,
                isActif: values.isActif,
                roleId: parseInt(roleId),
              };

              let customerList = {
                customerList: [
                  {
                    id: parseInt(customerSelected.id),
                  },
                ],
              };
              // console.log(newAccount);
              // console.log(customerList);

              register(newAccount)
                .then((res) => {
                  toast.success("Le compte a ete créé avec success");
                  // console.log(res);
                  const userId = res?.data.id;
                  // props.setAllUser([...props.allUser, res?.data]);
                  props.closeModal();
                  setTimeout(() => {
                    addCustomerInUser(userId, customerList)
                      .then((response) => {
                        console.log(response);
                        props.setAllUser([...props.allUser, response?.data]);
                        // props.closeModal();
                        if (submitSuccess) {
                          setSubmiSucces(false);
                        }
                        setPwdGenerate("");
                        setPwdValue("");
                        setSubmiSucces(true);
                        setChecked(false);
                        setAllCustomer([]);
                        setCustomerSelected({});
                        resetForm();
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }, 5000);
                })
                .catch((error) => {
                  toast.error(error.response.data.message);
                });
            } else {
              values.mdp = pwdValue;

              let newAccount = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone,
                password: values.mdp,
                // service: values.service,
                isActif: values.isActif,
                roleId: parseInt(roleId),
              };

              // console.log(newAccount);

              register(newAccount)
                .then((res) => {
                  toast.success("Le compte a ete créé avec success");
                  console.log(res);
                  const userId = res?.data.id;
                  props.setAllUser([...props.allUser, res?.data]);
                  props.closeModal();
                  setPwdGenerate("");
                  setPwdValue("");
                  setSubmiSucces(true);
                  setChecked(false);
                  setAllCustomer([]);
                  setCustomerSelected({});
                  resetForm();
                })
                .catch((error) => {
                  toast.error(error.response.data.message);
                });
            }
          } else {
            toast.error("Veuillez choisir un rôle");
          }
        }}
      >
        <Form>
          <div className="row mt-3">
            <div className="col-md-4">
              <div>
                <StatusCompteCheckbox />
                <GenererMdpCheckbox
                  setPwdGenerate={setPwdGenerate}
                  checked={checked}
                  setChecked={setChecked}
                  submitSuccess={submitSuccess}
                  setSubmiSucces={setSubmiSucces}
                  setMdpIsEqual={setMdpIsEqual}
                />
              </div>
            </div>
            <div className="col-md-4">
              <RoleSelect
                setTypeRoles={setTypeRoles}
                typeRoles={typeRoles}
                setRoleId={setRoleId}
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
            <div className="col-md-4">
              <MdpInput
                pwdGenerate={pwdGenerate}
                submitSuccess={submitSuccess}
                setPwdValue={setPwdValue}
                mdpIsEqual={mdpIsEqual}
                setMdpIsEqual={setMdpIsEqual}
                pwdConfirmValue={pwdConfirmValue}
                isResetForm={props.isResetForm}
              />
            </div>
            <div className="col-md-4">
              <MdpConfirmInput
                pwdGenerate={pwdGenerate}
                submitSuccess={submitSuccess}
                setPwdComfirmValue={setPwdComfirmValue}
                mdpIsEqual={mdpIsEqual}
                setMdpIsEqual={setMdpIsEqual}
                pwdValue={pwdValue}
                isResetForm={props.isResetForm}
              />
            </div>
          </div>
          {typeRoles.client && !typeRoles.admin && !typeRoles.coursier ? (
            <div className="row mt-3">
              <div className="col-md-4">
                <div className="form-floating">
                  <AutoCompletionCompany
                    allCustomer={allCustomer}
                    setCustomerSelected={setCustomerSelected}
                    companyExist={companyExist}
                    setCompanyExist={setCompanyExist}
                    customerSelected={customerSelected}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <ServiceInput />
              </div>
            </div>
          ) : (
            <span className="d-none"></span>
          )}

          <div className="ava-btn-action d-flex justify-content-around flex-wrap  mt-4">
            <button
              type="reset"
              onClick={props.closeModal}
              className="btn btn-secondary ava-btn-normal btn-cancel"
            >
              Annuler
              <i className="bi bi-x"></i>
            </button>
            {typeRoles.client ? (
              <button
                type="submit"
                // className="btn ava-btn-normal btn-save"
                className={
                  !mdpIsEqual ||
                  pwdValue.length != pwdConfirmValue.length ||
                  pwdValue.length <= 9 ||
                  pwdConfirmValue.length <= 9 ||
                  !companyExist
                    ? "btn ava-btn-normal btn-save disabled"
                    : "btn ava-btn-normal btn-save"
                }
              >
                Sauvegarder
                <i className="bi bi-check2"></i>
              </button>
            ) : (
              <button
                type="submit"
                // className="btn ava-btn-normal btn-save"
                className={
                  !mdpIsEqual ||
                  pwdValue.length != pwdConfirmValue.length ||
                  pwdValue.length <= 9 ||
                  pwdConfirmValue.length <= 9
                    ? "btn ava-btn-normal btn-save disabled"
                    : "btn ava-btn-normal btn-save"
                }
              >
                Sauvegarder
                <i className="bi bi-check2"></i>
              </button>
            )}
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default SocieteForm;
