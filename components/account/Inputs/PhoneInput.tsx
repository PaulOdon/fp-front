import React, { FunctionComponent, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import TextError from "./TextError";

const PhoneInput = (props: any) => {
  return (
    <div className="form-floating">
      <Field
        name="phone"
        className="form-control ava-form"
        id="floatingPhone1"
        placeholder="Numéro télephone"
        type="text"
      />
      <label htmlFor="floatingPhone1">Numéro télephone</label>
      <ErrorMessage name="phone">
        {(msg) => <TextError msg={msg} />}
      </ErrorMessage>
    </div>
  );
};

export default PhoneInput;
