export const createTask = task => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("tasks")
      .add({
        ...task
      })
      .then(() => {
        dispatch({ type: "CREATE_TASK_SUCCESS", task });
      })
      .catch(err => {
        dispatch({ type: "CREATE_TASK_ERROR" }, err);
      });
  };
};

export const deleteTask = task => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("tasks")
      .doc(task.id)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_TASK_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "DELETE_TASK_ERROR" }, err);
      });
  };
};

export const deleteAllOutDatedTasks = () => {
  return (dispatch, getState, { getFirestore }) => {
    const now = new Date();
    const firestore = getFirestore();
    const getData = async () => {
      const snapshot = await firestore.collection("tasks").get();
      snapshot.docs.forEach(doc => {
        const task_id = doc.id;
        const task = doc.data();
        const difference = task.date.toDate() - now;
        if (difference < -86400000) {
          firestore
            .collection("tasks")
            .doc(task_id)
            .delete()
            .then(() => {
              dispatch({ type: "TASK_OUTDATE_DELETED" });
            });
        }
      });
    };

    getData();
  };
};
