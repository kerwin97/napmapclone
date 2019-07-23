import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
//emailChanged is the name of the const of the
//object which stores all the actions
import { Card, CardSection, Input, Button, Spinner } from '../components/common';

class LoginForm extends Component {
  //this function will then call the action
  //the action will call the reducer
  //the reducer will change the state of the LoginForm
  firebase.auth().onAuthStateChanged((user) => {
    console.log(user);
  });
}
  onEmailChange(text) {
    this.props.emailChanged(text);
    //now emailChanged is connected to this component as a prop
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

//if login fails
  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
           {this.props.error}
          </Text>
        </View>
      );
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
      return (
        <Button onPress={this.onButtonPress.bind(this)}>
          Log In
        </Button>
      );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            //calls the function when something is typed
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        {this.renderError()}

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser })(LoginForm);
//binding action creator with component using connect
