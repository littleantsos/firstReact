'use strict';

import React from 'react';
import {
    AppRegistry,
} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';

import TabBarItem from './TabBarItem'
import CircleScreen from "./circle/CircleScreen"
import TradeScreen from "./TradeScreen"
import FollowScreen from "./FollowScreen"
import LiveScreen from "./LiveScreen"
import MineScreen from "./MineScreen"

const MainScreenNavigator = TabNavigator({
    TradePage: {
        screen: TradeScreen,
        navigationOptions: {
            tabBarLabel: '交易',
            tabBarIcon:({focused,tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./image/index_icon_trader.png')}
                    selectedImage={require('./image/index_icon_trader_h.png')}
                />
            )
        },
    },
    FollowPage: {
        screen: FollowScreen,
        navigationOptions: {
            tabBarLabel: "跟随",
            tabBarIcon:({focused,tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./image/index_icon_follow.png')}
                    selectedImage={require('./image/index_icon_follow_h.png')}
                />
            )
        }
    },

    CirclePage: {
        screen: CircleScreen,
        navigationOptions: {
            tabBarLabel: "汇友圈",
            tabBarIcon:({focused,tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./image/index_icon_quanzi.png')}
                    selectedImage={require('./image/index_icon_quanzi_h.png')}
                />
            )
        }
    },

    LivePage: {
        screen: LiveScreen,
        navigationOptions: {
            tabBarLabel: "直播间",
            tabBarIcon:({focused,tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./image/index_icon_chat.png')}
                    selectedImage={require('./image/index_icon_chat_h.png')}
                />
            )
        }
    },

    MinePage: {
        screen: MineScreen,
        navigationOptions: {
            tabBarLabel: "我的",
            tabBarIcon:({focused,tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./image/index_icon_my.png')}
                    selectedImage={require('./image/index_icon_my_h.png')}
                />
            )
        }
    },

}, {
    animationEnabled: false, // 切换页面时是否有动画效果
    tabBarPosition: 'bottom',
    swipeEnabled: false, // 是否可以左右滑动切换tab
    backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    lazy:true,
    tabBarOptions: {
        activeTintColor: '#ff6200', // 文字和图片选中颜色
        inactiveTintColor: '#333', // 文字和图片未选中颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {
            height: 0,  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
        },
        style: {
            backgroundColor: '#fff', // TabBar 背景色
            height: 50,
            borderTopWidth:1,
            borderTopColor:'#ddd'
        },
        labelStyle: {
            fontSize: 10, // 文字大小
            marginTop:2
        },
        iconStyle: {},
    },
});

MainScreenNavigator.navigationOptions = {
    title: 'My Chats',
};

const SimpleApp = StackNavigator({
    Home: {screen: MainScreenNavigator},
});

AppRegistry.registerComponent('SimpleApp', () => MainScreenNavigator);
