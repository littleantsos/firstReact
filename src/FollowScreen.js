import React,{Component} from 'react';
import {View,Text} from 'react-native';

export default class FollowScreen extends Component {
    render() {
        return (
            <View>
                <Text>FollowScreen</Text>
                {/*<Button
                 onPress={() => this.props.navigation.navigate('Chat', {user: 'Lucy'})}
                 title="Chat with Lucy"/>*/}
            </View>
        )
    }
}