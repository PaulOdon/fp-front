import React, { FunctionComponent, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import TextError from "./TextError";

const FirstNameInput = (props: any) => {
  return (
    <div className="form-floating">
      <Field
        name="firstName"
        className="form-control ava-form"
        id="floatingName"
        placeholder="Nom"
        type="text"
      />
      <label htmlFor="floatingName">Nom</label>
      <ErrorMessage name="firstName">
        {(msg) => <TextError msg={msg} />}
      </ErrorMessage>
    </div>
  );
};

export default FirstNameInput;
