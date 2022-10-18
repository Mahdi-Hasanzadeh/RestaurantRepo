import React from "react";
//C () ?
export default function Loading() {
  const styles = {
    fontSize: "36px",
    color: "blue"
  };
  return (
    <div className="container">
      <br />
      <i className="fa fa-spinner fa-spin" style={styles} />
      <h1>Loading...</h1>
    </div>
  );
}
