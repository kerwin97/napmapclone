import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from '../components/common';
import firebase from 'firebase';

class LoginForm2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            authenticating: false,
            loggedIn: false,
            error: true,
        };
    }
    onLoginSuccess() {
        Actions.MainPage();
    }
    //login
    onButtonPress() {
        // console.log('hello');
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(this.onLoginSuccess.bind(this))
        .catch((error) => { 
            alert('log in fail');
        });
    }
    //signup
    onSignUpButtonPress(){
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(this.onLoginSuccess.bind(this))
        .catch((error) => {
            alert(error.message);
        })
    }
    renderSignUpButton() {
        return (
            <Button onPress={() => this.onSignUpButtonPress()}>
               Sign up
            </Button>
            );
    }
    renderButton() {
        if (this.state.authenticating) {
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
            <View style={{flex: 1, justifyContent: 'center', }}>
                <Card containerStyle={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.4,
                    shadowRadius: 2,
                    elevation: 1,}}>
                    <CardSection>
                        <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        label="Email"
                        placeholder="email@gmail.com"
                        onChangeText={email => this.setState({ email })}
                        //calls the function when something is typed
                        
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
    }
  };
  
  export default LoginForm2;
  //binding action creator with component using connect