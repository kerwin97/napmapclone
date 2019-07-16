import React from "react";
import { View, TextInput, TextInputEndEditingEventData } from "react-native";

export default class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      location:'',
      predictions:[],
    }
  }
  async onChangeDestination(destination) {
    this.setState({ endloc: destination });
    const apiURL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${destination}&types=geocode&language=en&key=AIzaSyBNkgiBLRx5GUh8yBnfAdT82Lhp6eF1j3Y&radius=2000`;
    try {
      const result = await fetch(apiURL);
      const json = await result.json();
      this.setState({
        predictions: json
      })
    } catch (err) {
      console.error(err);
    }
    
  }
  render() {
    

    return (
      <View>
        <TextInput 
          style={this.props.style? this.props.style : styles.textInput} 
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChangeText={destination => this.onChangeDestination(destination)}
          />
      </View>
    );
    }
}
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