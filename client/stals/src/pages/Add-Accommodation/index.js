import "./Accommodation-form.css";
import React, { useState, useEffect } from "react";
import Header from "components/Header";
import BasicInfo from "./1_BasicInfo";
import AccommInfo from "./2_AccommInfo";
import OtherInfo from "./3_OtherInfo";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";
export default function AddAccommodation() {
  let navigate = useNavigate();

  const [page, setPage] = useState(0);
  
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    owner: localStorage.getItem('email'),
    landmarks: [],
    address: {
        postCode: "",
        street: "",
        barangay: "",
        city: "",
        province: "Laguna",
        region: "CALABARZON",
    },
    generalLocation: 0,
    accommodationType: "Transient",
    amenities: [],
    priceRange: {
        minPrice: 0,
        maxPrice: 0
    },
    description: "",
    photos: [],
    restrictions: [],
    security: "",
    archived: true,
  });

  const {photos, ...noPhotos} = formData;
  const submit = () => {
    fetch("http://localhost:3001/addAccomm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noPhotos),
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.success){
        const {accommId, userId, ...otherdata} = data;
        alert(data.msg);
        const sendData = new FormData();
        sendData.append('userId', userId);
        sendData.append('attachedTo', accommId);
        for (let i = 0; i < photos.length; i++) {
          sendData.append("images", photos[i],photos[i].name);
        }
        return fetch("http://localhost:3001/uploadImage", {
          method: 'POST',
          body: sendData,
        })
      }else{
        alert(data.error)
      }
    })
    .then(response => response.json())
    .then(data =>{
      console.log(data)
      navigate("/home")
    })
    .catch(error => console.error(error));
  };

  const FormTitles = [
    "Basic Information",
    "Detailed Information",
    "Other Information",
  ];

  const RenderPage = () => {
    switch (page) {
      case 0:
        return <BasicInfo formData={formData} setFormData={setFormData} />;
      case 1:
        return <AccommInfo formData={formData} setFormData={setFormData} />;
      case 2:
        return (
          <div>
            <OtherInfo formData={formData} setFormData={setFormData} images={images} setImages={setImages} />
            <button
              style={{
                position: "absolute",
                bottom: 10,
                left: 675,
                width: "180px",
                backgroundColor: "#0a4424",
                height: "60px",
                color: "white",
                borderRadius: "5px",
                border: "none",
                fontSize: "Larger",
                padding: "5px",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "green";
              }}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#0a4424")}
              onClick={submit}
            >
              Add Accommodation
            </button>
          </div>
        );
      default:
        return <div></div>;
    }
  };

  useEffect(() => {
    fetch("http://localhost:3001/checkifloggedin", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (
          data.isLoggedIn &&
          localStorage.getItem("usertype") === "Accommodation Owner"
        ) {
        } else {
          alert("You are not an accommodation owner");
          navigate("/home");
        }
      });
  }, [navigate]);

  return (
    <>
      <div className="page-header">
        <Header />
      </div>
      <div
        className="form"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "100px",
        }}
      >
        <div className="progress-bar"></div>
        <div
          className="form-container"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="form-header">
            <h1>{FormTitles[page]}</h1>
          </div>
          <div className="form-body">{RenderPage()}</div>
          <div className="form-footer">
            <button
              style={{marginRight:"20px", border:"1px solid maroon", width:"100px", height:"50px", borderRadius:"5px", fontSize:"larger", cursor:"pointer"}}
              disabled={page === 0}
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
            >
              Prev
            </button>
            <button
              style={{marginRight:"20px", border:"1px solid maroon", width:"100px", height:"50px", borderRadius:"5px", fontSize:"larger", cursor:"pointer"}}
              disabled={page === FormTitles.length - 1}
              onClick={() => {
                setPage((currPage) => currPage + 1);
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
