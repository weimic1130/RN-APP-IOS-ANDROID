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
export default class Clmanagement extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerTitle: '课节管理',
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
                            <View>
                                <Image style={{width:45,height:45,borderRadius:22}} source={require('./Images/bj.png')} />
                            </View>
                            <View style={styles.containerAppTaiMoreChild12}>
                                <View>
                                    <Text style={styles.containerAppTaiMoreChild12Text1}>来自非洲的战神</Text>
                                    <Text style={styles.containerAppTaiMoreChild12Text2}>弘毅一级</Text>
                                    <View style={styles.shengyukejie}>
                                        <Text style={styles.Text3Cl}>剩余课节：26</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.containerAppTaiMoreChild1N}>
                            <View style={styles.containerAppTaiMoreChild11}>
                                <Image style={{width:45,height:45,borderRadius:22}} source={require('./Images/bj.png')} />
                            </View>
                            <View style={styles.containerAppTaiMoreChild12}>
                                <View>
                                    <Text style={styles.containerAppTaiMoreChild12Text1}>来自非洲的战神</Text>
                                    <Text style={styles.containerAppTaiMoreChild12Text2}>弘毅一级</Text>
                                    <View style={styles.shengyukejie}>
                                        <Text style={styles.Text3Cl}>剩余课节：26</Text>
                                    </View>
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
        width:"94%",
        marginLeft:'3%',
        flexDirection:"row",
        paddingTop:10,
        paddingBottom:10
    },
    containerAppTaiMoreChild1N:{
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
    },
    shengyukejie:{
        position:"absolute",
        right:8,
        top:10,
        backgroundColor:"#F8F3F0",
        borderWidth:1,
        borderColor:"#AD917E",
        borderRadius:8,
        width:100,
        alignItems:"center",
        paddingTop:5,
        paddingBottom: 5
    },
    Text3Cl:{
        color:"#8A6246",
        fontSize:14
    }
});
