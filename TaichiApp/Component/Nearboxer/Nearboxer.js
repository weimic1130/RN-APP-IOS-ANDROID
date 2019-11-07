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
    DatePickerIOS,
    Button,
    Image,
    Dimensions,
    StyleSheet,
    ListView,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    ActivityIndicator,
    View,
    ScrollView,
    Animated,
    FlatList
} from "react-native";
import {JFAPI} from './API/API';

import BlankPages from '../BlankPages/BlankPages';
import AsyncStorage from "@react-native-community/async-storage";
import PageListView from "react-native-page-listview";
import global from '../global';
let {width, height} = Dimensions.get('window');
export default class Nearboxer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: '',
            boxerList: []
        }
    }

    static navigationOptions = {
        headerTitle: '附近教练',
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        },
    };
    // componentWillMount(){
    //     AsyncStorage.getItem('userInfo')
    //         .then(result => {
    //             this.setState({
    //                 userInfo: JSON.parse(result)
    //             })
    //         }).catch(error => {
    //         console.log("读取失败");
    //     })
    // }
    componentDidMount() {
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result)
                })
            }).catch(error => {
            console.log("读取失败");
        })
    }
    // 等级
    levelText = (level) => {
        switch (level) {
            case 0:
            case 1:
                return (<Text style={styles.containerAppNearChild1211Text3}>问身</Text>)
                break;
            case 2:
                return (<Text style={styles.containerAppNearChild1211Text3}>养正</Text>)
                break;
            case 3:
                return (<Text style={styles.containerAppNearChild1211Text3}>弘毅一级</Text>)
                break;
            case 4:
                return (<Text style={styles.containerAppNearChild1211Text3}>弘毅二级</Text>)
                break;
            case 5:
                return (<Text style={styles.containerAppNearChild1211Text3}>弘毅三级</Text>)
                break;
            case 6:
                return (<Text style={styles.containerAppNearChild1211Text3}>归真一级</Text>)
                break;
            case 7:
                return (<Text style={styles.containerAppNearChild1211Text3}>归真二级</Text>)
                break;
            case 8:
                return (<Text style={styles.containerAppNearChild1211Text3}>归真三级</Text>)
                break;
            case 9:
                return (<Text style={styles.containerAppNearChild1211Text3}>圆明一级</Text>)
                break;
            case 10:
                return (<Text style={styles.containerAppNearChild1211Text3}>圆明二级</Text>)
                break;
            case 11:
                return (<Text style={styles.containerAppNearChild1211Text3}>圆明三级</Text>)
                break;
            default:
                return (<Text style={styles.containerAppNearChild1211Text3}>问身</Text>)
        }
    }
    // 刷新
    refresh = (callBack) => {
        setTimeout(() => {
            let url = JFAPI.boxerList;
            fetch(url+"?page=1&pageSize=10&userType=1&userId="+this.state.userInfo.id)
                .then((response)=>response.json())
                .then((responseData)=>{
                    console.log(responseData);
                    //根据接口返回结果得到数据数组
                    let arr=responseData.data;
                    callBack(arr);
                });
        },500)
    }
    // 上拉加载更多
    loadMore = (page, callBack) => {
        setTimeout(() => {
            let url = JFAPI.boxerList;
            fetch(url+"?page="+page+"&pageSize=10&userType=1&userId="+this.state.userInfo.id)
                .then((response)=>response.json())
                .then((responseData)=>{
                    //根据接口返回结果得到数据数组
                    let arr=responseData.data;
                    callBack(arr);
                });
        },500)
    }
    // 展示的数据源
    renderRow = (item, index) => {
        return (
            <TouchableWithoutFeedback key={index} onPress={() => this.gotoDetails(item)}>
                <View key={index} style={styles.containerAppNearChild1}>
                <View style={styles.containerAppNearChild11}>
                    {
                        item.headurl ? <Image style={styles.containerAppNearChild11Img} source={{uri:global.PicUrl + item.headurl}}/> : <Image style={styles.containerAppNearChild11Img} source={require('./Images/wenhua.png')}/>
                    }
                </View>
                <View style={styles.containerAppNearChild12}>
                    <View style={styles.containerAppNearChild121}>
                        <View style={styles.containerAppNearChild1211}>
                            <Text style={styles.containerAppNearChild1211Text}>{item.nickName ? item.nickName : item.realName}</Text>
                            <View style={styles.containerAppNearChild1211Text2}>
                                {
                                    this.levelText(item.level)
                                }
                            </View>
                        </View>
                        <Text style={styles.containerAppNearChild1211Text4}>{(item.distanceStr / 1000).toFixed(2)}km</Text>
                    </View>
                    <View style={styles.containerAppNearChild122}>
                        <Text style={styles.containerAppNearChild122Text}>{item.introduce == 'undefined' || item.introduce == '' || !item.introduce ? '' : item.introduce}</Text>
                    </View>
                </View>
            </View>
            </TouchableWithoutFeedback>
        )
    }
    // 数据为空时要展示的界面
    renderEmpty = () => {
        return (
            <BlankPages width={width} height={height} justify={'center'} align={'center'}/>
        )
    }
    // 前往拳师详情页
    gotoDetails = (item) => {
        console.log(item)
        let parameter = {
            title:item.nickName ? item.nickName : '',
            data:item
        };
        this.props.navigation.navigate('FistFriendN',parameter)
    }
    render() {
       return (
            <View style={styles.containerAppNear}>
                <View style={styles.containerAppNearChild}>
                    <PageListView
                        pageLen={10}
                        refresh={this.refresh}
                        renderRow={this.renderRow}
                        loadMore={this.loadMore}
                        renderEmpty={this.renderEmpty}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerAppNear: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F7F7F7"
    },
    containerAppNearChild: {
        width: width,
        height:"100%",
        backgroundColor: "#FFFFFF",
        // marginTop: 8
    },
    containerAppNearChild1: {
        width: width * 0.94,
        marginLeft: width * 0.03,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA"
    },
    containerAppNearChild11: {
        width: 90,
        height: 90,
        alignItems: "center",
        justifyContent: "center"
    },
    containerAppNearChild11Img: {
        width: 60,
        height: 60,
        borderRadius:30
    },
    containerAppNearChild12: {
        justifyContent: "center"
    },
    containerAppNearChild121: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: width * 0.7
    },
    containerAppNearChild122: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: width * 0.7,
        paddingTop: 10
    },
    containerAppNearChild122Text: {
        color: "#A8A8A8",
        fontSize: 13
    },
    containerAppNearChild1211: {
        flexDirection: "row",
        alignItems: "center"
    },
    containerAppNearChild1211Text: {
        fontSize: 14,
        color: "#3A3A3A"
    },
    containerAppNearChild1211Text2: {
        backgroundColor: "#B98A69",
        borderRadius: 8,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
        paddingBottom: 2,
        marginLeft: 6
    },
    containerAppNearChild1211Text3: {
        color: "#FFFFFF",
        fontSize: 11
    },
    containerAppNearChild1211Text4: {
        color: "#B98A69",
        fontSize: 13,
        fontWeight: "bold"
    },
    footer: {
        flexDirection: 'row',
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    zanwu: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    hidden: {
        display: 'none'
    },
    animating: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    bigbox: {
        display: 'flex',
    },
    box: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#e9e7e7',
        width: '96%',
        marginLeft: '2%',
        height: 100,
        marginTop: 10,
        borderRadius: 5,
    },
    boxtop: {
        width: '100%',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#e9e7e7',
        height: 40,
    },
    boxtopo: {
        width: '90%',
        marginLeft: '5%',
        height: 39,
        flexDirection: 'row',
    },
    boxtopoo: {
        flex: 1,
        lineHeight: 39,
    },
    boxtopot: {
        lineHeight: 39,
        fontSize: 18,
    },
    boxtopos: {
        lineHeight: 39,
        textAlign: 'right',
        fontSize: 18,
    },
    boxbottom: {
        width: '90%',
        marginLeft: '5%',
        height: 60,
    },
    boxbottomo: {
        width: '100%',
        height: 30,
    },
    boxbottomfont: {
        lineHeight: 30,
    }
});
