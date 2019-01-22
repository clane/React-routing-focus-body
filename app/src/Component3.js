import React, { Component } from "react";
import cat3 from "./catImages/44215.svg";
import { Helmet } from "react-helmet";

class Component3 extends Component {
  componentDidMount() {
    this.props.setRoutingOccurred("component 3");
  }

  render() {
    return (
      <div className="child1">
        <Helmet>
          <html lang="en" />
          <meta charSet="utf-8" />
          <title>Title of component 3</title>
        </Helmet>

        <h2>
          Component 3
        </h2>

        <img className="cat" src={cat3} alt="" />
      </div>
    );
  }
}

export default Component3;
