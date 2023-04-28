import "./Accommodation-form.css";
import Header from "components/Header";
import BasicInfo from "./1_BasicInfo";
import React, { useState, useRef } from "react";
import AccommInfo from "./2_AccommInfo";
import OtherInfo from "./3_OtherInfo";


export default function AddAccommodation(){
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        landmarks: [],
        address: {
            postCode: "",
            street: "",
            barangay: "",
            city: "",
            province: null,
            region: null,
        },
        generalLocation: 0,
        accommodationType: "",
        amenities: [],
        priceRange: 0,
        description: "",
        photos: [],
        restrictions: [],
        security: "",
        archived: null
      });

    const FormTitles = ["Basic Information", "Detailed Information", "Other Information"];

    const RenderPage = () => {
        switch(page){
            case(0):
                return <BasicInfo formData={formData} setFormData={setFormData} />
            case(1):
                return <AccommInfo formData={formData} setFormData={setFormData} />
            case(2):
                return <div><OtherInfo formData={formData} setFormData={setFormData} /><button>Add Accommodation</button></div>
            default:
                return <div></div>
        }
    }

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