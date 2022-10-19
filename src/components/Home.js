import React, { Component } from "react";
import RenderHomePage from "./RenderHomePage.js";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
class Home extends Component {
  //C () ?
  render() {
    window.scroll(0, 0);
    //console.log("home", this.props.promotion);
    return (
      <React.Fragment>
        <motion.div
          intial={{ width: 0 }}
          animate={{ width: "100%" }}
          exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
          className="container"
        >
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
        </motion.div>
      </React.Fragment>
    );
  }
}

export default Home;
