/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createStackNavigator, StackActions, NavigationActions, createAppContainer} from "react-navigation";
import {
    FlatList,
    TouchableOpacity, ScrollView, Button,
    Platform, Image, ImageBackground, Dimensions,
    StyleSheet, Text, TextInput,Alert,
    TouchableWithoutFeedback, View, AsyncStorage
} from "react-native";
import Swiper from 'react-native-swiper';

// icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PageListView from "react-native-page-listview";

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import {JFAPI} from './API/API';

let self = this;
import global from '../global';
import BlankPages from "../BlankPages/BlankPages";

export default class StudentsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            labelType: -1,
            userInfo: '',
            dataList: []
        }
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: '学员排名',
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    })

    render() {
        return (
            <View style={styles.containerAppLq}>
                <View style={styles.switchTab}>
                    <TouchableWithoutFeedback onPress={() => this.switchTabBtn(-1)}>
                        <Text style={this.state.labelType == -1 ? styles.textTabActive : styles.textTab}>全部</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.switchTabBtn(3)}>
                        <Text style={this.state.labelType == 3 ? styles.textTabActive : styles.textTab}>年</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.switchTabBtn(2)}>
                        <Text style={this.state.labelType == 2 ? styles.textTabActive : styles.textTab}>月</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.switchTabBtn(1)}>
                        <Text style={this.state.labelType == 1 ? styles.textTabActive : styles.textTab}>周</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.switchTabBtn(0)}>
                        <Text style={this.state.labelType == 0 ? styles.textTabActive : styles.textTab}>日</Text>
                    </TouchableWithoutFeedback>
                </View>
                {
                    this.state.dataList.length > 0 ? <View style={styles.lqcontainerChild}>
                        <FlatList
                            data={this.state.dataList}
                            extraData={this.state}
                            renderItem={({ item }) => this.renderCell(item)}
                            keyExtractor={(item) => item.id}
                        />
                    </View> : <View><Text style={{paddingTop:15,paddingBottom:15,fontSize:16,fontWeight:"500"}}>暂无更多数据...</Text></View>
                }
            </View>
        );
    }

    renderCell = (item) => {
        return (
            <View style={styles.lqcontainerChild2}>
                <View style={styles.lqcontainerChild22}>
                    <View style={styles.lqcontainerChild221}>
                        <View style={{width: 26, height: 26}}>
                            {
                                item.sort > 3 ?
                                    (<Text style={{fontSize: 19, color: "#B2B2B2"}}>{item.sort}</Text>) :
                                    (item.sort == 1 ?
                                        (<Image source={require('./Images/4-9.png')}/>) :
                                        (item.sort == 2 ?
                                            (<Image source={require('./Images/4-5.png')}/>) :
                                            (<Image source={require('./Images/4-1.png')}/>)))
                            }
                        </View>
                        <Image style={styles.HeaderSize} source={{uri: global.PicUrl + item.headurl}}/>
                        <View>
                            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                                <Text style={styles.nichengSty}>{item.nickName}</Text>
                                <View style={styles.nichengStyLevel}>
                                    <Text style={styles.nichengStyLevelText}>{item.levelTitle}</Text>
                                </View>
                            </View>
                            <Text style={styles.LevelText2}>{item.time}</Text>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={() => this.dianZan(item)}>
                        <View style={styles.lqcontainerChild222}>
                            <Text style={styles.dianzashu}>{item.upNum}</Text>
                            {
                                item.islike == 0 ?
                                    (<Image source={require('./Images/z.png')}/>) :
                                    (<Image source={require('./Images/za.png')}/>)
                            }
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }

    dianZan = (item) => {
        console.log("点赞", item);
        let url = JFAPI.sportSummary_up;
        let formData = new FormData();
        formData.append('userId', this.state.userInfo.id);
        formData.append('id', item.id);
        let opts = {
            body: formData,
            method: "POST",
        }
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log('点赞结果', res);
                if (res.code == 0) {
                    if (res.data) {
                        let dataListTemp = this.state.dataList;
                        let obj = dataListTemp[item.sort - 1];
                        obj.upNum = res.data;

                        this.setState({
                            dataList: dataListTemp
                        });
                    }
                }
            })
            .catch((err) => {
                console.log('点赞失败', err);
            })
    }
    switchTabBtn = (type) => {
        this.setState({
            labelType: type,
            dataList:[]
        })
        if (type == -1) {
            this.getDataList(-1);
        } else if (type == 3) {
            this.getDataList(3);
        } else if (type == 2) {
            this.getDataList(2);
        } else if (type == 1) {
            this.getDataList(1);
        } else if (type == 0) {
            this.getDataList(0);
        }
    }
    // 我的
    gotoMyPage = () => {
        StackActions.rest({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'MyPageN'})]
        })
    }

    // 请求页面接口
    componentDidMount() {
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result),
                    // headUrl: JSON.parse(result).headurl,
                    // nickName: JSON.parse(result).nickName
                })
            }).catch(error => {
            console.log(error);
            console.log("读取失败");
        })
        this.getDataList();
    }

    getDataList = (type) => {

        let url = JFAPI.sportSummary_topList;
        console.log("获取学员排名url", url);

        let formData = new FormData();
        // formData.append('userId', this.state.userInfo.id);
        formData.append('pageSize', 1000);
        formData.append('page', 1);
        formData.append('type',type);
        let opts = {
            body: formData,
            method: "POST",
        }
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log('获取数据结果', res);
                if (res.code == 0) {
                    if (res.data) {
                        let dataListTemp = this.state.dataList;
                        for (let i = 0; i < res.data.length; i++) {
                            let obj = res.data[i];
                            obj.levelTitle = this.lessonTypeText(obj.level);
                            obj.time = Math.floor(obj.sportTime / 60) + "分钟";
                            obj.sort = dataListTemp.length + 1;
                            dataListTemp.push(obj);

                        }
                        this.setState({
                            dataList: dataListTemp
                        });
                    }
                }
            })
            .catch((err) => {
                console.log('上传数据失败', err);
            })
    }

    // 等级类型
    lessonTypeText = (type) => {
        switch (type) {
            case 0:
            case 1:
                return '问身'
                break;
            case 2:
                return '养正'
                break;
            case 3:
                return '弘毅一级'
                break;
            case 4:
                return '弘毅二级'
                break;
            case 5:
                return '弘毅三级'
                break;
            case 6:
                return '归真一级'
                break;
            case 7:
                return '归真二级'
                break;
            case 8:
                return '归真三级'
                break;
            case 9:
                return '圆明一级'
                break;
            case 10:
                return '圆明二级';
                break;
            case 11:
                return '圆明三级'
                break;
            default:
                return '空'
        }
    }

    componentWillMount() {
    }
}
const styles = StyleSheet.create({
    containerAppLq: {
        flex: 1,
        backgroundColor: '#F3F3F3',
        alignItems: 'center'
    },
    lqcontainerChild: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        marginTop: 8
    },
    btmcon: {
        height: 70,
        width: width,
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#dddddd",
        overflow: "hidden",
        backgroundColor: "#ffffff"
    },
    textTab: {
        fontSize: 16,
        color: "#333333",
        paddingTop: 5,
        paddingBottom: 5
    },
    textTabActive: {
        fontSize: 16,
        color: "#8A6246",
        paddingTop: 5,
        paddingBottom: 5,
        fontWeight: "500"
    },
    btmconleft: {
        justifyContent: "center",
        alignItems: "center",
        width: width * 0.25
    },
    btmconright: {
        justifyContent: "center",
        alignItems: "center",
        width: width * 0.25
    },
    Indexicon: {
        width: 28,
        height: 28
    },
    IndexText: {
        fontSize: 12,
        paddingTop: 5,
        color: '#f56140'
    },
    NoIndexText: {
        fontSize: 12,
        paddingTop: 5,
        color: "#282828"
    },
    IndexTextNo: {
        fontSize: 12,
        paddingTop: 5,
        color: '#282828'
    },
    zlstitle: {
        color: "#8A6246",
        fontSize: 31,
        paddingTop: 10
    },
    zlstitle1: {
        color: "#B2B2B2",
        fontSize: 13,
        paddingTop: 4,
    },
    lqcontainerChild1: {
        width: "92%",
        marginLeft: "4%",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        paddingBottom: 10
    },
    lqcontainerChild2: {
        width: "92%",
        flexDirection: "row",
        flexWrap: "wrap",
        marginLeft: "4%",
        justifyContent: "space-around"
    },
    lqcontainerChild112: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 15
    },
    lqcontainerChild11: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    lqcontainerChild1112: {
        flexDirection: "row",
        alignItems: "center",
    },
    lqcontainerChild111: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 20
    },
    lqcontainerChild111Text: {
        color: "#B2B2B2",
        fontSize: 13,
        paddingRight: 5
    },
    lqcontainerChild21: {
        width: "33%",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 15
    },
    lqcontainerChild21Text1: {
        color: "#8A6246",
        fontSize: 21
    },
    lqcontainerChild21Text2: {
        color: "#B2B2B2",
        fontSize: 13,
        paddingTop: 5
    },
    xueyuanpaim: {
        color: "#282828",
        fontSize: 16,
        fontWeight: "500"
    },
    lqcontainerChild22: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,

    },
    lqcontainerChild221: {
        flexDirection: "row",
        alignItems: "center"
    },
    HeaderSize: {
        width: 40,
        height: 40,
        borderRadius: 6,
        marginLeft: 10,
        marginRight: 10
    },
    nichengSty: {
        color: "#282828",
        fontSize: 15,
        fontWeight: "400"
    },
    nichengStyLevel: {
        backgroundColor: "#B98A69",
        marginLeft: 5,
        borderRadius: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 2,
        paddingBottom: 2
    },
    nichengStyLevelText: {
        color: "#FFFFFF",
        fontSize: 10
    },
    LevelText2: {
        color: "#B2B2B2",
        fontSize: 13,
        paddingTop: 8
    },
    lqcontainerChild222: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    dianzashu: {
        color: "#B2B2B2",
        fontSize: 12,
        paddingRight: 5,
        paddingTop: 5
    },
    dianzashuYs: {
        color: "#C1977A",
        fontSize: 12,
        paddingRight: 5,
        paddingTop: 5
    },
    switchTab: {
        width: "100%",
        borderBottomColor: "#dddddd",
        borderBottomWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: "row",
        justifyContent: "space-around"
    }
});
