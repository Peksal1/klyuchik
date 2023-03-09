import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Menu } from "antd";
import Header from "./Header.tsx";
import About from "./components/about/index.tsx";
import Home from "./components/home/index.tsx";
import Boosting from "./components/boosting/index.tsx";
import Guides from "./components/guides/index.tsx";
import Best from "./components/best/index.tsx";
import Footer from "./Footer.tsx";

const { Item } = Menu;

const App = () => {
  return (
    <Router>
      <Header />
      <Menu
        mode="horizontal"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#773333", // dark red background color for Horde feel
          border: "none", // remove border
        }}
      >
        <Item key="home" style={{ width: "20%", textAlign: "center" }}>
          <Link to="/" style={{ color: "#E8BB3D" }}>
            Дом
          </Link>{" "}
          {/* Yellow text color for Horde feel */}
        </Item>
        <Item key="about" style={{ width: "20%", textAlign: "center" }}>
          <Link to="/about" style={{ color: "#E8BB3D" }}>
            О Гильдии
          </Link>
        </Item>
        <Item key="boosting" style={{ width: "20%", textAlign: "center" }}>
          <Link to="/boosting" style={{ color: "#E8BB3D" }}>
            Бустинг
          </Link>
        </Item>
        <Item key="guides" style={{ width: "20%", textAlign: "center" }}>
          <Link to="/guides" active style={{ color: "#E8BB3D" }}>
            Гайды
          </Link>
        </Item>
        <Item key="best" style={{ width: "20%", textAlign: "center" }}>
          <Link to="/best" style={{ color: "#E8BB3D" }}>
            Лучшие
          </Link>
        </Item>
      </Menu>
      <div style={{ backgroundColor: "#F2F2F2", padding: "0 10%" }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/boosting" component={Boosting} />
          <Route exact path="/guides" component={Guides} />
          <Route exact path="/best" component={Best} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
