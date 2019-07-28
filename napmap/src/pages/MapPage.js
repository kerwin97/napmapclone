import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Button } from '../components/common/Button';

//kerwin: dump your map here -elsa

class MapPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        region: {
          latitude: 1.3521,
          longitude: 103.8198,
          latitudeDelta: 0.001664195044303443,
          longitudeDelta: 0.0015142817690068,
        },
        dLat: null,
        dLng: null,
        error: null,
      };
    }
    componentWillMount() {
      this.getDestinationLatLng();
    }

    componentDidMount() {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }
      );
    }
    async getDestinationLatLng() {
      const placeid = this.props.destination.place_id; 
      const apiURL = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeid}&key=AIzaSyBNkgiBLRx5GUh8yBnfAdT82Lhp6eF1j3Y`;
      try {
        const result = await fetch(apiURL);
        const json = await result.json();
        const loc = json.results[0].geometry.location;
        this.setState({
          dLat: loc.lat,
          dLng: loc.lng,
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
    
    renderConfirmButton() {
      return(
        <View style={styles.buttonContainer2}>
          <Button onPress={() => Actions.JourneyPage()}>
            Confirm
          </Button>
        </View>
      );
    }
    render() {
      return (
        <View style={{ flex: 1 }}>
          {this.renderXButton()}
          {this.renderConfirmButton()}
          {!!this.state.dLat && !!this.state.dLng &&
          <MapView
            initialRegion={{
              latitude: this.state.dLat,
              longitude: this.state.dLng,
              latitudeDelta: 0.05,
              longitudeDelta: 0.01,
            }}
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            showsUserLocation
            followsUserLocation
          >
            <Marker
            coordinate={{latitude: this.state.dLat, longitude: this.state.dLng}}
            />
          </MapView>
          }

        </View>
      );
    }
}

export default MapPage;

const backgroundColor = '#404855';
const { width, height } = Dimensions.get('window');
const circleSize = 60;


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
      position: 'absolute',
      top: 55,
      left: 20,
      zIndex: 1,
      height: 50,
      width: 50,
      borderRadius: 25,
      backgroundColor: 'white',
      shadowOpacity: 0.2,
      justifyContent: 'center',
      alignItems: 'center',
      shadowOffset: { height:0, width: 0},
      elevation: 1
    },
    buttonContainer2: {
      position: 'absolute',
      bottom: 55,
      alignSelf: 'center',
      zIndex: 1,
      height: 50,
      width: 50,
      borderRadius: 25,
      shadowOpacity: 0.2,
      justifyContent: 'center',
      alignItems: 'center',
      shadowOffset: { height:0, width: 0},
      elevation: 1
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
