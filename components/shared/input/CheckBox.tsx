import { useField } from "formik";
import React from "react";

const CheckBox = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-check">
      <input className="form-check-input" {...field} {...props} />
      <label htmlFor={props.id} className="form-check-label">
        {label}
      </label>
      {meta.touched && meta.error && (
        <span style={{ color: "#FF0000", fontSize: 12 }}>{meta.error}</span>
      )}
    </div>
  );
};

export default CheckBox;
