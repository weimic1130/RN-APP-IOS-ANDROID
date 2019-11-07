/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    TouchableWithoutFeedback,
    Image,
    Dimensions,
    StyleSheet,
    Platform,
    Text,
    TextInput,
    View,
    Alert,
    Clipboard,
    CameraRoll,
    ScrollView, Modal, NativeModules
} from "react-native";
import BlankPages from '../BlankPages/BlankPages';

let {width, height} = Dimensions.get('window');
import global from '../global';
import ImageViewer from 'react-native-image-zoom-viewer';
import {JFAPI} from './API/API';
import AsyncStorage from "@react-native-community/async-storage";

var RNFS = require('react-native-fs');
// import CameraRoll from "react-native/Libraries/CameraRoll/__mocks__/CameraRoll";

export default class MycodeAndroid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            content2: '',
            data: '',
            coachdata: '',
            activeInex: 1,
            modalVisible: false,
            QrcodeArr: [],
            userInfo: '',
            index: 0
        }
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: '我的推荐码',
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
                {
                    this.state.data ? <View style={styles.borderQrcode}>
                        <TouchableWithoutFeedback onPress={() => this.setState({modalVisible: true})}>
                            {/*<TouchableWithoutFeedback onLongPress={() => this.savePhoto(global.PicUrl + this.state.data.codeUrl)}>*/}
                            <Image style={styles.bjtsty} source={{uri: global.PicUrl + this.state.data.codeUrl}} />
                        </TouchableWithoutFeedback>
                    </View> : <BlankPages width={width} height={height} align={'center'} justify={'center'}/>
                }
                <Modal
                    visible={this.state.modalVisible}
                    transparent={true}
                    onRequestClose={() => this.setState({modalVisible: false})}>
                    <ImageViewer menuContext={{'saveToLocal': "保存到相册", "cancel": "取消"}}
                                 onClick={() => this.closeDemo()}
                                 imageUrls={this.state.QrcodeArr}
                                 onSave={(url) => {
                                     this.savePhoto(url)
                                 }}
                                 index={this.state.index}/>
                </Modal>
            </View>
        );
    }

    componentDidMount() {
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result)
                })
                console.log(this.state.userInfo);
                let url = JFAPI.recommendedCode;
                let userId = this.state.userInfo.id;
                let formData = new FormData();
                formData.append('userId', userId);
                let opts = {
                    body: formData,
                    method: "POST"
                }
                fetch(url, opts)
                    .then((response) => response.json())
                    .then((res) => {
                        console.log('推荐码', res);
                        if (res.code == 0) {
                            this.setState({
                                data: res.data,
                                content: global.PicUrl + res.data.codeUrl,
                                content2: res.data.code,
                                QrcodeArr: this.state.QrcodeArr.concat({url: global.PicUrl + res.data.codeUrl})
                            })
                            console.log(this.state.data);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }).catch(error => {
            console.log(error);
            console.log("读取失败");
        })
        // if(this.props.navigation.state.params.data){
        //     this.setState({
        //         coachdata:this.props.navigation.state.params.data,
        //         QrcodeArr:this.state.QrcodeArr.concat({url:global.PicUrl + this.props.navigation.state.params.data.wxQrcode})
        //     })
        // }
    }

    savePhoto(url) {
        let self = this;
        let storeLocation = `${RNFS.DocumentDirectoryPath}`;
        let pathName = new Date().getTime() + "code.png"
        let downloadDest = `${storeLocation}/${pathName}`;
        const ret = RNFS.downloadFile({fromUrl: url, toFile: downloadDest});
        ret.promise.then(res => {
            if (res && res.statusCode === 200) {
                var promise = CameraRoll.saveToCameraRoll("file://" + downloadDest);
                promise.then(function (result) {
                    Alert.alert('已保存到系统相册');
                    console.log("图片已保存至相册")
                }).catch(function (error) {
                    Alert.alert(
                        '提示',
                        '点击确定前往开启相关权限?',
                        [
                            {text: '取消'},
                            {text: "确定", onPress: () => self.openSetting()}
                        ]
                    );
                    console.log("保存失败", error)
                })
            }
        })
    }

    closeDemo = () => {
        console.log('关闭');
        this.setState({
            modalVisible: false
        })
    }
    openSetting = () => {
        NativeModules.OpenSettings.openNetworkSettings((data) => {
            console.log('call back data', data);
        })
    }

    // 复制链接
    async _setClipboardContent(str) {
        Clipboard.setString(str);
        Clipboard.getString().then(oldVal => {
            if (oldVal == str) {
                Alert.alert('复制成功')
            }
        })
    }

    // 复制推荐码
    async _setClipboardqrcode(str) {
        Clipboard.setString(str);
        Clipboard.getString()
            .then(oldVal => {
                if (oldVal == str) {
                    Alert.alert('复制成功')
                }
            })
    }
}

const styles = StyleSheet.create({
    containerAppboxCard: {
        flex: 1,
        // alignItems: "center",
    },
    bjtsty: {
        width: width,
        height: height * 0.95
    },
    shareQcodeImg: {
        marginTop: 30
    },
    borderQrcode: {
        width: width,
        height: height
    },
    yaoqingma: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 30
    },
    codeSize: {
        width: 220,
        height: 220,
        zIndex: 100,
        position: "absolute",
        top: height * 0.4,
        left: width * 0.25
    },
    yaoqingma2: {
        color: "#FFFFFF"
    },
    shareQcode: {
        width: width * 0.9,
        marginLeft: width * 0.05,
        alignItems: "center",
        marginTop: 25
    },
    qrcodeimg: {
        width: 100,
        height: 100
    },
    codeText: {
        color: "#FFFFFF"
    },
    coplyBtn: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D5BD59",
        color: "#333333",
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 2
    },
    coplyText: {
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 2,
        paddingBottom: 2
    },
    allcont: {
        marginTop: 25,
        width: width * 0.9,
        marginLeft: width * 0.05,
        justifyContent: "space-around",
        alignItems: "center"
    },
    qrcodeText: {
        color: "#FFFFFF"
    },
    boxCardChild: {
        width: width * 0.9,
        flexDirection: "row",
        paddingTop: 10
    },
    boxCardChild2: {
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
        justifyContent: "space-around",
        paddingLeft: 15,
        paddingTop: 5
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
        paddingTop: 5,
        paddingBottom: 5
    },
    boxCardChild1Text3: {
        backgroundColor: "#A97B5B",
        width: 65,
        alignItems: "center",
        borderRadius: 8,
        paddingLeft: 5,
        paddingRight: 5
    },
    boxCardChild1Text4: {
        fontSize: 12,
        color: "#FFFFFF",
        paddingTop: 3,
        paddingBottom: 3,
        fontWeight: "bold"
    },
    TextChild1: {
        color: "#8C7A6E",
        fontSize: 12,
        lineHeight: 16
    },
    boxCardChild2Text: {
        color: "#B2B2B2",
        fontSize: 12,
        paddingTop: 10
    },
    boxCardChild21: {
        alignItems: "center"
    },
    boxCardChild32: {
        width: "84%",
        justifyContent: "space-around"
    },
    boxCardChild31: {
        alignItems: "center"
    },
    boxCardChild31Text1: {
        fontSize: 26,
        color: "#282828"
    },
    boxCardChild31Text2: {
        color: "#B2B2B2",
        fontSize: 13
    },
    boxCardChild31Text3: {
        color: "#282828",
        fontSize: 14
    },
    boxCardChild41: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "94%",
        paddingTop: 10
    },
    boxCardChild411: {
        alignItems: "center"
    },
    boxCardChild411Text1: {
        color: "#B2B2B2",
        fontSize: 12,
        paddingTop: 5
    }
});
