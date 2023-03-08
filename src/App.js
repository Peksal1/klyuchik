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
        }}
      >
        <Item key="home" style={{ width: "20%", textAlign: "center" }}>
          <Link to="/">Дом</Link>
        </Item>
        <Item key="about" style={{ width: "20%", textAlign: "center" }}>
          <Link to="/about">О Гильдии</Link>
        </Item>
        <Item key="boosting" style={{ width: "20%", textAlign: "center" }}>
          <Link to="/boosting">Бустинг</Link>
        </Item>
        <Item key="guides" style={{ width: "20%", textAlign: "center" }}>
          <Link to="/guides">Гайды</Link>
        </Item>
        <Item key="best" style={{ width: "20%", textAlign: "center" }}>
          <Link to="/best">Лучшие</Link>
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
