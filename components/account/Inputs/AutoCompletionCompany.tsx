import React, { FC, FunctionComponent, useEffect, useState } from "react";
import Select from "react-select";

const AutoCompletionCompany = (props: any) => {
  const [typeOptions, setTypeOptions] = useState([{} as any]);
  const emptyValue = {
    label: "",
    value: "",
  };

  useEffect(() => {
    addAllCustomersInSelect(props.allCustomer);
  }, [props.allCustomer, props.isEdit]);

  useEffect(() => {}, [props.customerSelected]);

  const selectStyle = {
    control: (base: any) => ({
      ...base,
      borderRadius: "2.25rem",
      padding: "0.55rem 0.55rem",
    }),
  };

  const addAllCustomersInSelect = (allcustomer: any) => {
    allcustomer?.map((customer: any) => {
      customer.value = customer.id;
      customer.label = customer.firstName;
    });

    setTypeOptions(allcustomer);
  };

  const handleChangeInputCustomer = (customer: any) => {
    if (customer != null) {
      props.setCustomerSelected(customer);
      if (props.setCompanyExist) {
        props.setCompanyExist(true);
      }
    } else {
      if (props.setCompanyExist) {
        props.setCompanyExist(false);
      }
    }
  };

  return (
    <Select
      isClearable
      options={typeOptions}
      getOptionLabel={(option) =>
        // `${option.firstName} ${option.lastName} => ${option.companyName}`
        `${option.companyName}`
      }
      styles={selectStyle}
      isSearchable
      placeholder="Société"
      value={
        props.customerSelected?.firstName === undefined
          ? ""
          : props.customerSelected
      }
      onChange={handleChangeInputCustomer}
    />
  );
};

export default AutoCompletionCompany;
