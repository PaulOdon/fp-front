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
} from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import QRCode from "qrcode.react";
import Moment from "react-moment";
import "moment-timezone";

const Etiquette = (props: any) => {
  const style = StyleSheet.create({
    page: {
      flexDirection: "column",
      justifyContent: "space-between",
      fontSize: 7,
      paddingVertical: 5,
      paddingHorizontal: 15,
    },
    contentQr: {
      flexDirection: "column",
    },
    contentS: {
      flexDirection: "column",
      border: "1px solid #000",
      width: "100%",
      height: 64,
      marginBottom: 2,
    },
    titre: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    titreFooter: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    img: {
      height: 64,
      width: 64,
    },
    logoLeft: {
      paddingTop: 5,
      width: 64,
      height: 45,
    },
    logoRight: {
      width: 52,
      height: 52,
    },
    titreP: {
      fontSize: 9,
      fontWeight: "bold",
      textDecoration: "underline",
      marginBottom: 5,
    },
    titreD: {
      fontSize: 9,
      fontWeight: 600,
      textDecoration: "underline",
      marginBottom: 5,
      marginRight: 5,
    },
    contentExp: {
      flexDirection: "column",
      textAlign: "right",
    },
    contentRec: {
      flexDirection: "column",
      textAlign: "center",
    },
    contentDest: {
      flexDirection: "column",
      textAlign: "left",
    },
    contentDoss: {
      flexDirection: "row",
      alignItems: "flex-start",
      textOverflow: "ellipsis",
      paddingBottom: 1,
    },
    comment: {
      textOverflow: "ellipsis",
      overflow: "hidden",
      padding: "2 15 0 15",
    },
  });

  let expediteur = "";
  if (props.courseDetails != null && props.courseDetails.userCreator != null) {
    if (props.courseDetails.creatorId === 1) {
      expediteur = "Admin";
    } else {
      expediteur =
        props.courseDetails.userCreator.firstName +
        " " +
        props.courseDetails.userCreator.lastName;
    }
  }

  useEffect(() => {}, [props.courseDetails, props.mailDetails]);

  const etiquette = (
    <Document>
      <Page size="A7" style={style.page} wrap>
        <View style={style.titre}>
          <View style={style.logoLeft}>
            <Image src={"/static/images/logo-bw.jpg"} />
          </View>
          <View style={style.logoRight}>
            <Image src={"/static/images/ARCEP.png"} />
          </View>
        </View>
        <View style={style.titre}>
          <View style={style.contentQr}>
            <Image source={props.qrImg} style={style.img} />
          </View>
          <View style={style.contentExp}>
            <Text style={style.titreP}>Exp</Text>
            {props.isClient ? (
              <>
                <Text>
                  {/* {props.courseDetails.userCreator.service === null ||
                  props.courseDetails.userCreator.service === "null"
                    ? ""
                    : props.courseDetails.userCreator.service + " | "} */}
                  {props.mailDetails.companyNameSender}
                </Text>
                <Text>
                  {props.mailDetails.addressOnSender}
                  {"  " + props.mailDetails.addressTwoSender}
                </Text>
                <Text>
                  {props.mailDetails.zipCodeSender}
                  {"  " + props.mailDetails.citySender}
                </Text>
              </>
            ) : (
              <>
                <Text>
                  {/* {props.mailDetails.serviceSender === null ||
                  props.mailDetails.serviceSender === "null"
                    ? ""
                    : props.mailDetails.serviceSender + " | "} */}
                  {props.mailDetails.companyNameSender}
                </Text>
                <Text>
                  {props.mailDetails.addressOnSender}
                  {props.mailDetails.addressTwoSender == ""
                    ? ""
                    : " | " + props.mailDetails.addressTwoSender}
                </Text>
                <Text>
                  {props.mailDetails.zipCodeSender}
                  {"  " + props.mailDetails.citySender}
                </Text>
              </>
            )}
          </View>
        </View>
        <View>
          <Text>
            <Text style={style.titreP}>Date</Text>
            <Text> : </Text>
            <Moment format="DD/MM/YYYY - HH:mm">
              {props.courseDetails.createDate}
            </Moment>
          </Text>
        </View>
        <View style={style.contentDest}>
          <Text style={style.titreP}>Dest</Text>
          <Text>
            {props.mailDetails.firstNameReceiver}{" "}
            {props.mailDetails.lastNameReceiver}
          </Text>
          <Text>
            {props.mailDetails.serviceReceiver}{" "}
            {props.mailDetails.companyNameReceiver == ""
              ? ""
              : "| " + props.mailDetails.companyNameReceiver}
          </Text>
          <Text>
            {props.mailDetails.addressOnReceiver}{" "}
            {props.mailDetails.addressTwoReceiver == ""
              ? ""
              : "| " + props.mailDetails.addressTwoReceiver}
          </Text>
          <Text>
            {props.mailDetails.zipCodeReceiver} {props.mailDetails.cityReceiver}
          </Text>
        </View>
        <View style={style.contentDoss}>
          <Text style={style.titreD}>Dossier</Text>
          <Text style={style.comment}>{props.courseDetails.comment}</Text>
        </View>
        <View style={style.titreFooter}>
          <View style={style.contentS}></View>
          <Text>** RECOMMANDE A-R **</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink
      className="btn btn-default ava-tag-item"
      document={etiquette}
      fileName={"Etiquette_" + new Date().getTime() + ".pdf"}
    >
      <div className="ava-card-stat d-flex flex-column justify-content-center align-items-center">
        <span className="ava-card-icon">
          <i className="bi bi-printer"></i>
        </span>
        <span className="ava-card-text">Étiquette</span>
      </div>
    </PDFDownloadLink>
  );
};

export default Etiquette;
