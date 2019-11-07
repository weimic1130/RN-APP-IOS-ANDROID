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
import BlankPages from "../BlankPages/BlankPages";
import {JFAPI} from './API/API';
import AsyncStorage from "@react-native-community/async-storage";

let {width, height} = Dimensions.get('window');
export default class TestRecords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: '',
            // 审核记录
            DataList1: '',
            // 报考记录
            DataList2: '',
            activeInex: 1
        }
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: navigation.state.params.title,
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        },
    })

    render() {
        return (
            <View style={styles.containerAppTestRec}>
                <ScrollView style={{flex: 1}}>
                    {
                        this.DetailsArea(this.props.navigation.state.params.title)
                    }
                </ScrollView>
            </View>
        );
    }


    // 详情区域
    DetailsArea(title) {
        switch (title) {
            case '审核记录':
                return (
                    <View>
                        <ScrollView>
                            <View style={styles.culturalcon}>
                                {
                                    this.state.DataList1.length > 0 ? this.state.DataList1.map((item, index) => {
                                        return (
                                            <View key={index} sytle={{backgroundColor: "#FFFFFF"}}>
                                                <View style={styles.Ttquyu}>
                                                    <View style={styles.Ttquyu1}>
                                                        <View style={{flexDirection: "row", alignItems: "center"}}>
                                                            {
                                                                this.returnIcons(item.kaoshiLevel)
                                                            }
                                                            {
                                                                this.lessonTypeText(item.kaoshiLevel)
                                                            }
                                                        </View>
                                                        <Text style={styles.Ttquyu1Text2}>
                                                            {
                                                                this.auditStatus(item.status)
                                                            }
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={styles.TtquyuPar}>
                                                    <View style={styles.TtquyuPar1}>
                                                        <View style={styles.TtquyuPar11}>
                                                            <Text style={{color: "#B2B2B2", fontSize: 14}}>报考时间：<Text style={{color: "#282828", fontSize: 14}}>{this.timestampChangeData(item.createTime)}</Text></Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <TouchableWithoutFeedback onPress={() => this.gotoEnterDetails(item)}>
                                                    <View style={styles.TtquyuGEnd}>
                                                        <View style={styles.Ttquyu1End}>
                                                            <View style={styles.Ttquyu1Text1gjspA}>
                                                                <Text style={styles.Ttquyu1Text1gjspARexr}>查看详情</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        )
                                    }) : <BlankPages width={width} height={height} justify={'center'} align={'center'}/>
                                }
                            </View>
                        </ScrollView>
                    </View>
                )
                break;
            case '报考记录':
                return (
                    <View>
                        <ScrollView>
                            <View style={styles.culturalcon}>
                                {
                                    this.state.DataList1.length > 0 ? this.state.DataList1.map((item, index) => {
                                        return (
                                            <View key={index} sytle={{backgroundColor: "#FFFFFF"}}>
                                                <View style={styles.Ttquyu}>
                                                    <View style={styles.Ttquyu1}>
                                                        <View style={{flexDirection: "row", alignItems: "center"}}>
                                                            {
                                                                this.returnIcons(item.kaoshiLevel)
                                                            }
                                                            {
                                                                this.lessonTypeText(item.kaoshiLevel)
                                                            }
                                                        </View>
                                                        <Text style={styles.Ttquyu1Text2}>
                                                            {
                                                                this.auditStatus(item.status)
                                                            }
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={styles.TtquyuPar}>
                                                    <View style={styles.TtquyuPar1}>
                                                        <View style={styles.TtquyuPar11}>
                                                            <Text style={{color: "#B2B2B2", fontSize: 14}}>报考时间：<Text style={{color: "#282828", fontSize: 14}}>{this.timestampChangeData(item.createTime)}</Text></Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <TouchableWithoutFeedback onPress={() => this.gotoEnterDetails(item)}>
                                                    <View style={styles.TtquyuGEnd}>
                                                        <View style={styles.Ttquyu1End}>
                                                            <View style={styles.Ttquyu1Text1gjspA}>
                                                                <Text style={styles.Ttquyu1Text1gjspARexr}>查看详情</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        )
                                    }) : <BlankPages width={width} height={height} justify={'center'} align={'center'}/>
                                }
                            </View>
                        </ScrollView>
                    </View>
                )
                break;
            default:
                return (<BlankPages width={width} height={height} justify={'center'} align={'center'}/>)
        }
    }

    // 等级图标
    returnIcons = (type) => {
        switch (type) {
            case 1:
            case 2:
            case 3:
                return (<Image style={{width: 36, height: 36, borderRadius: 18}} source={require('./Images/testrecordsh.png')}/>)
                break;
            case 4:
            case 5:
            case 6:
                return (<Image style={{width: 36, height: 36, borderRadius: 18}} source={require('./Images/testrecordsz.png')}/>)
                break;
            case 7:
            case 8:
            case 9:
                return (<Image style={{width: 36, height: 36, borderRadius: 18}} source={require('./Images/testrecordsm.png')}/>)
                break;
        }
    }
    // 审核状态
    auditStatus = (type) => {
        switch (type) {
            case 0:
                return ('未审核')
                break;
            case 1:
                return ('审核通过')
                break;
            case 2:
                return ('已拒绝')
                break;
            default:
                return ('审核中')
        }
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

    // 等级类型
    lessonTypeText = (type) => {
        console.log(type)
        switch (type) {
            case 0:
            case 1:
            case 2:
            case 3:
                return (<Text style={styles.Ttquyu1Text1}>弘毅一级</Text>)
                break;
            case 4:
                return (<Text style={styles.Ttquyu1Text1}>弘毅二级</Text>)
                break;
            case 5:
                return (<Text style={styles.Ttquyu1Text1}>弘毅三级</Text>)
                break;
            case 6:
                return (<Text style={styles.Ttquyu1Text1}>归真一级</Text>)
                break;
            case 7:
                return (<Text style={styles.Ttquyu1Text1}>归真二级</Text>)
                break;
            case 8:
                return (<Text style={styles.Ttquyu1Text1}>归真三级</Text>)
                break;
            case 9:
                return (<Text style={styles.Ttquyu1Text1}>圆明一级</Text>)
                break;
            case 10:
                return (<Text style={styles.Ttquyu1Text1}>圆明二级</Text>)
                break;
            case 11:
                return (<Text style={styles.Ttquyu1Text1}>圆明三级</Text>)
                break;
            default:
                return (<Text style={styles.Ttquyu1Text1}>空</Text>)
        }
    }
    // 教练列表
    getList = (userId) => {
        let url = JFAPI.enterOneselfList;
        let formData = new FormData();
        formData.append('userId', userId);
        let opts = {
            body: formData,
            method: "POST"
        }
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.code == 0) {
                    if (res.data.length > 0) {
                        this.setState({
                            DataList1: res.data
                        })
                    } else {
                        this.setState({
                            DataList1: ''
                        })
                    }
                } else {
                    this.setState({
                        DataList1: ''
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    DataList1: ''
                })
            })
    }
    // 学员列表
    getstudentsList = (userId) => {
        let url = JFAPI.enterOneselfList;
        let formData = new FormData();
        formData.append('userId', userId);
        let opts = {
            body: formData,
            method: "POST"
        }
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.code == 0) {
                    if (res.data.length > 0) {
                        this.setState({
                            DataList2: res.data
                        })
                    } else {
                        this.setState({
                            DataList2: ''
                        })
                    }
                } else {
                    this.setState({
                        DataList2: ''
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    DataList2: ''
                })
            })
    }
    // 查看报考详情
    gotoEnterDetails = (item) => {
        let self = this;
        let parameter = {
            data: item,
            refresh: function () {
                self.getList(self.state.userInfo.id);
            }
        };
        this.props.navigation.navigate('ClDetailsN', parameter);
    }

    componentDidMount() {
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result)
                })
                this.getList(this.state.userInfo.id);
            }).catch(error => {
            console.log("读取失败");
        })
    }

}

const styles = StyleSheet.create({
    allconCour: {
        width: width,
        backgroundColor: "#FFFFFF",
        alignItems: "center"
    },
    containerAppTestRec: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFFFFF"
    },
    tabBarUnderline: {
        backgroundColor: '#FFFFFF',
        height: 1,
    },
    culturalcon: {
        width: "94%",
        backgroundColor: "#FFFFFF",
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: "3%"
    },
    TtquyuG: {
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: "#FFFFFF",
        width: "100%",
        paddingLeft: 10,
        paddingRight: 10
    },
    TtquyuGEnd: {
        flexDirection: 'row',
        justifyContent: "flex-end",
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: "#FFFFFF",
        width: "100%",
        paddingLeft: 10,
        paddingRight: 10
    },
    Ttquyu: {
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        width: "100%",
        paddingLeft: 10,
        paddingRight: 10
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
    Ttquyu1End: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    Ttquyu1: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    Ttquyu1Text1: {
        fontSize: 15,
        color: "#282828",
        paddingLeft: 10
    },
    Ttquyu1Text1gjsp: {
        fontSize: 14,
        color: "#282828"
    },
    Ttquyu1Text2: {
        fontSize: 15,
        color: "#B2B2B2"
    },
    TtquyuPar: {
        flexDirection: "row",
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        width: "100%",
        paddingLeft: 10,
        paddingRight: 10
    },
    TtquyuPar1: {
        flexDirection: "row",
        width: "75%"
    },
    TtquyuPar11Text2: {
        color: "#B2B2B2",
        fontSize: 13,
        paddingTop: 15
    },
    Ttquyu1Text1gjspPrice: {
        color: "#C22525",
        fontSize: 17
    },
    Ttquyu1Text1gjspA: {
        backgroundColor: "#B06F42",
        borderRadius: 14,
        width: 90,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 7,
        paddingBottom: 7
    },
    Ttquyu1Text1gjspARexr: {
        color: "#FFFFFF"
    },
    linePad: {
        width: width,
        backgroundColor: "#F3F3F3",
        height: 9
    },
    searchContainer: {
        width: "94%",
        marginLeft: "3%",
        backgroundColor: "#FFFFFF",
        marginTop: 15
    },
    inputCointsTest: {
        textAlign: "center",
        height: 40
    },
    allconCourChidl: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 12,
        borderBottomColor: "#EAEAEA",
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    allconCourChidlTextActive: {
        fontWeight: "bold",
        color: "#8A6246",
        fontSize: 15,
        // borderBottomWidth: 3,
        // borderBottomColor: "#8A6246",
        paddingBottom: 5
    },
    allconCourChidlTextActiveText: {
        fontWeight: "bold",
        color: "#8A6246",
        fontSize: 15,
        paddingBottom: 5
    },
    allconCourChidlText: {
        color: "#B2B2B2",
        fontSize: 15,
        fontWeight: "bold",
        paddingBottom: 5
    },
    widthSty: {
        width: width,
        backgroundColor: "#F3F3F3",
        height: 10
    }
});
