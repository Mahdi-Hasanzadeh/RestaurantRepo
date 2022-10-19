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
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//import { CSSTransition, TransitionGroup } from "react-transition-group";
import { AnimatePresence } from "framer-motion";
import {
  getComments,
  getLeaders,
  getDishes,
  getPromotions
} from "../ConfigureStore.js";

//()
function Main(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const store = useSelector(store => store);
  const isLoading = store.comments.comments.isLoading;
  const isLoadingLeader = store.leaders.isLoading;
  const isLoadingDish = store.dishes.isLoading;
  const isLoadingPromotion = store.promotions.isLoading;

  React.useEffect(
    () => {
      //  console.log("effect");
      setTimeout(() => {
        dispatch(getLeaders());
        dispatch(getComments());
        dispatch(getDishes());
      }, 1500);
      setTimeout(() => {
        dispatch(getPromotions());
      }, 2500);
    },
    [dispatch]
  );
  function BasicLayout() {
    return (
      <React.Fragment>
        <Header />
        <Outlet />
        <Footer />
      </React.Fragment>
    );
  }
  //C () ?
  const featuredDish =
    store.dishes.dishes.status === false
      ? store.dishes.dishes
      : store.dishes.dishes.filter(item => item.featured)[0];
  const featuredLeader =
    store.leaders.leaders.status === false
      ? store.leaders.leaders
      : store.leaders.leaders.filter(item => item.featured === true)[0];

  const promotion =
    store.promotions.promotions.status === false
      ? store.promotions.promotions
      : store.promotions.promotions[0];

  return (
    <React.Fragment>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<BasicLayout />}>
            <Route
              index
              element={
                <Home
                  isLoadingDish={isLoadingDish}
                  isLoadingPromotion={isLoadingPromotion}
                  isLoadingLeader={isLoadingLeader}
                  promotion={promotion}
                  featuredLeader={featuredLeader}
                  featuredDish={featuredDish}
                />
              }
            />
            <Route
              path="menu"
              element={
                <Menu
                  isLoadingDish={isLoadingDish}
                  data={store.dishes.dishes}
                />
              }
            />
            <Route
              path="menu/:productId"
              element={
                <DishDetail
                  isLoadingDish={isLoadingDish}
                  isLoadingPromotion={isLoadingPromotion}
                  isLoading={isLoading}
                  data={store.dishes.dishes}
                  comments={store.comments.comments.comments}
                />
              }
            />
            <Route path="Contact" element={<Contact />} />
            <Route
              path="About"
              element={
                <About
                  isLoadingLeader={isLoadingLeader}
                  leaders={store.leaders.leaders}
                />
              }
            />

            <Route
              path="*"
              element={
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <h1>Page Not Found: 404</h1>
                    </div>
                  </div>
                </div>
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </React.Fragment>
  );
}

export default Main;
