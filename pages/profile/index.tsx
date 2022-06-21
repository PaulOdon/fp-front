import React, { FunctionComponent, useEffect, useState } from "react";
import Layout from "../../components/layouts/layout";
import styles from "./Index.module.scss";
import { useAuth } from "../../context/auth/UseAuth";
import InfoGeneral from "../../components/pages/profile/InfoGeneral";
import ModifProfile from "../../components/pages/profile/ModifProfile";
import ModifPwd from "../../components/pages/profile/ModifPwd";
import ModifAddress from "../../components/pages/profile/ModifAddress";
import Can from "../../context/auth/Can";

const IndexPage: FunctionComponent = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(user);
  const [customerInfo, setCustomerInfo] = useState({});

  useEffect(() => {
    if (user) {
      setCustomerInfo(user.customers[0]);
    }
  }, [userInfo, customerInfo]);

  return (
    <Layout>
      <div className="pagetitle">
        <h1>Mon profil</h1>
      </div>

      <section className="section profile">
        <div className="row">
          <div className="col-xl-4">
            <div className="card pb-4">
              <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                <img
                  src="/static/images/profile-img.png"
                  alt="Profile"
                  className="rounded-circle"
                />
                <h2>{userInfo?.firstName}</h2>
                <h3>{userInfo?.role?.name}</h3>
              </div>
            </div>
          </div>

          <div className="col-xl-8">
            <div className="card">
              <div className="card-body pt-3">
                {/* <!-- Bordered Tabs --> */}
                <ul className="nav nav-tabs nav-tabs-bordered">
                  <li className="nav-item">
                    <button
                      className="nav-link active"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-overview"
                    >
                      Information générale
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-edit"
                    >
                      Modifier le profil
                    </button>
                  </li>
                  {user.role?.name === "Client" ? (
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#adresse-edit"
                      >
                        Modifier info client
                      </button>
                    </li>
                  ) : (
                    <span className="d-none"></span>
                  )}

                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-change-password"
                    >
                      Changer le mot de passe
                    </button>
                  </li>
                </ul>
                <div className="tab-content pt-2">
                  <InfoGeneral userInfo={userInfo} />
                  <ModifProfile
                    user={user}
                    setUserInfo={setUserInfo}
                    userInfo={userInfo}
                  />
                  {user.role?.name === "Client" ? (
                    <ModifAddress
                      customerInfo={customerInfo}
                      setCustomerInfo={setCustomerInfo}
                    />
                  ) : (
                    <span className="d-none"></span>
                  )}
                  <ModifPwd user={user} />
                </div>
                {/* <!-- End Bordered Tabs --> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;
