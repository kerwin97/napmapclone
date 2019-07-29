import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

class JourneyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: [],
    };
  }
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <Text
          style={styles.headerText} >
          Relax, we'll wake you up ;-)
        </Text>
      </View>
    );
  }
  componentWillMount() {
    this.getRouteConfig();
  }
  async getRouteConfig () {

    const apiURL = `https://maps.googleapis.com/maps/api/directions/json?mode=transit&origin=${this.props.currentPos}&destination=${this.props.destination}&key=AIzaSyBNkgiBLRx5GUh8yBnfAdT82Lhp6eF1j3Y`;
    try {
      const result = await fetch(apiURL);
      const json = await result.json();
      console.log(json);
      this.setState({
        directions: json.routes[0].legs[0].steps
      });
    } catch (err) {
      console.error(err);
    }
  }
  renderXButton(){
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
        onPress={() => Actions.pop()}
        activeOpacity={0.1}>
            <Image 
            style={{width: 25, height: 25}} 
            source={require('../components/common/images/x-button.png')} />
        </TouchableOpacity>
      </View>
    );
  }
  renderCards(){
    
    return (
      <Card style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Route Summary</Text>
      {this.state.directions.map((direction) => 
      (
      <View>
        <Text>{direction.html_instructions}</Text>
        <Text>{direction.duration.text}</Text>
      </View>
      ))}
      </Card>
    );
  }
  renderTimeLeft(time){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <Text style={{ fontSize: 80, fontFamily: 'arial', fontWeight: '900', color: 'white'}}>
          {time}
        </Text>
        <Text style={{fontFamily: 'arial', fontSize: 12, color: 'white'}}>
          more minutes
        </Text>
      </View>
    );
  }
  render() {
    console.log(this.state.directions);
      return (
          <SafeAreaView style={styles.container}>
                {this.renderHeader()}
                {this.renderCards()}
          </SafeAreaView>
          
      );
  }
}
const backgroundColor = '#404855';
const { width, height } = Dimensions.get('window');
const circleSize = 60;

export default JourneyPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    paddingBottom: 30,
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
    // marginTop: 25,
    marginLeft: 30,
    width: width * 2 / 3,
    // height: height / 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35,  
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
    padding: 15
  },
  cardTitle: { 
    fontFamily: 'arial',
    fontSize: 15,
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