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
    Alert,
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
import AsyncStorage from '@react-native-community/async-storage';
let {width, height} = Dimensions.get('window');
import BlankPages from '../BlankPages/BlankPages';
import global from '../global';
let self = this;
export default class MyHTaichiGroupIos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo:'',
            groupList:''
        }
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: '我的太极团',
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        headerRight: (
            <TouchableWithoutFeedback onPress={() => navigation.state.params.gotoHTgroup(self)}>
                <Text style={styles.naviGateSty}>创建团</Text>
            </TouchableWithoutFeedback>
        )
    })

    render() {
        return (
            <View style={styles.containerAppTaiMore}>
                <ScrollView>
                    <View style={{backgroundColor:"#FFFFFF",marginTop:7}}>
                        {
                            this.state.groupList.length > 0 ? this.state.groupList.map((item,index) => {
                                return(
                                    <TouchableWithoutFeedback key={index} onPress={() => this.gotoEditGroup(item)}>
                                        <View style={styles.containerAppTaiMoreChild1}>
                                            {/*img*/}
                                            {
                                                item.img ? <View>
                                                    <Image style={{width:45,height:45,borderRadius:22}} source={{uri:global.PicUrl + item.img}} />
                                                </View> : <View>
                                                    <Image style={{width:45,height:45,borderRadius:22}} source={require('./Images/bj.png')} />
                                                </View>
                                            }
                                            <View style={styles.containerAppTaiMoreChild12}>
                                                <View>
                                                    <Text style={styles.containerAppTaiMoreChild12Text1}>{item.title}<Text style={{color:"#B2B2B2",fontSize:14}}>（{item.num}人）</Text></Text>
                                                    <Text style={styles.containerAppTaiMoreChild12Text2}>{item.intro}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            }) : <BlankPages width={width} height={height} justify={'center'} align={'center'} />
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
    // 创建团
    GotoCreate = () => {
        let self = this;
        this.props.navigation.navigate('CreateTcGroupN',{
            arefresh:function(){
                self.getGrouplist(self.state.userInfo.id,1,10);
            }
        });
        console.log("跳转创建团");
    }
    // 修改团
    gotoEditGroup = (item) => {
        let self = this;
        this.props.navigation.navigate('CreateTcGroupN',{
            data:item,
            arefresh:function(){
                self.getGrouplist(self.state.userInfo.id,1,10);
            }
        });
    }
    getGrouplist = (userId,page,length) => {
        let url = JFAPI.groupList;
        let formData = new FormData();
        formData.append('userId',userId);
        formData.append('page',page);
        formData.append('length',length);
        let opts = {
            body:formData,
            method:"POST"
        };
        fetch(url,opts)
            .then((response) => response.json())
            .then((res) => {
                console.log('刷新',res);
                if(res.code == 0){
                    if(res.data.length > 0){
                        this.setState({
                            groupList:res.data
                        })
                    }else{
                        this.setState({
                            groupList:''
                        })
                    }
                }else{
                    this.setState({
                        groupList:''
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    groupList:''
                })
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
                console.log(JSON.parse(result));
                this.setState({
                    userInfo:JSON.parse(result)
                })
                this.getGrouplist(this.state.userInfo.id,1,10);
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
        paddingBottom:17
    },
    containerAppTaiMoreChild12:{
        width:"87%",
        paddingLeft:10,
        justifyContent: "space-around"
    },
    containerAppTaiMoreChild12Text1:{
        color:"#B06F42",
        fontSize:14
    },
    containerAppTaiMoreChild12Text2:{
        color:"#B2B2B2",
        fontSize:12,
        paddingTop: 8
    },
    containerAppTaiMoreChild12Text3:{
        color:"#767676",
        fontSize:13
    }
});
