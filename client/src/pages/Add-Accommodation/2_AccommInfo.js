import React from "react";
import { useState } from "react";

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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontSize: "larger",
              fontWeight: "bold",
              color: "#751518",
              marginRight: "10px",
            }}
          >
            Max Price:
          </p>
          <input
            style={{
              width: "100px",
              fontSize: "large",
              height: "20px",
              alignSelf: "center",
              marginRight: "10px",
            }}
            type="number"
            min={formData.priceRange.minPrice}
            max="50000"
            value={formData.priceRange.maxPrice} 
                onChange={(e) =>
                    setFormData({ ...formData, priceRange: { ...formData.priceRange, maxPrice: parseFloat(e.target.value) }})
                }
          />  
          <input
            style={{ width: "350px" }}
            type="range"
            min={formData.priceRange.minPrice}
            max="50000"
            value={formData.priceRange.maxPrice} 
                onChange={(e) =>
                    setFormData({ ...formData, priceRange: { ...formData.priceRange, maxPrice: parseFloat(e.target.value) }})
                }
          />
          <p
            style={{
              fontSize: "larger",
              fontWeight: "bold",
              color: "#751518",
              marginRight: "10px",
            }}
          >
            Min Price:
          </p>
          <input
            style={{
              width: "100px",
              fontSize: "large",
              height: "20px",
              alignSelf: "center",
              marginRight: "10px",
            }}
            type="number"
            min="1"
            max={formData.priceRange.maxPrice}
            value={formData.priceRange.minPrice} 
                onChange={(e) =>
                    setFormData({ ...formData, priceRange: { ...formData.priceRange, minPrice: parseFloat(e.target.value) }})
                }
          />
          <input
            style={{width: "350px"}}
            type="range"
            min="0"
            max={formData.priceRange.maxPrice}
            value={formData.priceRange.minPrice}
            onChange={(e) =>
              setFormData({ ...formData, priceRange: { ...formData.priceRange, minPrice: parseFloat(e.target.value) }})
            }
            />
        </div>
        <hr />
      </div>
      {/* FIXME:fix input responsiveness */}
      {/* <label style={{ color: "#751518", padding: "10px" }}>Rules</label>
      <div>
        <select
          value={selectedOption}
          onChange={handleDropdownChange}
          style={{
            height: "40px",
            marginRight: "20px",
            border: "1px solid #751518",
            borderRadius: "5px",
          }}
        >
          <option value="">Select an option</option>
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
          <option value="Option 4">Option 4</option>
          <option value="Option 5">Option 5</option>
          <option value="Option 6">Option 6</option>
          <option value="Option 7">Option 7</option>
        </select>
        <button
          class="add"
          onClick={handleAddToList}
          style={{
            color: "white",
            backgroundColor: "#0a4424",
            borderRadius: "5px",
            height: "30px",
            cursor: "pointer",
            border: "none"
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "green";
          }}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#0a4424")}
        >
          Add Rules
        </button>
        <ul
          class="list"
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            listStyle: "none",
          }}
        >
          {selectedOptionsList.map((option, index) => (
            <li
              class="item"
              style={{ marginRight: "10px", marginBottom: "10px" }}
            >
              {option}
              <button
                style={{
                  marginLeft: "10px",
                  backgroundColor: "maroon",
                  borderRadius: "5px",
                  color: "white",
                  border:"none",
                  cursor: "pointer"
                }}
                onClick={() => handleDeleteRules(index)}
              >
                {" "}
                X
              </button>
            </li>
          ))}
        </ul>
        <button
          class="clear"
          style={{
            marginBottom: "30px",
            marginTop:"50px",
            backgroundColor: "#751518",
            color: "white",
            borderRadius: "5px",
            height: "30px",
            cursor: "pointer",
            border: "none",
          }}
          onClick={handleClearList}
          Clear
          Rules
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "red";
          }}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#751518")}
        >
          CLEAR RULES
        </button>
        <hr />
      </div>
      <label style={{ color: "#751518", padding: "10px" }}>Amenities</label>
      <div>
        <div>
          <select
            style={{
              height: "40px",
              marginRight: "20px",
              border: "1px solid #751518",
              borderRadius: "5px",
            }}
            value={selectedOption2}
            onChange={handleDropdownChange2}
          >
            <option value="">Select an option</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
            <option value="Option 4">Option 4</option>
            <option value="Option 5">Option 5</option>
            <option value="Option 6">Option 6</option>
            <option value="Option 7">Option 7</option>
          </select>
          <button
            class="add"
            onClick={handleAddToList2}
            style={{
              color: "white",
              backgroundColor: "#0a4424",
              borderRadius: "5px",
              height: "30px",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "green";
            }}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#0a4424")}
          >
            Add Amenities
          </button>
          <ul
            class="list"
            style={{
              flexWrap: "wrap",
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              listStyle: "none",
              border:"none"
            }}
          >
            {selectedOptionsList2.map((option, index) => (
              <li
                className="item"
                style={{ marginRight: "10px", marginBottom: "10px" }}
              >
                {option}
                <button
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "maroon",
                    borderRadius: "5px",
                    color: "white",
                    border:"none",
                    cursor: "pointer"
                  }}
                  onClick={() => handleDeleteAmenities(option)}
                >
                  {" "}
                  X
                </button>
              </li>
            ))}
          </ul>
          <button
            class="clear"
            onClick={handleClearList2}
            style={{
              marginBottom: "160px",
              marginTop:"50px",
              backgroundColor: "#751518",
              color: "white",
              borderRadius: "5px",
              border:"none",
              height: "35px",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "red";
            }}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#751518")}
          >
            CLEAR AMENITIES
          </button>
        </div>
      </div> */}
    </div>
  );
}
