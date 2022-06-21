import React, { FunctionComponent, useEffect, useState } from "react";
import * as customerService from "../../../services/customer.service";
import { Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { TextError } from "../../shared/error/TextError";
import CheckBox from "../../shared/input/CheckBox";
import TextField from "../../shared/input/TextField";
import Select from "react-select";

export const ReceiverForm: FunctionComponent<any> = (props: any) => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [defaultValue, setDefaultValue] = useState({
    value: 0,
    label: "",
  });
  const [isParticular, setIsParticular] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const clientOptions = Array();

  const selectStyle = {
    control: (base: any) => ({
      ...base,
      borderRadius: 29,
      height: 58,
    }),
  };

  const handleChangeType = (event: any) => {
    const target = event.target;
    const name = target.name;
    if (name === "type") {
      const value = target.value;
      props.setTypeValidation(value);
    }
  };

  async function fetchCustomer() {
    let data = await customerService.fetchCustomers();
    setCustomers(data);
  }

  customers.forEach((customer: any) => {
    clientOptions.push({
      value: customer.id,
      label: customer.companyName + " " + customer.lastName + " " + customer.firstName ,
    });
  });

  useEffect(() => {
    if (props.isReloadCustomer) {
      fetchCustomer()
    }
  }, [props.isReloadCustomer])

  useEffect(() => {
    customers.forEach((customer: any) => {
      clientOptions.push({
        value: customer.id,
        label: customer.companyName + " " + customer.lastName + " " + customer.firstName ,
      });
    });
  }, [customers])
  
  

  useEffect(() => {
    if (props.isClient) {
      setDefaultValue({
        ...defaultValue,
        ["value"]: props.defaultSelectIsClient.id,
        ["label"]:
          props.defaultSelectIsClient.firstName +
          " " +
          props.defaultSelectIsClient.lastName +
          " " +
          props.defaultSelectIsClient.companyName,
      });
    }
  }, [props.isClient]);

  useEffect(() => {
    console.log(props.isFilled)
  }, [props.isFilled])
  

  useEffect(() => {
    fetchCustomer();
  }, []);

  // useEffect(() => {
  //   if (selectedCustomer === null) {
  //     props.setIsFilled(false);
  //   } else {
  //     props.setIsFilled(true);
  //   }
  // }, [setCustomers]);

  useEffect(() => {
    if (props.defaultCustomer != null) {
      setIsEditMode(true);
      defaultValue.label =  props.defaultCustomer.companyName
      + " " +  props.defaultCustomer.lastName + " " + props.defaultCustomer.firstName;
      defaultValue.value = props.defaultCustomer.id;
    }
  }, [props.defaultCustomer]);

  return (
    <Form className="row g-3" onChange={handleChangeType}>
      <div className="row mb-3">
        <div className="col-md-8 mb-3"></div>
      </div>

      <div className="col-md-4 mb-3">
        <div className="row ava-partner">
          <div className="form-check">
            <CheckBox id="isNPAI" name="isNPAI" type="checkbox" label="NPAI" />
          </div>
        </div>
      </div>

      <div className="col-md-4 mb-3">
        <div className="row ava-partner">
          <Field id="type" name="type">
            {({ field, form: { touched, error }, meta }: any) => (
              <>
                <div className="form-check ava-partner-company">
                  <input
                    {...field}
                    id="societe"
                    value="SOCIETE"
                    checked={field.value === "SOCIETE"}
                    name="type"
                    type="radio"
                    className="form-check-input"
                  />
                  <label htmlFor="societe" className="form-check-label">
                    Société
                  </label>
                </div>

                <div className="form-check ava-partner-company">
                  <input
                    {...field}
                    id="particulier"
                    value="PARTICULIER"
                    name="type"
                    checked={field.value === "PARTICULIER"}
                    type="radio"
                    className="form-check-input"
                  />
                  <label htmlFor="particulier" className="form-check-label">
                    Particulier
                  </label>
                </div>
                {field.value === "PARTICULIER"
                  ? setIsParticular(true)
                  : setIsParticular(false)}
              </>
            )}
          </Field>
          <ErrorMessage name="type">
            {(msg) => <TextError msg={msg} />}
          </ErrorMessage>
        </div>
      </div>

      <div className="row my-4">
        <div className="col-md-4 mb-3">
          <TextField
            name="lastName"
            type="text"
            id="lastName"
            placeholder="Nom"
            label="Nom"
          />
        </div>

        <div className="col-md-4 mb-3">
          <TextField
            name="firstName"
            type="text"
            id="firstName"
            placeholder="Prénom(s)"
            label="Prénom(s)"
          />
        </div>

        <div className="col-md-4 mb-3">
          <TextField
            name="phone"
            type="text"
            id="phone"
            placeholder="N° téléphone"
            label="N° téléphone"
          />
        </div>

        <div className="col-md-4 mb-3">
          {!isParticular ? (
            <TextField
              name="companyName"
              type="text"
              id="companyName"
              placeholder="Raison sociale"
              label="Raison sociale"
            />
          ) : (
            ""
          )}
        </div>

        <div className="col-md-4 mb-3">
          <TextField
            name="service"
            type="text"
            id="service"
            placeholder="Service"
            label="Service"
          />
        </div>

        <div className="col-md-4 mb-4">
          <TextField
            name="city"
            type="text"
            id="city"
            placeholder="Ville"
            label="Ville"
          />
        </div>

        <div className="col-md-4 mb-4">
          <TextField
            name="addressOne"
            type="text"
            id="addressOne"
            placeholder="Adresse 1"
            label="Adresse 1"
          />
        </div>

        <div className="col-md-4 mb-4">
          <TextField
            name="addressTwo"
            type="text"
            id="addressTwo"
            placeholder="Adresse 2"
            label="Adresse 2"
          />
        </div>

        <div className="col-md-4">
          <TextField
            name="zipCode"
            type="text"
            id="zipCode"
            placeholder="Code postal"
            label="Code postal"
          />
        </div>

        <div className="col-md-8 mb-4">
          {props.isClient ? (
            <Select
              id="customerId"
              placeholder="Client"
              styles={selectStyle}
              // defaultValue={defaultValue}
              value={props.isClient ? defaultValue : ""}
              options={clientOptions}
              onChange={(customer: any) => {
                setSelectedCustomer(customer);
                if (customer != null) {
                  props.setCustomer({
                    ...props.customer,
                    ["id"]: customer.value,
                  });
                }
                if (customer === null) {
                  props.setIsFilled(false);
                } else {
                  props.setIsFilled(true);
                }
              }}
              isClearable
              isDisabled={props.isClient}
            />
          ) : (
            <Select
              id="customerId"
              placeholder="Client"
              styles={selectStyle}
              defaultValue={defaultValue}
              options={clientOptions}
              onChange={(customer: any) => {
                setSelectedCustomer(customer);
                if (customer != null) {
                  props.setCustomer({
                    ...props.customer,
                    ["id"]: customer.value,
                  });
                }
                console.log(customer)
                if (customer === null) {
                  props.setIsFilled(false);
                  console.log("null")
                } else {
                  props.setIsFilled(true);
                }
              }}
              isClearable
              isDisabled={props.isEdit}
            />
          )}

          {props.isFilled ? (
            ""
          ) : (
            <span style={{ color: "red", fontSize: "12px" }}>
              Veuillez séléctionner un client
            </span>
          )}
        </div>
      </div>

      <div className="ava-btn-action d-flex justify-content-around flex-wrap  mt-4">
        <button
          className="btn btn-secondary ava-btn-normal btn-cancel"
          data-bs-dismiss="modal"
          aria-label="Close"
          type="reset"
        >
          Annuler
          <i className="bi bi-x"></i>
        </button>
        <button type="submit" className="btn ava-btn-normal btn-save">
          Sauvegarder
          <i className="bi bi-check2"></i>
        </button>
      </div>
    </Form>
  );
};

export const yupValidationSchema = Yup.object({
  lastName: Yup.string()
    .min(2, "2 caractères au minimum")
    .max(30, "30 caractères au maximum")
    .required("* Ce champ est obligatoire"),
  firstName: Yup.string()
    .min(2, "2 caractères au minimum")
    .max(30, "30 caractères au maximum")
    .required("* Ce champ est obligatoire"),
  companyName: Yup.string()
    .min(2, "2 caractères au minimum")
    .max(30, "30 caractères au maximum"),
  phone: Yup.string()
    // .matches(
    //   /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, //regex pour le numéro français
    //   "Veuillez entre un numéro valide"
    // )
    .required("* Ce champ est obligatoire"),
  customerId: Yup.string().required("* Ce champ est obligatoire"),
  addressOne: Yup.string()
    .min(3, "3 caractères au minimum")
    .max(30, "100 caractères au maximum")
    .required("* Ce champ est obligatoire"),
  addressTwo: Yup.string()
    .min(3, "3 caractères au minimum")
    .max(30, "100 caractères au maximum"),
  zipCode: Yup.number()
    .typeError("Veuillez saisir des nombres")
    .min(3, "3 caractères au minimum")
    .required("* Ce champ est obligatoire"),
  city: Yup.string()
    .min(2, "2 caractères au minimum")
    .max(30, "100 caractères au maximum")
    .required("* Ce champ est obligatoire"),
  type: Yup.string().required("Veuillez choisir le type du destinataire"),
  isNPAI: Yup.boolean(),
});

export const yupValidationSchemaSociete = Yup.object({
  lastName: Yup.string()
    .min(2, "2 caractères au minimum")
    .max(30, "30 caractères au maximum")
    .required("* Ce champ est obligatoire"),
  firstName: Yup.string()
    .min(2, "2 caractères au minimum")
    .max(30, "30 caractères au maximum")
    .required("* Ce champ est obligatoire"),
  companyName: Yup.string()
    .min(2, "2 caractères au minimum")
    .max(30, "30 caractères au maximum")
    .required("* Ce champ est obligatoire"),
  phone: Yup.string()
    // .matches(
    //   /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, //regex pour le numéro français
    //   "Veuillez entre un numéro valide"
    // )
    .required("* Ce champ est obligatoire"),
  customerId: Yup.string().required("* Ce champ est obligatoire"),
  addressOne: Yup.string()
    .min(3, "3 caractères au minimum")
    .max(30, "100 caractères au maximum")
    .required("* Ce champ est obligatoire"),
  addressTwo: Yup.string()
    .min(3, "3 caractères au minimum")
    .max(30, "100 caractères au maximum"),
  zipCode: Yup.number()
    .typeError("Veuillez saisir des nombres")
    .min(3, "3 caractères au minimum")
    .required("* Ce champ est obligatoire"),
  city: Yup.string()
    .min(2, "2 caractères au minimum")
    .max(30, "100 caractères au maximum")
    .required("* Ce champ est obligatoire"),
  type: Yup.string().required("Veuillez choisir le type du client"),
  isNPAI: Yup.boolean(),
});
