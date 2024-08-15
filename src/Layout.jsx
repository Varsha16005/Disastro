import React from "react";
import { Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        >
          <source src="./bgvideo.mp4" type="video/mp4" />
        </video>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
