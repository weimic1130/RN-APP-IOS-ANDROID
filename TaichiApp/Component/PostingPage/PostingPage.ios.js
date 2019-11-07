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
import global from '../global';
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
    Animated, Keyboard
} from "react-native";
// 选择图片
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from "@react-native-community/async-storage";
import CustomAlertDialog from '../CustomAlertDialog/CustomAlertDialog';
import ModalBox from 'react-native-modalbox';
import {JFAPI} from "../Registration/API/API";
import Loading from "../LoadingAnimation/LoadingAnimation";

let {width, height} = Dimensions.get('window');
let labelArr = [];
let uriArr = [];
export default class PostingPageIos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingState: true,
            imgArray: '',
            labelData: '',
            MoreState: false,
            // 标题
            title: '',
            // 内容
            content: '',
            // 图片
            img: [],
            // 帖子出处
            type: 1,
            // 用户信息
            userInfo: '',
            signArr: [],
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
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: '发帖',
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        headerRight: (
            <TouchableWithoutFeedback onPress={() => navigation.state.params.createPost()}>
                <Text style={{color: "#FFFFFF", fontSize: 16, paddingRight: 10}}>确认发布</Text>
            </TouchableWithoutFeedback>
        )
    })

    render() {
        return (
            <View style={styles.containerAppPosPage}>
                <View style={{
                    flexDirection: "row",
                    height: 55,
                    width: width,
                    alignItems: "center",
                    marginBottom: 10,
                    backgroundColor: "#FFFFFF",
                    borderBottomWidth: 1,
                    borderBottomColor: "#DDDDDD"
                }}>
                    <TextInput
                        value={this.state.title}
                        returnKeyType="done"
                        onChangeText={this.titleValue}
                        style={{
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingVertical: 0,
                            width: width,
                            height:55,
                            backgroundColor: "#FFFFFF"
                        }} placeholder="这里是标题"></TextInput>
                </View>
                <View style={{
                    width: width,
                    height: 170,
                    paddingTop: 5,
                    backgroundColor: "#FFFFFF",
                    borderBottomWidth: 1,
                    borderBottomColor: "#D2D2D2"
                }}>
                    <TextInput
                        value={this.state.content}
                        blurOnSubmit={true}
                        onChangeText={this.contentValue}
                        multiline={true}
                        returnKeyType="done"
                        style={{
                            height: 120,
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingVertical: 0,
                            width: width,
                            backgroundColor: "#FFFFFF"
                        }} placeholder="分享新鲜事"></TextInput>
                    {/*<TouchableWithoutFeedback onPress={() => this.openModal()}>*/}
                    {/*    <View style={styles.bxqTextSty}>*/}
                    {/*        <Text style={{color: "#8A6246", fontSize: 13}}>添加标签</Text>*/}
                    {/*    </View>*/}
                    {/*</TouchableWithoutFeedback>*/}
                </View>
                <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                    {
                        this.state.labelData.length > 0 ? this.state.labelData.map((item, index) => {
                            return (
                                <TouchableWithoutFeedback key={index} onPress={() => this.deleteLabel(index)}>
                                    <View style={styles.bqsxqys}>
                                        <Text style={{color: "#8A6246", fontSize: 13}}>{item}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        }) : null
                    }
                </View>
                <TouchableWithoutFeedback onPress={() => this.choosePic()}>
                    <View style={styles.allcoinChi}>
                        {
                            this.state.img.length > 0 ? this.state.img.map((item, index) => {
                                return (
                                    <TouchableWithoutFeedback key={index} onPress={() => this.deleteImg(index)}>
                                        <Image style={styles.RDbgI1} source={{uri: global.PicUrl + item}}/>
                                    </TouchableWithoutFeedback>
                                )
                            }) : null
                        }
                        <View style={styles.sctpanniu}>
                            <Image style={{width: 45, height: 45}} source={require('./Images/1.png')}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <Modal onPress={() => console.log("关闭")} animationType="slide" transparent={true}
                       visible={this.state.MoreState} onRequestClose={() => {
                    this.onRequestClose();
                }}>
                    <View style={styles.addBqStyChild}>
                        <View style={{alignItems: "center", paddingTop: 10}}>
                            <Text style={{color: "#B2B2B2", fontSize: 14}}>选择标签</Text>
                            <View style={{paddingTop: 10, flexWrap: "wrap", width: "100%", flexDirection: "row"}}>
                                <TouchableWithoutFeedback onPress={() => this.AddLabel('#养生')}>
                                    <View style={styles.bqsxqys}>
                                        <Text style={{color: "#8A6246", fontSize: 13}}>#养生</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => this.AddLabel('#太极球')}>
                                    <View style={styles.bqsxqys}>
                                        <Text style={{color: "#8A6246", fontSize: 13}}>#养生</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => this.AddLabel('#太极拳')}>
                                    <View style={styles.bqsxqys}>
                                        <Text style={{color: "#8A6246", fontSize: 13}}>#养生</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => this.AddLabel('#太极球的起源')}>
                                    <View style={styles.bqsxqys}>
                                        <Text style={{color: "#8A6246", fontSize: 13}}>#养生</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => this.AddLabel('#太极拳的起源')}>
                                    <View style={styles.bqsxqys}>
                                        <Text style={{color: "#8A6246", fontSize: 13}}>#养生</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => this.AddLabel('#太极球的使用')}>
                                    <View style={styles.bqsxqys}>
                                        <Text style={{color: "#8A6246", fontSize: 13}}>#养生</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </Modal>
                <ModalBox
                    position="center"
                    ref="ThirdProtocolModal"
                    isDisabled={false}
                    swipeToClose={false}
                    style={{
                        backgroundColor: 'transparent',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: "100%"
                    }}
                    animationDuration={0}
                    backdropPressToClose={true}//在背景处点击是否关闭modal,默认是关闭
                >

                    <View style={styles.bgView}>
                        {/*<TouchableWithoutFeedback onPress={() => this.chooseType('拍照')}>*/}
                        {/*    <View style={styles.bgViewText}>*/}
                        {/*        <Text style={styles.footText}>拍照</Text>*/}
                        {/*    </View>*/}
                        {/*</TouchableWithoutFeedback>*/}
                        <TouchableWithoutFeedback onPress={() => this.chooseType('相册图片')}>
                            <View style={styles.bgViewText}>
                                <Text style={styles.footText}>相册图片</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.chooseType('取消')}>
                            <View style={styles.bgViewText}>
                                <Text style={styles.footText}>取消</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                </ModalBox>
                <Loading show={this.state.loadingState}></Loading>

                {
                    this.state.MoreState ? <TouchableWithoutFeedback onPress={() => this.setState({MoreState: false})}>
                        <View style={styles.addBqSty}></View>
                    </TouchableWithoutFeedback> : null
                }
            </View>
        );
    }

    onRequestClose() {
        this.setState({
            MoreState: false
        })
    }

    clearBr = (val) => {
        val = val.replace(/<\/?.+?>/g, "");
        val = val.replace(/[\r\n]/g, "");
        return val;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.show != nextProps.show) {

            if (nextProps.show) {

                this.refs.ThirdProtocolModal.open()//打开

            } else {

                this.refs.ThirdProtocolModal.close()//关闭

            }

        }

    }

    getSignature = () => {
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

    componentWillMount() {
        // 获取oss签名
        let self = this;
        self.setState({
            loadingState: false
        })
        fetch(JFAPI.ossGetsign)
            .then((response) => response.json())
            .then((data) => {
                console.log('签名data', data);
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

    chooseType = (text) => {
        let self = this;
        this.refs.ThirdProtocolModal.close();
        if (text == "相册图片") {
            var len1 = this.state.img.length;
            var len2 = 3 - len1;
            if (len2 <= 0) {
                Alert.alert('最多只能选择三张图片');
                return;
            }
            ImagePicker.openPicker({
                multiple: true,
                maxFiles: len2,
                loadingLabelText: "正在加载..."
            }).then(images => {
                console.log(images);
                for (var i = 0; i < images.length; i++) {
                    uriArr.push(images[i])
                }
                self.startUpload(images);
            })
        } else if (text == "拍照") {
            var len1 = this.state.img.length;
            var len2 = 3 - len1;
            if (len2 <= 0) {
                Alert.alert('最多只能选择三张图片');
                return;
            }
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
                loadingLabelText: "正在加载..."
            }).then(image => {
                console.log(image);
                for (var i = 0; i < image.length; i++) {
                    uriArr.push(image[i])
                }
                self.startUpload(image);
            });
        }
    }

    // 上传图片
    startUpload(response) {
        let self = this;
        let formDataArr = [];
        self.setState({
            loadingState: true
        })
        for (var i = 0; i < response.length; i++) {
            formDataArr.push(new FormData());
            formDataArr[i].append('OSSAccessKeyId', self.state.imgSign.accessid);
            formDataArr[i].append('policy', self.state.imgSign.policy);
            formDataArr[i].append('Signature', self.state.imgSign.signature);
            formDataArr[i].append('key', self.state.imgSign.dir + Math.floor(Math.random() * 99999));
            formDataArr[i].append('success_action_status', 201);
            formDataArr[i].append('file', {
                uri: response[i].sourceURL,
                type: 'multipart/form-data',
                name: response[i].filename
            });
        }
        const OSS_UPLOAD_URI = 'https://taijiqiu.oss-cn-hangzhou.aliyuncs.com';
        for (var i = 0; i < formDataArr.length; i++) {
            // console.log('开始传', formDataArr[i])
            // 上传成功
            successResponse = (xhr) => {
                // console.log('成功', xhr);
            };
            //上传失败
            failResponse = (err) => {
                console.log('失败', err);
                // to do
            };
            // //开始上传
            this.futch(OSS_UPLOAD_URI, {
                method: 'POST',
                body: formDataArr[i],
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
    }

    //上传图片代码
    futch = (url, opts = {}, onProgress, successResponse, failResponse) => {
        let self = this;
        return new Promise((res, rej) => {
            let xhr = new XMLHttpRequest();
            xhr.open(opts.method || 'get', url);
            for (let k in opts.headers || {})
                xhr.setRequestHeader(k, opts.headers[k]);
            xhr.onload = e => res(e);
            xhr.onreadystatechange = (e) => {
                self.setState({
                    loadingState: false
                })
                // console.log(xhr.responseText)
                if (xhr.readyState !== 4) {
                    return;
                }
                //阿里云的状态码201 才有返回的信息
                if (xhr.status === 201) {
                    xhr.extra = opts.extra;
                    self.setState({
                        img: self.state.img.concat(xhr.responseText.match(/<Key>([^<]*)<\/Key>/)[1])
                    })
                    successResponse(xhr);
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
    // 标题
    titleValue = (value) => {
        this.setState({
            title: value
        })
    }
    // 内容
    contentValue = (value) => {
        this.setState({
            content: value
        })
    }

    deleteLabel(index) {
        Alert.alert(
            '提示',
            '是否要删除该标签?',
            [
                {text: '取消'},
                {text: "确定", onPress: () => this.removeLabel(index)}
            ]
        );
    }

    removeLabel(index) {
        labelArr.splice(index, 1);
        this.setState({
            labelData: labelArr
        })
    }

    // 选择图片
    choosePic() {
        this.refs.ThirdProtocolModal.open()
        this.setState({showTypePop: !this.state.showTypePop})
        this.getSignature()
    }

    deleteImg(index) {
        let self = this;
        console.log(index);
        Alert.alert(
            '提示',
            '是否要删除该图片?',
            [
                {text: '取消'},
                {text: "确定", onPress: () => this.confirmDelete(index)}
            ]
        );
    }

    // 确认发布
    confirmRelease = () => {
        let self = this;
        let title = self.state.title;
        let content = self.state.content;
        let type = self.state.type;
        let userId = self.state.userInfo.id;
        if (title == '') {
            Alert.alert('请输入标题');
            return;
        }
        if (content == '') {
            Alert.alert('请输入内容');
            return;
        }
        self.setState({
            loadingState: true
        })
        let url = JFAPI.saveForum;
        let formData = new FormData();
        formData.append('userId', userId);
        formData.append('title', title);
        formData.append('content', this.clearBr(content));
        formData.append('img', JSON.stringify(self.state.img))
        formData.append('type', type);
        console.log(formData);
        let opts = {
            method: "POST",
            body: formData
        }
        console.log(opts);
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                self.setState({
                    loadingState: false
                })
                if (res.code == 0) {
                    Alert.alert('创建成功');
                    this.setState({
                        title: '',
                        content: '',
                        img: []
                    })
                    this.props.navigation.state.params.arefresh()
                } else {
                    this.props.navigation.state.params.arefresh()
                }
                console.log(res);
            }).catch((err) => {
            console.log(err);
            self.setState({
                loadingState: false
            })
        })
    }

    confirmDelete(index) {
        let self = this;
        self.state.img.splice(index, 1)
        self.setState({
            img: self.state.img
        })
    }

    componentDidMount() {
        this.props.navigation.setParams({navigatePress: this.deleteImg})
        // 注册事件
        this.props.navigation.setParams({
            createPost: this.confirmRelease
        })
        // 获取用户信息
        AsyncStorage.getItem('userInfo')
            .then(result => {
                if (JSON.parse(result)) {
                    this.setState({
                        userInfo: JSON.parse(result)
                    })
                }
            }).catch(error => {
            console.log("读取失败");
        })
    }

    openModal() {
        this.setState({
            MoreState: true
        })
    }

    AddLabel(text) {
        console.log("添加标签");
        let self = this;
        if (labelArr.length < 9) labelArr.push(text), this.setState({labelData: labelArr});
        if (labelArr.length >= 9) this.setState({MoreState: false});
        console.log(labelArr);
    }
}

const styles = StyleSheet.create({
    bxqTextSty: {
        borderRadius: 6,
        backgroundColor: "#FAF7F4",
        paddingLeft: 15,
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 15,
        borderWidth: 1,
        borderColor: "#D6B6A0",
        position: 'absolute',
        right: 10,
        bottom: 10
    },
    bqsxqys: {
        width: "25%",
        marginLeft: "4%",
        marginRight: "4%",
        alignItems: "center",
        marginTop: 10,
        borderRadius: 7,
        paddingTop: 7,
        paddingBottom: 7,
        backgroundColor: "#FAF7F4",
        borderWidth: 1,
        borderColor: "#D6B6A0"
    },
    containerAppPosPage: {
        flex: 1,
        backgroundColor: "#F5F4F3"
    },
    RDbgI1: {
        width: "30%",
        height: 100,
        marginLeft: "2.5%",
        marginTop: 10
    },
    sctpanniu: {
        width: "30%",
        marginLeft: "3%",
        marginTop: 10,
        height: 100,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#DDDDDD"
    },
    allcoinChi: {
        flexDirection: "row",
        paddingLeft: 5,
        paddingRight: 15,
        paddingTop: 5,
        flexWrap: "wrap"
    },
    addBqSty: {
        width: width,
        height: height,
        position: "absolute",
        backgroundColor: "#000000",
        bottom: 0,
        opacity: 0.5
    },
    addBqStyChild: {
        width: width * 0.9,
        marginLeft: width * 0.05,
        backgroundColor: "#FFFFFF",
        position: "absolute",
        bottom: height / 2,
        paddingBottom: 15
    },
    bgView: {
        width: width * 0.9,
        marginLeft: width * 0.05,
        height: 120,
        position: "absolute",
        bottom: 25,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15
    },
    bgViewText: {
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#dddddd"
    },
    footText: {
        color: "#0E6AFF",
        fontSize: 18
    }
});
