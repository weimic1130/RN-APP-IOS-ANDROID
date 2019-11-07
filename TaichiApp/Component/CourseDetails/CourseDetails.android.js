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
import { JFAPI } from './API/API';
let {width, height} = Dimensions.get('window');
import HTMLView from 'react-native-htmlview';
import Video from 'react-native-video';
import BlankPages from '../BlankPages/BlankPages';
import global from '../global';
import Orientation from 'react-native-orientation';
export default class CourseDetailsAndroid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 横屏为ture 竖屏为false
            isBool:Orientation.getInitialOrientation() === "PORTRAIT",
            detalsData:"",
            activeInex: 1,
            courseDetails:'',
            VideoImg:'',
            paused:true,
            muted:false,
            playerStatus:1,
            videoWidth:"100%",
            videoHeight:200
        };
    }
    static navigationOptions = ({navigation, screenProps}) => ({
        header:Platform.OS == "android" ? null : undefined,
        headerTitle: navigation.state.params.title,
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
            <View style={styles.containerAppCDeta} onLayout={(event) => this._onLayout(event)}>
                {
                    this.state.isBool  ? <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:width,height:50,backgroundColor:"#333333"}}>
                        <TouchableWithoutFeedback onPress={() => this.returnBack()}>
                            <View style={{paddingLeft:5}}>
                                <Text style={{color:"#FFFFFF",fontSize:16}}>返回</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={{paddingLeft:15,width:width * 0.65}}>
                            <Text style={{color:"#FFFFFF",fontSize:16}}>课程详情</Text>
                        </View>
                    </View> : null
                }
                {
                    this.state.isBool == false ? <View style={{justifyContent:"center",alignItems:"center",width:this.state.videoWidth,height:this.state.videoHeight}}>
                        {
                            this.state.detalsData ? <Video
                                ref = {(ref) => {
                                    this.player = ref;
                                }}
                                style={{width:this.state.videoWidth,height:this.state.videoHeight}}
                                source={{uri:global.PicUrl+this.state.detalsData.videoList[0]}}
                                paused={this.state.paused}
                                muted={this.state.muted}
                            /> : null
                        }
                        <TouchableWithoutFeedback onPress={() => this.VideoFullscreen()}>
                            <View style={styles.screenSty}>
                                <Image style={{width:25,height:25}} source={require('./Images/quanpin.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                        {
                            this.state.paused == true ? <TouchableWithoutFeedback onPress={() => this.VideoPlay()}>
                                <View style={styles.playerSty}>
                                    <Image style={{width:25,height:25}} source={require('./Images/player.png')} />
                                </View>
                            </TouchableWithoutFeedback> : null
                        }
                    </View> :  <View>
                        {
                            this.state.detalsData ? <ScrollView style={{flex:1,width:"100%",marginBottom:50}}>
                                {
                                    this.state.detalsData.imgList ?  <Image style={{width:width,height:200}} source={{uri:global.PicUrl +this.state.detalsData.imgList[0]}}/> : <Image style={{width:width}} source={require('./Images/bj.png')}/>
                                }
                                {/*点赞分享区域*/}
                                <View style={styles.allconCour}>
                                    <View style={styles.AppCDetaChild}>
                                        <Text style={styles.childText1}>{this.state.detalsData.title}</Text>
                                    </View>
                                </View>
                                <View style={styles.linstye}></View>
                                {/*中间导航区域*/}
                                <View style={styles.allconCour}>
                                    <View style={styles.allconCourChidl}>
                                        <TouchableWithoutFeedback onPress={() => this.switchNav(1)}>
                                            <View style={this.state.activeInex == 1 ? styles.allconCourChidlTextActive2 : styles.allconCourChidlText}>
                                                <Text style={styles.allconCourChidlText}>课程详情</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <HTMLView style={styles.goodPriceTitle2} value={this.state.detalsData.intro} />
                                    {
                                        this.state.detalsData.videoList ? <View style={styles.medioSty}>
                                            <TouchableWithoutFeedback onPress={() => this.VideoPlay()}>
                                                <View style={styles.allconCourChidl}>
                                                    <Video
                                                        ref = {(ref) => {
                                                            this.player = ref;
                                                        }}
                                                        style={{width:"100%",height:200}}
                                                        source={{uri:global.PicUrl+this.state.detalsData.videoList[0]}}
                                                        paused={this.state.paused}
                                                        muted={this.state.muted}
                                                    />
                                                </View>
                                            </TouchableWithoutFeedback>
                                            {/*全屏*/}
                                            <TouchableWithoutFeedback onPress={() => this.VideoFullscreen()}>
                                                <View style={styles.screenSty}>
                                                    <Image style={{width:25,height:25}} source={require('./Images/quanpin.png')} />
                                                </View>
                                            </TouchableWithoutFeedback>
                                            {/*播放*/}
                                            {
                                                this.state.paused == true ? <TouchableWithoutFeedback onPress={() => this.VideoPlay()}>
                                                    <View style={styles.playerSty}>
                                                        <Image style={{width:25,height:25}} source={require('./Images/player.png')} />
                                                    </View>
                                                </TouchableWithoutFeedback> : null
                                            }
                                        </View> : null
                                    }
                                </View>
                            </ScrollView> : <BlankPages align={'center'} justify={'center'} width={width} height={height} />
                        }
                        {/*底部输入框*/}
                        {
                            this.state.activeInex == 3 ? <View style={styles.box}>
                                <TextInput ref="input" style={styles.input} placeholderTextColor='#999999' placeholder={'评论内容'} underlineColorAndroid="transparent" />
                                <Image style={styles.fasImgurl} source={require('./Images/6.png')} />
                            </View> : null
                        }
                    </View>
                }
            </View>
        );
    }
    _onLayout = (event) => {
        let self = this;
        let {width,height} = event.nativeEvent.layout;
        let isLandscape = (width > height);
        let { isBool } = this.state;
        console.log(self.props.navigation.state.params.header);
        if(isLandscape){
            this.setState({
                isBool:false,
                videoWidth: width,
                videoHeight: width * 9 / 16
            })
            // this.props.navigation.setParams({title:null})
        }else{
            this.setState({
                isBool:true,
                videoWidth: width,
                videoHeight: height
            })
            console.log('竖屏');
        }
    }
    returnBack = () => {
        if(!this.state.isBool){
            // 横屏时并且页面卸载时还原为竖屏
            Orientation.lockToPortrait()
        }
        this.props.navigation.goBack();
    }
    // 课程详情区域切换
    switchNav(num) {
        let self = this;
        self.setState({
            activeInex: num
        })
    }
    VideoFullscreen = () => {
        let type = Platform.OS;
        if(type == 'android'){
            const { isBool } = this.state;
            if(isBool){
                this.setState({
                    isBool:false,
                })
                // 切换横屏
                Orientation.lockToLandscape();
            }else{
                this.setState({
                    isBool:true,
                })
                // 还原为竖屏
                Orientation.lockToPortrait()
            }
            console.log(this.state.isBool);
        }else{
            this.player.presentFullscreenPlayer()
        }
    }
    VideoPlay = () => {
        if(this.state.paused == true){
            this.setState({
                paused:false
            })
        }else{
            this.setState({
                paused:true
            })
        }
    }
    // 课程详情
    getetBasicLissonInfo = (id) =>{
        let url = JFAPI.etBasicLissonInfo;
        let formData = new FormData();
        formData.append('id',id);
        let opts = {
            body:formData,
            method:"POST"
        };
        fetch(url,opts)
            .then((response) => response.json())
            .then((res) => {
                if(res.code == 0){
                    if(res.data){
                        this.setState({
                            detalsData:res.data
                        })
                    }
                }else{
                    this.setState({
                        detalsData:''
                    })
                }
                console.log(res);
            })
            .catch((err) => {
                this.setState({
                    detalsData:''
                })
                console.log(err);
            })
    }
    componentDidMount() {
        console.log(this.state.isBool);
        if(this.props.navigation.state.params.data){
            this.setState({
                courseDetails:this.props.navigation.state.params.data
            })
            this.getetBasicLissonInfo(this.props.navigation.state.params.data.id)
        }
    }
    componentWillUnmount(){
        if(!this.state.isBool){
            // 横屏时并且页面卸载时还原为竖屏
            Orientation.lockToPortrait()
        }
    }
}

const styles = StyleSheet.create({
    playerSty:{
        position:"absolute"
    },
    medioSty:{
        alignItems:"center",
        justifyContent:"center"
    },
    screenSty:{
        position:"absolute",
        right:Platform.OS == 'android' ? 10 : 15,
        bottom: Platform.OS == 'android' ? 25 : 20
    },
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
        paddingTop: 10,
        paddingBottom:10
    },
    allconCourChidl: {
        width: width * 0.9,
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 12,
        borderBottomColor: "#EAEAEA",
        borderBottomWidth: 1,
        paddingBottom:10
    },
    allconCourChidlVideo:{
        width: width * 0.9,
        height:210,
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
        fontWeight: "bold"
    },
    allconCourChidlTextActive: {
        fontWeight: "bold",
        color: "#8A6246",
        fontSize: 15,
        borderBottomWidth: 3,
        borderBottomColor: "#8A6246",
        paddingBottom: 5
    },
    allconCourChidlTextActive2:{
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
        fontSize:13
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
    goodPriceTitle2: {
        width: "94%",
        marginLeft: "3%",
        marginBottom: 15,
        paddingTop:15
    }
});
