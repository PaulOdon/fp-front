import React, { FunctionComponent, useEffect, useState } from "react";
import generator from "generate-password";

const GenererMdpCheckbox = (props: any) => {
  useEffect(() => {
    if (props.submitSuccess) {
      props.setChecked(false);
    }
  }, [props.submitSuccess]);  

  useEffect(() => {}, [props.checked]);

  const onChangeGenerateMdp = (e: any) => {
    const target = e.target;
    const checked = target.checked;
    if (checked) {
      props.setChecked(true);
      props.setMdpIsEqual(true);
      var password = generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
        lowercase: true,
        uppercase:true
      });
      props.setPwdGenerate(password);
    } else {
      props.setChecked(false);
      props.setMdpIsEqual(false);
      props.setPwdGenerate("");
    }
  };

  return (
    <div className="form-check">
      <label className="form-check-label" htmlFor="isActif">
        Générer un mot de passe
      </label>
      <input
        checked={props.checked}
        id="generatePwd"
        className="form-check-input generatePwd"
        name="isGenerateMdp"
        onChange={onChangeGenerateMdp}
        type="checkbox"
      />
    </div>
  );
};

export default GenererMdpCheckbox;
