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
import {JFAPI} from './API/API';
import BlankPages from '../BlankPages/BlankPages';
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
import AsyncStorage from "@react-native-community/async-storage";

let {width, height} = Dimensions.get('window');
let self = this;
export default class ShippingAddress2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: '',
            userAddresLIst: [],
            activeIndex: 0
        }
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: '收货地址',
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        headerRight: (
            <TouchableWithoutFeedback onPress={() => navigation.state.params.gotoMessage(self)}>
                <Image style={{marginRight: 15}} source={require('./Images/1.png')}/>
            </TouchableWithoutFeedback>
        )
    })

    render() {
        return (
            <View style={styles.containerAppSetShiping2}>
                <View style={styles.shiping2All}>
                    {
                        this.state.userAddresLIst.length > 0 ? this.state.userAddresLIst.map((item, index) => {
                            return (
                                <View style={this.state.userAddresLIst.length == index + 1 ? styles.shiping2All1N : styles.shiping2All1} key={index}>
                                    <TouchableWithoutFeedback onPress={() => this.selectM(item,index)}>
                                        {
                                            this.state.activeIndex == index ? <Image style={{width: 26, height: 26}} source={require('./Images/xz.png')}/> :
                                                <Image style={{width: 26, height: 26}} source={require('./Images/wx.png')}/>
                                        }
                                    </TouchableWithoutFeedback>
                                    <View style={styles.shiping2All2}>
                                        <View style={styles.shiping2All11}>
                                            <Text>{item.name}</Text>
                                            <Text style={{paddingLeft:10}}>{item.tel}</Text>
                                            {
                                                item.isDefault == 1 ? <View style={styles.morenANniu}>
                                                    <Text style={styles.morenANniuText}>默认</Text>
                                                </View> : null
                                            }
                                        </View>
                                        <View style={styles.shiping2All11}>
                                            <Text style={styles.morenANniuText2}>{item.address}</Text>
                                        </View>
                                    </View>
                                    <TouchableWithoutFeedback onPress={() => this.editAddress(item)}>
                                        <Image style={styles.RightImgUrl} source={require('./Images/1.png')}/>
                                    </TouchableWithoutFeedback>
                                </View>
                            )
                        }) : <BlankPages width={width} height={height} justify={'center'} align={'center'} />
                    }
                </View>
            </View>
        );
    }

    gotoAddress = () => {
        let self = this;
        this.props.navigation.navigate('ShippingAddressN',{data:'',refresh:function(){
                self.getAddressList(self.state.userInfo.id);
            }});
    }
    selectM = (item,num) => {
        console.log(item);
        let self = this;
        // 设置默认地址
        let url = JFAPI.isDefaultAddress;
        let formData = new FormData();
        formData.append('addressId',item.id);
        let opts = {
            method:"POST",
            body:formData
        };
        fetch(url,opts)
            .then((response) => response.json())
            .then((res) => {
                if(res.code == 0){
                    this.props.navigation.goBack();
                    this.props.navigation.state.params.arefresh();
                }
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
        self.setState({
            activeIndex: num
        })
    }
    // 前往修改地址
    editAddress = (obj) => {
        let self = this;
        this.props.navigation.navigate('ShippingAddressN',{data:obj,refresh:function(){
                self.getAddressList(self.state.userInfo.id);
            }});
    }
    // 获取地址列表
    getAddressList = (id) => {
        let url = JFAPI.userAddressList;
        let formData = new FormData();
        formData.append('userId', id);
        let opts = {
            method: "POST",
            body: formData
        };
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                if (res.code == 0) {
                    if (res.data.length > 0) {
                        this.setState({
                            userAddresLIst: res.data
                        })
                    }else if(res.data.length == 0){
                        let self = this;
                        this.props.navigation.navigate('ShippingAddressN',{data:'',refresh:function(){
                                self.getAddressList(self.state.userInfo.id);
                            }});
                    }
                }
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    componentDidMount() {
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result)
                })
                // 获取用户默认地址
                this.getAddressList(this.state.userInfo.id);
            }).catch(error => {
            console.log("读取失败");
        })
        // 注册自定义导航右侧点击事件
        this.props.navigation.setParams({
            gotoMessage: this.gotoAddress
        })
    }

}

const styles = StyleSheet.create({
    containerAppSetShiping2: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F3F3F3"
    },
    shiping2All: {
        backgroundColor: "#FFFFFF",
        width: width
    },
    shiping2All1: {
        width: "94%",
        marginLeft: "3%",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        flexDirection: "row",
        paddingTop: 17,
        paddingBottom: 17,
        alignItems: "center"
    },
    shiping2All1N: {
        width: "94%",
        marginLeft: "3%",
        flexDirection: "row",
        paddingTop: 17,
        paddingBottom: 17,
        alignItems: "center"
    },
    shiping2All11: {
        flexDirection: "row",
        paddingLeft: 10,
        alignItems: "center"
    },
    shiping2All2: {
        paddingLeft: 7
    },
    RightImgUrl: {
        position: "absolute",
        right: 8
    },
    morenANniu: {
        backgroundColor: "#B06F42",
        marginLeft: 5,
        borderRadius: 8,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 2,
        paddingBottom: 2
    },
    morenANniuText: {
        color: "#FFFFFF",
        fontSize: 13
    },
    morenANniuText2: {
        fontSize: 14,
        color: "#282828",
        paddingTop: 6
    }
});
