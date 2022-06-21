import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../../context/auth/UseAuth";

const ProfilDropdown = () => {
  const auth = useAuth();
  const router = useRouter();
  const [user, setUser]: any = useState({});
  useEffect(() => {
    setUser(auth.user);
  }, [auth]);

  useEffect(() => {
    console.log(user);
  }, [user])

  const logout = () => {
    auth.logout();
    router.push("/login");
  };
  return (
    <div className="d-flex justify-content-around custom-nav-bar">
      <div className="name-end-role d-flex flex-column text-center">
        <span className="name">{user.lastName}</span>
        <span className="role">{user?.role?.name}</span>
      </div>
      <div className="nav-item dropdown profile">
        <a
          className="nav-link dropdown-toggle"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="/static/images/logo.png"
            width="40"
            height="40"
            className="rounded-circle border border-primary"
          />
        </a>
        <div className="dropdown-menu " aria-labelledby="navbarDropdown">
          <Link href="/profile">
            <a className="dropdown-item d-flex justify-content-between">
              <span>Mon profil</span>
              <i className="bi bi-person fs-4"></i>
            </a>
          </Link>
          <Link href="/help">
            <a className="dropdown-item d-flex justify-content-between">
              <span>Aide</span>
              <i className="bi bi-question-circle-fill fs-4"></i>
            </a>
          </Link>
          <a
            style={{ cursor: "pointer" }}
            className="dropdown-item d-flex justify-content-between"
            onClick={logout}
          >
            <span>Se déconnecter</span>
            <i className="bi bi-box-arrow-right fs-4"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfilDropdown;
