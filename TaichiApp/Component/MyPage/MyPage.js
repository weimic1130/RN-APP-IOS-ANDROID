/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
// icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import global from '../global';
import { JFAPI } from './API/API';
import { createStackNavigator, StackActions, NavigationActions, createAppContainer } from "react-navigation";
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
    Animated, Alert
} from "react-native";
import OrderManagementPage from "../OrderManagement/OrderManagement";
import AsyncStorage from "@react-native-community/async-storage";

let { width, height } = Dimensions.get('window');
export default class MyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: '',
            headUrl: '',
            nickName: '',
            UserData: ''
        }
    }

    static navigationOptions = {
        headerTitle: '我的',
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
            <View style={styles.containerAppMypage}>
                <ScrollView keyboardShouldPersistTaps="always" style={{ flex: 1, marginBottom: 70 }}>
                    {/*顶部头像区域*/}
                    <View style={styles.MypageChild}>
                        <View style={styles.MypageChild1}>
                            {
                                this.state.userInfo ? <View>
                                    <Image style={styles.mypageHeader}
                                        source={this.state.headUrl ? { uri: global.PicUrl + this.state.headUrl } : require('./Images/tx.jpg')} />
                                </View> : null
                            }
                            <View style={styles.pagechild2}>
                                <Text style={styles.mypgaetext1}>{this.state.userInfo ? this.state.nickName : ''}</Text>
                                {/*<Text style={styles.mypgaetext2}>ID：20239477</Text>*/}
                                <View style={styles.pagecontainer}>
                                    {
                                        this.lessonTypeText(this.state.userInfo.level)
                                    }
                                </View>
                            </View>
                        </View>
                        <TouchableWithoutFeedback onPress={() => this.gotoPerson()}>
                            <View>
                                <Image source={require('./Images/15.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    {/*导航区域1*/}
                    <View style={styles.pageChild}>
                        {/*太极团*/}
                        {/*<TouchableWithoutFeedback onPress={() => this.gotoMytaichi()}>*/}
                        {/*    <View style={styles.pageChild3}>*/}
                        {/*        <View style={styles.pageChild31}>*/}
                        {/*            <View style={styles.pageChild311}>*/}
                        {/*                <Image source={require('./Images/13.png')} />*/}
                        {/*            </View>*/}
                        {/*            <Text style={styles.pageText1}>我的太极团</Text>*/}
                        {/*        </View>*/}
                        {/*        <View>*/}
                        {/*            <Image source={require('./Images/11.png')} />*/}
                        {/*        </View>*/}
                        {/*    </View>*/}
                        {/*</TouchableWithoutFeedback>*/}
                        <View style={styles.linsStypage}></View>
                        {/*我的留言*/}
                        {/*<View style={styles.pageChild3}>*/}
                        {/*    <View style={styles.pageChild31}>*/}
                        {/*        <View style={styles.pageChild311}>*/}
                        {/*            <Image source={require('./Images/9.png')}/>*/}
                        {/*        </View>*/}
                        {/*        <Text style={styles.pageText1}>我的留言</Text>*/}
                        {/*    </View>*/}
                        {/*    <View>*/}
                        {/*        <Image source={require('./Images/11.png')}/>*/}
                        {/*    </View>*/}
                        {/*</View>*/}
                        {/*<View style={styles.linsStypage}></View>*/}
                        {/*我的钱包*/}
                        {/*<View style={styles.pageChild3}>*/}
                        {/*    <View style={styles.pageChild31}>*/}
                        {/*        <View style={styles.pageChild311}>*/}
                        {/*            <Image source={require('./Images/5.png')}/>*/}
                        {/*        </View>*/}
                        {/*        <Text style={styles.pageText1}>我的钱包</Text>*/}
                        {/*    </View>*/}
                        {/*    <View>*/}
                        {/*        <Image source={require('./Images/11.png')}/>*/}
                        {/*    </View>*/}
                        {/*</View>*/}
                        {/*<View style={styles.linsStypage}></View>*/}
                        {/*会员*/}
                        <TouchableWithoutFeedback onPress={() => this.gotoShopping('MymemberN')}>
                            <View style={styles.pageChild3}>
                                <View style={styles.pageChild31}>
                                    <View style={styles.pageChild311}>
                                        <Image source={require('./Images/10.png')} />
                                    </View>
                                    <Text style={styles.pageText1}>我的会员</Text>
                                </View>
                                <View>
                                    <Image source={require('./Images/11.png')} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.linsStypage}></View>
                        {/*收藏*/}
                        {/*<View style={styles.pageChild3}>*/}
                        {/*    <View style={styles.pageChild31}>*/}
                        {/*        <View style={styles.pageChild311}>*/}
                        {/*            <Image source={require('./Images/12.png')}/>*/}
                        {/*        </View>*/}
                        {/*        <Text style={styles.pageText1}>我的收藏</Text>*/}
                        {/*    </View>*/}
                        {/*    <View>*/}
                        {/*        <Image source={require('./Images/11.png')}/>*/}
                        {/*    </View>*/}
                        {/*</View>*/}
                        {/*<View style={styles.linsStypage}></View>*/}
                        {/*发布*/}
                        {/*IreleasedN*/}
                        <TouchableWithoutFeedback onPress={() => this.gotoShopping('IreleasedN')}>
                            <View style={styles.pageChild3}>
                                <View style={styles.pageChild31}>
                                    <View style={styles.pageChild311}>
                                        <Image source={require('./Images/7.png')} />
                                    </View>
                                    <Text style={styles.pageText1}>我的发布</Text>
                                </View>
                                <View>
                                    <Image source={require('./Images/11.png')} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    {/*导航区域2*/}
                    <View style={styles.pageChild4}>
                        {/*课程*/}
                        <TouchableWithoutFeedback onPress={() => this.gotoMycourse()}>
                            <View style={styles.pageChild3}>
                                <View style={styles.pageChild31}>
                                    <View style={styles.pageChild311}>
                                        <Image source={require('./Images/4.png')} />
                                    </View>
                                    <Text style={styles.pageText1}>我的课程</Text>
                                </View>
                                <View>
                                    <Image source={require('./Images/11.png')} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.linsStypage}></View>
                        {/*购物车*/}
                        <TouchableWithoutFeedback onPress={() => this.gotoShopping('ShoppingCartN')}>
                            <View style={styles.pageChild3}>
                                <View style={styles.pageChild31}>
                                    <View style={styles.pageChild311}>
                                        <Image source={require('./Images/14.png')} />
                                    </View>
                                    <Text style={styles.pageText1}>购物车</Text>
                                </View>
                                <View>
                                    <Image source={require('./Images/11.png')} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.linsStypage}></View>
                        {/*商品订单管理*/}
                        <TouchableWithoutFeedback onPress={() => this.gotoShopping('OrderManagementN')}>
                            <View style={styles.pageChild3}>
                                <View style={styles.pageChild31}>
                                    <View style={styles.pageChild311}>
                                        <Image source={require('./Images/8.png')} />
                                    </View>
                                    <Text style={styles.pageText1}>商品订单</Text>
                                </View>
                                <View>
                                    <Image source={require('./Images/11.png')} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.linsStypage}></View>
                        {/*课程订单管理*/}
                        <TouchableWithoutFeedback onPress={() => this.gotoShopping('CoursesOrderManagementPageN')}>
                            <View style={styles.pageChild3}>
                                <View style={styles.pageChild31}>
                                    <View style={styles.pageChild311}>
                                        <Image source={require('./Images/4.png')} />
                                    </View>
                                    <Text style={styles.pageText1}>课程订单</Text>
                                </View>
                                <View>
                                    <Image source={require('./Images/11.png')} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    {/*导航区域3*/}
                    <View style={styles.pageChild4}>
                        {/*记录*/}
                        <TouchableWithoutFeedback onPress={() => this.gotoShopping('TestRecordsN')}>
                            <View style={styles.pageChild3}>
                                <View style={styles.pageChild31}>
                                    <View style={styles.pageChild311}>
                                        <Image source={require('./Images/6.png')} />
                                    </View>
                                    <Text style={styles.pageText1}>考试记录</Text>
                                </View>
                                <View>
                                    <Image source={require('./Images/11.png')} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.linsStypage}></View>
                        {/*我的推广码*/}
                        <TouchableWithoutFeedback onPress={() => this.gotoShopping('MycodeN')}>
                            <View style={styles.pageChild3}>
                                <View style={styles.pageChild31}>
                                    <View style={styles.pageChild311}>
                                        <Image style={styles.erqsa} source={require('./Images/erweima.png')} />
                                    </View>
                                    <Text style={styles.pageText1}>我的推荐码</Text>
                                </View>
                                <View>
                                    <Image source={require('./Images/11.png')}/>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.linsStypage}></View>
                        {/*关于我们*/}
                        <TouchableWithoutFeedback onPress={() => this.gotoShopping('AboutUsN')}>
                            <View style={styles.pageChild3}>
                                <View style={styles.pageChild31}>
                                    <View style={styles.pageChild311}>
                                        <Image source={require('./Images/2.png')} />
                                    </View>
                                    <Text style={styles.pageText1}>关于我们</Text>
                                </View>
                                <View>
                                    <Image source={require('./Images/11.png')} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.linsStypage}></View>
                        <TouchableWithoutFeedback onPress={() => this.Logout()}>
                            <View style={styles.pageChild3}>
                                <View style={styles.pageChild31}>
                                    <View style={styles.pageChild311}>
                                        <Image source={require('./Images/4.png')} />
                                    </View>
                                    <Text style={styles.pageText1}>退出登录</Text>
                                </View>
                                <View>
                                    <Image source={require('./Images/11.png')} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        {/*设置*/}
                        {/*<View style={styles.pageChild3}>*/}
                        {/*    <View style={styles.pageChild31}>*/}
                        {/*        <View style={styles.pageChild311}>*/}
                        {/*            <Image source={require('./Images/1.png')}/>*/}
                        {/*        </View>*/}
                        {/*        <Text style={styles.pageText1}>设置</Text>*/}
                        {/*    </View>*/}
                        {/*    <View>*/}
                        {/*        <Image source={require('./Images/11.png')}/>*/}
                        {/*    </View>*/}
                        {/*</View>*/}
                    </View>
                </ScrollView>
                <View style={styles.btmcon}>
                    <TouchableWithoutFeedback onPress={() => this.gotoPage('HomeN')}>
                        <View style={styles.btmconleft}>
                            <Image style={{ width: 23, height: 22 }} source={require('./Images/shouye.png')} />
                            <Text style={styles.IndexTextNo}>首页</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.gotoPage('HisCraftN')}>
                        <View style={styles.btmconright}>
                            <Image style={{ width: 18, height: 23 }} source={require('./Images/lianquan.png')} />
                            <Text style={styles.IndexTextNo}>练习</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.gotoPage('MallTemplateN')}>
                        <View style={styles.btmconright}>
                            <Image style={{ width: 21, height: 19 }} source={require('./Images/shangcheng.png')} />
                            <Text style={styles.IndexTextNo}>商城</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <View style={styles.btmconright}>
                            <Image style={{ width: 21, height: 21 }} source={require('./Images/wode.png')} />
                            <Text style={styles.IndexTextNo}>我的</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }

    // 退出登录
    Logout = () => {
        Alert.alert(
            '提示',
            '是否要退出登录?',
            [
                { text: '取消' },
                { text: "确定", onPress: () => this.deterMine() }
            ]
        );
    }
    deterMine = () => {
        console.log('确定退出');
        AsyncStorage.clear((error) => {
            let value = "删除缓存成功";
            if (error) {
                value = "删除失败";
            }
            console.log(value);
            this.props.navigation.dispatch(
                StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: "HomeN" })]
                })
            );
        })
    }
    // 等级类型
    lessonTypeText = (type) => {
        switch (type) {
            case 0:
            case 1:
            case 2:
                return (<Text style={styles.mypgaetext3}>养正问身</Text>)
                barak;
            case 3:
                return (<Text style={styles.mypgaetext3}>弘毅一级</Text>)
                break;
            case 4:
                return (<Text style={styles.mypgaetext3}>弘毅二级</Text>)
                break;
            case 5:
                return (<Text style={styles.mypgaetext3}>弘毅三级</Text>)
                break;
            case 6:
                return (<Text style={styles.mypgaetext3}>归真一级</Text>)
                break;
            case 7:
                return (<Text style={styles.mypgaetext3}>归真二级</Text>)
                break;
            case 8:
                return (<Text style={styles.mypgaetext3}>归真三级</Text>)
                break;
            case 9:
                return (<Text style={styles.mypgaetext3}>圆明一级</Text>)
                break;
            case 10:
                return (<Text style={styles.mypgaetext3}>圆明二级</Text>)
                break;
            case 11:
                return (<Text style={styles.mypgaetext3}>圆明三级</Text>)
                break;
            default:
                return (<Text style={styles.mypgaetext3}>空</Text>)
        }
    }
    // 我的课程
    gotoMycourse = () => {
        let self = this;
        let type = self.state.userInfo.userType;
        console.log(self.state.userInfo);
        if (type == 0) {
            this.props.navigation.navigate('XuyuanIofcoursePageN');
            console.log('学员');
        } else if (type == 1) {
            this.props.navigation.navigate('IofcourseN');
            console.log('教练')
        }
    }
    gotoShopping = (page) => {
        if (page == 'TestRecordsN') {
            let parameter = {};
            if (this.state.userInfo.userType == 1) {
                parameter.title = '审核记录';
            } else if (this.state.userInfo.userType == 0) {
                parameter.title = '报考记录';
            }
            this.props.navigation.navigate(page, parameter);
        }else {
            this.props.navigation.navigate(page);
        }
    }
    getPerInformation = (userId) => {
        let url = JFAPI.getUserInfoTaichi;
        let formData = new FormData();
        formData.append('userId', userId);
        let opts = {
            body: formData,
            method: "POST"
        }
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log('刷新用户信息', res);
                if (res.code == 0) {
                    if (res.data) {
                        this.setState({
                            UserData: res.data,
                            headUrl: res.data.headurl,
                            nickName: res.data.nickName
                        })
                        // 更新用户信息
                        AsyncStorage.setItem("userInfo", JSON.stringify(res.data), error => {
                            if (error) {
                                console.log("缓存失败")
                            } else {
                                // console.log("缓存成功", JSON.stringify(res.data));
                            }
                        })
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    gotoPerson = () => {
        let self = this;
        let data = {
            data: self.state.UserData,
            refresh: function () {
                self.getPerInformation(self.state.userInfo.id)
            }
        };
        self.props.navigation.navigate('PersonalCenterN', data);
    }
    gotoPage = (parameter) => {
        // if (parameter == 'HisCraftN') {
        //     Alert.alert('功能正在开发');
        // } else {
        let reseAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: parameter })]
        })
        this.props.navigation.dispatch(reseAction);
        // }
    }
    // 我的太极团
    gotoMytaichi = () => {
        this.props.navigation.navigate('MyHTaichiGroupN');
    }

    // TestRecordsN
    componentDidMount() {
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result),
                    headUrl: JSON.parse(result).headurl,
                    nickName: JSON.parse(result).nickName
                })
                this.getPerInformation(this.state.userInfo.id);
            }).catch(error => {
                console.log(error);
                console.log("读取失败");
            })
    }

}

const styles = StyleSheet.create({
    containerAppMypage: {
        flex: 1,
        backgroundColor: "#323232"
    },
    MypageChild: {
        width: "94%",
        paddingBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: "3%",
        marginTop: 20
    },
    pageChild: {
        width: "94%",
        backgroundColor: "#F2F1F0",
        marginLeft: '3%',
        borderRadius: 2,
        justifyContent: "center",
        marginTop: 20
    },
    pageChild4: {
        width: "94%",
        backgroundColor: "#F2F1F0",
        marginLeft: '3%',
        borderRadius: 2,
        justifyContent: "center",
        marginTop: 20
    },
    MypageChild1: {
        flexDirection: "row",
        marginTop: 5
    },
    mypageHeader: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    mypgaetext1: {
        color: "#FFFFFF"
    },
    mypgaetext2: {
        color: "#E0AC80",
        fontSize: 14
    },
    pagecontainer: {
        backgroundColor: "#B98A69",
        borderRadius: 8,
        width: 65
    },
    mypgaetext3: {
        color: "#FFFFFF",
        fontSize: 12,
        paddingTop: 3,
        paddingBottom: 3,
        textAlign: "center"
    },
    pagechild2: {
        justifyContent: "space-around",
        marginLeft: 15
    },
    linsStypage: {
        width: "92%",
        marginLeft: "4%",
        backgroundColor: "#8A6246",
        height: 1,
        opacity: 0.1
    },
    pageChild3: {
        width: "92%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: "4%",
        height: 60,
        paddingTop: 8,
        paddingBottom: 8
    },
    pageChild31: {
        flexDirection: "row",
        alignItems: "center"
    },
    pageText1: {
        color: "#8A6246",
        fontSize: 15,
        fontWeight: "bold",
        paddingLeft: 5
    },
    pageChild311: {
        width: 20,
        height: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    erqsa:{
        width:20,
        height:20
    },
    btmcon: {
        height: 70,
        width: width,
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#dddddd",
        overflow: "hidden",
        backgroundColor: "#ffffff"
    },
    btmconleft: {
        justifyContent: "center",
        alignItems: "center",
        width: width * 0.25
    },
    btmconright: {
        justifyContent: "center",
        alignItems: "center",
        width: width * 0.25
    },
    Indexicon: {
        width: 28,
        height: 28
    },
    IndexText: {
        fontSize: 12,
        paddingTop: 5,
        color: '#f56140'
    },
    NoIndexText: {
        fontSize: 12,
        paddingTop: 5,
        color: "#282828"
    },
    IndexTextNo: {
        fontSize: 12,
        paddingTop: 5,
        color: '#282828'
    }
});
