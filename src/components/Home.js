import React, { Component } from "react";
import RenderHomePage from "./RenderHomePage.js";
import { Link } from "react-router-dom";
class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="tag">
            <Link className="link" to="/menu">
              Menu
            </Link>
          </div>
          <br />
          <h2>Home</h2>
          <hr />
          <div className="row">
            <RenderHomePage item={this.props.featuredDish} />
            <RenderHomePage item={this.props.promotion} />
            <RenderHomePage item={this.props.featuredLeader} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
