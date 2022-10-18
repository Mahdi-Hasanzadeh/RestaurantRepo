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
      return (
        <Card>
          <CardImg src={props.item.image} alt="" />
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
