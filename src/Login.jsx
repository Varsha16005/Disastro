import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useAuth } from "./AuthContext"; 

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const ProceedLogin = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${email}`
        );
        const user = response.data;

        if (!user) {
          toast.error("User not found");
        } else if (user.password === password) {
          toast.success("Login successful");
          login(email);
          navigate("/");
        } else {
          toast.error("Invalid credentials");
        }
      } catch (err) {
        toast.error("Login failed due to: " + err.message);
      }
    }
  };

  const validate = () => {
    let result = true;
    if (!email) {
      result = false;
      toast.warning("Please enter username");
    }
    if (!password) {
      result = false;
      toast.warning("Please enter password");
    }
    return result;
  };

  return (
    <Paper
      elevation={10}
      style={{
        width: "40%",
        maxWidth: "500px",
        height: "500px",
        padding: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderRadius: "20px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <center>
        <Typography style={{ fontSize: "40px", fontFamily: "initial" }}>
          Login Page
        </Typography>
        <br />
        <TextField
          id="email"
          label="Email"
          variant="standard"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "70%" }}
        />
        <br />
        <br />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="standard"
          autoComplete="new-password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "70%" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  style={{ backgroundColor: "transparent" }}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <br />
        <br />
        <Checkbox color="primary" /> Remember me
        <br />
        <br />
        <Button
          variant="contained"
          onClick={ProceedLogin}
          style={{ width: "100px", backgroundColor: "rgba(16, 4, 56, 0.9)" }}
        >
          Login
        </Button>
        <br />
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link
            to="/signup"
            style={{
              color: "darkblue",
              textDecoration: "none",
              marginRight: "20px",
              fontSize:"17px"
            }}
          >
            {"Don't have an account?"}
          </Link>
          <Link
            to="#"
            style={{
              color: "darkblue",
              textDecoration: "none",
              fontSize:"17px"
            }}
          >
            {"Forgot password?"}
          </Link>
        </div>
      </center>
      <ToastContainer />
    </Paper>
  );
};

export default Login;