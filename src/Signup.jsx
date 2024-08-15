import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Paper, Typography, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import "./Style.css";

const Signup = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { firstname, lastname, email, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/users/register", user);
      navigate("/login");
    } catch (err) {
      console.error("Error registering user", err);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={10}
        style={{
          width: "100%",
          maxWidth: "500px",
          height: "500px",
          padding: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          borderRadius: "20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography style={{ fontSize: "40px", fontFamily: "initial" }}>
          Sign Up
        </Typography>

        <form onSubmit={onSubmit} className="forms" style={{ marginTop: "0", backgroundColor: "rgba(255, 255, 255, 0.03)" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", width: "400px" }}>
              <TextField
                label="Firstname"
                name="firstname"
                type="text"
                variant="standard"
                placeholder="Enter firstname"
                style={{ width: "48%" }}
                value={firstname}
                onChange={onInputChange}
              />
              <TextField
                label="Lastname"
                name="lastname"
                type="text"
                variant="standard"
                placeholder="Enter lastname"
                style={{ width: "48%" }}
                value={lastname}
                onChange={onInputChange}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "60px",
              alignItems: "center",
              width: "300px",
            }}
          >
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="standard"
              placeholder="Enter email"
              style={{ width: "80%" }}
              value={email}
              onChange={onInputChange}
            />
            <br />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              variant="standard"
              autoComplete="new-password"
              placeholder="Enter password"
              style={{ width: "80%" }}
              value={password}
              onChange={onInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      style={{backgroundColor:"transparent"}}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <br />
          <center>
            <Button
              type="submit"
              variant="contained"
              style={{ width: "100px", marginLeft: "150px", backgroundColor: "rgba(16, 4, 56, 0.9)" }}
            >
              Sign Up
            </Button>
          </center>
        </form>
        <br />
        <Link
          to="/Login"
          style={{
            color: "darkblue",
            textDecoration: "none",
            fontSize: "17px",
          }}
        >
          Already have an account?
        </Link>
      </Paper>
    </div>
  );
};

export default Signup;
