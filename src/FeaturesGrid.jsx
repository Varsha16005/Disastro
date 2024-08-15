import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import { styled } from "@mui/system";
import PublicIcon from "@mui/icons-material/Public";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ContactsIcon from "@mui/icons-material/Contacts";
import BalanceIcon from "@mui/icons-material/Balance";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import SecurityIcon from "@mui/icons-material/Security";
import RadioIcon from "@mui/icons-material/Radio";
import SyncIcon from "@mui/icons-material/Sync";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

import res from "./res.png";
import Navbar from "./Navbar";

const features = [
  {
    icon: <PublicIcon fontSize="large" style={{ color: "#1E88E5" }} />,
    title: "Interactive Map Display",
  },
  {
    icon: <AssessmentIcon fontSize="large" style={{ color: "#43A047" }} />,
    title: "Needs Assessment",
  },
  {
    icon: <MonetizationOnIcon fontSize="large" style={{ color: "#FB8C00" }} />,
    title: "Donation Flexibility",
  },
  {
    icon: <ContactsIcon fontSize="large" style={{ color: "#8E24AA" }} />,
    title: "NGO Contacts",
  },
  {
    icon: <BalanceIcon fontSize="large" style={{ color: "#FDD835" }} />,
    title: "Demand-Supply Balance",
  },
  {
    icon: <AddLocationIcon fontSize="large" style={{ color: "#D81B60" }} />,
    title: "Disaster Location Addition",
  },
  {
    icon: <SecurityIcon fontSize="large" style={{ color: "#3949AB" }} />,
    title: "Secure Financial Donations",
  },
  {
    icon: <RadioIcon fontSize="large" style={{ color: "#FF7043" }} />,
    title: "Community Awareness",
  },
  {
    icon: <SyncIcon fontSize="large" style={{ color: "#00ACC1" }} />,
    title: "Coordinating Interface",
  },
];

const Footer = styled("footer")({
  backgroundColor: "rgba(16, 4, 56, 0.9)",
  color: "white",
  textAlign: "center",
  padding: "50px 0",
});

const AddressContainer = styled(Grid)({
  color: "rgba(255, 255, 255, 0.8)",
  marginBottom: "30px",
});

const AddressItem = styled(Grid)({
  marginBottom: "10px",
  textAlign: "center",
});

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  margin: "10px",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
  },
});

const StatBox = styled("div")({
  color: "red",
  fontSize: "3rem",
  textAlign: "center",
 
});

const SocialMediaIcon = styled("a")({
  margin: "0 10px",
  color: "white",
  "&:hover": {
    color: "#0073e6",
  },
});

const GlowContainer = styled("div")({
  marginTop: "20px",
  textAlign: "center",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "lavender",
  marginLeft: "10%",
  marginRight: "10%",
  height: "170px",
  transition: "box-shadow 0.3s",
  "&:hover": {
    boxShadow: "0 0 20px 5px rgba(0, 0, 0, 0.2)",
  },
});

const FeaturesGrid = () => (
  <div>
    <Navbar></Navbar>
    <img
      src={res}
      style={{ height: "100vh", marginTop: "5%", marginBottom: "5%" }}
    />
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Key Features
      </Typography>
      <Grid container spacing={2}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledCard style={{ backgroundColor: "lightgrey" }}>
              {feature.icon}
              <CardContent>
                <Typography variant="h6" align="center">
                  {feature.title}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
    <br />
    <br />
    <br />
    <GlowContainer>
      <StatBox>
        25+
        <br />
        Disasters
      </StatBox>
      <StatBox>
        10,000+
        <br />
        Survivors
      </StatBox>
      <StatBox>
        2,00,000+
        <br />
        Our Support
      </StatBox>
    </GlowContainer>
    <br></br>

    <Footer>
      <Container>
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "70%",
            margin: "10px auto 50px auto",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: "2px",
            }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.25rem", marginBottom: "0" }}
          >
            Feel free to contact us anytime!!
          </Typography>
        </Box>

        <AddressContainer container spacing={4}>
          <AddressItem item xs={12} sm={6} md={3}>
            <LocationOnIcon fontSize="large" sx={{ marginBottom: "10px" }} />
            <Typography
              variant="h6"
              sx={{ textTransform: "uppercase", marginBottom: "0" }}
            >
              Address
            </Typography>
            <Typography variant="body1">
              No:1 Thiru street , Chennai Tamil Nadu
            </Typography>
          </AddressItem>

          <AddressItem item xs={12} sm={6} md={3}>
            <PhoneIcon fontSize="large" sx={{ marginBottom: "10px" }} />
            <Typography
              variant="h6"
              sx={{ textTransform: "uppercase", marginBottom: "0" }}
            >
              Phone number
            </Typography>
            <Typography variant="body1">+91 9444444444</Typography>
          </AddressItem>

          <AddressItem item xs={12} sm={6} md={3}>
            <EmailIcon fontSize="large" sx={{ marginBottom: "10px" }} />
            <Typography
              variant="h6"
              sx={{ textTransform: "uppercase", marginBottom: "0" }}
            >
              Email
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "0" }}>
              disastro@gmail.com
            </Typography>
          </AddressItem>

          <AddressItem item xs={12} sm={6} md={3}>
            <HeadsetMicIcon fontSize="large" sx={{ marginBottom: "10px" }} />
            <Typography
              variant="h6"
              sx={{ textTransform: "uppercase", marginBottom: "0" }}
            >
              Toll free
            </Typography>
            <Typography variant="body1">100 302 2302</Typography>
          </AddressItem>
        </AddressContainer>

        <Box mt={3}>
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: "2px",
              marginTop: "0px",
              padding: "0",
            }}
          >
            Follow Us
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <SocialMediaIcon href="https://twitter.com">
              <TwitterIcon fontSize="large" />
            </SocialMediaIcon>
            <SocialMediaIcon href="https://facebook.com">
              <FacebookIcon fontSize="large" />
            </SocialMediaIcon>
            <SocialMediaIcon href="https://instagram.com">
              <InstagramIcon fontSize="large" />
            </SocialMediaIcon>
          </Box>
        </Box>
      </Container>
    </Footer>
  </div>
);

export default FeaturesGrid;