import "./Accommodation-form.css";
import BasicInfo from "./1_BasicInfo";
import React, { useState, useEffect } from "react";
import AccommInfo from "./2_AccommInfo";
import OtherInfo from "./3_OtherInfo";
import { useNavigate } from "react-router-dom";


export default function AddAccommodation(){
    let navigate = useNavigate();

    const [page, setPage] = useState(0);
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

    const submit = () => {
        fetch('http://localhost:3001/addAccomm', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
        })
        .then(res => {
            if(res.status === 201){
              alert("Successfully signed up " + formData.accommodationType);
            }
          });
    }

    const FormTitles = ["Basic Information", "Detailed Information", "Other Information"];

    const RenderPage = () => {
        switch(page){
            case(0):
                return <BasicInfo formData={formData} setFormData={setFormData} />
            case(1):
                return <AccommInfo formData={formData} setFormData={setFormData} />
            case(2):
                return <div><OtherInfo formData={formData} setFormData={setFormData} /><button onClick={submit}>Add Accommodation</button></div>
            default:
                return <div></div>
        }
    }

    useEffect(() => {
        fetch('http://localhost:3001/checkifloggedin', {
        method: 'POST',
        credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if(data.isLoggedIn && localStorage.getItem('usertype') === 'Accommodation Owner'){
            }else{
                alert('You are not an accommodation owner');
                navigate('/home');
            }
        })
    }, [navigate]);

    return(
        <>
        <div className="form">
            <div className="progress-bar"></div>
            <div className="form-container">
                <div className="form-header">
                    <h1>{FormTitles[page]}</h1>
                </div>
                <div className="form-body">{RenderPage()}</div>
                <div className="form-footer">
                    <button
                        disabled={page === 0}
                        onClick={() => {
                            setPage((currPage) => currPage - 1);
                        }}
                    >Prev</button>
                    <button
                        disabled={page === FormTitles.length - 1}
                        onClick={() => {
                            
                            setPage((currPage) => currPage + 1);
                        }}
                    >Next</button>
                </div>
            </div>
        </div>
        </>
    );
}