import React, { Component } from "react";
import cat2 from "./catImages/271631.svg";
import { Helmet } from "react-helmet";

class Component2 extends Component {
  componentDidMount() {
    this.props.setRoutingOccurred("component 2");
  }

  render() {
    return (
      <div className="child1">
        <Helmet>
          <html lang="en" />
          <meta charSet="utf-8" />
          <title>Title of component 2</title>
        </Helmet>

        <h2>
          Component 2
        </h2>

        <img className="cat" src={cat2} alt="" />
      </div>
    );
  }
}

export default Component2;
