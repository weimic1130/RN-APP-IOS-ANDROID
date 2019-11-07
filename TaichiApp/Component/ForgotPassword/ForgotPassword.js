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
    Alert,
    Button,
    KeyboardAvoidingView,
    Platform,
    Image,
    ImageBackground,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
    ScrollView
} from "react-native";
import {JFAPI} from './API/API';
import forge from 'node-forge';
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let codeTime = 60;
export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this._onChangeText = this._onChangeText.bind(this);
        this.state = {
            activeIndex: 0,
            timerCount: codeTime,
            timerTitle: "获取验证码",
            codeState: false,
            phone:'',
            code:'',
            password:''
        }
    }

    static navigationOptions = {
        headerTitle: '忘记密码',
    };

    render() {
        return (
            <View style={styles.containerAppForPass}>
                <ScrollView keyboardShouldPersistTaps="always" style={{flex: 1, width: width}}>
                    {/*<KeyboardAvoidingView behavior="position" contentContainerStyle={{flex:1,width:width,alignItems: "center"}} style={{flex:1,width:width,alignItems: "center"}}>*/}
                    <View style={styles.containerAppForPassC}>
                        {/*手机号*/}
                        <View style={styles.loginSty1}>
                            <View style={styles.loginSty1Child}>
                                <Image source={require('./Images/shouji.png')}/>
                                <TextInput
                                    onChangeText={(text) => this.setState({phone: text})} placeholderTextColor="#B2B2B2" style={styles.Ainputsty}
                                           placeholder="请输入手机号"></TextInput>
                            </View>
                        </View>
                        {/*验证码*/}
                        <View style={styles.loginSty1}>
                            <View style={styles.loginSty1Child}>
                                <Image source={require('./Images/mima.png')}/>
                                <TextInput onChangeText={(text) => this.setState({code: text})} placeholderTextColor="#B2B2B2" style={styles.Ainputsty}
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
                                <Image source={require('./Images/mima.png')}/>
                                <TextInput secureTextEntry={true} password={true} onChangeText={(text) => this.setState({password: text})} placeholderTextColor="#B2B2B2" style={styles.Ainputsty}
                                           placeholder="请输入密码"></TextInput>
                            </View>
                        </View>
                        {/*确定按钮*/}
                        <TouchableWithoutFeedback onPress={() => this.changePassWord()}>
                            <View style={styles.AdbanniuQ}>
                                <Text style={styles.AdbanniuText}>确定</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </ScrollView>
                {/*</KeyboardAvoidingView>*/}
            </View>
        );
    }
    _onChangeText = (inputData) => {
        console.log(inputData);
    }
    changePassWord = () => {
        let url = JFAPI.submitForgetPassword;
        console.log(this.state.phone);
        if(this.state.phone == "" || this.state.phone.length < 11){
            Alert.alert('请输入正确的手机号');
            return;
        }
        if(this.state.code == ""){
            Alert.alert('请输入正确的验证码');
            return;
        }
        if(this.state.password == ""){
            Alert.alert("请输入密码");
            return;
        }
        let md = forge.md.md5.create();
        md.update(this.state.password);
        let password = md.digest().toHex();
        console.log(password);
        let formData = new FormData();
        formData.append('phone',this.state.phone);
        formData.append('password',password);
        formData.append('code',this.state.code);
        let opts = {
            body:formData,
            method:"POST"
        }
        fetch(url,opts)
            .then((response) => response.json())
            .then((res)=>{
                if(res.code == 0){
                    Alert.alert("修改成功");
                    this.props.navigation.goBack();
                }else if(res.code == -1){
                    Alert.alert(res.info)
                }else{
                    Alert.alert('修改失败请稍后再试');
                }
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    switchState(num) {
        let self = this;
        self.state.activeIndex = num;
        if (num == 0) {
            this.props.navigation.setParams({title: '登录'})
        } else if (num == 1) {
            this.props.navigation.setParams({title: '消息'})
        }
        self.setState({
            activeIndex: num
        })
    }

    Nextstep() {
        let self = this;
        let navigate = self.props.navigation.navigate;
        navigate('RegistrD');
        console.log("前往填写注册详情");
    }

    // 获取验证码
    getCode() {
        let self = this;
        let phone = this.state.phone;
        if(phone == '' || phone.length < 11){
            Alert.alert('请输入正确的手机号');
            return;
        }else{
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
        // self.interval = setInterval(() => {
        //     let timer = self.state.timerCount - 1;
        //     if (timer === 1) {
        //         self.setState({
        //             timerCount: codeTime,
        //             timerTitle: '重新获取'
        //         })
        //     }
        //     if (timer === 0) {
        //         self.interval && clearInterval(this.interval);
        //         self.setState({
        //             codeState: false
        //         })
        //
        //     } else {
        //         self.setState({
        //             timerCount: timer
        //         })
        //     }
        // }, 1000)
    }

    gotoDetailes() {
        console.log("跳转到注册详情");
    }

    // 请求页面接口
    componentDidMount(): void {

    }

    componentWillUnmount() {
        clearTimeout(this.interval);
    }
}
const styles = StyleSheet.create({
    AdbanniuQ: {
        marginLeft: width * 0.05,
        width: width * 0.9,
        backgroundColor: "#8A6246",
        marginTop: 15,
        borderColor: "#8A6246",
        borderWidth: 1,
        borderRadius: 3,
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: 15
    },
    AdbanniuText: {
        color: "#FFFFFF",
        fontSize: 16
    },
    containerAppForPass: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        alignItems: 'center'
    },
    containerAppForPassC: {
        width: "100%",
        backgroundColor: "#FFFFFF"
    },
    loginSty1: {
        width: width * 0.9,
        marginLeft: width * 0.05,
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
        width: width * 0.6,
        paddingLeft: 20,
        fontSize: 16
    },
    codeStyle: {
        color: "#8A6246",
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 10
    },
    timerText: {
        color: "#B2B2B2",
        textAlign: "right"
    }
});
