import React, { useEffect, useState } from "react";
import { getImage } from "../../../services/photo.service";

const PreuveLivraison = (props: any) => {
  const [allPhoto, setAllPhoto] = useState([]) as any;

  useEffect(() => {
    getImageInfo(props.photo);
  }, [props.photo]);

  useEffect(() => {
    console.log(allPhoto)
  }, [allPhoto]);

  const getImageInfo = (photos: any) => {
    photos?.map((photo: any) => {
      getImage(photo.URL)
        .then((res) => {
          const blob = new Blob([res], { type: "image/png" });
          const imgUrl = URL.createObjectURL(blob);
          const photoOne = {
            name: photo.orignialName,
            url: imgUrl
          };
          setAllPhoto((allPhoto: any) => [...allPhoto, photoOne]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const downloadImage = (url: any, name: any) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `${name}`,
    );
    document.body.appendChild(link);
    link.click();
  }

  return (
    <fieldset>
      <legend style={{ marginBottom: "15px" }}>Preuve de livraison</legend>
      <div className="container">
        <div className="row">
          {allPhoto.map((photo: any) => {
            return (
              <div className="col-md-3 mini-box">
                <div className="card ">
                  <div className="multi-button">
                    <button onClick={(() => downloadImage(photo.url, photo.name))} type="button" className="bi bi-download"></button>
                  </div>
                  <img src={photo.url} alt="" className="img-fluid" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </fieldset>
  );
};

export default PreuveLivraison;
