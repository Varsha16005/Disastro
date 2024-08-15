import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Products.css";
import blanket from "./Components/blanket.jpg";
import food from "./Components/cannedfoods.jpg";
import medicine from "./Components/medicine.jpg";
import torchlight from "./Components/torch.jpg";
import umbrella from "./Components/umbrella.avif";
import clothes from "./Components/clothes.jpg";
import boots from "./Components/boots.avif";
import waterbottle from "./Components/waterbottle.jpg";
import batteries from "./Components/batteries.jpg";
import candle from "./Components/candle.avif";
import pillow from "./Components/pillow.webp";
import firstaid from "./Components/firstaid.jpg";
import Navbar from "./Navbar";

const imageMap = {
  blanket,
  food,
  medicine,
  torchlight,
  umbrella,
  clothes,
  boots,
  waterbottle,
  batteries,
  candle,
  pillow,
  firstaid,
};

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedItems } = location.state || { selectedItems: [] };
  const handleProceedToNGOCards = () => {
    console.log(
      "Selected Items: " +
        selectedItems.map((item) => `${item.name} (${item.count})`).join(", ")
    );
    navigate("/ngo", { state: { selectedItems } });
  }

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <h2 style={{fontFamily:"Roboto",fontSize:"50px",marginTop:"15px"}}>Products to be donated:</h2>
      <ul className="cards">
        {selectedItems.map(({ name, count }) => (
          <li key={name.toLowerCase()}> {/* Ensure unique key */}
            <a href="#" className="card">
              <img
                src={imageMap[name.toLowerCase()]}
                className="card__image"
                alt={name}
              />
              <div className="card__overlay">
                <div className="card__header">
                  <h3 className="card__title">{name}</h3>
                  <p className="card__quantity">Quantity: {count}</p>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <center>
       
          <button className="checkout-button" style={{padding:"10px",backgroundColor:"rgba(16, 4, 56, 0.9)",marginTop:"2px"}} onClick={handleProceedToNGOCards}>Donate</button>
       
      </center>
    </div>
  );
};


export default Cart;