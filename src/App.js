import React from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import addTask from "./components/Links/addTask";
import addNotif from "./components/Links/addNotif";
import Fb from "./components/layout/Fb";
import signIn from "./components/Links/signIn";
import LessonPlan from "./components/Links/LessonPlan";
import e404 from "./components/Links/e404";
import Replacement from "./components/Links/Replacement";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Fb />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/home" component={Dashboard} />
          <Route path="/dodaj_zadanie" component={addTask} />
          <Route path="/dodaj_powiadomienie" component={addNotif} />
          <Route path="/zaloguj" component={signIn} />
          <Route path="/plan_lekcji" component={LessonPlan} />
          <Route path="/zastepstwa/:day" component={Replacement} />
          <Route component={e404} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
