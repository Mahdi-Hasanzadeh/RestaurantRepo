import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Main from "./components/MainComponent.jsx";
import { BrowserRouter } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );
  }
}

export default App;
