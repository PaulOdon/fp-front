import { Field, ErrorMessage, Form } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { TextError } from "../../shared/error/TextError";
import CheckBox from "../../shared/input/CheckBox";
import TextField from "../../shared/input/TextField";

const CustomerForm = (props: any) => {
  const handleChangeType = (event: any) => {
    const target = event.target;
    const name = target.name;
    if (name === "type") {
      const value = target.value;
      props.setTypeValidation(value);
    }
  };

  return (
    <Form className="row g-3" onChange={handleChangeType}>
      <div className="row mb-3">
        <div className="col-md-8 mb-3"></div>
      </div>

      <div className="col-md-4 mb-3">
        <div className="row ava-partner">
          <div className="form-check">
            <CheckBox
              id="isActif"
              name="isActif"
              type="checkbox"
              label="Actif"
            />
          </div>
        </div>
      </div>

      <div className="col-md-4 mb-3">
        <div className="row ava-partner">
          <div className="form-check ava-partner-company">
            <Field
              id="type"
              name="type"
              type="radio"
              value="SOCIETE"
              className="form-check-input"
            />
            <label className="form-check-label" htmlFor="type">
              Société
            </label>
          </div>
          <div className="form-check ava-partner-particular">
            <Field
              id="type"
              name="type"
              type="radio"
              value="PARTICULIER"
              className="form-check-input"
            />
            <label className="form-check-label" htmlFor="type">
              Particulier
            </label>
          </div>
          <ErrorMessage name="type">
            {(msg) => <TextError msg={msg} />}
          </ErrorMessage>
        </div>
      </div>

      <div className="col-md-4 mb-3"></div>

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

        <div className="col-md-4 mb-4">
          <TextField
            name="companyName"
            type="text"
            id="companyName"
            placeholder="Raison sociale"
            label="Raison sociale"
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

        <div className="col-md-4 mb-4">
          <div className="form-floating">
            <TextField
              name="addressOne"
              type="text"
              id="addressOne"
              placeholder="Adresse 1"
              label="Adresse 1"
            />
          </div>
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
            name="email"
            type="email"
            id="email"
            placeholder="email"
            label="Email"
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

        <div className="col-md-4 mb-4">
          <TextField
            name="city"
            type="text"
            id="city"
            placeholder="Ville"
            label="Ville"
          />
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

export default CustomerForm


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
    .max(30, "30 caractères au maximum")
    .required("* Ce champ est obligatoire"),
  phone: Yup.string()
    // .matches(
    //   /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, //regex pour le numéro français
    //   "Veuillez entre un numéro valide"
    // )
    .required("* Ce champ est obligatoire"),
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
  email: Yup.string()
      .email("Invalid email address")
      .required("Champs Obligatoire"),
  type: Yup.string().required("Veuillez choisir le type du client"),
  isActif: Yup.boolean(),
  
});

export const yupValidationSchemaParticulier = Yup.object({
  lastName: Yup.string()
    .min(2, "2 caractères au minimum")
    .max(30, "30 caractères au maximum")
    .required("* Ce champ est obligatoire"),
  firstName: Yup.string()
    .min(2, "2 caractères au minimum")
    .max(30, "30 caractères au maximum")
    .required("* Ce champ est obligatoire"),
  // companyName: Yup.string()
  //   .min(2, "2 caractères au minimum")
  //   .max(30, "30 caractères au maximum")
  //   .required("* Ce champ est obligatoire"),
  phone: Yup.string()
    // .matches(
    //   /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, //regex pour le numéro français
    //   "Veuillez entre un numéro valide"
    // )
    .required("* Ce champ est obligatoire"),
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
  email: Yup.string()
      .email("Invalid email address")
      .required("Champs Obligatoire"),
  type: Yup.string().required("Veuillez choisir le type du client"),
  isActif: Yup.boolean(),
});
