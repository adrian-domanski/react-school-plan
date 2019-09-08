import React from "react";
import Parser from "html-react-parser";
import moment from "moment";

class Notification extends React.Component {
  state = {
    clickTimer: null
  };

  getDay = nr => {
    switch (nr) {
      case 1:
        return "Poniedziałek";
      case 2:
        return "Wtorek";
      case 3:
        return "Środa";
      case 4:
        return "Czwartek";
      case 5:
        return "Piątek";
      case 6:
        return "Sobota";
      case 0:
        return "Niedziela";
      default:
        return "Error #404";
    }
  };

  // Mouse press and hold event
  handleMouseDown = () => {
    const { notif, handleNotifAdmin } = this.props;
    this.setState({
      clickTimer: setTimeout(() => {
        handleNotifAdmin(notif);
      }, 2000)
    });
  };

  handleMouseUp = () => {
    const { clickTimer } = this.state;
    clearTimeout(clickTimer);
  };
  // - - - - - - - - - - -

  render() {
    const { notif, text_date, date, links } = this.props;
    let format_date = document.createElement("span");
    let lessThanWeek = false;
    let weekDay = null;
    let now = new Date();
    let when = date.toDate();
    let difference = when - now;
    let color = "";
    if (difference < 518400000) {
      let date = moment(when);
      lessThanWeek = true;
      weekDay = this.getDay(date.day());
      if (difference < 0) {
        color = "red";
        weekDay = "DZISIAJ";
      } else if (difference > 0 && difference < 86400000) {
        color = "red";
        weekDay = "JUTRO";
      } else color = "yellow";
    }
    const inp_month = `${text_date[0]}${text_date[1]}`;
    const inp_day = `${text_date[3]}${text_date[4]}`;
    const inp_year = `${text_date[6]}${text_date[7]}${text_date[8]}${
      text_date[9]
    }`;

    format_date.innerHTML = `(<span style='color: lightgreen'>${inp_day}</span>/<span style='color: lightgreen'>${inp_month}</span>/<span style='color: lightgreen'>${inp_year}</span>)`;

    // Render Links

    const allLinks =
      links && links.length ? (
        <div className="links">
          {links.map(link => (
            <a
              key={link._id}
              rel="noopener noreferrer"
              target="_blank"
              className="notif-link"
              href={link.href}>
              - - [ Link {link._id + 1} ] - -
            </a>
          ))}
        </div>
      ) : null;

    return (
      <div
        style={{ marginBottom: "1rem" }}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}>
        {
          <span>
            {!lessThanWeek ? (
              Parser(format_date.innerHTML)
            ) : (
              <span style={{ color: color }}>{weekDay}</span>
            )}
            <br />
          </span>
        }
        {notif.content} {allLinks}
      </div>
    );
  }
}

export default Notification;
