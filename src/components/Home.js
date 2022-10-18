import React, { Component } from "react";
import RenderHomePage from "./RenderHomePage.js";
import { Link } from "react-router-dom";
class Home extends Component {
  //C () ?
  render() {
    //console.log("home", this.props.promotion);
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
            <RenderHomePage
              isLoading={this.props.isLoadingDish}
              item={this.props.featuredDish}
            />
            <RenderHomePage
              isLoading={this.props.isLoadingPromotion}
              item={this.props.promotion}
            />
            <RenderHomePage
              isLoading={this.props.isLoadingLeader}
              item={this.props.featuredLeader}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
