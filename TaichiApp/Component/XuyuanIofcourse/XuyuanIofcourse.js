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
import AsyncStorage from "@react-native-community/async-storage";
import { JFAPI } from './API/API';
let {width, height} = Dimensions.get('window');
import BlankPages from '../BlankPages/BlankPages';
import global from '../global';
export default class XuyuanIofcourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo:'',
            CourseList:'',
            activeInex: 1
        }
    }
    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: '我的课程',
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
            <View style={styles.containerAppCDeta}>
                <ScrollView style={{flex:1,width:"100%"}}>
                    <View style={styles.allconCour}>
                        <View style={styles.allconCour}>
                            {
                                this.state.CourseList.length > 0 ? this.state.CourseList.map((item,index) => {
                                    return(
                                        <View key={index} style={styles.allconCourChild3}>
                                            {
                                                item.imgList ? <Image style={{width:120,height:75}} source={{uri:global.PicUrl+item.imgList[0]}} /> : <Image style={{width:120,height:75}} source={require('./Images/bj.png')} />
                                            }
                                            <View style={styles.allconCourChild31}>
                                                <View>
                                                    <Text style={styles.allconCourChildText1}>{item.title}</Text>
                                                    <Text style={styles.allconCourChildText112}>剩余课时:{item.lessonNum}</Text>
                                                </View>
                                                <View style={styles.allconCourChild312}>
                                                    <Text style={styles.allconCourChildText3}>{item.num}人学习</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }) : <BlankPages width={width} height={height} justify={'center'} align={'center'} />
                            }
                            {/*<View style={styles.allconCourChild3}>*/}
                            {/*    <Image style={{width:120,height:75}} source={require('./Images/bj.png')} />*/}
                            {/*    <View style={styles.allconCourChild31}>*/}
                            {/*        <View>*/}
                            {/*            <Text style={styles.allconCourChildText1}>悠然太极球一式</Text>*/}
                            {/*            <Text style={styles.allconCourChildText112}>剩余课时:20</Text>*/}
                            {/*        </View>*/}
                            {/*        <View style={styles.allconCourChild312}>*/}
                            {/*            <Text style={styles.allconCourChildText3}>312500 学习</Text>*/}
                            {/*            <Text style={styles.allconCourChildText4}>￥<Text style={styles.allconCourChildText5}>416</Text></Text>*/}
                            {/*        </View>*/}
                            {/*    </View>*/}
                            {/*</View>*/}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
    // BlankPages
    // 获取课程列表
    getCourseList = (userId) => {
        let url = JFAPI.getXyList;
        let formData = new FormData();
        formData.append('userId',userId);
        let opts = {
            body:formData,
            method:"POST"
        }
        console.log(url);
        console.log(opts);
        fetch(url,opts)
            .then((response) => response.json())
            .then((res) => {
                if(res.code == 0){
                    if(res.data.length > 0){
                        this.setState({
                            CourseList:res.data
                        })
                    }else{
                        this.setState({
                            CourseList:''
                        })
                    }
                }
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    CourseList:''
                })
            })
    }
    componentDidMount() {
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result)
                })
                this.getCourseList(this.state.userInfo.id);
            }).catch(error => {
            console.log("读取失败");
        })
    }

}

const styles = StyleSheet.create({
    linstye: {
        width: width,
        height: 8,
        backgroundColor: "#F3F3F3"
    },
    containerAppCDeta: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F7F7F7"
    },
    AppCDetaChild: {
        width: width * 0.9,
        paddingTop: 10
    },
    allconCourChidl: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 12,
        borderBottomColor: "#EAEAEA",
        borderBottomWidth: 1,
        paddingBottom:10
    },
    childText1: {
        color: "#282828",
        fontSize: 16,
        fontWeight: "bold"
    },
    allconCour: {
        width: width,
        backgroundColor: "#FFFFFF",
        alignItems: "center"
    },
    AppCDetaChild1: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 15
    },
    AppCDetaChild11: {
        alignItems: "center"
    },
    AppCDetaChild11Text: {
        color: "#757575",
        fontSize: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    allconCourChidlText: {
        color: "#B2B2B2",
        fontSize: 15,
        fontWeight: "bold",
        paddingBottom: 5
    },
    allconCourChidlTextActive: {
        fontWeight: "bold",
        color: "#8A6246",
        fontSize: 15,
        // borderBottomWidth: 3,
        // borderBottomColor: "#8A6246",
        paddingBottom: 5
    },
    allconCourChidlTextActiveText:{
        fontWeight: "bold",
        color: "#8A6246",
        fontSize: 15,
        paddingBottom: 5
    },
    allconCourChild2:{
        width:width * 0.9,
        marginTop: 15
    },
    allconCourChild2Text:{
        color:"#3A3A3A",
        fontSize:14,
        fontWeight:"bold",
        marginBottom:10
    },
    allconCourChild3:{
        width:width * 0.9,
        marginTop: 15,
        flexDirection:"row",
        paddingBottom:10,
        borderBottomWidth:1,
        borderBottomColor:"#EAEAEA"
    },
    allconCourChild31:{
        justifyContent:"space-between",
        paddingLeft:8
    },
    allconCourChildText1:{
        fontSize:14,
        color:"#282828",
        fontWeight:"bold"
    },
    allconCourChildText2:{
        color:"#767676",
        fontSize:13,
        paddingTop:5
    },
    allconCourChildText3:{
        color:"#B2B2B2",
        fontSize:13
    },
    box:{
        width: width,
        height: 55,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor:"#DDDDDD",
        shadowOpacity:0.5,
        shadowRadius:2
    },
    input: {
        height: 40,
        width: '80%',
        fontSize: 15,
        color: '#333333',
        backgroundColor: '#F3F3F3',
        paddingVertical: 0,
        paddingLeft:5
    },
    fasImgurl:{
        marginLeft:10
    },
    pyquyuscon:{
        flexDirection:"row",
        width:width * 0.9,
        marginTop:10,
        paddingTop:15,
        borderBottomColor:"#EAEAEA",
        borderBottomWidth:1,
        paddingBottom:15
    },
    pyquyuscon21:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    pyquyuscon1:{
        width:width * 0.2,
    },
    pyquyuscon2:{
        width:width * 0.72
    },
    pyquyuscon212:{
        flexDirection:"row",
        paddingRight:10
    },
    yhniche:{
        color:"#757575",
        fontSize:14
    },
    yhnitime:{
        color:"#B2B2B2",
        fontSize:11,
        paddingTop:5
    },
    diansas:{
        color:"#B2B2B2",
        fontSize:13,
        paddingRight: 8
    },
    descconText:{
        color:"#282828",
        fontSize:14,
        fontWeight:"bold"
    },
    widthSty:{
        width:width,
        backgroundColor:"#F3F3F3",
        height:10
    },
    allconCourChildText4:{
        color:"#C22525",
        fontSize:14
    },
    allconCourChildText5:{
        fontSize:23,
        color:"#C22525"
    },
    allconCourChild312:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"65%"
    },
    allconCourChildText112:{
        color:"#B2B2B2",
        fontSize:12,
        paddingTop:5
    }
});
