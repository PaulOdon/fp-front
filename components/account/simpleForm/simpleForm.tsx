import React, { FunctionComponent, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { register } from "../../../services/auth.service";
import { toast } from "react-toastify";
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
import { useRouter } from "next/router";

const SimpleForm = (props: any) => {
  const [pwdGenerate, setPwdGenerate] = useState("");
  const [pwdValue, setPwdValue] = useState("");
  const [pwdConfirmValue, setPwdComfirmValue] = useState("");
  const [mdpIsEqual, setMdpIsEqual] = useState(false);
  const [submitSuccess, setSubmiSucces] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {}, [pwdGenerate, mdpIsEqual, pwdValue, pwdConfirmValue]);

  useEffect(() => {}, [submitSuccess, checked]);

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
          password: "",
        }}
        validationSchema={Yup.object({
          roleId: Yup.string().required("Ce champ est obligatoire"),
          firstName: Yup.string()
            .max(15, "Doit être de 15 caractères ou moins")
            .required("Ce champ est obligatoire"),
          lastName: Yup.string()
            .max(20, "Doit être de 20 caractères ou moins")
            .required("Ce champ est obligatoire"),
          email: Yup.string()
            .email("Adresse électronique non valide")
            .required("Ce champ est obligatoire"),
          phone: Yup.string().max(15, "Max 15").required("Ce champ est obligatoire"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          values.password = pwdValue;

          let newAccount = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone,
            password: values.password,
            service: "null",
            isActif: values.isActif,
            roleId: parseInt(values.roleId),
          };

          register(newAccount)
            .then((response) => {
              toast.success("Le compte a ete créé avec success");
              props.setAllUser([...props.allUser, response?.data]);
              props.closeModal();
              if (submitSuccess) {
                setSubmiSucces(false);
              }
              setPwdGenerate("");
              setPwdValue("");
              setSubmiSucces(true);
              setChecked(false);
              resetForm();
            })
            .catch((error) => {
              toast.error(error.response.data.message);
            });
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
              <RoleSelect desactiveClient={true} />
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
              />
            </div>
          </div>

          <div className="ava-btn-action d-flex justify-content-around flex-wrap  mt-4">
            <button
              type="reset"
              onClick={props.closeModal}
              className="btn btn-secondary ava-btn-normal btn-cancel"
            >
              Annuler
              <i className="bi bi-x"></i>
            </button>
            <button
              type="submit"
              className={
                !mdpIsEqual ||
                pwdValue.length != pwdConfirmValue.length ||
                pwdValue.length <= 10 ||
                pwdConfirmValue.length <= 10
                  ? "btn ava-btn-normal btn-save disabled"
                  : "btn ava-btn-normal btn-save"
              }
            >
              Sauvegarder
              <i className="bi bi-check2"></i>
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default SimpleForm;
