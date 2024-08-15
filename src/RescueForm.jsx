import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Tesseract from "tesseract.js";
import Navbar from "./Navbar";

function RescueForm() {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    rescueLocation: "",
    district: "",
    pinCode: "",
    peopleCount: "",
    severity: "",
    disasterType: "",
    goods: [{ name: "", count: "" }],
    locationImage: "", 
    latitude: "",
    longitude: "",
  });

  const navigate = useNavigate();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGoodsChange = (index, e) => {
    const { name, value } = e.target;
    const newGoods = [...formData.goods];
    newGoods[index][name] = value;
    setFormData({ ...formData, goods: newGoods });
  };

  const addGood = () => {
    setFormData({
      ...formData,
      goods: [...formData.goods, { name: "", count: "" }],
    });
  };

  const preprocessText = (text) => {
    return text.replace(/[^\w\s.,°+-]/g, " ").trim();
  };

  const extractCoordinates = (text) => {
    const latMatch = text.match(/Lat\s*([\d.°-]+)/);
    const longMatch = text.match(/Long\s*([\d.°-]+)/);

    let latitude = latMatch ? latMatch[1] : "";
    let longitude = longMatch ? longMatch[1] : "";

    // Normalize by adding a decimal point if it's missing
    if (latitude && !latitude.includes(".")) {
      latitude = latitude.slice(0, 2) + "." + latitude.slice(2);
    }
    if (longitude && !longitude.includes(".")) {
      longitude = longitude.slice(0, 2) + "." + longitude.slice(2);
    }

    console.log(latitude + " " + longitude);
    return { latitude, longitude };
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData({ ...formData, locationImage: base64String });

        Tesseract.recognize(file, "eng", {
          logger: (m) => console.log(m),
        })
          .then(({ data: { text } }) => {
            const preprocessedText = preprocessText(text);
            const { latitude, longitude } =
              extractCoordinates(preprocessedText);

            if (latitude && longitude) {
              setFormData({ ...formData, latitude, longitude });
              toast.success("Image accepted");
            } else {
              toast.error("Upload a geoimage");
            }
          })
          .catch((err) => {
            console.error("OCR Error: ", err);
            toast.error("Error during OCR processing");
          });
      };
      reader.readAsDataURL(file);
    }
  };
  const removeGood = () => {
    const newGoods = [...formData.goods];
    newGoods.pop();
    setFormData({ ...formData, goods: newGoods });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.contact ||
      !formData.rescueLocation ||
      !formData.district ||
      !formData.pinCode ||
      !formData.peopleCount ||
      !formData.severity ||
      !formData.disasterType ||
      !formData.goods.length ||
      !formData.latitude ||
      !formData.longitude
    ) {
      toast.error(
        "Please fill in all required fields and provide valid coordinates"
      );
      return;
    }

    const data = {
      name: formData.name,
      contact: formData.contact,
      rescueLocation: formData.rescueLocation,
      district: formData.district,
      pinCode: formData.pinCode,
      peopleCount: formData.peopleCount,
      severity: formData.severity,
      disasterType: formData.disasterType,
      goods: formData.goods,
      latitude: formData.latitude,
      longitude: formData.longitude,
    };

    try {
      await axios.post("http://localhost:8080/api/forms", data);
      toast.success("Form successfully submitted");
      navigate("/");
    } catch (err) {
      console.error("Error submitting form", err);
      toast.error("Error submitting form");
    }
  };

  return (
    <div className="rdb" >
    <div className="form-container">
      <ToastContainer />
      <Navbar></Navbar>
      <form onSubmit={handleSubmit} style={{color:"black",fontSize:"medium"}}>
        <h1>Rescue Form</h1>

        <div className="form-field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
           
          />
        </div>

        <div className="form-field">
          <label>Contact</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-field">
          <label>Rescue Location</label>
          <textarea
            name="rescueLocation"
            value={formData.rescueLocation}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="form-field">
          <label>District</label>
          <textarea
            name="district"
            value={formData.district}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="form-field">
          <label>PIN Code</label>
          <input
            type="text"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-field">
          <label>No. of People</label>
          <input
            type="text"
            name="peopleCount"
            value={formData.peopleCount}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-field">
          <label>Severity</label>
          <input
            type="text"
            name="severity"
            value={formData.severity}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-field">
          <label>Type of Disaster</label>
          <input
            type="text"
            name="disasterType"
            value={formData.disasterType}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-field">
          <label>Goods Requirement</label>
          <div className="goods-container">
            {formData.goods.map((good, index) => (
              <div key={index} className="good-field">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={good.name}
                  onChange={(e) => handleGoodsChange(index, e)}
                />
                <input
                  type="text"
                  name="count"
                  placeholder="Count"
                  value={good.count}
                  onChange={(e) => handleGoodsChange(index, e)}
                />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "10px"}}>
            <button type="button" onClick={addGood} className="add-good-button" style={{backgroundColour:"rgba(16, 4, 56, 0.9)"}}>
              Add Product
            </button>
            <button
              type="button"
              onClick={removeGood}
              className="remove-good-button"
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Remove Product
            </button>
          </div>

        </div>

        <input
          type="file"
          name="locationImage"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div className="buttons">
          <button
            type="button"
            onClick={handleButtonClick}
            className="location-button" style={{width:"160px",height:"50px",marginRight:"20px",backgroundColor:"rgba(16, 4, 56, 0.9)"}}
          >
            Location Image
          </button>
          <button type="submit" className="action-button" style={{width:"160px",height:"50px",marginRight:"20px",backgroundColor:"rgba(16, 4, 56, 0.9)"}}>
            Submit
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
export default RescueForm;