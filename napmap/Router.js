import React, { Component } from 'react';
import { Actions, Scene, Router, Modal, Tabs } from 'react-native-router-flux';
import MainPage from './src/pages/MainPage';
import JourneyPage from './src/pages/JourneyPage';
class RouterComponent extends Component {
    render(){
        return(
            <Router gesturesEnabled={false}>
                <Scene key="root" hideNavBar>
                    <Scene initial key="MainPage" component={MainPage} hideNavBar/>
                    <Scene key="JourneyPage" component={JourneyPage} hideNavBar/>
                </Scene>
            </Router>
        );
    }
}

export default RouterComponent;