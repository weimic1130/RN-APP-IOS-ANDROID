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
    Alert,
    Platform,
    WebView,
    DeviceEventEmitter,
    Image,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";

let {width, height} = Dimensions.get('window');
export default class MapsIos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addressdata:''
        }
    }

    static navigationOptions = {
        headerTitle: '常驻地址',
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        },
    };

    render() {
        const patchPostMessageFunction = function() {
            var originalPostMessage = window.postMessage;

            var patchedPostMessage = function(message, targetOrigin, transfer) {
                originalPostMessage(message, targetOrigin, transfer);
            };

            patchedPostMessage.toString = function() {
                return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
            };
            window.postMessage = patchedPostMessage;
            window.addEventListener('message', function(event) {
                // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
                var loc = event.data;
                if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
                    let data = {
                        "longitude":loc.latlng.lng,
                        "latitude":loc.latlng.lat,
                        "address":loc.poiaddress
                    };
                    console.log('当前经度纬度和详细的地址明细', loc);
                    window.postMessage('n'+loc.latlng.lng+'a'+loc.latlng.lat+'s');
                }
            }, false);
        };
        const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';
        return (
            <View style={styles.containerAppSet}>
                <WebView
                    ref="webView"
                    injectedJavaScript={patchPostMessageJsCode}
                    style={{width:width,height:height}}
                    // source={require('./text.html')}
                    // source={{html:demoHtml}}
                    source={{uri:"http://bybotdemo.xmbysx.com/Maps.html"}}
                     // source={{uri:"https://apis.map.qq.com/tools/locpicker?search=1&type=0&backurl=http://bybotdemo.xmbysx.com/ceshidt.html&key=QC4BZ-5CLKF-PYTJZ-NXZMV-Q56KF-AGBRD&referer=TaichiApp"}}
                    onMessage={(event) => this.getXiaoxi(event)}
                />
            </View>
        );
    }
    componentDidMount() {

    }
    getXiaoxi = (event) => {
        // Alert.alert('text.html获取到的地理位置信息',event.nativeEvent);
        // console.log('text.html获取到的地理位置',event);
        // Alert.alert('ifrme传值过来',event.nativeEvent.data);
        this.setState({
            addressdata:event.nativeEvent.data
        })
        this.props.navigation.goBack();
    }
    componentWillUnmount(){
        DeviceEventEmitter.emit('getAddress',{address:this.state.addressdata})
        // console.log('发送通知');
    }
}

const styles = StyleSheet.create({
    containerAppSet: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F3F3F3"
    },
    titleAb: {
        color: "#282828",
        fontSize: 15,
        paddingTop: 10,
        paddingBottom: 5,
        fontWeight: "bold"
    },
    titleAb1: {
        color: "#B2B2B2",
        fontSize: 13
    },
    AboutChild: {
        marginTop: 35
    },
    AboutChild1: {
        width: width,
        backgroundColor: "#FFFFFF"
    },
    AboutChild111: {
        width: "94%",
        marginLeft:"3%",
        backgroundColor: "#8A6246",
        marginTop: 30,
        alignItems: "center",
        height: 50,
        justifyContent: "center",
        marginBottom:20
    },
    AboutChild222: {
        width: "45%",
        backgroundColor: "#F5F0EC",
        marginTop: 30,
        borderWidth: 1,
        borderColor: "#8A6246",
        alignItems: "center",
        height: 50,
        justifyContent: "center"
    },
    AboutChild12: {
        width: "94%",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginLeft: "3%",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        alignItems: "center",
        paddingTop:20,
        paddingBottom:10
    },
    AboutChild12N: {
        width: "94%",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginLeft: "3%",
        alignItems: "center",
        height: 60
    },
    AboutChild12Text: {
        color: "#282828",
        fontSize: 16
    },
    tuichuSty: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "bold"
    },
    tuichuSty2: {
        color: "#8A6246",
        fontSize: 17
    },
    PickerSty: {
        width: Dimensions.get('window').width,
        position: "absolute",
        bottom: 0,
        backgroundColor: "#ffffff",
        borderColor: "#dddddd",
        borderTopWidth: 1,
        zIndex: 12
    },
    PickerStyItem: {
        width: Dimensions.get('window').width
    },
    mask: {
        justifyContent: "center",
        backgroundColor: "#383838",
        opacity: 0.7,
        position: "absolute",
        width: width,
        height: height,
        left: 0,
        top: 0,
        zIndex: 11,
    },
    PickerChlden: {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 0,
        paddingTop: 10,
    },
    SdsuInput:{
        width:"85%",
        paddingLeft: 10,
        fontSize:16
    }
});
