import React, { Component } from "react";
import { connect } from "react-redux";
import { createTask } from "../../store/actions/taskActions";
import { initStyle } from "../../store/actions/initStyle";
import { Redirect } from "react-router-dom";

export class addTask extends Component {
  state = {
    title: "",
    content: "",
    date: "",
    group: "",
    links: []
  };

  componentDidMount() {
    initStyle();
  }

  handleChange = (e, type = "default") => {
    const { value, name } = e.target;

    if (type === "default") {
      this.setState({
        [name]: value
      });
    } else if (type === "link") {
      const tempLinks = this.state.links;
      tempLinks.forEach(link => {
        if (link.id === name) {
          link.href = value;
        }
      });

      this.setState({ links: tempLinks });
    }
  };

  addNewLink = e => {
    e.preventDefault();
    const { links } = this.state;
    const newLink = {
      _id: links.length,
      id: `Link_${links.length}`,
      href: ""
    };

    this.setState({
      links: [...links, newLink]
    });
  };

  isValidLink = link => {
    //eslint-disable-next-line
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;

    const regex = new RegExp(expression);
    if (link.match(regex)) return true;
    else return false;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, content, group, links } = this.state;
    const date_value = document.getElementById("data_picker").value;
    const inp_day = `${date_value[0]}${date_value[1]}`;
    const inp_month = `${date_value[3]}${date_value[4]}`;
    const inp_year = `${date_value[6]}${date_value[7]}${date_value[8]}${
      date_value[9]
    }`;
    let err = false;
    const reverse_date = `${inp_month}/${inp_day}/${inp_year}`;
    const date_obj = new Date(reverse_date);
    new Promise(resolve => {
      resolve(this.setState({ date: date_obj, text_date: reverse_date }));
    }).then(() => {
      this.setState({ date: date_obj });
      //Validation
      const now = new Date();
      let difference = date_obj - now;
      const modals = initStyle("modal");
      // Check if all links have correct href
      links.forEach(link => {
        if (!this.isValidLink(link.href)) err = true;
      });
      if (
        title !== "" &&
        content !== "" &&
        date_obj.getDay().toString() !== "NaN" &&
        group !== "" &&
        !err &&
        difference > -100000000
      ) {
        this.props.createTask(this.state);
        this.props.history.push("/home");
      } else {
        modals[1].open();
      }
    });
  };

  render() {
    const { content, title, group, links } = this.state;
    const currLinks = links.length
      ? links.map(link => (
          <div key={link.id} className="input-field col s12">
            <input
              id={link.id}
              type="text"
              name={link.id}
              onChange={e => this.handleChange(e, "link")}
              className="validate"
            />
            <label htmlFor={link.id}>Link {link._id}</label>
          </div>
        ))
      : null;
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/home" />;
    return (
      <div className="container marginTop-task">
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-image"></div>
              <div className="card-content">
                <span className="card-title center">Dodaj zadanie</span>

                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="icon_prefix"
                        type="text"
                        name="title"
                        value={title}
                        onChange={this.handleChange}
                        className="validate"
                      />
                      <label htmlFor="icon_prefix">Tytuł</label>
                    </div>
                    <div className="input-field col s12">
                      <textarea
                        id="icon_telephone"
                        type="content"
                        name="content"
                        value={content}
                        onChange={this.handleChange}
                        className="materialize-textarea validate"
                      />
                      <label htmlFor="icon_telephone">Dodatkowa treść</label>
                    </div>
                    <div className="input-field col s12">
                      <input
                        type="text"
                        id="data_picker"
                        name="date"
                        onChange={this.handleChange}
                        className="datepicker validate"
                      />
                      <label htmlFor="data_picker">Wybierz dzień</label>
                    </div>

                    <div className="input-field col s12">
                      <select
                        id="group_picker"
                        value={group}
                        onChange={this.handleChange}
                        name="group">
                        <option disabled={true} value={""}>
                          Wybierz grupę
                        </option>
                        <option value={"all"}>Wszyscy</option>
                        <option value={"i"}>Informatycy</option>
                        <option value={"e"}>Ekonomiści</option>
                      </select>
                    </div>

                    {/* Links */}
                    <div className="input-field col s12">
                      {/* Render current links */}
                      {currLinks}
                      {/* Add new link */}
                      <a
                        href="!#"
                        onClick={this.addNewLink}
                        className="btn-floating btn-large waves-effect waves-light red">
                        <i className="material-icons">add</i>
                      </a>
                    </div>
                  </div>
                  <button
                    className="waves-effect waves-light btn center"
                    type="submit">
                    DODAJ
                  </button>
                </form>
              </div>
            </div>
            <div className="card-action"></div>
          </div>
        </div>
        {/* Modal */}
        <div id="modal4" className="modal">
          <div className="modal-content">
            <h4 className="red-text">Wypełnij poprawnie wszystkie pola!</h4>
            <p>
              Sprawdź poprawność wprowadzonych danych i spróbuj jeszcze raz.
            </p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="green white-text modal-close waves-effect waves-green btn-flat">
              OK
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createTask: task => dispatch(createTask(task))
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
)(addTask);
