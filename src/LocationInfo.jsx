import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaBoxOpen } from "react-icons/fa";
import "./LocationInfo.css";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import floodImage from "./Components/flood.jpeg";
import quakeImage from "./Components/quake.jpeg";
import tsunamiImage from "./Components/tsunami.jpeg";
import landImage from "./Components/landslide.jpeg";
import backgroundVideo from "./locbg.mp4"; // Add your video file

const disasterImages = {
  flood: floodImage,
  earthquake: quakeImage,
  tsunami: tsunamiImage,
  landslide: landImage,
};

const LocationInfo = () => {
  const { name } = useParams();
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/forms/${name}`);
        console.log("Fetched data:", response.data);
        setLocationData(response.data);
      } catch (error) {
        console.error("Error fetching location data:", error);
        setError("Failed to fetch location data.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocationData();
  }, [name]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!locationData) {
    return <p>No data found for this location.</p>;
  }

  const {
    disasterType,
    district,
    rescueLocation,
    severity,
    peopleCount,
    goods,
  } = locationData;

  const disasterImage = disasterImages[disasterType.toLowerCase()] || "default.png";

  return (
    <div className="location-info">
      <Navbar />
      <video className="background-video" autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="overlay">
        <div className="header">
          <h1 style={{color:"black"}}>
            <FaMapMarkerAlt className="location-icon" /> Location Info: {district}
          </h1>
        </div>
        <div className="content">
          <img
            src={disasterImage}
            alt={disasterType}
            className="image"
          />
          <div className="details">
            <p>
              <strong>Type of disaster:</strong> {disasterType}
            </p>
            <p>
              <strong>Severity:</strong> {severity}
            </p>
            <p>
              <strong>Survivors:</strong> {peopleCount}
            </p>
            <p>
              <strong>Address:</strong> {rescueLocation}
            </p>
            <div className="emergency-products">
              <h2 id="col" style={{ fontSize: "25px" }}>
                <FaBoxOpen className="product-icon" /> EMERGENCY PRODUCTS:
              </h2>
              {goods && goods.length > 0 ? (
                <ul style={{ listStyle: "none" }}>
                  {goods.map((good, index) => (
                    <li key={index}>
                      <strong>{good.name}:</strong> {good.count}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No goods required</p>
              )}
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="buttons">
          <Link to={`/products/${name}`}>
            <button className="dons" id="d1">
              Donate Goods
            </button>
          </Link>
          <Link to="/pay">
            <button className="dons" id="d2">
              Donate Cash
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
