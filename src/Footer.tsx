import React from "react";
import { AiFillFacebook, AiFillYoutube, AiFillTwitterSquare } from "react-icons/ai";
import sanitar from "./images/sanitar.jpg";

const Footer = () => {
    return (
        <footer style={{ backgroundColor: "#FFA500", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "10px" }}>
                    <AiFillTwitterSquare size="2em" color="#fff" />
                </div>
                <div style={{ marginRight: "10px" }}>
                    <AiFillYoutube size="2em" color="#fff" />
                </div>
                <div style={{ marginRight: "10px" }}>
                    <AiFillFacebook size="2em" color="#fff" />
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "10px" }}>
                    <span>&copy; Ключик в дурку 2019</span>
                </div>
                <div>
                    <img src={sanitar} alt="logo" style={{ width: "30px", height: "30px" }} />
                </div>
            </div>
        </footer>
    );
};

export default Footer;