import React from 'react';
import { View } from 'react-native';
//creates a card
const Card = (props) => {
  return (
    <View style={props.containerStyle ? props.containerStyle : styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    // borderWidth: 1,
    borderRadius: 20,
    // borderColor: '#ddd',
    // borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
    height: 100,
    marginBottom: 25,
  }
};

export { Card };
