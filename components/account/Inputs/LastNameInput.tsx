import React, { FunctionComponent, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import TextError from "./TextError";

const LastNameInput = (props: any) => {
  return (
    <div className="form-floating">
      <Field
        name="lastName"
        className="form-control ava-form"
        id="floatingFirstName"
        placeholder="Prénom(s)"
        type="text"
      />
      <label htmlFor="floatingFirstName">Prénom(s)</label>
      <ErrorMessage name="lastName">
        {(msg) => <TextError msg={msg} />}
      </ErrorMessage>
    </div>
  );
};

export default LastNameInput;
