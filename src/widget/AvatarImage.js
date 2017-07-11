'use strict';

import React,{Component,PropTypes} from "react";
import {Image, View,StyleSheet} from "react-native";

export default class AvatarImage extends Component{


    static propTypes={
        userId: PropTypes.string,
        avatarStyle:Image.propTypes.style,
    }

    static defaultProps={
        avatarStyle:{
            width: 50,
            height: 50,
            borderRadius: 25,
        },
        userId:'100',
    }

    render(){
        return(
            <View>
                <Image
                    style={this.props.avatarStyle}
                    source={{uri: 'http://www.followme.com/Avata/'+this.props.userId}}/>
            </View>
        );
    }

}

