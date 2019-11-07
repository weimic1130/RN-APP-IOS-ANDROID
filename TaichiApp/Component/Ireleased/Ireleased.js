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
import { JFAPI } from './API/API';
import AsyncStorage from "@react-native-community/async-storage";
import BlankPages from '../BlankPages/BlankPages';
let {width, height} = Dimensions.get('window');
let self = this;
export default class Ireleased extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo:'',
            dataList:""
        }
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: '我发布的',
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    })

    render() {
        return (
            <View style={styles.containerAppTaiMore}>
                <ScrollView>
                    {
                        this.state.dataList.length > 0 ? <View style={{backgroundColor:"#FFFFFF"}}>
                            <View style={styles.containerAppTaiMoreChild1}>
                                <View style={styles.containerAppTaiMoreChild12}>
                                    <View>
                                        <Text style={styles.containerAppTaiMoreChild12Text1}>#太极拳#<Text style={{color:"#3A3A3A",fontSize:14}}>广东惠州举行全民首届太 极运动大会吸引众多太极拳......
                                        </Text></Text>
                                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                            <Text style={styles.containerAppTaiMoreChild12Text2}>2019/11/06</Text>
                                            <Text style={styles.containerAppTaiMoreChild12Text2}>10.1万阅读.1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <Image style={{width:110,height:75}} source={require('./Images/bj.png')} />
                                </View>
                            </View>
                        </View> : <BlankPages width={width} height={height} justify={'center'} align={'center'} />
                    }
                    {/*<View style={{backgroundColor:"#FFFFFF"}}>*/}
                    {/*    <View style={styles.containerAppTaiMoreChild1}>*/}
                    {/*        <View style={styles.containerAppTaiMoreChild12Z}>*/}
                    {/*            <View>*/}
                    {/*                <Text style={styles.containerAppTaiMoreChild12Text1}>#太极拳#<Text style={{color:"#3A3A3A",fontSize:14}}>广东惠州举行全民首届太 极运动大会吸引众多太极拳......*/}
                    {/*                </Text></Text>*/}
                    {/*            </View>*/}
                    {/*            <View style={styles.containerAppTaiMoreChild12ZCon}>*/}
                    {/*                <Text style={styles.containerAppTaiMoreChild12Text2}>2019/11/06</Text>*/}
                    {/*                <Text style={styles.containerAppTaiMoreChild12Text2}>10.1万阅读.1200评论</Text>*/}
                    {/*            </View>*/}
                    {/*        </View>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                </ScrollView>
            </View>
        );
    }
    // 通知消息
    GotoCreate = () => {
        console.log("跳转创建团");
    }
    getList = (userId,page,length) => {
        let url = JFAPI.myreleaseList;
        let formData = new FormData();
        formData.append('userId',userId);
        formData.append('page',page);
        formData.append('length',length);
        let opts = {
            body:formData,
            method:"POST"
        }
        fetch(url,opts)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                cosnole.log(err);
            })
    }
    // 请求页面接口
    componentDidMount() {
        // 注册自定义导航右侧点击事件
        this.props.navigation.setParams({
            gotoHTgroup: this.GotoCreate
        })
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result)
                })
                this.getList(this.state.userInfo.id,1,10);
            }).catch(error => {
            console.log("读取失败");
        })
    }

}

const styles = StyleSheet.create({
    containerAppTaiMore: {
        flex: 1,
        backgroundColor: "#F3F3F3"
    },
    naviGateSty:{
        color:"#FFFFFF",
        paddingRight:20
    },
    containerAppTaiMoreChild1:{
        borderBottomWidth:1,
        borderBottomColor:"#DDDDDD",
        width:"94%",
        marginLeft:'3%',
        flexDirection:"row",
        paddingTop:17,
        paddingBottom:13,
        justifyContent:"space-between"
    },
    containerAppTaiMoreChild12:{
        paddingLeft:10,
        width:"65%"
    },
    containerAppTaiMoreChild12Z:{
        paddingLeft:10,
        width:"100%"
    },
    containerAppTaiMoreChild12Text1:{
        color:"#B06F42",
        fontSize:14
    },
    containerAppTaiMoreChild12Text2:{
        color:"#B2B2B2",
        fontSize:12,
        paddingTop: 18
    },
    containerAppTaiMoreChild12Text3:{
        color:"#767676",
        fontSize:13
    },
    containerAppTaiMoreChild12ZCon:{
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems:"center"
    }
});
