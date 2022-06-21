import { useField } from "formik";
import React from "react";

const TextArea = ({ label, ...props }: any) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <div className="form-floating">
      <textarea
        className="form-control ava-form"
        {...field} {...props}
        style={{ height: "100px" }}
      ></textarea>
      <label htmlFor={props.id}>{label}</label>
      {meta.touched && meta.error && (
        <span style={{ color: "#FF0000", fontSize: 12 }}>{meta.error}</span>
      )}
    </div>
  );
};

TextArea.defaultProps = {
  placeholder: " ",
};

export default TextArea;
