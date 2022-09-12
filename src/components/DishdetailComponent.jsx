import React, { Component } from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";

class DishDetail extends Component {
  renderDish() {
    if (this.props.selectedDish != null) {
      return (
        <Card>
          <CardImg
            src={this.props.selectedDish.image}
            alt={this.props.selectedDish.name}
          />
          <CardBody>
            <CardTitle className="title">
              {this.props.selectedDish.name}
            </CardTitle>
            <CardText>{this.props.selectedDish.description}</CardText>
          </CardBody>
        </Card>
      );
    }
  }
  renderComment(value) {
    if (value.length != 0) {
      var randNum = Math.floor(Math.random() * 1000);
      return (
        <div className="comment">
          <Card>
            <CardTitle>
              <h4>Comments</h4>
              <hr />
            </CardTitle>
            {value.map(comment => {
              return (
                <div key={comment.id}>
                  <h3>{comment.comment}</h3>
                  <h5>{comment.author}</h5>
                  <hr />
                </div>
              );
            })}
          </Card>
        </div>
      );
    }
  }

  render() {
    var commentsOndish =
      this.props.selectedDish != null ? this.props.selectedDish.comments : "";
    return (
      <div className="row">
        <div className="col-12 col-md-5">{this.renderDish()}</div>
        <div className="col-12 col-md-5">
          {this.renderComment(commentsOndish)}
        </div>
      </div>
    );
  }
}
export default DishDetail;
