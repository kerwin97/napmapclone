import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const FloatingButton = ({ onPress, children, extraButtonStyle, extraTextstyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonStyle, extraButtonStyle]}>
        <Text style={[styles.textStyle, extraTextstyle]} >
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
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    left: 50,
  }
};

export { FloatingButton };
