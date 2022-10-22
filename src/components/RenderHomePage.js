import React from "react";
import Loading from "./Loading.js";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import logo from "../images/MahdiHasanzadeh.jpg";
// import { motion } from "framer-motion";
export default function RenderHomePage(props) {
  //C () ?
  function Render() {
    if (props.isLoading) {
      return (
        <div className="homeLoading">
          <Loading />
        </div>
      );
    } else if (props.item.status === false) {
      return (
        <Card>
          <CardTitle>
            Fetching Failed<br />
            {props.item.error}
          </CardTitle>
        </Card>
      );
    } else {
      const slice = props.item.image.split("/")[2];
      return (
        <Card>
          <CardImg src={require(`../images/${slice}`)} alt={props.item.name} />
          <CardBody>
            <CardTitle className="cardTitle">{props.item.name}</CardTitle>
            {props.item.designation ? (
              <CardSubtitle className="cardSubtitle">
                {props.item.designation}
              </CardSubtitle>
            ) : null}
            <CardText>{props.item.description}</CardText>
          </CardBody>
        </Card>
      );
    }
  }
  return <div className="col-12 col-md-4">{Render()}</div>;
}
