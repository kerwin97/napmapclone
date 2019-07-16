import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from '../components/common/Button';
import _ from 'lodash';

class AddRoutePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startloc: '',
      endloc: '',
      predictions: [],
    };
    this.onChangeDestinationDebounced = _.debounce(this.onChangeDestination, 1000);
  }
  async onChangeDestination(destination) {
     this.setState({ endloc: destination });
     const apiURL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${destination}&types=geocode&language=en&key=AIzaSyBNkgiBLRx5GUh8yBnfAdT82Lhp6eF1j3Y&radius=2000`;
      try {
        const result = await fetch(apiURL);
        const json = await result.json();
        console.log(json);
        this.setState({
          predictions: json.predictions
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

  render() {
    const predictions = this.state.predictions.map(prediction => (
      <Text key={prediction.id}>{prediction.description}</Text>
    ));
    return (
        <View style={styles.container}>
          {this.renderXButton()}
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Where To?</Text>
            <TextInput style={styles.textInput}/>
            <Text style={styles.headerText}>Where From?</Text>
            <TextInput 
            style={styles.textInput} 
            placeholder={'Enter Destination'}
            value={this.state.endloc}
            onChangeText={destination => this.onChangeDestinationDebounced(destination)}
            />
            {predictions}
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
            <Button onPress={() => Actions.MapPage()}><Text>Let me sleep!</Text></Button>
          </View>
        </View>
        
    );
  }
}
export default AddRoutePage;
const { width, height } = Dimensions.get('window');
const backgroundColor = '#404855';
const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      backgroundColor: backgroundColor,
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
    buttonContainer: {
      // backgroundColor: 'green',
      alignItems: 'flex-end',
      marginRight: 40,
      marginTop: 50,
    },
    textInput: {
      height: 50,
      width: width - 50,
      backgroundColor: 'white',
      borderRadius: 15,
      marginTop: 20,
      paddingHorizontal: 10,
    },
    textContainer: {
      marginLeft: 25
    },
    headerText: {
      fontFamily: 'arial',
      fontWeight: '500',
      fontSize: 30,
      color: 'white',
      marginTop: 20,
    },
  });
  