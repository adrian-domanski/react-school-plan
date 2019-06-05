import 'firebase/auth'
// IMPORTANT IMPORT

export const logIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            console.log('done')
            dispatch({ type: 'SIGN_IN_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'SIGN_IN_ERROR', err })
        })
    }
}

export const logOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGN_OUT_SUCCESS' })
        })
    }
}