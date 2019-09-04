export const createNotif = notif => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("notifications")
      .add({
        ...notif
      })
      .then(() => {
        dispatch({ type: "CREATE_NOTIF_SUCCESS" });
      });
  };
};

export const deleteAllOutDatedNotifs = () => {
  return (dispatch, getState, { getFirestore }) => {
    const now = new Date();
    const firestore = getFirestore();
    const getData = async () => {
      const snapshot = await firestore.collection("notifications").get();
      snapshot.docs.forEach(doc => {
        const notif_id = doc.id;
        const notif = doc.data();
        const difference = notif.date.toDate() - now;
        if (difference < -86400000) {
          firestore
            .collection("notifications")
            .doc(notif_id)
            .delete()
            .then(() => {
              dispatch({ type: "NOTIF_OUTDATE_DELETED" });
            });
        }
      });
    };
    getData();
  };
};

export const deleteNotif = notif => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("notifications")
      .doc(notif.id)
      .delete()
      .then(() => {
        dispatch({ type: "NOTIF_DELETED_SUCCESS" });
      });
  };
};
