import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Replacement extends Component {
  state = {
    dayNr: new Date().getDay(),
    zse_url:
      "https://www.zse.srem.pl/index.php?opcja=modules/zastepstwa/single_id&id="
  };

  openInNewTab = () => {
    const { day } = this.props.match.params;
    const { zse_url, dayNr } = this.state;
    const url = `${zse_url}${dayNr + parseInt(day)}`;
    window.open(url, "_blank");
  };

  render() {
    this.openInNewTab();

    return <Redirect to="/" />;
  }
}

export default Replacement;
