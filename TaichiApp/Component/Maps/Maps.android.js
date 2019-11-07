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
export default class MapsAndroid extends React.Component {
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
        return (
            <View style={styles.containerAppSet}>
                   <WebView
                        ref="webView"
                        onMessage={this.onMessage}
                        style={{width:width,height:height}}
                        // source={{uri:"http://bybotdemo.xmbysx.com/MapsA.html"}}
                        source={{uri:"https://www.tantanscience.com/ditu/MapsA.html"}}
                        onMessage={(event) => this.onMessage(event)}
                    />
            </View>
        );
    }
    componentDidMount() {

    }
    onMessage = (event) => {
        this.setState({
            addressdata:event.nativeEvent.data
        })
        this.props.navigation.goBack();
        console.log(event.nativeEvent.data);
    }
    componentWillUnmount(){
        DeviceEventEmitter.emit('getAddress',{address:this.state.addressdata})
        console.log('发送通知');
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
