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

let {width, height} = Dimensions.get('window');
let codeTime = 60;
export default class TboxerDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerTitle: '拳师详情',
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
                        <View style={styles.containerAppTaiMoreChild1}>
                            <View style={styles.containerAppTaiMoreChild11}>
                                <Image style={{width:"100%",height:90}} source={require('./Images/bj.png')} />
                            </View>
                            <View style={styles.containerAppTaiMoreChild12}>
                                <View>
                                    <Text style={styles.containerAppTaiMoreChild12Text1}>悠然太极球一式</Text>
                                    <Text style={styles.containerAppTaiMoreChild12Text2}>主讲：赵师傅</Text>
                                </View>
                                <View style={{flexDirection: 'row',justifyContent: "space-between",alignItems:"center"}}>
                                    <Text style={styles.containerAppTaiMoreChild12Text3}>310学员</Text>
                                    <Text style={{color:"#C22525",fontSize:14}}>￥<Text style={{color:"#C22525",fontSize:23,fontWeight: "bold"}}>416</Text></Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.containerAppTaiMoreChild1}>
                            <View style={styles.containerAppTaiMoreChild11}>
                                <Image style={{width:"100%",height:90}} source={require('./Images/bj.png')} />
                            </View>
                            <View style={styles.containerAppTaiMoreChild12}>
                                <View>
                                    <Text style={styles.containerAppTaiMoreChild12Text1}>悠然太极球一式</Text>
                                    <Text style={styles.containerAppTaiMoreChild12Text2}>主讲：赵师傅</Text>
                                </View>
                                <View style={{flexDirection: 'row',justifyContent: "space-between",alignItems:"center"}}>
                                    <Text style={styles.containerAppTaiMoreChild12Text3}>310学员</Text>
                                    <Text style={{color:"#C22525",fontSize:14}}>￥<Text style={{color:"#C22525",fontSize:23,fontWeight: "bold"}}>416</Text></Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    componentDidMount() {
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
        justifyContent: "space-between"
    },
    containerAppTaiMoreChild12Text1:{
        color:"#282828",
        fontSize:14
    },
    containerAppTaiMoreChild12Text2:{
        color:"#B98A69",
        fontSize:13,
        paddingTop: 10
    },
    containerAppTaiMoreChild12Text3:{
        color:"#B2B2B2",
        fontSize:13
    }
});
