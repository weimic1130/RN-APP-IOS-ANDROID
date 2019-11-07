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
    Keyboard,
    NativeModules,
    AppState,
    DeviceEventEmitter,
    Linking,
    Picker,
    Platform,
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
    Animated,
    ActivityIndicator,
    Modal, Alert,
    DatePickerAndroid,
    PermissionsAndroid, KeyboardAvoidingView
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import {JFAPI} from "../Registration/API/API";
import forge from "node-forge";
import ImagePicker from "react-native-image-picker";
import {yieldExpression} from '@babel/types';
import global from "../global";

let {width, height} = Dimensions.get('window');
let codeTime = 60;
// 图片选择参数设置
const options = {
    title: '请选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '相册图片',
    permissionDenied: {
        title: "提示",
        text: "悠然太极想要访问您的相册，是否允许？",
        reTryTitle: "允许",
        okTitle: ""
    },
    allowsEditing: true,
    quality: 0.6,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
export default class PersonalCenterAndroid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Headportrait: '',
            Headportrait2: '',
            userInfo: '',
            nickNameInput: '',
            WxNoModal: false,
            emailInput: '',
            wxnoInput: '',
            SexNum: false,
            SexModal: false,
            SexText: '请选择',
            nickNameModal: false,
            emailModal: false,
            DeleteModal: false,
            // 详细地址
            positionText: '',
            // 选择的出生日期
            chooseTime: '',
            // 昵称
            nickName: '这里是昵称',
            // 头像
            headurl: '',
            // 性别
            sex: '',
            // 生日
            birthday: '',
            // 简介
            introduce: '',
            // 常驻地址
            address: '',
            // 经度
            longitude: '',
            // 纬度
            latitude: '',
            // 邮箱
            email: '',
            loadingState: false,
            chosenDate: new Date(),
            activeIndex: 0,
            timerCount: codeTime,
            timerTitle: "获取验证码",
            codeState: false,
            // 弹窗
            StateMask: false,
            // 性别
            gender: '1',
            genderText: '',
            // 日期
            TimesDate: false,
            val: this.props.title,
            data: [],
            avatarSource: null,
            presetDate: new Date(2016, 3, 5),
            // 微信号
            WxNo: '',
            // 微信二维码
            wxQrcode: '',
            // oss签名
            imgSign: {
                accessid: '',
                dir: '',
                expire: '',
                host: '',
                policy: '',
                signature: ''
            }
        }
        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        console.log('选择的出生日期');
        this.setState({
            chosenDate: newDate,
            chooseTime: newDate.toLocaleDateString().replace(/\//g, "-") + ' ' + newDate.toTimeString().substr(0, 8)
        });
    }

    static navigationOptions = {
        headerTitle: '个人信息',
    };

    render() {
        return (
            <View style={styles.containerAppPerson}>
                <ScrollView style={styles.ScrollViewSty}>
                    <TouchableWithoutFeedback onPress={() => this.closeFocus()}>
                        <View style={styles.RDbg}>
                            {/*头像*/}
                            <View style={styles.loginSty1}>
                                <View style={styles.loginSty1Child}>
                                    <Text style={styles.Nicheng}>头像</Text>
                                    <View
                                        style={{flexDirection: 'row', alignItems: "center", justifyContent: "center"}}>
                                        {
                                            this.state.headurl ?
                                                <TouchableWithoutFeedback onPress={() => this.choosePic()}>
                                                    <Image style={styles.ImgSizePer}
                                                           source={{uri: global.PicUrl + this.state.headurl}}/>
                                                </TouchableWithoutFeedback>
                                                :
                                                <TouchableWithoutFeedback onPress={() => this.choosePic()}>
                                                    <Image style={styles.ImgSizePer}
                                                           source={require('./Images/tuceng1.png')}/>
                                                </TouchableWithoutFeedback>

                                        }
                                        <Image source={require('./Images/l.png')}/>
                                    </View>
                                </View>
                            </View>
                            {/*昵称*/}
                            <TouchableWithoutFeedback onPress={() => this.nickModal()}>
                                <View style={styles.loginSty1}>
                                    <View style={styles.loginSty1Child}>
                                        <Text style={styles.Nicheng}>昵称</Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                            <Text style={{
                                                color: "#B2B2B2",
                                                fontSize: 16,
                                                paddingRight: 10
                                            }}>{this.state.nickName}</Text>
                                            <Image source={require('./Images/l.png')}/>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            {/*微信号*/}
                            <TouchableWithoutFeedback onPress={() => this.openWxNo()}>
                                <View style={styles.loginSty1}>
                                    <View style={styles.loginSty1Child}>
                                        <Text style={styles.Nicheng}>微信号</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            <Text style={{
                                                color: "#B2B2B2",
                                                fontSize: 16,
                                                paddingRight: 10
                                            }}>{this.state.WxNo}</Text>
                                            <Image source={require('./Images/l.png')}/>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            {/*微信二维码*/}
                            <View style={styles.loginSty1}>
                                <View style={styles.loginSty1Child}>
                                    <Text style={styles.Nicheng}>微信二维码</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        {
                                            this.state.wxQrcode ?
                                                <TouchableWithoutFeedback onPress={() => this.chooseQrcode()}>
                                                    <Image style={styles.ImgSizePer}
                                                           source={{uri: global.PicUrl + this.state.wxQrcode}}/>
                                                </TouchableWithoutFeedback>
                                                :
                                                <TouchableWithoutFeedback onPress={() => this.chooseQrcode()}>
                                                    <Image style={styles.ImgSizePer}
                                                           source={require('./Images/tuceng1.png')}/>
                                                </TouchableWithoutFeedback>

                                        }
                                        <Image source={require('./Images/l.png')}/>
                                    </View>
                                </View>
                            </View>
                            {/*性别*/}
                            <View style={styles.loginSty1}>
                                <TouchableWithoutFeedback onPress={() => this.openSex()}>
                                    <View style={styles.loginSty1Child}>
                                        <Text style={styles.Nicheng}>性别</Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                            <Text style={{
                                                color: "#B2B2B2",
                                                fontSize: 16,
                                                paddingRight: 10
                                            }}>{this.state.SexText}</Text>
                                            <Image source={require('./Images/l.png')}/>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            {/*出生日期*/}
                            <TouchableWithoutFeedback onPress={() => this.DateSelect()}>
                                <View style={styles.loginSty1}>
                                    <View style={styles.loginSty1Child}>
                                        <Text style={styles.Nicheng}>出生日期</Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                            {
                                                this.state.birthday ? <Text style={{
                                                        color: "#B2B2B2",
                                                        fontSize: 16,
                                                        paddingRight: 10
                                                    }}>{this.state.birthday == 'undefined' ? '' : this.state.birthday}</Text> :
                                                    <Text style={{
                                                        color: "#B2B2B2",
                                                        fontSize: 16,
                                                        paddingRight: 10
                                                    }}></Text>
                                            }
                                            <Image source={require('./Images/l.png')}/>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            {/*个人简介*/}
                            <View style={styles.loginSty1}>
                                <View style={styles.loginSty1Child}>
                                    <Text style={styles.Nicheng}>个人简介</Text>
                                    <View style={{flexDirection: 'row', justifyContent: "center"}}>
                                        {
                                            this.state.introduce ?
                                                <TextInput
                                                    value={this.state.introduce == 'undefined' ? '' : this.state.introduce}
                                                    blurOnSubmit={true}
                                                    returnKeyType="done"
                                                    ref="gerenjianjie"
                                                    onChangeText={(text) => this.setState({introduce: text})}
                                                    multiline={true} placeholderTextColor="#B2B2B2"
                                                    style={styles.AinputstyGejs}></TextInput> :
                                                <TextInput value={this.state.introduce}
                                                           blurOnSubmit={true}
                                                           returnKeyType="done"
                                                           onChangeText={(text) => this.setState({introduce: text})}
                                                           multiline={true} placeholderTextColor="#B2B2B2"
                                                           style={styles.AinputstyGejs}
                                                           ref="gerenjianjie"
                                                           placeholder="太极是中国思想史上的重要概念，主要继承自《周易》：“易有大恒"></TextInput>
                                        }
                                    </View>
                                </View>
                            </View>
                            {/*常驻地址*/}
                            <TouchableWithoutFeedback onPress={() => this.gotoMap()}>
                                <View style={styles.loginSty1}>
                                    <View style={styles.loginSty1Child}>
                                        <Text style={styles.Nicheng}>常驻地址</Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: "center",
                                                justifyContent: "center",
                                                width:width * 0.7
                                            }}>
                                            <Text
                                                numberOfLines={2}
                                                style={{
                                                color: "#B2B2B2",
                                                fontSize: 15,
                                                paddingRight: 5
                                            }}>{this.state.address ? this.state.address : ''}</Text>
                                            <Image source={require('./Images/l.png')}/>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            {/*邮箱*/}
                            <TouchableWithoutFeedback onPress={() => this.emailModal()}>
                                <View style={styles.loginSty3}>
                                    <View style={styles.loginSty1Child}>
                                        <Text style={styles.Nicheng}>邮箱</Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: "center"
                                            }}>
                                            <Text style={{color: "#B2B2B2", fontSize: 16, paddingRight: 10}}>
                                                {
                                                    this.state.email ? this.state.email : ''
                                                }
                                            </Text>
                                            <Image source={require('./Images/l.png')}/>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
                {/*选择性别*/}
                {
                    this.state.SexModal ?
                        <Animated.View onPress={() => console.log("关闭")} style={styles.mask}></Animated.View> : null
                }
                <Modal animationType="slide" transparent={true} visible={this.state.SexModal} onRequestClose={() => {
                    this.onRequestClose();
                }}>
                    <View style={styles.selectSex}>
                        <View style={styles.allSex}>
                            <View style={styles.leftLine}></View>
                            <Text style={styles.selectSexText}>选择性别</Text>
                            <View style={styles.rightLine}></View>
                        </View>
                        <View style={styles.allSex2}>
                            <TouchableWithoutFeedback onPress={() => this.selectSex(1)}>
                                {
                                    this.state.SexNum == 1 ? <Image source={require('./Images/na.png')}/> :
                                        <Image source={require('./Images/n.png')}/>
                                }
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.selectSex(2)}>
                                {
                                    this.state.SexNum == 2 ? <Image source={require('./Images/va.png')}/> :
                                        <Image source={require('./Images/v.png')}/>
                                }
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.ztdlineSty}></View>
                        <View style={styles.dbanniurq}>
                            <TouchableWithoutFeedback onPress={() => this.Sexdetermine()}>
                                <Text style={styles.dbanniurqText}>确定</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </Modal>
                {/*微信号*/}
                {
                    this.state.WxNoModal ?
                        <Animated.View onPress={() => console.log("关闭")} style={styles.mask}></Animated.View> : null
                }
                {/*昵称*/}
                {
                    this.state.nickNameModal ?
                        <Animated.View onPress={() => console.log("关闭")} style={styles.mask}></Animated.View> : null
                }
                {
                    this.state.nickNameModal ? <View style={styles.selectSex}>
                        <View style={styles.allSex}>
                            <View style={styles.leftLine}></View>
                            <Text style={styles.selectSexText}>输入昵称</Text>
                            <View style={styles.rightLine}></View>
                        </View>
                        <View style={styles.allSex2}>
                            <TextInput onChangeText={(text) => this.setState({nickNameInput: text})}
                                       style={styles.ZDYinputPer} placeholder="在此输入昵称"></TextInput>
                        </View>
                        <View style={styles.ztdlineSty}></View>
                        <View style={styles.dbanniurq}>
                            <TouchableWithoutFeedback onPress={() => this.Nickdetermine()}>
                                <Text style={styles.dbanniurqText}>确定</Text>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.setState({nickNameModal: false})}>
                                <Text style={styles.dbanniurqTextQx}>取消</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View> : null
                }
                {/*微信号*/}
                {
                    this.state.WxNoModal ? <View style={styles.selectSex}>
                        <View style={styles.allSex}>
                            <View style={styles.leftLine}></View>
                            <Text style={styles.selectSexText}>输入微信号</Text>
                            <View style={styles.rightLine}></View>
                        </View>
                        <View style={styles.allSex2}>
                            <TextInput onChangeText={(text) => this.setState({wxnoInput: text})}
                                       style={styles.ZDYinputPer} placeholder="在此输入微信号"></TextInput>
                        </View>
                        <View style={styles.ztdlineSty}></View>
                        <View style={styles.dbanniurq}>
                            <TouchableWithoutFeedback onPress={() => this.WxNodetermine()}>
                                <Text style={styles.dbanniurqText}>确定</Text>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.setState({WxNoModal: false})}>
                                <Text style={styles.dbanniurqTextQx}>取消</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View> : null
                }
                {/*邮箱*/}
                {
                    this.state.emailModal ?
                        <Animated.View onPress={() => console.log("关闭")} style={styles.mask}></Animated.View> : null
                }
                {
                    this.state.emailModal ? <View style={styles.selectSex}>
                        <View style={styles.allSex}>
                            <View style={styles.leftLine}></View>
                            <Text style={styles.selectSexText}>输入邮箱</Text>
                            <View style={styles.rightLine}></View>
                        </View>
                        <View style={styles.allSex2}>
                            <TextInput onChangeText={(text) => this.setState({emailInput: text})}
                                       style={styles.ZDYinputPer} placeholder="在此输入邮箱"></TextInput>
                        </View>
                        <View style={styles.ztdlineSty}></View>
                        <View style={styles.dbanniurq}>
                            <TouchableWithoutFeedback onPress={() => this.emaildetermine()}>
                                <Text style={styles.dbanniurqText}>确定</Text>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.setState({emailModal: false})}>
                                <Text style={styles.dbanniurqTextQx}>取消</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View> : null
                }
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
                                               style={{marginTop: 20, width: 60, height: 60,}} size="large"/>
                            <Text style={{color: "#ffffff", fontSize: 13}}>加载中...</Text>
                        </View>
                    </View> : null
                }
                <TouchableWithoutFeedback onPress={() => this.savePersonal()}>
                    <View style={styles.AdbanniuQ}>
                        <Text style={styles.AdbanniuText}>保存</Text>
                    </View>
                </TouchableWithoutFeedback>
                {/*删除*/}
                {
                    this.state.DeleteModal ?
                        <Animated.View style={styles.mask}></Animated.View> : null
                }
                <Modal animationType="slide" transparent={true} visible={this.state.DeleteModal} onRequestClose={() => {
                    this.onRequestClose();
                }}>
                    <View style={styles.selectSex}>
                        <View style={styles.allSex2}>
                            <Text style={styles.DeleText}>确定要删除这条信息吗</Text>
                        </View>
                        <View style={styles.ztdlineSty}></View>
                        <View style={styles.dbanniurqSc}>
                            <TouchableWithoutFeedback onPress={() => this.setState({DeleteModal: false})}>
                                <Text style={styles.dbanniurqTextSc}>取消</Text>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.setState({DeleteModal: false})}>
                                <Text style={styles.dbanniurqText}>确定</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    // 更新个人信息
    savePersonal = () => {
        let self = this;
        let url = JFAPI.updateinfo;
        let nickName = this.state.nickName;
        if (nickName.length > 10) {
            Alert.alert('昵称长度不可超过10个字');
            return;
        }
        let headurl = this.state.headurl;
        let birthday = this.state.chooseTime;
        let introduce = this.state.introduce;
        let address = this.state.address;
        let email = this.state.email;
        let longitude = this.state.longitude;
        let latitude = this.state.latitude;
        let id = this.state.id;
        let wxNo = this.state.WxNo;
        let wxQrcode = this.state.wxQrcode;
        let sex = '';
        if (this.state.SexText == '男') {
            sex = 1;
        } else if (this.state.SexText == '女') {
            sex = 2
        }
        if (longitude == "" || latitude == "") {
            Alert.alert('请选择常驻地址');
            return false;
        }
        let formData = new FormData();
        formData.append('nickName', nickName);
        formData.append('headurl', headurl);
        formData.append('sex', sex);
        formData.append('birthday', birthday);
        formData.append('introduce', introduce);
        formData.append('address', address);
        formData.append('longitude', longitude);
        formData.append('latitude', latitude);
        formData.append('email', email);
        formData.append('id', id);
        formData.append('wxNo', wxNo);
        formData.append('wxQrcode', wxQrcode);
        let opts = {
            body: formData,
            method: "POST"
        };
        fetch(JFAPI.updateinfo, opts)
            .then((response) => response.json())
            .then((data) => {
                this.props.navigation.state.params.refresh()
                console.log(data);
                Alert.alert('保存成功');
            }).catch(error => {
            this.props.navigation.state.params.refresh()
            console.log(error);
            console.log("请求失败")
        })
    }

    goback() {
        let self = this;
        self.props.navigation.goBack()
    }

    // 微信号弹窗
    openWxNo = () => {
        console.log('打开微信号输入框');
        this.setState({
            WxNoModal: true
        })
    }
    closeFocus = () => {
        console.log('关闭所有焦点');
        this.refs.gerenjianjie.blur();
    }
    // 前往地图
    gotoMap = () => {
        return new Promise((resolve,reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    if (position) {
                        console.log(position);
                        this.props.navigation.navigate('MapsPageN')
                    }
                },
                (error) => {
                    this.openSetting()
                    console.log(error);
                }
            )
        })
    }
    // 打开设置
    openSetting = () => {
        NativeModules.OpenSettings.openNetworkSettings((data) => {
            console.log('call back data', data);
        })
    }
    nickModal = () => {
        this.setState({
            nickNameModal: true
        })
    }
    emailModal = () => {
        this.setState({
            emailModal: true
        })
    }
    openSex = () => {
        this.setState({
            SexModal: true
        })
    }
    selectSex = (num) => {
        this.setState({
            SexNum: num
        })
    }

    // 选择日期
    DateSelect() {
        let self = this;
        this.showPicker(this, {date: this.state.presetDate})
    }

    // 打开设置
    openSetting = () => {
        NativeModules.OpenSettings.openNetworkSettings((data) => {
            console.log('call back data', data);
        })
    }

    async showPicker(stateKey, options) {
        try {
            const {action} = DatePickerAndroid.open({
                // 要设置默认值为今天的话，使用`new Date()`即可               
                date: new Date()
            }).then(({year, month, day}) => {
                if (action !== DatePickerAndroid.dismissedAction) {
                    // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day 
                    month = month + 1;
                    if (month < 10) {
                        month = '0' + month;
                    }
                    if (day < 10) {
                        day = '0' + day;
                    }
                    if (year) {
                        this.setState({
                            chooseTime: year + '-' + month + '-' + day,
                            birthday: year + '-' + month + '-' + day,
                        })
                    } else {
                        console.log('取消了选择出生日期');
                    }
                }
            })
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }

    }

    choosePic = () => {
        let self = this;
        ImagePicker.showImagePicker(options, (response) => {
            console.log(response);
            if (response.didCancel) {
                // this.openSetting();
                console.log('用户取消了选择！');
            } else if (response.customButton) {
                console.log('点击前往');
            } else if (response.error) {
                Alert.alert(
                    '提示',
                    '"悠然太极球"想要访问您的相机相册？',
                    [
                        {text: "确定", onPress: () => this.openSetting()}
                    ]
                );
                // alert("ImagePicker发生错误：" + response.error);
            } else {
                let source = {uri: response.uri};
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.startUpload(response);
                console.log(source);
                this.setState({
                    Headportrait: source
                });

            }
        })
    }

    // 上传图片
    startUpload(response) {
        let self = this;
        const uploadMediaData = new FormData();
        uploadMediaData.append('OSSAccessKeyId', self.state.imgSign.accessid);
        uploadMediaData.append('policy', self.state.imgSign.policy);
        uploadMediaData.append('Signature', self.state.imgSign.signature);
        uploadMediaData.append('key', self.state.imgSign.dir + Math.floor(Math.random() * 99999));
        uploadMediaData.append('success_action_status', 201);
        uploadMediaData.append('file', {
            uri: response.uri,
            type: 'multipart/form-data',
            name: response.fileName,
        });

        // 上传成功
        successResponse = (xhr) => {
            console.log(xhr);
        };
        //上传失败
        failResponse = (err) => {
            console.log(err);
            // to do
        };

        //开始上传
        const OSS_UPLOAD_URI = 'https://taijiqiu.oss-cn-hangzhou.aliyuncs.com';
        console.log(uploadMediaData);
        this.futch(OSS_UPLOAD_URI, {
            method: 'POST',
            body: uploadMediaData,
            extra: null,
        }, (progressEvent) => {
            // progress 就是上穿的进度， 更新 state 里面的uploadProgress
        }, (xhr) => successResponse(xhr), failResponse)
            .then((res) => {
                console.log('成功', res);
            })
            .catch((err) => {
                console.log('失败', err);
            })
    }

    // 上传图片二维码
    startUpload2(response) {
        let self = this;
        const uploadMediaData = new FormData();
        uploadMediaData.append('OSSAccessKeyId', self.state.imgSign.accessid);
        uploadMediaData.append('policy', self.state.imgSign.policy);
        uploadMediaData.append('Signature', self.state.imgSign.signature);
        uploadMediaData.append('key', self.state.imgSign.dir + Math.floor(Math.random() * 99999));
        uploadMediaData.append('success_action_status', 201);
        uploadMediaData.append('file', {
            uri: response.uri,
            type: 'multipart/form-data',
            name: response.fileName,
        });

        // 上传成功
        successResponse = (xhr) => {
            console.log(xhr);
        };
        //上传失败
        failResponse = (err) => {
            console.log(err);
            // to do
        };

        //开始上传
        const OSS_UPLOAD_URI = 'https://taijiqiu.oss-cn-hangzhou.aliyuncs.com';
        console.log(uploadMediaData);
        this.futch2(OSS_UPLOAD_URI, {
            method: 'POST',
            body: uploadMediaData,
            extra: null,
        }, (progressEvent) => {
            // progress 就是上穿的进度， 更新 state 里面的uploadProgress
        }, (xhr) => successResponse(xhr), failResponse)
            .then((res) => {
                console.log('成功', res);
            })
            .catch((err) => {
                console.log('失败', err);
            })
    }

    // 上传图片二维码
    futch2 = (url, opts = {}, onProgress, successResponse, failResponse) => {
        console.log(url);
        console.log(opts);
        return new Promise((res, rej) => {
            let xhr = new XMLHttpRequest();
            xhr.open(opts.method || 'get', url);
            for (let k in opts.headers || {})
                xhr.setRequestHeader(k, opts.headers[k]);
            xhr.onload = e => res(e);
            xhr.onreadystatechange = (e) => {
                console.log(xhr.responseText)
                if (xhr.readyState !== 4) {
                    return;
                }
                //阿里云的状态码201 才有返回的信息
                if (xhr.status === 201) {
                    xhr.extra = opts.extra;
                    this.setState({
                        img: xhr.responseText.match(/<Key>([^<]*)<\/Key>/)[1],
                        wxQrcode: xhr.responseText.match(/<Key>([^<]*)<\/Key>/)[1]
                    })
                    successResponse(xhr);
                    console.log(this.state.wxQrcode);
                } else {
                    xhr.extra = opts.extra;
                    failResponse(xhr);
                }
                this.setState({
                    loadingState: false
                })
            };
            xhr.onerror = rej;
            if (xhr.upload && onProgress)
                xhr.upload.onprogress = onProgress;
            xhr.setRequestHeader('Content-Type', 'multipart/form-data');
            xhr.send(opts.body);
        });

    }
    // 微信号确定
    WxNodetermine = () => {
        if (this.state.wxnoInput == '') {
            Alert.alert('请输入微信号');
            return;
        }
        this.setState({
            WxNo: this.state.wxnoInput,
            WxNoModal: false
        })
    }
    //上传图片代码
    futch = (url, opts = {}, onProgress, successResponse, failResponse) => {
        console.log(url);
        console.log(opts);
        return new Promise((res, rej) => {
            let xhr = new XMLHttpRequest();
            xhr.open(opts.method || 'get', url);
            for (let k in opts.headers || {})
                xhr.setRequestHeader(k, opts.headers[k]);
            xhr.onload = e => res(e);
            xhr.onreadystatechange = (e) => {
                console.log(xhr.responseText)
                this.setState({
                    loadingState: false
                })
                if (xhr.readyState !== 4) {
                    return;
                }
                //阿里云的状态码201 才有返回的信息
                if (xhr.status === 201) {
                    xhr.extra = opts.extra;
                    this.setState({
                        img: xhr.responseText.match(/<Key>([^<]*)<\/Key>/)[1],
                        headurl: xhr.responseText.match(/<Key>([^<]*)<\/Key>/)[1]
                    })
                    successResponse(xhr);
                } else {
                    xhr.extra = opts.extra;
                    failResponse(xhr);
                }
            };
            xhr.onerror = rej;
            if (xhr.upload && onProgress)
                xhr.upload.onprogress = onProgress;
            xhr.setRequestHeader('Content-Type', 'multipart/form-data');
            xhr.send(opts.body);
        });
    }
    // 微信二维码
    chooseQrcode = () => {
        let self = this;
        fetch(JFAPI.ossGetsign)
            .then((response) => response.json())
            .then((data) => {
                self.setState({
                    imgSign: {
                        accessid: data.accessid,
                        dir: data.dir,
                        expire: data.expire,
                        host: data.host,
                        policy: data.policy,
                        signature: data.signature
                    }
                })
            })
            .catch((err) => {
                console.log(err);
            })
        ImagePicker.showImagePicker(options, (response) => {
            console.log(response);
            if (response.didCancel) {
                // this.openSetting();
                console.log('用户取消了选择！');
            } else if (response.error) {
                Alert.alert(
                    '提示',
                    '"悠然太极球"想要访问您的相机相册？',
                    [
                        {text: "确定", onPress: () => this.openSetting()}
                    ]
                );
                // alert("ImagePicker发生错误：" + response.error);
            } else {
                self.setState({
                    loadingState: true
                })
                let source = {uri: response.uri};
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.startUpload2(response);
                console.log(source);
                this.setState({
                    Headportrait2: source
                });

            }
        })
    }
    // 昵称确定
    Nickdetermine = () => {
        if (this.state.nickNameInput == '') {
            Alert.alert("请输入您的昵称");
            return false;
        }
        this.setState({
            nickName: this.state.nickNameInput,
            nickNameModal: false
        })
    }
    // 邮箱确定
    emaildetermine = () => {
        if (this.state.emailInput == '') {
            if (this.state.nickNameInput == '') {
                Alert.alert('请输入要修改的邮箱');
                return false;
            }
        }
        this.setState({
            email: this.state.emailInput,
            emailModal: false
        })
    }
    // 性别确定
    Sexdetermine = () => {
        if (this.state.SexNum == 1) {
            this.setState({
                SexText: "男"
            })
        } else if (this.state.SexNum == 2) {
            this.setState({
                SexText: "女"
            })
        }
        this.setState({
            SexModal: false
        })
    }

    componentDidMount() {
        console.log(this.props.navigation.state.params);
        if (this.props.navigation.state.params.data) {
            let data = this.props.navigation.state.params.data;
            this.setState({
                headurl: data.headurl,
                nickName: data.nickName,
                birthday: data.birthday,
                chooseTime: data.birthday,
                introduce: data.introduce,
                Headportrait: data.headurl,
                address: data.address,
                email: data.email ? data.email : '',
                longitude: data.longitude,
                latitude: data.latitude,
                id: data.id,
                wxQrcode: data.wxQrcode,
                WxNo: data.wxNo
            })
            if (data.sex == 1) {
                this.setState({
                    SexText: '男'
                })
            } else if (data.sex == 2) {
                this.setState({
                    SexText: '女'
                })
            }
        }
        DeviceEventEmitter.addListener('getAddress', (dic) => {
            this.setState({
                loadingState:true
            })
            console.log(dic);
            if (dic.address.length > 0) {
                let data = JSON.parse(dic.address);
                this.setState({
                    address: data.address,
                    longitude: data.longitude,
                    latitude: data.latitude,
                    loadingState:false
                })
            }else{
                this.setState({
                    loadingState:false
                })
            }
        })
    }

    componentWillMount() {
        let self = this;
        fetch(JFAPI.ossGetsign)
            .then((response) => response.json())
            .then((data) => {
                self.setState({
                    imgSign: {
                        accessid: data.accessid,
                        dir: data.dir,
                        expire: data.expire,
                        host: data.host,
                        policy: data.policy,
                        signature: data.signature
                    }
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

const styles = StyleSheet.create({
    ScrollViewSty: {
        flex: 1
    },
    containerAppPerson: {
        flex: 1,
        backgroundColor: "#F3F3F3",
        justifyContent: "center",
        alignItems: "center"
    },
    RDbg: {
        width: width,
        backgroundColor: "#FFFFFF",
        justifyContent: "space-between"
    },
    loginSty1: {
        width: "94%",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: "#EAEAEA",
        borderBottomWidth: 1,
        paddingBottom: 15,
        paddingTop: 15,
        marginLeft: "3%"
    },
    loginSty3: {
        width: "94%",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 15,
        paddingTop: 15,
        marginLeft: "3%"
    },
    loginSty2: {
        width: width * 0.8,
        flexDirection: 'row',
        borderBottomColor: "#EAEAEA",
        borderBottomWidth: 1,
        marginTop: 23,
        paddingBottom: 20
    },
    loginSty1Child: {
        flexDirection: "row",
        alignItems: "center",
        width: "98%",
        justifyContent: "space-between"
    },
    Nicheng: {
        fontSize: 18,
        color: "#3A3A3A",
    },
    AinputstyGejs: {
        width: width * 0.62,
        paddingLeft: 20,
        fontSize: 16,
        textAlign: "right",
        paddingRight: 10
    },
    ImgSizePer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    mask: {
        justifyContent: "center",
        backgroundColor: "#383838",
        opacity: 0.7,
        position: "absolute",
        width: width,
        height: height,
        left: 0,
        top: 0,
        zIndex: 11,
    },
    selectSex: {
        width: width * 0.8,
        backgroundColor: "#FFFFFF",
        marginLeft: width * 0.1,
        position: "absolute",
        bottom: height * 0.4,
        borderRadius: 7,
        zIndex: 20
    },
    leftLine: {
        height: 1,
        backgroundColor: '#EAEAEA',
        width: "27%"
    },
    rightLine: {
        height: 1,
        backgroundColor: '#EAEAEA',
        width: "27%"
    },
    ztdlineSty: {
        width: "86%",
        marginLeft: "7%",
        height: 1,
        backgroundColor: "#EAEAEA",
        marginTop: 20
    },
    allSex: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: 15
    },
    selectSexText: {
        fontSize: 14,
        color: "#282828"
    },
    allSex2: {
        flexDirection: "row",
        width: "90%",
        marginLeft: "5%",
        justifyContent: "space-around",
        marginTop: 20
    },
    dbanniurqSc: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        marginBottom: 15,
        justifyContent: "space-around"
    },
    dbanniurq: {
        width: "100%",
        alignItems: "center",
        marginTop: 15,
        marginBottom: 15
    },
    dbanniurqTextQx: {
        color: "#8A6246",
        fontSize: 17,
        fontWeight: "bold",
        paddingTop: 14
    },
    dbanniurqText: {
        color: "#8A6246",
        fontSize: 17,
        fontWeight: "bold"
    },
    dbanniurqTextSc: {
        color: "#DDDDDD",
        fontSize: 17,
        fontWeight: "bold"
    },
    ZDYinputPer: {
        width: "100%",
        height: 40,
        backgroundColor: "#F3F3F3",
        paddingLeft: 15
    },
    DeleText: {
        color: "#282828",
        fontSize: 17
    },
    AdbanniuQ: {
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
    }
});
