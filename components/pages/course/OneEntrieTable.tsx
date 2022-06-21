import Link from "next/link";
import React, { FunctionComponent, useEffect, useState } from "react";
import { getMailByCourseId } from "../../../services/mail.service";
import Moment from "react-moment";
import "moment-timezone";
import { useRouter } from "next/router";

const OneEntrieTable = (props: any) => {
    const [mailCours, setMailCours] = useState({} as any);
    const [listTypeStatus, setListTypeStatus] = useState([{} as any]);
    const router = useRouter();

    useEffect(() => {
      getCoursEmail(props.cours.id);
    }, [props.cours]);
    
    useEffect(() => {
        setListTypeStatus(props.allStatus);
    }, [props.allStatus]);

    useEffect(() => {}, [mailCours]);
  
    const getCoursEmail = async (id: any) => {
      if (id) {
        try {
          var val = await getMailByCourseId(id);
          setMailCours(val[0]);
        } catch (err) {
          console.log("Error:");
        }
      }
    };
    
    const voirDetails = (course: any) => {
      router.push(`/course/${course.numero}`);
    };

    const convertNameToStyleName = (nom: string) =>{
        const originaName = nom
        if (originaName) {
            let nameModifier = originaName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            nameModifier = nameModifier.toLowerCase();
            nameModifier = nameModifier.replace(/ /g, "");
    
            return nameModifier;  
        }
    }

    return (
      <tr
        onClick={() => {
          voirDetails(props.cours);
        }}
      >
        <td className="text-center">
          <Moment format="DD/MM/YYYY">{props.cours.createDate}</Moment>
        </td>
        <td className="text-center">{props.cours.userCreator?.firstName}  {props.cours.userCreator?.lastName}</td>
        <td className="text-center">
          {mailCours?.companyNameSender?.length === 0
            ? <span>-</span>
            : mailCours?.companyNameSender
          }
        </td>
        <td className="text-center">{mailCours?.addressOnReceiver}</td>
        <td className="text-center">
          {
            mailCours?.pickupDate === null
            ? <span>-</span>
            : <Moment format="DD/MM/YYYY HH:mm">{mailCours?.pickupDate}</Moment>
          }
          
        </td>
        <td className="text-center">
          {
            mailCours?.deliveryDate === null
            ? <span>-</span>
            : <Moment format="DD/MM/YYYY HH:mm">{mailCours?.deliveryDate}</Moment>
          }
        </td>
        <td className="text-center">
            {
                listTypeStatus.map((oneStatus, index) => (
                    (oneStatus.name === props.cours?.status?.name)
                    ?<span key={index} className={`badge rounded-pill ${convertNameToStyleName(props.cours?.status?.name)} w-100 py-2`}>
                        <i className={`bi bi-${convertNameToStyleName(props.cours?.status?.name)}`}></i> {oneStatus.name}
                      </span>
                    :<span key={index} className="d-none"></span>
                ))
            }
        </td>
      </tr>
    );
  };

export default OneEntrieTable