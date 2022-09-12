import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Menu from "./components/MenuComponent.jsx";
import Dishes from "./shared/dishes.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: Dishes
    };
  }
  render() {
    return (
      <div className="App">
        <div className="navContainer">
          <div className="nav">
            <h3>Restaurant con fusion</h3>
          </div>
        </div>
        <Menu data={this.state.dishes} />
      </div>
    );
  }
}

export default App;
