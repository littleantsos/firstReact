import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Navigator,
  Picker,
  Image,
  Switch,
  TextInput,
  NetInfo
} from 'react-native';


NetInfo.fetch().done((reach) => {
  console.log('Initial: ' + reach);
});

export default class firstReact extends Component {

    constructor(props){
      super(props);
      this.state = {text: 'Useless placeholder'};
    }

    render(){
      return(
        <View style={styles.container}>
          <Text style={styles.bigText}>aswesomee</Text>

          <Button style={styles.button} onPress={buttonClick} title="button"></Button>

          <Picker>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="Java" value="java" />
            </Picker>

            <Image
              style={styles.logo}
              source={{uri: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png'}}
              />

            <Switch
              onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
              style={{marginBottom:10,marginTop:10}}
               />

            <TextInput style={styles.input}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              ></TextInput>

              <CustomText name=" joker"/>
              <CustomText2 name=" joker"/>
        </View>
      );
    }
}

class CustomText extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Text>{'这是自定义控件'+this.props.name}</Text>
    );
  };
}

const CustomText2 = React.createClass({
  render:function(){
    return (
      <Text>{'这是自定义控件2'}</Text>
    );
  }
});

const buttonClick = () => {
  console.log("first button click")
  Alert.alert("title",'Content');
}

const styles = StyleSheet.create({

    input:{
      width:200,
      height:30,
    },

    logo:{
      width: 60,
      height: 60,
      backgroundColor: 'transparent',
      marginRight: 10,
    },

    container:{
      flex: 1,
      justifyContent: "flex-start",
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },

    bigText:{
      fontSize: 22,
      textAlign: 'center',
      margin: 10,
      color:'#ff6200'
    },

    button:{

    },
  });

AppRegistry.registerComponent('firstReact', () => firstReact);
