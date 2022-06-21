import React, { FunctionComponent, useEffect, useState } from "react";

const MdpInput = (props: any) => {
  const [showMdp, setShowMdp] = useState(false);
  const [isGenerate, setIsGenerate] = useState(false);
  const [mdp, setMdp] = useState("");
  const [mdpNotValide, setMdpNotValide] = useState(true)

  useEffect(() => {}, [showMdp, mdpNotValide]);

  useEffect(() => {
    setMdp("");
  }, [props.submitSuccess,]);

  useEffect(() => {
      setMdp("")
  }, [props.isResetForm])

  useEffect(() => {
    if (props.pwdGenerate != null) {
      if (props.pwdGenerate.length > 0) {
        setIsGenerate(true);
        setMdp(props.pwdGenerate);
        props.setPwdValue(props.pwdGenerate);
        setMdpNotValide(false)
      } else {
        setIsGenerate(false);
        setMdp("");
      }
    }
  }, [props.pwdGenerate]);

  useEffect(() => {
   
  }, [isGenerate, mdp]);

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
    setMdp(value);
    props.setPwdValue(value);
  };

  const handleLeaveInput = (e: any) => {
    if (e.target.value.length > 0) {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i;
      if(regex.test(mdp)){
          setMdpNotValide(false)
          // console.log("valide")
          if (props.pwdConfirmValue === mdp) {
            // setMdpIsNotEqual(false);
            props.setMdpIsEqual(true);
          } else {
            // setMdpIsNotEqual(true);
            props.setMdpIsEqual(false);
          }
      }else{
        // console.log(false)
        // console.log("not Valide")
        setMdpNotValide(true)
      }
    }
  };

  return (
    <>
      <div className="form-floating position-relative">
        <input
          name="mdp"
          value={mdp}
          onChange={handleChangeMdpConfirm}
          className="form-control ava-form"
          id="floatingPassword"
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
        <label htmlFor="floatingPassword">Mot de passe</label>
      </div>
      {!props.mdpIsEqual ? (
        <span
          style={{
            width: "100%",
            marginTop: "0.25rem",
            marginRight: "5px",
            fontSize: "12px",
            color: "#ff0000",
          }}
        >
          Les deux mots de passe doivent correspondre.
        </span>
      ) : (
        <span></span>
      )}
      <br/>
      {
        mdpNotValide && !isGenerate
        ?<span
        style={{
          width: "100%",
          marginTop: "0.25rem",
          fontSize: "12px",
          color: "#ff0000",
        }}
      >
        Doit contenir 10 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.
      </span>
        :<span></span>
      }
    </>
  );
};

export default MdpInput;
