import React, { Component } from 'react';
import { Actions, Scene, Router, Modal, Tabs } from 'react-native-router-flux';

class Router extends Component {
    render(){
        return(
            <Router gesturesEnabled={false}>
                <Scene key="root" hideNavBar>
                    <Scene key="MainPage" component={MainPage} hideNavBar/>
                </Scene>
                <Scene key="JourneyPage" component={JourneyPage} hideNavBar/>
                
            </Router>
        );
    }
}

export default Router;