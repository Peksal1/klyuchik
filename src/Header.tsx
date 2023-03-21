import { Avatar, Layout } from "antd";
import Title from "antd/es/typography/Title";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/Header.css";
import LoginPopover from "./components/loginPopover/index.tsx";

const { Header } = Layout;

function AppHeader() {
  const [bnetProfileName, setBnetProfileName] = useState("");

  useEffect(() => {
    // Make API call to retrieve user's Battle.net profile information
    axios
      .get("https://klyuchik-v-durku-backend.herokuapp.com/bnet/profile")
      .then((response) => {
        // Set the user's Battle.net profile name in state
        setBnetProfileName(response.data.name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
      {bnetProfileName ? (
        <div style={{ color: "white" }}>Hello, {bnetProfileName}!</div>
      ) : (
        <LoginPopover />
      )}
    </Header>
  );
}

export default AppHeader;
