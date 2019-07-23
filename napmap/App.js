import React, { Component } from 'react';
import { View } from 'react-native';
import Router from './Router';
import firebase from 'firebase';

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
    return (
     <Router />
    );
  }
}

export default App;