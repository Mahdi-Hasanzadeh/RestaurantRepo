import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Col,
  Input,
  Label,
  FormFeedback
} from "reactstrap";
import { useParams, Link } from "react-router-dom";

function DishDetail(props) {
  const [isOpen, setIsOpen] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: "",
    rating: "1",
    comment: "",
    Touched: {
      name: false,
      comment: false
    }
  });

  const { productId } = useParams();
  const dish = props.data.filter(item => item.id == productId)[0];
  const comments = props.comments.filter(item => item.dishId == productId);

  const handleToggle = () => {
    setIsOpen(prevData => !prevData);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => {
      return {
        ...prevData,
        [name]: value
      };
    });
  };

  const handleBlur = event => {
    const { name } = event.target;
    setFormData(prevData => {
      return {
        ...prevData,
        Touched: {
          ...prevData.Touched,
          [name]: true
        }
      };
    });
  };

  const validation = (name, comment) => {
    const errors = {
      name: "",
      comment: ""
    };
    if (formData.Touched.name && name.length < 3) {
      errors.name = "Name Should be at least 2 Characters";
    } else if (formData.Touched.name && name.length > 15) {
      errors.name = "Name Should be utmost 15 Characters";
    }

    if (formData.Touched.comment && comment.length < 3) {
      errors.comment = "comment Should be at least 3 Characters";
    }

    return errors;
  };
  const errors = validation(formData.name, formData.comment);

  const handleSubmit = event => {
    event.preventDefault();

    if (
      formData.name.length === 0 ||
      formData.comment.length === 0 ||
      formData.name.length > 15
    ) {
      alert("Please fill out the form correctly");
    } else {
      alert(
        `Name:${formData.name}  rating:${formData.rating}  comment:${formData.comment}`
      );
      setIsOpen(prevData => !prevData);
    }
  };

  function renderDish() {
    window.scrollTo(10, 10);
    return (
      <div className="col-12 col-md-5 ">
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle className="title">{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }

  function renderComment() {
    return (
      <div className=" col-12 col-md-5 comment ">
        <Card>
          <CardTitle>
            <h4>Comments</h4>
            <hr />
          </CardTitle>
          {comments.map(comment => {
            return (
              <div key={comment.id}>
                <h3>{comment.comment}</h3>
                <div className="info">
                  <h5 className="author">{comment.author}</h5>
                  <h5>
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit"
                    }).format(new Date(Date.parse(comment.date)))}
                  </h5>
                </div>
                <hr />
              </div>
            );
          })}
          <div className="col-5 mb-2 ">
            <i className="">
              <button onClick={handleToggle} className="commentBtn">
                Submit Comment
              </button>
            </i>
          </div>
        </Card>
      </div>
    );
  }
  return (
    <React.Fragment>
      <div className="container">
        <div className="tag">
          <Link className="link" to="/menu">
            Menu
          </Link>
        </div>
        <h2>{dish.name}</h2>
        <hr />
      </div>
      <div className="container">
        <div className="row justify-content-center">
          {renderDish()}
          {renderComment()}
        </div>
      </div>
      <Modal isOpen={isOpen} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle} className="bg bg-primary text-white">
          Submit Comment
        </ModalHeader>
        <ModalBody>
          <div className="col-12">
            <Form onSubmit={handleSubmit}>
              <FormGroup row>
                <Label htmlFor="rating">Rating</Label>
                <Col>
                  <Input
                    value={formData.rating}
                    onChange={handleChange}
                    type="select"
                    name="rating"
                    id="rating"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="name">Your Name</Label>
                <Col>
                  <Input
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    valid={errors.name === ""}
                    invalid={errors.name !== ""}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="comment">Comment</Label>
                <Col>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="textarea"
                    name="comment"
                    id="comment"
                    placeholder="Your Comment Here...."
                    valid={errors.comment === ""}
                    invalid={errors.comment !== ""}
                    value={formData.comment}
                  />
                  <FormFeedback>{errors.comment}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Input
                    className="bg bg-success"
                    type="submit"
                    value="Submit"
                  />
                </Col>
              </FormGroup>
            </Form>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

export default DishDetail;
