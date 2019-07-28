import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, ScrollView, TouchableWithoutFeedback, Alert, Vibration } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import firebase from 'firebase';
import AutoComplete from '../components/AutoComplete';

class MainPage extends Component {
    constructor(props){
      super(props);
      this.state = {
        expandedSettings: false
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
            Where are you headed today?
          </Text>
        </View>
      );
    }

    renderXButton() {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
          onPress={() => Actions.ProfilePage()}
          activeOpacity={0.1}>
              <Image
              style={{width: 25, height: 25}}
              source={require('../components/common/images/x-button.png')} />
          </TouchableOpacity>
        </View>
      );
    }

    alertFunction() {
      Alert.alert('Wake Up!', 'Destination Reached');
      Vibration.vibrate(500);
    }

    renderAlarmButton() {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.alertFunction.bind(this)}
            activeOpacity={0.1}>
              <Image
              style={{width: 25, height: 25}}
              source={require('../components/common/images/bell.png')} />
          </TouchableOpacity>
        </View>
      );
    }

    renderAddRoute() {
      return(
        <View style={[styles.cardContainer,{alignItems: 'center'}]}>
          <TouchableOpacity onPress={()=>Actions.AddRoutePage()}>
            <View style={styles.circle}>
              <Image
              style={{width: 25, height: 25, transform: [{rotate: '45deg'}] }}
              source={require('../components/common/images/x-button.png')} />
            </View>
          </TouchableOpacity>
        </View>
      );
    }

    renderCards() {
      return (
        <View style={styles.cardContainer}>
          {
            testArray.map((item) =>
            <TouchableOpacity
            onPress={() => Actions.JourneyPage()}>
              <Card>
                <View style={{ marginHorizontal: 25, marginVertical: 15, }}>
                  <Text style={styles.cardTitle}>{this.Capitalize(item.title)}</Text>
                  <View style={{marginTop: 10}}>
                  <Text style={styles.cardSubtitle}>{item.address}</Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
            )
          }
        </View>
      );
    }

    renderLogOutButton() {
      return (
        <Button
        onPress={() => firebase.auth().signOut}
        >
          Log out
        </Button>
      )
    }

    renderSettingsPanel() {
      return this.state.expandedSettings ?
      (
      <View style={{
        width: width,
        height: height * 4 /5 ,
        backgroundColor: 'white',
        bottom: 0,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#97A3BA',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}>
          <View style={{width: 50, height: 5, borderRadius: 2.5, backgroundColor: 'white', marginTop: 15, alignSelf: 'center'}}/>
          <Text style={[styles.headerText, {fontSize: 30, marginLeft: 20}]}>Settings</Text>
          <Text style={[styles.cardSubtitle, { marginLeft: 20, color: 'white', marginTop: 10}]}>Coming Soon!</Text>
      </View>
      )
      :
       (
        //elsa: abstract later -elsa
        <View style={{
          width: width,
          height: 50,
          backgroundColor: 'white',
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#97A3BA',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
            <View style={{width: 50, height: 5, borderRadius: 2.5, backgroundColor: 'white'}}/>
        </View>
      );
    }

    toggleExpanded(){
      this.setState({
        expandedSettings: !this.state.expandedSettings
      });
    }

    render() {
        return (
          <View style={styles.container}>
            {/* <ScrollView > */}


                {this.renderHeader()}
              <View style={{ alignItems: 'center' }} >
                  {this.renderAlarmButton()}
                <View style={{ paddingHorizontal: 20, marginTop: 30, marginBottom: 30 }}>

                  <AutoComplete placeholder='Destination' />
                </View>

                <Button onPress={() => Actions.MapPage()}><Text>Let me sleep!</Text></Button>
              </View>
            {/* </ScrollView> */}
            {/* <TouchableWithoutFeedback onPress={()=> this.toggleExpanded()}>
              {this.renderSettingsPanel()}
            </TouchableWithoutFeedback> */}
          </View>

        );
    }
}
export default MainPage;
const backgroundColor = '#404855';
const { width, height } = Dimensions.get('window');
const circleSize = 60;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor,
      // paddingBottom: 30,
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
      marginTop: 50,
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
