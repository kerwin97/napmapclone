import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
class MainPage extends Component {
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={() => Actions.JourneyPage()}>
                    <Text>Main</Text>
                </TouchableOpacity>
            </View>
           
        );
    }
}
export default MainPage;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#404855',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });
  