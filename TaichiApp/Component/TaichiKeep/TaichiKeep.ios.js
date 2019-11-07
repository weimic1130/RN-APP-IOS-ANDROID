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
    Modal,
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
import Loading from '../LoadingAnimation/LoadingAnimation';
import {JFAPI} from './API/API';
import BlankPages from "../BlankPages/BlankPages";
import global from '../global';
let {width, height} = Dimensions.get('window');
export default class TaichiKeepIos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            objText:'养生文化',
            modalVisible: false,
            loadingState: true,
            DataList: ''
        }
    }

    static navigationOptions = {
        headerTitle: '太极养生',
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
                    style={{flex: 1, width: width}}
                    initialPage={0}
                    onChangeTab={(obj) => this.switchTab(obj)}
                    renderTabBar={() => <DefaultTabBar/>}
                    tabBarBackgroundColor='#fff'
                    tabBarActiveTextColor='#8A6246'
                    tabBarInactiveTextColor='#333'
                    tabBarUnderlineStyle={styles.tabBarUnderline}
                    tabBarTextStyle={{fontSize: 16}}
                >
                    <View tabLabel='养生文化'>
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
                                                        <View style={{width: width * 0.6, justifyContent: "space-between"}}>
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
                    <View tabLabel='太极与养生'>
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
                                                        <View style={{width: width * 0.6, justifyContent: "space-between"}}>
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
                    <View tabLabel='养生音乐'>
                        <ScrollView>
                            <BlankPages width={width} height={height} justify={'center'} align={'center'} />
                            {/*歌曲列表*/}
                            {/*<View style={styles.culturalconMusic}>*/}
                            {/*    <View style={styles.culturalconChild}>*/}
                            {/*        <View>*/}
                            {/*            <Text style={styles.text1}>《沙漠骆驼》</Text>*/}
                            {/*            <Text style={styles.text2}>播放量:3172 · 播放时长:3:25</Text>*/}
                            {/*        </View>*/}
                            {/*        <View>*/}
                            {/*            <TouchableWithoutFeedback onPress={() => this.setState({modalVisible: true})}>*/}
                            {/*                <Image source={require('./Images/gengduo.png')}/>*/}
                            {/*            </TouchableWithoutFeedback>*/}
                            {/*        </View>*/}
                            {/*    </View>*/}
                            {/*    <View style={styles.culturalconChild}>*/}
                            {/*        <View>*/}
                            {/*            <Text style={styles.text1}>《沙漠骆驼》</Text>*/}
                            {/*            <Text style={styles.text2}>播放量:3172 · 播放时长:3:25</Text>*/}
                            {/*        </View>*/}
                            {/*        <View>*/}
                            {/*            <TouchableWithoutFeedback onPress={() => this.setState({modalVisible: true})}>*/}
                            {/*                <Image source={require('./Images/gengduo.png')}/>*/}
                            {/*            </TouchableWithoutFeedback>*/}
                            {/*        </View>*/}
                            {/*    </View>*/}
                            {/*    <View style={{*/}
                            {/*        flexDirection: "row",*/}
                            {/*        width: width * 0.94,*/}
                            {/*        marginLeft: width * 0.03,*/}
                            {/*        paddingBottom: 15,*/}
                            {/*        paddingTop: 15,*/}
                            {/*        justifyContent: "space-between",*/}
                            {/*        alignItems: "center"*/}
                            {/*    }}>*/}
                            {/*        <View>*/}
                            {/*            <Text style={styles.text1}>《沙漠骆驼》</Text>*/}
                            {/*            <Text style={styles.text2}>播放量:3172 · 播放时长:3:25</Text>*/}
                            {/*        </View>*/}
                            {/*        <View>*/}
                            {/*            <TouchableWithoutFeedback onPress={() => this.setState({modalVisible: true})}>*/}
                            {/*                <Image source={require('./Images/gengduo.png')}/>*/}
                            {/*            </TouchableWithoutFeedback>*/}
                            {/*        </View>*/}
                            {/*    </View>*/}
                            {/*</View>*/}
                            {/*<View style={styles.lineSty}></View>*/}
                            {/*/!*播放歌曲*!/*/}
                            {/*<View style={styles.getuSty}>*/}
                            {/*    <View style={styles.modalStyChildTlist}>*/}
                            {/*        <View style={{flexDirection: "row"}}>*/}
                            {/*            <View style={styles.modalStyChildT1}>*/}
                            {/*                <Image style={styles.getupian} source={require('./Images/rumen.png')}/>*/}
                            {/*            </View>*/}
                            {/*            <View style={styles.modalStyChildT2}>*/}
                            {/*                <Text style={styles.gequname}>歌曲的名字</Text>*/}
                            {/*                <Text style={styles.gequtime}>16:31</Text>*/}
                            {/*            </View>*/}
                            {/*        </View>*/}
                            {/*        <View style={styles.RighCotinaer}>*/}
                            {/*            <Image source={require('./Images/zanting.png')}/>*/}
                            {/*            <Image source={require('./Images/bofang.png')}/>*/}
                            {/*            <Image source={require('./Images/tanchu.png')}/>*/}
                            {/*        </View>*/}
                            {/*    </View>*/}
                            {/*    /!*列表抬头*!/*/}
                            {/*    <View style={{width: width}}>*/}
                            {/*        <View style={styles.listRight}>*/}
                            {/*            <View style={{flexDirection: "row", paddingRight: 20}}>*/}
                            {/*                <Image source={require('./Images/yijianshoucang.png')}/>*/}
                            {/*                <Text style={{paddingLeft: 7, fontSize: 14, color: "#3A3A3A"}}>收藏全部</Text>*/}
                            {/*            </View>*/}
                            {/*            <Image style={{width: 12, height: 12}} source={require('./Images/shanchu.png')}/>*/}
                            {/*        </View>*/}
                            {/*    </View>*/}
                            {/*    /!*歌曲列表*!/*/}
                            {/*    <View style={styles.listMp3con}>*/}
                            {/*        <View style={styles.listLeft}>*/}
                            {/*            <Text>这里是歌曲的名称</Text>*/}
                            {/*            <View style={styles.listLeftChid2}>*/}
                            {/*                <Image source={require('./Images/quxiaoshoucang.png')}/>*/}
                            {/*                <Image style={{width: 12, height: 12}} source={require('./Images/shanchu.png')}/>*/}
                            {/*            </View>*/}
                            {/*        </View>*/}
                            {/*        <View style={styles.listLeft}>*/}
                            {/*            <Text>这里是歌曲的名称</Text>*/}
                            {/*            <View style={styles.listLeftChid2}>*/}
                            {/*                <Image source={require('./Images/quxiaoshoucang.png')}/>*/}
                            {/*                <Image style={{width: 12, height: 12}} source={require('./Images/shanchu.png')}/>*/}
                            {/*            </View>*/}
                            {/*        </View>*/}
                            {/*        <View style={styles.listLeft}>*/}
                            {/*            <Text>这里是歌曲的名称</Text>*/}
                            {/*            <View style={styles.listLeftChid2}>*/}
                            {/*                <Image source={require('./Images/quxiaoshoucang.png')}/>*/}
                            {/*                <Image style={{width: 12, height: 12}} source={require('./Images/shanchu.png')}/>*/}
                            {/*            </View>*/}
                            {/*        </View>*/}
                            {/*        <View style={styles.listLeft}>*/}
                            {/*            <Text>这里是歌曲的名称</Text>*/}
                            {/*            <View style={styles.listLeftChid2}>*/}
                            {/*                <Image source={require('./Images/quxiaoshoucang.png')}/>*/}
                            {/*                <Image style={{width: 12, height: 12}} source={require('./Images/shanchu.png')}/>*/}
                            {/*            </View>*/}
                            {/*        </View>*/}
                            {/*        <View style={styles.listLeft}>*/}
                            {/*            <Text>这里是歌曲的名称</Text>*/}
                            {/*            <View style={styles.listLeftChid2}>*/}
                            {/*                <Image source={require('./Images/quxiaoshoucang.png')}/>*/}
                            {/*                <Image style={{width: 12, height: 12}} source={require('./Images/shanchu.png')}/>*/}
                            {/*            </View>*/}
                            {/*        </View>*/}
                            {/*        <View style={styles.listLeft}>*/}
                            {/*            <Text>这里是歌曲的名称</Text>*/}
                            {/*            <View style={styles.listLeftChid2}>*/}
                            {/*                <Image source={require('./Images/quxiaoshoucang.png')}/>*/}
                            {/*                <Image style={{width: 12, height: 12}} source={require('./Images/shanchu.png')}/>*/}
                            {/*            </View>*/}
                            {/*        </View>*/}
                            {/*        <View style={styles.listLeft}>*/}
                            {/*            <Text>这里是歌曲的名称</Text>*/}
                            {/*            <View style={styles.listLeftChid2}>*/}
                            {/*                <Image source={require('./Images/quxiaoshoucang.png')}/>*/}
                            {/*                <Image style={{width: 12, height: 12}} source={require('./Images/shanchu.png')}/>*/}
                            {/*            </View>*/}
                            {/*        </View>*/}
                            {/*        <View style={styles.listLeft}>*/}
                            {/*            <Text>这里是歌曲的名称</Text>*/}
                            {/*            <View style={styles.listLeftChid2}>*/}
                            {/*                <Image source={require('./Images/quxiaoshoucang.png')}/>*/}
                            {/*                <Image style={{width: 12, height: 12}} source={require('./Images/shanchu.png')}/>*/}
                            {/*            </View>*/}
                            {/*        </View>*/}
                            {/*        <View style={styles.listLeft}>*/}
                            {/*            <Text>这里是歌曲的名称</Text>*/}
                            {/*            <View style={styles.listLeftChid2}>*/}
                            {/*                <Image source={require('./Images/quxiaoshoucang.png')}/>*/}
                            {/*                <Image style={{width: 12, height: 12}} source={require('./Images/shanchu.png')}/>*/}
                            {/*            </View>*/}
                            {/*        </View>*/}
                            {/*        <View style={styles.listLeft}>*/}
                            {/*            <Text>这里是歌曲的名称</Text>*/}
                            {/*            <View style={styles.listLeftChid2}>*/}
                            {/*                <Image source={require('./Images/quxiaoshoucang.png')}/>*/}
                            {/*                <Image style={{width: 12, height: 12}} source={require('./Images/shanchu.png')}/>*/}
                            {/*            </View>*/}
                            {/*        </View>*/}
                            {/*    </View>*/}
                            {/*</View>*/}
                        </ScrollView>
                    </View>
                </ScrollableTabView>
                <Modal animationType="slide" transparent={true} visible={this.state.modalVisible} onRequestClose={() => {
                    this.onRequestClose();
                }}>
                    <TouchableOpacity activeOpacity={1} style={styles.modalSty5} onPress={() => this.setState({modalVisible: false})}>
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
                <Loading show={this.state.loadingState}></Loading>
            </View>
        );
    }

    gotoDetaile = (item) => {
        console.log(item);
        let state = {
            title: this.state.objText,
            id:item.id
        };
        if (item) {
            this.props.navigation.navigate('TaichiCultureDetailsN',state);
        } else {
            console.log('参数错误');
        }
    }
    switchTab = (obj) => {
        this.setState({
            loadingState: true
        })
        let type = '';
        if (obj.ref.props.tabLabel == "养生文化") {
            type = 1;
            this.setState({
                objText:'养生文化'
            })
        } else if (obj.ref.props.tabLabel == "太极与养生") {
            type = 2;
            this.setState({
                objText:'太极与养生'
            })
        } else if (obj.ref.props.tabLabel == "养生音乐") {
            type = 3;
            this.setState({
                objText:'养生音乐'
            })
        }
        this.getNoticeList2(type, 1, 10)
    }
    // 请求接口
    getNoticeList2 = (type, page, pageSize) => {
        let formData = new FormData();
        let ListArr = [];
        formData.append('type', type);
        formData.append('page', page);
        formData.append('pageSize', pageSize);
        let url = JFAPI.noticeList2;
        console.log(url);
        let opts = {
            method: "POST",
            body: formData
        };
        fetch(url, opts)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                this.setState({
                    loadingState: false
                })
                if (responseData.code == 0) {
                    if (responseData.data.length > 0) {
                        for (let i = 0; i < responseData.data.length; i++) {
                            ListArr.push(responseData.data[i])
                        }
                        this.setState({
                            DataList: ListArr
                        })
                    } else {
                        this.setState({
                            DataList: ''
                        })
                    }
                } else {
                    this.setState({
                        DataList: ListArr
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    componentDidMount() {
        console.log("ios");
        this.getNoticeList2(1, 1, 10)
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
    culturalconMusic: {
        width: width,
        backgroundColor: "#FFFFFF",
        marginTop: 10,
        paddingTop: 10
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
    culturalconChild: {
        flexDirection: "row",
        width: width * 0.94,
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
    getuSty: {
        width: width,
        backgroundColor: "#FFFFFF",
        paddingBottom: 15
    },
    modalSty5: {
        width: width,
        height: height,
        position: "absolute",
        bottom: 0
    },
    modalSty: {
        width: width,
        position: "absolute",
        bottom: 0,
        backgroundColor: "#FFFFFF",
        zIndex: 2,
        paddingBottom: 15
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
    modalStyChildTlist: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 5,
        paddingRight: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
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
    modalStyChildTT: {
        width: width
    },
    modalStyChildTT1: {
        width: width * 0.9,
        flexDirection: "row",
        marginLeft: width * 0.05,
        borderBottomColor: "#DDDDDD",
        borderBottomWidth: 1,
        paddingTop: 10,
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
    RighCotinaer: {
        flexDirection: 'row',
        alignItems: "center",
        width: 100,
        justifyContent: "space-between",
        paddingRight: 5
    },
    lineSty: {
        width: width,
        backgroundColor: "#F3F3F3",
        height: 15
    },
    listRight: {
        width: width * 0.94,
        marginLeft: width * 0.03,
        flexDirection: 'row',
        justifyContent: "flex-end",
        paddingTop: 15,
        paddingBottom: 10,
        paddingRight: 3,
        borderBottomWidth: 1,
        borderBottomColor: "#DDDDDD"
    },
    listMp3con: {
        width: width
    },
    listLeft: {
        width: width * 0.94,
        marginLeft: width * 0.03,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 15,
        paddingBottom: 10,
        borderBottomColor: "#DDDDDD",
        borderBottomWidth: 1
    },
    listLeftChid2: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 50
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
