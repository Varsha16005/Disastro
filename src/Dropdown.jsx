import React from "react";
import "./Dropdown.css";

const Dropdown = ({ locations, onChange }) => {
  return (
    <div className="dropdown">
      <label htmlFor="location" className="loc" style={{color:"black"}}>
        SELECT&nbsp; YOUR&nbsp; LOCATION:
      </label>
      <select id="location" onChange={onChange}>
        <option value="">All</option>
        {locations.map((location, index) => (
          <option key={index} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;