import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

//kerwin: dump your map here -elsa 

class MapPage extends Component {
    render(){
      return (
        <View style={{ flex: 1 }}>
          <MapView 
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            showsUserLocation
            followsUserLocation
          />
        </View>
      );
    }
}

const backgroundColor = '#404855';
const { width, height } = Dimensions.get('window');
const circleSize = 60;

export default MapPage;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor,
      paddingBottom: 30,
      justifyContent: 'center',
      alignItems: 'center'
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
    headerText: {
      fontFamily: 'arial',
      fontWeight: '500',
      fontSize: 45,
      color: 'white'
    },
    headerContainer: {
      marginTop: 25,
      marginLeft: 30,
      width: width * 2 / 3,
      height: height / 4,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'blue',
    },
    buttonContainer: {
      // backgroundColor: 'green',
      alignItems: 'flex-end',
      marginLeft: 40,
      // marginTop: 50,
      
    },
    cardContainer: {
      // backgroundColor: 'red',
      width: width,
    },
    cardTitle: { 
      fontFamily: 'arial',
      fontSize: 25,
      fontWeight: '500',
      color: '#707070',
    },
    cardSubtitle:{
      fontFamily: 'arial',
      fontSize: 14,
      fontWeight: '100',
      color: '#97A3BA',
    },
    circle: {
      backgroundColor: 'white',
      height: circleSize, 
      width: circleSize, 
      borderRadius: circleSize/2, 
      alignItems: 'center',
      justifyContent: 'center',
    }
  });