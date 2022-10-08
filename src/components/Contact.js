import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Col, FormFeedback } from "reactstrap";
import { Link } from "react-router-dom";
export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      telNumber: "",
      agree: false,
      contactType: "",
      message: "",
      touched: {
        firstName: false,
        lastName: false,
        email: false,
        telNumber: false
      }
    };
  }

  handleFormData = event => {
    const { type, name, value, checked } = event.target;
    this.setState(prevData => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value
      };
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  handleOnBlur = event => {
    const { name } = event.target;
    this.setState(prevData => {
      return {
        ...prevData,
        touched: { ...this.state.touched, [name]: true }
      };
    });
  };
  validate = (firstName, lastName, email, telNumber) => {
    const errors = {
      firstName: "",
      lastName: "",
      email: "",
      telNumber: ""
    };

    if (this.state.touched.firstName && firstName.length <= 3) {
      errors.firstName = "First Name Should Be at least 3 Characters";
    } else if (this.state.touched.firstName && firstName.length > 15) {
      errors.firstName = "First Name Should Be at most 15 Characters";
    }
    if (this.state.touched.lastName && lastName.length <= 3) {
      errors.lastName = "First Name Should Be at least 3 Characters";
    } else if (this.state.touched.lastName && lastName.length > 15) {
      errors.lastName = "First Name Should Be at most 15 Characters";
    }

    const reg = /^\d+$/;

    if (this.state.touched.telNumber && !reg.test(telNumber)) {
      errors.telNumber = "Telephone Number Should contains only digits";
    }

    if (
      this.state.touched.email &&
      email.split("").filter(x => x === "@").length !== 1
    ) {
      errors.email = "Email Should Contain ( @ )";
    } else if (this.state.touched.email && email.split("@")[0].length < 6) {
      errors.email = "email too short";
    }
    return errors;
  };
  render() {
    const errors = this.validate(
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this.state.telNumber
    );
    return (
      <div className="container">
        <div className="tag">
          <Link className="link" to="/">
            Home
          </Link>
        </div>
        <br />
        <h2>Contact Us</h2>
        <hr />
        <div className="row">
          <div className="col-12">
            <h3>Location Information</h3>
          </div>
          <div className="col-12 col-sm-4 offset-sm-1">
            <h5>Our Address</h5>
            <address>
              121,Clear Water Bay Road <br />
              Clear Water Bay,Kowloon <br />
              HONG KONG <br />
              <i className="fa fa-phone" />09029342619
              <br />
              <i className="fa fa-fax" />09029342619
              <br />
              <i className="fa fa-address-book ">
                {" "}
                <a href="mailto:mahdi786trygame@gamil.com">
                  mahdi786trygame@gamil.com
                </a>
              </i>
            </address>
          </div>
          <div className="col-12 col-sm-6 offset-sm-1">
            <h5>Map of our Location</h5>
          </div>
        </div>
        <div className="row row-content">
          <div className="col-12">
            <h3>Send Us Your Feedback</h3>
          </div>
          <div className="col-12 col-md-9">
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label htmlFor="firstName" md={2}>
                  First Name
                </Label>
                <Col md={10}>
                  <Input
                    type="text"
                    placeholder="First Name"
                    id="firstName"
                    name="firstName"
                    valid={errors.firstName === ""}
                    invalid={errors.firstName !== ""}
                    value={this.state.firstName}
                    onChange={this.handleFormData}
                    onBlur={this.handleOnBlur}
                  />
                  <FormFeedback>{errors.firstName}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={2} htmlFor="lastName">
                  Last Name
                </Label>
                <Col md={10}>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    valid={errors.lastName === ""}
                    invalid={errors.lastName !== ""}
                    value={this.state.lastName}
                    placeholder="Last Name"
                    onChange={this.handleFormData}
                    onBlur={this.handleOnBlur}
                  />
                  <FormFeedback>{errors.lastName}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="emailForContact" md={2}>
                  Email
                </Label>
                <Col md={10}>
                  <Input
                    type="email"
                    name="email"
                    id="emailForContact"
                    placeholder="Email"
                    valid={errors.email === ""}
                    invalid={errors.email !== ""}
                    value={this.state.email}
                    onChange={this.handleFormData}
                    onBlur={this.handleOnBlur}
                  />
                  <FormFeedback>{errors.email}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="telNumber" md={2}>
                  Telephone Number
                </Label>
                <Col md={10}>
                  <Input
                    type="telNumber"
                    name="telNumber"
                    id="telNumber"
                    placeholder="Telephone Number"
                    valid={errors.telNumber === ""}
                    invalid={errors.telNumber !== ""}
                    value={this.state.telNumber}
                    onChange={this.handleFormData}
                    onBlur={this.handleOnBlur}
                  />
                  <FormFeedback>{errors.telNumber}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={{ size: 6, offset: 2 }}>
                  <FormGroup check>
                    <Label htmlFor="agree">
                      <strong>May we Contact you?</strong>
                    </Label>
                    <Input
                      type="checkbox"
                      name="agree"
                      checked={this.state.agree}
                      onChange={this.handleFormData}
                    />
                  </FormGroup>
                </Col>
                <Col md={{ size: 3, offset: 1 }}>
                  <FormGroup>
                    <Input
                      type="select"
                      name="contactType"
                      value={this.state.contactType}
                      onChange={this.handleFormData}
                    >
                      <option>Telephone Number</option>
                      <option>Email</option>
                    </Input>
                  </FormGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={{ size: 10, offset: 2 }}>
                  <Input
                    type="textarea"
                    name="message"
                    value={this.state.message}
                    placeholder="Your Feedback here..."
                    onChange={this.handleFormData}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={{ size: 8, offset: 3 }}>
                  <Input
                    className="bg bg-primary text-white "
                    type="submit"
                    value="Submit"
                  />
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
