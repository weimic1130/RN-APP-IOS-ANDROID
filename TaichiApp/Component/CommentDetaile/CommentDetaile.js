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
    Alert,
    ScrollView,
    Animated, KeyboardAvoidingView
} from "react-native";
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view'
import { JFAPI } from './API/API';
import HTMLView from 'react-native-htmlview';
import AsyncStorage from "@react-native-community/async-storage";
let {width, height} = Dimensions.get('window');
import Loading from '../LoadingAnimation/LoadingAnimation';
import global from '../global';

export default class CommentDetaile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postDetails:'',
            userInfo:'',
            comment:'',
            plList:'',
            loadingState:false
        }
    }

    static navigationOptions = {
        headerTitle: '评论详情',
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    };

    render() {
        return (
            <View style={styles.containerAppPostDetails}>
                {/*<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={0}>*/}
                <ScrollView style={{flex:1}}>
                        <View style={styles.culturalcon}>
                            {
                                this.state.postDetails ? <View style={{backgroundColor: "#FFFFFF"}}>
                                    <View style={styles.containerAppTaiMoreChild1}>
                                        <View>
                                            <Image style={{width: 45, height: 45, borderRadius: 22}} source={require('./Images/tx.jpg')}/>
                                        </View>
                                        <View style={styles.containerAppTaiMoreChild12}>
                                            <View>
                                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                                    <Text style={styles.containerAppTaiMoreChild12Text1}>{this.state.postDetails.name}</Text>
                                                    {
                                                        this.state.postDetails.laberName ? <View style={styles.containerAppTaiMoreChild13}>
                                                            <Text style={styles.containerAppTaiMoreChild13Text}>{this.state.postDetails.laberName}</Text>
                                                        </View> : null
                                                    }
                                                </View>
                                                <Text style={styles.containerAppTaiMoreChild12Text2}>{this.state.postDetails.createTime}</Text>
                                                <View style={{position:"absolute",right:20,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                                                    <Text style={styles.diansas}>{this.state.postDetails.clickNum}</Text>
                                                    {
                                                        this.state.postDetails.clickStatus == 0 ? <Image source={require('./Images/dianzan.png')} /> : <Image source={require('./Images/dianzan2.png')} />
                                                    }
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    {
                                        this.state.postDetails.content ? <View style={{width:"96%",marginLeft:"2%",marginBottom:10}}>
                                            <Text>{this.state.postDetails.content}</Text>
                                        </View>: null
                                    }
                                        {
                                            this.state.postDetails.imgList.length > 0 ? this.state.postDetails.imgList.map((item,index) => {
                                                return (
                                                    <Image key={index} style={{width:"96%", marginLeft:"2%", marginBottom:10, height:200}} source={{uri:global.PicUrl + item}} />
                                                )
                                            })  : null
                                        }
                                    {/*<HTMLView style={styles.containerAppTaiMoreChild2} value={this.state.postDetails.content}/>*/}
                                </View> : null
                            }
                            {
                                this.state.plList.length > 0 ? <View style={styles.lineStyZdy}></View> : null
                            }
                            {
                                this.state.plList.length > 0 ? this.state.plList.map((item,index) => {
                                    return(
                                        <View key={index} style={{justifyContent:"center",alignItems:"center"}}>
                                            <View style={styles.pyquyuscon}>
                                                <View style={styles.pyquyuscon1}>
                                                    {
                                                        item.headUrl ? <Image style={styles.headerImgSize} source={{uri:global.PicUrl + item.headUrl}} /> : <Image style={styles.headerImgSize} source={require('./Images/tx.jpg')} />
                                                    }
                                                </View>
                                                <View style={styles.pyquyuscon2}>
                                                    <View style={styles.pyquyuscon21}>
                                                        <View style={styles.pyquyuscon211}>
                                                            <Text style={styles.yhniche}>{item.nickname}</Text>
                                                            <Text style={styles.yhnitime}>{this.timestampChangeData(item.createTime)}</Text>
                                                        </View>
                                                        {/*<View style={styles.pyquyuscon212}>*/}
                                                        {/*    <Text style={styles.diansas}>128</Text>*/}
                                                        {/*    <Image source={require('./Images/2.png')} />*/}
                                                        {/*</View>*/}
                                                    </View>
                                                    <View style={{width:'96%',marginTop:13}}>
                                                        <Text style={styles.descconText}>{item.comment}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }) : null
                            }
                        </View>
                    </ScrollView>
                    {/*底部输入框*/}
                    <View style={styles.box}>
                        <TextInput onChangeText={(text) => this.setState({comment:text})} value={this.state.comment} ref="input" style={styles.input} placeholderTextColor='#999999' placeholder={'评论内容'} underlineColorAndroid="transparent" />
                        <TouchableWithoutFeedback onPress={() => this.saveComment()}>
                            <Image style={styles.fasImgurl} source={require('./Images/6.png')} />
                        </TouchableWithoutFeedback>
                    </View>
                {/*</KeyboardAvoidingView>*/}
                <Loading show={this.state.loadingState}/>
            </View>
        );
    }
    add0 = number => number < 10 ? `0${number}` : number;
    timestampChangeData = (da) => {
        const times = new Date(da);
        const year = times.getFullYear();
        const month = times.getMonth() + 1;
        const day = times.getDate();
        const hour = times.getHours();
        const minutes = times.getMinutes();
        const seconds = times.getSeconds();
        return `${year}-${this.add0(month)}-${this.add0(day)} ${this.add0(hour)
            }:${this.add0(minutes)}:${this.add0(seconds)}`;
    };
    // 评论
    saveComment = () => {
        let url = JFAPI.savecomment;
        let formData = new FormData();
        let userId = this.state.userInfo.id;
        let targetId = this.state.postDetails.id;
        let comment = this.state.comment;
        if(comment == ''){
            Alert.alert('请输入要评论的内容');
            return;
        }
        this.setState({
            loadingState:true
        })
        formData.append('userId',userId);
        formData.append('targetId',targetId);
        formData.append('comment',comment);
        formData.append('type',10);
        let opts = {
            body:formData,
            method:"POST"
        }
        fetch(url,opts)
            .then((response) => response.json())
            .then((res) => {
                this.setState({
                    comment:'',
                    loadingState:false
                })
                this.refs.input.blur();
                console.log(res);
                if(res.code == 0){
                    this.getList(this.state.postDetails.id,10);
                }else{
                    this.getList(this.state.postDetails.id,10);
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    comment:'',
                    loadingState:false
                })
                this.getList(this.state.postDetails.id,10);
            })
    }
    componentDidMount() {
        console.log('详情',this.props.navigation.state.params.data);
        if(this.props.navigation.state.params.data){
            AsyncStorage.getItem('userInfo')
                .then(result => {
                    this.setState({
                        userInfo: JSON.parse(result)
                    })
                    this.getpostDetales(this.props.navigation.state.params.data.id,this.state.userInfo.id)
                }).catch(error => {
                console.log("读取失败");
            })
        }
    }
    // 帖子详情
    getpostDetales = (forumId,userId) => {
        let url = JFAPI.getInfo;
        let formData = new FormData();
        formData.append('forumId',forumId);
        formData.append('userId',userId);
        let opts = {
            body:formData,
            method:"POST"
        };
        console.log(url);
        console.log(opts);
        fetch(url,opts)
            .then((response) => response.json())
            .then((res) => {
                if(res.code == 0){
                    if(res.data){
                        this.setState({
                            postDetails:res.data
                        })
                        this.getList(res.data.id,10);
                    }
                }else{
                    this.setState({
                        postDetails:''
                    })
                }
                console.log('帖子详情',res);
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    postDetails:''
                })
            })
    }
    getList = (goodsId,type) => {
        let url = JFAPI.getList;
        let formData = new FormData();
        formData.append('targetId',goodsId);
        formData.append('type',type);
        let opts = {
            body:formData,
            method:"POST"
        };
        fetch(url,opts)
            .then((response) => response.json())
            .then((res) => {
                if(res.code == 0){
                    if(res.data.length > 0){
                        this.setState({
                            plList:res.data
                        })
                    }else{
                        this.setState({
                            plList:''
                        })
                    }
                }
                console.log('评论列表',res)
            })
            .catch((err) => {
                this.setState({
                    plList:''
                })
                console.log(err);
            })
    }
}

const styles = StyleSheet.create({
    containerAppPostDetails: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F7F7F7"
    },
    tabBarUnderline: {
        backgroundColor: '#FFFFFF',
        height: 1,
    },
    culturalcon: {
        width: width,
        backgroundColor: "#FFFFFF",
        paddingTop: 10,
        paddingBottom: 10
    },
    Ttquyu: {
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        width: width * 0.96,
        marginLeft: width * 0.02
    },
    tttitle: {
        color: "#3A3A3A",
        fontSize: 14,
        fontWeight: 'bold'
    },
    ttdesc: {
        color: "#A8A8A8",
        fontSize: 12
    },
    containerAppTaiMoreChild1: {
        width: "94%",
        marginLeft: '3%',
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10
    },
    containerAppTaiMoreChild2: {
        paddingBottom: 10,
        width: "94%",
        marginLeft: '3%'
    },
    containerAppTaiMoreChild12: {
        width: "87%",
        paddingLeft: 10,
        justifyContent: "space-around"
    },
    containerAppTaiMoreChild12Text1: {
        color: "#282828",
        fontSize: 14
    },
    containerAppTaiMoreChild12Text2: {
        color: "#B2B2B2",
        fontSize: 12,
        paddingTop: 5
    },
    containerAppTaiMoreChild12Text3: {
        color: "#767676",
        fontSize: 13
    },
    containerAppTaiMoreChild13Text: {
        color: "#B06F42",
        fontSize: 10
    },
    containerAppTaiMoreChild13: {
        backgroundColor: "#FFFFFF",
        borderWidth:1,
        borderColor:"#B06F42",
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 8,
        marginLeft: 5
    },
    containerAppTaiMoreChild3:{
        flexDirection:"row",
        width: "94%",
        marginLeft: '3%'
    },
    containerAppTaiMoreChild4:{
        flexDirection:"row",
        width: "94%",
        marginLeft: '3%',
        justifyContent:"space-around",
        marginTop:10
    },
    containerAppTaiMoreChild3Img:{
        width:'100%',
        height:175,
        marginTop: 5
    },
    containerAppTaiMoreChild41:{
        alignItems:"center",
        justifyContent:"center"
    },
    containerAppTaiMoreChild41Text:{
        color:"#B2B2B2",
        fontSize:14,
        paddingTop:6
    },
    iconSize:{
        width:51,
        height:51
    },
    iconSize1:{
        width:17,
        height:17
    },
    lineStyZdy:{
        width:width,
        height:8,
        backgroundColor:"#F3F3F3",
        marginTop:10,
        marginBottom:10
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
        justifyContent:"space-between",
        width:"96%"
    },
    pyquyuscon1:{
        marginRight:10
    },
    pyquyuscon2:{
        width:width * 0.82
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
        paddingRight: 8,
        paddingTop:6
    },
    descconText:{
        color:"#282828",
        fontSize:14,
        fontWeight:"bold"
    },
    headerImgSize:{
        width:38,
        height:38,
        borderRadius:19
    },
    lingsTitle:{
        flexDirection:"row",
        width:width * 0.96,
        marginLeft:width * 0.04,
        marginTop:10,
        paddingTop:15,
        alignItems:"center"
    },
    plquyuneods:{
        backgroundColor:"#F3F3F3",
        width:'96%',
        marginTop:13,
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:8,
        paddingRight:8
    },
    box:{
        width: width,
        height: 55,
        backgroundColor: '#FFFFFF',
        // position: 'absolute',
        // left: 0,
        // right: 0,
        // bottom: 0,
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
});
