import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { patchUserById } from "../../../services/user.service";

const ModifProfile = (props: any) => {

    const [formValue, setFormValue] = useState({
        firstName: "",
        lastName: "",
        id: "",
        phone: "",
        service: "",
        email: "",
        roleId: 0,
        isActif: false
      })
    
      useEffect(() => {
        //   console.log(user)
      }, [formValue, props.userInfo])

      useEffect(() => {
        setFormValue({...formValue,
			['firstName']: props.user.firstName,
			['lastName']:  props.user.lastName,
			['id']:  props.user.id,
			['phone']:  props.user.phone,
			['service']:  props.user.service,
			['email']:  props.user.email,
			['roleId']:  props.user.roleId,
			['isActif']:  props.user.isActif,
		})
      }, [])
      

    const onSubmitForm = (e: any) => {
        e.preventDefault()
      let data = {} as any
      const id = formValue.id
      data = formValue;
      delete data.id
      if (data.role) {
          delete data.customers
          delete data.role
      }
      patchUserById(+id, data)
      .then((res) => {
          setFormValue(res)
          props.setUserInfo(res)
          console.log(res)
          toast.success("Le profile a été modifier avec success")
      })
      .catch((err)=>{
          console.log(err)
          toast.error("Il y une erreur lors de la modification")
      })

}

const handleChangeInput = (e: any) => {
      const target = e.target;
      const name = target.name;
      const value = target.value;
      setFormValue({...formValue, [name]: value})
}


  return (
    <div
    className="tab-pane fade profile-edit pt-3"
    id="profile-edit"
  >
    <form onSubmit={onSubmitForm}>
      <div className="row my-4">
        <div className="col-md-12  col-lg-12  mb-3">
          <div className="form-floating">
            <input
              type="text"
              className="form-control ava-form"
              id="floatingName"
              placeholder="Nom"
              name="firstName"
              value={formValue.firstName}
              onChange={handleChangeInput}
              required
            />
            <label htmlFor="floatingName">Nom</label>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <div className="col-md-12  col-lg-12 mb-3">
          <div className="form-floating">
            <input
              type="text"
              className="form-control ava-form"
              id="floatingFirstName"
              placeholder="Prénom(s)"
              name="lastName"
              value={formValue.lastName}
              onChange={handleChangeInput}
              required
            />
            <label htmlFor="floatingFirstName">Prénom(s)</label>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <div className="col-md-12  col-lg-12 mb-3">
          <div className="form-floating">
            <input
              type="email"
              className="form-control ava-form"
              id="floatingEmail"
              placeholder="Adresse e-mail"
              name="email"
              value={formValue.email}
              onChange={handleChangeInput}
              required
            />
            <label htmlFor="floatingEmail">Adresse e-mail</label>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-12  col-lg-12 mb-3">
          <div className="form-floating">
            <input
              type="text"
              className="form-control ava-form"
              id="floatingPhone1"
              placeholder="Numéro télephone"
              name="phone"
              value={formValue.phone}
              onChange={handleChangeInput}
              required
            />
            <label htmlFor="floatingPhone1">Numéro télephone</label>
          </div>
        </div>
      </div>
      <div className="ava-btn-action d-flex justify-content-around flex-wrap  mt-4">
        <button
          type="reset"
          className="btn btn-secondary ava-btn-normal btn-cancel"
        >
          Annuler
          <i className="bi bi-x"></i>
        </button>
        <button
          type="submit"
          className="btn btn-primary ava-btn-normal btn-save"
        >
          Sauvegarder
          <i className="bi bi-check2"></i>
        </button>
      </div>
    </form>
    </div>
  );
};

export default ModifProfile;
