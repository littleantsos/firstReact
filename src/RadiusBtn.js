'use strict';

import React, {
    Component,
    PropTypes,
} from 'react';

import {
    StyleSheet,
    PixelRatio,
    Text,
    View,
    TouchableHighlight,
    Platform,
} from 'react-native';

export default class RadiusBtn extends Component {

    static propTypes = {
        btnName: PropTypes.string,
        textStyle: Text.propTypes.style,
        focusTextStyle: Text.propTypes.style,
        btnStyle: TouchableHighlight.propTypes.style,
        underlayColor: TouchableHighlight.propTypes.underlayColor,
    };

    constructor(props){
        super(props);
        this.state = {isFocus: false};
    }

    static defaultProps = {
        btnName: 'Button',
        underlayColor: '#ff6200',
    };


    render() {
        return (
            <View style = {{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',}}>
                <TouchableHighlight
                    underlayColor={this.props.underlayColor}
                    activeOpacity={0.8}
                    onHideUnderlay={()=>{console.log('onHideUnderlay');this.setState({isFocus:false})}}
                    onShowUnderlay={()=>{console.log('onShowUnderlay');this.setState({isFocus:true})}}
                    style={[styles.center, styles.btnDefaultStyle, this.props.btnStyle]}
                    onPress={this.props.onPress}>
                    <Text style={[styles.textDefaultStyle,
                        this.state.isFocus ? this.props.focusTextStyle : this.props.textStyle]}>{this.props.btnName}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    center: {
        justifyContent:'center',
        alignItems: 'center',
    },

    btnDefaultStyle: {
        width: 100,
        height: 20,
        backgroundColor: '#ff8447',
        borderColor: '#ff8447',
        borderRadius: 15,
        borderWidth: (Platform.OS==='ios' ? 1.0 : 1.5) / PixelRatio.get(),
    },

    textDefaultFocusStyle:{
        fontSize: 16,
        color: '#ff6200',
    },

    textDefaultStyle: {
        fontSize: 16,
        color: '#ffffff',

    },
});

