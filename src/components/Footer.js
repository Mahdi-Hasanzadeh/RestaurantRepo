import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container footer">
          <div className="row  ">
            <div className="links row-container col-12  col-md-4">
              <div className="soc">
                <h4>Links</h4>
                <Link className="link" to="/">
                  <i className="fa fa-home">Home</i>
                </Link>
                <Link className="link" to="/menu">
                  <i className="fa fa-list">Menu</i>
                </Link>
                <Link className="link" to="/about">
                  <i className="fa fa-info-circle">About</i>
                </Link>
                <Link className="link" to="/Contact">
                  <i className="fa fa-address-card">Contact</i>
                </Link>
              </div>
            </div>
            <div className="address row-container col-12 col-md-4">
              <h4>Our Address</h4>
              <p className="addresscenter">121,Clear Water Bay Road Kowioon </p>
              <p className="addresscenter">Clear Water Bay HONG KONG</p>

              <i className="fa fa-phone fa-lg">Phone:09029342619</i>
              <br />
              <i className="fa fa-address-book-o fa-lg">
                <a href="mailto:mahdi786trygame@gmail.com">
                  &nbsp;confusion@food.net
                </a>{" "}
              </i>
            </div>
            <div className="social row-container col-12 col-md-4">
              <div className="soc">
                <h4>Social Media</h4>
                <a
                  href="www.instagram.com"
                  className="socialLink fa fa-instagram fa-lg"
                >
                  Instagram
                </a>
                <a
                  href="www.facebook.com"
                  className="socialLink fa fa-facebook fa-lg"
                >
                  Facebook
                </a>
                <a
                  href="www.twitter.com"
                  className="socialLink fa fa-twitter fa-lg"
                >
                  Twitter
                </a>
                <a
                  href="www.youtube.com"
                  className="socialLink fa fa-youtube fa-lg"
                >
                  Youtube
                </a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
