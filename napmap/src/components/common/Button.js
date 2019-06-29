import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
        <Text style={styles.textStyle} >
          {children}
        </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    backgroundColor: '#F28585',
    borderRadius: 25,
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export { Button };
