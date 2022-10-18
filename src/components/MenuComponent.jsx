import React from "react";
import Loading from "./Loading.js";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
function Menu(props) {
  //console.log(props.data);

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
              <CardImg width="100%" src={item.image} alt={item.name} />
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
      <div className="container">
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
      </div>
    </React.Fragment>
  );
}

export default Menu;
