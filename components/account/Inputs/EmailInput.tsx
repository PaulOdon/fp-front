import React, { FunctionComponent, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import TextError from "./TextError";

const EmailInput = (props: any) => {
  return (
    <div className="form-floating">
      <Field
        name="email"
        className="form-control ava-form"
        id="floatingEmail"
        placeholder="Adresse e-mail"
        type="mail"
      />
      <label htmlFor="floatingEmail">Adresse e-mail</label>
      <ErrorMessage name="email">
        {(msg) => <TextError msg={msg} />}
      </ErrorMessage>
    </div>
  );
};

export default EmailInput;
