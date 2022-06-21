import React, { FunctionComponent } from "react";
import styles from "./Footer.module.scss";

const AppFooter: FunctionComponent = () => {
  return (
    <footer id="footer" className="footer">
      <div className="copyright">
        &copy; Copyright{" "}
        <strong>
          <span>DM Conseil</span>
        </strong>
        . Tous
        <span> droits</span> réservés
      </div>
      <div className="credits">
        Conçu par{" "}
        <strong>
          <a href="#">MADAVA</a>&nbsp;&nbsp;&nbsp;
        </strong>
        | &nbsp; &curren; Version &nbsp;
        <strong>
          <a href="#">0.0.7</a>
        </strong>
        , <i>dernière mise à jour : 15/05/2022</i>
      </div>
    </footer>
  );
};

export default AppFooter;
