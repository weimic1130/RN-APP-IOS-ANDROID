/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createStackNavigator, StackActions, NavigationActions, createAppContainer} from "react-navigation";
import {
    ART,
    Alert,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Button,
    Platform,
    Image,
    ImageBackground,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-community/async-storage';
import HTMLView from 'react-native-htmlview';
import global from '../global';
// icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {JFAPI} from './API/API';
import Loading from '../LoadingAnimation/LoadingAnimation';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import PageListView from "react-native-page-listview";
import BlankPages from '../BlankPages/BlankPages';

let self = this;

export default class CarefreeBBSAndroid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slideshowArr: '',
            selectedItem: "",
            userInfo: '',
            // 论坛动态列表
            bbsList: '',
            // 太极团列表
            groupList: '',
            inputState: false,
            comment: "",
            loadingState: true,
            topic: [
                {
                    title: '非洲第一部落',
                    describe: '8192人',
                }
            ]
        }
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: '悠然论坛',
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        headerRight: (
            <TouchableWithoutFeedback onPress={() => navigation.state.params.gotoHTgroup(self)}>
                <View style={{width: 85}}>
                    <Text style={styles.naviGateSty}>发帖</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    })

    // 发帖
    GotoCreate = () => {
        let self = this;
        this.props.navigation.navigate('PostingPageN', {
            arefresh: function () {
                self.getbbsList(self.state.userInfo.id, 1, 1, 10);
            }
        });
        console.log("跳转发帖界面");
    }
    // 更多
    gotoMore = () => {
        let self = this;
        this.props.navigation.navigate('TaichigroupMoreN', {
            refresh: function () {
                self.getgroupList(self.state.userInfo.id, 1, 10);
            }
        });
    }
    // 太极团
    renderTopicItem = ({item}) => {
        return (
            <View style={styles.topicItem}>
                <Image style={styles.topicImg} source={{uri: item.img}}/>
                <View style={styles.topicContainer}>
                    <View style={styles.topicText}>
                        <Text style={styles.topicTitle} ellipsizeMode={'tail'} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.topicDesc}>{item.describe}人</Text>
                    </View>
                </View>
            </View>
        )
    }
    gotoCommentDetails = (item) => {
        console.log(item);
        let parameter = {
            data: item
        };
        this.props.navigation.navigate('CommentDetaileN', parameter);
    }
    // 点赞
    giveLike = (item) => {
        console.log(item);
        let url = JFAPI.clickBBS;
        let formData = new FormData();
        formData.append('userId', this.state.userInfo.id);
        formData.append('forumId', item.id);
        let opts = {
            body: formData,
            method: "POST"
        };
        console.log(opts);
        console.log(url);
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.code == 0) {
                    this.getbbsList(this.state.userInfo.id, 1, 1, 10);
                } else {
                    this.getbbsList(this.state.userInfo.id, 1, 1, 10);
                }
            })
            .catch((err) => {
                this.getbbsList(this.state.userInfo.id, 1, 1, 10);
                console.log(err);
            })
    }
    // 评论
    writeComment = (item) => {
        console.log(item);
        this.setState({
            inputState: true,
            selectedItem: item
        })
    }
    saveComments = () => {
        let item = this.state.selectedItem;
        console.log(this.state.selectedItem);
        if (this.state.comment == '') {
            Alert.alert('请输入要评论的内容');
            return;
        }
        let url = JFAPI.comment;
        let formData = new FormData();
        formData.append('userId', this.state.userInfo.id);
        formData.append('targetId', item.id);
        formData.append('comment', this.state.comment);
        formData.append('type', 10);
        let opts = {
            body: formData,
            method: "POST"
        };
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.code == 0) {
                    this.setState({
                        inputState: false
                    })
                    this.getbbsList(this.state.userInfo.id, 1, 1, 10);
                } else {
                    this.setState({
                        inputState: false
                    })
                    this.getbbsList(this.state.userInfo.id, 1, 1, 10);
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    inputState: false
                })
                this.getbbsList(this.state.userInfo.id, 1, 1, 10);
            })
    }

    // 通知消息
    gotoMessage() {
        let self = this;
        let navigate = self.props.navigation.navigate;
        navigate('MessageN');
    }

    closeInput = () => {
        this.setState({
            inputState: false
        })
    }
    // 论坛动态列表
    getbbsList = (userId, type, page, length) => {
        let url = JFAPI.forumlist;
        let formData = new FormData();
        formData.append('userId', userId);
        formData.append('type', type);
        formData.append('page', page);
        formData.append('length', length);
        let opts = {
            body: formData,
            method: "POST"
        };
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                if (res.code == 0) {
                    if (res.data.length > 0) {
                        this.setState({
                            bbsList: res.data
                        })
                    }
                }
                console.log('论坛动态列表', res);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    // 太极团列表
    getgroupList = (userId, page, length) => {
        let url = JFAPI.GetAllList;
        let formData = new FormData();
        formData.append('userId', userId);
        formData.append('page', page);
        formData.append('length', length);
        let opts = {
            body: formData,
            method: "POST"
        };
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log('太极团', res);
                if (res.code == 0) {
                    if (res.data.length > 0) {
                        let arrAy = []
                        // topic
                        for (let i = 0; i < res.data.length; i++) {
                            arrAy.push(
                                {
                                    title: res.data[i].title,
                                    describe: res.data[i].num,
                                    status: res.data[i].status,
                                    intro: res.data[i].intro,
                                    img: res.data[i].img,
                                    id: res.data[i].id,
                                    distanceStr: res.data[i].distanceStr
                                }
                            )
                        }
                        this.setState({
                            topic: arrAy,
                            groupList: res.data
                        })
                    } else {
                        this.setState({
                            groupList: ''
                        })
                    }
                }
            })
            .catch((err) => {
                this.setState({
                    groupList: ''
                })
                console.log(err);
            })
    }

    // 请求页面接口
    componentDidMount() {
        let self = this;
        this.props.navigation.setParams({navigatePress: this.gotoMessage})
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result)
                })
                this.getbbsList(this.state.userInfo.id, 1, 1, 10);
                this.getgroupList(this.state.userInfo.id, 1, 20)
            }).catch(error => {
            console.log("读取失败");
        })
        setTimeout(() => {
            self.setState({
                loadingState: false
            })
        }, 1000)
        // 注册自定义导航右侧点击事件
        this.props.navigation.setParams({
            gotoHTgroup: this.GotoCreate
        })
    }

    componentWillMount() {
    }

    refresh = (callBack) => {
        setTimeout(() => {
            let url = JFAPI.forumlist;
            fetch(url + "?page=1&length=5&userType=1&userId=" + this.state.userInfo.id)
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);
                    //根据接口返回结果得到数据数组
                    let arr = responseData.data;
                    callBack(arr);
                });
        }, 500)
    }
    // 上拉加载更多
    loadMore = (page, callBack) => {
        setTimeout(() => {
            let url = JFAPI.forumlist;
            fetch(url + "?page=" + page + "&length=5&userType=1&userId=" + this.state.userInfo.id)
                .then((response) => response.json())
                .then((responseData) => {
                    //根据接口返回结果得到数据数组
                    let arr = responseData.data;
                    callBack(arr);
                });
        }, 500)
    }
    // 展示的数据源
    renderRow = (item, index) => {
        return (
            <View key={index} style={{borderBottomWidth: 1, borderBottomColor: "#DDDDDD"}}>
                <View style={styles.txncqy}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        {
                            item.imgList ? <Image style={styles.bbsLtImgu}
                                                  source={{uri: "https://taijiqiu.oss-cn-hangzhou.aliyuncs.com/" + item.imgList[0]}}/> :
                                <Image style={styles.bbsLtImgu} source={require('./Images/rumen.png')}/>
                        }
                        <View style={styles.txncqyPar}>
                            <View style={styles.txncqyChi}>
                                <Text style={styles.txncqyChiText1}>{item.name}</Text>
                                {
                                    item.laberName ? <View style={styles.txncqyChiText2}>
                                        <Text style={styles.txncqyChiText2C}>{item.laberName}</Text>
                                    </View> : null
                                }
                            </View>
                        </View>
                    </View>
                    <View style={styles.txncqy3}>
                        {
                            item.clickStatus == 1 ? <TouchableWithoutFeedback>
                                    <View style={styles.txncqy31}>
                                        <Image style={{width: 15, height: 16}} source={require('./Images/dianzan2.png')}/>
                                        <Text style={styles.txncqy31Text}>点赞</Text>
                                    </View>
                                </TouchableWithoutFeedback> :
                                <TouchableWithoutFeedback onPress={() => this.giveLike(item)}>
                                    <View style={styles.txncqy31}>
                                        <Image style={{width: 15, height: 16}}
                                               source={require('./Images/dianzan.png')}/>
                                        <Text style={styles.txncqy31Text}>点赞</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                        }
                        <TouchableWithoutFeedback onPress={() => this.gotoCommentDetails(item)}>
                            <View style={styles.txncqy32}>
                                <Image style={{width: 17, height: 16}} source={require('./Images/huifu.png')}/>
                                <Text style={styles.txncqy31Text}>评论</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={styles.txncqy2}>
                    {
                        item.content ? <Text style={{paddingBottom: 8}}>{item.content}</Text> : null
                    }
                    {
                        item.imgList ? <TouchableWithoutFeedback onPress={() => this.gotoCommentDetails(item)}>
                            <View style={{width: width, height: 200}}>
                                <Image source={{uri: global.PicUrl + item.imgList[0]}} style={[styles.img]}/>
                            </View>
                            {/*<View>*/}
                            {/*    <HTMLView style={styles.txncqy2} value={item.content}/>*/}
                            {/*</View>*/}
                        </TouchableWithoutFeedback> : null
                    }
                </View>
            </View>
        )
    }
    // 数据为空时要展示的界面
    renderEmpty = () => {
        return (
            <BlankPages width={width} height={height} justify={'center'} align={'center'}/>
        )
    }

    render() {
        return (
            <View style={styles.containerAppCare}>
                <View style={{width: width, flex: 1}}>
                    {/*太极团*/}
                    {/*{*/}
                    {/*    this.state.groupList.length > 0 ? <View style={{height: height * 0.35}}>*/}
                    {/*        <View style={{width: '100%', backgroundColor: "#FFFFFF"}}>*/}
                    {/*            <TouchableWithoutFeedback onPress={() => this.gotoMore()}>*/}
                    {/*                <View style={styles.msmjRm}>*/}
                    {/*                    <View style={styles.msmjChild}>*/}
                    {/*                        <Text style={styles.msmjChildL}>太极团</Text>*/}
                    {/*                    </View>*/}
                    {/*                    <View style={styles.msmjChild}>*/}
                    {/*                        <Text style={styles.msmjChildR}>更多</Text>*/}
                    {/*                        <Image source={require('./Images/left.png')}/>*/}
                    {/*                    </View>*/}
                    {/*                </View>*/}
                    {/*            </TouchableWithoutFeedback>*/}
                    {/*        </View>*/}
                    {/*        <FlatList*/}
                    {/*            style={{backgroundColor: "#FFFFFF"}}*/}
                    {/*            data={this.state.topic}*/}
                    {/*            keyExtractor={(item, index) => index.toString()}*/}
                    {/*            renderItem={this.renderTopicItem}*/}
                    {/*            horizontal={true}*/}
                    {/*            showsHorizontalScrollIndicator={false}*/}
                    {/*        />*/}
                    {/*    </View> : null*/}
                    {/*}*/}
                    {/*论坛动态*/}
                    <View style={{width: '100%', height: height * 0.95, backgroundColor: "#FFFFFF"}}>
                        <View style={styles.ltmsmjRm}>
                            <View style={styles.msmjChild}>
                                <Text style={styles.msmjChildL}>论坛动态</Text>
                            </View>
                        </View>
                        <PageListView
                            pageLen={5}
                            refresh={this.refresh}
                            renderRow={this.renderRow}
                            loadMore={this.loadMore}
                            renderEmpty={this.renderEmpty}
                        />
                    </View>
                </View>
                {/*评论输入框*/}
                {
                    this.state.inputState ? <View style={styles.box}>
                        <TextInput onChangeText={(text) => this.setState({comment: text})}
                                   onBlur={() => this.setState({inputState: false})} autoFocus={this.state.inputState}
                                   ref="input"
                                   style={styles.input} placeholderTextColor='#999999' placeholder={'评论内容'}
                                   underlineColorAndroid="transparent"/>
                        <TouchableWithoutFeedback onPress={() => this.saveComments()}>
                            <Image style={styles.fasImgurl} source={require('./Images/6.png')}/>
                        </TouchableWithoutFeedback>
                    </View> : null
                }
                <Loading show={this.state.loadingState}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    naviGateSty: {
        color: "#FFFFFF",
        paddingRight: 15,
        textAlign: "right"
    },
    containerAppCare: {
        flex: 1,
        backgroundColor: '#F3F3F3',
        alignItems: 'center'
    },
    bxContea: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#D6B6A0",
        backgroundColor: "#FAF7F4",
        marginBottom: 10,
        paddingTop: 7,
        paddingBottom: 7
    },
    ltmsmjRm: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 15,
        paddingLeft: 8,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#DDDDDD",
        paddingBottom: 10
    },
    msmjRm: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: width * 0.94,
        marginLeft: width * 0.03,
        paddingTop: 15,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#DDDDDD",
        paddingBottom: 10
    },
    msmjChild: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 8,
        paddingRight: 8
    },
    msmjChildL: {
        paddingLeft: 4,
        fontSize: 17
    },
    msmjChildR: {
        paddingRight: 4,
        fontSize: 13,
        color: "#B2B2B2"
    },
    topic: {
        width: width,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 10,
        marginBottom: 10,
    },
    topicItem: {
        width: width * 0.25,
        marginLeft: 15,
        backgroundColor: "#FFFFFF",
        marginTop: 15,
        marginBottom: 15,
        alignItems: "center"
    },
    topicImg: {
        width: '100%',
        height: 90,
        borderColor: '#cdcdcd',
        borderRadius: 2,
    },
    topicContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    topicTitle: {
        fontSize: 13,
        color: '#282828',
        paddingRight: 5,
        paddingLeft: 5
    },
    topicDesc: {
        fontSize: 13,
        color: '#B2B2B2',
        marginTop: 3,
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 5,
        textAlign: "center"
    },
    topicText: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    remenzhugti: {
        width: width * 0.9,
        marginLeft: width * 0.05,
        backgroundColor: "#FFFFFF",
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    remenzhugtiChid: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: width * 0.86,
        marginLeft: width * 0.02,
        borderBottomColor: "#DDDDDD",
        borderBottomWidth: 1,
        paddingBottom: 8
    },
    remenzhugtiChid1: {
        flexDirection: "row",
        alignItems: "center"
    },
    remenzhugtiChidText: {
        fontSize: 16,
        color: "#282828"
    },
    tjqqy: {
        width: 95,
        color: "#8A6246",
        textAlign: "center"
    },
    remenzhugtiChid11: {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
        width: width * 0.86,
        marginLeft: width * 0.02,
        marginTop: 15,
    },
    bbsLtImgu: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 10
    },
    txncqy: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 10,
        paddingBottom: 10
    },
    txncqy2: {
        paddingTop: 5,
        paddingBottom: 10,
        justifyContent: "space-between",
        width: "90%",
        marginLeft: "5%"
    },
    txncqy3: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    txncqy31: {
        alignItems: "center",
        justifyContent: "center",
        width: 50
    },
    txncqy32: {
        alignItems: "center",
        justifyContent: "center",
        width: 50
    },
    txncqy31Text: {
        color: "#757575",
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 11
    },
    txncqyPar: {
        justifyContent: "space-around"
    },
    txncqyChi: {
        paddingLeft: 8,
        flexDirection: 'row'
    },
    txncqyChiText1: {
        color: "#282828",
        fontSize: 14
    },
    txncqyChiText2: {
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 2,
        paddingBottom: 2,
        backgroundColor: "#B98A69",
        color: "#FFFFFF",
        marginLeft: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#B98A69"
    },
    txncqyChiText3: {
        color: "#B2B2B2",
        fontSize: 12
    },
    txncqyChi1: {
        paddingLeft: 8
    },
    txncqyChiText2C: {
        fontSize: 10,
        color: "#FFFFFF"
    },
    quecnsoa1: {
        marginLeft: 10,
        color: "#767676",
        fontSize: 14
    },
    queysikmhg: {
        width: "94%",
        marginLeft: "3%",
        marginTop: 10,
        height: 170
    },
    lineSyCar: {
        width: width,
        backgroundColor: "#F3F3F3",
        height: 10
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
    },
    img: {
        width: "90%",
        height: 200,
    }
});
