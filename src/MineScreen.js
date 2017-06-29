import React,{Component} from 'react';
import {View,Text} from 'react-native';

export default class MineScreen extends Component {
    static navigationOptions = {
        title: 'MineScreen',
    };

    render() {
        return (
            <View>
                <Text>MineScreen</Text>
            </View>
        );
    }
}