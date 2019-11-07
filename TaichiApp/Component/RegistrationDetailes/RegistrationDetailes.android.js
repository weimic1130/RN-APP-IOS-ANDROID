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
// 省市区选择器
import CPicker from 'react-native-picker';

let _Picker = null;
// 选择图片
import ImagePicker from 'react-native-image-picker';
// 弹框
import ModalBox from 'react-native-modalbox';
import {createStackNavigator, StackActions, NavigationActions, createAppContainer} from "react-navigation";
import {
    PermissionsAndroid,
    DatePickerAndroid,
    TouchableOpacity,
    AppState,
    DeviceEventEmitter,
    Picker,
    TouchableHighlight,
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
    Modal,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    NativeModules
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import {JFAPI} from "../Registration/API/API";
import forge from "node-forge";
import global from '../global';
let {width, height} = Dimensions.get('window');
let codeTime = 60;
// 图片选择参数设置
const options = {
    title: '请选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '相册图片',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
let self = this
export default class RegistrationDetailesAndroid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mqx: false,
            sexState: false,
            // 详细地址
            positionText: '',
            // 选择的出生日期
            chooseTime: '',
            // 昵称
            nickName: '',
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
            StateMask2: false,
            // 性别
            gender: '1',
            genderText: '',
            // 日期
            TimesDate: false,
            val: this.props.title,
            data: [],
            avatarSource: null,
            // oss签名
            imgSign: {
                accessid: '',
                dir: '',
                expire: '',
                host: '',
                policy: '',
                signature: ''
            },
            presetDate: new Date(2016, 3, 5),
            allDate: new Date(2020, 4, 5),
            simpleText: '选择日期,默认今天',
            minText: '选择日期,不能比今日再早',
            maxText: '选择日期,不能比今日再晚',
            presetText: '选择日期,指定2016/3/5'
        }
        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({
            chosenDate: newDate,
            chooseTime: newDate.toLocaleDateString().replace(/\//g, "-") + ' ' + newDate.toTimeString().substr(0, 8)
        });
    }

    static navigationOptions = {
        headerTitle: '完善资料',
    };


    render() {
        return (
            <View style={styles.containerAppR}>
                <ImageBackground style={{width: '100%', flex: 1, alignItems: "center"}} source={require('./Images/tuceng1.png')}>
                    <ScrollView keyboardShouldPersistTaps="always" style={styles.ScrollViewSty}>
                        <TouchableWithoutFeedback onPress={() => this.requestPhots()}>
                            <View style={styles.RDbgT}>
                                {
                                    this.state.headurl ? <Image roundAsCircle={true} style={styles.RDbgI1} source={{uri:global.PicUrl +  this.state.headurl}}/> :
                                        <Image style={styles.RDbgI} source={require('./Images/slzndx.png')}/>
                                }
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.RDbg}>
                            {/*昵称*/}
                            <View style={styles.loginSty1}>
                                <View style={styles.loginSty1Child}>
                                    <Text style={styles.Nicheng}>昵称</Text>
                                    <View style={styles.alifnChid}>
                                        <TextInput value={this.state.nickName} onChangeText={(text) => this.setState({nickName: text})} placeholderTextColor="#B2B2B2" style={styles.Ainputsty}
                                                   placeholder="请输入昵称"></TextInput>
                                        <Image source={require('./Images/l.png')}/>
                                    </View>
                                </View>
                            </View>
                            {/*性别*/}
                            <TouchableWithoutFeedback onPress={() => this.Sexselection()}>
                                <View style={styles.loginSty2}>
                                    <View style={styles.loginSty2Child}>
                                        <Text style={styles.Nicheng}>性别</Text>
                                        <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "center"}}>
                                            {
                                                this.state.genderText ? <Text style={{color: "#B2B2B2", fontSize: 16, paddingRight: 10}}>{this.state.genderText}</Text> :
                                                    <Text style={{color: "#B2B2B2", fontSize: 16, paddingRight: 10}}>请选择</Text>
                                            }
                                            <Image source={require('./Images/l.png')}/>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            {/*出生日期*/}
                            <TouchableWithoutFeedback onPress={() => this.DateSelect()}>
                                <View style={styles.loginSty2}>
                                    <View style={styles.loginSty2Child}>
                                        <Text style={styles.Nicheng}>出生日期</Text>
                                        <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "center"}}>
                                            {
                                                this.state.chooseTime ? <Text style={{color: "#B2B2B2", fontSize: 16, paddingRight: 10}}>{this.state.chooseTime.substring(0, 9)}</Text> :
                                                    <Text style={{color: "#B2B2B2", fontSize: 16, paddingRight: 10}}>请选择</Text>
                                            }
                                            <Image source={require('./Images/l.png')}/>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            {/*个人简介*/}
                            <View style={styles.loginSty3}>
                                <View style={styles.loginSty1Child}>
                                    <Text style={styles.Nicheng}>个人简介</Text>
                                    <View style={{flexDirection: 'row', justifyContent: "center"}}>
                                        <TextInput value={this.state.introduce} onChangeText={(text) => this.setState({introduce: text})} multiline={true} placeholderTextColor="#B2B2B2"
                                                   style={styles.AinputstyGejs}
                                                   placeholder="太极是中国思想史上的重要概念，主要继承自《周易》：“易有大恒"></TextInput>
                                    </View>
                                </View>
                            </View>
                            {/*常驻地址*/}
                            <TouchableWithoutFeedback onPress={() => this.Citydata()}>
                                <View style={styles.loginSty2}>
                                    <View style={styles.loginSty2Child}>
                                        <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "center"}}>
                                            <FontAwesome style={{paddingRight: 3}} name={'asterisk'} size={8} color="#FF0000"/>
                                            <Text style={styles.Nicheng}>常驻地址</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "center"}}>
                                            {
                                                this.state.positionText ? <Text style={{color: "#B2B2B2", fontSize: 16, paddingRight: 10}}>{this.state.positionText}</Text> :
                                                    <Text style={{color: "#B2B2B2", fontSize: 16, paddingRight: 10}}>请选择</Text>
                                            }
                                            <Image source={require('./Images/l.png')}/>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            {/*邮箱*/}
                            <View style={styles.loginSty2}>
                                <View style={styles.loginSty1Child}>
                                    <Text style={styles.Nicheng}>邮箱</Text>
                                    <View style={styles.alifnChid}>
                                        <TextInput value={this.state.email} onChangeText={(text) => this.setState({email: text})} placeholderTextColor="#B2B2B2" style={styles.Ainputsty}
                                                   placeholder="********@163.com"></TextInput>
                                        <Image source={require('./Images/l.png')}/>
                                    </View>
                                </View>
                            </View>
                            <TouchableWithoutFeedback onPress={() => this.completeRegistered()}>
                                <View style={styles.AdbanniuQ}>
                                    <Text style={styles.AdbanniuText}>完成注册</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.goback()}>
                                <View style={styles.AdbanniuQR}>
                                    <Text style={styles.AdbanniuTextQR}>返回上一步</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </ScrollView>
                </ImageBackground>
                {
                    this.state.sexState ?
                        <Animated.View style={styles.mask}></Animated.View>
                        : null
                }
                {/*选择性别*/}
                {
                    this.state.sexState ? <View style={[styles.PickerSty]}>
                        <View style={[styles.PickerChlden]}>
                            <TouchableWithoutFeedback onPress={() => this.closePickerDemo(2)}>
                                <Text>取消</Text>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.closePickerDemo(1)}>
                                <Text style={{color: "#0E6AFF"}}>确定</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        <Picker selectedValue={this.state.gender} mode='dropdown' style={[styles.PickerStyItem]}
                                itemStyle={{fontSize: 20, color: '#333333', textAlign: 'center', fontWeight: 'bold'}} onValueChange={(lang) => this.setState({gender: lang})}>
                            <Picker.Item label="女" value='1'/>
                            <Picker.Item label="男" value='2'/>
                        </Picker>
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
                        <View style={{borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.5)', width: 100, height: 100, alignItems: 'center'}}>
                            <ActivityIndicator animating={true} color='white' style={{marginTop: 20, width: 60, height: 60,}} size="large"/>
                            <Text style={{color: "#ffffff", fontSize: 13}}>加载中...</Text>
                        </View>
                    </View> : null
                }
            </View>
        );
    }

    // 选择图片
    choosePic() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log(response);
            if (response.didCancel) {
                console.log('用户取消了选择！');
            } else if (response.error) {
                Alert.alert(
                    '提示',
                    '"悠然太极球"需要访问您的相册相机',
                    [
                        {text: "确定", onPress: () => this.openSetting()}
                    ]
                );
            } else if (response.error == 'Photo library permissions not granted') {
                Alert.alert(
                    '提示',
                    '"悠然太极球"需要访问您的相册',
                    [
                        {text: "确定", onPress: () => this.openSetting()}
                    ]
                );
            } else if (response.error == "Camera not available on simulator") {
                Alert.alert(
                    '提示',
                    '"悠然太极球"需要访问您的相机',
                    [
                        {text: "确定", onPress: () => this.openSetting()}
                    ]
                );
            } else if (response.customButton) {
                Alert.alert("自定义按钮点击：" + response.customButton);
            } else {
                let source = {uri: response.uri};
                console.log(source);
                this.setState({
                    loadingState: true
                })
                this.startUpload(response);
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    avatarSource: source
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
        const OSS_UPLOAD_URI = 'https://taijiqiu.oss-cn-hangzhou.aliyuncs.com'
        this.futch(OSS_UPLOAD_URI, {
            method: 'POST',
            body: uploadMediaData,
            extra: null,
        }, (progressEvent) => {
            // progress 就是上穿的进度， 更新 state 里面的uploadProgress
        }, (xhr) => successResponse(xhr), failResponse)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
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


    async showPicker(stateKey, options) {
        try {
            const {action} = DatePickerAndroid.open({
                // 要设置默认值为今天的话，使用`new Date()`即可               
                date: new Date()
            }).then(({year, month, day}) => {
                if (action !== DatePickerAndroid.dismissedAction) {
                    // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day 
                    if (year) {
                        this.setState({
                            chooseTime: year + '-' + (month + 1) + '-' + day
                        })
                    }
                    console.log(year + '-' + (month + 1) + '-' + day)
                }
            })
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }

    }

    // 打开设置
    openSetting = () => {
        NativeModules.OpenSettings.openNetworkSettings((data) => {
            console.log('call back data', data);
        })
    }

    // 选择日期
    DateSelect() {
        let self = this;
        this.showPicker(this, {date: this.state.presetDate})
    }

    goback() {
        let self = this;
        self.props.navigation.goBack()
    }


    // 关闭选择日期
    closeDate(parameter) {
        let self = this;
    }

    componentDidMount() {
    }

    //省市区
    provincialUrbanArea() {
        let jsonData = require('./City/area.json');
        let data = [];
        for (let i in jsonData) {
            let obj = new Object();
            obj[i] = jsonData[i];
            data.push(obj);
        }
        this.pickerInit(data, ['北京', '北京', '东城区'], '省市区');
    }

    onDateChange(date) {

    }

    //组件初始化
    pickerInit(data, selectedValue, title) {
        CPicker.init({
            pickerData: data,
            selectedValue: selectedValue,
            pickerTitleText: title,
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            //确定
            onPickerConfirm: data => {
                console.log(1);
                data = data.join(' ');
                this.setState({
                    val: data
                });
                this.setState({
                    StateMask: false
                })
            },
            //取消
            onPickerCancel: data => {
                console.log(2);
                this.setState({
                    StateMask: false
                })
            },
            //选择
            onPickerSelect: data => {
                console.log(3);
            }
        });
        _Picker = CPicker;
        _Picker.show();
    }

    guanbi = () => {
        console.log("关闭");
    }

    pickerType() {
        this.provincialUrbanArea();
        this.setState({
            StateMask: true
        })
    }

    // 获取相册相机权限
    async requestPhots() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
            );
            console.log(granted);
            if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                console.log("获取相册相机权限");
                this.requestDux()
            } else {
                Alert.alert('提示', '"悠然太极球"需要访问您的相册和相机，否则将无法上传图片', [{text: "确定", onPress: () => this.openSetting()}])
                console.log('获取读写权限失败');
            }
        } catch (err) {
            console.log(err);
        }

    }

    // 读写权限
    async requestDux() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            );
            if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                console.log("读写权限");
                this.choosePic();
            } else {
                Alert.alert('提示', '"悠然太极球"需要访问您手机的读写权限', [{text: "确定", onPress: () => this.openSetting()}])
            }
        } catch (err) {
            console.log(err);
        }
    }

    // 打开常驻地址
    Citydata() {
        let self = this;
        if (self.state.positionText == '') {
            // Alert.alert(
            //     '提示',
            //     '"悠然太极球"需要访问您的地理位置',
            //     [
            //         {text: '取消'},
            //         {text: "确定", onPress: () => this.openSetting()}
            //     ]
            // );
        }
        self.getLocationText();
    }

    // 获取地理位置
    getLocationText() {
        let self = this;
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    if (position) {
                        console.log(position);
                        self.setState({
                            longitude: position.coords.latitude,
                            latitude: position.coords.longitude
                        })
                        fetch(`https://restapi.amap.com/v3/assistant/coordinate/convert?locations=${position.coords.longitude},${position.coords.latitude}&coordsys=gps&output=json&key=0a65090fa849ac282563381fcbbc2e46`, {method: "GET"})
                            .then(response => response.json())
                            .then((responsejson) => {
                                let newVar = responsejson.locations.split(',')
                                fetch('http://restapi.amap.com/v3/geocode/regeo?key=0a65090fa849ac282563381fcbbc2e46&location=' + newVar[0] + ',' + newVar[1] + '&radius=1000&extensions=all&batch=false&roadlevel=0', {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                    body: ``
                                })
                                    .then((response) => response.json())
                                    .then((jsonData) => {
                                        console.log(jsonData.regeocode.addressComponent.city);
                                        console.log(jsonData.regeocode.addressComponent.province);
                                        console.log(jsonData.regeocode.addressComponent.district);
                                        this.setState({
                                            positionText: jsonData.regeocode.addressComponent.city + jsonData.regeocode.addressComponent.province + jsonData.regeocode.addressComponent.district
                                        })
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    });

                            })
                            .catch((error) => {
                                console.log("获取失败");
                                console.log(error);
                            })
                    } else {
                        Alert.alert(
                            '提示',
                            '请前往手机设置里面，打开位置授权，否则将无法进行注册',
                            [
                                {text: '取消'},
                                {text: "确定", onPress: () => this.openSetting()}
                            ]
                        );
                        console.log('拒绝了请求');
                    }
                }, (error) => {
                    Alert.alert(
                        '提示',
                        '请前往手机设置里面，打开位置授权，否则将无法进行注册',
                        [
                            {text: '取消'},
                            {text: "确定", onPress: () => this.openSetting()}
                        ]
                    );
                    // Alert.alert('解析地理位置出错',JSON.stringify(error));
                    // Alert.alert('请前往手机设置里面，打开位置授权，否则将无法进行注册');
                    console.log(error);
                }
            )
        })
    }

    // 完成注册
    completeRegistered() {
        let self = this;
        let nickName = self.state.nickName;
        let headurl = self.state.headurl;
        let positionText = self.state.positionText;
        self.getLocationText();
        if(self.state.positionText == ''){
            Alert.alert(
                '提示',
                '"悠然太极球"需要访问您的地理位置',
                [
                    {text: '取消'},
                    {text: "确定", onPress: () => this.openSetting()}
                ]
            );
        }else{
            if (nickName == '') {
                Alert.alert(
                    '',
                    '请输入您的昵称',
                    [
                        {text: '确定'},
                    ]
                )
                return;
            }
            if (self.state.gender == 1) {
                self.setState({
                    sex: 2
                })
            } else if (self.state.gender == 2) {
                self.setState({
                    sex: 1
                })
            }
            if (self.state.chooseTime == '') {
                Alert.alert(
                    '',
                    '请选择您的出生日期',
                    [
                        {text: '确定'},
                    ]
                )
                return;
            }
            if (positionText == '') {
                Alert.alert(
                    '',
                    '悠然太极球"需要访问您的地理位置，否则将无法进行注册',
                    [
                        {
                            text:'确定',
                            onPress:() => self.openSetting()
                        }
                    ]
                )
                return;
            } else {
                this.getLocationText();
            }
            if (self.state.val == '') {
                Alert.alert(
                    '',
                    '请选择您的常驻地址',
                    [
                        {text: '确定'},
                    ]
                )
                return;
            }
            this.Citydata();
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    if (position) {
                        console.log(position);
                        self.setState({
                            longitude: position.coords.latitude,
                            latitude: position.coords.longitude
                        })
                        let opts = {
                            method: 'POST'
                        };
                        self.setState({
                            loadingState: true
                        })
                        let Strdata = {
                            nickName: nickName,
                            headurl: headurl,
                            sex: self.state.sex,
                            birthday: self.state.chooseTime,
                            introduce: self.state.introduce,
                            address: self.state.positionText,
                            longitude: self.state.longitude,
                            latitude: self.state.longitude,
                            id: self.state.id
                        };
                        console.log(Strdata);
                        fetch(JFAPI.updateinfo + "?nickName=" + Strdata.nickName + "&id=" + self.state.id + "&address=" + Strdata.address + "&longitude=" + Strdata.longitude + "&latitude=" + Strdata.latitude + '&headurl=' + Strdata.headurl + '&sex=' + Strdata.sex + "&birthday=" + Strdata.birthday + "&introduce=" + Strdata.introduce, opts)
                            .then((response) => response.json())
                            .then((data) => {
                                console.log(data);
                                if (data.code == 0) {
                                    self.props.navigation.dispatch(
                                        StackActions.reset({
                                            index: 0,
                                            actions: [NavigationActions.navigate({routeName: 'HomeN'})]
                                        })
                                    )
                                }else if(data.code == -1){
                                    Alert.alert(res.info);
                                }
                                self.setState({
                                    loadingState: false
                                })
                            }).catch(error => {
                            self.setState({
                                loadingState: false
                            })
                            console.log(error);
                            console.log("请求失败")
                        })
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
        }
    }

    onRequestClose() {
        this.setState({
            StateMask: false
        })
    }

    componentWillMount() {
        let self = this;
        console.log('安卓');
        // 获取权限
        // this.requestReadPermission();
        AsyncStorage.getItem('userInfo')
            .then(result => {
                console.log(JSON.parse(result));
                self.setState({
                    id: JSON.parse(result).id
                })
            }).catch(error => {
            console.log("读取失败");
        })
        // self.getLocationText();
        // 获取oss签名
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
                console.log(data);
            }).catch(error => {
        })
    }

    async requestReadPermission() {
        try {
            //返回string类型
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("以获取权限");
            } else {
                Alert.alert('提示', '"悠然太极球"需要访问您地理位置', [{text: "确定", onPress: () => this.openSetting()}])
                console.log("获取权限失败");
            }
        } catch (err) {
            console.log(err);
        }
    }

    // 打开性别选择器
    Sexselection() {
        let self = this;
        self.setState({
            sexState: true
        })
        // this.refs.sexModal.open();
    }

    // 关闭选择性别
    closePickerDemo(parameter) {
        let self = this;
        // this.refs.sexModal.close();
        self.setState({
            sexState: false
        })
        if (parameter == 1) {
            if (self.state.gender == 1) {
                self.setState({
                    genderText: '女'
                })
            } else if (self.state.gender == 2) {
                self.setState({
                    genderText: '男'
                })
            }
        } else if (parameter == 2) {

        }
    }
}

const styles = StyleSheet.create({
    DateIos: {
        zIndex: 20
    },
    ScrollViewSty: {
        flex: 1
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
    containerAppR: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    RDbg: {
        width: width * 0.9,
        // height: height * 0.7,
        // marginLeft: width * 0.05,
        marginTop: width * 0.15,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        alignItems: "center"
    },
    RDbgT: {
        width: width * 0.24,
        height: width * 0.24,
        backgroundColor: "#EDEDED",
        borderRadius: 55,
        left: "39%",
        position: 'absolute',
        top: 15,
        zIndex: 10,
        borderWidth: 4,
        borderColor: "#FFFFFF",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    RDbgI1: {
        width: "100%",
        height: "100%",
        borderRadius: 40
    },
    RDbgI: {
        width: 43,
        height: 40
    },
    loginSty1: {
        width: width * 0.8,
        flexDirection: 'row',
        borderBottomColor: "#EAEAEA",
        borderBottomWidth: 1,
        marginTop: 70,
        paddingBottom: 20
    },
    loginSty3: {
        width: width * 0.8,
        flexDirection: 'row',
        borderBottomColor: "#EAEAEA",
        borderBottomWidth: 1,
        alignItems: "stretch",
        marginTop: 20,
        paddingBottom: 20
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
        width: "100%"
    },
    loginSty2Child: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: "99%"
    },
    alifnChid: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    nalifnChid: {
        flexDirection: 'row',
        justifyContent: "center"
    },
    Nicheng: {
        fontSize: 18,
        color: "#3A3A3A",
    },
    Ainputsty: {
        width: width * 0.67,
        paddingLeft: 20,
        fontSize: 16,
        textAlign: "right",
        paddingRight: 10
    },
    AinputstyGejs: {
        width: width * 0.62,
        paddingLeft: 20,
        fontSize: 16,
        textAlign: "right",
        paddingRight: 10
    },
    AinputstySh: {
        width: width * 0.55,
        paddingLeft: 20,
        fontSize: 16,
        textAlign: "right",
        paddingRight: 10
    },
    PickerSty2: {
        width: Dimensions.get('window').width,
        height: height,
        position: "absolute",
        top: 0
    },
    PickerStyDate: {
        width: Dimensions.get('window').width,
        position: "absolute",
        bottom: 0,
        backgroundColor: "#ffffff",
        borderColor: "#dddddd",
        borderTopWidth: 1,
        zIndex: 12
    },
    PickerSty: {
        width: Dimensions.get('window').width,
        position: "absolute",
        bottom: 0,
        backgroundColor: "#ffffff",
        borderColor: "#dddddd",
        borderTopWidth: 1,
        zIndex: 12
    },
    PickerStyItem: {
        width: Dimensions.get('window').width
    },
    PickerChlden: {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 0,
        paddingTop: 10,
    },
    PickerChldenDate: {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        paddingTop: 10,
    },
    AdbanniuQ: {
        width: width * 0.8,
        backgroundColor: "#8A6246",
        marginTop: 10,
        borderColor: "#8A6246",
        borderWidth: 1,
        borderRadius: 3,
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
    },
    AdbanniuQR: {
        width: width * 0.8,
        backgroundColor: "#ffffff",
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 10
    },
    AdbanniuText: {
        color: "#FFFFFF",
        fontSize: 16
    },
    AdbanniuTextQR: {
        color: "#B2B2B2",
        fontSize: 16
    },
    picker: {
        height: 40,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#ccc'
    },
    txt: {
        flex: 1,
        lineHeight: 38,
        textAlign: 'center',
        color: '#444',
        fontSize: 15,
    },
    ModalBoxSty: {
        width: width,
        flex: 1,
        backgroundColor: "transparent"
    }
});
