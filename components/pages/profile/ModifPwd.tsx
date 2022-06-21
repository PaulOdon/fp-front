import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { patchUserById } from "../../../services/user.service";
import { TextError } from "../../shared/error/TextError";

const ModifPwd = (props: any) => {
  const [showMdp, setShowMdp] = useState(false);
  const [showMdpC, setShowMdpC] = useState(false);

  const initialValue = {
    password: "",
    passwordConfirmation: "",
  };

  const toogleDisplayMdp = () => {
    if (showMdp) {
      setShowMdp(false);
    } else {
      setShowMdp(true);
    }
  };

  const toogleDisplayMdpC = () => {
    if (showMdpC) {
      setShowMdpC(false);
    } else {
      setShowMdpC(true);
    }
  };

  const ValidationSchema = Yup.object().shape({
    password: Yup.string()
    .required("* Champs requise")
    .min(10, "10 caractères au minimum")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})/i,
    "Doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial."
    ),
    passwordConfirmation: Yup.string()
      .required("* Champs requise")
      .when("password", {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Les mots de passe ne correspondent pas"
        ),
      }),
  });

  return (
    <div className="tab-pane fade pt-3" id="profile-change-password">
      <Formik
        initialValues={initialValue}
        validationSchema={ValidationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          console.log(props.user)
          const userData = {
            password: values.password,
          }
          patchUserById(+props.user.id, userData)
          .then((res) => {
              // console.log(res)
              toast.success("Le mot de passe a été modifier avec success")
              resetForm()
          })
          .catch((err)=>{
              console.log(err)
              toast.error("Il y une erreur lors de la modification")
          })
        }}
      >
        {({ values, errors, handleSubmit, handleChange, handleBlur }) => {
          return (
            <Form>
              <div className="row mb-3">
                <div className="col-md-12  col-lg-12 mb-3">
                  <div className="form-floating position-relative">
                    <Field
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      className="form-control ava-form"
                      id="floatingPassword"
                      placeholder="Mot de passe"
                      type={showMdp ? "text" : "password"}
                    />
                    <span
                      className="position-absolute"
                      onClick={toogleDisplayMdp}
                      style={{
                        right: "10px",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        cursor: "pointer",
                      }}
                    >
                      {showMdp ? (
                        <i
                          className="bi bi-eye-fill"
                          style={{ fontSize: "18px" }}
                        ></i>
                      ) : (
                        <i
                          className="bi bi-eye-slash-fill"
                          style={{ fontSize: "18px" }}
                        ></i>
                      )}
                    </span>
                    <label htmlFor="floatingPassword">
                      Nouveau mot de passe
                    </label>
                  </div>
                  <ErrorMessage name="password">
                    {(msg) => <TextError msg={msg} />}
                  </ErrorMessage>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12  col-lg-12 mb-3">
                  <div className="form-floating position-relative">
                    <input
                      name="passwordConfirmation"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.passwordConfirmation}
                      className="form-control ava-form"
                      id="floatingConfirmPassword"
                      placeholder="Mot de passe"
                      type={showMdpC ? "text" : "password"}
                    />
                    <span
                      className="position-absolute"
                      onClick={toogleDisplayMdpC}
                      style={{
                        right: "10px",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        cursor: "pointer",
                      }}
                    >
                      {showMdpC ? (
                        <i
                          className="bi bi-eye-fill"
                          style={{ fontSize: "18px" }}
                        ></i>
                      ) : (
                        <i
                          className="bi bi-eye-slash-fill"
                          style={{ fontSize: "18px" }}
                        ></i>
                      )}
                    </span>
                    <label htmlFor="floatingConfirmPassword">
                      Confirmer le nouveau mot de passe
                    </label>
                  </div>
                  <ErrorMessage name="passwordConfirmation">
                    {(msg) => <TextError msg={msg} />}
                  </ErrorMessage>
                </div>
              </div>

              <div className="ava-btn-action d-flex justify-content-around flex-wrap  mt-4">
                <button
                  type="reset"
                  className="btn btn-secondary ava-btn-normal btn-cancel"
                >
                  Annuler
                  <i className="bi bi-x"></i>
                </button>
                <button
                  type="submit"
                  className="btn btn-primary ava-btn-normal btn-save"
                >
                  Sauvegarder
                  <i className="bi bi-check2"></i>
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ModifPwd;
