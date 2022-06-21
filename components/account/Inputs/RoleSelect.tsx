import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { getAllRoles } from "../../../services/role.service";
import TextError from "./TextError";
import Select from "react-select";

const RoleSelect = (props: any) => {
  const [allRoles, setAllRole] = useState([]);
  const [isEdit, setIsEdit] = useState(false)  

  useEffect(() => {
    getAllRole();
    
  }, []);

  useEffect(() => {
    if (props.userDetails?.roleId != null) {
      const val = props.userDetails.role.name
      setIsEdit(true)
      switch (val) {
        case "Coursier":
          props.setTypeRoles({
            admin: false,
            coursier: true,
            client: false,
          })
          allRoles.map((role: any, index) => {
            if(role.name === val){
                props.setRoleId(role.id)
            }
          })
          break;
        case "Client":
          props.setTypeRoles({
            admin: false,
            coursier: false,
            client: true,
          })
          allRoles.map((role: any, index) => {
            if(role.name === val){
                props.setRoleId(role.id)
            }
          })
            break;
        case "Admin":
          props.setTypeRoles({
            admin: true,
            coursier: false,
            client: false,
          })
          allRoles.map((role: any, index) => {
            if(role.name === val){
                props.setRoleId(role.id)
            }
          })
            break;
        default:
          break;
      }
    }
  }, [props.userDetails])
  

  useEffect(() => {
    // console.log(typeRoles);
  }, [props.typeRoles, isEdit]);

  const getAllRole = () => {
    getAllRoles()
      .then((res) => {
        setAllRole(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChangeRoleType = (e: any) => {
    const target = e.target;
    const value = target.value;
    const checked = target.checked;

    switch (value) {
      case "Coursier":
        props.setTypeRoles({
          admin: false,
          coursier: true,
          client: false,
        })
        allRoles.map((role: any, index) => {
          if(role.name === value){
              props.setRoleId(role.id)
          }
        })
        break;
      case "Client":
        props.setTypeRoles({
          admin: false,
          coursier: false,
          client: true,
        })
        allRoles.map((role: any, index) => {
          if(role.name === value){
              props.setRoleId(role.id)
          }
        })
          break;
      case "Admin":
        props.setTypeRoles({
          admin: true,
          coursier: false,
          client: false,
        })
        allRoles.map((role: any, index) => {
          if(role.name === value){
              props.setRoleId(role.id)
          }
        })
          break;
      default:
        break;
    }
  };

  return (
    <div className="form-floating mb-3">
      <div className="form-floating mb-3">
        <div className="d-flex flex-rows flex-wrap justify-content-around">
          {
              allRoles.map((role: any, index) => {
                return(
                  <Fragment key={index}>
                    <div className="form-check" hidden={isEdit && role.id != props.userDetails?.roleId ? true : false}>
                        <input
                        className={`form-check-input`}
                        type="radio"
                        name="typeRoles"
                        id={`flexRadioDefault${index}`}
                        value={role.name}
                        onChange={onChangeRoleType}
                        defaultChecked={role.id === props.userDetails?.roleId ? true : false}

                      />
                      <label
                        style={{ color: "#1b599e" }}
                        className="form-check-label"
                        htmlFor={`flexRadioDefault${index}`}
                      >
                        {role.name}
                      </label>
                    </div>
                </Fragment>
                )
              })
            }    
        </div>
      </div>
      {/* <Field
        className="form-select ava-form"
        id="floatingSelectRule"
        name="roleId"
        as="select"
      >
        <option value="">Choisissez un rôle</option>
        {allRoles?.map(({ id, name }) => {
          return (
            <option key={id} value={id} disabled={setValueOption(name)}>
              {name}
            </option>
          );
        })}
      </Field>
      <label htmlFor="floatingSelectRule">Rôle</label>
      <ErrorMessage name="roleId">
        {(msg) => <TextError msg={msg} />}
      </ErrorMessage> */}
    </div>
  );
};

export default RoleSelect;
