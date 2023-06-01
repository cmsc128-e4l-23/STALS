import React from "react";
import { useState } from "react";
import { Slider } from "@mui/material";

export default function AccommInfo({ formData, setFormData }) {

  return (
    <div
      className="accomm-info-form-container"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "700px",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="column"
        style={{ display: "block", flexDirection: "column", width: "700px" }}
      >
        <p style={{ fontSize: "larger", fontWeight: "bold", color: "#751518" }}>
          Accommodation Type:
        </p>
        <select
          style={{
            backgroundColor: "#f7f7f7",
            border: "1px solid #751518",
            borderRadius: "5px",
            padding: "10px",
            marginBottom: "30px",
            width: "80%",
            fontSize: "large",
            alignSelf: "center",
          }}
          value={formData.accommodationType}
          onChange={(e) =>
            setFormData({ ...formData, accommodationType: e.target.value })
          }
        >
          <option value="Transient">Transient</option>
          <option value="Dorm">Dorm</option>
          <option value="Apartment">Apartment</option>
          <option value="House for rent">House for rent</option>
        </select>
        <p style={{ fontSize: "larger", fontWeight: "bold", color: "#751518" }}>
          Price Range:
        </p>
        
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            marginBottom: "50px",
          }}
        >
          <input
            style={{
              width: "100px",
              fontSize: "large",
              height: "20px",
              alignSelf: "center",
              marginLeft: "10px",
              marginRight: "20px",
            }}
            value={"PHP " + formData.priceRange.minPrice} 
            disabled
          />
          <Slider
          getAriaLabel={() => 'Price Range'}
          value={[formData.priceRange.minPrice, formData.priceRange.maxPrice]}
          onChange={(e) => 
            setFormData({ ...formData, priceRange: { minPrice: parseFloat(e.target.value[0]), maxPrice: parseFloat(e.target.value[1])}})
          }
          valueLabelDisplay="auto"
          min={1}
          max={50000}
          disableSwap />
          <input
            style={{
              width: "100px",
              fontSize: "large",
              height: "20px",
              alignSelf: "center",
              marginRight: "10px",
              marginLeft: "20px"
            }}
            value={"PHP " + formData.priceRange.maxPrice} 
            disabled
          />  
          
        </div>
        <hr />
        <div style={{display:"flex", flexDirection:"column", marginTop: "50px", marginBottom: "50px"}}>
          <label style={{marginRight:"40px", marginBottom:"10px", color:"maroon"}}>ADD ADDITIONAL DETAILS</label>
          <textarea
              style={{
                borderColor:"#751518",
                width: "80vw",
                height: "400px",
                alignSelf: "center",
                marginRight:"40px",
                borderRadius:"5px"
              }}
              type="textarea"
              placeholder="Additional Rules and Descriptions..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
          />
        </div>
        <hr />
      </div>
    </div>
  );
}
