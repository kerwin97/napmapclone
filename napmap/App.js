import React, { Component } from 'react';
//import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'; //middleware for thunk
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers'; //getting a list of all reducers from index of reducers
//import LoginForm from './components/LoginForm';
import Router from './Router';

//for testing!!
console.disableYellowBox = true;
class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyA30zCLyNdIKRA63IHBDo9C8kyIWw6EwpI',
      authDomain: 'napmap-9f891.firebaseapp.com',
      databaseURL: 'https://napmap-9f891.firebaseio.com',
      projectId: 'napmap-9f891',
      storageBucket: 'napmap-9f891.appspot.com',
      messagingSenderId: '144458250987',
      appId: '1:144458250987:web:0672f32d844b5bfa',
    });
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    //installing ReduxThunk into the store
    //Thunk helps to send to all components states

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
