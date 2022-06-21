import Link from "next/link";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import Layout from "../../../components/layouts/layout";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { CourseForm } from "../../../components/pages/course/CourseForm";
import * as customerService from "../../../services/customer.service";
import {
  getAllReceivers,
  getAllReceiversByClientId,
} from "../../../services/receiver.service";
import { postDemande } from "../../../services/demande.service";
import { toast } from "react-toastify";
import { getAllStatus } from "../../../services/status.service";
import { useAuth } from "../../../context/auth/UseAuth";

const CreateCourse: FunctionComponent = (props: any) => {
  const { user } = useAuth();
  const router = useRouter();
  const [allCustomers, setAllCustomers] = useState([]);
  const [allReceivers, setAllReceivers] = useState([]);
  const [infoSender, setInfoSender] = useState({
    lastNameSender: "",
    firstNameSender: "",
    companyNameSender: "",
    serviceSender: "",
    phoneSender: "",
    addressOnSender: "",
    addressTwoSender: "",
    zipCodeSender: "",
    citySender: "",
    customerId: 0,
  });
  const [infoReceiver, setInfoReceiver] = useState({
    lastNameReceiver: "",
    firstNameReceiver: "",
    companyNameReceiver: "",
    serviceReceiver: "",
    phoneReceiver: "",
    addressOnReceiver: "",
    addressTwoReceiver: "",
    zipCodeReceiver: "",
    cityReceiver: "",
    receiverId: 0,
  });
  const [mailInfo, setMailInfo] = useState({
    pickupDate: "",
    deliveryDate: "",
    type: "",
    courseId: 0,
    isActif: false,
  });
  const [clearSelect, setClearSelect] = useState(false);
  const [draftStatus, setDraftStatus] = useState();

  const [isClient, setIsClient] = useState(false);
  const [defaultSelectIsClient, setDefaultSelectIsClient] = useState({} as any);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user.role?.name === "Client") {
      fetchAllReceiverByClientId();
    }
    if (user.role?.name != "Client") {
      fetchAllReceiver();
    }
    fetchAllCustomer();
    fetchAllStatus();
  }, [isClient]);

  useEffect(() => {
    if (user.role.name === "Client") {
      setIsClient(true);
      setDefaultSelectIsClient(user.customers[0]);
      setInfoSender({
        ...infoSender,
        ["lastNameSender"]: user.customers[0].lastName,
        ["firstNameSender"]: user.customers[0].firstName,
        ["companyNameSender"]: user.customers[0].companyName,
        ["serviceSender"]:
          user.customers[0].service === undefined
            ? "null"
            : user.customers[0].service,
        ["phoneSender"]: user.customers[0].phone,
        ["addressOnSender"]: user.customers[0].addressOne,
        ["addressTwoSender"]: user.customers[0].addressTwo,
        ["zipCodeSender"]: user.customers[0].zipCode,
        ["citySender"]: user.customers[0].city,
        ["customerId"]: user.customers[0].id,
      });
    }
  }, []);

  useEffect(() => {}, [allCustomers, allReceivers, isLoading]);

  useEffect(() => {}, [infoReceiver, infoSender, draftStatus]);

  const fetchAllReceiverByClientId = () => {
    getAllReceiversByClientId(user.customers[0].id)
      .then((res) => {
        setAllReceivers(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAllReceiver = () => {
    getAllReceivers()
      .then((res) => {
        setAllReceivers(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAllCustomer = () => {
    customerService
      .fetchCustomers()
      .then((res) => {
        setAllCustomers(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const initCoursForm = {
    comment: "",
    numero: "",
    createDate: new Date().toISOString(),
    deliveryManId: user.id,
    creatorId: user.id,
    statusId: draftStatus,
    customerId: 0,
    receiverId: 0,
  };

  const makeNumeroCourse = () => {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 12; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  };

  const fetchAllStatus = () => {
    getAllStatus()
      .then((res) => {
        res.map((stat: any) => {
          stat.name === "Brouillon" ? setDraftStatus(stat.id) : "";
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout>
      <div className="pagetitle">
        <h1>Création d'une demande d'envoi</h1>
      </div>

      <section className="section customer">
        <div className="row">
          <div className="modal-body">
            <div className="card custom-card">
              <Formik
                initialValues={initCoursForm}
                enableReinitialize={true}
                onSubmit={(values, { resetForm }) => {
                  values.numero = makeNumeroCourse();
                  const course = values;
  
                  if (
                    infoSender.firstNameSender.length != 0 &&
                    infoReceiver.firstNameReceiver.length
                  ) {
                    const infoSenderReceiver = Object.assign(
                      infoSender,
                      infoReceiver
                    ) as any;
                    infoSenderReceiver.pickupDate = null;
                    infoSenderReceiver.deliveryDate = null;
                    infoSenderReceiver.type = "SOCIETE";
                    infoSenderReceiver.isActif = true;
                    course.customerId = infoSender.customerId;
                    course.receiverId = infoReceiver.receiverId;

                    delete infoSenderReceiver.customerId;
                    delete infoSenderReceiver.receiverId;

                    postDemande(course, infoSenderReceiver)
                      .then((res) => {
                        setIsLoading(true)
                        toast.success("La demande a été créée avec succès");
                        router.push(`/course/${res.numero}`);
                      })
                      .catch((err) => {
                        toast.error(
                          "Il y a une erreur lors de la création de la demande"
                        );
                        console.log(err);
                      });
                  }
                }}
              >
                <CourseForm
                  infoSender={infoSender}
                  clearSelect={clearSelect}
                  setInfoSender={setInfoSender}
                  setInfoReceiver={setInfoReceiver}
                  allCustomers={allCustomers}
                  allReceivers={allReceivers}
                  isClient={isClient}
                  defaultSelectIsClient={defaultSelectIsClient}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CreateCourse;
