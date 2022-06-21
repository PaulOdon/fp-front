import { useField } from "formik";
import React from "react";

const RadioBox = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-check ava-partner-company">
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

export default RadioBox;
