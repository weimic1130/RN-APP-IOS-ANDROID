/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createStackNavigator, StackActions, NavigationActions, createAppContainer} from "react-navigation";
import {FlatList, TouchableOpacity,ScrollView, Button, Platform, Image, ImageBackground, Dimensions, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from "react-native";
// icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BlankPages from '../BlankPages/BlankPages';
import { JFAPI } from './API/API'

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import global from '../global';
export default class YurantaichiBall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LessonList:''
        }
    }
    static navigationOptions = ({navigation,screenProps}) => ({
        headerTitle: '悠然太极球入门',
        headerBackTitle: "返回",
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
            <View style={styles.containerAppHome}>
                <ScrollView style={{flex: 1}}>
                    <View style={{flexDirection:"row",flexWrap:"wrap"}}>
                        {
                            this.state.LessonList.length > 0 ? this.state.LessonList.map((item,index) => {
                                return (
                                    <TouchableWithoutFeedback key={index} onPress={() => this.gotojichuke(item)}>
                                        <View style={styles.topicItem}>
                                            <Image style={styles.topicImg} source={{uri:global.PicUrl+item.imgList}} />
                                            <View style={styles.topicContainer}>
                                                <View style={styles.topicText}>
                                                    <Text ellipsizeMode='tail' numberOfLines={1} style={styles.topicTitle}>{item.title}</Text>
                                                    <Text style={styles.topicDesc}>{(item.browseNum + item.virViewNum)} 浏览量</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            }):<BlankPages/>
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
    // 课程列表
    getLessonList = () => {
        let formData = new FormData();
        formData.append('params','');
        let LessonListArr = [];
        let url = JFAPI.lessonList;
        let opts = {
            method:'POST',
            body:formData
        };
        fetch(url,opts)
            .then((response) => response.json())
            .then((responseData) => {
                console.log('列表');
                console.log(responseData);
                if(responseData.code == 0){
                    if(responseData.data.length > 0){
                        for(let i = 0; i < responseData.data.length; i++){
                            LessonListArr.push(responseData.data[i])
                        }
                    }
                    this.setState({
                        LessonList:LessonListArr
                    })
                }else{
                    this.setState({
                        LessonList:''
                    })
                }
            })
    }
    gotojichuke = (item) => {
        let parmaeter = {
            data:item,
            title:'课程详情'
        };
        this.props.navigation.navigate('CourseDetaN',parmaeter);
    }
    // 请求页面接口
    componentDidMount() {
        this.getLessonList();
    }

    componentWillMount() {
    }
}
const styles = StyleSheet.create({

    containerAppHome: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
    img: {
        width: width,
        height: 250,
    },
    topNavContaer: {
        width: width,
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 25,
        backgroundColor:"#FFFFFF"
    },
    topNavContaerChild: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#FFFFFF"
    },
    titleTextH: {
        fontSize: 13,
        color: "#282828",
        paddingTop: 10,
        fontWeight: "bold"
    },
    msmj: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: width,
        paddingTop: 18,
        paddingBottom:15,
        backgroundColor:"#FFFFFF"
    },
    msmjKC:{
        flexDirection: "row",
        justifyContent: "space-between",
        width: width,
        paddingTop: 18,
        paddingBottom:5,
        backgroundColor:"#FFFFFF"
    },
    msmjRm:{
        flexDirection: "row",
        justifyContent: "space-between",
        width: width,
        paddingTop:15,
        backgroundColor:"#F7F7F7"
    },
    msmjChild: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 8,
        paddingRight: 8
    },
    msmjChild2: {
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 8,
        paddingRight: 8
    },
    msmjChild2Rm:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"#FFFFFF",
        width:width * 0.3,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:9
    },
    msmjChildL: {
        paddingLeft: 4,
        fontSize: 17,
        fontStyle: 'italic'
    },
    msmjChildR: {
        paddingRight: 4,
        fontSize: 13,
        color: "#B2B2B2"
    },
    msmj2Rm:{
        flexDirection: "row",
        width: width,
        paddingTop: 20,
        paddingBottom:20,
        backgroundColor:"#F7F7F7"
    },
    msmj2: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: width,
        paddingTop: 20,
        paddingBottom:20,
        backgroundColor:"#FFFFFF"
    },
    msmjImg: {
        marginBottom: 10
    },
    msmjNa: {
        color: "#767676",
        fontSize: 14
    },
    scrollViewStyle:{
        flexDirection:'row'
    },
    topic: {
        width: width,
        alignItems:'center',
        backgroundColor: '#fff',
        paddingBottom:10,
        marginBottom:10,
    },
    topicHead:{
        fontSize:16,
        color:'#666',
        padding:15,
    },
    topicItemKc:{
        width:width * 0.46,
        backgroundColor:"#FFFFFF",
        borderWidth:1,
        borderColor: "#DDDDDD",
        marginTop:10,
        marginLeft:10
    },
    topicItem: {
        width: width*0.45,
        marginLeft:width * 0.025,
        marginRight:width * 0.025,
        borderWidth:1,
        borderColor:"#D2D2D2",
        backgroundColor:"#FFFFFF",
        marginTop:8,
        alignItems:"center"
    },
    topicImg: {
        width:'100%',
        height:90,
        borderColor:'#cdcdcd',
        borderRadius:2,
    },
    topicContainer:{
        flexDirection: 'row',
        justifyContent:'space-between',
        marginTop:4
    },
    topicTitleKc:{
        fontSize:14,
        color:"#282828",
        paddingLeft:7
    },
    topicTitle:{
        fontSize:14,
        color:'#282828',
        paddingRight:5,
        paddingLeft:5
    },
    topicDesc:{
        fontSize:13,
        color:'#B2B2B2',
        marginTop:3,
        paddingRight:5,
        paddingLeft:5
    },
    topicDescKc:{
        fontSize:13,
        color:"#B2B2B2",
        paddingLeft:7,
        paddingTop:5,
        paddingBottom:5
    },
    topicDescKcR:{
        fontSize:13,
        color:"#FF7E00",
        paddingRight:7,
        paddingTop:5,
        paddingBottom:5
    },
    topicText:{
        width:"100%",
        height:50,
        justifyContent:"space-around"
    },
    Ttquyu:{
        flexDirection:'row',
        justifyContent:"space-around",
        paddingBottom:10,
        paddingTop:10,
        backgroundColor:"#FFFFFF",
        borderBottomWidth:1,
        borderBottomColor:"#EAEAEA",
        width:width * 0.96,
        marginLeft:width * 0.04
    },
    tttitle:{
        color:"#3A3A3A",
        fontSize:14,
        fontWeight:'bold'
    },
    ttdesc:{
        color:"#A8A8A8",
        fontSize:12
    },
    btmcon: {
        height:70,
        width: width,
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#dddddd",
        overflow: "hidden",
        backgroundColor: "#ffffff"
    },
    btmconleft: {
        justifyContent: "center",
        alignItems: "center",
        width: width * 0.25
    },
    btmconright: {
        justifyContent: "center",
        alignItems: "center",
        width: width * 0.25
    },
    Indexicon: {
        width: 28,
        height: 28
    },
    IndexText: {
        fontSize: 12,
        paddingTop: 5,
        color: '#f56140'
    },
    NoIndexText:{
        fontSize:12,
        paddingTop:5,
        color:"#282828"
    },
    IndexTextNo: {
        fontSize: 12,
        paddingTop: 5,
        color: '#282828'
    }
});
