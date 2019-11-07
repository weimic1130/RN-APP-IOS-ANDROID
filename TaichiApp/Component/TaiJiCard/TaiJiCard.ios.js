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
import global from '../global';
import {createStackNavigator, StackActions, NavigationActions, createAppContainer} from "react-navigation";
import {
    Alert,
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
    Modal,
    ScrollView,
    Animated, FlatList, Picker
} from "react-native";
import {JFAPI} from './API/API';
import Loading from '../LoadingAnimation/LoadingAnimation';
import BlankPages from '../BlankPages/BlankPages';
import AsyncStorage from "@react-native-community/async-storage";
import HTMLView from 'react-native-htmlview';

let {width, height} = Dimensions.get('window');
export default class TaiJiCardIos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingState:false,
            intro: '',
            activeInex: 1,
            address: '',
            userInfo: '',
            catchData: '',
            DetailsData: '',
            MoreState: false,
            // 团成员列表
            gruopList: '',
            // 团动态列表
            groupDynamics: '',
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
            <View style={styles.containerAppboxCard}>
                <ImageBackground style={styles.containerAppboxCardBj} source={require('./Images/nbj.png')}>
                    <ScrollView style={{flex: 1}}>
                        <View style={styles.boxCardChild}>
                            {
                                this.state.DetailsData.img ? <Image style={styles.headImg} source={{uri:global.PicUrl + this.state.DetailsData.img}}/> : null
                            }
                            <View style={styles.boxCardChild1}>
                                <Text style={styles.boxCardChild1Text1}>{this.state.DetailsData.title}</Text>
                            </View>
                        </View>
                        {/*团成员*/}
                        {
                            this.state.gruopList.length > 0 ? <View style={styles.boxCardChild2}>
                                <TouchableWithoutFeedback onPress={() => this.gotoGruopMembers(this.state.DetailsData)}>
                                    <View style={styles.boxCardChild21}>
                                        <View>
                                            <Text style={styles.boxCardChild21Text1}>团成员</Text>
                                        </View>
                                        <View style={styles.boxCardChild212}>
                                            <Text style={styles.boxCardChild21Text2}>{this.state.DetailsData.userNum}人</Text>
                                            <Image source={require('./Images/r.png')}/>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={styles.conncquyu}>
                                    {
                                        this.state.gruopList.length > 0 ? this.state.gruopList.map((item, index) => {
                                            return (
                                                <View key={index} style={styles.topicItemCar}>
                                                    <Image style={styles.headerImgSize} source={{uri: global.PicUrl + item.headUrl}}/>
                                                    <Text style={styles.TextNick}>{item.nickName}</Text>
                                                </View>
                                            )
                                        }) : null
                                    }
                                </View>
                            </View> : null
                        }
                        {/*地址*/}
                        <View style={styles.boxCardChild2}>
                            <View style={styles.boxCardChild213}>
                                <View style={styles.boxCardChild2131}>
                                    <Text style={styles.boxCardChild2131Text}>地址：</Text>
                                    <Text style={styles.boxCardChild2131Text1}>{this.state.address}</Text>
                                </View>
                            </View>
                            <View style={styles.boxCardChild214}>
                                <View style={{flexDirection: "row"}}>
                                    <Text style={{lineHeight: 18, color: "#8C7A6E", fontSize: 13}}>简介：{this.state.intro}</Text>
                                </View>
                            </View>
                        </View>
                        {/*团动态*/}
                        {
                            this.state.groupDynamics.length > 0 ? <View style={styles.boxCardChild2}>
                                <View style={styles.boxCardChild213}>
                                    <View style={styles.boxCardChild2131}>
                                        <Text style={styles.boxCardChild2131Text}>团动态</Text>
                                    </View>
                                </View>
                                {/*列表*/}
                                <View style={styles.boxCardChild215}>
                                    {
                                        this.state.groupDynamics.length > 0 ? this.state.groupDynamics.map((item, index) => {
                                            return (
                                                <View style={styles.liebListsyt}>
                                                    <View style={styles.boxCardChild2151}>
                                                        {
                                                            item.imgList ? <Image style={styles.hederImgS} source={{uri: global.PicUrl + item.imgList[0]}}/> :
                                                                <Image style={styles.hederImgS} source={require('./Images/bj.png')}/>
                                                        }
                                                        <View>
                                                            <Text style={styles.lzdsadText1}>{item.name}</Text>
                                                            <Text style={styles.lzdsadText2}>{this.timestampChangeData(item.createTime)}</Text>
                                                        </View>
                                                    </View>
                                                    <HTMLView style={styles.boxCardChild2152} value={item.content}/>
                                                    <View style={styles.boxCardChild2153}>
                                                        <View style={styles.boxCardChild21531}>
                                                            <Image source={require('./Images/dianzan.png')}/>
                                                            <Text style={styles.boxCardChild21531Text}>{item.clickNum}</Text>
                                                        </View>
                                                        <View style={styles.boxCardChild21532}>
                                                            <Image source={require('./Images/huifu.png')}/>
                                                            <Text style={styles.boxCardChild21531Text}>{item.virCollectNum}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        }) : null
                                    }
                                </View>
                            </View> : null
                        }
                    </ScrollView>
                    {
                        this.backButton(this.state.DetailsData.userStatus)
                    }
                    {/*更多*/}
                    {/*<Modal animationType="slide" transparent={true} visible={this.state.MoreState} onRequestClose={() => {*/}
                    {/*    this.onRequestClose();*/}
                    {/*}}>*/}
                    <Modal animationType="slide" transparent={true} visible={this.state.MoreState} onRequestClose={() => {
                        this.onRequestClose();
                    }}>
                        <View style={styles.PickerSty}>
                            <TouchableWithoutFeedback onPress={() => this.closeMore()}>
                                <View style={styles.bianjiA}>
                                    <Text style={{color: "#282828", fontSize: 15}}>编辑</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.closeMore()}>
                                <View style={styles.tuichgt}>
                                    <Text style={{color: "#D61717", fontSize: 15}}>退出该团</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </Modal>
                    {
                        this.state.MoreState ? <TouchableWithoutFeedback onPress={() => this.closeMore()}><View style={styles.blackDemo}></View></TouchableWithoutFeedback> : null
                    }
                    <Loading show={this.state.loadingState} />
                </ImageBackground>
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
    renderTopicItem = ({item}) => {
        return (
            <View style={styles.topicItemCar}>
                <Image style={styles.headerImgSize} source={require('./Images/tx.jpg')}/>
                <Text style={styles.TextNick}>昵称</Text>
            </View>
        )
    }
    // 申请加入太极团
    joinTaichigroup = (groupsId, userId) => {
        console.log('加入太极团');
        let url = JFAPI.joinTaichi;
        let formData = new FormData();
        formData.append('groupsId', groupsId);
        formData.append('userId', userId);
        let opts = {
            body: formData,
            method: "POST"
        }
        console.log(url);
        console.log(opts);
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.code == 0) {
                    this.getDetails(this.props.navigation.state.params.data.id, this.state.userInfo.id);
                    this.getuserList(this.props.navigation.state.params.data.id);
                } else if (res.code == -1) {
                    Alert.alert(res.info)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    onRequestClose() {
        this.setState({
            MoreState: false
        })
    }

    // 打开更多
    openMore() {
        this.setState({
            MoreState: true
        })
    }

    closeMore() {
        console.log("关闭");
        this.setState({
            MoreState: false
        })
    }

    // 获取详情
    getDetails = (groupsId, userId) => {
        let url = JFAPI.groutGetInfo;
        let formData = new FormData();
        formData.append('groupsId', groupsId);
        formData.append('userId', userId);
        let opts = {
            body: formData,
            method: "POST"
        };
        console.log(url);
        console.log(opts);
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log('团详情', res);
                if (res.code == 0) {
                    if(res.data.address == '' || res.data.address == 'undefined'){
                        this.setState({
                            address:''
                        })
                    }else{
                        this.setState({
                            address:res.data.address
                        })
                    }
                    this.setState({
                        intro: res.data.intro,
                        DetailsData: res.data
                    })
                } else {
                    this.setState({
                        address: '无',
                        intro: "无"
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    address: '无',
                    intro: '无'
                })
            })
    }
    // 底部按钮状态
    backButton = (status) => {
        //status 0(未加入) 1(已加入) 2(群主)
        switch (status) {
            case 0:
                return (
                    <TouchableWithoutFeedback onPress={() => this.joinTaichigroup(this.state.DetailsData.id, this.state.userInfo.id)}>
                        <View style={styles.sqjranniu}>
                            <Text style={styles.sqjrtext}>申请加入</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )
                break;
            case 1:
                return (
                    <TouchableWithoutFeedback onPress={() => this.exitTaichigroup(this.state.DetailsData.id, this.state.userInfo.id)}>
                        <View style={styles.sqjranniu}>
                            <Text style={styles.sqjrtext}>退出</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )
                break;
            case 2:
                return (
                    <TouchableWithoutFeedback onPress={() => this.dissolution(this.state.DetailsData,this.state.userInfo)}>
                        <View style={styles.sqjranniu}>
                            <Text style={styles.sqjrtext}>解散</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )
                break;
            default:
                return (
                    <TouchableWithoutFeedback onPress={() => this.joinTaichigroup(this.state.DetailsData.id, this.state.userInfo.id)}>
                        <View style={styles.sqjranniu}>
                            <Text style={styles.sqjrtext}>申请加入</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )
        }
    }
    // 确认解散
    confimDissolution = (item1,item2) => {
        let self = this;
        self.setState({
            loadingState:true
        })
        let url = JFAPI.dissolveGroups;
        let formData = new FormData();
        formData.append('groupsId',item1.id);
        formData.append('userId',item2.id);
        let opts = {
            body:formData,
            method:"POST"
        };
        fetch(url,opts)
            .then((response) => response.json())
            .then((res) => {
                self.setState({
                    loadingState:false
                })
                console.log(res);
                if(res.code == 0){
                    this.props.navigation.goBack();
                    this.props.navigation.state.params.arefresh();
                }else{
                    this.props.navigation.goBack();
                    this.props.navigation.state.params.arefresh();
                }
            })
            .catch((err) => {
                console.log(err);
                self.setState({
                    loadingState:false
                })
                this.props.navigation.goBack();
                this.props.navigation.state.params.arefresh();
            })
    }
    dissolution = (item1,item2) => {
        Alert.alert(
            '提示',
            '是否要解散该团?',
            [
                {text: '取消'},
                {text: "确定", onPress: () => this.confimDissolution(item1,item2)}
            ]
        );

    }    // 团动态列表
    getforumList = (userId, type, page, length) => {
        let url = JFAPI.getForumList;
        let formData = new FormData();
        formData.append('userId', userId);
        formData.append('type', type);
        formData.append('page', page);
        formData.append('length', length);
        let opts = {
            body: formData,
            method: "POST"
        }
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                // console.log('团动态列表', res);
                if (res.code == 0) {
                    if (res.data.length > 0) {
                        this.setState({
                            groupDynamics: res.data
                        })
                    } else {
                        this.setState({
                            groupDynamics: ''
                        })
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    groupDynamics: ''
                })
            })
    }
    // 前往图成员列表
    gotoGruopMembers = (item) => {
        let self = this;
        console.log('前往团成员列表');
        let parameter = {
            data: item,
            refresh:function(){
                self.getuserList(self.props.navigation.state.params.data.id);
                self.getDetails(self.props.navigation.state.params.data.id, self.state.userInfo.id);
            }
        };
        this.props.navigation.navigate('GroupMembersN', parameter);
    }
    // 团成员列表
    getuserList = (id) => {
        console.log("移除刷新");
        let url = JFAPI.getUserList;
        let formData = new FormData();
        formData.append('id', id);
        let opts = {
            body: formData,
            method: "POST"
        }
        console.log(url);
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log('团成员列表', res);
                if (res.code == 0) {
                    if (res.data.length > 0) {
                        this.setState({
                            gruopList: res.data
                        })
                    } else {
                        this.setState({
                            gruopList: ''
                        })
                    }
                } else {
                    this.setState({
                        gruopList: ''
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    gruopList: ''
                })
            })
    }
    // 退出团
    confimTaichiGriup = (groupsId,userId) => {
        let url = JFAPI.quitGroup;
        let formData = new FormData();
        formData.append('groupsId', groupsId);
        formData.append('userId', userId);
        let opts = {
            body: formData,
            method: "POST"
        }
        console.log(url);
        console.log(opts);
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.code == 0) {
                    this.getDetails(this.props.navigation.state.params.data.id, this.state.userInfo.id);
                    this.getuserList(this.props.navigation.state.params.data.id);
                } else if (res.code == -1) {
                    Alert.alert(res.info)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    // quitGroup
    exitTaichigroup = (item1, item2) => {
        Alert.alert(
            '提示',
            '是否要退出该团?',
            [
                {text: '取消'},
                {text: "确定", onPress: () => this.confimTaichiGriup(item1,item2)}
            ]
        );
    }
    componentDidMount() {
        console.log('ios');
        this.setState({
            catchData: this.props.navigation.state.params.data
        })
        this.getuserList(this.props.navigation.state.params.data.id);
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result)
                })
                this.getforumList(this.state.userInfo.id, 2, 1, 10)
                this.getDetails(this.props.navigation.state.params.data.id, this.state.userInfo.id);
            }).catch(error => {
            console.log(error);
            console.log("读取失败");
        })
    }

}

const styles = StyleSheet.create({
    containerAppboxCard: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F5F4F3"
    },
    containerAppboxCardBj: {
        flex: 1,
        width: width,
        alignItems: "center"
    },
    boxCardChild: {
        paddingTop: 20,
        alignItems: "center"
    },
    boxCardChild3: {
        width: width * 0.9,
        flexDirection: "row",
        paddingTop: 15,
        paddingBottom: 15,
        justifyContent: "space-around",
        backgroundColor: "#FFFFFF",
        marginTop: 15,
        shadowColor: "#DDDDDD",
        shadowOpacity: 0.5,
        shadowRadius: 8
    },
    boxCardChild4: {
        width: width * 0.9,
        paddingBottom: 15,
        backgroundColor: "#FFFFFF"
    },
    headImg: {
        width: 80,
        height: 80,
        borderRadius: 20
    },
    boxCardChild1: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10
    },
    boxCardChild1Text1: {
        fontSize: 19,
        color: "#323232",
        fontWeight: "bold"
    },
    boxCardChild1Text2: {
        color: "#8A6246",
        fontSize: 14,
        fontWeight: "bold",
        paddingTop: 10
    },
    boxCardChild2: {
        width: width * 0.9,
        backgroundColor: "#FFFFFF",
        marginTop: 15,
        alignItems: "center",
        paddingTop: 10
    },
    boxCardChild213: {
        flexDirection: "row",
        width: "94%",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "#EAEAEA",
        borderBottomWidth: 1,
        paddingBottom: 12
    },
    boxCardChild214: {
        flexDirection: "row",
        width: "94%",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 12,
        paddingTop: 10
    },
    boxCardChild215: {
        flexDirection: "row",
        width: "94%",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 12,
        flexWrap: "wrap"
    },
    boxCardChild21: {
        flexDirection: "row",
        width: "94%",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "#EAEAEA",
        borderBottomWidth: 1,
        paddingBottom: 12
    },
    sqjranniu: {
        flexDirection: "row",
        width: width * 0.94,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#8A6246",
        height: 50,
        marginBottom: 10
    },
    sqjrtext: {
        fontSize: 18,
        color: "#FFFFFF"
    },
    boxCardChild212: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    boxCardChild21Text1: {
        color: "#282828",
        fontSize: 14
    },
    boxCardChild21Text2: {
        color: "#B2B2B2",
        fontSize: 14,
        paddingRight: 8
    },
    topicItemCar: {
        width: width * 0.2,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 10
    },
    TextNick: {
        color: "#B2B2B2",
        fontSize: 13,
        paddingTop: 7,
        paddingBottom: 10
    },
    headerImgSize: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    boxCardChild2131: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"center"
    },
    boxCardChild2131Text: {
        color: "#B2B2B2",
        fontSize: 13
    },
    boxCardChild2131Text1: {
        color: "#282828",
        fontSize: 13
    },
    conncquyu: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: "row",
        width: width * 0.9
    },
    boxCardChild2151: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10
    },
    boxCardChild2152: {
        flexDirection: "row",
        marginTop: 10
    },
    boxCardChild2153: {
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "flex-end"
    },
    hederImgS: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    lzdsadText1: {
        color: "#757575",
        fontSize: 14,
        paddingLeft: 8,
        paddingBottom: 8
    },
    lzdsadText2: {
        color: "#B2B2B2",
        fontSize: 11,
        paddingLeft: 8
    },
    ufsnq: {
        color: "#282828",
        fontSize: 14
    },
    boxCardChild21531: {
        flexDirection: "row",
        paddingRight: 15,
        alignItems: "center"
    },
    boxCardChild21532: {
        flexDirection: "row",
        alignItems: "center"
    },
    boxCardChild21531Text: {
        color: "#B2B2B2",
        fontSize: 13,
        paddingLeft: 8
    },
    liebListsyt: {
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        paddingBottom: 10,
        paddingTop: 5
    },
    PickerSty: {
        width: width,
        position: "absolute",
        bottom: 0,
        backgroundColor: "#ffffff",
        borderColor: "#dddddd",
        borderTopWidth: 1,
        zIndex: 12,
        paddingTop: 15,
        paddingBottom: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    bianjiA: {
        width: "90%",
        paddingTop: 5,
        paddingBottom: 10,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#DDDDDD"
    },
    tuichgt: {
        width: "90%",
        paddingTop: 15,
        paddingBottom: 10,
        alignItems: "center"
    },
    blackDemo: {
        width: width,
        height: height,
        backgroundColor: "#000000",
        opacity: 0.5,
        position: "absolute",
        bottom: 0
    }
});
