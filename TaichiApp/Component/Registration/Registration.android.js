/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { createStackNavigator, StackActions, NavigationActions, createAppContainer } from "react-navigation";
import {
    ScrollView,
    AppRegistry,
    Button,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Image,
    ImageBackground,
    Dimensions,
    StyleSheet,
    NativeModules,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
    ActivityIndicator, NetInfo
} from "react-native";
import { JFAPI } from './API/API';
import forge from 'node-forge';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from '../LoadingAnimation/LoadingAnimation';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let codeTime = 60;
import SplashScreen from 'react-native-splash-screen'

export default class RegistrationAndroid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingState: false,
            activeIndex: 0,
            timerCount: codeTime,
            timerTitle: "获取验证码",
            codeState: false,
            // 手机号
            phone: '',
            // 验证码
            code: '',
            // 密码
            password: ''
        }
    }

    static navigationOptions = {
        headerTitle: '悠然太极拳',
    };

    render() {
        if (this.state.activeIndex == 0) {
            return (
                <View style={styles.containerApp}>
                    <ScrollView keyboardShouldPersistTaps="always" style={{ flex: 1, width: width }}>
                        {/*<KeyboardAvoidingView behavior="position" contentContainerStyle={{flex: 1, width: width, alignItems: "center"}} style={{flex: 1, width: width, alignItems: "center"}}>*/}
                        <Image style={styles.headpicture} source={require('./Images/bj.png')} />
                        {/*顶部切换注册区域*/}
                        <View style={styles.loginSty}>
                            <View>
                                <TouchableWithoutFeedback onPress={() => this.switchState(0)}>
                                    <View
                                        style={this.state.activeIndex == 0 ? styles.Atextactive : styles.noAtextactive}>
                                        <Text
                                            style={this.state.activeIndex == 0 ? styles.zcdeText : styles.zcdeText1}>登录</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <TouchableWithoutFeedback onPress={() => this.switchState(1)}>
                                    <View
                                        style={this.state.activeIndex == 1 ? styles.Atextactive : styles.noAtextactive}>
                                        <Text
                                            style={this.state.activeIndex == 1 ? styles.zcdeText : styles.zcdeText1}>免费注册</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        {/*手机号*/}
                        <View style={styles.loginSty1}>
                            <View style={styles.loginSty1Child}>
                                <Image source={require('./Images/shouji.png')} />
                                <TextInput value={this.state.phone}
                                    onChangeText={(text) => this.setState({ phone: text })}
                                    placeholderTextColor="#B2B2B2" style={styles.Ainputsty}
                                    placeholder="请输入手机号"></TextInput>
                            </View>
                        </View>
                        {/*密码*/}
                        <View style={styles.loginSty1}>
                            <View style={styles.loginSty1Child}>
                                <Image source={require('./Images/mima.png')} />
                                <TextInput value={this.state.password} secureTextEntry={true} password={true}
                                    onChangeText={(text) => this.setState({ password: text })}
                                    placeholderTextColor="#B2B2B2"
                                    style={styles.Ainputsty} placeholder="请输入密码"></TextInput>
                            </View>
                        </View>
                        {/*底部背景图*/}
                        <ImageBackground style={{ width: '100%', flex: 1 }} source={require('./Images/coverage.png')}>
                            {/*底部确定忘记密码区域*/}
                            <TouchableWithoutFeedback onPress={() => this.gotoHome()}>
                                <View style={styles.AdbanniuQ}>
                                    <Text style={styles.AdbanniuText}>确定</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <Loading style={{ width: width, height: height }} show={this.state.loadingState} />
                            <TouchableWithoutFeedback onPress={() => this.forgetPass()}>
                                <View style={styles.Wjmima}>
                                    <Text style={styles.WjmimaText}>忘记密码</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </ImageBackground>
                        {/*</KeyboardAvoidingView>*/}
                    </ScrollView>
                </View>
            );
        } else if (this.state.activeIndex == 1) {
            return (
                <View style={styles.containerApp}>
                    <ScrollView keyboardShouldPersistTaps="always" style={{ flex: 1, width: width }}>
                        {/*<KeyboardAvoidingView behavior="position" contentContainerStyle={{flex: 1, width: width, alignItems: "center"}} style={{flex: 1, width: width, alignItems: "center"}}>*/}
                        <Image style={styles.headpicture} source={require('./Images/bj.png')} />
                        {/*顶部切换注册区域*/}
                        <View style={styles.loginSty}>
                            <View>
                                <TouchableWithoutFeedback onPress={() => this.switchState(0)}>
                                    <View
                                        style={this.state.activeIndex == 0 ? styles.Atextactive : styles.noAtextactive}>
                                        <Text
                                            style={this.state.activeIndex == 0 ? styles.zcdeText : styles.zcdeText1}>密码登录</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <TouchableWithoutFeedback onPress={() => this.switchState(1)}>
                                    <View
                                        style={this.state.activeIndex == 1 ? styles.Atextactive : styles.noAtextactive}>
                                        <Text
                                            style={this.state.activeIndex == 1 ? styles.zcdeText : styles.zcdeText1}>免费注册</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        {/*手机号*/}
                        <View style={styles.loginSty1}>
                            <View style={styles.loginSty1Child}>
                                <Image source={require('./Images/shouji.png')} />
                                <TextInput value={this.state.phone}
                                    onChangeText={(text) => this.setState({ phone: text })}
                                    placeholderTextColor="#B2B2B2" style={styles.Ainputsty}
                                    placeholder="请输入手机号"></TextInput>
                            </View>
                        </View>
                        {/*验证码*/}
                        <View style={styles.loginSty1}>
                            <View style={styles.loginSty1Child}>
                                <Image source={require('./Images/mima.png')} />
                                <TextInput value={this.state.code} onChangeText={(text) => this.setState({ code: text })}
                                    placeholderTextColor="#B2B2B2" style={styles.Ainputsty}
                                    placeholder="请输入验证码"></TextInput>
                                {
                                    this.state.codeState ? <View>
                                        <Text style={styles.timerText}>{this.state.timerCount}秒</Text>
                                        <TouchableWithoutFeedback>
                                            <Text style={styles.codeStyle}>{this.state.timerTitle}</Text>
                                        </TouchableWithoutFeedback>
                                    </View> : <View>
                                            <TouchableWithoutFeedback onPress={() => this.getCode()}>
                                                <Text style={styles.codeStyle}>{this.state.timerTitle}</Text>
                                            </TouchableWithoutFeedback>
                                        </View>
                                }
                            </View>
                        </View>
                        {/*密码*/}
                        <View style={styles.loginSty1}>
                            <View style={styles.loginSty1Child}>
                                <Image source={require('./Images/mima.png')} />
                                <TextInput secureTextEntry={true} password={true} value={this.state.password}
                                    onChangeText={(text) => this.setState({ password: text })}
                                    placeholderTextColor="#B2B2B2"
                                    style={styles.Ainputsty} placeholder="请输入密码"></TextInput>
                            </View>
                        </View>
                        {/*<ImageBackground style={{width: '100%', flex: 1}} source={require('./Images/coverage.png')}>*/}
                        {/*<View style={styles.loginSty1}>*/}
                        {/*    <View style={styles.loginSty1Child}>*/}
                        <TouchableWithoutFeedback onPress={() => this.Nextstep()}>
                            <View style={styles.AdbanniuQ}>
                                <Text style={styles.AdbanniuText}>确定</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        {/*</View>*/}
                        {/*</View>*/}
                        {/*</ImageBackground>*/}
                        {/*底部背景图*/}
                        {
                            this.state.loadingState ? <View style={{
                                flex: 1,
                                height: height,
                                width: width,
                                position: 'absolute',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <View style={{
                                    borderRadius: 10,
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    width: 100,
                                    height: 100,
                                    alignItems: 'center'
                                }}>
                                    <ActivityIndicator animating={true} color='white'
                                        style={{ marginTop: 20, width: 60, height: 60, }} size="large" />
                                    <Text style={{ color: "#ffffff", fontSize: 13 }}>加载中...</Text>
                                </View>
                            </View> : null
                        }
                        {/*</KeyboardAvoidingView>*/}
                    </ScrollView>
                </View>
            );
        }
    }

    switchState(num) {
        let self = this;
        self.state.activeIndex = num;
        self.setState({
            password: ''
        })
        if (num == 0) {
            this.props.navigation.setParams({ title: '登录' })
        } else if (num == 1) {
            this.props.navigation.setParams({ title: '消息' })
        }
        self.setState({
            activeIndex: num
        })
    }


    // 注册下一步
    Nextstep() {
        let self = this;
        let navigate = self.props.navigation.navigate;
        if (self.state.phone == '' || self.state.phone.length < 11) {
            Alert.alert(
                '',
                '请输入正确的手机号',
                [
                    { text: '确定' },
                ]
            )
            return;
        }
        if (self.state.code == '') {
            Alert.alert(
                '',
                '请输入验证码',
                [
                    { text: '确定' },
                ]
            )
            return;
        }
        let opts = {
            method: 'POST'
        };
        self.setState({
            loadingState: true
        })
        let Strdata = {
            phone: self.state.phone,
            code: self.state.code,
            password: self.state.password
        };
        let md = forge.md.md5.create();
        md.update(Strdata.password);
        let password = md.digest().toHex();
        let data = {
            phone: Strdata.phone,
            code: Strdata.code,
            password: password
        }
        fetch(JFAPI.Register + "?phone=" + data.phone + '&code=' + data.code + '&password=' + data.password, opts)
            .then((response) => response.json())
            .then((data) => {
                self.setState({
                    loadingState: false
                })
                if (data.code == 0) {
                    // 用户信息
                    AsyncStorage.setItem("userInfo", JSON.stringify(data.data), error => {
                        if (error) {
                            console.log("缓存失败")
                        } else {
                            console.log("缓存成功", JSON.stringify(data.data));
                            navigate('RegistrD');
                        }
                    })
                } else if (data.code == -1) {
                    Alert.alert(
                        '',
                        data.info,
                        [
                            { text: '确定' },
                        ]
                    )
                }
                console.log(data);
            }).catch(error => {
                self.setState({
                    loadingState: false
                })
                console.log(error);
                console.log("请求失败")
            })
    }

    // 忘记密码
    forgetPass() {
        let self = this;
        let navigate = self.props.navigation.navigate;
        navigate('ForgotPassN');
    }

    // 登录前往首页
    gotoHome() {
        let self = this;
        let navigate = self.props.navigation.navigate;
        let opts = {
            method: 'POST'
        };
        if (self.state.phone == '' || self.state.phone.length < 11) {
            Alert.alert(
                '',
                '请输入手机号',
                [
                    { text: '确定' },
                ]
            )
            return;
        }
        if (self.state.password == '') {
            Alert.alert(
                '',
                '请输入密码',
                [
                    { text: '确定' },
                ]
            )
            return;
        }
        NetInfo.getConnectionInfo().then((connentionInfo) => {
            console.log(connentionInfo);
            let type = connentionInfo.type;
            if (type == 'none') {
                Alert.alert(
                    '',
                    '当前网络不可用，点击确定前往设置打开数据或者连接WiFi',
                    [
                        { text: '确定', onPress: () => this.openSetting() },
                    ]
                )
            } else {
                let Strdata = {
                    phone: self.state.phone,
                    password: self.state.password
                };
                let md = forge.md.md5.create();
                md.update(Strdata.password);
                let password = md.digest().toHex();
                let data = {
                    phone: Strdata.phone,
                    password: password
                }
                // let formData = new FormData();
                // formData.append('phone', Strdata.phone);
                // formData.append('password', password);
                // let xhr = new XMLHttpRequest();
                // xhr.timeout = 3000;
                // xhr.responseType = "text";
                // xhr.open('POST', JFAPI.loginDo, true);
                // xhr.onload = function (e) {
                //     if (this._response) {
                //         let res = JSON.parse(this._response);
                //         console.log('res',res);
                //         if (res.code == 0) {
                //             // 用户信息
                //             AsyncStorage.setItem("userInfo", JSON.stringify(res.data), error => {
                //                 if (error) {
                //                     console.log("缓存失败")
                //                 } else {
                //                     console.log("缓存成功");
                //                 }
                //             })
                //             if (res.data.perfect == 1) {
                //                 self.props.navigation.dispatch(
                //                     StackActions.reset({
                //                         index: 0,
                //                         actions: [NavigationActions.navigate({routeName: 'HomeN'})]
                //                     })
                //                 )
                //             } else {
                //                 navigate('RegistrD');
                //             }
                //         } else if (res.code == -1) {
                //             Alert.alert(
                //                 '',
                //                 data.info,
                //                 [
                //                     {text: '确定'},
                //                 ]
                //             )
                //         }else{
                //             Alert.alert(JSON.stringify(res));
                //         }
                //     }
                // }
                // xhr.ontimeout = function (e) {
                //     console.log(e);
                //     Alert.alert('timeout：'+JSON.stringify(e))
                // }
                // xhr.onerror = function (e) {
                //     console.log(e);
                //     Alert.alert('error：'+JSON.stringify(e))
                // }
                // xhr.upload.onprogress = function (e) {
                //     console.log(e);
                //     Alert.alert('upload：'+JSON.stringify(e))
                // }
                // xhr.send(formData);
                // this.setState({
                //     loadingState: true
                // })
                // console.log(data);
                fetch(JFAPI.loginDo + "?phone=" + data.phone + '&password=' + data.password, opts)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        self.setState({
                            loadingState: false
                        })
                        if (data.code == 0) {
                            // 用户信息
                            AsyncStorage.setItem("userInfo", JSON.stringify(data.data), error => {
                                if (error) {
                                    console.log("缓存失败")
                                } else {
                                    console.log("缓存成功");
                                }
                            })
                            // if (data.data.perfect == 1) {
                            self.props.navigation.dispatch(
                                StackActions.reset({
                                    index: 0,
                                    actions: [NavigationActions.navigate({ routeName: 'HomeN' })]
                                })
                            )
                            // } else {
                            //     navigate('RegistrD');
                            // }
                        } else if (data.code == -1) {
                            Alert.alert(
                                '',
                                data.info,
                                [
                                    { text: '确定' },
                                ]
                            )
                        }
                    }).catch(error => {
                        Alert.alert('登录失败，请稍后再试');
                        Alert.alert(JSON.stringify(error));
                        console.error(error);
                        console.log(error);
                        self.setState({
                            loadingState: false
                        })
                    })
            }
        })
    }

    // 获取验证码
    getCode() {
        let self = this;
        let phone = self.state.phone;
        if (phone == '' || phone.length < 11) {
            Alert.alert(
                '',
                '请输入正确的手机号',
                [
                    { text: '确定' },
                ]
            )
            return;
        } else {
            self.setState({
                codeState: true,
                timerCount: codeTime
            })
            let opts = {
                method: 'POST'
            };
            self.setState({
                loadingState: true
            })
            fetch(JFAPI.getSmsCode + "?phone=" + phone, opts)
                .then((response) => response.json())
                .then((data) => {
                    if (data.code == 0) {
                        self.interval = setInterval(() => {
                            let timer = self.state.timerCount - 1;
                            if (timer === 1) {
                                self.setState({
                                    timerCount: codeTime,
                                    timerTitle: '重新获取'
                                })
                            }
                            if (timer === 0) {
                                self.interval && clearInterval(this.interval);
                                self.setState({
                                    codeState: false
                                })

                            } else {
                                self.setState({
                                    timerCount: timer
                                })
                            }
                        }, 1000)
                        self.setState({
                            loadingState: false
                        })
                    }
                }).catch(error => {
                    console.log('请求失败', error);
                    self.setState({
                        loadingState: false
                    })
                })
        }
    }
    // 打开设置
    openSetting = () => {
        NativeModules.OpenSettings.openNetworkSettings((data) => {
            console.log('call back data', data);
        })
    }
    // 请求页面接口
    componentDidMount() {
        let self = this;
        setTimeout(() => {
            NativeModules.SplashScreen.hide();
        }, 1000)
        AsyncStorage.getItem('userInfo')
            .then(result => {
                if (JSON.parse(result)) {
                    console.log('有缓存准备跳转首页');
                    self.props.navigation.dispatch(
                        StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'HomeN' })]
                        })
                    )
                }
            }).catch(error => {
                console.log("读取缓存失败");
            })
    }

    componentWillUnmount() {
        clearTimeout(this.interval);
    }
}
const styles = StyleSheet.create({
    Wjmima: {
        flex: 1,
        alignItems: "center"
    },
    WjmimaText: {
        fontSize: 17,
        color: "#B2B2B2",
        paddingBottom: 20
    },
    Adbanniu: {
        width: width * 0.8,
        backgroundColor: "#8A6246",
        marginTop: 30,
        borderColor: "#8A6246",
        borderWidth: 1,
        borderRadius: 3,
        alignItems: 'center',
        paddingTop: 15
    },
    AdbanniuQ: {
        width: width * 0.8,
        marginLeft: width * 0.1,
        backgroundColor: "#8A6246",
        marginTop: 30,
        marginBottom: 30,
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
    containerApp: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
    headpicture: {
        width: '100%',
        height: 280
    },
    zcdeText: {
        fontSize: 18,
        color: "#282828"
    },
    zcdeText1: {
        fontSize: 18,
        color: "#B2B2B2"
    },
    Atextactive: {
        color: "#282828",
        fontSize: 18,
        fontWeight: 'bold',
        borderBottomWidth: 3,
        borderBottomColor: "#8A6246",
        paddingBottom: 8
    },
    noAtextactive: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 8,
        color: "#B2B2B2"
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    loginSty: {
        paddingTop: 8,
        paddingBottom: 8,
        width: width * 0.9,
        marginLeft: width * 0.05,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30
    },
    loginSty1Q: {
        marginLeft: width * 0.1,
        width: width * 0.8,
        flexDirection: 'row',
        borderBottomColor: "#EAEAEA",
        borderBottomWidth: 1,
        marginTop: 30,
        paddingBottom: 20
    },
    loginSty1: {
        width: width * 0.8,
        marginLeft: width * 0.1,
        flexDirection: 'row',
        borderBottomColor: "#EAEAEA",
        borderBottomWidth: 1,
        marginTop: 30,
        paddingBottom: 20
    },
    loginSty1Child: {
        flexDirection: "row",
        width: width,
        alignItems: "center"
    },
    Ainputsty: {
        width: width * 0.5,
        paddingLeft: 20,
        fontSize: 16
    },
    codeStyle: {
        color: "#8A6246",
        fontSize: 15,
        fontWeight: "bold"
    },
    timerText: {
        color: "#B2B2B2",
        textAlign: "right"
    }
});
