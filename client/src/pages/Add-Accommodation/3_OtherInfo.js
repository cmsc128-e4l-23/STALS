
import React from "react";
import { useState } from "react";

export default function OtherInfo({ formData, setFormData, images, setImages }) {
  const [pdfs, setPdfs] = useState([]);

  const handleImagesDeleteClick = () => {
    setImages(images.slice(0, -1));
  };
  const handlePdfDeleteClick = (pdfName) => {
    const newPdfs = pdfs.filter((pdf) => pdf.name !== pdfName);
    setPdfs(newPdfs);
  };

  const handleImageChange = (event) => {
    if(event.target.files[0]){
      setImages([...images, event.target.files[0]]);
    }
    setFormData({...formData, photos: images});
  };
  const handlePdfChange = (event) => {
    const newPdfs = [...pdfs];
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      newPdfs.push({ name: files[i].name, file: files[i] });
    }
    setPdfs(newPdfs);
  };

  return (
    <>
      <div
        style={{
          marginTop:"20px",
          display: "flex",
          alignContent: "center",
          flexDirection: "row",
          width: "100%",
        }}
      >
    
        <uploaders style={{ display: "flex", flexDirection: "row"}}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              marginBottom: "30px"
            }}
          >
            {images.length > 0 ? (
              <>
                <label htmlFor="upload-image" className="upload" style={{marginRight:"50px"}}>
                  Upload an Image
                </label>
                <input
                  type="file"
                  id="upload-image"
                  name="upload-image"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{display:"none"}}
                />
                <img
                  style={{ width: "300px", height: "300px", marginRight:"40px"}}
                  class="acc_image"
                  src={URL.createObjectURL(images[images.length - 1])}
                  alt="uploaded"
                />
                <button
                  class="delete"
                  onClick={handleImagesDeleteClick}
                  style={{
                    height: "40px",
                    border: "1px solid #751518",
                    borderRadius: "5px",
                    width: "100px",
                    alignSelf: "center",
                    marginRight:"50px",
                    marginTop:"20px"
                  }}
                >
                  Delete Image
                </button>
              </>
            ) : (
              <>
                <label  style={{marginRight:"30px"}} htmlFor="upload-image" className="upload">
                  Upload an Image
                </label>
                <input
                  style={{display:"none"}}
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
                  Upload a Document
                </label>
                <input
                  type="file"
                  id="upload-pdf"
                  name="upload-pdf"
                  accept="image/*,.pdf" 
                  onChange={handlePdfChange}
                  multiple
                  style={{display:"none"}}
                />
              <ul class="list2">
                {pdfs.map((pdf) => (
                  <li key={pdf.name}>
                    {pdf.name}
                    <button style={{ marginLeft:"10px", color:"white", backgroundColor:"maroon", borderRadius:"5px"}}
                      class="x"
                      onClick={() => handlePdfDeleteClick(pdf.name)}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </div>
        </uploaders>
      </div>
    </>
  );
}
