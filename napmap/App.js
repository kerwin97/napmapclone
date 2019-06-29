import React, { Component } from 'react';
import { View } from 'react-native';
import Router from './Router';

//for testing!! 
console.disableYellowBox = true;
class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Router />
      </View>
    );
  }
}

export default App;