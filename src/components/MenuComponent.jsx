import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardTitle,
  CardBody
} from "reactstrap";
import DishDetail from "./DishdetailComponent.jsx";
class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFood: null
    };
  }

  handleClck(value) {
    this.setState({ selectedFood: value });
  }
  render() {
    var menu = this.props.data.map(item => {
      return (
        <div key={item.id} className="col-12 col-md-5 col">
          <Card
            onClick={() => {
              this.handleClck(item);
            }}
          >
            <CardImg width="100%" src={item.image} alt={item.name} />
            <CardImgOverlay>
              <CardTitle>{item.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">{menu}</div>
        <DishDetail selectedDish={this.state.selectedFood} />
      </div>
    );
  }
}
export default Menu;
