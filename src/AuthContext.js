import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(""); 
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) {
      fetchUserData(storedEmail); 
    }
  }, []);

  const fetchUserData = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${email}`);
      if (response.data) {
        setIsLoggedIn(true);
        setUserName(response.data.firstname); 
        setEmail(email);
      }
    } catch (error) {
      console.error("Failed to fetch user data", error);
      
      sessionStorage.removeItem("email");
      setIsLoggedIn(false);
      setUserName("");
    }
  };

  const login = async (email, password) => {
        await fetchUserData(email);
        setIsLoggedIn(true);
        setUserName(userName);
        setEmail(email);
        sessionStorage.setItem("email", email);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setEmail("");
    sessionStorage.removeItem("email");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);