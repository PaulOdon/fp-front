import React, { FunctionComponent, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";

const MdpConfirmInput = (props: any) => {
  const [showMdp, setShowMdp] = useState(false);
  const [isGenerate, setIsGenerate] = useState(false);
  const [confirmMdp, setConfirmMdp] = useState("");
  const [mdpIsNotEqual, setMdpIsNotEqual] = useState(false);

  useEffect(() => {}, [showMdp, mdpIsNotEqual]);

  useEffect(() => {
    setConfirmMdp("");
  }, [props.submitSuccess]);

  useEffect(() => {
    setConfirmMdp("")
  }, [props.isResetForm])

  useEffect(() => {
    if (props.pwdGenerate != null) {
      if (props.pwdGenerate.length > 0) {
        setIsGenerate(true);
        setConfirmMdp(props.pwdGenerate);
        props.setPwdComfirmValue(props.pwdGenerate);
      } else {
        setIsGenerate(false);
        setConfirmMdp("");
      }
    }
  }, [props.pwdGenerate]);

  useEffect(() => {}, [isGenerate, confirmMdp]);

  const toogleDisplayMdp = () => {
    if (showMdp) {
      setShowMdp(false);
    } else {
      setShowMdp(true);
    }
  };

  const handleChangeMdpConfirm = (e: any) => {
    const target = e.target;
    const value = target.value;
    setConfirmMdp(value);
    props.setPwdComfirmValue(value);
  };

  const handleLeaveInput = (e: any) => {
    if (e.target.value.length > 0) {
      if (props.pwdValue === confirmMdp) {
        // setMdpIsNotEqual(false);
        props.setMdpIsEqual(true);
      } else {
        // setMdpIsNotEqual(true);
        props.setMdpIsEqual(false);
      }
      // console.log("mdp", props.pwdValue);
    }
  };

  return (
    <>
      <div className="form-floating position-relative">
        <input
          name="confirmMdp"
          value={confirmMdp}
          onChange={handleChangeMdpConfirm}
          className="form-control ava-form"
          id="floatingPassword1"
          placeholder="Mot de passe"
          type={showMdp ? "text" : "password"}
          onMouseLeave={handleLeaveInput}
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
            <i className="bi bi-eye-fill" style={{ fontSize: "18px" }}></i>
          ) : (
            <i
              className="bi bi-eye-slash-fill"
              style={{ fontSize: "18px" }}
            ></i>
          )}
        </span>
        <label htmlFor="floatingPassword1">Confirmation Mot de passe</label>
      </div>
      {!props.mdpIsEqual ? (
        <span
          style={{
            width: "100%",
            marginTop: "0.25rem",
            fontSize: "12px",
            color: "#ff0000",
          }}
        >
          Les deux mots de passe doivent correspondre.
        </span>
      ) : (
        <span></span>
      )}
    </>
  );
};

export default MdpConfirmInput;
