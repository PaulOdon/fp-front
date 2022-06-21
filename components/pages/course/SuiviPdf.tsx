import React, { useEffect, useState } from "react";
import {
  usePDF,
  Document,
  Page,
  StyleSheet,
  View,
  Text,
  Canvas,
  Image,
  Font,
} from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { getHistoryByCourseId } from "../../../services/history.service";
import Moment from "react-moment";
import "moment-timezone";
import { getImage } from "../../../services/photo.service";

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});

const SuiviPdf = (props: any) => {
  const style = StyleSheet.create({
    page: {
      flexDirection: "column",
      justifyContent: "flex-start",
      fontSize: 9,
      padding: "0 30",
    },
    sectLogo: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 15,
      marginBottom: 15,
    },
    logoTop: {
      width: 100,
      height: 64,
    },
    sectInfoC: {
      display: "flex",
      flexDirection: "row",
      marginTop: 15,
    },
    sectInfoCL: {
      flexDirection: "column",
    },
    sectInfoS: {
      flexDirection: "column",
      justifyContent: "space-between",
      marginTop: 15,
      marginBottom: 15,
    },
    sectInfoP: {
      flexDirection: "column",
      justifyContent: "space-between",
      marginTop: 15,
      marginBottom: 15,
    },
    colorTextSectInfo: {
      width: "50%",
      color: "#1b599e",
      fontSize: 14,
      fontWeight: 800,
      fontFamily: "Open Sans",
    },
    sectDetEnlLiv: {
      display: "flex",
      flexDirection: "row",
      marginTop: 5,
      marginBottom: 15,
    },
    contEnl: {
      width: "50%",
      flexDirection: "column",
      fontWeight: 700,
      fontFamily: "Open Sans",
    },
    contEnlInfoS: {
      width: "100%",
    },
    contEnls: {
      flexDirection: "column",
      fontWeight: 700,
      height: 64,
      fontFamily: "Open Sans",
    },
    contEnlsp: {
      flexDirection: "column",
      backgroundColor: "#DCDCDC",
      marginBottom: "15",
      padding: 5,
      textAlign: "center",
    },
    titleEnlev: {
      fontSize: 12,
      textDecoration: "underline",
      marginBottom: 5,
    },
    contentSign: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    contentPh: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    log: {
      backgroundColor: "#FFF",
      padding: "5 0",
    },
    logtxt: {
      color: "#000",
    },
    prevImg: {
      width: "50%",
      margin: "2px 0",
    },
    imgprev: {
      maxWidth: "100%",
      height: "auto",
    },
  });

  const [allPhoto, setAllPhoto] = useState([]) as any;

  const [allHistorical, setAllHistorical] = useState([{} as any]);

  useEffect(() => {
    fetchAllHistorical();
  }, [props.courseDetails, props.mailDetails]);

  useEffect(() => {
    getImageInfo(props.photo);
  }, [props.photo]);

  useEffect(() => {}, [allPhoto]);

  const getImageInfo = (photos: any) => {
    photos?.map((photo: any) => {
      getImage(photo.URL)
        .then((res) => {
          const blob = new Blob([res], { type: "image/png" });
          const imgUrl = URL.createObjectURL(blob);
          const photoOne = {
            name: photo.orignialName,
            url: imgUrl,
          };
          setAllPhoto((allPhoto: any) => [...allPhoto, photoOne]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  useEffect(() => {}, [allHistorical]);

  const fetchAllHistorical = () => {
    if (props.courseDetails.id) {
      getHistoryByCourseId(props.courseDetails.id)
        .then((res) => {
          setAllHistorical(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getFirstTextLog = (status: any) => {
    switch (status) {
      case "Brouillon":
        return "Course créée le";
        break;
      case "En attente":
        return "Enlèvement constaté le";
        break;
      case "Livré":
        return "Courrier remis en main propre le ";
        break;
      case "NPAI":
        return "Avis de passage remis le ";
        break;
      case "La Poste":
        return "Courrier renvoyé à la poste";
        break;

      default:
        break;
    }
  };

  const suiviPdf = (
    <Document>
      <Page size="A4" style={style.page} wrap>
        <View style={style.sectLogo}>
          <Image style={style.logoTop} src={"/static/images/logo.jpg"} />
        </View>
        <View style={style.sectInfoC}>
          <Text style={style.colorTextSectInfo}>Informations de la course</Text>
          <Text style={style.colorTextSectInfo}>
            Course N° {props.courseDetails?.numero}
          </Text>
        </View>
        <View style={style.sectDetEnlLiv}>
          <View style={style.contEnl}>
            <Text style={style.titleEnlev}>Enlèvement</Text>
            {props.isClient ? (
              <>
                <Text>
                  {props.courseDetails.userCreator?.firstName}{" "}
                  {props.courseDetails.userCreator?.lastName}
                </Text>
                <Text>
                  {props.courseDetails.userCreator.service === null ||
                  props.courseDetails.userCreator.service === "null"
                    ? ""
                    : props.courseDetails.userCreator.service}
                </Text>
                <Text>{props.mailDetails?.companyNameSender}</Text>
                <Text>{props.mailDetails?.addressOnSender}</Text>
                <Text>
                  {props.mailDetails?.addressTwoSender
                    ? props.mailDetails.addressTwoSender
                    : ""}
                </Text>
                <Text>
                  {props.mailDetails.zipCodeSender}{" "}
                  {props.mailDetails.citySender}
                </Text>
              </>
            ) : (
              <>
                <Text>
                  {props.mailDetails?.firstNameSender}{" "}
                  {props.mailDetails?.lastNameSender}
                </Text>
                <Text>
                  {props.mailDetails.serviceSender === null ||
                  props.mailDetails.serviceSender === "null"
                    ? ""
                    : props.mailDetails.serviceSender}
                </Text>
                <Text>{props.mailDetails?.companyNameSender}</Text>
                <Text>{props.mailDetails?.addressOnSender}</Text>
                <Text>
                  {props.mailDetails?.addressTwoSender
                    ? props.mailDetails.addressTwoSender
                    : ""}
                </Text>
                <Text>
                  {props.mailDetails.zipCodeSender}{" "}
                  {props.mailDetails.citySender}
                </Text>
              </>
            )}
          </View>
          <View style={style.contEnl}>
            <Text style={style.titleEnlev}>Livraison</Text>
            <Text>
              {props.mailDetails?.firstNameReceiver}{" "}
              {props.mailDetails?.lastNameReceiver}
            </Text>
            <Text>
              {props.mailDetails.serviceReceiver === null ||
              props.mailDetails.serviceReceiver === "null"
                ? ""
                : props.mailDetails.serviceReceiver}
            </Text>
            <Text>{props.mailDetails?.companyNameReceiver}</Text>
            <Text>{props.mailDetails?.addressOnReceiver}</Text>
            <Text>
              {props.mailDetails?.addressTwoReceiver
                ? props.mailDetails.addressTwoReceiver
                : ""}
            </Text>
            <Text>
              {props.mailDetails.zipCodeReceiver}{" "}
              {props.mailDetails.cityReceiver}
            </Text>
          </View>
        </View>
        <View style={style.sectDetEnlLiv}>
          <View style={style.contEnlInfoS}>
            <Text style={style.colorTextSectInfo}>
              Information(s) supplementaire(s)
            </Text>
            <Text>{props.courseDetails?.comment}</Text>
          </View>
        </View>
        <View style={style.sectInfoCL}>
          <Text style={style.colorTextSectInfo}>Déroulement de la course</Text>
          {allHistorical?.map((history, index) => {
            return (
              <View style={style.log} key={index}>
                <Text style={style.logtxt}>
                  {getFirstTextLog(history.status)}{" "}
                  <Moment format="DD/MM/YYYY HH:mm">{history.date}</Moment> par{" "}
                  {history.firstName} {history.lastName} ({history.role})
                </Text>
              </View>
            );
          })}
        </View>
        <View style={style.sectInfoP}>
          <Text style={style.colorTextSectInfo}>Photo de la course</Text>
          <View style={style.contentPh}>
            {allPhoto.map((photo: any) => {
              return (
                <View style={style.prevImg}>
                  <Image style={style.imgprev} src={photo.url} />
                </View>
              );
            })}
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink
      className="btn btn-default ava-tag-item-pdf"
      document={suiviPdf}
      fileName={"Suivi_" + new Date().toLocaleString() + ".pdf"}
    >
      <div className="ava-card-stat d-flex flex-column justify-content-center align-items-center">
        <span className="ava-card-icon">
          <i className="bi bi-printer-fill"></i>
        </span>
        <span className="ava-card-text">Suivi PDF</span>
      </div>
    </PDFDownloadLink>
  );
};

export default SuiviPdf;
