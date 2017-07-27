'use strict';

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import {Provider} from 'react-redux';
import configureStore from '../store/ConfigureStore';
import LoginPage from '../pages/LoginPage';
const store = configureStore();

export default class TradeScreen extends Component {
    static navigationOptions = {
        title: 'TradeScreen',
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <Provider store={store}>
                <Navigator
                    style={{flex: 1}}
                    initialRoute={{id: 'LoginPage', component: LoginPage}}
                    configureScene={this.configureScene}
                    renderScene={this.renderScene}
                />
            </Provider>
        );
    }

    configureScene(route, routeStack) {
        if (route.sceneConfig) { // 有设置场景
            return route.sceneConfig;
        }
        return Navigator.SceneConfigs.PushFromRight; // 默认，右侧弹出
    }

    renderScene(route, navigator) {
        return <route.component {...route.passProps} navigator={navigator}/>;
    }


}