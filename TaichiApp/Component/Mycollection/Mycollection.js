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
    Animated, Modal
} from "react-native";
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view'
import Video from 'react-native-video';
let {width, height} = Dimensions.get('window');
let codeTime = 60;
export default class Mycollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label:['帖子','咨询','音乐','视频'],
            modalVisible:false,
            // true 暂停 false 播放
            playState:true
        }
    }

    static navigationOptions = {
        headerTitle: '我的收藏',
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
            <View style={styles.containerAppTaichi}>
                <ScrollableTabView
                    initialPage={0}
                    renderTabBar={() => <DefaultTabBar/>}
                    tabBarBackgroundColor='#fff'
                    tabBarActiveTextColor='#8A6246'
                    tabBarInactiveTextColor='#333'
                    tabBarUnderlineStyle={styles.tabBarUnderline}
                    tabBarTextStyle={{fontSize:16}}
                >
                    <View tabLabel='帖子'>
                        <View style={styles.culturalcon}>
                            <View sytle={{backgroundColor:"#FFFFFF"}}>
                                <View style={styles.Ttquyu}>
                                    <View style={{width:width * 0.3}}>
                                        <Image style={{width:110,height:75}} source={require('./Images/rumen.png')} />
                                    </View>
                                    <View style={{paddingLeft:5,width:width * 0.6,justifyContent:"space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width:width * 0.3}}>
                                        <Image style={{width:110,height:75}} source={require('./Images/rumen.png')} />
                                    </View>
                                    <View style={{paddingLeft:5,width:width * 0.6,justifyContent:"space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width:width * 0.3}}>
                                        <Image style={{width:110,height:75}} source={require('./Images/rumen.png')} />
                                    </View>
                                    <View style={{paddingLeft:5,width:width * 0.6,justifyContent:"space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View tabLabel='咨询'>
                        <View style={styles.culturalcon}>
                            <View sytle={{backgroundColor:"#FFFFFF"}}>
                                <View style={styles.Ttquyu}>
                                    <View style={{width:width * 0.3}}>
                                        <Image style={{width:110,height:75}} source={require('./Images/rumen.png')} />
                                    </View>
                                    <View style={{paddingLeft:5,width:width * 0.6,justifyContent:"space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width:width * 0.3}}>
                                        <Image style={{width:110,height:75}} source={require('./Images/rumen.png')} />
                                    </View>
                                    <View style={{paddingLeft:5,width:width * 0.6,justifyContent:"space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width:width * 0.3}}>
                                        <Image style={{width:110,height:75}} source={require('./Images/rumen.png')} />
                                    </View>
                                    <View style={{paddingLeft:5,width:width * 0.6,justifyContent:"space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width:width * 0.3}}>
                                        <Image style={{width:110,height:75}} source={require('./Images/rumen.png')} />
                                    </View>
                                    <View style={{paddingLeft:5,width:width * 0.6,justifyContent:"space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width:width * 0.3}}>
                                        <Image style={{width:110,height:75}} source={require('./Images/rumen.png')} />
                                    </View>
                                    <View style={{paddingLeft:5,width:width * 0.6,justifyContent:"space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width:width * 0.3}}>
                                        <Image style={{width:110,height:75}} source={require('./Images/rumen.png')} />
                                    </View>
                                    <View style={{paddingLeft:5,width:width * 0.6,justifyContent:"space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width:width * 0.3}}>
                                        <Image style={{width:110,height:75}} source={require('./Images/rumen.png')} />
                                    </View>
                                    <View style={{paddingLeft:5,width:width * 0.6,justifyContent:"space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View tabLabel='音乐'>
                        <ScrollView>
                            {/*歌曲列表*/}
                            <View style={styles.culturalconMusic}>
                                <View style={{backgroundColor:"#FFFFFF"}}>
                                    <View style={styles.culturalconChild}>
                                        <View>
                                            <Text style={styles.text1}>《沙漠骆驼》</Text>
                                            <Text style={styles.text2}>播放量:3172 · 播放时长:3:25</Text>
                                        </View>
                                        <View>
                                            <TouchableWithoutFeedback onPress={() => this.setState({modalVisible: true})}>
                                                <Image source={require('./Images/gengduo.png')}/>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                </View>
                                <View style={{backgroundColor:"#FFFFFF"}}>
                                    <View style={styles.culturalconChild}>
                                        <View>
                                            <Text style={styles.text1}>《沙漠骆驼》</Text>
                                            <Text style={styles.text2}>播放量:3172 · 播放时长:3:25</Text>
                                        </View>
                                        <View>
                                            <TouchableWithoutFeedback onPress={() => this.setState({modalVisible: true})}>
                                                <Image source={require('./Images/gengduo.png')}/>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                        {/*播放歌曲*/}
                        <View style={styles.getuStyMyec}>
                            <View style={styles.modalStyChildTlist}>
                                <View style={{flexDirection: "row"}}>
                                    <View style={styles.modalStyChildT1}>
                                        <Image style={styles.getupian} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={styles.modalStyChildT2}>
                                        <Text style={styles.gequname}>歌曲的名字</Text>
                                        <Text style={styles.gequtime}>16:31</Text>
                                        {/*<Video source={require('./MP3/trhxn.mp3')} paused={this.state.playState} repeat={true}/>*/}
                                    </View>
                                </View>
                                <View style={styles.RighCotinaer}>
                                    {/*暂停*/}
                                    <TouchableWithoutFeedback onPress={ () => this.suspendMusic()}>
                                        <Image source={require('./Images/zanting.png')}/>
                                    </TouchableWithoutFeedback>
                                    {/*播放*/}
                                    <TouchableWithoutFeedback onPress={ () => this.playMusic()}>
                                        <Image source={require('./Images/bofang.png')}/>
                                    </TouchableWithoutFeedback>
                                    <Image source={require('./Images/tanchu.png')}/>
                                </View>
                            </View>
                        </View>
                        <Modal animationType="slide" transparent={true} visible={this.state.modalVisible} onRequestClose={() => {
                            this.onRequestClose();
                        }}>
                            <TouchableOpacity style={styles.modalStyAll} activeOpacity={1} onPress={() => this.setState({modalVisible:false})}>
                                <View style={styles.modalSty}>
                                    <View style={styles.modalStyChildT}>
                                        <View style={styles.modalStyChildT1}>
                                            <Image style={styles.getupian} source={require('./Images/rumen.png')}/>
                                        </View>
                                        <View style={styles.modalStyChildT2}>
                                            <Text style={styles.gequname}>歌曲的名字</Text>
                                            <Text style={styles.gequtime}>16:31</Text>
                                        </View>
                                        <TouchableWithoutFeedback onPress={() => this.setState({modalVisible: false})}>
                                            <Image style={{position: "absolute", right: 15, top: 15}} source={require('./Images/shanchu.png')}/>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <View style={styles.modalStyChildTT}>
                                        <View style={styles.modalStyChildTT1}>
                                            <Image source={require('./Images/xingxing.png')}/>
                                            <Text style={styles.scggq}>收藏的歌曲</Text>
                                        </View>
                                        <View style={styles.modalStyChildTT1}>
                                            <Image source={require('./Images/fenxiang.png')}/>
                                            <Text style={styles.fxggq}>分享该歌曲</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Modal>
                        {
                            this.state.modalVisible ? <View style={styles.DemoBack}></View> : null
                        }
                    </View>
                    <View style={{flex:1}} tabLabel='视频'>
                        <ScrollView style={{flex:1}}>
                            <View style={{flexDirection:"row",flexWrap:"wrap"}}>
                                <View style={styles.topicItem}>
                                    <Image style={styles.topicImg} source={require('./Images/rumen.png')} />
                                    <View style={styles.topicContainer}>
                                        <View style={styles.topicText}>
                                            <Text style={styles.topicTitle}>太极拳一式</Text>
                                            <Text style={styles.topicDesc}>3246 预览 ·578收藏</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.topicItem}>
                                    <Image style={styles.topicImg} source={require('./Images/rumen.png')} />
                                    <View style={styles.topicContainer}>
                                        <View style={styles.topicText}>
                                            <Text style={styles.topicTitle}>太极拳一式</Text>
                                            <Text style={styles.topicDesc}>3246 预览 ·578收藏</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.topicItem}>
                                    <Image style={styles.topicImg} source={require('./Images/rumen.png')} />
                                    <View style={styles.topicContainer}>
                                        <View style={styles.topicText}>
                                            <Text style={styles.topicTitle}>太极拳一式</Text>
                                            <Text style={styles.topicDesc}>3246 预览 ·578收藏</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.topicItem}>
                                    <Image style={styles.topicImg} source={require('./Images/rumen.png')} />
                                    <View style={styles.topicContainer}>
                                        <View style={styles.topicText}>
                                            <Text style={styles.topicTitle}>太极拳一式</Text>
                                            <Text style={styles.topicDesc}>3246 预览 ·578收藏</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </ScrollableTabView>
            </View>
        );
    }
    playMusic = () => {
        this.setState({
            playState:false
        })
    }
    suspendMusic = () => {
        this.setState({
            playState:true
        })
    }
    componentDidMount() {
    }

}

const styles = StyleSheet.create({
    containerAppTaichi: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F7F7F7"
    },
    tabBarUnderline: {
        backgroundColor: '#FFFFFF',
        height: 1,
    },
    culturalcon:{
        width:width,
        backgroundColor:"#FFFFFF",
        marginTop:10,
        paddingTop:10,
        paddingBottom:10
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
        marginLeft:width * 0.02
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
    culturalconMusic: {
        width: width,
        backgroundColor: "#F3F3F3",
        paddingTop: 10,
        height:height
    },
    culturalconChild: {
        flexDirection: "row",
        width: width * 0.94,
        backgroundColor:"#FFFFFF",
        borderBottomColor: "#DDDDDD",
        borderBottomWidth: 0.5,
        marginLeft: width * 0.03,
        paddingBottom: 15,
        paddingTop: 15,
        justifyContent: "space-between",
        alignItems: "center"
    },
    text1: {
        color: "#3A3A3A",
        fontSize: 14
    },
    text2: {
        color: "#A8A8A8",
        fontSize: 12,
        paddingTop: 10
    },
    getuStyMyec: {
        width: width,
        backgroundColor: "#FFFFFF",
        paddingBottom: 15,
        position:"absolute",
        bottom:0
    },
    lineSty: {
        width: width,
        backgroundColor: "#F3F3F3",
        height: 15
    },
    modalStyChildTlist: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 5,
        paddingRight: 5
    },
    getupian: {
        width: 55,
        height: 55,
        marginLeft: 6,
        borderWidth: 1,
        borderColor: "#DDDDDD"
    },
    modalStyChildT1: {
        marginTop: 5,
        marginLeft: 5
    },
    modalStyChildT2: {
        marginTop: 5,
        marginLeft: 5,
        paddingLeft: 7,
        justifyContent: "space-evenly"
    },
    gequname: {
        color: "#282828",
        fontSize: 14
    },
    gequtime: {
        color: "#B2B2B2",
        fontSize: 13
    },
    RighCotinaer: {
        flexDirection: 'row',
        alignItems: "center",
        width: 100,
        justifyContent: "space-between",
        paddingRight: 5
    },
    listRight:{
        width:width * 0.94,
        marginLeft:width * 0.03,
        flexDirection:'row',
        justifyContent:"flex-end",
        paddingTop:15,
        paddingBottom:10,
        paddingRight:3,
        borderBottomWidth:1,
        borderBottomColor:"#DDDDDD"
    },
    listMp3con:{
        width:width
    },
    listLeft:{
        width:width * 0.94,
        marginLeft:width * 0.03,
        flexDirection:"row",
        justifyContent:"space-between",
        paddingTop:15,
        paddingBottom:10,
        borderBottomColor:"#DDDDDD",
        borderBottomWidth:1
    },
    listLeftChid2:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:50
    },
    DemoBack: {
        position: 'absolute',
        backgroundColor: "#333333",
        width: width,
        height: height,
        opacity: 0.5,
        zIndex: 3,
        top: 0
    },
    modalSty: {
        width: width,
        position: "absolute",
        bottom: 0,
        backgroundColor: "#FFFFFF",
        zIndex: 2,
        paddingBottom: 15
    },
    modalStyAll:{
        width: width,
        height:height,
        position: "absolute",
        bottom: 0
    },
    modalStyChildT: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 5,
        paddingRight: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
    },
    modalStyChildTT: {
        width: width
    },
    modalStyChildTT1: {
        width: width * 0.9,
        flexDirection: "row",
        marginLeft: width * 0.05,
        borderBottomColor: "#DDDDDD",
        borderBottomWidth: 1,
        paddingTop: 14,
        paddingBottom: 14
    },
    scggq: {
        color: "#282828",
        fontSize: 15,
        paddingLeft: 7
    },
    fxggq: {
        color: "#282828",
        fontSize: 15,
        paddingLeft: 7
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
        marginTop:10,
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
        paddingLeft:5,
        paddingBottom:5
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
        width:"100%"
    },
});
