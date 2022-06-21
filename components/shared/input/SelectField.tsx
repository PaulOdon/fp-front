import { useField } from "formik";
import React from "react";
import Select from "react-select";

const SelectField = ({ label, ...props }: any) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  const selectStyle = {
    control: (base: any) => ({
      ...base,
      borderRadius: "2.25rem",
      padding: "0.55rem 0.55rem",
    }),
  };
  return (
    <div className="form-floating">
      <Select {...field} {...props} styles={selectStyle} />
      <label htmlFor={props.id}>{label}</label>
      {meta.touched && meta.error && (
        <span style={{ color: "#FF0000", fontSize: 12 }}>{meta.error}</span>
      )}
    </div>
  );
};

SelectField.defaultProps = {
  placeholder: " ",
};

export default SelectField;
