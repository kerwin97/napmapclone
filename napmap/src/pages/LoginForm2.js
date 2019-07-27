import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, signupUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from '../components/common';


class LoginForm2 extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
    //now emailChanged is connected to this component as a prop
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
    //login
  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }
    //signup
    onSignUpButtonPress() {
      const { email, password } = this.props;

      this.props.signupUser({ email, password });
    }

    renderSignUpButton() {
        return (
            <Button onPress={() => this.onSignUpButtonPress.bind(this)}>
               Sign up
            </Button>
            );
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
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <Card style={styles.containerStyle}>
                    <CardSection>
                        <Input
                        autoCapitalize="none"
                        autoCorrect={false}
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
                        autoCapitalize="none"
                        autoCorrect={false}
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                        />
                    </CardSection>

                    {/* {this.renderError()} */}

                    <CardSection>
                        {this.renderButton()}
                        {this.renderSignUpButton()}
                    </CardSection>
                </Card>
            </View>
        );
    }
  }

  const styles = {
    errorTextStyle: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'red'
    },
    containerStyle: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1
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
    loginUser,
    signupUser })(LoginForm2);
  //binding action creator with component using connect
