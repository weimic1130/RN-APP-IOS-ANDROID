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
    KeyboardAvoidingView,
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

let {width, height} = Dimensions.get('window');
export default class AboutUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeInex: 1
        }
    }

    static navigationOptions = {
        headerTitle: '设置',
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
            <View style={styles.containerAppSet}>
                <View style={styles.AboutChild1}>
                    <View style={styles.AboutChild12}>
                        <Text style={styles.AboutChild12Text}>账号与安全</Text>
                        <Image source={require('./Images/2.png')} />
                    </View>
                    <View style={styles.AboutChild12}>
                        <Text style={styles.AboutChild12Text}>允许流量下载</Text>
                        <Text>下载</Text>
                    </View>
                    <View style={styles.AboutChild12}>
                        <Text style={styles.AboutChild12Text}>修炼提醒</Text>
                        <Text>清除缓存</Text>
                    </View>
                    <View style={styles.AboutChild12}>
                        <Text style={styles.AboutChild12Text}>清除缓存</Text>
                        <Text style={{color:"#B2B2B2",fontSize:14}}>12.54m</Text>
                    </View>
                    <View style={styles.AboutChild12N}>
                        <Text style={styles.AboutChild12Text}>当前版本</Text>
                        <Text style={{color:"#B2B2B2",fontSize:14}}>v1.0.0</Text>
                    </View>
                </View>
                <View style={styles.AboutChild111}>
                    <Text style={styles.tuichuSty}>退出登录</Text>
                </View>
            </View>
        );
    }


    componentDidMount() {
    }

}

const styles = StyleSheet.create({
    containerAppSet: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F3F3F3"
    },
    titleAb:{
        color:"#282828",
        fontSize:15,
        paddingTop:10,
        paddingBottom:5,
        fontWeight: "bold"
    },
    titleAb1:{
        color:"#B2B2B2",
        fontSize:13
    },
    AboutChild:{
        marginTop: 35
    },
    AboutChild1:{
        width:width,
        backgroundColor:"#FFFFFF"
    },
    AboutChild111:{
        width:width,
        backgroundColor:"#FFFFFF",
        marginTop: 20,
        alignItems:"center",
        height:50,
        justifyContent:"center"
    },
    AboutChild12:{
        width:"94%",
        flexDirection:"row",
        justifyContent:"space-between",
        marginLeft:"3%",
        borderBottomWidth:1,
        borderBottomColor:"#EAEAEA",
        alignItems: "center",
        height:60
    },
    AboutChild12N:{
        width:"94%",
        flexDirection:"row",
        justifyContent:"space-between",
        marginLeft:"3%",
        alignItems: "center",
        height:60
    },
    AboutChild12Text:{
        color:"#282828",
        fontSize:16
    },
    tuichuSty:{
        color:"#FF513B",
        fontSize:17,
        fontWeight:"bold"
    }
});
