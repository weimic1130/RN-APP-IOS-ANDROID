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
    AsyncStorage
} from "react-native";
import Swiper from 'react-native-swiper';
// icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Permissions from 'react-native-permissions';
import * as Progress from 'react-native-progress';
import ModalDropdown from 'react-native-modal-dropdown'

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import {JFAPI} from './API/API';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import BleManager from "react-native-ble-manager";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

let self = this;
export default class HisCraftBegin extends React.Component {
    setmoveTimes = 0;
    lastIndex = 0;
    lastNum = 0;
    lastTime = 0;
    lastRunTime = 0;
    lastRecords = [];
    constructor(props) {
        super(props);
        this.state = {
            // 每次开始记录上次的圈数
            totalNumber:0,
            totalStatus:true,
            progress: 1,
            indeterminate: true,
            userInfo: '',
            equipmentState: false,
            show: false,
            selectDeviceId: '',
            scanning: false,
            deviceMap: new Map(),
            appState: '',
            tjDevice: '',
            compleNumer:0,
            selectDevice: '',
            isRun: false,
            runTimeSeconds: 0,
            runTimeText: "00:00:00",
            sportStandardNameList: [],
            sportStandardList: [],
            selectStandardIndex: 0,
            defaultValue: '选择',
            defaultIndex: 0,
            hisCraftId: '',
            showEndPrompt: false,
            stopRunSeconds: 18,
            // stopRunSeconds: 5,
        }
        this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
        this.handleStopScan = this.handleStopScan.bind(this);
        this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
        this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);

        // 注册自定义导航右侧点击事件
        this.props.navigation.setParams({
            showAddDevice1: this.showAddDevice1,
            deviceName: '添加设备'
        })

    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: '练习',
        headerStyle: {
            backgroundColor: "#333"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        headerRight: (
            <TouchableHighlight onPress={() => navigation.state.params.showAddDevice1(self)}>
                <Text style={styles.navBtn}>{navigation.getParam('deviceName')}</Text>
            </TouchableHighlight>
        )
    })

    // 请求页面接口
    componentDidMount() {
        this.retrieveConnected();
        this.getUserInfo();
        this.getSportStandardList();

        AppState.addEventListener('change', this.handleAppStateChange);
        // console.log("BleManager1" + JSON.stringify(BleManager));

        BleManager.start({showAlert: false});

        console.log("BleManager2" + BleManager);

        this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral);
        this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan);
        this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral);
        this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic);

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
            }).catch(error => {
        })
    }

    render() {
        return (
            <View style={styles.backgroundStyle}>
                {/* <View style={styles.modalbackGroundStyle}> */}
                <ModalDropdown
                    ref="dropdown"
                    options={this.state.sportStandardNameList}
                    style={styles.modalDropdownStyle}
                    defaultValue={this.state.defaultValue}
                    defaultIndex={this.state.defaultIndex}
                    textStyle={styles.menuShowTextStyle}
                    dropdownStyle={styles.dropdownStyle}
                    onSelect={(idx, value) => this.dropdownOnSelect(idx, value)}
                    renderRow={this.renderMenuRow.bind(this)}

                >
                    {/* <Text style={styles.menuShowTextStyle}>选择</Text> */}
                </ModalDropdown>
                {/* </View> */}

                <View style={styles.timeBackgroundStyle}>
                    <Text style={styles.timeTextStyle}>{this.state.runTimeText}</Text>
                    <Text style={styles.timeInfoTextStyle}>时间</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => this.playBtnClick()}>
                    <View style={styles.playBtnStyle}>
                        <Image style={styles.playImgStyle}
                               source={this.state.isRun ? require('./Images/stop.png') : require('./Images/begin.png')}/>
                    </View>
                </TouchableWithoutFeedback>
                {
                    this.state.showEndPrompt ?
                        <Text style={styles.promptTextStyle}>球停止转动
                            <Text style={styles.promptSecondsTextStyle}>{this.state.stopRunSeconds}</Text>秒后自动结束
                        </Text>
                        : null
                }
                {/*添加设备*/}
                {this.addDeviceView()}
                <View style={styles.circles}>
                    <Text style={styles.textqs}>已完成圈数</Text>
                    <Text style={styles.textqs2}>{this.state.compleNumer}</Text>
                </View>
            </View>
        );
    }

    dropdownOnSelect(idx, value) {
        this.setState({
            selectStandardIndex: idx
        });
        console.log('选择', idx, value);

    }

    renderMenuRow(option, index, isSelected) {
        console.log("item", option);
        return (
            <View style={styles.menuRowStyle}>
                <Text style={isSelected ? styles.menuRowTextSelectStyle : styles.menuRowTextStyle}>{option}</Text>
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

    // 开始
    playBtnClick = () => {
        this.lastNum = new Date().getTime();
        // 停止
        if (this.state.isRun) {
            clearInterval(this.timer);
            this.sportTimeEnd();
            this.setState({
                compleNumer:0
            })
        }
        // 开始
        else {
            if (this.state.selectDevice == null || this.state.selectDevice == '') {
                Alert.alert('请先添加设备');
                return;
            }
            this.lastRunTime = new Date().getTime();
            this.setState({
                runTimeSeconds: 0,
                runTimeText: "00:00:00",
                compleNumer:0
            });
            this.sportTimeStart();
            this.timer = setInterval(() => this.timerFunc(), 1000, 0);
            // this.timer = setInterval(() => this.timerFunc(), 150, 0);

        }
        this.setState({
            isRun: !this.state.isRun
        });
    }

    timerFunc() {
        let runTimeSeconds = this.state.runTimeSeconds + 1;

        let hours = Math.floor(runTimeSeconds / 3600);
        let minutes = Math.floor((runTimeSeconds % 3600) / 60);
        let seconds = Math.round(runTimeSeconds % 60);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        let runTimeText = hours + ":" + minutes + ":" + seconds;
        this.setState({
            runTimeSeconds: runTimeSeconds,
            runTimeText: runTimeText
        });

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
            this.hideAddDevice();
            this.props.navigation.setParams({deviceName: this.state.selectDevice.name});
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
        console.log("隐藏界面begin");
        this.stopScan();
        this.setState({
            equipmentState: false
        })
    }

    showAddDevice1 = () => {

        console.log("显示界面begin");

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
        // console.log("收到监听数据");
        // console.log(data);
        if (!this.state.isRun) {
            this.setState({
                showEndPrompt: false
            });
            return;
        }
        // const dataStr = bytesToString(data.value);
        // console.log("data.value:" + data.value + ",dataStr:" + dataStr);

        // console.log('收到 ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);

        var dataList = data.value;
        if(this.state.totalStatus){
            this.setState({
                totalNumber: dataList[18],
                totalStatus:false
            })
        }
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

        // console.log("解析后数据" + JSON.stringify(bleData));
        let runStandard = 25;
        let wx = bleData.wx;
        if (wx > 32767) {
            wx = 65536 - wx;
        }
        let wy = bleData.wy;
        if (wy > 32767) {
            wy = 65536 - wy;
        }
        let wz = bleData.wz;
        if (wz > 32767) {
            wz = 65536 - wz;
        }
        // console.log(dataList);
        if(dataList[18] > 0){
            this.setState({
                compleNumer:(dataList[18] - this.state.totalNumber)
            })
        }
        //正在运动
        if (wx > runStandard || wy > runStandard || wz > runStandard) {
            this.lastRunTime = new Date().getTime();
            var moveTimes = Math.floor((this.lastRunTime - this.lastNum) / 1000);
            this.setmoveTimes = moveTimes;
           if(moveTimes > 18){
           // if(moveTimes > 5){
               this.lastRecords.push(dataList);
               // console.log(this.lastRecords);
           }else{
               this.lastRecords.push(dataList);
           }
            this.setState({
                showEndPrompt: false,
                stopRunSeconds: 18
                // stopRunSeconds: 5
            });
        } else {
            let timeLength = Math.floor((new Date().getTime() - this.lastRunTime) / 1000);
            this.setState({
                showEndPrompt: true,
                stopRunSeconds: (18 - timeLength)
                // stopRunSeconds: (5 - timeLength)
            });
            if (timeLength >= 18) {
            // if (timeLength >= 5) {
                this.playBtnClick();
            }
        }
        // 判断当前运动时长
        // console.log('当前运动时长',Math.floor(this.lastRunTime - this.lastNum) / 1000);
        // this.postDeviceData(dataList);

    }

    /**
     * 上传数据
     */
    postDeviceData = (dataObj) => {
        let time = new Date().getTime();
        if (time - this.lastTime < 1000) {
            return;
        }
        this.lastTime = time;
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

    // 获取动作标准列表
    getSportStandardList() {
        let url = JFAPI.sportStandard_list;
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
                        let arr = [];
                        for (let i = 0; i < res.data.length; i++) {
                            let obj = res.data[i];
                            arr.push(obj.name);
                        }
                        this.setState({
                            sportStandardNameList: arr,
                            sportStandardList: res.data
                        });
                        if (res.data.length > 0) {
                            this.refs.dropdown.select(0);
                        }
                    }
                }
            })
            .catch((err) => {
                console.log('上传数据失败', err);
            })
    }

    sportTimeStart = () => {
        let url = JFAPI.sportTime_start;
        let formData = new FormData();
        formData.append('userId', this.state.userInfo.id);
        formData.append('type', this.state.sportStandardList[this.state.selectStandardIndex]['type']);
        console.log('获取数据', url, formData);
        let opts = {
            body: formData,
            method: "POST",
        }
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log('开始练拳结果', res);
                if (res.code == 0) {
                    if (res.data) {
                        this.setState({
                            hisCraftId: res.data.id
                        });
                    }
                }
            })
            .catch((err) => {
                console.log('上传数据失败', err);
            })
    }
    sortArr = (arr, str) => {
        var _arr = [],
            _t = [],
            // 临时的变量
            _tmp;

        // 按照特定的参数将数组排序将具有相同值得排在一起
        arr = arr.sort(function(a, b) {
            var s = a[str],
                t = b[str];

            return s < t ? -1 : 1;
        });

        if ( arr.length ){
            _tmp = arr[0][str];
        }
        // console.log( arr );
        // 将相同类别的对象添加到统一个数组
        for (var i in arr) {
            if ( arr[i][str] === _tmp ){
                _t.push( arr[i] );
            } else {
                _tmp = arr[i][str];
                _arr.push( _t );
                _t = [arr[i]];
            }
        }
        // 将最后的内容推出新数组
        _arr.push( _t );
        return _arr;
    }
    sportTimeEnd = () => {
        let stydata = {};
        // if(this.setmoveTimes >= 5){
        if(this.setmoveTimes >= 18){
            let recordsIndex = this.lastRecords.length - 1;
            let recornum = this.lastRecords[recordsIndex][18];
            // 上次结束时的圈数
            let totalNum = this.lastRecords[0][18];
            // 本次运动的圈数
            let num ='';
            //运动的偏移量
            let cycnum = 0;
            var array =this.sortArr(this.lastRecords,18);
            for(var i = 0; i < array.length; i++){
                cycnum = cycnum + array[i][0][19]
            }
            if(recornum == 0){
                num = recornum;
            }else if(recornum > 0){
                num = (recornum - totalNum);
            }
            // 运动时长
            let timnunmLen = Math.round(this.state.runTimeSeconds % 60);
            stydata = {
                cycleNum:num,
                cycleErr:cycnum,
                timeLen:this.state.runTimeSeconds
            };
        }else if(this.setmoveTimes < 18){
            stydata = {
                cycleNum:0,
                cycleErr:0,
                timeLen:this.state.runTimeSeconds
            };
        }
        let url = JFAPI.sportTime_end;
        let formData = new FormData();
        formData.append('userId', this.state.userInfo.id);
        formData.append('id', this.state.hisCraftId);
        // 总圈数
        formData.append('cycleNum',stydata.cycleNum);
        // 总偏移量
        formData.append('cycleErr',stydata.cycleErr);
        // 运动时长
        formData.append('timeLen',stydata.timeLen);
        let opts = {
            body: formData,
            method: "POST",
        }
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                this.props.navigation.state.params.refresh()
                console.log('结束练拳结果', res);
                this.lastRecords = []
                if (res.code == 0) {
                    if (res.data) {

                    }
                }
            })
            .catch((err) => {
                this.props.navigation.state.params.refresh();
                this.lastRecords = [];
                this.setState({
                    compleNumer:0
                })
                console.log('上传数据失败', err);
            })
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
                console.log('没有连接外围设备')
            }
            console.log("已连接设备", results);
            var deviceMap = this.state.deviceMap;
            for (var i = 0; i < results.length; i++) {
                var peripheral = results[i];
                peripheral.connected = true;
                if (peripheral.name != null && peripheral.name.indexOf("TJ") == 0) {
                    this.setState({
                        selectDevice: peripheral
                    });
                    this.props.navigation.setParams({deviceName: this.state.selectDevice.name});
                    deviceMap.set(peripheral.id, peripheral);
                    this.setState({deviceMap});
                }
            }
        });
    }

    // 发现设备
    handleDiscoverPeripheral(peripheral) {
        // console.log("deviceMap", this.state);
        var deviceMap = this.state.deviceMap;


        if (!deviceMap.has(peripheral.id)) {
            // console.log('发现设备', peripheral);
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
        this.handlerDiscover.remove();
        this.handlerStop.remove();
        this.handlerDisconnect.remove();
        this.handlerUpdate.remove();
        this.timer && clearInterval(this.timer);
        this.timer2 && clearInterval(this.timer2);
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
}
const styles = StyleSheet.create({
    backgroundStyle: {
        flex: 1,
        backgroundColor: '#222222',
        alignItems: 'center'
    },
    modalbackGroundStyle: {
        width: '80%',
        height: 50,
        marginTop: 50,
        justifyContent: 'center',
        backgroundColor: '#eee'
    },
    modalDropdownStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 50,
        marginTop: 50,
        backgroundColor: '#eee',

    },

    menuShowTextStyle: {
        textAlign: 'center',
        lineHeight: 50,
        flex: 1,
        fontSize: 20,
        width: 300,
    },

    menuRowStyle: {
        height: 30,
        justifyContent: 'center',

    },

    menuRowTextStyle: {
        fontSize: 16,
        color: '#888',
        marginLeft: 8
    },

    menuRowTextSelectStyle: {
        fontSize: 16,
        color: '#e16531',
        marginLeft: 8
    },

    dropdownStyle: {
        width: 300,
    },

    timeBackgroundStyle: {
        marginTop: 100,
        alignItems: 'center'
    },
    timeTextStyle: {
        color: '#eee',
        fontSize: 50,
    },
    timeInfoTextStyle: {
        color: '#c1c1c1',
        fontSize: 20,
    },

    playBtnStyle: {
        backgroundColor: "#e16531",
        marginTop: 80,
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    playImgStyle: {
        width: 40,
        height: 40,
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
    promptTextStyle: {
        marginTop: 30,
        color: '#c1c1c1',
        fontSize: 20,
    },
    promptSecondsTextStyle: {
        marginLeft: 10,
        marginRight: 10,
        color: 'rgba(255,81,81,1)',
        fontSize: 30,
    },
    progress: {
        margin: 10,
    },
    circles: {
        width: 120,
        height: 120,
        alignItems: 'center',
        marginTop: 15
    },
    textqs: {
        fontSize: 20,
        color: "#FFFFFF"
    },
    textqs2: {
        fontSize: 18,
        color: "#FFFFFF",
        marginTop: 10
    }
});
