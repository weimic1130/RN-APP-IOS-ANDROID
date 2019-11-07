/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
// icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator, StackActions, NavigationActions, createAppContainer} from "react-navigation";
import {
    Platform,
    TouchableOpacity,
    TouchableHighlight,
    DatePickerIOS,
    Button,
    Image,
    ImageBackground,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
    ScrollView,
    Animated
} from "react-native";
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view'

let {width, height} = Dimensions.get('window');
let codeTime = 60;
export default class SystemMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerTitle: '系统消息',
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        },
    };

    render() {
        return (
            <View style={styles.containerAppSysmessage}>
                <View style={styles.containerAppSysmessageChid}>
                    <Text style={styles.messageText1}>重磅！葡媒头条:C罗决定离开皇马</Text>
                    <Text style={styles.messageText2}>2018-06-07 14：00</Text>
                </View>
                <View style={styles.containerAppSysmessageChid2}>
                    <Text style={styles.messageText3}>　“C罗离开皇马！”这是葡萄牙媒体《记录报》周四版的封面。据该报透露，C罗已经做出了一个不可更改的决定，因为弗洛伦蒂诺没有履行涨薪的承诺，C罗决定离开皇马。西班牙媒体《马卡报》、《阿斯报》也纷纷转载了这一报道。</Text>
                </View>
                <View style={styles.containerAppSysmessageChid3}>
                    <Image style={styles.messageImg} source={require('./Images/bj.png')} />
                </View>
            </View>
        );
    }

    componentDidMount() {
    }

}

const styles = StyleSheet.create({
    containerAppSysmessage: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFFFFF"
    },
    containerAppSysmessageChid:{
        width:width * 0.96,
        marginLeft:width * 0.04,
        alignItems: "center",
        paddingTop:15,
        borderBottomColor:"#EAEAEA",
        borderBottomWidth:1
    },
    messageText1:{
        color:"#3A3A3A",
        fontSize:17
    },
    messageText2:{
        color:"#A8A8A8",
        fontSize:12,
        paddingTop: 5,
        paddingBottom:5
    },
    containerAppSysmessageChid2:{
        width:width * 0.9,
        alignItems:"center",
        marginTop:15,
        marginBottom:15
    },
    messageText3:{
        color:"#3A3A3A",
        fontSize:14
    },
    containerAppSysmessageChid3:{
        width:width * 0.94,
        alignItems:"center",
    },
    messageImg:{
        width:"98%"
    }
});
