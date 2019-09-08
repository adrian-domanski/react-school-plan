import React from "react";
import { Link } from "react-router-dom";
import sadMario from "../../img/sadMario.PNG";

export default function e404() {
  return (
    <div className="container">
      <div class="row">
        <div class="col s12">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title red-text">#404 PAGE NOT FOUND</span>
              <p>Thank you Mario, but our Princess is in another castle!</p>
              <img
                className="responsive-img"
                src={sadMario}
                alt="Sad Mario"
                style={{ maxWidth: "10%", marginTop: "2rem" }}
              />
            </div>
            <div class="card-action">
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
