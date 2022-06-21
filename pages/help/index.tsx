import React, { FunctionComponent } from "react";
import Layout from "../../components/layouts/layout";
import styles from "./Index.module.scss";

const IndexPage: FunctionComponent = () => {
  return (
    <Layout>
      <div id="main" className="main-help">
        <section className="section help">
          <div className="help">
            <h1>FacilyReco vous simplifie vos recommandés ?</h1>
          </div>
          <div className="ava-help-title d-flex flex-row justify-content-center mb-4">
            <img src="/static/images/logo.png" alt="" />
            <h2>
              <i>C'EST TRÈS SIMPLE ...</i>
            </h2>
          </div>
          <div className="ava-help-step d-flex flex-row justify-content-center align-items-center mb-4">
            <ul className="steps">
              <li>
                <a href="#" title="">
                  <div className="step">1</div>
                  <p>Vous rédigez vos courriers et mettez sous plis</p>
                </a>
              </li>
              <li>
                <a href="#" title="">
                  <div className="step">2</div>
                  <p>
                    Vous déposez vos courriers dans note agence de centre ville
                  </p>
                </a>
              </li>
              <li>
                <a href="#" title="">
                  <div className="step">3</div>
                  <p>
                    Nous distribuons votre courrier auprès de vos destinataires
                  </p>
                </a>
              </li>
            </ul>
          </div>
          <div className="ava-help-zone mb-4">
            <div className="row">
              <img src="/static/images/zone.png" alt="" />
              <div className="zone-info">
                Nous desservons toutes les communes intégrés à la carte
                ci-contre. Pour les autres destinations, nous remettrons les
                plis à La Poste le jour J.
              </div>
            </div>
          </div>
          <div className="ava-help-didacticiel d-flex flex-column justify-content-center">
            <h1>Vous envoyez un reco?</h1>
            <ul className="mb-4 d-flex flex-column justify-content-center align-items-center">
              <li className="wrapper-didacticiel one mb-4">
                <div className="step">1</div>
                <p className="d-flex align-items-center">
                  <img
                    src="/static/images/didacticiel-1.png"
                    alt=""
                    className="demande-button"
                  />
                  <span>
                    Cliquez sur le bouton (+) dans votre écran d’accueil
                  </span>
                </p>
              </li>
              <li className="wrapper-didacticiel two mb-4 step2">
                <div className="step">2</div>
                Renseignez le formulaire d’envoi
                <p className="mb-2">
                  (1) Vos coordonnées sont déjà renseignées
                </p>
                <span>
                  (2) S’il s’agit d’un nouveau destinataire, vous pouvez
                  directement le créer sans quitter ce formulaire{" "}
                </span>
                <img src="/static/images/didacticiel-2.png" />
                <p>
                  (3) Mettez dans la zone supplément d’information la référence
                  de votre courrier
                  <img
                    src="/static/images/didacticiel-3.png"
                    className="custom-1"
                  />
                </p>
              </li>
              <li className="wrapper-didacticiel three mb-4 step3">
                <div className="step">3</div>
                <p>
                  Suivez l’avancement de l’acheminement de votre courrier <br />
                  NB: Vous recevrez un email avec la preuve de dépots quelques
                  minutes après la remises en main propre.
                </p>
                <img src="/static/images/didacticiel-4.png" className="icon" />
              </li>
            </ul>
          </div>
          <div className="ava-help-zone mb-4">
            <h1 className="mb-5">Vous avez encore des questions ?</h1>
            <div className="row">
              <div className="zone-contact">
                <i className="bi bi-phone-vibrate"></i>
                <p>0984 460 203</p>
              </div>
              <img src="/static/images/facilypost.png" alt="" />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default IndexPage;
