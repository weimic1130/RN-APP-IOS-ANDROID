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
    NativeModules
} from "react-native";
import Swiper from 'react-native-swiper';
// icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
export default class PaymentAlso extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: '悠然太极拳',
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
            <View style={styles.containerAppPayAlso}>
                <View style={{paddingTop: 60,width:"100%",alignItems:"center",backgroundColor:"#FFFFFF"}}>
                    <View style={{width:width * 0.9,justifyContent:"center",alignItems:"center"}}>
                        <Image source={require('./Images/1.png')} />
                        <Text style={{paddingTop:20}}>我们正在努力发货，请耐心等待!</Text>
                    </View>
                    <View style={{width:width * 0.9,paddingBottom:25,borderBottomColor:"#DDDDDD",borderBottomWidth:1,flexDirection:"row",justifyContent:"space-around",marginTop: 25}}>
                        <TouchableWithoutFeedback onPress={() => this.gotoPage('MypageN')}>
                            <View style={{justifyContent:"center",alignItems:"center",borderRadius:10,width:110,height:35,borderWidth:1,borderColor:"#BBBBBB"}}>
                                <Text>我的订单</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.gotoPage('HomeN')}>
                            <View style={{justifyContent:"center",alignItems:"center",borderRadius:10,width:110,height:35,borderWidth:1,borderColor:"#B06F42",backgroundColor:"#B06F42"}}>
                                <Text style={{color:"#FFFFFF"}}>返回首页</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{width:width * 0.9,paddingBottom:25,justifyContent:"center",marginTop: 10}}>
                        <Text>温馨提示</Text>
                        <Text>我们不会以订单问题、付款异常、系统升级为理由，通过QQ、短信发送给您退款链接。请提高警惕，谨防诈骗!</Text>
                    </View>
                </View>
            </View>
        );
    }

    gotoPage = (page) => {
        let self = this;
        self.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: page})]
            })
        )
    }
    // 请求页面接口
    componentDidMount(): void {
    }

    componentWillMount() {
    }
}
const styles = StyleSheet.create({

    containerAppPayAlso: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        alignItems: 'center'
    },
    pyquyuscon: {
        flexDirection: "row",
        width: width * 0.9,
        marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15
    },
    pyquyuscon21: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    pyquyuscon1: {
        width: width * 0.2,
    },
    pyquyuscon2: {
        width: width * 0.72
    },
    pyquyuscon212: {
        flexDirection: "row",
        paddingRight: 10
    },
    yhniche: {
        color: "#757575",
        fontSize: 14
    },
    yhnitime: {
        color: "#B2B2B2",
        fontSize: 11,
        paddingTop: 5
    },
    diansas: {
        color: "#B2B2B2",
        fontSize: 13,
        paddingRight: 8
    },
    descconText: {
        color: "#282828",
        fontSize: 14,
        fontWeight: "bold"
    },
    lineStyHei:{
        width:width,
        height:8,
        backgroundColor:"#F3F3F3"
    },
    tieText1:{
        backgroundColor:"#B98A69",
        marginLeft:5,
        paddingTop:4,
        paddingBottom:4,
        paddingLeft:10,
        paddingRight:10,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:10
    },
    tieText2:{
        color:"#FFFFFF",
        fontSize:10
    }
});
