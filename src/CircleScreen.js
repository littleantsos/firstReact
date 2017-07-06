'use strict';

import React, {Component} from 'react';
import {
    View, Text, ListView, StyleSheet, Image,
    ActivityIndicator, RefreshControl
} from 'react-native';
import RadiusBtn from "./RadiusBtn";

export default class CircleScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRefresh: true,
            isLoadMore: false,
        }
        this.movies = new Array;
        this.maxPage = 2;
        this.currentPage = 0;
    }

    componentDidMount() {
        this._getMoviesFromApiAsync(false);
    }

    componentWillMount() {

    }

    _onEndReached() {
        console.log("on end reached");
        this._getMoviesFromApiAsync(true);
    }

    render() {
        if (this.state.isRefresh && !this.state.isLoadMore) {
            return (
                <View style={{flex: 1, alignItems: "center", alignSelf: "center"}}>
                    <Text>Loading</Text>
                    <ActivityIndicator/>
                </View>
            );
        }

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData, selection, rowId) => this._renderRow(rowData, selection, rowId)}
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={1}
                refreshControl={
                    <RefreshControl
                        refreshing={ this.state.isRefresh }
                        onRefresh={this._getMoviesFromApiAsync.bind(this)}
                        tintColor="gray"
                        colors={['#fff']}
                        progressBackgroundColor="#ff6200"/>
                }
                renderFooter={this._renderFooter.bind(this)}
            />
        );
    }

    _renderFooter() {
        console.log("render footer");
        // console.log("currentPage = " + this.currentPage + " maxPage = " + this.maxPage);
        let hasLoadAllPage = this._hasLoadAllPage();
        if(!hasLoadAllPage)
            return (
                <View style={styles.footer}>
                    <ActivityIndicator/>
                    <Text>加载更多</Text>
                </View>
            );
        else return (
            <View>
                <Text>已经全部加在完毕</Text>
            </View>
        );
    }

    _getMoviesFromApiAsync(isLoadMore) {
        if(this._hasLoadAllPage()) return;
        let tempCurrentPage = this.currentPage;
        this.currentPage = isLoadMore ? ++this.currentPage : 0;
        this.setState({isRefresh: !isLoadMore,isLoadMore:isLoadMore});
        return fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) => {
                console.info(responseJson);
                if(isLoadMore)
                this.movies = this.movies.concat(responseJson.movies);
                else  this.movies = responseJson.movies;
                console.log("电影数目 = " + this.movies.length + " " + responseJson.movies);
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    isRefresh: false,
                    dataSource: ds.cloneWithRows(this.movies),
                }, function () {
                    // do something with new state
                });
                return responseJson.movies;
            })
            .catch((error) => {
                console.error(error);
                isLoadMore ? --this.currentPage : tempCurrentPage;
            });
    }

    _hasLoadAllPage(){
        console.log("currentPage = " + this.currentPage + " maxPage = " + this.maxPage);
        return (this.currentPage + 1) >= this.maxPage;
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
                        <RadiusBtn           onPress={buttonClick} btnName='关注' btnStyle={styles.attentionButton}
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

    footer:{
        height:30,
        backgroundColor:'#dddddd',
        flexDirection: 'row',
        alignItems:"center",
        justifyContent:'center',
    },

    blogTextContent: {
        lineHeight: 24,
    },

    content: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },

    parent: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 5,
        backgroundColor: "#eee",
    },

    titleLine: {
        flexDirection: 'row',
        flex: 1,
        alignItems: "center",
        marginLeft: 10,
        marginTop: 10,
    },

    attentionButtonContainer: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 15,
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    nickname: {
        alignContent: "center",
        fontSize: 15,
    },

    blogSendTime: {
        fontSize: 12,
        color: "#999",
        marginTop: 5,
    },

    attentionButton: {
        width: 65,
        height: 26,
        borderRadius: 13,
        backgroundColor: "#fff",
        borderColor: "#ff6200",
        borderWidth: 1,
    },

    attentionButton_text: {
        color: "#ff6200",
        fontSize: 14,
    },

    attentionButton_text_focus: {
        color: "#fff",
        fontSize: 14,
    },

    avatarRight: {
        flexDirection: "column",
        marginLeft: 10,
    },
})