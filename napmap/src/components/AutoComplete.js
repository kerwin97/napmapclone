import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from '../components/common/Button';
import _ from 'lodash';

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: '',
      predictions: [],
      userPos: '',
      chosenOption: '',
    };
    this.onChangeDestinationDebounced = _.debounce(this.onChangeDestination, 1000);
  }
  componentWillMount() {
    this.getCurrentPostion();
  }
  async onChangeDestination(destination) {
     this.setState({ destination });
     const apiURL = `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${destination}&types=establishment&language=en&key=AIzaSyBNkgiBLRx5GUh8yBnfAdT82Lhp6eF1j3Y&radius=50000&location=1.3521,103.8198`;
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


  getCurrentPostion() {
    navigator.geolocation.getCurrentPosition(geoSuccess =>
      this.setState({ userPos: geoSuccess.coords.latitude + ',' + geoSuccess.coords.longitude }));
      // console.log(geoSuccess));
  }

  handleOptionPress(prediction){
    console.log(prediction);
    this.setState({
      chosenOption: prediction,
      predictions: [],
    })
  }
  renderTextInput(){
  
    const predictions = this.state.predictions.map((prediction) => (
      <View style={styles.predictions}>
        <TouchableOpacity onPress={() => this.handleOptionPress(prediction)}>
          <Text>{prediction.description}</Text>
        </TouchableOpacity>
      </View>

    ));

    if(this.state.chosenOption){
      return(
        <TouchableOpacity 
        onPress = {() => this.setState({ chosenOption: null })}>
          <View style ={[styles.textInput, { justifyContent: 'center'} ]}>
            <Text>
              {this.state.chosenOption.description}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (

      <View>
        <TextInput 
        style={styles.textInput} 
        placeholder={this.props.placeholder? this.props.placeholder: null}
        value={this.state.endloc}
        onChangeText={destination => this.onChangeDestinationDebounced(destination)}
        />
        {
        predictions ?
        <View style={{paddingTop:5, backgroundColor:'white'}}>
          {predictions}
        </View>
        : null
        }
      </View>
    );
  }
  
  render() {
    return (
      this.renderTextInput());
  }
}
export default AutoComplete;
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
    predictions: {
      height: 30, 
      justifyContent: 'center',
      width : width - 50,
      backgroundColor: 'white',
      paddingHorizontal: 10,
    }
  });
  