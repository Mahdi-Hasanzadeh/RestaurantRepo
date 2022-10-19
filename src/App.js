import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Main from "./components/MainComponent.jsx";
import { HashRouter } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <HashRouter>
        <Main />
      </HashRouter>
    );
  }
}

export default App;
