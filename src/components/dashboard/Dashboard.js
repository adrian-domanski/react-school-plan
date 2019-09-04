import React, { Component } from "react";
import Task from "./Task";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Notification from "./Notification";
import {
  deleteTask,
  deleteAllOutDatedTasks
} from "../../store/actions/taskActions";
import {
  deleteAllOutDatedNotifs,
  deleteNotif
} from "../../store/actions/notifActions";
import { initStyle } from "../../store/actions/initStyle";
import Loading from "../layout/Loading";

export class Dashboard extends Component {
  state = {
    sortBy: "3",
    currentTask: "",
    currentNotif: ""
  };

  componentDidMount() {
    // Init meterialize styles
    initStyle("modal");
    initStyle("nav");
  }

  getNameOfGroup = task => {
    // Get name of class group
    const { group } = task;
    switch (group) {
      case "i":
        return <div className={`blue-text`}>Informatycy</div>;
      case "e":
        return <div className={`green-text`}>Ekonomiści</div>;
      case "all":
        return <div className={`red-text`}>Wszyscy</div>;
      default:
        return <div className={`red-text`}>Error</div>;
    }
  };

  deleteTask = () => this.props.deleteTask(this.state.currentTask);
  deleteNotif = () => this.props.deleteNotif(this.state.currentNotif);

  handleTaskAdmin = task => {
    // Add new task promp - check auth
    if (this.props.auth.uid) {
      new Promise(resolve => {
        resolve(this.setState({ currentTask: task }));
      }).then(() => {
        const modals = initStyle("modal");
        modals[0].open();
      });
    }
  };

  handleNotifAdmin = notif => {
    // Add new notification - check auth
    if (this.props.auth.uid) {
      new Promise(resolve => {
        resolve(this.setState({ currentNotif: notif }));
      }).then(() => {
        const modals = initStyle("modal");
        modals[1].open();
      });
    }
  };

  render() {
    const { tasks, notifications, sortBy } = this.props;
    if (tasks) this.props.deleteOutDatedTasks();
    if (notifications) this.props.deleteOutDatedNotifs();
    let tasksList =
      tasks &&
      tasks.map(task => {
        if (sortBy !== "all_groups") {
          if (task.group === sortBy || task.group === "all") {
            return (
              <Task
                handleTaskAdmin={this.handleTaskAdmin}
                task={task}
                key={task.id}
                groupName={this.getNameOfGroup(task)}
                id_group={task.group}
                text_date={task.text_date}
                date={task.date}
              />
            );
          }
        } else {
          return (
            <Task
              handleTaskAdmin={this.handleTaskAdmin}
              task={task}
              key={task.id}
              groupName={this.getNameOfGroup(task)}
              id_group={task.group}
              text_date={task.text_date}
              date={task.date}
            />
          );
        }
        return null;
      });

    let notificationsList =
      notifications &&
      notifications.map((notif, index) => {
        return (
          <Notification
            handleNotifAdmin={this.handleNotifAdmin}
            key={notif.id}
            notif={notif}
            id={index + 1}
            date={notif.date}
            text_date={notif.text_date}
          />
        );
      });
    if (tasks && tasksList) tasksList.map(task => task !== null);
    if (notificationsList && !notificationsList.length)
      notificationsList = "Brak powiadomień :)";
    if (tasks && tasksList.length) {
      let temp_arr = tasksList.filter(task => task !== null);
      tasksList = temp_arr;
    }

    return (
      <div>
        {tasks ? (
          <div className="container">
            <div className="row">
              <div className="col s12 m6 taskList">
                {tasksList.length ? (
                  tasksList
                ) : (
                  <div className="card none-tasks">
                    <div className="card-content black-text">
                      <span className="card-title">Brak zadań</span>
                      <p>
                        Mimo wszystko weź pod uwagę, że zadanie mogło nie zostać
                        dodane!
                      </p>
                    </div>
                    <div className="card-action text-bold orange-text">
                      Miłego dnia!
                    </div>
                  </div>
                )}
              </div>

              <div className="col s12 m6 notifications">
                <div className="card blue-grey darken-1 notifications">
                  <div className="card-content white-text">
                    <span className="card-title">Ważne informacje:</span>
                    <div className="card-action">{notificationsList}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Czy na pewno chcesz usunąć to zadanie?</h4>
            <p>{this.state.currentTask.title}</p>
            <p>{this.state.currentTask.content}</p>
            <p>Nie będziesz miał możliwości powrotu do wcześniejszego stanu!</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="green white-text modal-close waves-effect waves-green btn-flat">
              Anuluj
            </a>
            <a
              href="#!"
              onClick={this.deleteTask}
              className="red white-text modal-close waves-effect waves-green btn-flat">
              Usuń
            </a>
          </div>
        </div>
        <div id="modal2" className="modal">
          <div className="modal-content">
            <h4>Czy na pewno chcesz usunąć to powiadomienie?</h4>
            <p>{this.state.currentNotif.content}</p>
            <p>Nie będziesz miał możliwości powrotu do wcześniejszego stanu!</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="green white-text modal-close waves-effect waves-green btn-flat">
              Anuluj
            </a>
            <a
              href="#!"
              onClick={this.deleteNotif}
              className="red white-text modal-close waves-effect waves-green btn-flat">
              Usuń
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { tasks, notifications } = state.firestore.ordered;
  return {
    sortBy: tasks && state.tasks.sortBy,
    tasks: tasks && tasks,
    notifications: notifications && notifications,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteOutDatedNotifs: () => dispatch(deleteAllOutDatedNotifs()),
    deleteOutDatedTasks: () => dispatch(deleteAllOutDatedTasks()),
    deleteTask: task => dispatch(deleteTask(task)),
    deleteNotif: notif => dispatch(deleteNotif(notif))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    { collection: "tasks", orderBy: ["date", "asc"] },
    { collection: "notifications", orderBy: ["date", "asc"] }
  ])
)(Dashboard);
