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
import AsyncStorage from "@react-native-community/async-storage";
import {JFAPI} from './API/API';
import Loading from "../LoadingAnimation/LoadingAnimation";

let {width, height} = Dimensions.get('window');
let codeTime = 60;
import global from '../global';
export default class TaichicultureAndroid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingState:true,
            labelAndroid: ['传统文化', '道家文化', '太极说', '悠然太极'],
            objText:'传统文化',
            userInfo: '',
            DataList: ''
        }
    }

    static navigationOptions = {
        headerTitle: '太极文化',
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
                    onChangeTab={(obj) => this.switchTab(obj)}
                    renderTabBar={() => <ScrollableTabBar/>}
                    tabBarBackgroundColor='#fff'
                    tabBarActiveTextColor='#8A6246'
                    tabBarInactiveTextColor='#333'
                    tabBarUnderlineStyle={styles.tabBarUnderline}
                    tabBarTextStyle={{fontSize: 16}}
                >
                    <View tabLabel='传统文化'>
                        <ScrollView>
                            <View style={styles.culturalcon}>
                                <View sytle={{backgroundColor: "#FFFFFF"}}>
                                    {
                                        this.state.DataList.length > 0 ? this.state.DataList.map((item, index) => {
                                            return (
                                                <TouchableWithoutFeedback key={index} onPress={() => this.gotoDetaile(item)}>
                                                    <View style={index + 1 == this.state.DataList.length ? styles.TtquyuNb : styles.Ttquyu}>
                                                        <View style={{width: width * 0.3}}>
                                                            <Image style={{width: 110, height: 75}} source={{uri: global.PicUrl + item.imgList[0]}}/>
                                                        </View>
                                                        <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                                            <Text style={styles.tttitle}>{item.title}
                                                            </Text>
                                                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                                                <Text style={styles.ttdesc}>{(item.browseNum * 1 + item.virViewNum * 1)}阅读·{item.commentNum}评论</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            )
                                        }) : <View style={styles.emptyAll}>
                                            <Image source={require('./Images/k.png')}/>
                                            <Text style={styles.emptyAllText}>这里什么都没有,空空的</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View tabLabel='道家文化'>
                        <ScrollView>
                            <View style={styles.culturalcon}>
                                <View sytle={{backgroundColor: "#FFFFFF"}}>
                                    {
                                        this.state.DataList.length > 0 ? this.state.DataList.map((item, index) => {
                                            return (
                                                <TouchableWithoutFeedback key={index} onPress={() => this.gotoDetaile(item)}>
                                                    <View style={index + 1 == this.state.DataList.length ? styles.TtquyuNb : styles.Ttquyu}>
                                                        <View style={{width: width * 0.3}}>
                                                            <Image style={{width: 110, height: 75}} source={{uri: global.PicUrl + item.imgList[0]}}/>
                                                        </View>
                                                        <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                                            <Text style={styles.tttitle}>{item.title}
                                                            </Text>
                                                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                                                <Text style={styles.ttdesc}>{item.virCollectNum}阅读·{item.virViewNum}评论</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            )
                                        }) : <View style={styles.emptyAll}>
                                            <Image source={require('./Images/k.png')}/>
                                            <Text style={styles.emptyAllText}>这里什么都没有,空空的</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View tabLabel='太极说'>
                        <ScrollView>
                            <View style={styles.culturalcon}>
                                <View sytle={{backgroundColor: "#FFFFFF"}}>
                                    {
                                        this.state.DataList.length > 0 ? this.state.DataList.map((item, index) => {
                                            return (
                                                <TouchableWithoutFeedback key={index} onPress={() => this.gotoDetaile(item)}>
                                                    <View style={index + 1 == this.state.DataList.length ? styles.TtquyuNb : styles.Ttquyu}>
                                                        <View style={{width: width * 0.3}}>
                                                            <Image style={{width: 110, height: 75}} source={{uri: global.PicUrl + item.imgList[0]}}/>
                                                        </View>
                                                        <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                                            <Text style={styles.tttitle}>{item.title}
                                                            </Text>
                                                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                                                <Text style={styles.ttdesc}>{item.virCollectNum}阅读·{item.virViewNum}评论</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            )
                                        }) : <View style={styles.emptyAll}>
                                            <Image source={require('./Images/k.png')}/>
                                            <Text style={styles.emptyAllText}>这里什么都没有,空空的</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View tabLabel='悠然太极'>
                        <ScrollView>
                            <View style={styles.culturalcon}>
                                <View sytle={{backgroundColor: "#FFFFFF"}}>
                                    {
                                        this.state.DataList.length > 0 ? this.state.DataList.map((item, index) => {
                                            return (
                                                <TouchableWithoutFeedback key={index} onPress={() => this.gotoDetaile(item)}>
                                                    <View style={index + 1 == this.state.DataList.length ? styles.TtquyuNb : styles.Ttquyu}>
                                                        <View style={{width: width * 0.3}}>
                                                            <Image style={{width: 110, height: 75}} source={{uri: global.PicUrl + item.imgList[0]}}/>
                                                        </View>
                                                        <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                                            <Text style={styles.tttitle}>{item.title}
                                                            </Text>
                                                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                                                <Text style={styles.ttdesc}>{item.virCollectNum}阅读·{item.virViewNum}评论</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            )
                                        }) : <View style={styles.emptyAll}>
                                            <Image source={require('./Images/k.png')}/>
                                            <Text style={styles.emptyAllText}>这里什么都没有,空空的</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </ScrollableTabView>
                <Loading show={this.state.loadingState}></Loading>
            </View>
        );
    }

    getnoticeList = (type, page, pageSize) => {
        let formData = new FormData();
        let url = JFAPI.noticeList1;
        let typeArray = [];
        formData.append('type', type);
        formData.append('page', page);
        formData.append('pageSize', pageSize);
        let opts = {
            method: 'POST',
            body: formData
        };
        fetch(url, opts)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                if (responseData.code == 0) {
                    this.setState({
                        loadingState:false
                    })
                    if (responseData.data.length > 0) {
                        for (let i = 0; i < responseData.data.length; i++) {
                            typeArray.push(responseData.data[i]);
                        }
                        this.setState({
                            DataList: typeArray,
                            loadingState:false
                        })
                    } else {
                        this.setState({
                            DataList: '',
                            loadingState:false
                        })
                    }
                }
            })
            .catch((err) => {
                this.setState({
                    DataList: '',
                    loadingState:false
                })
            })
    }
    switchTab = (obj) => {
        let type = '';
        if (obj.ref.props.tabLabel == '传统文化') {
            type = 1;
            this.setState({
                objText:'传统文化'
            })
        } else if (obj.ref.props.tabLabel == '道家文化') {
            type = 2;
            this.setState({
                objText:'道家文化'
            })
        } else if (obj.ref.props.tabLabel == '太极说') {
            type = 3;
            this.setState({
                objText:'太极说'
            })
        } else if (obj.ref.props.tabLabel == '悠然太极') {
            type = 4;
            this.setState({
                objText:'悠然太极'
            })
        }
        this.getnoticeList(type, 1, 10);
    }
    gotoDetaile = (item) => {
        let state = {
            title: this.state.objText,
            id:item.id
        };
        if (item) {
            this.props.navigation.navigate('TaichiCultureDetailsN', state);
        } else {
            console.log("参数错误");
        }
    }

    componentDidMount() {
        console.log('android');
        this.getnoticeList(1, 1, 10);
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result)
                })
            }).catch(error => {
            console.log("读取失败");
        })
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
    culturalcon: {
        width: width,
        backgroundColor: "#FFFFFF"
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
    TtquyuNb: {
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: "#FFFFFF",
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
    emptyAll: {
        width: width,
        height: height,
        justifyContent: "center",
        alignItems: "center"
    },
    emptyAllText: {
        fontSize: 16,
        color: "#B2B2B2"
    }
});
