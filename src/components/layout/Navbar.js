import React from "react";
import { NavLink, Link } from "react-router-dom";
import { initStyle } from "../../store/actions/initStyle";
import { connect } from "react-redux";
import { logOut } from "../../store/actions/authActions";
import SignedInLinks from "../Links/SignedInLinks";
import SignedOutLinks from "../Links/SignedOutLinks";
import M from "materialize-css";

class Navbar extends React.Component {
  state = {
    option: "all_groups"
  };

  componentDidMount() {
    initStyle("nav");
    M.AutoInit();
  }

  handleChange = e => {
    const { value } = e.target;
    new Promise(resolve => {
      resolve(this.setState({ option: value }));
    }).then(() => {
      this.props.taskSortBy(this.state.option);
    });
  };

  render() {
    return (
      <React.Fragment>
        <nav>
          <div className="nav-wrapper">
            <Link to="/home" className="brand-logo left">
              <span className="logo">Plan 3Ei</span>
            </Link>
            <a
              href="#!"
              data-target="mobile-demo"
              className="sidenav-trigger right">
              <i className="material-icons">menu</i>
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {/* Menu w zależności czy zalogowany czy nie */}
              <li>
                <NavLink to="/home">Strona Główna</NavLink>{" "}
              </li>
              <ul id="dropdown1" className="dropdown-content">
                <li>
                  <Link className="center-align" to="/zastepstwa/0">
                    Dzisiaj
                  </Link>
                </li>
                <li>
                  <Link className="center-align" to="/zastepstwa/1">
                    Jutro
                  </Link>
                </li>
                <li>
                  <Link className="center-align" to="/zastepstwa/2">
                    Pojutrze
                  </Link>
                </li>
              </ul>
              <li>
                <a
                  className="dropdown-trigger"
                  href="#!"
                  data-target="dropdown1">
                  Zastępstwa
                </a>
              </li>
              {this.props.auth.uid ? (
                <SignedInLinks
                  type={"desktop"}
                  logOut={this.props.logOut}
                  option={this.state.option}
                  handleChange={this.handleChange}
                />
              ) : (
                <SignedOutLinks
                  type={"desktop"}
                  option={this.state.option}
                  handleChange={this.handleChange}
                />
              )}
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          <h1>Menu</h1>
          {this.props.auth.uid ? (
            <SignedInLinks
              type={"mobile"}
              logOut={this.props.logOut}
              option={this.state.option}
              handleChange={this.handleChange}
            />
          ) : (
            <SignedOutLinks
              type={"mobile"}
              option={this.state.option}
              handleChange={this.handleChange}
            />
          )}
        </ul>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    taskSortBy: group => dispatch({ type: "TASK_SORT_BY", group }),
    logOut: () => dispatch(logOut())
  };
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
