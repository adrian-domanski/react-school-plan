import React, { Component } from "react";
import { initStyle } from "../../store/actions/initStyle";
import { NavLink } from "react-router-dom";
import M from "materialize-css";

export class SignedInLinks extends Component {
  componentDidMount() {
    initStyle("nav");
    M.AutoInit();
  }

  closeSide = type => {
    if (type === "mobile") {
      let sideNavs = document.querySelectorAll(".sidenav");
      let inst_side = M.Sidenav.init(sideNavs);
      inst_side[0].close();
    }
  };

  render() {
    const { option, handleChange, type } = this.props;
    let classes = "";
    let sort_mobile = "";
    if (type === "desktop") sort_mobile = "sort_desktop";
    if (type === "mobile") classes = "sidenav-close";
    return (
      <React.Fragment>
        <li className={classes}>
          <NavLink to="/plan_lekcji">Plan Lekcji</NavLink>
        </li>
        <li className={classes}>
          <NavLink to="/dodaj_zadanie">Dodaj zadanie</NavLink>
        </li>
        <li className={classes}>
          <NavLink to="/dodaj_powiadomienie">Dodaj powiadomienie</NavLink>
        </li>
        <li>
          <div id="sort_item" className={sort_mobile}>
            <div className="input-field sort">
              <select
                value={option}
                onChange={e => {
                  handleChange(e);
                  this.closeSide(type);
                }}>
                <option value="all_groups" disabled={true}>
                  Sortuj zadania
                </option>
                <option value="i">Informatycy</option>
                <option value="e">Ekonomiści</option>
                <option value="all_groups">Wszyscy</option>
              </select>
            </div>
          </div>
        </li>
        <li>
          <a href="#!" onClick={this.props.logOut}>
            Wyloguj się
          </a>
        </li>
      </React.Fragment>
    );
  }
}

export default SignedInLinks;
