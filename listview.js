'user-strict';

import React,{Component} from 'React';
import {ListView} from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class extends Component{
  consturctor(props){
    super(props);
    var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 != r2});
    this.state = {ds.cloneWithRows(["Row1","Row2"])};
  }

  render(){
    return(
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
          ></ListView>
    );
  };
}

AppRegistry.registerComponent('listview',()=>listview);
