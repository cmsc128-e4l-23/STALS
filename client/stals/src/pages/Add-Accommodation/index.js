//import { Margin } from "@mui/icons-material";
import "./Accommodation-form.css";
import Header from "components/Header";
import React, { useState } from "react";

function Accommodation() {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptionsList, setSelectedOptionsList] = useState([]);
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOptionsList2, setSelectedOptionsList2] = useState([]);
  const [images, setImages] = useState([]);
  const [pdfs, setPdfs] = useState([]);

  const handleImageChange = (event) => {
    setImages([...images, event.target.files[0]]);
  };

  const handlePdfChange = (event) => {
    const newPdfs = [...pdfs];
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      newPdfs.push({ name: files[i].name, file: files[i] });
    }
    setPdfs(newPdfs);
  };

  const handleDeleteClick = () => {
    setImages(images.slice(0, -1));
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddToList = () => {
    if (selectedOption && selectedOption.trim()) {
      setSelectedOptionsList([...selectedOptionsList, selectedOption]);
      setSelectedOption("");
    }
  };

  const handleDropdownChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  const handleAddToList2 = () => {
    if (selectedOption2 && selectedOption2.trim()) {
      setSelectedOptionsList2([...selectedOptionsList2, selectedOption2]);
      setSelectedOption2("");
    }
  };

  const handleClearList = () => {
    setSelectedOptionsList([]);
  };

  const handleClearList2 = () => {
    setSelectedOptionsList2([]);
  };

  const handlePdfDeleteClick = (pdfName) => {
    const newPdfs = pdfs.filter((pdf) => pdf.name !== pdfName);
    setPdfs(newPdfs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <div>
        <Header />
      </div>
      <form onSubmit={handleSubmit} class="accommodation-form">
      <div class="flex-container">
        <div class="top-flex">
          <div class="flex-item1">
            <label htmlFor="accommodation-name">Accommodation Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
            />
            <label htmlFor="accommodation-name">Location:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Location"
              required
            />
            <label htmlFor="Price">Price in php:</label>
            <input 
              type="number"
              id="price"
              name="price"
              min="0"
              step="100"
              placeholder="Enter price"
              required
              class="short-input"
            />
            <label htmlFor="Rules">Rules:</label>
            <div>
              <select value={selectedOption} onChange={handleDropdownChange}>
                <option value="">Select an option</option>
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
                <option value="Option 3">Option 3</option>
              </select>
              <button class="add" onClick={handleAddToList}>Add to list</button>
              <ul class="list">
                {selectedOptionsList.map((option, index) => (
                  <li class="item" key={index}>{option}</li>
                ))}
              </ul>
              <button class="clear" onClick={handleClearList}>Clear Rules</button>
            </div>
            <label htmlFor="Amenities">Amenities</label>
            <div>
              <div>
                <select
                  value={selectedOption2}
                  onChange={handleDropdownChange2}
                >
                  <option value="">Select an option</option>
                  <option value="Option 1">Option 1</option>
                  <option value="Option 2">Option 2</option>
                  <option value="Option 3">Option 3</option>
                </select>
                <button class="add" onClick={handleAddToList2}>Add to list</button>
                <ul class="list">
                  {selectedOptionsList2.map((option, index) => (
                    <li className="item" key={index}>{option}</li>
                  ))}
                </ul>
                <button class="clear" onClick={handleClearList2}>Clear Amenities</button>
              </div>
            </div>
          </div>
          <div class="flex-item2">
            <textarea
              rows="5"
              cols="50"
              type="text"
              id="description"
              name="description"
              placeholder="Enter additional details and description"
              class="description-input"
              required
            />
          </div>
          <div className="column-container">
            <div className="image-uploader">
              {images.length > 0 ? (
                <>
                  <label htmlFor="upload-image" className="upload">
                    Upload an Image
                  </label>
                  <input
                    type="file"
                    id="upload-image"
                    name="upload-image"
                    accept="image/*"
                    onChange={handleImageChange}
                    multiple
                  />
                  <img
                    class="acc_image"
                    src={URL.createObjectURL(images[images.length - 1])}
                    alt="uploaded"
                  />
                  <button class="delete" onClick={handleDeleteClick}>
                    Delete Image
                  </button>
                </>
              ) : (
                <>
                  <label htmlFor="upload-image" className="upload">
                    Upload an Image
                  </label>
                  <input
                    type="file"
                    id="upload-image"
                    name="upload-image"
                    accept="image/*"
                    onChange={handleImageChange}
                    multiple
                  />
                </>
              )}
            </div>
            <div className="upload-pdf">
                <label htmlFor="upload-pdf" className="upload">
                  Upload PDF
                </label>
                <input
                  type="file"
                  id="upload-pdf"
                  name="upload-pdf"
                  accept="application/pdf"
                  onChange={handlePdfChange}
                  multiple
                />
              <ul class="list2">
                {pdfs.map((pdf) => (
                  <li key={pdf.name}>
                    {pdf.name}
                    <button
                      class="x"
                      onClick={() => handlePdfDeleteClick(pdf.name)}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="bottom-flex">
          <button class="submit">
            SUBMIT ACCOMMODATION
          </button>
        </div>
      </div>
      </form>
      
    </div>
  );
}

export default Accommodation;
