import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
  FormGroup,
  Input,
  Label,
  Col,
} from "reactstrap";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
export default function Header(props) {
  const [state, setState] = React.useState({
    isOpen: false,
    isModelOpen: false,
  });
  const auth = getAuth();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handlechange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const navigate = useNavigate();

  const handleToggle = () => {
    setState((prevData) => {
      return {
        ...prevData,
        isOpen: !prevData.isOpen,
      };
    });
  };

  const handleModelOpen = () => {
    setState((prevData) => {
      return {
        ...prevData,
        isModelOpen: !prevData.isModelOpen,
      };
    });
  };

  const handleLogin = (event) => {
    // alert(state.email);
    if (formData.email.split("").filter((x) => x === "@").length !== 1) {
      alert("Enter Your Email in a correct format");
    } else if (formData.email.split("@")[1] !== "gmail.com") {
      alert("Enter {gmail.com} correctly");
    } else if (formData.password.length < 1) {
      alert("Enter a strong password");
    } else if (event === "login") {
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((response) => {
          alert("Welcome Back");
          handleModelOpen();
          navigate("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((resp) => {
          alert("Your Account has been created successfully");
          handleModelOpen();
          navigate("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    }

    // alert(
    //   `${this.email.value}  ${this.password.value} ${this.rememberMe.checked}`
    // );
  };
  return (
    <React.Fragment>
      <Navbar expand="md" className="container-fluid p-3 header mt-3">
        <NavbarToggler className="navtoggle" onClick={handleToggle} />
        <NavbarBrand className="navbarBrand me-1 me-sm-0">
          <h3 className="restaurantTitle">Restaurant con fusion</h3>
        </NavbarBrand>
        <Collapse navbar isOpen={state.isOpen}>
          <Nav
            className="navItems d-flex flex-column flex-sm-row align-items-baseline gap-1 "
            navbar
          >
            <NavItem>
              <Link className="link" to="/">
                <i className="fa fa-ship" />
                Starting Page
              </Link>
            </NavItem>
            <NavItem>
              <Link className="link" to="/home">
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
              <button
                className="rounded border-0 p-1"
                onClick={handleModelOpen}
              >
                <i className="link btn-sign-in fa fa-sign-in fa-lg">Account</i>{" "}
              </button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <div className="container-fluid">
        <div className="row header mb-1 p-3 ">
          <div className="col-12 col-md-6 restaurant">
            <h3>Restaurant con fusion</h3>
            <p>
              We take inspiration from the Worlds's best cuisines and create a
              unique fusion experience.Our lipsmacking creation will tickle your
              culinary sense!
            </p>
          </div>
        </div>
      </div>
      <Modal isOpen={state.isModelOpen} toggle={handleModelOpen}>
        <ModalHeader
          toggle={handleModelOpen}
          className="bg bg-primary text-white"
        >
          SignUp / Login
        </ModalHeader>
        <ModalBody>
          <p>
            If you do not have an account,fill out the form and click sign-Up.
          </p>
          <FormGroup>
            <Label htmlFor="email">Email or Username </Label>
            <Input
              name="email"
              value={state.email}
              type="email"
              required
              id="email"
              placeholder="Email Address"
              onChange={handlechange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              value={state.password}
              type="password"
              id="password"
              placeholder="Password"
              onChange={handlechange}
            />
          </FormGroup>
          <FormGroup>
            <Col>
              <Input
                onClick={() => handleLogin("login")}
                className="bg bg-success text-white border-none"
                type="button"
                value="Login"
              />
              <Input
                onClick={() => handleLogin("sign")}
                className="bg bg-success text-white border-none"
                type="button"
                value="Sign-Up"
              />
            </Col>
          </FormGroup>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}
