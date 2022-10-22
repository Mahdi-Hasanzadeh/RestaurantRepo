import React from "react";
import Loading from "./Loading.js";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
function Menu(props) {
  //console.log(props.data);
  window.scroll(0, 0);
  var menu =
    props.data.status === false ? (
      <div>
        <h1>Something Went Wrong</h1> <br />
        {props.data.error}
      </div>
    ) : (
      props.data.map(item => {
        return (
          <div key={item.id} className="col-12 col-md-5 ">
            <Card>
              <CardImg
                width="100%"
                src={require(`../images/${item.image.split("/")[2]}`)}
                alt={item.name}
              />
              <CardImgOverlay>
                <CardTitle>{item.name}</CardTitle>
              </CardImgOverlay>
            </Card>
            <Link to={`/menu/${item.id}`}> More Info </Link>
          </div>
        );
      })
    );
  //C () ?
  return (
    <React.Fragment>
      <motion.div
        intial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
        className="container"
      >
        <div className="tag">
          <Link className="link" to="/">
            Home
          </Link>
        </div>
        <br />
        <h2>Menu</h2>
        <hr />
        <div className="row justify-content-center">
          {props.isLoadingDish ? <Loading /> : menu}
        </div>
      </motion.div>
    </React.Fragment>
  );
}

export default Menu;
