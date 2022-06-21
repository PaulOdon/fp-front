import { useField } from "formik";
import React from "react";

const TextField = ({ label, ...props }: any) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <div className="form-floating">
      <input className="form-control ava-form" {...field} {...props} />
      <label htmlFor={props.id}>{label}</label>
      {meta.touched && meta.error && (
        <span style={{ color: "#FF0000", fontSize: 12 }}>{meta.error}</span>
      )}        
    </div>
  );
};

TextField.defaultProps = {
  placeholder: " ",
};

export default TextField;
