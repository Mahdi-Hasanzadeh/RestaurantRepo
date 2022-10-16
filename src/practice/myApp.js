import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from "reactstrap";
//C () ?
export default function App() {
  const [formData, setFormData] = React.useState({
    bill: 0,
    tip: 0,
    discount: function() {
      if (this.tip === 0) {
        return this.bill;
      } else {
        const result = this.bill * this.tip;
        const res = result / 100;
        return this.bill - res;
      }
    }
  });
  const [peoplecount, setPeoplecount] = React.useState(1);
  const handlechange = event => {
    const { name, value } = event.target;
    if (name === "tip") {
      if (value > 100) {
        return;
      }
    }
    setFormData(prevData => {
      return {
        ...prevData,
        [name]: value < 0 ? 0 : value
      };
    });
  };
  const [Open, setOpen] = React.useState({
    isNavbarOpen: false,
    isModalOpen: false
  });
  const increase = () => {
    setPeoplecount(prevData => prevData + 1);
  };
  const decrease = () => {
    if (peoplecount <= 1) {
      return;
    }
    setPeoplecount(prevData => prevData - 1);
  };
  const handleToggle = () => {
    setOpen(prevData => {
      return {
        ...prevData,
        isModalOpen: !prevData.isModalOpen
      };
    });
  };
  const handleClick = () => {
    setOpen(prevData => {
      return {
        ...prevData,
        isNavbarOpen: !prevData.isNavbarOpen
      };
    });
  };
  return (
    <React.Fragment>
      <div className="container-fluid">
        <Navbar expand="md" color="primary">
          <NavbarToggler onClick={handleClick} />
          <NavbarBrand>
            <h1>Hasanzadeh production</h1>
          </NavbarBrand>
          <Collapse navbar isOpen={Open.isNavbarOpen}>
            <Nav>
              <NavItem>
                <a className="a" href="www.google.com">
                  Home
                </a>
                <a className="a" href="www.google.com">
                  Menu
                </a>
                <a className="a" href="www.google.com">
                  About
                </a>
                <a className="a" href="www.google.com">
                  contact
                </a>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      <div className="container-fluid mt-2">
        <label>Bill</label>
        <input
          onChange={handlechange}
          type="number"
          placeholder="Bill"
          name="bill"
          value={formData.bill}
        />
        <label>Tip</label>

        <input
          onChange={handlechange}
          type="number"
          placeholder="Tip"
          name="tip"
          value={formData.tip}
        />
        <p>{`Total is: ${formData.discount() === 0
          ? 0
          : (formData.discount() / peoplecount).toFixed(2)} $ `}</p>

        <button onClick={increase}>+</button>
        <p> {`People:${peoplecount}`} </p>
        <button onClick={decrease}>-</button>
      </div>
      <Modal isOpen={Open.isModalOpen} toggle={handleToggle}>
        <ModalHeader color="primary" toggle={handleToggle}>
          Welcome to Our Restaurant
        </ModalHeader>
        <ModalBody>
          <h4>Are You ready</h4>
          <button>Let's Go</button>
        </ModalBody>
        <ModalFooter>copyright Hasanzadeh production</ModalFooter>
      </Modal>
    </React.Fragment>
  );
}
