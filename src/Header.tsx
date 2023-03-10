import { Avatar, Layout } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import LoginPopover from "./components/loginPopover/index.tsx";
import "./styles/Header.css";

const { Header } = Layout;

function AppHeader() {
  return (
    <Header className="header">
      <div className="logo-container">
        <Avatar size={50} src="/sanitar2.jpg" style={{ marginRight: "24px" }} />
        <Title level={3} style={{ display: "inline-block", color: "white" }}>
          Ключик в Дурку
        </Title>
      </div>
      <LoginPopover />
    </Header>
  );
}

export default AppHeader;
