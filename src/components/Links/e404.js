import React from "react";
import { Link } from "react-router-dom";
import sadMario from "../../img/sadMario.PNG";

export default function e404() {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title red-text">#404 PAGE NOT FOUND</span>
              <p>Thank you Mario, but our Princess is in another castle!</p>
              <img
                className="responsive-img sadMario"
                src={sadMario}
                alt="Sad Mario"
                style={{ marginTop: "2rem" }}
              />
            </div>
            <div className="card-action">
              <Link to="/home" className="orange-text" style={{ margin: "0" }}>
                Powrót do bezpiecznego miejsca
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
