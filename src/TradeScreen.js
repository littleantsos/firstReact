import React,{Component} from 'react';
import {View,Text,Button} from 'react-native';


export default class TradeScreen extends Component {
    static navigationOptions = {
        title: 'TradeScreen',
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>Hello, Navigation!</Text>
                <Button
                    onPress={() => navigate('Chat')}
                    title="TradeScreen"
                />
            </View>);
    }
}