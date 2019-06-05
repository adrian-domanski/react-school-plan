import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import './index.css'
import { createStore, applyMiddleware, compose } from 'redux'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import rootReducer from './store/reducers/rootReducer'
import fbConfig from './store/config/fbConfig'

const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(fbConfig),
        reactReduxFirebase(fbConfig)
    )
);



ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));



