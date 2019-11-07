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
    ActivityIndicator, Picker, Modal
} from "react-native";
import {JFAPI} from './API/API';
import AsyncStorage from "@react-native-community/async-storage";

let {width, height} = Dimensions.get('window');
export default class ClDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            caohsData: '',
            EnterData: '',
            activeInex: 1,
            StateMask: false,
            userInfo: '',
            // 选择教练
            gender: '1',
            genderText: "教练1"
        }
    }

    static navigationOptions = {
        headerTitle: '报考详情',
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
                    this.state.EnterData ? <View style={styles.AboutChild1}>
                        <View style={styles.AboutChild12}>
                            <Text style={styles.AboutChild12Text}>状态：</Text>
                            <Text>{this.auditStatus(this.state.EnterData.status)}</Text>
                        </View>
                        <View style={styles.AboutChild12}>
                            <Text style={styles.AboutChild12Text}>当前段位：</Text>
                            {
                                this.lessonTypeText(this.state.EnterData.currLevel)
                            }
                        </View>
                        <View style={styles.AboutChild12}>
                            <Text style={styles.AboutChild12Text}>报考等级：</Text>
                            {
                                this.EnterLevel(this.state.caohsData.currLevel)
                            }
                        </View>
                        <View style={styles.AboutChild12}>
                            <Text style={styles.AboutChild12Text}>姓名：</Text>
                            <Text>{this.state.EnterData.name}</Text>
                        </View>
                        <View style={styles.AboutChild12}>
                            <Text style={styles.AboutChild12Text}>联系方式：</Text>
                            <Text>{this.state.EnterData.tel}</Text>
                        </View>
                        <View style={styles.AboutChild12}>
                            <Text style={styles.AboutChild12Text}>选择教练：</Text>
                            {
                                this.state.caohsData.teacher ? <Text>{this.state.caohsData.teacher.realName}</Text> : <Text>''</Text>
                            }
                        </View>
                        <View style={styles.AboutChild12N}>
                            <Text style={styles.AboutChild12Text}>所在区域：</Text>
                            <Text>福建省厦门市湖里区</Text>
                        </View>
                    </View> : null
                }
                {
                    this.returnButton(this.state.userInfo.userType, this.state.EnterData.status)
                }
            </View>
        );
    }
    // 审核状态
    auditStatus = (type) => {
        switch (type) {
            case 0:
                return ('未审核')
                break;
            case 1:
                return ('审核通过')
                break;
            case 2:
                return ('已拒绝')
                break;
            default:
                return ('审核中')
        }
    }
    // 等级类型
    lessonTypeText = (type) => {
        switch (type) {
            case 0:
            case 1:
                return (<Text>问身</Text>)
                break;
            case 2:
                return (<Text>养正</Text>)
                break;
            case 3:
                return (<Text>弘毅一级</Text>)
                break;
            case 4:
                return (<Text>弘毅二级</Text>)
                break;
            case 5:
                return (<Text>弘毅三级</Text>)
                break;
            case 6:
                return (<Text>归真一级</Text>)
                break;
            case 7:
                return (<Text>归真二级</Text>)
                break;
            case 8:
                return (<Text>归真三级</Text>)
                break;
            case 9:
                return (<Text>圆明一级</Text>)
                break;
            case 10:
                return (<Text>圆明二级</Text>)
                break;
            case 11:
                return (<Text>圆明三级</Text>)
                break;
            default:
                return (<Text>空</Text>)
        }
    }
    // 报考等级
    EnterLevel = (type) => {
        switch (type) {
            case 0:
            case 1:
            case 2:
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
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="弘毅一级"></TextInput>)
        }
    }
    // 合格不合格按钮
    returnButton = (type1, type2) => {
        if (type1 == 1 && type2 == 1) {
            return null
            console.log('已审核过');
        } else if (type1 == 0) {
            return null
        } else {
            return (
                <View style={{width: "94%", flexDirection: "row", justifyContent: "space-between"}}>
                    <TouchableWithoutFeedback onPress={() => this.coashAudit(this.state.EnterData.id, 1)}>
                        <View style={styles.AboutChild111}>
                            <Text style={styles.tuichuSty}>合格</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.coashAudit(this.state.EnterData.id, 2)}>
                        <View style={styles.AboutChild222}>
                            <Text style={styles.tuichuSty2}>不合格</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
            console.log('未审核过');
        }
    }

    // 选择教练
    closePickerDemo(parameter) {
        let self = this;
        self.setState({
            StateMask: false
        })
        if (parameter == 2) {
            self.setState({
                gender: '1',
                StateMask: false,
                genderText: ''
            })
        }
        if (this.state.gender == 1) {
            this.setState({
                genderText: "教练1"
            })
        } else if (this.state.gender == 2) {
            this.setState({
                genderText: "教练2"
            })
        }
    }

    getInfo = (id) => {
        let url = JFAPI.getInfo;
        let formData = new FormData();
        formData.append('id', id);
        let opts = {
            body: formData,
            method: 'POST'
        }
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.code == 0) {
                    if (res.data) {
                        this.setState({
                            EnterData: res.data
                        })
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    coashAudit = (id, status) => {
        let url = JFAPI.coashAudit;
        let formData = new FormData();
        formData.append('id', id);
        formData.append('status', status);
        let opts = {
            body: formData,
            method: "POST"
        }
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                if (res.code == 0) {
                    this.props.navigation.goBack();
                    this.props.navigation.state.params.refresh();
                } else {
                    this.props.navigation.goBack();
                    this.props.navigation.state.params.refresh();
                }
            })
            .catch((err) => {
                console.log(err);
                this.props.navigation.goBack();
                this.props.navigation.state.params.refresh();
            })
    }

    componentDidMount() {
        console.log(this.props.navigation.state.params);
        if (this.props.navigation.state.params.data) {
            this.setState({
                caohsData: this.props.navigation.state.params.data
            })
            this.getInfo(this.props.navigation.state.params.data.id)
        }
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result)
                })
                console.log(JSON.parse(result));
            }).catch(error => {
            console.log("读取失败");
        })
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
        width: "45%",
        backgroundColor: "#8A6246",
        marginTop: 30,
        alignItems: "center",
        height: 50,
        justifyContent: "center"
    },
    AboutChild222: {
        width: "45%",
        backgroundColor: "#F5F0EC",
        marginTop: 30,
        borderWidth: 1,
        borderColor: "#8A6246",
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
    tuichuSty2: {
        color: "#8A6246",
        fontSize: 17
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
    }
});
