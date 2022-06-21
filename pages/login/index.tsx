import { Form, Formik } from "formik";
import Link from "next/link";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import Layout from "../../components/layouts/layout";
import styles from "./Index.module.scss";
import * as authService from "../../services/auth.service";
import TextField from "../../components/shared/input/TextField";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useAuth } from "../../context/auth/UseAuth";

const IndexPage: FunctionComponent = () => {
  const [loginError, setLoginError] = useState("");
  const auth = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (auth.isLogedIn) {
      router.push("/");
    }
  }, [auth.isLogedIn]);
  const login = async (data: { email: string; password: string }) => {
    try {
      const user = await authService.login(data);
      if (user) {
        await auth.login(user);
        setLoginError("");
        router.push("/");
      }
    } catch (error: any) {
      if (error.statusCode == 401 || error.statusCode == 400) {
        setLoginError(
          "Le login ou le mot de passe sont incorrects veuillez vérifier vos codes d’accès"
        );
      }
    }
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
            <div className="form-content d-flex flex-column justify-content-center align-items-center">
              <div className="title">
                <img src="/static/images/logo.jpg" alt="" />
              </div>
              <div className={"sub-title"}>
                <span>
                  Bienvenue à nouveau ! Veuillez vous connecter à votre compte.
                </span>
              </div>
              <div className="login-form">
                <Formik
                  initialValues={{ email: "", password: "" }}
                  onSubmit={(values) => {
                    login(values);
                  }}
                  validationSchema={Yup.object().shape({
                    email: Yup.string()
                      .email("Invalid email")
                      .required("Ce champ est obligatoire"),
                    password: Yup.string().required("Ce champ est obligatoire"),
                  })}
                >
                  {(formik) => {
                    return (
                      <Form className="row g-3">
                        <div className="col-md-12 ">
                          <TextField
                            name="email"
                            type="text"
                            placeholder="Email"
                            label="Email"
                            id="Email"
                          ></TextField>
                        </div>
                        <div className="col-md-12 logintop">
                          <TextField
                            name="password"
                            type="password"
                            id="password"
                            placeholder="Password"
                            label="Mot de passe"
                          ></TextField>
                        </div>
                        {loginError && (
                          <div className="col-md-12 text-center">
                            <span style={{ color: "red", fontSize: "1rem" }}>
                              {loginError}
                            </span>
                          </div>
                        )}
                        <div className="col-md-12 loginpasswod">
                          <Link href="/forgot">
                            <a>Mot de passe oublié ?</a>
                          </Link>
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn ava-btn-normal btn-next"
                          >
                            Connexion
                            <i className="bi bi-arrow-right"></i>
                          </button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
