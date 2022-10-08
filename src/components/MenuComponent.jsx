import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardTitle,
  CardBody
} from "reactstrap";
import { Link } from "react-router-dom";
function Menu(props) {
  var menu = props.data.map(item => {
    return (
      <div key={item.id} className="col-12 col-md-5 ">
        <Card>
          <CardImg width="100%" src={item.image} alt={item.name} />
          <CardImgOverlay>
            <CardTitle>{item.name}</CardTitle>
          </CardImgOverlay>
        </Card>
        <Link to={`/menu/${item.id}`}> More Info </Link>
      </div>
    );
  });
  return (
    <React.Fragment>
      <div className="container">
        <div className="tag">
          <Link className="link" to="/">
            Home
          </Link>
        </div>
        <br />
        <h2>Menu</h2>
        <hr />
        <div className="row justify-content-center">{menu}</div>
      </div>
    </React.Fragment>
  );
}

export default Menu;
