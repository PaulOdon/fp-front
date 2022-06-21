import Link from "next/link";
import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect, useState } from "react";
import Layout from "../../components/layouts/layout";
import { useAuth } from "../../context/auth/UseAuth";
import styles from "./Index.module.scss";
import jwt_decode from "jwt-decode";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { patchUserById } from "../../services/user.service";
import { TextError } from "../../components/shared/error/TextError";
import { Oval } from "react-loader-spinner";

const IndexPage: FunctionComponent = () => {
  const router = useRouter();
  const [user, setUser] = useState({} as any);
  const auth = useAuth();
  const [showMdp, setShowMdp] = useState(false);
  const [showMdpC, setShowMdpC] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, [isLoading]);

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

  useEffect(() => {
    if (router.query.token) {
      connectionAuto();
    }
  }, [router.query]);

  useEffect(() => {}, [user]);

  const ValidationSchema = Yup.object().shape({
    password: Yup.string()
      .required("* Champs requise")
      .min(10, "10 caractères au minimum")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})/i,
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

  const connectionAuto = async () => {
    const token: any =
      router.query.token !== undefined ? router.query.token : "";
    const decoded: any = jwt_decode(token);
    const user = {
      email: decoded?.email,
      firstName: decoded?.firstName,
      id: decoded?.id,
      isActif: decoded?.isActif,
      lastName: decoded?.lastName,
      login: decoded?.login,
      phone: decoded?.phone,
      roleId: decoded?.roleId,
      service: decoded?.service,
      access_token: token,
    };
    setUser(user);
    // console.log(decoded)
    // await localStorage.setItem("access_token", token);
    await auth.login(user);
    router.push("/reset");
  };

  return (
    <div className="wapper-login">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 custom-padding-img">
            <div className="image-content">
              <img
                src="/static/images/bg-login.svg"
                className="img-fluid custom-img"
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-6 custom-padding-img">
            {isLoading ? (
              <div className="form-content d-flex flex-column justify-content-center align-items-center">
                <Oval
                  ariaLabel="loading-indicator"
                  height={50}
                  width={50}
                  strokeWidth={5}
                  color="#1b599e"
                  secondaryColor="#f1c40f"
                />
              </div>
            ) : (
              <div className="form-content d-flex flex-column justify-content-center align-items-center">
                <div className="title">
                  <img src="/static/images/logo.jpg" alt="" />
                </div>
                <div className={"sub-title"}>
                  <span>Entrez votre nouveau mot de passe</span>
                </div>
                <div className="login-form mt-4" style={{ width: "100%" }}>
                  <Formik
                    initialValues={initialValue}
                    validationSchema={ValidationSchema}
                    onSubmit={(values, { resetForm }) => {
                      setIsLoading(true);
                      const userData = {
                        password: values.password,
                      };
                      patchUserById(+user.id, userData)
                        .then((res) => {
                          toast.success(
                            "Le mot de passe a été modifié avec success"
                          );
                          setIsLoading(false);
                          router.push("/login");
                          resetForm();
                        })
                        .catch((err) => {
                          console.log(err);
                          toast.error(
                            "Il y a une erreur lors de la modification"
                          );
                          setIsLoading(false);
                        });
                    }}
                  >
                    {({
                      values,
                      errors,
                      handleSubmit,
                      handleChange,
                      handleBlur,
                    }) => {
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
