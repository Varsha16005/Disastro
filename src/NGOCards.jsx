import React, { useEffect, useState } from "react";
import "./NGOCards.css";
import Dropdown from "./Dropdown";
import Navbar from "./Navbar";
import { Button, Modal, Box, TextField } from "@mui/material";
import emailjs from "emailjs-com";
import { useLocation, useNavigate } from "react-router-dom";

const ngos = {
  Coimbatore: [
    {
      name: "Coodu Organisation Society",
      address: "15A, Kongu Nagar East, Ramanadhapuram, Coimbatore - 641045",
      phone: "9443152661",
      website: "http://www.coodu.org/",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP-MsfEf07Y9-ws6DZvdmR4GOSG7ZZhcLnbQ&s",
    },
    {
      name: "Arulagam Society",
      address:
        "12/483, Poonthalir Nursery Garden Masakavundanpudhur, Ellappayalam Post, Annur Taluk, Coimbatore 641 697",
      phone: "0422-4346772 / 9843211772",
      website: "http://www.senseintindia.org/",
      image:
        "https://save-vultures.org/wp-content/uploads/2019/06/Arulagam.png",
    },
    {
      name: "Ramasamy Chinnammal Trust",
      address:
        "Park Street, S K R Nagar, Goundampalayam Goundampalayam, Coimbatore, India 641030",
      phone: "0422-2423074 / 9994444010",
      website:
        "https://www.bing.com/ck/a?!&&p=30e225f7b4ebd997JmltdHM9MTcyMjEyNDgwMCZpZ3VpZD0yODhhZTkzMS1kOTgwLTZiYWMtMjg2MC1mZGJlZDg1MjZhMzEmaW5zaWQ9NTE5Ng&ptn=3&ver=2&hsh=3&fclid=288ae931-d980-6bac-2860-fdbed8526a31&psq=amasamy+Chinnammal+Trust&u=a1aHR0cHM6Ly9yY3Rjb2ltYmF0b3JlLmluL2Fib3V0Lmh0bWw&ntb=1",
      image:
        "https://is4-ssl.mzstatic.com/image/thumb/Purple114/v4/27/99/4b/27994b3b-41c9-bc95-5a99-c2dd68635820/source/512x512bb.jpg",
    },
    {
      name: "Imayam Social Welfare Association",
      address: "No.3.Anna Nagar, Ganapathy, Coimbatore",
      phone: "0422 2524699 / 9942216292",
      website:
        "https://yt3.ggpht.com/a-/AAuE7mCeCb-yBXFf_FblHhW3siv3hrPyOvnkb1jdew=s900-mo-c-c0xffffffff-rj-k-no",
      image: "https://nettv4u.com/uploads/imayam.jpg",
    },
    {
      name: "Sri Kanchi Kamakoti Medical Trust",
      address:
        "Sankara Eye Centre sathy Road sivanandapuram coimbatore tamil Nadu pin Code:641035",
      phone: "4224236789",
      website:
        "https://www.bing.com/ck/a?!&&p=5c6758a949988dbdJmltdHM9MTcyMjEyNDgwMCZpZ3VpZD0yODhhZTkzMS1kOTgwLTZiYWMtMjg2MC1mZGJlZDg1MjZhMzEmaW5zaWQ9NTIzMw&ptn=3&ver=2&hsh=3&fclid=288ae931-d980-6bac-2860-fdbed8526a31&psq=Sri+Kanchi+Kamakoti+Medical+Trust&u=a1aHR0cHM6Ly9zYW5rYXJhZXllLmNvbS8&ntb=1",
      image:
        "https://projectheena.com/uploads/ngo/31167411280984/profileImage/images/skkmt.png",
    },
  ],
  Chennai: [
    {
      name: "Bhumi",
      address: "13/1, Cenotaph Road First Lane Teynampet Chennai 600 018",
      phone: "044-22391014 / 9840091634",
      website: "http://bhumi.ngo",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKhn8CQeuuKRLUpG5P4IE40lYmoP5hrEc73sUeR2KNa-0DDiLOP2WGX6Uk48e_pK-lAzQ&usqp=CAU",
    },
    {
      name: "Nice Foundation",
      address:
        "No.198, 2nd Floor, Purasawalkam High Road, Purasawalkam, Chennai 600 010",
      phone: "044-43539636 / 9444145253",
      website: "http://www.sanchetana.org/",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyf-jK3mKU4jwlZYbSx7MKmuMK8akLrHz7Ew&s",
    },
    {
      name: "Mudhra",
      address: "Mudhra, 26, Rama Street, Nungambakkam Chennai -600 034",
      phone: "044-28264493 / 09382163330",
      website: "http://mudhra.org",
      image:
        "https://content.jdmagicbox.com/comp/chennai/u1/044pxx44.xx44.180618221803.p8u1/catalogue/emudhra-digital-signature-west-mambalam-chennai-digital-signature-services-ee2zgugi2g-250.jpg",
    },
    {
      name: "Ekam",
      address:
        "Old No. 1A / New No.3, Jayalakshmipuram 2nd Street, Nungambakkam, Chennai - 600034",
      phone: "044-35011773",
      website: "http://ekamoneness.org",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGoThKm6Ya5t4MNLVvL4uB-DVYZAPl_Anqfg&s",
    },
  ],
  Bangalore: [
    {
      name: "Happiness Acts Trust",
      address:
        "A404, Prospect Princeton, Manipal County Road, Begur, Bengaluru – 560068",
      phone: "+91 93424 68808",
      website: "http://happinessacts.org",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1inFExFnYi14a8MwRQVGy894MWUiUBaH3-w&s",
    },
    {
      name: "Dhwani Foundation",
      address:
        "614, 2nd Main Road, 11th cross, 3rd Phase, JP Nagar, Bengaluru, Karnataka 560078, India",
      phone: "+91 80 4957 6030",
      website: "https://www.youthforparivarthan.org.in/",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBiM27UW_iAZuA_nHa4vyAgxU7IeKqhT0b-Q&s",
    },
    {
      name: "The Akshaya Patra Foundation",
      address:
        "#72, 3rd Floor, 3rd Main Road, 1st & 2nd Stage, Yeshwantpur Industrial Suburb, Rajajinagar Ward No. 10, Bengaluru – 560022",
      phone: "+91 93270 38496",
      website: "https://www.akshayapatra.org/",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw4Wm4EW7jxGbsWrFroJ2EfS1yzH4u7-tCtQ&s",
    },
    {
      name: "Give India",
      address: "Bengaluru, Marathahalli Outer Ring Rd, Aswath Nagar",
      website: "https://www.giveindia.org/",
      image:
        "https://serudsindia.org/wp-content/uploads/2019/09/GiveIndia-Review_-Is-it-Safe-to-Give-India-via-GiveIndia_.png",
    },
  ],
  Kanyakumari: [
    {
      name: "Vidial Social Service Center",
      address: "Meenakshipuram, Nagercoil, Kanyakumari, Tamilnadu, India",
      phone: "vidialssc@gmail.com",
      website: "https://www.vidial-ngo.com/",
      image:
        "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1200,h=630,fit=crop,f=jpeg/d95310GWejtO4vbk/vidiyal-logo-2-Yle6l4gjZMCoWnJ8.png",
    },
    {
      name: "Athencottasan Muthamizh Kazhagam AMK",
      address:
        "The Director, athencottasan Muthamizh Kazhagam-amk no.7-46 B, Naduvoorkarai Road, mondaikadu",
      phone: "9444691456",
      website: "http://www.amkcentre.org",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ4Yya0wO8SPVDMg_sOu6rEowFsaWNMtMoWQ&s",
    },
    {
      name: "Vivekananda Kendra Kanyakumar",
      address: "Vivekananda Kendravivekanandapuram kanyakumari 629702",
      phone: "9442146261",
      website: "http://www.vkendra.org",
      image: "https://live.staticflickr.com/65535/52108887022_b827a97b74_b.jpg",
    },
    {
      name: "Marthandam Integrated Development Society",
      address:
        "Mids Office, Edaivilagam kazhuvanthittai, Kuzhithruai P.o kanayakumari-district, Tamilnadu- 629163",
      phone: "9486521334",
      website:
        "https://www.bing.com/ck/a?!&&p=cde1058e4c035614JmltdHM9MTcyMjEyNDgwMCZpZ3VpZD0yODhhZTkzMS1kOTgwLTZiYWMtMjg2MC1mZGJlZDg1MjZhMzEmaW5zaWQ9NTQ1OQ&ptn=3&ver=2&hsh=3&fclid=288ae931-d980-6bac-2860-fdbed8526a31&psq=MARTHANDAM+INTEGRATED+DEVELOPMENT+SOCIETY&u=a1aHR0cDovL21pZHMub3JnLmluL2luZGV4LnBocA&ntb=1",

      image:
        "https://media.licdn.com/dms/image/C4E03AQEkktUCoogDyQ/profile-displayphoto-shrink_200_200/0/1660141744091?e=2147483647&v=beta&t=UtTjQMrQhJiA0VYN3WbuuIGr70ejPqU4NDvlXfq0efs",
    },
  ],
};

const NGOCards = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    pinCode: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();
  const { selectedItems } = location.state || { selectedItems: [] };
  console.log(
    "Received Items: " +
      selectedItems.map((item) => `${item.name} (${item.count})`).join(", "));

  const [selectedNgo, setSelectedNgo] = useState(null);

  const handleDropdownChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleOpen = (ngo) => {
    setSelectedNgo(ngo); // Set the selected NGO
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendEmail(formData);
    setSubmitted(true);
  };

  const sendEmail = (formData) => {
    emailjs
      .send(
        "service_pil6fk8",
        "template_oiythde",
        {
          to_email: formData.email,
          to_name: formData.name,
          from_name: "DISASTRO TEAM",
          from_email: "disastroteam076@gmail.com",
          contact: formData.contact,
          address: formData.address,
          pin_code: formData.pinCode,
          ngo: selectedNgo ? selectedNgo.name : "",
          selected_items: `${selectedItems
            .map(({ name, count }) => `${name} - ${count}`)
            .join(",")}`,
        },
        "1sF4NiHvnPrpNFgLz"
      )
      .then((response) => {
        console.log("Email sent successfully", response);
        console.log(
          selectedItems.map((item) => `${item.name} (${item.count})`).join(", ")
        );
      })
      .catch((error) => {
        console.error("Failed to send email", error);
      });
  };

  const filteredNgos = selectedLocation
    ? ngos[selectedLocation] || []
    : Object.values(ngos).flat();

  return (
    <div className="container">
      <Navbar />
      <br></br>
      <br></br>
      <Dropdown locations={Object.keys(ngos)} onChange={handleDropdownChange} />
      <div className="cards">
        {filteredNgos.map((ngo, index) => (
          <div key={index} className="card">
            <img src={ngo.image} alt={ngo.name} style={{ height: "300px" }} />
            <div className="card-content">
              <h3>{ngo.name}</h3>
              <p>{ngo.address}</p>
              <p>{ngo.phone}</p>
              {ngo.website && (
                <a
                  href={ngo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="anchors"
                >
                  Visit Website
                </a>
              )}
              <Button
                variant="contained"
                className="choose-button"
                onClick={() => handleOpen(ngo)}
              >
                CHOOSE
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box
          component="form"
          sx={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            height: 600,
            p: 4,
            bgcolor: "white",
            color: "black",
          }}
          onSubmit={handleSubmit}
        >
          {submitted ? (
            <div>
              <h2 style={{ textAlign: "center" }}>
                Thank You for Your Generosity!
              </h2>
              <center>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Close
                </Button>
              </center>
            </div>
          ) : (
            <div>
              <h2 style={{ textAlign: "center" }}>Donation Form</h2>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: "black" } }}
                InputProps={{ style: { color: "black" } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: "black" } }}
                InputProps={{ style: { color: "black" } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: "black" } }}
                InputProps={{ style: { color: "black" } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: "black" } }}
                InputProps={{ style: { color: "black" } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="PIN Code"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: "black" } }}
                InputProps={{ style: { color: "black" } }}
              />

              <center>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, bgcolor: "red" }}
                >
                  Donate
                </Button>
              </center>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default NGOCards;