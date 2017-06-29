'use strict';

import React,{Component} from 'react';
import {View,Text} from 'react-native';

export default class LiveScreen extends Component {
    static navigationOptions = {
        title: 'LiveScreen',
    };

    render() {
        return (
            <View>
                <Text>LiveScreen</Text>
            </View>
        );
    }
}