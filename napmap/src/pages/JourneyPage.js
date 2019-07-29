import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import BackgroundGeolocation from "react-native-background-geolocation";
import { white } from 'ansi-colors';
import { tsObjectKeyword } from '@babel/types';

class JourneyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: [],
      wakeUpStops: [],
      napDuration: 0, //counts total time on public transport 
    };
  }

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } 
  componentDidUpdate() {
    if (this.state.wakeUpStops) {
      console.log(this.state.wakeUpStops);
      this.state.wakeUpStops.map(stop  =>
        BackgroundGeolocation.addGeofence({
          identifier: stop.stop_name,
          radius: 400,
          latitude: stop.lat,
          longitude: stop.lng,
          notifyOnEntry: true,
        })
      );
      
      BackgroundGeolocation.onGeofence(function(geofence, taskId) {
        try {
            var identifier = geofence.identifier;
            var action     = geofence.action;
            var location   = geofence.location;

            console.log("- A Geofence transition occurred");
            console.log("  identifier: ", identifier);
            console.log("  action: ", action);
            console.log("  location: ", JSON.stringify(location));
        } catch(e) {
            console.error("An error occurred in my code!", e);
        }
        // Be sure to call #finish!!
        bgGeo.finish(taskId);
    });
    }
    
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
  async getRouteConfig() {

    const apiURL = `https://maps.googleapis.com/maps/api/directions/json?mode=transit&origin=${this.props.currentPos}&destination=${this.props.destination}&key=AIzaSyBNkgiBLRx5GUh8yBnfAdT82Lhp6eF1j3Y`;
    try {
      const result = await fetch(apiURL);
      const json = await result.json();
      console.log(json);
      const directions = json.routes[0].legs[0].steps;
      //shit gets real here 
      const stops = [];
      directions.map((direction) => 
      (
        direction.travel_mode === 'TRANSIT'
        ? stops.push(this.configDirection(direction))
        : null
        // console.log(direction)
      ));
      this.setState({
        wakeUpStops: stops
      });
    } catch (err) {
      console.error(err);
    }
  }
  renderXButton() {
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

  configDirection(direction) {
    const stop = {
      stop_name: direction.transit_details.arrival_stop.name,
      html_instructions: direction.html_instructions,
      duration_value: direction.duration.value, //in seconds
      duration_text: direction.duration.text,
      lat: direction.end_location.lat,
      lng: direction.end_location.lng,
      num_stops: direction.transit_details.num_stops,
    };
    return stop;
  }
  configureText(stop) {
     return (
          <View style={{paddingTop: 5}}>       
            <Text style={{fontWeight: '500'}}>{stop.stop_name}</Text>
            <Text style={{fontWeight: '300'}}>{stop.html_instructions}</Text>
            <Text style={{fontWeight: '300'}}>{stop.duration_text}</Text>
          </View>
        );
    
  }
  renderCards(){
    return (
      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.cardTitle}>Route Summary</Text>
        <ScrollView>
        {this.state.wakeUpStops.map((stop) => 
        (
          this.configureText(stop)
        ))}
        {this.renderTime()}
        </ScrollView>
      </Card>
    );
  }
  renderTime(){
    let time = 0;
    this.state.wakeUpStops.map(stop =>
      time = time + stop.duration_value
    );
    time = (time /60).toFixed(0);
    return (
      <View style={{ paddingTop: 15 }}>
       
        <Text style={{fontFamily: 'arial', fontSize: 18, color: '#F28585', fontWeight: '700'}}>
        {time} minutes of nap time
        </Text>
      </View>
    );
  }
  render() {
    
      return (
        
          <SafeAreaView style={styles.container}>
            {this.renderHeader()}
            {this.renderCards()}
            <View style={{alignItems: 'center'}}>
            <Button onPress={() => Actions.MainPage()}>cancel</Button>
            </View>
            
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
    width: width - 30,
    margin: 15,
    height: height/2,
    backgroundColor: 'white',
    padding: 15,
    paddingTop: 25,
    borderRadius: 15,
    shadowOpacity: 0.2,
    shadowOffset: { height: 0, width: 0 },
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