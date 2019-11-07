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
    AppRegistry,
    PermissionsAndroid,
    Easing,
    InteractionManager,
    FlatList,
    TouchableOpacity,
    Platform,
    Image,
    ImageBackground,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
    AppState,
    Picker,
    NativeModules,
    NativeEventEmitter,
    Modal, Animated, Linking, Alert,
    TouchableHighlight,
    AsyncStorage,
    ScrollView
} from "react-native";
import Swiper from 'react-native-swiper';

// icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Permissions from 'react-native-permissions'
import global from '../global';
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import {JFAPI} from './API/API';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import BleManager from "react-native-ble-manager";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

let self = this;
export default class HisCraft extends React.Component {

    lastTime = 0;

    constructor(props) {
        super(props);
        this.state = {
            userInfo: '',
            equipmentState: false,
            show: false,
            animate: new Animated.Value(0), // 二维坐标{x:0,y:0}
            selectDeviceId: '',
            scanning: false,
            deviceMap: new Map(),
            appState: '',
            tjDevice: '',
            selectDevice: '',
            sportData: {
                sportTime: 0,
                totalDay: 0,
                lianxuDay: 0,
                lianxiNum: 0,
                sportRate: 0
            },
            rankList: []
        }
        // this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
        // this.handleStopScan = this.handleStopScan.bind(this);
        // this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
        // this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
        // this.handleAppStateChange = this.handleAppStateChange.bind(this);

        // 注册自定义导航右侧点击事件
        this.props.navigation.setParams({
            showAddDevice: this.showAddDevice
        })

    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: '练习',
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        // headerRight: (
        // <TouchableHighlight onPress={() => navigation.state.params.showAddDevice(self)}>
        //     <Text style={styles.navBtn}>添加设备</Text>
        // </TouchableHighlight>
        // )
    })

    // 请求页面接口
    componentDidMount() {
        this.getUserInfo();
        this.getRankList();
        // AppState.addEventListener('change', this.handleAppStateChange);
        console.log("BleManager1" + JSON.stringify(BleManager));

        BleManager.start({showAlert: false});

        console.log("BleManager2" + BleManager);

        // this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral);
        // this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan);
        // this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral);
        // this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic);

        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                    console.log("Permission is OK");
                } else {
                    PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                        if (result) {
                            console.log("User accept");
                        } else {
                            console.log("User refuse");
                        }
                    });
                }
            });
        }

    }

    getUserInfo = () => {
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result),
                    // headUrl: JSON.parse(result).headurl,
                    // nickName: JSON.parse(result).nickName
                })
                this.getSportData();
            }).catch(error => {
            console.log(error);
            console.log("读取失败");
        })
    }

    render() {
        return (

            <View style={styles.containerAppLq}>
                <ScrollView style={styles.scollStyle}>
                    <View style={styles.lqcontainerChild}>
                        <View style={styles.lqcontainerChild1}>
                            <View style={styles.lqcontainerChild11}>
                                <View>
                                    <Text
                                        style={styles.zlstitle}>{Math.floor(this.state.sportData.sportTime / 60)}</Text>
                                    <Text style={styles.zlstitle1}>累计运动时长(分钟)</Text>
                                </View>

                                <View>
                                    <TouchableHighlight onPress={() => this.beginHisCraft()} underlayColor='#f1f1f1'>
                                        <View style={styles.lqcontainerChild111}>
                                            <Text style={styles.lqcontainerChild111Text}>开始练习</Text>
                                            <Image source={require('./Images/l.png')}/>
                                        </View>
                                    </TouchableHighlight>
                                    {/* <TouchableHighlight onPress={() => this.craftDetails()} underlayColor='#f1f1f1'>
                                    <View style={styles.lqcontainerChild111}>
                                        <Text style={styles.lqcontainerChild111Text}>查看全部</Text>
                                        <Image source={require('./Images/l.png')} />
                                    </View>
                                </TouchableHighlight> */}
                                </View>
                            </View>

                        </View>
                        <View style={styles.lqcontainerChild2}>
                            <View style={styles.lqcontainerChild21}>
                                <Text style={styles.lqcontainerChild21Text1}>{this.state.sportData.totalDay}</Text>
                                <Text style={styles.lqcontainerChild21Text2}>累计/天</Text>
                            </View>
                            <View style={styles.lqcontainerChild21}>
                                <Text style={styles.lqcontainerChild21Text1}>{this.state.sportData.lianxuDay}</Text>
                                <Text style={styles.lqcontainerChild21Text2}>连续/天</Text>
                            </View>
                            <View style={styles.lqcontainerChild21}>
                                <Text style={styles.lqcontainerChild21Text1}>{this.state.sportData.lianxiNum}</Text>
                                <Text style={styles.lqcontainerChild21Text2}>练习/次</Text>
                            </View>
                            <View style={styles.lqcontainerChild21}>
                                <Text
                                    style={styles.lqcontainerChild21Text1}>{this.lessonTypeText(this.state.userInfo.level)}</Text>
                                <Text style={styles.lqcontainerChild21Text2}>级别</Text>
                            </View>
                            <View style={styles.lqcontainerChild21}>
                                <Text style={styles.lqcontainerChild21Text1}>{this.state.sportData.sportRate < 60 ? '不及格' : '百分之'+this.state.sportData.sportRate}</Text>
                                <Text style={styles.lqcontainerChild21Text2}>动作准确率</Text>
                            </View>
                        </View>
                    </View>
                    {
                        this.state.rankList.length > 0 ?  <View style={styles.lqcontainerChild}>
                            <View style={styles.lqcontainerChild1}>
                                <View style={styles.lqcontainerChild112}>
                                    <Text style={styles.xueyuanpaim}>学员排名</Text>
                                    <TouchableHighlight onPress={() => this.studentsRank()} underlayColor='#f1f1f1'>
                                        <View style={styles.lqcontainerChild1112}>
                                            <Text style={styles.lqcontainerChild111Text}>查看全部</Text>
                                            <Image source={require('./Images/l.png')}/>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>

                            {
                                this.state.rankList.map((item, index) => {
                                    return this.renderCell(item)
                                })
                            }
                        </View> : null
                    }
                    {/*课程修炼*/}
                    {/*<View style={[styles.lqcontainerChild]}>*/}
                    {/*    <Text style={styles.practiceTitleStyle}>课程修炼</Text>*/}
                        {/*<ScrollView horizontal={true} pagingEnabled={true}>*/}
                        {/*    <View style={styles.practiceItemBackStyle}>*/}
                        {/*        <View style={styles.practiceItemStyle}>*/}
                        {/*            <Text style={styles.practiceItemTitleStyle}>太极拳一式</Text>*/}
                        {/*            <View style={styles.practiceItemContentBackStyle}>*/}
                        {/*                <Text style={styles.practiceItemContentTextStyle}>● 已修炼2天，共修炼10次</Text>*/}
                        {/*                <Text style={styles.practiceItemContentTextStyle}>● 需修炼：10次/天，至少1天，建议1天</Text>*/}
                        {/*                <Text style={styles.practiceItemContentTextStyle}>● 已有122220人修炼</Text>*/}
                        {/*                <TouchableHighlight style={{alignSelf: 'center'}}>*/}
                        {/*                    <Text style={styles.practiceItemBtnStyle}>开始训练</Text>*/}
                        {/*                </TouchableHighlight>*/}
                        {/*            </View>*/}
                        {/*        </View>*/}
                        {/*    </View>*/}
                            {/*<View style={styles.practiceItemBackStyle}>*/}
                            {/*    <View style={styles.practiceItemStyle}>*/}
                            {/*        <Text style={styles.practiceItemTitleStyle}>太极拳一式</Text>*/}
                            {/*        <View style={styles.practiceItemContentBackStyle}>*/}
                            {/*            <Text style={styles.practiceItemContentTextStyle}>● 已修炼2天，共修炼10次</Text>*/}
                            {/*            <Text style={styles.practiceItemContentTextStyle}>● 需修炼：10次/天，至少1天，建议1天</Text>*/}
                            {/*            <Text style={styles.practiceItemContentTextStyle}>● 已有122220人修炼</Text>*/}
                            {/*            <TouchableHighlight style={{alignSelf: 'center'}}>*/}
                            {/*                <Text style={styles.practiceItemBtnStyle}>开始训练</Text>*/}
                            {/*            </TouchableHighlight>*/}
                            {/*        </View>*/}
                            {/*    </View>*/}
                            {/*</View>*/}
                            {/*<View style={styles.practiceItemBackStyle}>*/}
                            {/*    <View style={styles.practiceItemStyle}>*/}
                            {/*        <Text style={styles.practiceItemTitleStyle}>太极拳一式</Text>*/}
                            {/*        <View style={styles.practiceItemContentBackStyle}>*/}
                            {/*            <Text style={styles.practiceItemContentTextStyle}>● 已修炼2天，共修炼10次</Text>*/}
                            {/*            <Text style={styles.practiceItemContentTextStyle}>● 需修炼：10次/天，至少1天，建议1天</Text>*/}
                            {/*            <Text style={styles.practiceItemContentTextStyle}>● 已有122220人修炼</Text>*/}
                            {/*            <TouchableHighlight style={{alignSelf: 'center'}}>*/}
                            {/*                <Text style={styles.practiceItemBtnStyle}>开始训练</Text>*/}
                            {/*            </TouchableHighlight>*/}
                            {/*        </View>*/}
                            {/*    </View>*/}
                            {/*</View>*/}
                            {/*<View style={styles.practiceItemBackStyle}>*/}
                            {/*    <View style={styles.practiceItemStyle}>*/}
                            {/*        <Text style={styles.practiceItemTitleStyle}>太极拳一式</Text>*/}
                            {/*        <View style={styles.practiceItemContentBackStyle}>*/}
                            {/*            <Text style={styles.practiceItemContentTextStyle}>● 已修炼2天，共修炼10次</Text>*/}
                            {/*            <Text style={styles.practiceItemContentTextStyle}>● 需修炼：10次/天，至少1天，建议1天</Text>*/}
                            {/*            <Text style={styles.practiceItemContentTextStyle}>● 已有122220人修炼</Text>*/}
                            {/*            <TouchableHighlight style={{alignSelf: 'center'}}>*/}
                            {/*                <Text style={styles.practiceItemBtnStyle}>开始训练</Text>*/}
                            {/*            </TouchableHighlight>*/}
                            {/*        </View>*/}
                            {/*    </View>*/}
                            {/*</View>*/}
                            {/*<View style={styles.practiceItemBackStyle}>*/}
                            {/*    <View style={styles.practiceItemStyle}>*/}
                            {/*        <Text style={styles.practiceItemTitleStyle}>太极拳一式</Text>*/}
                            {/*        <View style={styles.practiceItemContentBackStyle}>*/}
                            {/*            <Text style={styles.practiceItemContentTextStyle}>● 已修炼2天，共修炼10次</Text>*/}
                            {/*            <Text style={styles.practiceItemContentTextStyle}>● 需修炼：10次/天，至少1天，建议1天</Text>*/}
                            {/*            <Text style={styles.practiceItemContentTextStyle}>● 已有122220人修炼</Text>*/}
                            {/*            <TouchableHighlight style={{alignSelf: 'center'}}>*/}
                            {/*                <Text style={styles.practiceItemBtnStyle}>开始训练</Text>*/}
                            {/*            </TouchableHighlight>*/}
                            {/*        </View>*/}
                            {/*    </View>*/}
                            {/*</View>*/}
                        {/*</ScrollView>*/}
                    {/*</View>*/}
                </ScrollView>
                {/*添加设备*/}
                {this.addDeviceView()}
                <View style={styles.btmcon}>
                    <TouchableWithoutFeedback onPress={() => this.gotoPage('HomeN')}>
                        <View style={styles.btmconleft}>
                            <Image style={{width: 23, height: 22}} source={require('./Images/shouye.png')}/>
                            <Text style={styles.IndexTextNo}>首页</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <View style={styles.btmconright}>
                            <Image style={{width: 18, height: 23}} source={require('./Images/lianquan.png')}/>
                            <Text style={styles.IndexTextNo}>练习</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.gotoPage('MallTemplateN')}>
                        <View style={styles.btmconright}>
                            <Image style={{width: 21, height: 19}} source={require('./Images/shangcheng.png')}/>
                            <Text style={styles.IndexTextNo}>商城</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.gotoPage('MypageN')}>
                        <View style={styles.btmconright}>
                            <Image style={{width: 21, height: 21}} source={require('./Images/wode.png')}/>
                            <Text style={styles.IndexTextNo}>我的</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
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

    addDeviceView = () => {

        let contentView = <Text style={styles.smjeText}>请去商场购买太极球并绑定,以便让我们给您更好的服务</Text>;
        let deviceList = Array.from(this.state.deviceMap.values());
        if (deviceList.length > 0) {
            contentView = <FlatList style={{height: 130, width: '80%', backgroundColor: '#fff'}}
                                    data={deviceList}
                                    extraData={this.state}
                                    renderItem={({item}) => {
                                        return (
                                            <TouchableHighlight onPress={() => this.addDevliceClickCell(item)}
                                                                underlayColor="#eee">
                                                <View style={styles.cellBackgroundView}>
                                                    <View style={styles.unselect}>
                                                        {this.state.selectDeviceId === item.id ?
                                                            (
                                                                <View style={styles.celllSelect}></View>
                                                            ) : null}
                                                    </View>
                                                    <Text style={styles.cellText}>{item.name}
                                                    </Text>
                                                </View>

                                            </TouchableHighlight>
                                        );

                                    }}
            />
        }

        return (
            <Modal animationType="slide" transparent={true} visible={this.state.equipmentState}
                   onRequestClose={() => {
                       this.onRequestClose();
                   }}>
                <View style={styles.mask}>
                    <TouchableWithoutFeedback onPress={() => this.hideAddDevice()}>
                        <View style={{flex: 1}}>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.AddShebei}>
                    <Image source={require('./Images/q.png')}/>
                    <Text style={{paddingTop: 10}}>欢迎使用悠然太极,请选择设备</Text>
                    <View style={{
                        width: "80%",
                        borderBottomWidth: 1,
                        borderBottomColor: "#EAEAEA",
                        paddingBottom: 5
                    }}>

                    </View>
                    {contentView}
                    <TouchableWithoutFeedback onPress={() => this.addDevliceBtnClick()}>
                        <Text style={styles.tianjiasbText2}>添加设备</Text>
                    </TouchableWithoutFeedback>
                </View>
            </Modal>
        )
    }

    // 点击设备
    addDevliceClickCell = (item) => {
        console.log("--------");

        console.log("点击了" + item.id + "---" + item.name);

        this.setState({
            selectDevice: item,
            selectDeviceId: item.id
        });

    }

    addDevliceBtnClick = () => {
        console.log("添加设备" + this.state.selectDeviceId);
        if (this.state.selectDevice && this.state.selectDevice != '') {
            this.beginConnect(this.state.selectDevice);
        } else {
            console.log("请先选择要添加的设备");

        }
    }

    // 我的
    gotoMyPage = () => {
        StackActions.rest({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'MyPageN'})]
        })
    }

    beginHisCraft = () => {
        let self = this;
        console.log("开始练拳");
        let data = {
            refresh: function () {
                self.getSportData()
            }
        };
        self.props.navigation.navigate("HisCraftBegin",data);
    }

    craftDetails = () => {
        console.log("练拳详情");
        this.props.navigation.navigate("DetailsCraftN");
    }

    studentsRank = () => {
        console.log("学员排名");
        this.props.navigation.navigate("StudentsListN");
    }

    // 隐藏添加设备界面
    hideAddDevice = () => {
        console.log("隐藏界面");
        this.stopScan();
        this.setState({
            equipmentState: false
        })
    }

    showAddDevice = () => {

        console.log("显示界面");

        this.setState({
            equipmentState: true
        })

        this.startScan();
    }


    handleAppStateChange(nextAppState) {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!')
            BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
                console.log('Connected peripherals: ' + peripheralsArray.length);
            });
        }
        this.setState({appState: nextAppState});
    }

    // 断开连接监听
    handleDisconnectedPeripheral(data) {
        let peripherals = this.state.peripherals;
        let peripheral = peripherals.get(data.peripheral);
        if (peripheral) {
            peripheral.connected = false;
            peripherals.set(peripheral.id, peripheral);
            this.setState({peripherals});
        }
        console.log('Disconnected from ' + data.peripheral);
    }

    // 收到数据监听
    handleUpdateValueForCharacteristic(data) {
        console.log("收到监听数据");

        // const dataStr = bytesToString(data.value);
        // console.log("data.value:" + data.value + ",dataStr:" + dataStr);

        console.log('收到 ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);

        var dataList = data.value;

        // 高字节数 * 256 + 低字节数

        var bleData = new Object();
        bleData.ax = dataList[1] * 256 + dataList[0];//加速度
        bleData.ay = dataList[3] * 256 + dataList[2];
        bleData.az = dataList[5] * 256 + dataList[4];

        bleData.wx = dataList[7] * 256 + dataList[6];//角速度
        bleData.wy = dataList[9] * 256 + dataList[8];
        bleData.wz = dataList[11] * 256 + dataList[10];

        bleData.hx = dataList[13] * 256 + dataList[12];//磁强
        bleData.hy = dataList[15] * 256 + dataList[14];
        bleData.hz = dataList[17] * 256 + dataList[16];

        bleData.time = dataList[19] * 256 + dataList[18];

        console.log("解析后数据" + JSON.stringify(bleData));

        this.postDeviceData(bleData);

    }

    /**
     * 上传数据
     */
    postDeviceData = (dataObj) => {
        let time = new Date().getTime();
        console.log('time', this.lastTime, time);

        if (time - this.lastTime < 1000) {
            return;
        }
        this.lastTime = time;

        console.log("开始上传数据", dataObj);

        let url = JFAPI.sportLog_save;
        console.log("上传数据url:", url);
        let formData = new FormData();
        formData.append('userId', this.state.userInfo.id);
        formData.append('data', JSON.stringify(dataObj));
        console.log('上传数据formData', formData);
        let opts = {
            body: formData,
            method: "POST",
        }
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log('上传数据结果', res);
                if (res.code == 0) {
                    if (res.data) {

                    }
                }
            })
            .catch((err) => {
                console.log('上传数据失败', err);
            })
    }

    getSportData = () => {
        let url = JFAPI.sportLog_getSportData;
        let formData = new FormData();
        formData.append('userId', this.state.userInfo.id);
        console.log('获取数据', url, formData);
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
                        this.setState({
                            sportData: res.data
                        });
                    }
                }
            })
            .catch((err) => {
                console.log('获取数据失败', err);
            })
    }

    getRankList = () => {

        let url = JFAPI.sportSummary_topList;
        console.log("获取学员排名url", url);

        let formData = new FormData();
        // formData.append('userId', this.state.userInfo.id);
        formData.append('pageSize', 3);
        formData.append('page', 1);
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
                        let dataListTemp = this.state.rankList;
                        for (let i = 0; i < res.data.length; i++) {

                            let obj = res.data[i];
                            obj.levelTitle = this.lessonTypeText(obj.level);
                            obj.time = Math.floor(obj.sportTime / 60) + "分钟";
                            obj.sort = dataListTemp.length + 1;
                            dataListTemp.push(obj);

                        }
                        console.log("整理后数据", dataListTemp);

                        this.setState({
                            rankList: dataListTemp
                        });
                    }
                }
            })
            .catch((err) => {
                console.log('上传数据失败', err);
            })
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
        console.log(url);
        console.log(opts);
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log('点赞结果', res);
                if (res.code == 0) {
                    if (res.data) {
                        let dataListTemp = this.state.rankList;
                        let obj = dataListTemp[item.sort - 1];
                        obj.upNum = res.data;
                        this.setState({
                            rankList: dataListTemp
                        });
                    }
                }
            })
            .catch((err) => {
                console.log('点赞失败', err);
            })
    }

    // 我的
    gotoMyPage = () => {
        StackActions.rest({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'MyPageN'})]
        })
    }

    // 注册监听
    componentWillMount(){

    }
    // 停止扫描监听
    handleStopScan() {

        console.log('停止扫描监听回调');
        this.setState({scanning: false});
    }

    startScan = () => {
        if (!this.state.scanning) {
            this.setState({peripherals: new Map()});
            console.log('Scanning...1');
            BleManager.scan([], 100, true).then((results) => {
                console.log('Scanning...');
                this.setState({scanning: true});
            });
            console.log('Scanning...2');
        }
    }

    stopScan = () => {
        BleManager.stopScan()
            .then(() => {
                // Success code
                console.log('停止扫描');
            });
    }

    retrieveConnected() {
        BleManager.getConnectedPeripherals([]).then((results) => {
            if (results.length == 0) {
                console.log('No connected peripherals')
            }
            console.log(results);
            var deviceMap = this.state.deviceMap;
            for (var i = 0; i < results.length; i++) {
                var peripheral = results[i];
                peripheral.connected = true;
                deviceMap.set(peripheral.id, peripheral);
                this.setState({deviceMap});
            }
        });
    }

    // 发现设备
    handleDiscoverPeripheral(peripheral) {

        var deviceMap = this.state.deviceMap;
        if (!deviceMap.has(peripheral.id)) {
            console.log('发现设备', peripheral);
            if (peripheral.name != null && peripheral.name.indexOf("TJ") == 0)
                deviceMap.set(peripheral.id, peripheral);
            this.setState({deviceMap})
        }
    }

    beginConnect(peripheral) {
        if (peripheral) {
            if (peripheral.connected) {
                BleManager.disconnect(peripheral.id);
            } else {
                BleManager.connect(peripheral.id).then(() => {
                    let peripherals = this.state.peripherals;
                    let p = peripherals.get(peripheral.id);
                    if (p) {
                        p.connected = true;
                        peripherals.set(peripheral.id, p);
                        this.setState({peripherals});
                    }
                    console.log('Connected to ' + peripheral.id);


                    setTimeout(() => {

                        /* Test read current RSSI value
                        BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
                          console.log('Retrieved peripheral services', peripheralData);
            
                          BleManager.readRSSI(peripheral.id).then((rssi) => {
                            console.log('Retrieved actual RSSI value', rssi);
                          });
                        });*/

                        // Test using bleno's pizza example
                        // https://github.com/sandeepmistry/bleno/tree/master/examples/pizza
                        BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
                            console.log("peripheralInfo" + JSON.stringify(peripheralInfo));
                            var service = '6E401523-B5A3-F393-E0A9-E50E24DCCA9E';
                            var bakeCharacteristic = '1529';
                            var crustCharacteristic = '1529';

                            setTimeout(() => {
                                console.log("延迟开启通知");
                                BleManager.startNotification(peripheral.id, service, bakeCharacteristic).then(() => {
                                    console.log('Started notification on ' + peripheral.id);
                                    // setTimeout(() => {
                                    //   BleManager.write(peripheral.id, service, crustCharacteristic, [0]).then(() => {
                                    //     console.log('Writed NORMAL crust');
                                    //     BleManager.write(peripheral.id, service, bakeCharacteristic, [1, 95]).then(() => {
                                    //       console.log('Writed 351 temperature, the pizza should be BAKED');
                                    //       /*
                                    //       var PizzaBakeResult = {
                                    //         HALF_BAKED: 0,
                                    //         BAKED:      1,
                                    //         CRISPY:     2,
                                    //         BURNT:      3,
                                    //         ON_FIRE:    4
                                    //       };*/
                                    //     });
                                    //   });

                                    // }, 500);
                                }).catch((error) => {
                                    console.log('Notification error', error);
                                });
                            }, 200);
                        }).catch((error) => {
                            console.log('retrieveServices error', error);
                        });

                    }, 900);
                }).catch((error) => {
                    console.log('Connection error', error);
                });
            }
        }
    }

    componentWillUnmount() {
        // 移除监听
        // this.backFromShopListener.remove();
        // this.handlerDiscover.remove();
        // this.handlerStop.remove();
        // this.handlerDisconnect.remove();
        // this.handlerUpdate.remove();
    }

    gotoPage = (Parames) => {
        let reseAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: Parames})]
        })
        this.props.navigation.dispatch(reseAction);
    }
    confirmSettings = () => {
        Linking.openURL('app-settings:')
            .catch(err => {
                console.log(err);
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
}
const styles = StyleSheet.create({
    containerAppLq: {
        flex: 1,
        backgroundColor: '#F3F3F3',
        width: width,
        alignItems: 'center'
    },
    lqcontainerChild: {
        width: "94%",
        backgroundColor:"#FFFFFF",
        marginLeft:11,
        marginTop: 20
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
        paddingTop: 8,
        paddingBottom: 8
    },
    lqcontainerChild111Text: {
        color: "#B2B2B2",
        fontSize: 14,
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
        paddingBottom: 10
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
    mask: {
        justifyContent: "center",
        backgroundColor: "#383838",
        opacity: 0.7,
        position: "absolute",
        width: width,
        height: height,
        // zIndex: 0,
        top: 0
    },

    AddShebei: {
        width: "80%",
        borderRadius: 6,
        marginLeft: "10%",
        backgroundColor: "#FFFFFF",
        paddingTop: 10,
        paddingBottom: 15,
        position: "absolute",
        bottom: height * 0.4,
        alignItems: "center",
        zIndex: 5
    },
    smjeText: {
        textAlign: "center",
        paddingTop: 9,
        paddingBottom: 9,
        paddingLeft: 20,
        paddingRight: 20,
        color: "#B2B2B2",
        fontSize: 13
    },
    tianjiasbText2: {
        fontSize: 17,
        color: "#FF7200",
        paddingTop: 15
    },
    camera: {
        flex: 1
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    kuang: {
        width: 260,
        height: 260,
        borderWidth: 1,
        borderColor: 'skyblue',
        backgroundColor: '#rgba(255,255,255,0.1)'
    },
    info: {
        width: width,
        height: 80,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingBottom: 5,
        justifyContent: 'space-around',
    },
    container: {
        flex: 1,
        position: "absolute",
        top: 0,
        width: width,
        height: height
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: 200,
        width: 200,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        backgroundColor: 'transparent'
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: 10
    },
    border: {
        flex: 0,
        width: 200,
        height: 2,
        backgroundColor: '#FFFFFF'
    },
    cellText: {
        color: "#777",
        fontSize: 17,
        padding: 5,
        flex: 1,
    },

    navBtn: {
        fontSize: 17,
        color: 'rgba(240,240,240,1)',
        paddingRight: 10
    },
    unselect: {
        width: 18,
        height: 18,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 9,
        borderWidth: 1,
        borderColor: 'rgba(210,210,210,1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    celllSelect: {
        width: 12,
        height: 12,
        backgroundColor: 'rgba(255,81,81,1)',
        borderRadius: 6
    },
    cellBackgroundView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#eee',
        borderBottomWidth: 1
    },

    practiceTitleStyle: {
        marginLeft: 20,
        marginTop: 10,
        color: "#282828",
        fontSize: 16,
        fontWeight: "500"
    },

    practiceItemBackStyle: {
        height: 340,
        width: width * 94 / 100
        // padding: 20,
    },

    practiceItemStyle: {
        margin: 16,
        borderColor: '#a58676',
        borderWidth: 1,


    },
    practiceItemContentBackStyle: {
        padding: 12
    },
    practiceItemTitleStyle: {
        backgroundColor: '#f1e8dd',
        color: '#a58676',
        textAlign: 'center',
        marginRight: 1,
        textAlignVertical: 'center',
        padding: 10,
        fontSize: 18,
        borderBottomColor: '#a58676',
        borderBottomWidth: 1,
    },
    practiceItemBtnStyle: {
        backgroundColor: '#bf8866',
        color: '#fff',
        marginTop: 20,
        padding: 8,
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 20,
        borderRadius: 3
    },

    practiceItemContentTextStyle: {
        color: '#a59889',
        margin: 5,
    },
    scollStyle:{
        flex:1,
        width:width
    }
});
