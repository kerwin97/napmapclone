import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card } from '../components/common/Card';
//using Test array first to fix the ui, will be removed for firebase data later on 
const testArray = [
  {
    key: 0,
    title: 'work',
    address: 'NUS Computing, 15 Computing Drive, Singapore'
  },
  {
    key: 1,
    title: 'work',
    address: 'NUS Computing, 15 Computing Drive, Singapore'
  },
  {
    key: 2,
    title: 'work',
    address: 'NUS Computing, 15 Computing Drive, Singapore'
  },
  {
    key: 3,
    title: 'work',
    address: 'NUS Computing, 15 Computing Drive, Singapore'
  },
  // {
  //   key: 4,
  //   title: 'work',
  //   address: 'NUS Computing, 15 Computing Drive, Singapore'
  // },
  // {
  //   key: 5,
  //   title: 'work',
  //   address: 'NUS Computing, 15 Computing Drive, Singapore'
  // },
];

class MainPage extends Component {
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
    renderXButton(){
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
    renderAddRoute(){
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
    renderCards(){
      return (
        <View style={styles.cardContainer}>
          {
            testArray.map((item) => 
            <TouchableOpacity
            onPress={()=>Actions.JourneyPage()}>
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
    render() {
        return (
          <View style={styles.container}>
            <ScrollView >
            
              <View style={{flexDirection:'row'}}>
                {this.renderHeader()}
                {this.renderXButton()}
              </View>
                 
              <View style={{flex:1}}>
                {this.renderCards()}
              </View>
              <View>
                {this.renderAddRoute()}
              </View>
            </ScrollView>
           
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