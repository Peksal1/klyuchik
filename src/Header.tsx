import { Layout } from "antd";
import React from "react";
import LoginPopover from "./components/loginPopover/index.tsx";
import sanitar from "./images/sanitar.jpg";
import "./styles/Header.css";

const { Header } = Layout;

function AppHeader() {
  return (
    <Header className="header">
      <div className="logo-container">
        <img
          src={sanitar}
          alt="Logo"
          className="logo"
          style={{ width: "50%" }}
        />

        <h1 className="header-text">Ключик В Дурку</h1>
      </div>
      <LoginPopover />
    </Header>
  );
}

export default AppHeader;
