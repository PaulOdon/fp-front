import Link from "next/link";
import React, { FunctionComponent, useEffect, useState } from "react";
import Layout from "../../components/layouts/layout";
import styles from "./Index.module.scss";
import { resetPassword } from "../../services/auth.service";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Oval } from "react-loader-spinner";

const IndexPage: FunctionComponent = () => {
  const { asPath } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [inputValue, setInputValue] = useState({
    email: "",
    url: "",
  });

  useEffect(() => {}, [isLoading]);

  const handleChangeEmail = (e: any) => {
    const target = e.target;
    const value = target.value;

    setInputValue({ ...inputValue, email: value });
  };

  useEffect(() => {}, [inputValue]);

  useEffect(() => {
    getFullUrl();
  }, []);

  const getFullUrl = () => {
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";

    const URL = `${origin}/reset`;
    setInputValue({ ...inputValue, url: URL });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    resetPassword(inputValue)
      .then((res) => {
        toast.success(
          "Un lien pour réinitialiser votre mot de passe a été envoyé à votre adresse mail"
        );
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Aucun compte ne correspond à cette adresse mail");
        setIsLoading(false);
      });
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
              <div
                className="form-content d-flex flex-column justify-content-center align-items-center"
                style={{ backdropFilter: "blur(5px)" }}
              >
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
                  <span>
                    Saisir votre e-mail pour reinitialiser votre mot de passe
                  </span>
                </div>
                <div className="login-form">
                  <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-10">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control ava-form"
                          id="floatingEmail"
                          value={inputValue.email}
                          onChange={handleChangeEmail}
                          placeholder="Adresse e-mail"
                          required
                        />
                        <label htmlFor="floatingEmail">Adresse e-mail</label>
                      </div>
                    </div>
                    <div className="col-md-12 loginpasswod">
                      <Link href="/login">
                        <a>Se connecter</a>
                      </Link>
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn ava-btn-normal btn-save"
                      >
                        Valider
                        <i className="bi bi-check2"></i>
                      </button>
                    </div>
                  </form>
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
