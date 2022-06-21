import React from "react";
import Select from "react-select";

const SelectField = (props: any) => {
  const handleChange = (value: any) => {
    props.onChange(value);
  };

  const handleBlur = () => {
    props.onBlur(true);
  };

  return (
    <div>
      <Select
        id={props.id}
        name={props.name}
        options={props.options}
        onChange={handleChange}
        onBlur={handleBlur}
        value={props.value}
        {...props}
      />
      {!!props.error && props.touched && (
        <div className="mt-1" style={{ color: "red" }}>
          {props.error}
        </div>
      )}
    </div>
  );
};

export default SelectField;
