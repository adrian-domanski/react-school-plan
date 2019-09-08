import React from "react";
import moment from "moment";
import Parser from "html-react-parser";
import red from "../../img/Chars/red.png";
import blue from "../../img/Chars/blue.png";
import green from "../../img/Chars/green.png";

class Task extends React.Component {
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
    const { task, handleTaskAdmin } = this.props;
    this.setState({
      clickTimer: setTimeout(() => {
        handleTaskAdmin(task);
      }, 2000)
    });
  };

  handleMouseUp = () => {
    const { clickTimer } = this.state;
    clearTimeout(clickTimer);
  };
  // - - - - - - - - - - -

  render() {
    const { links, task, groupName, id_group, text_date, date } = this.props;
    let addClass = "";
    let img = null;

    switch (id_group) {
      case "i":
        addClass = "task_info";
        img = blue;
        break;
      case "e":
        addClass = "task_eko";
        img = green;
        break;
      default:
        addClass = "task_all";
        img = red;
        break;
    }

    let format_date = document.createElement("span");
    let lessThanWeek = false;
    let weekDay = null;
    let now = new Date();
    let color = "";
    let when = date.toDate();
    let difference = when - now;
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
      } else color = "black";
    }
    const inp_month = `${text_date[0]}${text_date[1]}`;
    const inp_day = `${text_date[3]}${text_date[4]}`;
    const inp_year = `${text_date[6]}${text_date[7]}${text_date[8]}${
      text_date[9]
    }`;
    format_date.innerHTML = `<span className=${addClass}><span style='color: black'>${inp_day}</span>/<span style='color: black'>${inp_month}</span>/<span style='color: black'>${inp_year}</span></span>`;

    // Render Links

    const allLinks =
      links && links.length ? (
        <div className="card-action links">
          {links.map(link => (
            <a
              key={link._id}
              rel="noopener noreferrer"
              target="_blank"
              className={`${addClass} link`}
              href={link.href}>
              - - [Link {link._id + 1}] - -
            </a>
          ))}
        </div>
      ) : null;

    return text_date !== undefined ? (
      <div
        className="row"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}>
        <div className={`card taskCard ${addClass}`}>
          <div className="card-content">
            <span className="card-title">{task.title}</span>
            <p>{task.content}</p>
          </div>
          {allLinks}
          <div className="card-action">
            <span className="green-text">
              {groupName}{" "}
              {
                <span>
                  {!lessThanWeek ? (
                    Parser(format_date.innerHTML)
                  ) : (
                    <span style={{ color: color }}>{weekDay}</span>
                  )}
                </span>
              }
            </span>
          </div>
          <img src={img} className="bgModel" alt="Mario character background" />
        </div>
      </div>
    ) : (
      "Loading"
    );
  }
}

export default Task;
