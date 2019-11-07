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
import { JFAPI } from './API/API';
import BlankPages from '../BlankPages/BlankPages';
import AsyncStorage from "@react-native-community/async-storage";
let {width, height} = Dimensions.get('window');
let codeTime = 60;
export default class StudentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList:"",
            caoshData:'',
            userInfo:''
        }
    }

    static navigationOptions = {
        headerTitle: '学员列表',
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
                    {
                        this.state.dataList.length > 0 ? <View style={{backgroundColor:"#FFFFFF",marginTop:10}}>
                            {
                                this.state.dataList.map((item,index) => {
                                    return(
                                        <View key={index} style={styles.containerAppTaiMoreChild1}>
                                            <View>
                                                <Image style={{width:45,height:45,borderRadius:22}} source={require('./Images/bj.png')} />
                                            </View>
                                            <View style={styles.containerAppTaiMoreChild12}>
                                                <View>
                                                    <Text style={styles.containerAppTaiMoreChild12Text1}>{item.userName ? item.userName : ''}</Text>
                                                    {
                                                        this.levelText(item.userLevel)
                                                    }
                                                    <Text style={styles.containerAppTaiMoreChild12Text2}>弘毅一级</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View> : <BlankPages width={width} height={height} justify={'center'} align={'center'} />
                    }
                </ScrollView>
            </View>
        );
    }
    // 学员等级
    levelText = (level) => {
        switch (level) {
            case 0:
            case 1:
                return (<Text style={styles.containerAppTaiMoreChild12Text2}>问身</Text>)
                break;
            case 2:
                return (<Text style={styles.containerAppTaiMoreChild12Text2}>养正</Text>)
                break;
            case 3:
                return (<Text style={styles.containerAppTaiMoreChild12Text2}>弘毅一级</Text>)
                break;
            case 4:
                return (<Text style={styles.containerAppTaiMoreChild12Text2}>弘毅二级</Text>)
                break;
            case 5:
                return (<Text style={styles.containerAppTaiMoreChild12Text2}>弘毅三级</Text>)
                break;
            case 6:
                return (<Text style={styles.containerAppTaiMoreChild12Text2}>归真一级</Text>)
                break;
            case 7:
                return (<Text style={styles.containerAppTaiMoreChild12Text2}>归真二级</Text>)
                break;
            case 8:
                return (<Text style={styles.containerAppTaiMoreChild12Text2}>归真三级</Text>)
                break;
            case 9:
                return (<Text style={styles.containerAppTaiMoreChild12Text2}>圆明一级</Text>)
                break;
            case 10:
                return (<Text style={styles.containerAppTaiMoreChild12Text2}>圆明二级</Text>)
                break;
            case 11:
                return (<Text style={styles.containerAppTaiMoreChild12Text2}>圆明三级</Text>)
                break;
            default:
                return (<Text style={styles.containerAppTaiMoreChild12Text2}>问身</Text>)
        }
    }
    getList = (teacherId,lessonId,page,pageSize) => {
        let url = JFAPI.PerList;
        let formData = new FormData();
        formData.append('teacherId',teacherId);
        formData.append('lessonId',lessonId);
        formData.append('page',page);
        formData.append('pageSize',pageSize);
        let opts = {
            body:formData,
            method:"POST"
        }
        fetch(url,opts)
            .then((response) => response.json())
            .then((res) => {
                // console.log('学员列表',res);
                if(res.code == 0){
                    if(res.data){
                        this.setState({
                            dataList:res.data
                        })
                    }else{
                        this.setState({
                            dataList:''
                        })
                    }
                }else{
                    this.setState({
                        dataList:''
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    dataList:''
                })
            })
    }
    componentDidMount() {
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result)
                })
                this.getList(this.state.userInfo.id,this.props.navigation.state.params.data.id,1,10)
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
    containerAppTaiMoreChild1:{
        borderBottomWidth:1,
        borderBottomColor:"#DDDDDD",
        width:"94%",
        marginLeft:'3%',
        flexDirection:"row",
        paddingTop:10,
        paddingBottom:10
    },
    containerAppTaiMoreChild12:{
        width:"87%",
        paddingLeft:10,
        justifyContent: "space-around"
    },
    containerAppTaiMoreChild12Text1:{
        color:"#282828",
        fontSize:14
    },
    containerAppTaiMoreChild12Text2:{
        color:"#B2B2B2",
        fontSize:12,
        paddingTop: 8
    },
    containerAppTaiMoreChild12Text3:{
        color:"#767676",
        fontSize:13
    }
});
