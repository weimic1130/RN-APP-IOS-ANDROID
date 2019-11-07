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
import HTMLView from 'react-native-htmlview';

import {JFAPI} from "./API/API";
import global from '../global';
let {width, height} = Dimensions.get('window');
export default class Coursedetailsprice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeInex: 1,
            courseDetails: '',
            courseDetailsContent: ''
        }
    }

    static navigationOptions = {
        headerTitle: '课程详情',
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
            <View style={styles.containerAppCourseSprice}>
                {
                    this.state.courseDetailsContent ? <ScrollView style={{flex: 1, width: "100%"}}>
                        <Image style={{width: width, height: 200}} source={{uri: global.PicUrl + this.state.courseDetailsContent.imgList[0]}}/>
                        {/*点赞分享区域*/}
                        <View style={styles.allconCour}>
                            <View style={styles.AppCDetaChild}>
                                <Text style={styles.childText1}>{this.state.courseDetailsContent.title}</Text>
                                <View style={styles.AppCDetaChild1}>
                                    <Text style={styles.AppCDetaChild1Text}>主讲：</Text>
                                    <Text style={styles.AppCDetaChild1Text1}>{this.state.courseDetailsContent.userName}</Text>
                                </View>
                            </View>
                            <View style={styles.AppCDetaChildLine}></View>
                            <View style={styles.AppCDetaChild3}>
                                <Text style={styles.AppCDetaChild1Text2}>课程介绍</Text>
                                <HTMLView style={{marginTop: 8}} value={this.state.courseDetailsContent.intro}/>
                            </View>
                            <View style={styles.AppCDetaChildLine1}></View>
                            <View style={styles.AppCDetaChild}>
                                <View style={styles.AppCDetaChild4}>
                                    <Text style={styles.AppCDetaChild42Text}>课程表</Text>
                                    <View style={styles.AppCDetaChild41}>
                                        {this.lessonTypeText(this.state.courseDetailsContent.lessonType)}
                                        <Image source={require('./Images/left.png')}/>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.AppCDetaChildLine2}></View>
                            {
                                this.curriculumTable(this.state.courseDetailsContent.lessonType)
                            }
                        </View>
                        {/*提交按钮*/}
                        <TouchableWithoutFeedback onPress={() => this.PayforCourses()}>
                            <View style={styles.AdbanniuQ}>
                                <Text style={styles.AdbanniuText}>线下教学￥{this.state.courseDetailsContent.price / 100}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView> : null
                }
            </View>
        );
    }

    // 等级类型
    lessonTypeText = (type) => {
        switch (type) {
            case 3:
                return (<Text style={styles.AppCDetaChild41Text}>弘毅一级</Text>)
                break;
            case 4:
                return (<Text style={styles.AppCDetaChild41Text}>弘毅二级</Text>)
                break;
            case 5:
                return (<Text style={styles.AppCDetaChild41Text}>弘毅三级</Text>)
                break;
            case 6:
                return (<Text style={styles.AppCDetaChild41Text}>归真一级</Text>)
                break;
            case 7:
                return (<Text style={styles.AppCDetaChild41Text}>归真二级</Text>)
                break;
            case 8:
                return (<Text style={styles.AppCDetaChild41Text}>归真三级</Text>)
                break;
            case 9:
                return (<Text style={styles.AppCDetaChild41Text}>圆明一级</Text>)
                break;
            case 10:
                return (<Text style={styles.AppCDetaChild41Text}>圆明二级</Text>)
                break;
            case 11:
                return (<Text style={styles.AppCDetaChild41Text}>圆明三级</Text>)
                break;
            default:
                return (<Text style={styles.AppCDetaChild41Text}>空</Text>)
        }
    }
    // 课程表
    curriculumTable = (type) => {
        switch (type) {
            case 1:
                return (
                    <View style={styles.AppCDetaChild9}>
                        <View style={styles.AppCDetaChild6}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>课节</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>60</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>课时</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>四个月</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>悠然太极球</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>八步功</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>逍遥绳</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>拉:</Text>
                                <Text style={styles.shuliaText}>桩步双手</Text>
                                <Text style={styles.shuliaText}>拗步单手</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>中正棍</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>-</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>推手</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>左右单圈手</Text>
                                <Text style={styles.shuliaText}>定步双手单圈手</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>功，拳，械</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>自然桩</Text>
                                <Text style={styles.shuliaText}>活步桩</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>备注</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>弘毅：筑基、扎根</Text>
                            </View>
                        </View>
                    </View>
                )
                break;
            case 2:
                return (
                    <View style={styles.AppCDetaChild9}>
                        <View style={styles.AppCDetaChild6}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>课节</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>60</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>课时</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>四个月</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>悠然太极球</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>左右搓球</Text>
                                <Text style={styles.shuliaText}>滚球</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>逍遥绳</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>拉:</Text>
                                <Text style={styles.shuliaText}>桩步双手</Text>
                                <Text style={styles.shuliaText}>顺步双手</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>中正棍</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>七尺</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>推手</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>推马辫虚实</Text>
                                <Text style={styles.shuliaText}>平圆四点转身推</Text>
                                <Text style={styles.shuliaText}>起伏式</Text>
                                <Text style={styles.shuliaText}>前实转腰推</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>功，拳，械</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>混元桩</Text>
                                <Text style={styles.shuliaText}>六式行气功前三式（开合、抓坠、提拔）</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>备注</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>弘毅：筑基、扎根</Text>
                            </View>
                        </View>
                    </View>
                )
                break;
            case 3:
                return (
                    <View style={styles.AppCDetaChild9}>
                        <View style={styles.AppCDetaChild6}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>课节</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>60</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>课时</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>四个月</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>悠然太极球</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>四正劲</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>逍遥绳</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>摇：</Text>
                                <Text style={styles.shuliaText}>桩步双手，顺逆</Text>
                                <Text style={styles.shuliaText}>顺步双手，顺逆</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>中正棍</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>八尺</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>推手</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>三点式</Text>
                                <Text style={styles.shuliaText}>二点式（前实、后实、定步、移步）</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>功，拳，械</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>虚实桩</Text>
                                <Text style={styles.shuliaText}>六式行气功后三式（旋转、抓闭、大掤）</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>备注</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>弘毅：筑基、扎根</Text>
                            </View>
                        </View>
                    </View>
                )
                break;
            case 4:
                return (
                    <View style={styles.AppCDetaChild9}>
                        <View style={styles.AppCDetaChild6}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>课节</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>60</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>课时</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>四个月</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>悠然太极球</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>四隅劲</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>逍遥绳</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>摇：</Text>
                                <Text style={styles.shuliaText}>顺步双手，顺逆</Text>
                                <Text style={styles.shuliaText}>拗步双手，顺逆</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>中正棍</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>九尺</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>推手</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>一点式：前实、后实</Text>
                                <Text style={styles.shuliaText}>前实跟脚</Text>
                                <Text style={styles.shuliaText}>后实收脚</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>功，拳，械</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>倚立桩</Text>
                                <Text style={styles.shuliaText}>传统太极拳（进、退、顾、盼、定）</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>备注</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>归真：推乎、问劲</Text>
                            </View>
                        </View>
                    </View>
                )
                break;
            case 5:
                return (
                    <View style={styles.AppCDetaChild9}>
                        <View style={styles.AppCDetaChild6}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>课节</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>60</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>课时</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>四个月</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>悠然太极球</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>四正劲（反）</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>逍遥绳</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>摇：</Text>
                                <Text style={styles.shuliaText}>顺步单手，顺逆</Text>
                                <Text style={styles.shuliaText}>拗步单手，顺逆</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>中正棍</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>十尺</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>推手</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>擒拿手基本功</Text>
                                <Text style={styles.shuliaText}>按肩实根</Text>
                                <Text style={styles.shuliaText}>内外圈手</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>功，拳，械</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>悠然太极拳</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>备注</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>归真：推乎、问劲</Text>
                            </View>
                        </View>
                    </View>
                )
                break;
            case 6:
                return (
                    <View style={styles.AppCDetaChild9}>
                        <View style={styles.AppCDetaChild6}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>课节</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>60</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>课时</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>四个月</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>悠然太极球</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>四隅劲（反）</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>逍遥绳</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>甩：</Text>
                                <Text style={styles.shuliaText}>顺步双手,顺逆</Text>
                                <Text style={styles.shuliaText}>拗步双手，顺逆</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>中正棍</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>十一尺</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>推手</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>控腰固根</Text>
                                <Text style={styles.shuliaText}>拿法练习</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>功，拳，械</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>传统太极刀、太极棍、太极剑、太极枪</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>备注</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>归真：推乎、问劲</Text>
                            </View>
                        </View>
                    </View>
                )
                break;
            case 7:
                return (
                    <View style={styles.AppCDetaChild9}>
                        <View style={styles.AppCDetaChild6}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>课节</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>60</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>课时</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>三个月</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>悠然太极球</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>定步、活步</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>逍遥绳</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>甩：</Text>
                                <Text style={styles.shuliaText}>顺步单手，顺逆</Text>
                                <Text style={styles.shuliaText}>拗步单手，顺逆</Text>
                                <Text style={styles.shuliaText}>虚实步单手，顺逆</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>中正棍</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>十二尺</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>推手</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>七动不倒</Text>
                                <Text style={styles.shuliaText}>控身法</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>功，拳，械</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>太极习劲法</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>备注</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>圆明：明发、证道</Text>
                            </View>
                        </View>
                    </View>
                )
                break;
            case 8:
                return (
                    <View style={styles.AppCDetaChild9}>
                        <View style={styles.AppCDetaChild6}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>课节</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>60</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>课时</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>三个月</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>悠然太极球</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>双人练习</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>逍遥绳</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>抖：</Text>
                                <Text style={styles.shuliaText}>顺步单双手，顺逆</Text>
                                <Text style={styles.shuliaText}>拗步单双手，顺逆</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>中正棍</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>十三尺</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>推手</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>十字打</Text>
                                <Text style={styles.shuliaText}>散推</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>功，拳，械</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>行云流水</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>备注</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>圆明：明发、证道</Text>
                            </View>
                        </View>
                    </View>
                )
                break;
            case 9:
                return (
                    <View style={styles.AppCDetaChild9}>
                        <View style={styles.AppCDetaChild6}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>课节</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>60</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>课时</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>六个月</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>悠然太极球</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>双人活步表演</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>逍遥绳</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>弹簧形连环劲</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>中正棍</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>活身变化</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>推手</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>我劲我运</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>功，拳，械</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>气化后的真空妙有态——太极态</Text>
                            </View>
                        </View>
                        <View style={styles.AppCDetaChild7}>
                            <View style={styles.AppCDetaChild61}>
                                <Text style={styles.kejietext}>备注</Text>
                            </View>
                            <View style={styles.AppCDetaChild62}>
                                <Text style={styles.shuliaText}>圆明：明发、证道</Text>
                            </View>
                        </View>
                    </View>
                )
                break;
            default:
                return (<Text>无类型</Text>)
        }
    }
    PayforCourses = () => {
        let parameter = {
            data: this.state.courseDetailsContent
        };
        this.props.navigation.navigate('CoursePaymentN', parameter);
    }
    // 课程详情
    getetBasicLissonInfo = (id) => {
        let url = JFAPI.etLissonInfo;
        let formData = new FormData();
        formData.append('id', id);
        let opts = {
            body: formData,
            method: "POST"
        };
        console.log(url);
        console.log(opts);
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                if (res.code == 0) {
                    this.setState({
                        courseDetailsContent: res.data
                    })
                } else {
                    this.setState({
                        courseDetailsContent: ''
                    })
                    // lessonTypeText
                }
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    componentDidMount() {
        if (this.props.navigation.state.params.data) {
            this.setState({
                courseDetails: this.props.navigation.state.params.data
            })
            this.getetBasicLissonInfo(this.props.navigation.state.params.data.id)
        }
    }

}

const styles = StyleSheet.create({
    containerAppCourseSprice: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F7F7F7"
    },
    AppCDetaChild9: {
        width: width * 0.9,
        paddingTop: 15,
        paddingBottom: 15
    },
    AppCDetaChild: {
        width: width * 0.9,
        paddingTop: 15
    },
    AppCDetaChild3: {
        width: width * 0.9,
        paddingTop: 15
    },
    AppCDetaChildLine2: {
        width: width * 0.9,
        height: 1,
        backgroundColor: "#EAEAEA",
        marginTop: 5
    },
    AppCDetaChildLine: {
        width: width * 0.9,
        height: 1,
        backgroundColor: "#EAEAEA",
        marginTop: 15
    },
    AppCDetaChildLine1: {
        width: width,
        height: 5,
        backgroundColor: "#EAEAEA",
        marginTop: 15
    },
    AppCDetaChild2: {
        width: width * 0.9,
        paddingTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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
        paddingTop: 10,
        paddingBottom: 5
    },
    AppCDetaChild1Text: {
        color: "#B2B2B2",
        fontSize: 14
    },
    AppCDetaChild1Text1: {
        color: "#B06F42",
        fontSize: 14
    },
    AppCDetaChild12: {
        width: 30,
        height: 30,
        backgroundColor: "#D2D2D2",
        borderRadius: 20
    },
    AppCDetaChild21: {
        flexDirection: "row",
        alignItems: "center"
    },
    TextXy: {
        color: "#B2B2B2",
        fontSize: 13,
        paddingRight: 5
    },
    AppCDetaChild1Text2: {
        color: "#B2B2B2",
        fontSize: 14
    },
    AppCDetaChild1Text3: {
        color: "#767676",
        fontSize: 14,
        lineHeight: 20,
        paddingTop: 10,
        fontWeight: "bold",
        paddingBottom: 10
    },
    AppCDetaChild4: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 10
    },
    AppCDetaChild41: {
        flexDirection: "row",
        alignItems: "center"
    },
    AppCDetaChild41Text: {
        color: "#B2B2B2",
        fontSize: 14,
        paddingRight: 10
    },
    AppCDetaChild42Text: {
        color: "#282828",
        fontSize: 15,
        fontWeight: "bold"
    },
    AppCDetaChild7: {
        flexDirection: "row",
    },
    AppCDetaChild6: {
        flexDirection: "row",
        paddingTop: 5,
    },
    AppCDetaChild61: {
        alignItems: "center",
        justifyContent: "center",
        width: "30%",
        borderTopWidth: 1,
        borderTopColor: "#D0C0B4",
        borderLeftColor: "#D0C0B4",
        borderLeftWidth: 1,
        borderBottomColor: "#D0C0B4",
        borderBottomWidth: 1,
        paddingTop: 10,
        paddingBottom: 10
    },
    AppCDetaChild62: {
        alignItems: "flex-start",
        width: "70%",
        borderTopWidth: 1,
        borderTopColor: "#D0C0B4",
        borderLeftWidth: 1,
        borderLeftColor: "#D0C0B4",
        borderBottomColor: "#D0C0B4",
        borderBottomWidth: 1,
        borderRightColor: "#D0C0B4",
        borderRightWidth: 1,
        paddingTop: 10,
        paddingBottom: 10
    },
    kejietext: {
        color: "#8A6246",
        fontSize: 14
    },
    shuliaText: {
        color: "#282828",
        fontSize: 14,
        paddingLeft: 10
    },
    AdbanniuQ: {
        marginLeft: width * 0.1,
        width: width * 0.8,
        backgroundColor: "#8A6246",
        marginTop: 15,
        marginBottom: 15,
        borderColor: "#8A6246",
        borderWidth: 1,
        borderRadius: 3,
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15
    },
    AdbanniuText: {
        color: "#FFFFFF",
        fontSize: 16
    },
});
