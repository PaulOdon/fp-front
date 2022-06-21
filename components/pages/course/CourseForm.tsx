import { Form, Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { TextError } from "../../shared/error/TextError";
import TextField from "../../shared/input/TextField";
import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import TextArea from "../../shared/input/TextArea";
import CreateReceiver from "../../../pages/receiver/add";
import CreateCustomer from "../../../pages/customer/add";
import Can from "../../../context/auth/Can";
import { useAuth } from "../../../context/auth/UseAuth";
import { getAllReceiversByClientId } from "../../../services/receiver.service";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const CourseForm = (props: any) => {
  const [typeOptions, setTypeOptions] = useState([{} as any]);
  const [typeOptionsReceiver, setTypeOptionsReceiver] = useState([{} as any]);
  const [userRole, setUserRole] = useState("");
  const [clientNotSelected, setClientNotSelected] = useState(true)
  const [listReceiver, setListReceiver] = useState([])

  const [idInputCustomer, setIdInputCustomer] = useState()
  const [idInputReceiver, setIdInputReceiver] = useState()

  const [customerValue, setCustomerValue] = useState()
  const [receiverValue, setReceiverValue] = useState()

  const [isReloadCustomer, setIsReloadCustomer] = useState(false)


  const selectStyle = {
    control: (base: any) => ({
      ...base,
      borderRadius: "2.25rem",
      padding: "0.55rem 0.55rem",
    }),
  };

  const lastestCreatedCustomer = (customer: any) => {
    const temp_customers = [...props.allCustomers];
    temp_customers.unshift(customer);
    addAllCustomersInSelect(temp_customers);
    // add value in select
    props.setInfoSender({
      ...props.infoSender,
      ["lastNameSender"]: customer["lastName"],
      ["firstNameSender"]: customer["firstName"],
      ["companyNameSender"]: customer["companyName"],
      ["serviceSender"]:
        customer["service"] === undefined ? "null" : customer["service"],
      ["phoneSender"]: customer["phone"],
      ["addressOnSender"]: customer["addressOne"],
      ["addressTwoSender"]: customer["addressTwo"],
      ["zipCodeSender"]: customer["zipCode"],
      ["citySender"]: customer["city"],
      ["customerId"]: customer["id"],
    });
    setCustomerValue(customer)
    fetchAllreceiverByCustomer(customer.id)
  };

  const lastestCreatedReceiver = (receiver: never) => {
    let temp_receivers = [] as any
    if (props.isClient) {
      temp_receivers = [...props.allReceivers];
    }else{
      temp_receivers = [...listReceiver];
    }
    
    temp_receivers.unshift(receiver);
    addAllReceiversInSelect(temp_receivers);
    props.setInfoReceiver({
      ...props.infoReceiver,
      ["lastNameReceiver"]: receiver["lastName"],
      ["firstNameReceiver"]: receiver["firstName"],
      ["companyNameReceiver"]: receiver["companyName"],
      ["serviceReceiver"]: receiver["service"],
      ["phoneReceiver"]: receiver["phone"],
      ["addressOnReceiver"]: receiver["addressOne"],
      ["addressTwoReceiver"]: receiver["addressTwo"],
      ["zipCodeReceiver"]: receiver["zipCode"],
      ["cityReceiver"]: receiver["city"],
      ["receiverId"]: receiver["id"],
    });
    setReceiverValue(receiver)
  };

  useEffect(() => {
    addAllCustomersInSelect(props.allCustomers);
  }, [props.allCustomers]);

  useEffect(() => {
    addAllReceiversInSelect(props.allReceivers);
  }, [props.allReceivers]);

  const addAllCustomersInSelect = (allcustomer: any) => {
    allcustomer?.map((customer: any) => {
      customer.value = customer.id;
      customer.label = customer.firstName;
    });
    setTypeOptions(allcustomer);
  };

  const addAllReceiversInSelect = (allreceiver: any) => {
    allreceiver.map((receiver: any) => {
      receiver.value = receiver.id;
      receiver.label = receiver.firstName;
    });
    setTypeOptionsReceiver(allreceiver);
  };

  useEffect(() => {
    if (idInputCustomer) {
      setClientNotSelected(false)
    }
  }, [idInputCustomer])
  

  useEffect(() => {
  
  }, [clientNotSelected, listReceiver, props.isLoading])

  const newReceiver = () => {
    setIsReloadCustomer(true)
  }
  

  const handleChangeInputSender = (sender: any) => {
    if (sender?.lastName.length > 0) {
      setClientNotSelected(false)
      props.setInfoReceiver(null)
      props.setInfoSender({
        ...props.infoSender,
        ["lastNameSender"]: sender["lastName"],
        ["firstNameSender"]: sender["firstName"],
        ["companyNameSender"]: sender["companyName"],
        ["serviceSender"]:
          sender["service"] === undefined ? "null" : sender["service"],
        ["phoneSender"]: sender["phone"],
        ["addressOnSender"]: sender["addressOne"],
        ["addressTwoSender"]: sender["addressTwo"],
        ["zipCodeSender"]: sender["zipCode"],
        ["citySender"]: sender["city"],
        ["customerId"]: sender["id"],
      });
      setCustomerValue(sender)
      fetchAllreceiverByCustomer(sender.id)
    }
  };

  const fetchAllreceiverByCustomer = async (id: any) =>{
    const response = await getAllReceiversByClientId(id)
    setListReceiver(response)
    addAllReceiversInSelect(response)
  }

  const handleChangeInputReceiver = (receiver: any) => {
    if (receiver?.lastName.length > 0) {
      props.setInfoReceiver({
        ...props.infoReceiver,
        ["lastNameReceiver"]: receiver["lastName"],
        ["firstNameReceiver"]: receiver["firstName"],
        ["companyNameReceiver"]: receiver["companyName"],
        ["serviceReceiver"]: receiver["service"],
        ["phoneReceiver"]: receiver["phone"],
        ["addressOnReceiver"]: receiver["addressOne"],
        ["addressTwoReceiver"]: receiver["addressTwo"],
        ["zipCodeReceiver"]: receiver["zipCode"],
        ["cityReceiver"]: receiver["city"],
        ["receiverId"]: receiver["id"],
      });
      setReceiverValue(receiver)
    }
  };

  return (
    <>
      <Form className="row g-3">
        {
          props.isLoading
          ? <>
              <div className="row my-3 align-items-center">
                <div className="col-md-9">
                  <Skeleton count={1} height={60} width={800} />
                </div> 
                <div className="col-md-3">
                  <Skeleton count={1} height={60} />
                </div> 
              </div>
              <div className="row my-3 align-items-center">
                <div className="col-md-9">
                  <Skeleton count={1} height={60} width={800} />
                </div> 
                <div className="col-md-3">
                  <Skeleton count={1} height={60} />
                </div> 
              </div>
              <div className="col-md-12">
                <h5 className="section-title">Information supplémentaire</h5>
              </div>
              <div className="row my-3">
                <div className="col-12">
                  <Skeleton count={1} height={100} />
                </div>
              </div>
              <div className="text-center">
                <div >
                  <Skeleton count={1} height={60} width={150} />
                </div>
              </div>
            </>
          :<>
            <div className="row my-3 align-items-center">
              <div className={"col-md-9"}>
                <div className="col-md-12">
                  <div className="form-floating">
                    {props.isClient ? (
                      <Select
                        isClearable
                        options={typeOptions}
                        getOptionLabel={(option) =>
                          `${option.firstName} ${option.lastName}, ${option.companyName}, ${option.addressOne}`
                        }
                        styles={selectStyle}
                        isSearchable
                        placeholder="Adresse d'enlèvement"
                        onChange={handleChangeInputSender}
                        value={props.isClient ? props.defaultSelectIsClient : ""}
                        isDisabled={props.isClient}
                      />
                    ) : (
                      <Select
                        isClearable
                        options={typeOptions}
                        getOptionLabel={(option) =>
                          `${option.firstName} ${option.lastName}, ${option.companyName}, ${option.addressOne}`
                        }
                        styles={selectStyle}
                        value={customerValue}
                        isSearchable
                        placeholder="Adresse d'enlèvement"
                        onChange={handleChangeInputSender}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <Can permissions={["user:read"]}>
                  <button
                    type="button"
                    className="btn btn-info ava-btn-normal btn-create"
                    data-bs-toggle="modal"
                    data-bs-target="#modalCustomer"
                  >
                    <i className="bi bi-plus-circle-fill"></i> Nouveau client
                  </button>
                </Can>
              </div>
            </div>
            <div className="row my-3 align-items-center">
              <div className={"col-md-9"}>
                <div className="col-md-12">
                  <div className="form-floating">
                    {props.isClient ? (
                      <Select
                      isClearable
                      options={typeOptionsReceiver}
                      styles={selectStyle}
                      getOptionLabel={(option) =>
                        `${option.label} ${option.lastName}, ${option.companyName}, ${option.addressOne}`
                      }
                      name="livraison"
                      placeholder="Adresse de livraison"
                      onChange={handleChangeInputReceiver}
                      value={receiverValue}
                    />
                    ) : (
                      <Select
                      isClearable
                      options={typeOptionsReceiver}
                      styles={selectStyle}
                      getOptionLabel={(option) =>
                        `${option.label} ${option.lastName}, ${option.companyName}, ${option.addressOne}`
                      }
                      name="livraison"
                      placeholder="Adresse de livraison"
                      onChange={handleChangeInputReceiver}
                      value={receiverValue}
                      isDisabled={clientNotSelected}
                    />
                    )}
                  
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <button
                  type="button"
                  onClick={newReceiver}
                  className="btn btn-info ava-btn-normal btn-create"
                  data-bs-toggle="modal"
                  data-bs-target="#modalReceiver"
                >
                  <i className="bi bi-plus-circle-fill"></i> Nouveau destinataire
                </button>
              </div>
            </div>
            <div className="col-md-12">
              <h5 className="section-title">Information supplémentaire</h5>
            </div>
            <div className="row my-3">
              <div className="col-12">
                <TextArea
                  name="comment"
                  id="floatingTextarea"
                  placeholder="Commentaire(s) ..."
                  label="Commentaire(s) ..."
                />
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn ava-btn-normal btn-save">
                Valider la création
                <i className="bi bi-check2"></i>
              </button>
            </div>
          </>
        }

      </Form>

      <CreateCustomer
        id="modalCustomer"
        lastestCreatedCustomer={lastestCreatedCustomer}
        setIdInputCustomer={setIdInputCustomer}
        isFormCourse={true}
      />

      <CreateReceiver
        id="modalReceiver"
        lastestCreatedReceiver={lastestCreatedReceiver}
        setIdInputReceiver={setIdInputReceiver}
        isReloadCustomer={isReloadCustomer}
        isFormCourse={true}
      />
    </>
  );
};
