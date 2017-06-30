'use strict';

import React, {Component} from 'react';
import {
    View, Text, ListView, Button, StyleSheet, Image, TouchableHighlight, TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import RadiusBtn from "./RadiusBtn";

export default class CircleScreen extends Component {

    constructor(props) {
        super(props);
        // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            // dataSource: ds.cloneWithRows([
            //     '娄俸银', 'youblue', '反之道', 'Speculator', '华尔街科比', '领航者之路', '空的事物', '展翅飞翔168'
            // ])
            isLoading:true
        }
    }

    componentDidMount(){
        this.getMoviesFromApiAsync();
    }

    componentWillMount(){

    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, alignItems: "center",alignSelf:"center"}}>
                    <Text>Loading</Text>
                    <ActivityIndicator/>
                </View>
            );
        }

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData, selection, rowId) => this._renderRow(rowData, selection, rowId)}
            />
        );
    }

    getMoviesFromApiAsync() {
        return fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) => {
                console.info(responseJson);
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson.movies),
                }, function() {
                    // do something with new state
                });
                return responseJson.movies;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _renderRow(rowData, selection, rowId) {
        return (
            <View style={styles.parent}>
                <View style={styles.titleLine}>
                    <Image
                        style={styles.avatar}
                        source={{uri: 'http://www.followme.com/Avata/96019'}}></Image>
                    <View style={styles.avatarRight}>
                        <View>
                            <Text style={styles.nickname}>{rowData.title}</Text>
                        </View>
                        <Text style={styles.blogSendTime}>{rowData.releaseYear}</Text>
                    </View>

                    <View style={styles.attentionButtonContainer}>
                        <RadiusBtn onPress={buttonClick} btnName='关注' btnStyle={styles.attentionButton}
                                   textStyle={styles.attentionButton_text}
                                   focusTextStyle={styles.attentionButton_text_focus}
                        ></RadiusBtn>
                    </View>
                </View>

                <View style={styles.content}>
                    <Text style={styles.blogTextContent}>微博的内容微博的内容微博的内容微博的内容微博的内容微博的内容微博的内容微博的内容微博的内容微博的内容微博的内容微博的内容微博的内容微博的内容微博的内容</Text>
                </View>

            </View>
        );
    }
}

const buttonClick = () => {
    console.log("first button click")
}

const styles = StyleSheet.create({

    blogTextContent:{
        lineHeight:24,/*opacity,10,marginVertical:10,*/
    },

    content:{
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
    },

    parent: {
        flex:1,
        flexDirection: 'column',
        marginTop: 5,
        backgroundColor:"#eee",
    },

    titleLine: {
        flexDirection: 'row',
        flex:1,
        alignItems:"center",
        marginLeft:10,
        marginTop:10,
    },

    attentionButtonContainer:{
        flex:1,
        alignItems: 'flex-end',
        marginRight:15,
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    nickname: {
        alignContent: "center",
        fontSize:15,
    },

    blogSendTime:{
        fontSize:12,
        color:"#999",
        marginTop:5,
    },

    attentionButton: {
        width:65,
        height:26,
        borderRadius:13,
        backgroundColor:"#fff",
        borderColor:"#ff6200",
        borderWidth:1,
    },

    attentionButton_text:{
        color:"#ff6200",
        fontSize:14,
    },

    attentionButton_text_focus:{
        color:"#fff",
        fontSize:14,
    },

    avatarRight: {
        flexDirection: "column",
        marginLeft:10,
    },
})