import { Avatar } from "antd";
import React from "react";
import {
  AiFillFacebook,
  AiFillYoutube,
  AiFillTwitterSquare,
} from "react-icons/ai";
import sanitar from "./images/sanitar2.jpg";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#8c1616",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "10px" }}>
          <a href="https://twitter.com/peksal1">
            <AiFillTwitterSquare size="2em" color="#fff" />
          </a>
        </div>
        <div style={{ marginRight: "10px" }}>
          <a href="https://www.youtube.com/@MegaIlja100">
            <AiFillYoutube size="2em" color="#fff" />
          </a>
        </div>
        <div style={{ marginRight: "10px" }}>
          <a href="https://www.facebook.com/iljlau/">
            <AiFillFacebook size="2em" color="#fff" />
          </a>
        </div>
        <div style={{ marginRight: "10px" }}>
          <a href="https://www.twitch.tv/peksal1">
            <img
              src="https://img.icons8.com/color/48/000000/twitch--v1.png"
              alt="Twitch"
              height="20px"
              style={{ filter: "invert(1)" }}
            />
          </a>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "10px" }}>
          <span style={{ color: "white" }}>&copy; Ключик в дурку 2019</span>
        </div>
        <div>
          <Avatar size={30} src={sanitar} style={{ marginRight: "24px" }} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
