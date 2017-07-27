'use strict';

import React, {Component} from 'react';
import {
    View, Text, ListView, StyleSheet, Image,
    ActivityIndicator, RefreshControl
} from 'react-native';
import RadiusBtn from "../widget/RadiusBtn";
import Configs from "../config/Configs";
import Utils from "../util/Utils";
import AvatarImage from "../widget/AvatarImage";

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

        Configs.appServer;
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
                onEndReached={() => this._onEndReached()}
                onEndReachedThreshold={1}
                refreshControl={
                    <RefreshControl
                        refreshing={ this.state.isRefresh }
                        onRefresh={() => {
                            this._getMoviesFromApiAsync(false)
                        }}
                        tintColor="gray"
                        colors={['#ff6200']}
                        progressBackgroundColor="#fff"/>
                }
                renderFooter={this._renderFooter.bind(this)}
                style={{backgroundColor:"#e5e6ec"}}
            />
        );
    }

    _renderFooter() {
        console.log("render footer");
        console.log("currentPage = " + this.currentPage + " maxPage = " + this.maxPage);
        let hasLoadAllPage = this._hasLoadAllPage();
        if (!hasLoadAllPage)
            return (
                <View style={styles.footer}>
                    <ActivityIndicator/>
                    <Text>加载更多</Text>
                </View>
            );
        else return (
            <View style={styles.footer}>
                <Text>已经全部加在完毕</Text>
            </View>
        );
    }

    _getMoviesFromApiAsync(isLoadMore) {
        if (this._hasLoadAllPage()) return;
        let tempCurrentPage = this.currentPage;
        let headers = new Headers({
            'Content-Type': 'application/json',
            'DeviceID': '',
            'Authorization': '',
        });

        let formData = new FormData();
        formData.append("RequestType", "14");
        this.currentPage = isLoadMore ? ++this.currentPage : 0;
        this.setState({isRefresh: !isLoadMore, isLoadMore: isLoadMore});

        let url = "http://pre.appapi.followme.com:9918/api/Request/Action?RequestType=14";
        return fetch(url, {
            method: 'POST',
            headers: headers,
            // body: "{'RequestData':{'CategoryType':0,'LastBlogID':0,'PageIndex':1,'PageSize':15},'From':3102,'RequestType':14,'UserID':'00000'}",
            // body: "{\"RequestData\":{\"CategoryType\":0,\"LastBlogID\":0,\"PageIndex\":1,\"PageSize\":15},\"From\":3102,\"RequestType\":14,\"UserID\":\"00000\"}",
            body: JSON.stringify({
                'RequestData': {'CategoryType': 0, 'LastBlogID': 0, 'PageIndex': 1, 'PageSize': 15},
                'From': 3102,
                'RequestType': 14,
                'UserID': '00000'
            })
        })
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((responseJson) => {
                console.info("response = " + " " + (typeof responseJson));
                console.info("response = " + " " + (responseJson.Data.length));
                responseJson.Data.map((microBlog, index) => {
                    console.log(index + " " + microBlog.MicroBlog.UserDisplayName);
                })
                // console.info("response = "+ Utils.obj2string(responseJson));

                if (isLoadMore)
                    this.movies = this.movies.concat(responseJson.Data);
                else  this.movies = responseJson.Data;
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


    _hasLoadAllPage() {
        console.log("currentPage = " + this.currentPage + " maxPage = " + this.maxPage);
        return (this.currentPage + 1) >= this.maxPage;
    }

    _renderRow(rowData, selection, rowId) {
        let microBlog = rowData.MicroBlog;
        let isRetweet = microBlog.OriginalId > 0;
        let isLongBlog = microBlog.longBlogId > 0;
        let forwardIsLong = false;
        if (isRetweet) {
            forwardIsLong = microBlog.OriginalBlog.MicroBlog.longBlogId > 0;
        }
        let isHasPicture = rowData.ImgUrlList.length > 0;

        let simpleBlogText = !isLongBlog && !isRetweet && !isHasPicture; //是否是纯文本微博
        let simpleBlogTextPicture = !isLongBlog && !isRetweet && isHasPicture; //文本 图片微博
        let simpleBlogForwardText = !forwardIsLong && isRetweet && !isHasPicture; //转发纯文本
        let simpleBlogForwardTextPic = !isLongBlog && isRetweet && isHasPicture; //转发图片
        let longBlog = isLongBlog && !isRetweet;  //长微博
        let longBlogForward = forwardIsLong && isRetweet;  //转发长微博

        console.log("simpleBlogText = " + simpleBlogText + " simpleBlogTextPicture =" + simpleBlogTextPicture + " simpleBlogForwardText = " + simpleBlogForwardText
            + " simpleBlogForwardTextPic = " + simpleBlogForwardTextPic + " longBlog = " + longBlog + " longBlogForward = " + longBlogForward);

        if (simpleBlogText) {
            return this._renderSimpleTextBlog(rowData);
        } else if (simpleBlogTextPicture) {
            return this._renderSimplePictureBlog(rowData);
        } else if(longBlog){
            return this._renderLongBlog(rowData);
        }
    }

    _renderSimpleTextBlog(rowData) {
        return (
            <View style={styles.parent}>
                <View style={styles.titleLine}>
                    <AvatarImage
                        userId={rowData.MicroBlog.UserId}
                    ></AvatarImage>
                    <View style={styles.avatarRight}>
                        <View>
                            <Text style={styles.nickname}>{rowData.MicroBlog.UserDisplayName}</Text>
                        </View>
                        <Text style={styles.blogSendTime}>{rowData.MicroBlog.CreateDate}</Text>
                    </View>

                    <View style={styles.attentionButtonContainer}>
                        <RadiusBtn onPress={buttonClick} btnName='关注' btnStyle={styles.attentionButton}
                                   textStyle={styles.attentionButton_text}
                                   focusTextStyle={styles.attentionButton_text_focus}
                        ></RadiusBtn>
                    </View>
                </View>

                <View style={styles.content}>
                    <Text style={styles.blogTextContent}>{rowData.MicroBlog.BlogBody}</Text>
                </View>
            </View>
        )
    }

    _renderLongBlog(rowData) {
        return (
            <View style={styles.parent}>
                <View style={styles.titleLine}>
                    <AvatarImage
                        userId={rowData.MicroBlog.UserId}></AvatarImage>
                    <View style={styles.avatarRight}>
                        <View>
                            <Text style={styles.nickname}>{rowData.MicroBlog.UserDisplayName}</Text>
                        </View>
                        <Text style={styles.blogSendTime}>{rowData.MicroBlog.CreateDate}</Text>
                    </View>

                    <View style={styles.attentionButtonContainer}>
                        <RadiusBtn onPress={buttonClick} btnName='关注' btnStyle={styles.attentionButton}
                                   textStyle={styles.attentionButton_text}
                                   focusTextStyle={styles.attentionButton_text_focus}
                        ></RadiusBtn>
                    </View>
                </View>

                <View style={styles.longBlogContent}>
                    <Image style={styles.longBlogPicture} source={{uri:rowData.MicroBlog.LongBlogImg}}/>
                    <View style={{flex:1,flexDirection:"column"}}>
                        <Text style={styles.longBlogContent1}>{rowData.MicroBlog.LongBlogTitle}</Text>
                        <Text style={styles.longBlogContent2} numberOfLines={2}>{rowData.MicroBlog.LongBlogIntro}</Text>
                    </View>
                </View>
            </View>
        );
    }

    _renderSimplePictureBlog(rowData) {
        return (
            <View style={styles.parent}>
                <View style={styles.titleLine}>
                    <AvatarImage
                        userId={rowData.MicroBlog.UserId}></AvatarImage>
                    <View style={styles.avatarRight}>
                        <View>
                            <Text style={styles.nickname}>{rowData.MicroBlog.UserDisplayName}</Text>
                        </View>
                        <Text style={styles.blogSendTime}>{rowData.MicroBlog.CreateDate}</Text>
                    </View>

                    <View style={styles.attentionButtonContainer}>
                        <RadiusBtn onPress={buttonClick} btnName='关注' btnStyle={styles.attentionButton}
                                   textStyle={styles.attentionButton_text}
                                   focusTextStyle={styles.attentionButton_text_focus}
                        ></RadiusBtn>
                    </View>
                </View>

                <View style={styles.content}>
                    <Text style={styles.blogTextContent}>{rowData.MicroBlog.BlogBody}</Text>
                </View>

                <View style={styles.pictureContent}>
                    {rowData.ImgUrlList.map((item,i)=>this.renderPicture(item,i,rowData.ImgUrlList.length))}
                </View>

            </View>
        );
    }

    renderPicture(item, i, length){
        return <Image style={length > 1 ? styles.picture : styles.pictureOnlyOne} source={{uri:item}}/>
    }
}

const buttonClick = () => {
    console.log("first button click")
}

const styles = StyleSheet.create({

    longBlogContent1:{
        marginLeft:5,
        marginRight:17,
        color:"#333",
        fontSize:14,
        marginTop:15,
    },

    longBlogContent2:{
        marginLeft:5,
        marginRight:17,
        color:"#333",
        fontSize:17,
        marginTop:10,
    },

    longBlogPicture:{
        width:118,
        height:115,
        alignItems:"center",
        margin:0.5,
        resizeMode:"stretch", //('cover', 'contain', 'stretch')
    },

    longBlogContent:{
        flex:1,
        height:118,
        margin:10,
        borderColor:"#ddd",
        borderWidth:1,
        flexDirection:"row",
    },

    pictureOnlyOne:{
        width:200,
        height:200,
        marginBottom:10,
    },

    pictureContent:{
        flex:1,
        flexWrap:"wrap",
        flexDirection:"row",
        marginLeft:10,
    },

    picture: {
        width: 100,
        height: 100,
        backgroundColor:"#dddddd",
        marginRight:10,
        marginBottom:10,
    },

    footer: {
        height: 30,
        backgroundColor: '#dddddd',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
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
        backgroundColor: "#fff",
        borderBottomWidth:1,
        borderTopWidth:1,
        borderColor:"#dbdce4"
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