import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

const testArray = [
  {
    transportMode: {
      mode: 'Bus',
      modeDetail: '7'
    },
    
    takeFrom: 'Orchard Road'
  },
  {
    transportMode: {
      mode: 'EW line',
      modeDetail: 'to joo koon'
    },
    
    takeFrom: 'clementi'
  },
];
class JourneyPage extends Component {
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
      <View style={styles.cardContainer}>
        {
          testArray.map((item) => 
          (
          <TouchableOpacity>
            <Card>
              <View style={{ marginHorizontal: 25, marginVertical: 15, }}>
                <Text style={styles.cardTitle}>{this.Capitalize(item.transportMode.mode) + " " + item.transportMode.modeDetail}</Text>
                <View style={{marginTop: 10}}>
                <Text style={styles.cardSubtitle}>{'Take From: ' + this.Capitalize(item.takeFrom)}</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
          )
          )}
      </View>
    );
  }

  render() {
      return (
          <View style={styles.container}>
            <ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 50, marginRight: 20, }}>
              {this.renderXButton()}
              <Button onPress={() => Actions.MapPage()}><Text>view in map</Text></Button>
            </View>
            <Image 
            style={{
              shadowColor: '#000', 
              shadowOffset: { width: 0, height: 0 }, 
              shadowOpacity: 0.5, 
              width: 150, 
              height: 150,
              marginLeft: 30,
              marginTop: 15,
            }}
            source={require('../components/common/images/sloth.png')}/>
            <View style={{ marginTop: 20 }}>
              {this.renderCards()}
            </View>
            </ScrollView>
          </View>
          
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