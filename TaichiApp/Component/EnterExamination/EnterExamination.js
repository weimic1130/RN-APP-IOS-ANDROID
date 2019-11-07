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
    Alert,
    ActivityIndicator, Picker, Modal
} from "react-native";
import {JFAPI} from './API/API';

let {width, height} = Dimensions.get('window');
export default class EnterExamination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeInex: 1,
            StateMask: false,
            // 选择教练
            gender: '0',
            genderText: "",
            coashListL: '',
            userInfo: '',
            address: '',
            name: '',
            tel: ''
        }
    }

    static navigationOptions = {
        headerTitle: '填写报考信息',
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
                <View style={styles.AboutChild1}>
                    <View style={styles.AboutChild12}>
                        <Text style={styles.AboutChild12Text}>当前段位：</Text>
                        {
                            this.state.userInfo ? this.lessonTypeText(this.state.userInfo.level) : null
                        }
                    </View>
                    <View style={styles.AboutChild12}>
                        <Text style={styles.AboutChild12Text}>报考等级：</Text>
                        {
                            this.state.userInfo ? this.EnterLevel(this.state.userInfo.level) : null
                        }
                    </View>
                    <View style={styles.AboutChild12}>
                        <Text style={styles.AboutChild12Text}>姓名：</Text>
                        <TextInput value={this.state.name} onChangeText={(text) => this.setState({name: text})} style={{width: "75%"}} placeholder="请输入您的姓名"></TextInput>
                    </View>
                    <View style={styles.AboutChild12}>
                        <Text style={styles.AboutChild12Text}>联系方式：</Text>
                        <TextInput keyboardType='numeric' value={this.state.tel} onChangeText={(text) => this.setState({tel: text})} style={{width: "75%"}} placeholder="请输入您的联系方式"></TextInput>
                    </View>
                    <View style={styles.AboutChild12}>
                        <Text style={styles.AboutChild12Text}>选择教练：</Text>
                        <TouchableWithoutFeedback onPress={() => this.openCoase()}>
                            {
                                this.state.genderText ? <Text>{this.state.genderText}</Text> : <Text>请选择您要去哪位教练那里进行晋升考试</Text>
                            }
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.AboutChild12N}>
                        <Text style={styles.AboutChild12Text}>常驻地址：</Text>
                        <TextInput editable={false} style={{width: "75%"}} value={this.state.address} placeholder="教练的常驻地址"></TextInput>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => this.confirmEnter()}>
                    <View style={styles.AboutChild111}>
                        <Text style={styles.tuichuSty}>确认报考</Text>
                    </View>
                </TouchableWithoutFeedback>
                {
                    this.state.StateMask ?
                        <Animated.View style={styles.mask}></Animated.View> : null
                }
                <Modal animationType="slide" transparent={true} visible={this.state.StateMask} onRequestClose={() => {
                    this.onRequestClose();
                }}>
                    {/*<TouchableOpacity onPress={() => this.setState({StateMask: false})} activeOpacity={1} style={styles.PickerSty5}>*/}
                        <View style={[styles.PickerSty]}>
                            <View style={[styles.PickerChlden]}>
                                <TouchableWithoutFeedback onPress={() => this.closePickerDemo(2)}>
                                    <Text>取消</Text>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => this.closePickerDemo(1)}>
                                    <Text style={{color: "#0E6AFF"}}>确定</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            {
                                this.state.coashListL ? <Picker selectedValue={this.state.gender} mode='dropdown' style={[styles.PickerStyItem]}
                                                                itemStyle={{fontSize: 20, color: '#333333', textAlign: 'center', fontWeight: 'bold'}}
                                                                onValueChange={(lang) => this.setState({gender: lang})}>
                                    {
                                        this.pickerItem()
                                    }
                                </Picker> : null
                            }
                        </View>
                    {/*</TouchableOpacity>*/}
                </Modal>
            </View>
        );
    }
    openCoase = () => {
        console.log("打开选择教练");
        this.setState({
            StateMask:true
        })
    }
    // 当前等级
    lessonTypeText = (type) => {
        switch (type) {
            case 0:
            case 1:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="问身"></TextInput>)
                break;
            case 2:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="养正"></TextInput>)
                break;
            case 3:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="弘毅一级"></TextInput>)
                break;
            case 4:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="弘毅二级"></TextInput>)
                break;
            case 5:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="弘毅三级"></TextInput>)
                break;
            case 6:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="归真一级"></TextInput>)
                break;
            case 7:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="归真二级"></TextInput>)
                break;
            case 8:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="归真三级"></TextInput>)
                break;
            case 9:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="圆明一级"></TextInput>)
                break;
            case 10:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="圆明二级"></TextInput>)
                break;
            case 11:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="圆明三级"></TextInput>)
                break;
            default:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="空"></TextInput>)
        }
    }
    // 报考等级
    EnterLevel = (type) => {
        switch (type) {
            case 1:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="弘毅一级"></TextInput>)
                break;
            case 2:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="弘毅一级"></TextInput>)
                break;
            case 3:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="弘毅二级"></TextInput>)
                break;
            case 4:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="弘毅三级"></TextInput>)
                break;
            case 5:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="归真一级"></TextInput>)
                break;
            case 6:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="归真二级"></TextInput>)
                break;
            case 7:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="归真三级"></TextInput>)
                break;
            case 8:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="圆明一级"></TextInput>)
                break;
            case 9:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="圆明二级"></TextInput>)
                break;
            case 10:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="圆明三级"></TextInput>)
                break;
            case 11:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="圆明三级"></TextInput>)
                break;
            default:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="弘毅一级"></TextInput>)
        }
    }
    pickerItem = () => {
        let coashArr = [];
        let coashData = this.state.coashListL;
        for (let i = 0; i < coashData.length; i++) {
            coashArr.push(
                <Picker.Item key={i} label={coashData[i].realName} value={i}/>
            )
        }
        return coashArr;
    }
    confirmEnter = () => {
        let url = JFAPI.saveKaoshi;
        let formData = new FormData();
        let name = this.state.name;
        let tel = this.state.tel;
        let userId = this.state.userInfo.id;
        let currLevel = this.state.userInfo.level;
        let kaoshiLevel = (this.state.userInfo.level + 1);
        let teacherId = this.state.coashListL[this.state.gender].id;
        formData.append('userId', userId);
        formData.append('name', name);
        formData.append('tel', tel);
        formData.append('currLevel', currLevel);
        formData.append('kaoshiLevel', kaoshiLevel);
        formData.append('teacherId', teacherId);
        if (name == '') {
            Alert.alert('请输入您的姓名');
            return;
        }
        if (tel == '') {
            Alert.alert('请输入您的联系方式');
            return;
        }
        if (this.state.genderText == '') {
            Alert.alert('请您选择教练');
            return;
        }
        let opts = {
            body: formData,
            method: "POST"
        }
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.code == 0) {
                    let parameter = {
                        userInfo: this.state.userInfo,
                        data: {
                            name: name,
                            tel: tel,
                            currLevel: currLevel,
                            kaoshiLevel: kaoshiLevel,
                            teacherId: teacherId
                        }
                    };
                    this.props.navigation.goBack();
                    // this.props.navigation.navigate('EntertoPayN', parameter);
                } else if (res.code == -1) {
                    Alert.alert(res.info);
                } else {
                    Alert.alert('提交失败，请稍后再试');
                }
            })
            .catch((err) => {
                console.log(err);
                Alert.alert('提交失败，请稍后再试');
            })
    }

    // 选择教练
    closePickerDemo(parameter) {
        let self = this;
        self.setState({
            StateMask: false
        })
        console.log(parameter);
        if (parameter == 1) {
            this.setState({
                genderText: this.state.coashListL[this.state.gender].realName,
                address: this.state.coashListL[this.state.gender].address
            })
        } else if (parameter == 2) {
            self.setState({
                gender: '0',
                StateMask: false,
                genderText: ''
            })
        }
    }

    getCoash = () => {
        let url = JFAPI.getCoash;
        let formData = new FormData();
        formData.append('userId', '');
        let opts = {
            body: formData,
            method: "POST"
        }
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                if (res.code == 0) {
                    if (res.data.length > 0) {
                        this.setState({
                            coashListL: res.data
                        })
                    }
                }
                console.log('教练列表', res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    componentDidMount() {
        // userInfo
        console.log(this.props.navigation.state.params.data);
        if (this.props.navigation.state.params.data) {
            this.setState({
                userInfo: this.props.navigation.state.params.data
            })
        }
        this.getCoash();
    }

}

const styles = StyleSheet.create({
    containerAppSet: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F3F3F3"
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
        backgroundColor: "#8A6246",
        marginTop: 30,
        alignItems: "center",
        height: 50,
        justifyContent: "center"
    },
    AboutChild12: {
        width: "94%",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginLeft: "3%",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        alignItems: "center",
        height: 60
    },
    AboutChild12N: {
        width: "94%",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginLeft: "3%",
        alignItems: "center",
        height: 60
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
    PickerSty5: {
        width: width,
        height: height,
        position: "absolute",
        bottom: 0
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
    }
});
