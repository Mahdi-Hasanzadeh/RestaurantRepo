import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import Menu from "./MenuComponent.jsx";
import DishDetail from "./DishdetailComponent.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Home from "./Home.js";
import Contact from "./Contact.js";
import About from "./About.js";

import "../App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
//()
function Main(props) {
  const store = useSelector(store => store);
  console.log(store.dishes);
  // const [state, setState] = React.useState({
  //   dishes: Dishes,
  //   comments: Comments,
  //   leaders: Leaders,
  //   promotions: Promotions
  // });
  // function handleClck(value) {
  //   document.getElementById("selectedItem");
  //   setState(prevData => {
  //     return {
  //       ...prevData,
  //       selectedFood: value
  //     };
  //   });
  // }

  function BasicLayout() {
    return (
      <React.Fragment>
        <Header />
        <Outlet />
        <Footer />
      </React.Fragment>
    );
  }
  const featuredDish = store.dishes.dishes.filter(
    item => item.featured === true
  )[0];
  const featuredLeader = store.leaders.leaders.filter(
    item => item.featured === true
  )[0];
  // <Header />
  //     <Menu data={state.dishes} />
  //     <DishDetail selectedDish={state.selectedFood} />
  //     <Footer />
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<BasicLayout />}>
          <Route
            index
            element={
              <Home
                promotion={store.promotions.promotions[0]}
                featuredLeader={featuredLeader}
                featuredDish={featuredDish}
              />
            }
          />
          <Route path="menu" element={<Menu data={store.dishes.dishes} />} />
          <Route
            path="menu/:productId"
            element={
              <DishDetail
                data={store.dishes.dishes}
                comments={store.comments.comments}
              />
            }
          />
          <Route path="Contact" element={<Contact />} />
          <Route
            path="About"
            element={<About leaders={store.leaders.leaders} />}
          />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default Main;
