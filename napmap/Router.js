import React, { Component } from 'react';
import { Actions, Scene, Router, Modal, Tabs } from 'react-native-router-flux';
import MainPage from './src/pages/MainPage';
import JourneyPage from './src/pages/JourneyPage';
import ProfilePage from './src/pages/ProfilePage';
import AddRoutePage from './src/pages/AddRoutePage';
import MapPage from './src/pages/MapPage';

class RouterComponent extends Component {
    render() {
        return (
            <Router gesturesEnabled={false}>
                <Scene key="root" hideNavBar>
                    <Scene initial key="MainPage" component={MainPage} hideNavBar />
                    <Scene key="JourneyPage" component={JourneyPage} hideNavBar />
                    <Scene key="ProfilePage" component={ProfilePage} hideNavBar />
                    <Scene key="AddRoutePage" component={AddRoutePage} hideNavBar /> 
                    <Scene key="MapPage" component={MapPage} hideNavBar />                   

                </Scene>
            </Router>
        );
    }
}

export default RouterComponent;