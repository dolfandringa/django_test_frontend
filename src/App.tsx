import React from "react";
//import "semantic-ui-less/semantic.less";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import NavBar from "./components/navbar";
import { Container } from "semantic-ui-react";

export const App = () => (
  <Container>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Router>
  </Container>
);
