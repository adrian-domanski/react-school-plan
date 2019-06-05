import { combineReducers } from 'redux'
import taskReducer from './taskReducer'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import notifReducer from './notifReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    tasks: taskReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    notifs: notifReducer
})

export default rootReducer