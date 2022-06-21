import React, { FunctionComponent, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import ProfilDropdown from "./ProfilDropdown";

const Navbar: FunctionComponent = () => {
  const [scrollY, setScrollY] = useState(0);

  const toogleSidebar = () => {
    document.body.classList.toggle("toggle-sidebar");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="navbar fixed-top">
      <div
        className="container-fluid justify-content-between custom-padding"
        style={{
          backdropFilter: `${scrollY > 50 ? "blur(5px)" : "none"}`,
          boxShadow: `${scrollY > 50 ? "inset 0px -1px 1px rgba(217, 164, 6, 0.4)" : "none"}` 
        }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <a className="logo d-flex align-items-center">
            <img src="/static/images/logo.png" alt="" />
            <span className="d-none d-lg-block"></span>
          </a>
          <i
            className="bi bi-toggles toggle-sidebar-btn"
            onClick={toogleSidebar}
          ></i>
        </div>
        <ProfilDropdown></ProfilDropdown>
      </div>
    </nav>
  );
};

export default Navbar;
