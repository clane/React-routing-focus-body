import React, { Component } from "react";
import "./App.css";
import Component1 from "./Component1.js";
import Component2 from "./Component2.js";
import Component3 from "./Component3.js";
import Component4 from "./Component4.js";
import { Helmet } from "react-helmet";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      routingOccurredState: false
    };
    this.routingOccurred = this.routingOccurred.bind(this);
    this.ie11Polyfill();

    //Initialize aria-current values
    this.state = {
      ariaCurrent1: null,
      ariaCurrent2: null,
      ariaCurrent3: null,
      ariaCurrent4: null
    };
  }

  routingOccurred(title) {
    this.setState({
      routingOccurredState: true,
      routeTitle: title
    });
    this.topElementRef.textContent = "Top of " + title;
  }

  focusTop() {
    document.body.blur(); //needed to reset focus in iOS
    setTimeout(
      () => {
				document.body.focus();
      },
      100
    ); //timeout needed for Android
    this.setState({
      routingOccurredState: false
    });
  }

  componentDidUpdate() {
    if (this.state.routingOccurredState) {
      this.focusTop();
      this.setCurrentRouterLink(this.state.routeTitle);
    }
  }

  setCurrentRouterLink(componentName) {
    //Set aria-current
    //Reset aria-current on all router links first
    this.setState({
      ariaCurrent1: null,
      ariaCurrent2: null,
      ariaCurrent3: null,
      ariaCurrent4: null
    });

    if (componentName === "component 1") {
      this.setState({
        ariaCurrent1: "page"
      });
    }
    if (componentName === "component 2") {
      this.setState({
        ariaCurrent2: "page"
      });
    }
    if (componentName === "component 3") {
      this.setState({
        ariaCurrent3: "page"
      });
    }
    if (componentName === "component 4") {
      this.setState({
        ariaCurrent4: "page"
      });
    }
  }

  ie11Polyfill() {
    if (typeof Object.assign != "function") {
      // Must be writable: true, enumerable: false, configurable: true
      Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) {
          // .length of function is 2
          //"use strict";
          if (target == null) {
            // TypeError if undefined or null
            throw new TypeError("Cannot convert undefined or null to object");
          }

          var to = Object(target);

          for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];

            if (nextSource != null) {
              // Skip over if undefined or null
              for (var nextKey in nextSource) {
                // Avoid bugs when hasOwnProperty is shadowed
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                  to[nextKey] = nextSource[nextKey];
                }
              }
            }
          }
          return to;
        },
        writable: true,
        configurable: true
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Helmet>
          <html lang="en" />
          <meta charSet="utf-8" />
          <title>
            React Routing When Components Load - Moving Focus to the body 
          </title>
			    <body tabindex="-1" /> 
        </Helmet>

        <div
          id="top"
          tabIndex="-1"
          ref={top => {
            this.topElementRef = top;
          }}
        >
          Top Element
        </div>

        <h1>React - moving focus to the body after routing</h1>

        <ul>
          <li>
            <span>Github URL:&nbsp;</span>
            <a href="https://github.com/clane/React-routing-focus-body">
              {" "}https://github.com/clane/React-routing-focus-body
            </a>
          </li>
          <li>
            <span>Hosting URL:&nbsp;</span>
            <a href="http://chrislane.info/REACT/React-routing-focus-body">
              http://chrislane.info/REACT/React-routing-focus-body{" "}
            </a>
          </li>
        </ul>

        <BrowserRouter>
          <div>

            <ul role="navigation">
              <li>
                <Link aria-current={this.state.ariaCurrent1} to="Component1">
                  Component 1
                </Link>
              </li>
              <li>
                <Link aria-current={this.state.ariaCurrent2} to="Component2">
                  Component 2
                </Link>
              </li>
              <li>
                <Link aria-current={this.state.ariaCurrent3} to="Component3">
                  Component 3
                </Link>
              </li>
              <li>
                <Link aria-current={this.state.ariaCurrent4} to="Component4">
                  Component 4
                </Link>
              </li>
            </ul>

            <Switch>
              <Route
                path="/Component1"
                render={props => (
                  <Component1
                    {...props}
                    setRoutingOccurred={this.routingOccurred}
                  />
                )}
              />

              <Route
                path="/Component2"
                render={props => (
                  <Component2
                    {...props}
                    setRoutingOccurred={this.routingOccurred}
                  />
                )}
              />

              <Route
                path="/Component3"
                render={props => (
                  <Component3
                    {...props}
                    setRoutingOccurred={this.routingOccurred}
                  />
                )}
              />
              <Route
                path="/Component4"
                render={props => (
                  <Component4
                    {...props}
                    setRoutingOccurred={this.routingOccurred}
                  />
                )}
              />

              <Redirect from="/" to="/Component1" />
            </Switch>
          </div>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
