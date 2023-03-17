import { Avatar, Layout } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import LoginPopover from "./components/loginPopover/index.tsx";
import "./styles/Header.css";

const { Header } = Layout;

const express = require("express");
const app = express();

// Add this middleware to redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.headers["x-forwarded-proto"] !== "https") {
    return res.redirect("https://" + req.headers.host + req.url);
  }
  return next();
});

function AppHeader() {
  return (
    <Header className="header">
      <div className="logo-container">
        <Avatar size={50} src="/sanitar2.jpg" style={{ marginRight: "24px" }} />
        <Title
          level={3}
          style={{
            display: "inline-block",
            color: "white",
            fontFamily: "WarCraft",
          }}
        >
          Ключик в Дурку
        </Title>
      </div>
      <LoginPopover />
    </Header>
  );
}

export default AppHeader;
