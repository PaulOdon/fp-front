import React, { Fragment, useContext, useEffect, useState } from "react";
import Layout from "../../../components/layouts/layout";
import Link from "next/link";
import { getCourseById, putCourse, getCourseByNumero } from "../../../services/course.service";
import { getMailByCourseId } from "../../../services/mail.service";
import { putMail } from "../../../services/mail.service";
import CourseEtat from "../../../components/pages/course/CourseEtat";
import QRCode from "qrcode.react";
import { getAllStatus } from "../../../services/status.service";
import styles from "./Index.module.scss";
import InfoEnlevement from "../../../components/pages/course/InfoEnlevement";
import InfoLivraison from "../../../components/pages/course/InfoLivraison";
import PreuveLivraison from "../../../components/pages/course/PreuveLivraison";
import HistoriqueAction from "../../../components/pages/course/HistoriqueAction";
import { deletCourse } from "../../../services/course.service";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Etiquette from "../../../components/pages/course/Etiquette";
import Swal from "sweetalert2";
import SuiviPdf from "../../../components/pages/course/SuiviPdf";
import { useAuth } from "../../../context/auth/UseAuth";
import Can from "../../../context/auth/Can";


const DetailsCourse = () => {
  const [courseDetails, setCourseDetails] = useState({} as any);
  const [mailDetails, setMailDetails] = useState({} as any);
  const [statusChanged, setStatusChanged] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [allStatus, setAllStatus] = useState([{} as any]);
  const [qrImg, setQrImg] = useState("")
  const { user } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    if (user.role?.name === "Client") {
      setIsClient(true)
    }
  }, [isClient])
  

  useEffect(() => {
    getAllInformation(router.query.id);
    fetchAllStatus();
  }, [router.query.id, statusChanged]);

  useEffect(() => {
    downloadQRCode();
  });

  const fetchAllStatus = () => {
    getAllStatus()
      .then((res) => {
        setAllStatus(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllInformation = (num: any) => {
    getCourseByNumero(num)
      .then((res) => {
        getAllInfoMail(res.id);
        setQrValue("/course/" + res.id);
        console.log(res);
        setCourseDetails(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllInfoMail = (num: any) => {
    getMailByCourseId(num)
      .then((res) => {
        // console.log(res[0]);
        setMailDetails(res[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeStatus = (id: any, name: any) => {
    console.log(id, name);
    updateStatutCourse(id, courseDetails);
    updateMail(name);
  };

  const deleteCourse = (id: any) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-danger mx-3",
        cancelButton: "btn btn-warning",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        text: "Voulez-vous vraiment supprimer ?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Oui",
        cancelButtonText: "Annuler",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deletCourse(id)
            .then((res) => {
              console.log(res);
              toast.success("La course a été supprimée avec succès");
              router.push(`/course/`);
            })
            .catch((err) => {
              console.log(err);
              toast.error("Il y a une erreur lors de la suppression");
            });
        }
      });
  };

  const updateStatutCourse = (id: string, course: any) => {
    const coursNewVal = {} as any;

    coursNewVal.comment = course.comment;
    coursNewVal.numero = course.numero;
    coursNewVal.createDate = course.createDate;
    coursNewVal.deliveryManId = user.id;
    coursNewVal.creatorId = course.creatorId;
    coursNewVal.statusId = parseInt(id);

    putCourse(course.id, coursNewVal)
      .then((res) => {
        statusChanged ? setStatusChanged(false) : setStatusChanged(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateMail = (dateNeedUpdate: string) => {
    const mailvalue = mailDetails as any;
    if (dateNeedUpdate === "En attente") {
      mailDetails.pickupDate = new Date().toISOString();
      putMail(mailvalue.id, mailvalue)
        .then((res) => {
          statusChanged ? setStatusChanged(false) : setStatusChanged(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (dateNeedUpdate === "Livré") {
      mailDetails.deliveryDate = new Date().toISOString();
      putMail(mailvalue.id, mailvalue)
        .then((res) => {
          statusChanged ? setStatusChanged(false) : setStatusChanged(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-gen") as any;
    const pngUrl = canvas
      ?.toDataURL("image/png")
      ?.replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${qrValue}.png`;
    setQrImg(downloadLink.href);
  };

  const generateEtiquette = () => {
    console.log("generateEtiquette");
  };

  return (
    <Layout>
      <div className="pagetitle">
        <h1>Avancement d'une demande</h1>
      </div>
      <CourseEtat courseDetails={courseDetails} />
      <div>
        <div className="d-flex flex-row flex-wrap">
        <Can permissions={["user:read"]}>
          {allStatus.map((oneStatus, index) => {
            return (
              <Fragment key={index}>
                <button
                  name={oneStatus.name}
                  onClick={() => {
                    changeStatus(oneStatus.id, oneStatus.name);
                  }}
                  className={`btn ava-btn-normal btn-next ml-3 
                ${oneStatus.name === "Brouillon" ? "d-none" : ""}
                ${
                  courseDetails?.status?.name === "Livré" ||
                  courseDetails?.status?.name === "NPAI" ||
                  courseDetails?.status?.name === "La Poste"
                    ? "disabled"
                    : ""
                }
                `}
                >
                  {oneStatus.name}
                </button>
              </Fragment>
            );
          })}
           </Can>
          <button
            onClick={() => {
              deleteCourse(courseDetails?.id);
            }}
            className={`btn ava-btn-normal btn-next ml-3 ${styles.hoverdanger}
            ${
              courseDetails?.status?.name === "Livré" ||
              courseDetails?.status?.name === "NPAI" ||
              courseDetails?.status?.name === "En attente" ||
              courseDetails?.status?.name === "La Poste"
                ? "d-none"
                : ""
            }
            `}
          >
            Supprimer
          </button>

        </div>
        <hr />
        <div className="ava-filter mt-4">
          <div className="d-flex flex-row justify-content-between align-items-center flex-wrap">
            <div className="ava-id">
              <p>N° de la course</p>
              <h6>{courseDetails?.numero}</h6>
            </div>
            <div className="ava-tag">
              <Can permissions={["user:read"]}>
                <Etiquette
                  qrImg={qrImg}
                  courseDetails={courseDetails}
                  mailDetails={mailDetails}
                  isClient={isClient}
                />
              </Can>
        
              <Can permissions={["user:read"]}>
                <SuiviPdf
                  courseDetails={courseDetails}
                  mailDetails={mailDetails}
                  photo={courseDetails.photo}
                  isClient={isClient}
                />
              </Can>
              
              <Can permissions={["user:read"]}>
              <button
                onClick={downloadQRCode}
                className="btn btn-default ava-qrcode"
              >
                <QRCode
                  id="qr-gen"
                  value={qrValue}
                  size={124}
                  level={"H"}
                  includeMargin={true}
                />
              </button>
              </Can>
            </div>
          </div>
        </div>
        <div className="ava-filter mt-4">
          <h2>Information sur la course</h2>
          <InfoEnlevement
            courseDetails={courseDetails}
            mailDetails={mailDetails}
            isClient={isClient}
          />
          <br />
          <InfoLivraison
            courseDetails={courseDetails}
            mailDetails={mailDetails}
          />
        </div>
        <div className="ava-filter mt-4">
          <PreuveLivraison photo={courseDetails.photo} />
        </div>
        <div className="ava-filter mt-4">
          <fieldset>
            <legend>Commentaire de Livraison</legend>
            <div className="container">
              <p>{courseDetails.comment}</p>
            </div>
          </fieldset>
        </div>
        <HistoriqueAction courseId={courseDetails.id} />
      </div>
    </Layout>
  );
};

export default DetailsCourse;

// DetailsCourse.getInitialProps = async (context: any) => {
//   return {
//     id: context.query.id,
//   };
// };
