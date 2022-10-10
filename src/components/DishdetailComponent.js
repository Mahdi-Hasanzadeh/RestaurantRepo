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
  FormFeedback,
  Row
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { addComment } from "../ConfigureStore.js";
const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  handleToggle = () => {
    this.setState(prevData => {
      return {
        isOpen: !prevData.isOpen
      };
    });
  };
  //()

  handleSubmit = values => {
    this.props.dispatch(
      addComment({
        dishId: this.props.dishId,
        author: values.author,
        comment: values.comment,
        rating: values.rating
      })
    );
    this.handleToggle();
    // if (
    //   formData.name.length === 0 ||
    //   formData.comment.length === 0 ||
    //   formData.name.length > 15
    // ) {
    //   alert("Please fill out the form correctly");
    // } else {
    //   alert(
    //     `Name:${formData.name}  rating:${formData.rating}  comment:${formData.comment}`
    //   );
    //   setIsOpen(prevData => !prevData);
    // }
  };
  render() {
    return (
      <React.Fragment>
        <div className="col-5 mb-2 ">
          <i className="">
            <button onClick={this.handleToggle} className="commentBtn">
              Submit Comment
            </button>
          </i>
        </div>
        <Modal isOpen={this.state.isOpen} toggle={this.handleToggle}>
          <ModalHeader
            toggle={this.handleToggle}
            className="bg bg-primary text-white"
          >
            Submit Comment
          </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Control.select
                  className="form-control"
                  name="rating"
                  model=".rating"
                  id="rating"
                  validators={{
                    required
                  }}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>

                <Errors
                  className="text-danger"
                  model=".rating"
                  show="touched"
                  messages={{
                    required: "Required"
                  }}
                />
              </Row>
              <br />
              <Row className="form-group">
                <Label htmlFor="author">Name</Label>
                <Control.text
                  model=".author"
                  className="form-control"
                  placeholder="Name"
                  name="author"
                  id="author"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15)
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                    required: "Required,",
                    minLength: "Name Should be at least 3 Characters",
                    maxLength: "Name Should be at max 15 Characters"
                  }}
                />
              </Row>
              <br />
              <Row className="form-group">
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea
                  row="6"
                  className="form-control"
                  model=".comment"
                  placeholder="Your Comment Here..."
                  name="comment"
                  id="comment"
                  validators={{
                    required,
                    minLength: minLength(1)
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".comment"
                  show="touched"
                  messages={{
                    required: "Required,",
                    minLength: "Write a comment"
                  }}
                />
              </Row>
              <Row className="form-group">
                <Col>
                  <Input
                    type="submit"
                    value="Submit"
                    className="mt-1 bg bg-primary text-white"
                  />
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

function DishDetail(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { productId } = useParams();
  const dish = props.data.filter(item => item.id == productId)[0];
  const comments = props.comments.filter(item => item.dishId == productId);

  // const [formData, setFormData] = React.useState({
  //   name: "",
  //   rating: "1",
  //   comment: "",
  //   Touched: {
  //     name: false,
  //     comment: false
  //   }
  // });

  // const handleChange = event => {
  //   const { name, value } = event.target;
  //   setFormData(prevData => {
  //     return {
  //       ...prevData,
  //       [name]: value
  //     };
  //   });
  // };

  // const handleBlur = event => {
  //   const { name } = event.target;
  //   setFormData(prevData => {
  //     return {
  //       ...prevData,
  //       Touched: {
  //         ...prevData.Touched,
  //         [name]: true
  //       }
  //     };
  //   });
  // };

  // const validation = (name, comment) => {
  //   const errors = {
  //     name: "",
  //     comment: ""
  //   };
  //   if (formData.Touched.name && name.length < 3) {
  //     errors.name = "Name Should be at least 2 Characters";
  //   } else if (formData.Touched.name && name.length > 15) {
  //     errors.name = "Name Should be utmost 15 Characters";
  //   }

  //   if (formData.Touched.comment && comment.length < 3) {
  //     errors.comment = "comment Should be at least 3 Characters";
  //   }

  //   return errors;
  // };
  // const errors = validation(formData.name, formData.comment);

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
          <CommentForm dispatch={dispatch} dishId={dish.id} />
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
    </React.Fragment>
  );
}
{
  /* <div className="col-12">
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
          </div> */
}
export default DishDetail;
