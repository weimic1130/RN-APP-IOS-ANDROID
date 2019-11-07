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
// 选择图片
import ImagePicker from 'react-native-image-picker';
import Loading from '../LoadingAnimation/LoadingAnimation';
import global from '../global';
import {createStackNavigator, StackActions, NavigationActions, createAppContainer} from "react-navigation";
import {
    NativeModules,
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
    ScrollView,
    Animated,
    ActivityIndicator, Picker, Modal, Linking, Keyboard
} from "react-native";
import {JFAPI} from "./API/API";
import AsyncStorage from "@react-native-community/async-storage";
// 图片选择参数设置
let options = {
    title: '请选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '相册图片',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
let {width, height} = Dimensions.get('window');
export default class CreateTcGroupIos extends React.Component {
    constructor(props) {
        super(props);
        this.keyboardDidShowListener = null;
        this.state = {
            LoadingState: false,
            BtnText: '确认创建',
            imgList: '',
            status: 0,
            // 修改
            editData: '',
            userInfo: '',
            Headportrait2: '',
            // 太极团名称
            title: '',
            // 太极团头像
            img: '',
            // 常驻地址
            address: '',
            // 团简介
            intro: '',
            // 群成员数
            num: '',
            // oss签名
            imgSign: {
                accessid: '',
                dir: '',
                expire: '',
                host: '',
                policy: '',
                signature: ''
            },
        }
    }

    static navigationOptions = {
        headerTitle: '创建太极团',
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
            <View style={styles.containerAppSet}>
                {
                    this.state.status == 0 ?
                        <ScrollView keyboardShouldPersistTaps="always" style={{flex: 1, marginBottom: 20}}>
                            <TouchableWithoutFeedback onPress={() => this.closeFocus()}>
                                <View style={styles.AboutChild1}>
                                    <View style={styles.AboutChild12}>
                                        <Text style={styles.AboutChild12Text}>太极团名称：</Text>
                                        <TextInput ref="taijituan"
                                                   returnKeyType="done"
                                                   onChangeText={(text) => this.setState({title: text})}
                                                   value={this.state.title} style={{width: "70%", textAlign: "right"}}
                                                   placeholder="请输入太极团名称"></TextInput>
                                    </View>
                                    <TouchableWithoutFeedback onPress={() => this.choosePic()}>
                                        <View style={styles.AboutChild12}>
                                            <Text style={styles.AboutChild12Text}>太极团头像：</Text>
                                            {
                                                this.state.img ? <Image style={{width: 50, height: 50}}
                                                                        source={{uri: global.PicUrl + this.state.img}}/> :
                                                    <Image source={require('./Images/3.png')}/>
                                            }
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <View style={styles.AboutChild12S}>
                                        <Text style={styles.AboutChild12Text}>群成员数：</Text>
                                        <TextInput ref="qunchengyuan"
                                                   returnKeyType="done"
                                                   onChangeText={(text) => this.setState({num: text})}
                                                   value={this.state.num} style={styles.changzhudishuruk2}
                                                    placeholder="群成员数不大于20"></TextInput>
                                    </View>
                                    <View style={styles.AboutChild12S}>
                                        <Text style={styles.AboutChild12Text}>常驻地址：</Text>
                                        <TextInput ref="changzhudizhi" returnKeyType="done"
                                                   onChangeText={(text) => this.setState({address: text})}
                                                   value={this.state.address} style={styles.changzhudishuruk}
                                                   multiline={true}
                                                   blurOnSubmit={true}
                                                   placeholder="请描输入联系太极团的位置,能让附近拳友更快的 找到组织"></TextInput>
                                    </View>
                                    <View style={styles.AboutChild12N}>
                                        <Text style={styles.AboutChild12Text}>简介：</Text>
                                        <TextInput ref="jianjie" returnKeyType="done"
                                                   onChangeText={(text) => this.setState({intro: text})}
                                                   value={this.state.intro}
                                                   blurOnSubmit={true}
                                                   style={styles.jianjieshuruk}
                                                   multiline={true} placeholder="介绍一下您的太极团,方便附近拳友更了解您的太极 团"></TextInput>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.createGroup()}>
                                <View style={styles.AboutChild111}>
                                    <Text style={styles.tuichuSty}>确认创建</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </ScrollView> :
                        <ScrollView keyboardShouldPersistTaps="always" style={{flex: 1, marginBottom: 20}}>
                            <TouchableWithoutFeedback onPress={() => this.closeFocus()}>
                            <View style={styles.AboutChild1}>
                                <View style={styles.AboutChild12}>
                                    <Text style={styles.AboutChild12Text}>太极团名称：</Text>
                                    <TextInput onChangeText={(text) => this.setState({title: text})}
                                               value={this.state.title} style={{width: "70%", textAlign: "right"}}
                                               placeholder="请输入太极团名称"></TextInput>
                                </View>
                                <TouchableWithoutFeedback onPress={() => this.choosePic()}>
                                    <View style={styles.AboutChild12}>
                                        <Text style={styles.AboutChild12Text}>太极团头像：</Text>
                                        {
                                            this.state.img ? <Image style={{width: 50, height: 50}}
                                                                    source={{uri: global.PicUrl + this.state.img}}/> :
                                                <View style={styles.AddImgUrl}><Image
                                                    source={require('./Images/3.png')}/></View>
                                        }
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={styles.AboutChild12S}>
                                    <Text style={styles.AboutChild12Text}>群成员数：</Text>
                                    <TextInput onChangeText={(text) => this.setState({num: text})}
                                               value={this.state.num} style={styles.changzhudishuruk2}
                                               placeholder="群成员数不大于20"></TextInput>
                                </View>
                                <View style={styles.AboutChild12S}>
                                    <Text style={styles.AboutChild12Text}>常驻地址：</Text>
                                    <TextInput onChangeText={(text) => this.setState({address: text})}
                                               value={this.state.address} style={styles.changzhudishuruk}
                                               blurOnSubmit={true}
                                               multiline={true} placeholder="请描输入联系太极团的位置,能让附近拳友更快的 找到组织"></TextInput>
                                </View>
                                <View style={styles.AboutChild12N}>
                                    <Text style={styles.AboutChild12Text}>简介：</Text>
                                    <TextInput onChangeText={(text) => this.setState({intro: text})}
                                               blurOnSubmit={true}
                                               value={this.state.intro}
                                               style={styles.jianjieshuruk} multiline={true}
                                               placeholder="介绍一下您的太极团,方便附近拳友更了解您的太极 团"></TextInput>
                                </View>
                            </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.createGroup()}>
                                <View style={styles.AboutChild111}>
                                    <Text style={styles.tuichuSty}>{this.state.BtnText}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </ScrollView>
                }
                <Loading show={this.state.LoadingState}/>
            </View>
        );
    }

    componentWillMount() {
        let self = this;
        AsyncStorage.getItem('userInfo')
            .then(result => {
                console.log(JSON.parse(result));
                this.setState({
                    userInfo: JSON.parse(result)
                })
            }).catch(error => {
            console.log("读取失败");
        })
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
        if (this.props.navigation.state.params.data) {
            this.setState({
                BtnText: "确认修改",
                editData: this.props.navigation.state.params,
                status: 1,
                title: this.props.navigation.state.params.data.title,
                img: this.props.navigation.state.params.data.img,
                num: this.props.navigation.state.params.data.num.toString(),
                address: this.props.navigation.state.params.data.address,
                intro: this.props.navigation.state.params.data.intro
            })
        } else {
            this.setState({
                BtnText: '确认创建'
            })
        }
    }

    closeFocus = () => {
        console.log('关闭所有焦点');
        this.refs.taijituan.blur();
        this.refs.qunchengyuan.blur();
        this.refs.changzhudizhi.blur();
        this.refs.jianjie.blur();
    }
    // selfClose = () => {
    //     console.log('关闭群成员软键盘')
    //     this.refs.qunchengyuan.blur()
    // }
    // 打开设置
    openSetting = () => {
        Linking.openURL('app-settings:')
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
    }

    choosePic = () => {
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
                console.log('用户取消了选择！');
            } else if (response.error) {
                Alert.alert(
                    '提示',
                    '"悠然太极球"想要访问您的相机相册？',
                    [
                        {text: "确定", onPress: () => this.openSetting()}
                    ]
                );
            } else if (response.customButton) {
                alert("自定义按钮点击：" + response.customButton);
            } else {
                this.setState({
                    LoadingState: true
                })
                let source = {uri: response.uri};
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.startUpload(response);
                console.log(source);
                this.setState({
                    Headportrait2: source
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
        console.log(uploadMediaData);
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
        const OSS_UPLOAD_URI = 'http://taijiqiu.oss-cn-hangzhou.aliyuncs.com'
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
        this.setState({
            Loading: true
        })
        return new Promise((res, rej) => {
            let xhr = new XMLHttpRequest();
            xhr.open(opts.method || 'get', url);
            for (let k in opts.headers || {})
                xhr.setRequestHeader(k, opts.headers[k]);
            xhr.onload = e => res(e);
            xhr.onreadystatechange = (e) => {
                console.log(xhr.responseText)
                this.setState({
                    LoadingState: false
                })
                if (xhr.readyState !== 4) {
                    return;
                }
                //阿里云的状态码201 才有返回的信息
                if (xhr.status === 201) {
                    xhr.extra = opts.extra;
                    this.setState({
                        img: xhr.responseText.match(/<Key>([^<]*)<\/Key>/)[1],
                        imgList: xhr.responseText.match(/<Key>([^<]*)<\/Key>/)[1]
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
    createGroup = () => {
        let title = this.state.title;
        let img = this.state.img;
        let address = this.state.address;
        let intro = this.state.intro;
        let num1 = this.state.num.replace(/[ ]/g,"");
        let num = num1;
        if (title == '') {
            Alert.alert('请输入太极团名称');
            return;
        }
        if (img == '') {
            Alert.alert('请上传一张太极团头像');
            return;
        }
        if (address == '') {
            Alert.alert('请输入常驻地址');
            return;
        }
        if (intro == '') {
            Alert.alert('请输入简介');
            return;
        }
        if (num == '' || num > 20) {
            Alert.alert('群成员数不能大于20');
            return;
        }
        if (this.state.status == 0) {
            let url = JFAPI.saveGroup;
            let formData = new FormData();
            formData.append('title', title);
            formData.append('img', img);
            formData.append('address', address);
            formData.append('intro', intro);
            formData.append('userId', this.state.userInfo.id);
            formData.append('num', num);
            let opts = {
                body: formData,
                method: "POST"
            };
            console.log(url);
            console.log(opts);
            fetch(url, opts)
                .then((response) => response.json())
                .then((res) => {
                    if (res.code == 0) {
                        this.props.navigation.state.params.arefresh();
                        this.props.navigation.goBack();
                    } else {
                        Alert.alert('创建失败，请稍后再试');
                    }
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                    Alert.alert('创建失败，请稍后再试');
                })
        } else {
            console.log("修改");
            let url = JFAPI.saveGroup;
            let formData = new FormData();
            formData.append('title', title);
            formData.append('img', img);
            formData.append('address', address);
            formData.append('intro', intro);
            formData.append('userId', this.state.userInfo.id);
            formData.append('num', num);
            formData.append('id', this.state.editData.data.id);
            let opts = {
                body: formData,
                method: "POST"
            };
            fetch(url, opts)
                .then((response) => response.json())
                .then((res) => {
                    if (res.code == 0) {
                        this.props.navigation.state.params.arefresh();
                        this.props.navigation.goBack();
                    } else {
                        Alert.alert('创建失败，请稍后再试');
                    }
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                    Alert.alert('创建失败，请稍后再试');
                })
        }
    }
}

const styles = StyleSheet.create({
    containerAppSet: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFFFFF"
    },
    jianjieshuruk: {
        width: "100%",
        height: 120,
        backgroundColor: "#F7F7F7",
        marginTop: 15,
        paddingLeft: 10,
        marginBottom: 15
    },
    changzhudishuruk2:{
        width: "100%",
        backgroundColor: "#F7F7F7",
        marginTop: 15,
        height:30,
        paddingLeft: 10,
        marginBottom: 15
    },
    changzhudishuruk: {
        width: "100%",
        height: 70,
        backgroundColor: "#F7F7F7",
        marginTop: 15,
        paddingLeft: 10,
        marginBottom: 15
    },
    titleAb: {
        color: "#282828",
        fontSize: 15,
        paddingTop: 10,
        paddingBottom: 5,
        fontWeight: "bold"
    },
    titleAb1: {
        color: "#B2B2B2",
        fontSize: 13
    },
    AboutChild: {
        marginTop: 35
    },
    AboutChild1: {
        width: width,
        backgroundColor: "#FFFFFF"
    },
    AboutChild111: {
        width: "92%",
        marginLeft: "4%",
        backgroundColor: "#8A6246",
        marginTop: 30,
        alignItems: "center",
        height: 50,
        justifyContent: "center"
    },
    AboutChild12: {
        width: "94%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: "3%",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 20
    },
    AboutChild12S: {
        width: "94%",
        marginLeft: "3%",
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA"
    },
    AboutChild12N: {
        width: "94%",
        marginLeft: "3%",
        marginTop: 15
    },
    AboutChild12Text: {
        color: "#282828",
        fontSize: 16
    },
    tuichuSty: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "bold"
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
    PickerChlden: {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 0,
        paddingTop: 10,
    },
    AddImgUrl: {
        backgroundColor: "#F3F3F3",
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    }
});
