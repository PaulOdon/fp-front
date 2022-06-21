import React, { FunctionComponent, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import TextError from "./TextError";

const LoginInput = (props: any) => {
  return (
    <div className="form-floating">
      <Field
        name="login"
        className="form-control ava-form"
        id="floatingLogin"
        placeholder="Login"
        type="text"
      />
      <label htmlFor="floatingLogin">Login</label>
      <ErrorMessage name="login">
        {(msg) => <TextError msg={msg} />}
      </ErrorMessage>
    </div>
  );
};

export default LoginInput;
