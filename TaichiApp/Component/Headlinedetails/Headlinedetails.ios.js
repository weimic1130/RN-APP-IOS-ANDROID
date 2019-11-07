/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { createStackNavigator, StackActions, NavigationActions, createAppContainer } from "react-navigation";
import {KeyboardAvoidingView, Modal, FlatList, TouchableOpacity, ScrollView, Button, Platform, Image, ImageBackground, Dimensions, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
// icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
export default class HeadlinedetailsIos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slideshowArr: ['http://www.tantanscience.com/lipstickImg/tghb.png', 'http://www.tantanscience.com/lipstickImg/tghb.png']
        }
    }
    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: '悠然头条',
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    })
    loseFocus() {
        this.refs.input.blur()
    }
    render() {
        let behavior = Platform.OS == 'ios' ? 'position' : null
        return (
            <View style={styles.containerAppHeader}>
                <ScrollView style={{ flex: 1, marginBottom: 55 }}>
                    <View style={styles.HeaderTitlecon}>
                        <View style={styles.HeaderTitle}>
                            <View style={styles.HeaderTitle1}>
                                <Text style={styles.HeaderTitle1Text1}>来自非洲的战神</Text>
                                <Text style={styles.HeaderTitle1Text2}>212.5万浏览量 / 2019年12月22日</Text>
                            </View>
                            <View style={styles.HeaderTitle2}>
                                <Image source={require('./Images/8.png')} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.conTitle}>
                        <Text style={styles.titleText}>全国人大代表李光宇：太极拳面临被他国“抢 注”的风险 应加快推进申遗</Text>
                        <Text style={styles.Timetext}>2018-06-07 14:00</Text>
                    </View>
                    <View style={styles.contitleLine}></View>
                    <View style={styles.conTitle}>
                        <Text style={styles.contTitleText2}>太极拳作为中国传统文化的一种符号象征，也已成为中国对外文化交流的重要桥梁和纽带。由于太极拳尚未被列入联合国人类非物质文化遗产代表作名录，未获得国际非遗保护权威机构认可，目前面临着被其它国家抢先申遗的风险。为此，全国人大代表、宇华教育集团董事长李光宇建议，我国应加大对太极拳申遗的支持力度，加快推进太极拳申遗工作，进一步弘扬太极文化。</Text>
                    </View>
                    <View style={styles.conTitle}>
                        <Image style={styles.contitleImage} source={require('./Images/bj.png')} />
                    </View>
                    <View style={styles.conTitle}>
                        <Image source={require('./Images/7.png')} />
                        <Text style={styles.diansaNum}>41902</Text>
                    </View>
                    {/*热门推荐*/}
                    <View style={styles.remsnscON}>
                        <View style={styles.rementj}>
                            <View style={styles.rementj1}>
                                <Image source={require('./Images/11.png')} />
                                <Text style={styles.retjText1}>热门推荐</Text>
                            </View>
                            <View style={styles.rementj2}>
                                <Text style={styles.retjText2}>更多</Text>
                                <Image source={require('./Images/1.png')} />
                            </View>
                        </View>
                    </View>
                    {/*热门推荐列表*/}
                    <View style={styles.culturalcon}>
                        <View sytle={{ width: width, backgroundColor: "#FFFFFF" }}>
                            <View style={styles.Ttquyu}>
                                <View style={{ width: width * 0.3 }}>
                                    <Image style={{ width: 110, height: 75 }} source={require('./Images/rumen.png')} />
                                </View>
                                <View style={{ paddingLeft: 5, width: width * 0.6, justifyContent: "space-between" }}>
                                    <Text style={styles.zesbiaoti}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={styles.tttitle}>传统文化</Text>
                                        <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.TtquyuNo}>
                                <View style={{ width: width * 0.3 }}>
                                    <Image style={{ width: 110, height: 75 }} source={require('./Images/rumen.png')} />
                                </View>
                                <View style={{ paddingLeft: 5, width: width * 0.6, justifyContent: "space-between" }}>
                                    <Text style={styles.zesbiaoti}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={styles.tttitle}>传统文化</Text>
                                        <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/*评论区域*/}
                    <View>
                        <View style={styles.pyquyuscon}>
                            <View style={styles.pyquyuscon1}>
                                <Image source={require('./Images/7.png')} />
                            </View>
                            <View style={styles.pyquyuscon2}>
                                <View style={styles.pyquyuscon21}>
                                    <View style={styles.pyquyuscon211}>
                                        <Text style={styles.yhniche}>来自非洲的战神</Text>
                                        <Text style={styles.yhnitime}>2019年12月12日 16:30</Text>
                                    </View>
                                    <View style={styles.pyquyuscon212}>
                                        <Text style={styles.diansas}>128</Text>
                                        <Image source={require('./Images/10.png')} />
                                    </View>
                                </View>
                                <View style={{ width: '100%', marginTop: 13 }}>
                                    <Text style={styles.descconText}>是生两檥。两檥生四马，四马 生八卦。”，因汉初避刘恒讳，故改“恒”为“极”， 而四马同时改为四象。“太”与“大”古时相通，而 “泰”又与“太”相通。而原文是指泰与恒两卦。 “坤乾”是一种易书，出自商代，坤为金德，殷以 金德王，故坤乾为商代之易。</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                {/*底部输入框*/}
                <View style={styles.box}>
                    <TextInput ref="input" style={styles.input} placeholderTextColor='#999999' placeholder={'评论内容'} underlineColorAndroid="transparent" />
                    <Image style={styles.fasImgurl} source={require('./Images/6.png')} />
                </View>
            </View>
        );
    }

    // 请求页面接口
    componentDidMount() {
        console.log("ios");
    }

    componentWillMount() {
    }
}
const styles = StyleSheet.create({

    containerAppHeader: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: "center"
    },
    HeaderTitlecon: {
        backgroundColor: "#FAF7F4",
        width: width,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: "#D6B6A0",
        borderBottomWidth: 1
    },
    HeaderTitle: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: width * 0.9,
        marginTop: 10
    },
    HeaderTitle1Text1: {
        color: "#282828",
        fontSize: 14
    },
    HeaderTitle1Text2: {
        color: "#B2B2B2",
        fontSize: 12,
        paddingTop: 4,
        paddingBottom: 4
    },
    conTitle: {
        width: width * 0.94,
        alignItems: "center",
        marginLeft: width * 0.03,
        paddingTop: 10
    },
    contitleLine: {
        width: width * 0.94,
        alignItems: "center",
        marginLeft: width * 0.06,
        backgroundColor: '#EAEAEA',
        height: 1,
        marginTop: 15
    },
    titleText: {
        color: "#3A3A3A",
        fontWeight: "bold",
        fontSize: 17
    },
    Timetext: {
        color: "#A8A8A8",
        fontSize: 12,
        paddingTop: 10
    },
    contTitleText2: {
        color: "#3A3A3A",
        fontSize: 14,
        fontWeight: "bold"
    },
    contitleImage: {
        width: "100%"
    },
    diansaNum: {
        color: "#B2B2B2",
        fontSize: 14,
        paddingTop: 5
    },
    remsnscON: {
        backgroundColor: "#F7F7F7",
        flexDirection: "row",
        justifyContent: "space-between",
        width: width,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 15
    },
    rementj: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: width * 0.9,
        marginTop: 10,
        marginLeft: width * 0.05
    },
    rementj1: {
        flexDirection: "row",
        alignItems: "center"
    },
    rementj2: {
        flexDirection: "row",
        alignItems: "center"
    },
    retjText1: {
        color: "#282828",
        fontSize: 16,
        paddingLeft: 10
    },
    retjText2: {
        color: "#B2B2B2",
        fontSize: 13,
        paddingRight: 6
    },
    culturalcon: {
        width: width,
        backgroundColor: "#F7F7F7",
        paddingTop: 10,
        paddingBottom: 10
    },
    Ttquyu: {
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: "#F7F7F7",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        width: width * 0.96,
        marginLeft: width * 0.04
    },
    TtquyuNo: {
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: "#F7F7F7",
        width: width * 0.96,
        marginLeft: width * 0.04
    },
    zesbiaoti: {
        color: "#3A3A3A",
        fontSize: 14,
        fontWeight: "bold"
    },
    tttitle: {
        color: "#A8A8A8",
        fontSize: 12,
        fontWeight: 'bold'
    },
    ttdesc: {
        color: "#A8A8A8",
        fontSize: 12
    },
    pyquyuscon: {
        flexDirection: "row",
        width: width * 0.92,
        marginLeft: width * 0.04,
        marginTop: 10,
        paddingTop: 15,
        borderBottomColor: "#EAEAEA",
        borderBottomWidth: 1,
        paddingBottom: 15
    },
    pyquyuscon21: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    pyquyuscon1: {
        width: width * 0.2,
    },
    pyquyuscon2: {
        width: width * 0.75
    },
    pyquyuscon212: {
        flexDirection: "row",
        paddingRight: 10
    },
    yhniche: {
        color: "#757575",
        fontSize: 14
    },
    yhnitime: {
        color: "#B2B2B2",
        fontSize: 11,
        paddingTop: 5
    },
    diansas: {
        color: "#B2B2B2",
        fontSize: 13,
        paddingRight: 8
    },
    pyquyuscon211: {
        alignContent: "space-between"
    },
    descconText: {
        color: "#282828",
        fontSize: 14,
        fontWeight: "bold"
    },
    Dbinput: {
        width: width,
        position: "absolute",
        bottom: 0,
        backgroundColor: "#DDDDDD",
        height: 50
    },
    box: {
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
        shadowColor: "#DDDDDD",
        shadowOpacity: 0.5,
        shadowRadius: 2
    },
    input: {
        height: 40,
        width: '80%',
        fontSize: 15,
        color: '#333333',
        backgroundColor: '#F3F3F3',
        paddingVertical: 0,
        paddingLeft: 5
    },
    fasImgurl: {
        marginLeft: 10
    }
});
