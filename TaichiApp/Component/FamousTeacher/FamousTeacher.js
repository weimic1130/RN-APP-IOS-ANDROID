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
    Animated
} from "react-native";
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view'
import AsyncStorage from "@react-native-community/async-storage";

let {width, height} = Dimensions.get('window');
import global from '../global';
export default class FamousTeacher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coachList: '',
            userInfo:''
        }
    }

    static navigationOptions = {
        headerTitle: '名家名师',
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
            <View style={styles.containerAppTaiMore}>
                <ScrollView>
                    <View style={{backgroundColor: "#FFFFFF", marginTop: 10}}>
                        {
                            this.state.coachList.length > 0 ? this.state.coachList.map((item, index) => {
                                return (
                                    <TouchableWithoutFeedback onPress={() => this.gotoCoashdetals(item)} key={index}>
                                        <View style={styles.containerAppTaiMoreChild1}>
                                            <View>
                                                {
                                                    item.headurl ? <Image style={{width: 45, height: 45, borderRadius: 22}} source={{uri: global.PicUrl + item.headurl}}/> :
                                                        <Image style={{width: 45, height: 45, borderRadius: 22}} source={require('./Images/bj.png')}/>
                                                }
                                            </View>
                                            <View style={styles.containerAppTaiMoreChild12}>
                                                <View>
                                                    <Text style={styles.containerAppTaiMoreChild12Text1}>{item.nickName ? item.nickName : item.realName}</Text>
                                                    {/*<Text style={styles.containerAppTaiMoreChild12Text2}>共有6套课程</Text>*/}
                                                    <Image style={{position: "absolute", right: 0, top: 10}} source={require('./Images/left.png')}/>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            }) : <BlankPages width={width} height={height} justify={'center'} align={'center'}/>
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
    // 前往拳师详情
    gotoCoashdetals = (item) => {
        let self = this;
        let url = JFAPI.coachDetails;
        let formData = new FormData();
        formData.append('userId',item.id);
        let opts = {
            body:formData,
            method:"POST"
        }
        fetch(url,opts)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if(res.code == 0){
                    if(res.data){
                        let parameter = {
                            title:res.data.nickName ? res.data.nickName : '',
                            data:res.data
                        };
                        this.props.navigation.navigate('BoxerCardN',parameter)
                    }else{
                        this.props.navigation.navigate('BoxerCardN')
                    }
                }else{
                    this.props.navigation.navigate('BoxerCardN')
                }

            })
            .catch((err) => {
                console.log(err);
                this.props.navigation.navigate('BoxerCardN')
            })
    }
    // 名师名家列表接口
    getCoachList = () => {
        let url = JFAPI.coachList;
        let coachArray = [];
        let formData = new FormData();
        formData.append('page', 1);
        formData.append('pageSize', 5);
        let opts = {
            method: 'POST',
            body: formData
        };
        fetch(url, opts)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                if (responseData.code == 0) {
                    if (responseData.data.length > 0) {
                        for (let i = 0; i < responseData.data.length; i++) {
                            coachArray.push(responseData.data[i]);
                        }
                        this.setState({
                            coachList: coachArray
                        })
                    } else {
                        this.setState({
                            coachList: coachArray
                        })
                    }
                }
            })

    }

    componentDidMount() {
        this.getCoachList();
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result)
                })
            }).catch(error => {
            console.log("读取失败");
        })
    }

}

const styles = StyleSheet.create({
    containerAppTaiMore: {
        flex: 1,
        backgroundColor: "#F3F3F3"
    },
    containerAppTaiMoreChild1: {
        borderBottomWidth: 1,
        borderBottomColor: "#DDDDDD",
        width: "94%",
        marginLeft: '3%',
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10
    },
    containerAppTaiMoreChild12: {
        width: "87%",
        paddingLeft: 10,
        justifyContent: "space-around"
    },
    containerAppTaiMoreChild12Text1: {
        color: "#282828",
        fontSize: 14
    },
    containerAppTaiMoreChild12Text2: {
        color: "#B2B2B2",
        fontSize: 12
    },
    containerAppTaiMoreChild12Text3: {
        color: "#767676",
        fontSize: 13
    }
});
