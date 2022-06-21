import React, { FunctionComponent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Sidebar.module.scss";
import Can from "../../../context/auth/Can";
import { useAuth } from "../../../context/auth/UseAuth";

const Sidebar: FunctionComponent = () => {
  const router = useRouter();
  const auth = useAuth();
  const logout = () => {
    auth.logout();
    router.push("/login");
  };

  return (
    <aside
      id="sidebar"
      className="sidebar d-flex flex-column justify-content-center"
      style={{ overflow: "hidden" }}
    >
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link href="/">
            <a
              className={
                router.pathname == "/" ? "nav-link active" : "nav-link"
              }
            >
              <i className="bi bi-grid"></i>
              <span>Accueil</span>
            </a>
          </Link>
        </li>

        <li className="nav-item">
          <Link href="/course/add">
            <a
              className={
                router.pathname == "/course/add"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <i className="bi bi-plus-lg"></i>
              <span>Demande</span>
            </a>
          </Link>
        </li>

        <li className="nav-item">
          <Link href="/course">
            <a
              className={
                router.pathname == "/course" ? "nav-link active" : "nav-link"
              }
            >
              <i className="bi bi-flag"></i>
              <span>Suivi des demandes</span>
            </a>
          </Link>
        </li>
        <Can permissions={["user:read"]}>
          <li className="nav-item">
            <Link href="/account">
              <a
                className={
                  router.pathname == "/account" ? "nav-link active" : "nav-link"
                }
              >
                <i className="bi bi-person"></i>
                <span>Utilisateur</span>
              </a>
            </Link>
          </li>
        </Can>

        <Can permissions="customer:read">
          <li className="nav-item">
            <Link href="/customer">
              <a
                className={
                  router.pathname == "/customer"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                <i className="bi bi-people"></i>
                <span>Client</span>
              </a>
            </Link>
          </li>
        </Can>

        <li className="nav-item">
          <Link href="/receiver">
            <a
              className={
                router.pathname == "/receiver"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <i className="bi bi-mailbox"></i>
              <span>Destinataire</span>
            </a>
          </Link>
        </li>

        <li className="nav-item">
          <Link href="/help">
            <a
              className={
                router.pathname == "/help" ? "nav-link active" : "nav-link"
              }
            >
              <i className="bi bi-question-lg"></i>
              <span>Aide</span>
            </a>
          </Link>
        </li>

        <li className="nav-item" style={{cursor: 'pointer'}} onClick={logout}>
          <a
            className={
              router.pathname == "/login" ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-box-arrow-in-right"></i>
            <span>Deconnexion</span>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
