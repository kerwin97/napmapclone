import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, loginUser, signupUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from '../components/common';
import firebase from 'firebase';


class LoginForm2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        loading: false,
        loggedIn: false,
        error: true,
    };
}
  onEmailChange(text) {
    this.props.emailChanged(text);
    //now emailChanged is connected to this component as a prop
  }
  onLoginSuccess() {
    this.setState({loading:false});
    Actions.MainPage();
}

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
    //login
    onButtonPress() {
      // console.log('hello');
      this.setState({loading: true});
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.onLoginSuccess.bind(this))
      .catch((error) => { 
        console.log(error);
          alert('log in fail');
      });
  }

    //signup
  onSignUpButtonPress(){
          this.setState({loading: true});
         firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
         .then(this.onLoginSuccess.bind(this))
         .catch((error) => {
           console.log(error);
            alert(error.message);
         })
     }

  renderSignUpButton() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }
      return (
          <Button onPress={() => this.onSignUpButtonPress()}>
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
      if (this.state.loading) {
        return <Spinner size="large" />;
      }
        return (
          <Button onPress={() => this.onButtonPress()}>
            Log In
          </Button>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: backgroundColor, alignItems: 'center'}}>
              <Text style={styles.headerText}> Sign in </Text>
                <View style={styles.containerStyle}>
                    <CardSection>
                        <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        label="Email"
                        placeholder="email@gmail.com"
                        onChangeText={email => this.setState({ email })}                        //calls the function when something is typed

                        />
                    </CardSection>

                    <CardSection>
                        <Input
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        label="Password"
                        placeholder="password"
                        onChangeText={password => this.setState({ password })}                                 
                        />
                    </CardSection>

                    {/* {this.renderError()} */}

                    <CardSection>
                        {this.renderButton()}
                        {this.renderSignUpButton()}
                    </CardSection>
                </View>
            </View>
        );
    }
  }
  const backgroundColor = '#404855';
  const { width, height } = Dimensions.get('window');
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
        elevation: 1,
        borderRadius: 15,
        height: height/3 - 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        width: width -30,
    },
    headerText: {
      fontFamily: 'arial',
      fontWeight: '500',
      fontSize: 45,
      color: 'white',
      paddingBottom: 50
    },
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
