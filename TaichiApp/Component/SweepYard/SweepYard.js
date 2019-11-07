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
    Easing,
    InteractionManager,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Button,
    Platform,
    Image,
    ImageBackground,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
    Picker,
    Modal, Animated, Linking, Alert
} from "react-native";
import Swiper from 'react-native-swiper';
import {RNCamera} from "react-native-camera";

// icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Permissions from 'react-native-permissions'

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import {JFAPI} from './API/API';

let self = this;
export default class SweepYard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qrcodeState: true,
            show: true,
            animate: new Animated.Value(0), // 二维坐标{x:0,y:0}
        }
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: '二维码/条码',
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        headerLeft:(
            <TouchableWithoutFeedback onPress={() => navigation.state.params.goBackHis(self)}>
                <Text style={styles.goBackText}>返回</Text>
            </TouchableWithoutFeedback>
        )
    })

    render() {
        return (
            <View style={styles.containerSweep}>
                {
                    this.state.qrcodeState ? <View style={styles.mask}></View> : null
                }
                {
                    this.state.qrcodeState ? <View style={styles.container}>
                        <RNCamera
                            onBarCodeRead={this.barcodeReceived.bind(this)}
                            onCameraReady={() => this.getPermissions()}
                            style={styles.camera}
                        >
                            <View style={styles.rectangleContainer}>
                                <View style={styles.rectangle}/>
                                <Animated.View style={[
                                    styles.border,
                                    {transform: [{translateY: this.state.animate}]}]}/>
                                <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
                            </View>
                        </RNCamera>
                    </View> : null
                }
            </View>
        );
    }
    goBackprevious = () =>{
        this.props.navigation.state.params.callBackData();
        this.props.navigation.goBack();
    }
    // 请求页面接口
    componentDidMount() {
        this.startAnimation();
        // 注册点击顶部导航点击事件
        this.props.navigation.setParams({
            goBackHis:this.goBackprevious
        })
    }

    startAnimation = () => {
        this.state.animate.setValue(-200);
        Animated.timing(
            this.state.animate,
            {
                toValue: 0,
                duration: 2000,
                easing: Easing.linear
            }
        ).start(() => this.startAnimation());
    };

    componentWillMount() {
        this.state.show = false;
    }

    getPermissions = (e) => {
        console.log(e);
    }

    barcodeReceived(e) {
        console.log(e);
    }
}
const styles = StyleSheet.create({
    containerSweep: {
        flex: 1,
        backgroundColor: '#F3F3F3',
        alignItems: 'center'
    },
    mask: {
        justifyContent: "center",
        backgroundColor: "#383838",
        opacity: 0.7,
        position: "absolute",
        width: width,
        height: height,
        zIndex: 10,
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
        color: "#B2B2B2",
        fontSize: 13
    },
    tianjiasbText2: {
        fontSize: 17,
        color: "#FF7200",
        paddingTop: 15
    },
    camera: {
        flex: 1,
        width:width,
        height:height
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
        borderWidth: 2,
        borderColor: '#FFFFFF',
        backgroundColor: 'transparent'
    },
    rectangleText: {
        flex: 0,
        color: '#FFFFFF',
        marginTop: 10
    },
    border: {
        flex: 0,
        width: 200,
        height: 2,
        backgroundColor: '#FFFFFF'
    },
    goBackText:{
        fontSize:16,
        color:"#FFFFFF",
        paddingLeft:8,
        fontWeight: "bold"
    }
});
