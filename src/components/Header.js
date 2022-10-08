import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Collapse,
  NavbarToggler,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isModelOpen: false
    };
  }
  handleToggle = () => {
    this.setState(prevData => {
      return {
        ...prevData,
        isOpen: !prevData.isOpen
      };
    });
  };

  handleModelOpen = () => {
    this.setState(prevData => {
      return {
        ...prevData,
        isModelOpen: !prevData.isModelOpen
      };
    });
  };

  handleLogin = event => {
    event.preventDefault();
    this.handleModelOpen();
    alert(
      `${this.email.value}  ${this.password.value} ${this.rememberMe.checked}`
    );
  };
  render() {
    return (
      <React.Fragment>
        <Navbar expand="md" className="container header">
          <NavbarToggler className="navtoggle" onClick={this.handleToggle} />
          <NavbarBrand className="navbarBrand">
            <h3 className="restaurantTitle">Restaurant con fusion</h3>
          </NavbarBrand>
          <Collapse navbar isOpen={this.state.isOpen}>
            <Nav className="navItems" navbar>
              <NavItem>
                <Link className="link" to="/">
                  <i className="fa fa-home" />
                  Home
                </Link>
              </NavItem>
              <NavItem>
                <Link className="link" to="/menu">
                  <i className="fa fa-list" />
                  Menu
                </Link>
              </NavItem>
              <NavItem>
                <Link className="link" to="About">
                  <i className="fa fa-info-circle" />
                  About
                </Link>
              </NavItem>
              <NavItem>
                <Link className="link" to="/Contact">
                  <i className="fa fa-address-card" />
                  Contact Us
                </Link>
              </NavItem>
              <NavItem>
                <button onClick={this.handleModelOpen}>
                  <i className="link btn-sign-in fa fa-sign-in fa-lg">
                    Sign in
                  </i>{" "}
                </button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <div className="container">
          <div className="row header">
            <div className="col-12 col-md-6">
              <h3>Restaurant con fusion</h3>
              <p>
                We take inspiration from the Worlds's best cuisines and create a
                unique fusion experience.Our lipsmacking creation will tickle
                your culinary sense!
              </p>
            </div>
          </div>
        </div>
        <Modal isOpen={this.state.isModelOpen} toggle={this.handleModelOpen}>
          <ModalHeader
            toggle={this.handleModelOpen}
            className="bg bg-primary text-white"
          >
            Login
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="email">Email or Username </Label>
                <Input
                  innerRef={input => (this.email = input)}
                  type="text"
                  id="email"
                  placeholder="Email or Username"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  innerRef={input => (this.password = input)}
                  type="password"
                  id="password"
                  placeholder="Password"
                />
              </FormGroup>
              <FormGroup check>
                <Label>Remember Me</Label>
                <Input type="checkbox" />
              </FormGroup>
              <FormGroup>
                <Input
                  innerRef={input => (this.rememberMe = input)}
                  type="submit"
                  value="Login"
                  className="bg bg-success text-white"
                />
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
