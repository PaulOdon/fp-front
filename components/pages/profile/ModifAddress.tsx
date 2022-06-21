import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { updateCustomer } from "../../../services/customer.service";

const ModifAddress = (props: any) => {
  const [formValue, setFormValue] = useState({
    addressOne: props.customerInfo?.addressOne,
    addressTwo: props.customerInfo?.addressTwo,
    city: props.customerInfo?.city,
    companyName: props.customerInfo?.companyName,
    firstName: props.customerInfo?.firstName,
    isActif: props.customerInfo?.isActif,
    lastName: props.customerInfo?.lastName,
    phone: props.customerInfo?.phone,
    type: props.customerInfo?.type,
    zipCode: props.customerInfo?.zipCode
  })

  useEffect(() => {
  }, [props.customerInfo]);

  useEffect(() => {
   
  }, [formValue])
  

  const handleChange = (e: any) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setFormValue({...formValue, [name]: value})
  }

  return (
    <div className="tab-pane fade pt-3" id="adresse-edit">
      <Formik
        initialValues={formValue}
        enableReinitialize={true}
        validationSchema={ValidationSchema}
        onSubmit={(values, { resetForm }) => {

            updateCustomer(props.customerInfo.id, values)
            .then((res) => {
                props.setCustomerInfo(res)
                toast.success("La modification a été effectuer avec success")
            })
            .catch((err) => {
              console.log(err)
              toast.error("Il y a une erreur lors de la modification")
            })
        }}
      >
        <Form>
        <div className="row my-4">
          <div className="col-md-4">
            <div className="form-floating">
              <input
                type="text"
                className="form-control ava-form"
                id="addressOne"
                placeholder="Adresse 1"
                name="addressOne"
                value={formValue.addressOne}
                onChange={handleChange}
              />
              <label htmlFor="addressOne">
                Adresse 1
              </label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating">
              <input
                type="text"
                className="form-control ava-form"
                id="addressTwo"
                name="addressTwo"
                placeholder="Adresse 2"
                value={formValue.addressTwo}
                onChange={handleChange}
              />
              <label htmlFor="addressTwo">
                Adresse 2
              </label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating">
              <input
                type="text"
                className="form-control ava-form"
                id="city"
                name="city"
                placeholder="City"
                value={formValue.city}
                onChange={handleChange}
              />
              <label htmlFor="city">
                Ville
              </label>
            </div>
          </div>
        </div>
        <div className="row my-4">
          <div className="col-md-4">
            <div className="form-floating">
              <input
                type="text"
                className="form-control ava-form"
                id="firstName"
                name="firstName"
                placeholder="Nom"
                value={formValue.firstName}
                onChange={handleChange}
              />
              <label htmlFor="firstName">
                Nom
              </label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating">
              <input
                type="text"
                className="form-control ava-form"
                id="lastName"
                name="lastName"
                placeholder="Prenom"
                value={formValue.lastName}
                onChange={handleChange}
              />
              <label htmlFor="lastName">
                Prenom
              </label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating">
              <input
                type="text"
                className="form-control ava-form"
                id="companyName"
                name="companyName"
                placeholder="Raison Social"
                value={formValue.companyName}
                onChange={handleChange}
              />
              <label htmlFor="companyName">
                Raison Social
              </label>
            </div>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-md-4">
            <div className="form-floating">
              <input
                type="text"
                className="form-control ava-form"
                id="phone"
                name="phone"
                placeholder="Téléphone"
                value={formValue.phone}
                onChange={handleChange}
              />
              <label htmlFor="phone">
                Téléphone
              </label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating">
              <input
                type="text"
                className="form-control ava-form"
                id="zipCode"
                name="zipCode"
                placeholder="zipCode"
                value={formValue.zipCode}
                onChange={handleChange}
              />
              <label htmlFor="zipCode">
                ZipCode
              </label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating">
                <select 
                className="form-control ava-form"
                id="type"
                name="type"
                placeholder="Type"
                value={formValue.type}
                onChange={handleChange}
                >
                    <option value="SOCIETE">Société</option>
                    <option value="PARTICULIER">Particulier</option>
                </select>
                <label htmlFor="type">
                Type
              </label>
              {/* <input
                type="text"
                className="form-control ava-form"
                id="type"
                name="type"
                placeholder="Type"
                value={formValue.type}
                onChange={handleChange}
              />
              <label htmlFor="type">
                Type
              </label> */}
            </div>
          </div>
        </div>

        <div className="ava-btn-action d-flex justify-content-end flex-wrap  mt-4">
          {/* <a href="#" className="btn btn-secondary ava-btn-normal btn-cancel">
            Annuler
            <i className="bi bi-x"></i>
          </a> */}
          <button type="submit" className="btn btn-primary ava-btn-normal btn-save">
            Sauvegarder
            <i className="bi bi-check2"></i>
          </button>
        </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ModifAddress;

const ValidationSchema = Yup.object({
    lastName: Yup.string()
      .min(2, "2 caractères au minimum")
      .max(30, "30 caractères au maximum")
      .required("*"),
    firstName: Yup.string()
      .min(2, "2 caractères au minimum")
      .max(30, "30 caractères au maximum")
      .required("*"),
    companyName: Yup.string()
      .min(2, "2 caractères au minimum")
      .max(30, "30 caractères au maximum")
      .required("*"),
    phone: Yup.string()
      // .matches(
      //   /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, //regex pour le numéro français
      //   "Veuillez entre un numéro valide"
      // )
      .required("*"),
    addressOne: Yup.string()
      .min(3, "3 caractères au minimum")
      .max(30, "100 caractères au maximum")
      .required("*"),
    addressTwo: Yup.string()
      .min(3, "3 caractères au minimum")
      .max(30, "100 caractères au maximum"),
    zipCode: Yup.number()
      .typeError("Veuillez saisir des nombres")
      .min(3, "3 caractères au minimum")
      .required("*"),
    city: Yup.string()
      .min(2, "2 caractères au minimum")
      .max(30, "100 caractères au maximum")
      .required("*"),
    type: Yup.string().required("Veuillez choisir le type du client"),
    isActif: Yup.boolean(),
  });
  