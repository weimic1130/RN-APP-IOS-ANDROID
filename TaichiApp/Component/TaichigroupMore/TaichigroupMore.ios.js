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
    Image,
    Dimensions,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    ScrollView
} from "react-native";
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view'
import AsyncStorage from "@react-native-community/async-storage";
import Loading from '../LoadingAnimation/LoadingAnimation';
import BlankPages from '../BlankPages/BlankPages';
let {width, height} = Dimensions.get('window');
import { JFAPI } from './API/API';
import global from '../global';
export default class TaichigroupMoreIos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo:'',
            groupList:'',
            LoadingState:true,
        }
    }

    static navigationOptions = {
        headerTitle: '太极团更多',
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
                    <View style={{backgroundColor:"#FFFFFF",marginTop:10}}>
                        {
                            this.state.groupList.length > 0 ? this.state.groupList.map((item,index) => {
                                return (
                                    <TouchableWithoutFeedback key={index} onPress={() => this.gotoGroupDetails(item)}>
                                        <View style={styles.containerAppTaiMoreChild1}>
                                            <View style={styles.containerAppTaiMoreChild11}>
                                                {
                                                    item.img ? <Image style={{width:"100%",height:90}} source={{uri:global.PicUrl + item.img}} /> : <Image style={{width:"100%",height:90}} source={require('./Images/bj.png')} />
                                                }
                                            </View>
                                            <View style={styles.containerAppTaiMoreChild12}>
                                                <View>
                                                    <Text style={styles.containerAppTaiMoreChild12Text1}>{item.title}</Text>
                                                    <Text style={styles.containerAppTaiMoreChild12Text2}>{item.userNum}人</Text>
                                                </View>
                                                <View>
                                                    <Text numberOfLines={2} style={styles.containerAppTaiMoreChild12Text3}>{item.intro}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            }) : <BlankPages width={width} height={height} align={'center'} justify={'center'}/>
                        }
                    </View>
                </ScrollView>
                <Loading style={{width:width,height:height}} show={this.state.LoadingState}/>
            </View>
        );
    }
    // 前往太极团详情页
    gotoGroupDetails = (item) => {
        let self = this;
        let parameter = {
            data:item,
            title:item.title,
            arefresh:function(){
                self.getgroupList(self.state.userInfo.id,1,10);
                self.props.navigation.state.params.refresh()
            }
        }
        this.props.navigation.navigate('TaiJiCardPageN',parameter);
    }
    // 太极团列表
    getgroupList = (userId, page, length) => {
        let url = JFAPI.GetAllList;
        let formData = new FormData();
        formData.append('userId', userId);
        formData.append('page', page);
        formData.append('length', length);
        let opts = {
            body: formData,
            method: "POST"
        };
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log('太极团列表',res);
                if (res.code == 0) {
                    this.setState({
                        LoadingState:false
                    })
                    if (res.data.length > 0) {
                        this.setState({
                            groupList: res.data
                        })
                    } else {
                        this.setState({
                            groupList: ''
                        })
                    }
                }else{
                    this.setState({
                        LoadingState:false
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    groupList: '',
                    LoadingState:false
                })
            })
    }
    componentDidMount() {
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result)
                })
                this.getgroupList(this.state.userInfo.id,1,10)
            }).catch(error => {
            console.log(error);
            console.log("读取失败");
        })
    }

}

const styles = StyleSheet.create({
    containerAppTaiMore: {
        flex: 1,
        backgroundColor: "#F3F3F3"
    },
    containerAppTaiMoreChild1:{
        borderBottomWidth:1,
        borderBottomColor:"#DDDDDD",
        width:"96%",
        marginLeft:'4%',
        flexDirection:"row",
        // justifyContent:"center",
        paddingTop:10,
        paddingBottom:10
    },
    containerAppTaiMoreChild11:{
        width:"30%"
    },
    containerAppTaiMoreChild12:{
        width:"65%",
        paddingLeft:10,
        justifyContent: "space-around"
    },
    containerAppTaiMoreChild12Text1:{
        color:"#282828",
        fontSize:14
    },
    containerAppTaiMoreChild12Text2:{
        color:"#B2B2B2",
        fontSize:12
    },
    containerAppTaiMoreChild12Text3:{
        color:"#767676",
        fontSize:13
    }
});
