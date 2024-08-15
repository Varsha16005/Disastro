import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import addPlacesbtn from "./addPlacesbtn.jpeg";
import logo from "./logo.png";
import pin4 from "./bluepin.png";
import pin5 from "./greenpin.png";
import pin3 from "./redpin.png";
import { useAuth } from "./AuthContext"; 

const Home = () => {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
  const mapRef = useRef(null); 
  const { isLoggedIn, userName, logout } = useAuth(); 

  const handleRadioClick = () => {
    if (isLoggedIn) {
      navigate("/radio");
    } else {
      navigate("/login");
    }
  };

  const handleAddPlacesClick = () => {
    if (isLoggedIn) {
      navigate("/RescueForm");
    } else {
      navigate("/login");
    }
  };

  const handleMarkerClick = useCallback(
    (name) => {
      if (isLoggedIn) {
        navigate(`/locinfo/${name}`);
      } else {
        navigate("/login");
      }
    },
    [isLoggedIn, navigate]
  );

  const cleanCoordinate = (coord) => {
    // Check if coord is a valid string before cleaning
    if (typeof coord === "string") {
      // Remove any non-numeric characters except for period and minus sign
      let cleanedCoord = coord.replace(/[^\d.-]/g, "");
  
      // Check if there is no decimal point and the length is more than 4 (likely missing a decimal)
      if (!cleanedCoord.includes('.') && cleanedCoord.length > 4) {
        // Insert a decimal after the first two digits (assuming degrees)
        cleanedCoord = cleanedCoord.slice(0, 2) + '.' + cleanedCoord.slice(2);
      }
  
      return parseFloat(cleanedCoord);
    }
    // Return NaN if coord is not a valid string
    return NaN;
  }
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/forms");
        console.log("API response:", response.data); 
        if (Array.isArray(response.data)) {
          setLocations(response.data);
        } else {
          console.error("Expected an array but received:", response.data);
          setLocations([]); 
        }
      } catch (error) {
        console.error("Error fetching locations", error);
        setLocations([]); 
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([12.9716, 77.5946], 5); 

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    } else {
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapRef.current.removeLayer(layer);
        }
      });
    }

    const customIcon4 = L.icon({
      iconUrl: pin4,
      iconSize: [50, 50],
      iconAnchor: [25, 50],
    });

    const customIcon5 = L.icon({
      iconUrl: pin5,
      iconSize: [50, 50],
      iconAnchor: [25, 50],
    });

    const customIcon3 = L.icon({
      iconUrl: pin3,
      iconSize: [50, 50],
      iconAnchor: [25, 50],
    });

    if (Array.isArray(locations)) {
      locations.forEach((location) => {
        let { latitude, longitude, name, severity } = location;

        latitude = cleanCoordinate(latitude);
        longitude = cleanCoordinate(longitude);

        if (!isNaN(latitude) && !isNaN(longitude)) {
          const icon =
            severity === "Low"
              ? customIcon5
              : severity === "Medium"
              ? customIcon4
              : customIcon3;

          L.marker([latitude, longitude], { icon })
            .addTo(mapRef.current)
            .bindPopup(name)
            .on("click", () => handleMarkerClick(name));
        } else {
          console.error("Invalid coordinates", location);
        }
      });
    } else {
      console.error("Locations is not an array:", locations);
    }
  }, [locations, handleMarkerClick]);

  return (
    <div className="responsive-map">
      <nav className="navbar">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo-image" />
          </Link>
        </div>
        <div className="home-button">
          {isLoggedIn ? (
            <>
              <span style={{fontStyle:"oblique",fontFamily:"unset",fontSize:"20px"}}>Welcome {userName} !</span>&emsp;

              <Link to="/about" className="home-link">
               ABOUT
              </Link>
              &emsp;
              <button onClick={logout} style={{fontWeight:"bolder"}}>LOGOUT</button>
            </>
          ) : (
            <>
              <Link to="/login" className="home-link">
                LOGIN
              </Link>
              <Link to="/signup" className="home-link">
                SIGNUP
              </Link>
              <Link to="/about" className="home-link">
               ABOUT
              </Link>
            </>
          )}
        </div>
      </nav>

      <div id="map" style={{ height: "100vh", width: "100%" }}></div>

      <div className="add-places-container">
        &emsp;&emsp;&emsp;
       
          <i
            className="fas fa-radio fa-5x radio-icon"
            style={{ height: "20px", width: "20px" }}
            onClick={handleRadioClick}
          ></i>
       
        <br></br>
        <br></br>
        <img
          src={addPlacesbtn}
          alt="Add Places"
          className="add-places-btn"
          onClick={handleAddPlacesClick}
        />
      </div>
      <div
        className="iframe-container"
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        <iframe
          width="100"
          height="100"
          src="https://www.youtube.com/embed/9M02G5c6x6w"
          title="🔴LIVE : Sun News Live | Latest News | Neeraj Chopra | Indian Hockey | Trending News | Tamil news"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Home;