import React, { FunctionComponent, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import TextError from "./TextError";

const ServiceInput = () => {
    return (
        <div className="form-floating">
          <Field
            name="service"
            className="form-control ava-form"
            id="floatingNameService"
            placeholder="Nom"
            type="text"
          />
          <label htmlFor="floatingNameService">Service</label>
          <ErrorMessage name="service">
            {(msg) => <TextError msg={msg} />}
          </ErrorMessage>
        </div>
    )
}

export default ServiceInput