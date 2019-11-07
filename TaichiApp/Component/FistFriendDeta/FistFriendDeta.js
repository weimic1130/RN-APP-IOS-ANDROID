/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Modal,
    Image,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView, TouchableWithoutFeedback, Platform, CameraRoll, Alert, NativeModules
} from "react-native";
import BlankPages from '../BlankPages/BlankPages';
import {JFAPI} from "../FistFriendDeta/API/API";
import ImageViewer from 'react-native-image-zoom-viewer';
// var RNFS = require('react-native-fs');
let {width, height} = Dimensions.get('window');
import global from '../global';
export default class FistFriendDeta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coachdata: '',
            activeInex: 1,
            userInfoData: '',
            QrcodeArr:[],
            modalVisible:false,
            index:0
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
                {
                    this.state.userInfoData ? <ScrollView style={{flex: 1}}>
                        <View style={styles.boxCardChild}>
                            <View style={styles.RDbg}>
                                {/*头像*/}
                                <View style={styles.loginSty1}>
                                    <View style={styles.loginSty1Child}>
                                        <Text style={styles.Nicheng}>头像</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            {
                                                this.state.userInfoData.headurl ?
                                                    <Image style={styles.ImgSizePer}
                                                           source={{uri: global.PicUrl + this.state.userInfoData.headurl}}/>
                                                    : <Image style={styles.ImgSizePer}
                                                             source={require('./Images/tuceng1.png')}/>

                                            }
                                        </View>
                                    </View>
                                </View>
                                {/*昵称*/}
                                <View style={styles.loginSty1}>
                                    <View style={styles.loginSty1Child}>
                                        <Text style={styles.Nicheng}>昵称</Text>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                                <Text style={{
                                                    color: "#B2B2B2",
                                                    fontSize: 16,
                                                    paddingRight: 5
                                                }}>{this.state.userInfoData.nickName}</Text>
                                            </View>
                                    </View>
                                </View>
                                {/*微信号*/}
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
                                                paddingRight: 5
                                            }}>{this.state.userInfoData.wxNo ? this.state.userInfoData.wxNo == 'undefined' ? '' : this.state.userInfoData.wxNo : ''}</Text>
                                        </View>
                                    </View>
                                </View>
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
                                                this.state.userInfoData.wxQrcode ?
                                                    <TouchableWithoutFeedback onPress={() => this.setState({modalVisible:true})}>
                                                        <Image style={styles.ImgSizePer} source={{uri:global.PicUrl + this.state.userInfoData.wxQrcode}} />
                                                    </TouchableWithoutFeedback>
                                                    : <Image style={styles.ImgSizePer}
                                                             source={require('./Images/tuceng1.png')}/>

                                            }
                                        </View>
                                    </View>
                                </View>
                                {/*性别*/}
                                <View style={styles.loginSty1}>
                                    <View style={styles.loginSty1Child}>
                                        <Text style={styles.Nicheng}>性别</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            <Text style={{
                                                color: "#B2B2B2",
                                                fontSize: 16,
                                                paddingRight: 5
                                            }}>{this.state.userInfoData.sex == 1 ? "男":"女"}</Text>
                                        </View>
                                    </View>
                                </View>
                                {/*出生日期*/}
                                <View style={styles.loginSty1}>
                                    <View style={styles.loginSty1Child}>
                                        <Text style={styles.Nicheng}>出生日期</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            <Text style={{
                                                color: "#B2B2B2",
                                                fontSize: 16,
                                                paddingRight: 5
                                            }}>{this.state.userInfoData.birthday}</Text>
                                        </View>
                                    </View>
                                </View>
                                {/*个人简介*/}
                                <View style={styles.loginSty1}>
                                    <View style={styles.loginSty1Child}>
                                        <Text style={styles.Nicheng}>个人简介</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            <Text style={{
                                                color: "#B2B2B2",
                                                fontSize: 16,
                                                paddingRight: 5
                                            }}>{this.state.userInfoData.introduce}</Text>
                                        </View>
                                    </View>
                                </View>
                                {/*常驻地址*/}
                                <View style={styles.loginSty1}>
                                    <View style={styles.loginSty1Child}>
                                        <Text style={styles.Nicheng}>常驻地址</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            <Text style={{
                                                color: "#B2B2B2",
                                                fontSize: 16,
                                                paddingRight: 5
                                            }}>{this.state.userInfoData.address}</Text>
                                        </View>
                                    </View>
                                </View>
                                {/*邮箱*/}
                                <View style={styles.loginSty1}>
                                    <View style={styles.loginSty1Child}>
                                        <Text style={styles.Nicheng}>邮箱</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            <Text style={{
                                                color: "#B2B2B2",
                                                fontSize: 16,
                                                paddingRight: 5
                                            }}>{this.state.userInfoData.email}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {
                                this.state.coachdata.headurl ?
                                    <Image style={styles.headImg} source={{uri:global.PicUrl +  this.state.coachdata.headurl}}/> :
                                    <Image style={styles.headImg} source={require('./Images/bj.png')}/>
                            }
                            <View style={styles.boxCardChild1}>
                                <Text
                                    style={styles.boxCardChild1Text1}>{this.state.coachdata.nickName ? this.state.coachdata.nickName : this.state.coachdata.realName}</Text>
                                <Text
                                    style={styles.boxCardChild1Text2}>{this.state.coachdata.sex == 1 ? '男' : '女'}{this.state.coachdata.address == '' || this.state.coachdata.address == 'undefined' || !this.state.coachdata.address ? '' : '·' + this.state.coachdata.address}</Text>
                                <View style={styles.boxCardChild1Text3}>
                                    <Text style={styles.boxCardChild1Text4}>
                                        {
                                            this.lessonTypeText(this.state.coachdata.level)
                                        }
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <Modal
                            visible={this.state.modalVisible}
                            transparent={true}
                            onRequestClose={() => this.setState({modalVisible: false})}>
                            <ImageViewer menuContext={{'saveToLocal':"保存到相册","cancel":"取消"}}
                                         onClick={() => this.setState({modalVisible:false})}
                                         imageUrls={this.state.QrcodeArr}
                                         onSave={(url) => {this.savePhoto(url)}}
                                         index={this.state.index}/>
                        </Modal>
                        {/*<View style={styles.boxCardChild}>*/}
                        {/*    <Text style={styles.TextChild1}>*/}
                        {/*        {*/}
                        {/*            this.state.coachdata.introduce == 'undefined' || this.state.coachdata.introduce == '' ? '' : this.state.coachdata.introduce*/}
                        {/*        }*/}
                        {/*    </Text>*/}
                        {/*</View>*/}
                        {/*<View style={styles.boxCardChild2}>*/}
                        {/*    <Text>再来一个</Text>*/}
                        {/*</View>*/}
                    </ScrollView> : <BlankPages width={width} height={height} align={'center'} justify={'center'}/>
                }
            </View>
        );
    }
    savePhoto(url){
        let self = this;
        if(Platform.OS == 'ios'){
            let promise = CameraRoll.saveToCameraRoll(url);
            promise.then(function(result){
                Alert.alert('已保存到系统相册');
            }).catch(function(err){
                Alert.alert('保存失败！\n'+err);
                console.log(err);
            })
        }else if(Platform.OS == 'android'){
            // let storeLocation = `${RNFS.DocumentDirectoryPath}`;
            // let pathName = new Date().getTime() + "code.png"
            // let downloadDest = `${storeLocation}/${pathName}`;
            // const ret = RNFS.downloadFile({fromUrl:url,toFile:downloadDest});
            // ret.promise.then(res => {
            //     if (res && res.statusCode === 200) {
            //         var promise = CameraRoll.saveToCameraRoll("file://" + downloadDest);
            //         promise.then(function (result) {
            //             Alert.alert('已保存到系统相册');
            //             console.log("图片已保存至相册")
            //         }).catch(function (error) {
            //             Alert.alert(
            //                 '提示',
            //                 '点击确定前往开启相关权限?',
            //                 [
            //                     {text: '取消'},
            //                     {text: "确定", onPress: () => self.openSetting()}
            //                 ]
            //             );
            //             console.log("保存失败",error)
            //         })
            //     }
            // })
        }
    }
    // 获取用户详情
    getUserinfo = (userId) => {
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
                console.log('用户详情', res);
                if (res.code == 0) {
                    if (res.data) {
                        this.setState({
                            userInfoData: res.data,
                        })
                        if(res.data.wxQrcode.length > 0){
                            this.setState({
                                QrcodeArr:this.state.QrcodeArr.concat({url:global.PicUrl + res.data.wxQrcode})
                            })
                        }
                        console.log(this.state.QrcodeArr);
                        console.log(this.state.QrcodeArr[0].url)
                    }
                    // if (res.data) {
                    //     this.setState({
                    //         UserData: res.data,
                    //         headUrl: res.data.headurl,
                    //         nickName: res.data.nickName
                    //     })
                    // }
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    // 当前等级
    lessonTypeText = (type) => {
        switch (type) {
            case 0:
            case 1:
                return ('问身')
                break;
            case 2:
                return ('养正')
                break;
            case 3:
                return ('弘毅一级')
                break;
            case 4:
                return ('弘毅二级')
                break;
            case 5:
                return ('弘毅三级')
                break;
            case 6:
                return ('归真一级')
                break;
            case 7:
                return ('归真二级')
                break;
            case 8:
                return ('归真三级')
                break;
            case 9:
                return ('圆明一级')
                break;
            case 10:
                return ('圆明二级')
                break;
            case 11:
                return ('圆明三级')
                break;
            default:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="空"></TextInput>)
        }
    }
    openSetting = () => {
        NativeModules.OpenSettings.openNetworkSettings((data) => {
            console.log('call back data', data);
        })
    }
    componentDidMount() {
        if (this.props.navigation.state.params.data) {
            this.setState({
                coachdata: this.props.navigation.state.params.data
            })
            this.getUserinfo(this.props.navigation.state.params.data.id)
        }
    }

}

const styles = StyleSheet.create({
    containerAppboxCard: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F5F4F3"
    },
    RDbg: {
        width: width,
        backgroundColor: "#FFFFFF",
        justifyContent: "space-between"
    },
    loginSty1: {
        width: "90%",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: "#EAEAEA",
        borderBottomWidth: 1,
        paddingBottom: 15,
        paddingTop: 15
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
        width: "90%",
        justifyContent: "space-between"
    },
    Nicheng: {
        fontSize: 18,
        color: "#3A3A3A",
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
    },
    ImgSizePer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight:5
    }
});
