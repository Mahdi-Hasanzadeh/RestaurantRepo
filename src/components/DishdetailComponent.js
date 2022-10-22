import React, { Component } from "react";
import Loading from "./Loading.js";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Col,
  Input,
  Label,
  FormFeedback
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { addComment } from "../ConfigureStore.js";
import logo1 from "../images//MahdiHasanzadeh.jpg";
import { motion } from "framer-motion";
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      author: "",
      rating: 1,
      comment: "",
      touched: {
        author: false,
        rating: false,
        comment: false
      }
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

  handlechange = event => {
    const { name, value } = event.target;
    this.setState(prevData => {
      return {
        ...prevData,
        [name]: value
      };
    });
  };

  validation = (rating, author, comment) => {
    const errors = {
      rating: "",
      author: "",
      comment: "",
      isRating: false,
      isAuthor: false,
      iscomment: false
    };
    if (this.state.touched.rating && rating === "") {
      errors.rating = "Required, rate our food please";
    } else {
      errors.isRating = true;
    }

    if (this.state.touched.author && author.length < 3) {
      errors.author = "Name Should be at least 3 characters";
    } else if (this.state.touched.author && author.length > 15) {
      errors.author = "Name Should be at max 15 characters";
    } else {
      errors.isAuthor = true;
    }

    if (this.state.touched.comment && comment.length === 0) {
      errors.comment = "Required, Please write a comment";
    } else {
      errors.iscomment = true;
    }

    return errors;
  };

  handleBlur = event => {
    const { name } = event.target;
    this.setState(prevData => {
      return {
        ...prevData,
        touched: {
          ...prevData.touched,
          [name]: true
        }
      };
    });
  };

  handleSubmit = event => {
    const errors = this.validation(
      this.state.rating,
      this.state.author,
      this.state.comment
    );

    if (
      errors.isRating === false ||
      errors.isAuthor === false ||
      errors.iscomment === false
    ) {
      event.preventDefault();
      return;
    }
    this.props.dispatch(
      addComment({
        dishId: this.props.dishId,
        author: this.state.author,
        comment: this.state.comment,
        rating: this.state.rating
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
  //()

  render() {
    window.moveTo(0, 0);
    const errors = this.validation(
      this.state.rating,
      this.state.author,
      this.state.comment
    );
    //console.log(errors);
    return (
      <React.Fragment>
        <div className="col-5 mb-2 ">
          <i>
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
            <FormGroup row>
              <Label md={2} htmlFor="rating">
                Rating
              </Label>
              <Col md={10}>
                <Input
                  onBlur={this.handleBlur}
                  onChange={this.handlechange}
                  type="select"
                  name="rating"
                  id="rating"
                  value={this.state.rating}
                  valid={errors.rating === ""}
                  invalid={errors.rating !== ""}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
                <FormFeedback>{errors.rating}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={2} htmlFor="author">
                Name
              </Label>
              <Col md={10}>
                <Input
                  onBlur={this.handleBlur}
                  onChange={this.handlechange}
                  placeholder="Name"
                  name="author"
                  value={this.state.author}
                  id="author"
                  valid={errors.author === ""}
                  invalid={errors.author !== ""}
                />
                <FormFeedback>{errors.author}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={2} htmlFor="comment">
                Comment
              </Label>
              <Col md={10}>
                <Input
                  onBlur={this.handleBlur}
                  onChange={this.handlechange}
                  type="textarea"
                  placeholder="Your Comment Here..."
                  name="comment"
                  id="comment"
                  value={this.state.comment}
                  valid={errors.comment === ""}
                  invalid={errors.comment !== ""}
                />
                <FormFeedback>{errors.comment}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 8, offset: 3 }}>
                <Input
                  type="submit"
                  value="Submit"
                  className="mt-1 bg bg-primary text-white"
                  onClick={this.handleSubmit}
                />
              </Col>
            </FormGroup>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

function DishDetail(props) {
  //const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();

  const { productId } = useParams();
  //C () ?
  //console.log("dishDetail", props.data.filter(item.id));
  const dish =
    props.data.status === false
      ? props.data
      : props.data.filter(item => item.id === productId)[0];
  const comments =
    props.comments.status === false
      ? props.comments
      : props.comments
          .filter(item => item.dishId === productId)
          .filter(item => item.rating >= 2);
  function renderDish() {
    window.scrollTo(10, 10);
    return dish.status === false ? (
      <div className="col-12 col-md-5">
        <h1>Something Went Wrong for fetching Dish</h1>
        {dish.error}
      </div>
    ) : dish === "undefined" ? (
      <div className="col-12 col-md-5">
        <h1>Dish is not found,check again</h1>
      </div>
    ) : (
      <div className="col-12 col-md-5 ">
        <Card>
          <CardImg
            width="100%"
            src={require(`../images/${dish.image.split("/")[2]}`)}
            alt={dish.name}
          />
          <CardBody>
            <CardTitle className="title">{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }

  function renderComment() {
    return comments.status === false ? (
      <div className="col-12 col-md-5">
        <h1>Something Went Wrong for fetching Comments</h1>
        {comments.error}
      </div>
    ) : (
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

  //C () ?
  return props.isLoading || props.isLoadingDish ? (
    <Loading />
  ) : (
    <motion.div
      intial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
    >
      <div className="container">
        <div className="tag">
          <Link className="link" to="/menu">
            Menu
          </Link>
        </div>
        {dish !== undefined ? <h2>{dish.name}</h2> : null}
        <hr />
      </div>
      <div className="container">
        <div className="row justify-content-center">
          {dish === undefined ? (
            <h1>No Dish Found,Please choose from Menu</h1>
          ) : props.data.status === false ? (
            renderDish()
          ) : (
            <React.Fragment>
              {renderDish()} {renderComment()}
            </React.Fragment>
          )}
        </div>
      </div>
    </motion.div>
  );
}

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
export default DishDetail;
//console.log(props.isLoading);
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
