import { Avatar, Layout } from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import LoginPopover from "./components/loginPopover/index.tsx";
import "./styles/Header.css";

const { Header } = Layout;

function AppHeader() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/profile");
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
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
      {user ? (
        <div style={{ color: "white", marginLeft: "auto" }}>
          {user.battletag}
        </div>
      ) : (
        <LoginPopover />
      )}
    </Header>
  );
}

export default AppHeader;
