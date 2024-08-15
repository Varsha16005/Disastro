import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Select from "react-select";
import axios from "axios";
import "./RadioPlayer.css";
import Navbar from "./Navbar";

Modal.setAppElement("#root");

const RadioPlayer = () => {
  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchCountriesAndLanguages = async () => {
      try {
        const countryResponse = await axios.get(
          "https://de1.api.radio-browser.info/json/countries"
        );
        const languageResponse = await axios.get(
          "https://de1.api.radio-browser.info/json/languages"
        );
        setCountries(
          countryResponse.data.map((country) => ({
            value: country.name,
            label: country.name,
          }))
        );
        setLanguages(
          languageResponse.data.map((language) => ({
            value: language.name,
            label: language.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching countries or languages", error);
      }
    };

    fetchCountriesAndLanguages();
  }, []);

  useEffect(() => {
    document.body.classList.add("radio-page");
    return () => {
      document.body.classList.remove("radio-page");
    };
  }, []);

  useEffect(() => {
    const fetchStations = async () => {
      if (selectedCountry && selectedLanguage) {
        try {
          const response = await axios.get(
            "https://de1.api.radio-browser.info/json/stations/search",
            {
              params: {
                country: selectedCountry.value,
                language: selectedLanguage.value,
              },
            }
          );
          setStations(response.data);
        } catch (error) {
          console.error("Error fetching stations", error);
        }
      }
    };

    fetchStations();
  }, [selectedCountry, selectedLanguage]);

  const openModal = (station) => {
    setSelectedStation(station);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedStation(null);
  };

  const handleStationChange = (station) => {
    setSelectedStation(station);
    if (!modalIsOpen) {
      setModalIsOpen(true);
    } else {
      document.getElementById("radio-audio").load();
    }
  };

  return (
    <div className="radio-container">
      <h1 className="title">Radio Stations</h1>
      <Navbar />
      <Select
        className="country-select"
        value={selectedCountry}
        onChange={setSelectedCountry}
        options={countries}
        placeholder="Select a country"
        isSearchable
      />

      <Select
        className="language-select"
        value={selectedLanguage}
        onChange={setSelectedLanguage}
        options={languages}
        placeholder="Select a language"
        isSearchable
      />

      <div className="scrollable-stations">
        <ul className="stations-list">
          {stations.length > 0 ? (
            stations.map((station) => (
              <li
                key={station.id}
                className="station-item"
                onClick={() => handleStationChange(station)}
              >
                <a href="#" className="station-link">
                  {station.name}
                </a>
              </li>
            ))
          ) : (
            <li className="station-item">No stations available</li>
          )}
        </ul>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="player-dialog"
        overlayClassName="Overlay"
      >
        {selectedStation && (
          <div>
            <h2 className="modal-heading">{selectedStation.name}</h2>
            <audio id="radio-audio" controls autoPlay>
              <source src={selectedStation.url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <center>
              <button onClick={closeModal}>Close</button>
            </center>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RadioPlayer;
