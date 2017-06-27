import React from 'react';
import {
  AppRegistry,
  Text,View,Button,
} from 'react-native';
import { StackNavigator,TabNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return(
    <View>
      <Text>Hello, Navigation!</Text>
      <Button
        onPress={() => navigate('Chat')}
        title="Chat with Lucy"
      />
    </View>);
  }
}

class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
  };
  render() {
    return (
      <View>
        <Text>Chat with Lucy</Text>
      </View>
    );
  }
}

class RecentChatsScreen extends React.Component {
  render() {
    return(
      <View>
        <Text>List of recent chats</Text>
        <Button
            onPress={() => this.props.navigation.navigate('Chat', { user: 'Lucy' })}
            title="Chat with Lucy" />
      </View>
    )
  }
}

class AllContactsScreen extends React.Component {
  render() {
    return <Text>List of all contacts</Text>
  }
}

const MainScreenNavigator = TabNavigator({
  Recent: { screen: RecentChatsScreen
    navigationOptions: {  // 也可以写在组件的static navigationOptions内
    //           tabBar: {
    //               label: '首页',
                  // icon: ({tintColor}) => (<Image source={require('./app/images/home.png')} style={[{tintColor: tintColor},styles.icon]}/>),
          //     },
          }
        },
  All: { screen: AllContactsScreen
    // navigationOptions: {  // 也可以写在组件的static navigationOptions内
    //           tabBar: {
    //               label: '第二页',
    //               // icon: ({tintColor}) => (<Image source={require('./app/images/home.png')} style={[{tintColor: tintColor},styles.icon]}/>),
    //           },
    //       }
  },
});

MainScreenNavigator.navigationOptions = {
  title: 'My Chats',
};

const SimpleApp = StackNavigator({
  Home: { screen: MainScreenNavigator },
  // Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },
});

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
