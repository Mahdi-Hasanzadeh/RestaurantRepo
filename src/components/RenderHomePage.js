import React from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  CardSubtitle
} from "reactstrap";
export default function RenderHomePage(props) {
  return (
    <div className="col-12 col-md-4">
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
    </div>
  );
}
