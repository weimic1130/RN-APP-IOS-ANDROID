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
export default class HotTopic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static navigationOptions = {
        headerTitle: '帖子详情',
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        headerRight: (
            <TouchableWithoutFeedback onPress={() => alert("跳转")}>
                <Image style={{marginRight: 15}} source={require('./Images/5.png')} />
            </TouchableWithoutFeedback>
        )
    };

    render() {
        return (
            <View style={styles.containerAppPostDetails}>
                <ScrollView>
                    <View style={styles.culturalcon}>
                        <View style={{backgroundColor: "#FFFFFF"}}>
                            <View style={styles.containerAppTaiMoreChild1}>
                                <View>
                                    <Image style={{width: 45, height: 45, borderRadius: 22}} source={require('./Images/tx.jpg')}/>
                                </View>
                                <View style={styles.containerAppTaiMoreChild12}>
                                    <View>
                                        <View style={{flexDirection: "row", alignItems: "center"}}>
                                            <Text style={styles.containerAppTaiMoreChild12Text1}>来自非洲的战神</Text>
                                            <View style={styles.containerAppTaiMoreChild13}>
                                                <Text style={styles.containerAppTaiMoreChild13Text}>拳正问身</Text>
                                            </View>
                                        </View>
                                        <Text style={styles.containerAppTaiMoreChild12Text2}>9小时前</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.containerAppTaiMoreChild2}>
                                <Text style={{lineHeight:20,color:"#8A6246",fontSize:14,fontWeight:"bold"}}>#太极拳的由来<Text style={{lineHeight:20,color:"#767676",fontSize:14}}>验实的方法，对自然现象进行归因的学 科。科学活动所得的知识是条件明确的、能经得起检验 的，而且不能与任何适用范围内的已知事实产生矛盾。 科学原仅指对自然现象之规律的探索与总结，但人文学 科也越来越多地被冠以“科学”之名。
                                </Text></Text>
                            </View>
                            <View style={styles.containerAppTaiMoreChild3}>
                                <Image style={styles.containerAppTaiMoreChild3Img} source={require('./Images/tx.jpg')} />
                            </View>
                            <View style={styles.containerAppTaiMoreChild4}>
                                <View style={styles.containerAppTaiMoreChild41}>
                                    <Image style={styles.iconSize} source={require('./Images/1.png')} />
                                    <Text style={styles.containerAppTaiMoreChild41Text}>41092</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.lineStyZdy}></View>
                        <View style={styles.lingsTitle}>
                            <Image style={{width:18,height:17}} source={require('./Images/3.png')} />
                            <Text style={{fontSize:16,color:"#282828",paddingLeft:10}}>评论</Text>
                        </View>
                        <View style={{justifyContent:"center",alignItems:"center"}}>
                            <View style={styles.pyquyuscon}>
                                <View style={styles.pyquyuscon1}>
                                    <Image style={styles.headerImgSize} source={require('./Images/tx.jpg')} />
                                </View>
                                <View style={styles.pyquyuscon2}>
                                    <View style={styles.pyquyuscon21}>
                                        <View style={styles.pyquyuscon211}>
                                            <Text style={styles.yhniche}>来自非洲的战神</Text>
                                            <Text style={styles.yhnitime}>2019年12月12日 16:30</Text>
                                        </View>
                                        <View style={styles.pyquyuscon212}>
                                            <Text style={styles.diansas}>128</Text>
                                            <Image source={require('./Images/2.png')} />
                                        </View>
                                    </View>
                                    <View style={{width:'96%',marginTop:13}}>
                                        <Text style={styles.descconText}>是生两檥。两檥生四马，四马 生八卦。”，因汉初避刘恒讳，故改“恒”为“极”， 而四马同时改为四象。“太”与“大”古时相通，而 “泰”又与“太”相通。而原文是指泰与恒两卦。 “坤乾”是一种易书，出自商代，坤为金德，殷以 金德王，故坤乾为商代之易。</Text>
                                    </View>
                                    <View style={styles.plquyuneods}>
                                        <View style={{marginBottom: 8}}>
                                            <Text style={{lineHeight:20,color:"#008ACA",fontSize:14}} numberOfLines={2}>昵称：<Text style={{color:"#4B4B4B",fontSize:14}}>评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容</Text></Text>
                                        </View>
                                        <View style={{marginBottom: 8}}>
                                            <Text style={{lineHeight:20,color:"#008ACA",fontSize:14}} numberOfLines={2}>昵称：<Text style={{color:"#4B4B4B",fontSize:14}}>评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容评论的内容</Text></Text>
                                        </View>
                                        <View style={{marginBottom: 4,flexDirection:"row",alignItems:"center"}}>
                                            <Text style={{paddingRight:6,color:"#008ACA",fontSize:14}} numberOfLines={2}>
                                                查看更多
                                            </Text>
                                            <Image source={require('./Images/4.png')} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    componentDidMount() {
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
        marginTop: 10,
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
        color: "#FFFFFF",
        fontSize: 10
    },
    containerAppTaiMoreChild13: {
        backgroundColor: "#B98A69",
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
        paddingRight: 8
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
    }
});
