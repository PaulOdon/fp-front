import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";

const StatusCompteCheckbox = (props: any) => {
 
  return (
    <div className="form-check">
      <label className="form-check-label" htmlFor="isActif">
        Actif
      </label>
      <Field
        id="gridCheckActif1"
        className="form-check-input"
        name="isActif"
        type="checkbox"
      />
    </div>
  );
};

export default StatusCompteCheckbox;
