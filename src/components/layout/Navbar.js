import React from "react";
import { Link } from "react-router-dom";
import { initStyle } from "../../store/actions/initStyle";
import { connect } from "react-redux";
import { logOut } from "../../store/actions/authActions";
import SignedInLinks from "../Links/SignedInLinks";
import SignedOutLinks from "../Links/SignedOutLinks";

class Navbar extends React.Component {
  state = {
    option: "all_groups"
  };

  componentDidMount() {
    initStyle("nav");
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
