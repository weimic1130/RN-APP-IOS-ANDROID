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
    KeyboardAvoidingView,
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

let {width, height} = Dimensions.get('window');
export default class ClManageDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeInex: 1
        }
    }

    static navigationOptions = {
        headerTitle: '详情',
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
            <View style={styles.containerAppCourseSprice}>
                <ScrollView style={this.state.activeInex == 3 ? {flex: 1, width: "100%", marginBottom: 55} : {flex: 1, width: "100%"}}>
                    {/*点赞分享区域*/}
                    <View style={{backgroundColor:"#FFFFFF",paddingBottom:7}}>
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
                    </View>
                    <View style={styles.allconCour}>
                        <View style={styles.AppCDetaChild9}>
                            <View style={styles.AppCDetaChild6}>
                                <View style={styles.AppCDetaChild61}>
                                    <Text style={styles.kejietext}>课节</Text>
                                </View>
                                <View style={styles.AppCDetaChild62}>
                                    <Text style={styles.shuliaText}>100</Text>
                                </View>
                            </View>
                            <View style={styles.AppCDetaChild7}>
                                <View style={styles.AppCDetaChild61}>
                                    <Text style={styles.kejietext}>课时</Text>
                                </View>
                                <View style={styles.AppCDetaChild62}>
                                    <Text style={styles.shuliaText}>4个月</Text>
                                </View>
                            </View>
                            <View style={styles.AppCDetaChild7}>
                                <View style={styles.AppCDetaChild61}>
                                    <Text style={styles.kejietext}>悠然太极球</Text>
                                </View>
                                <View style={styles.AppCDetaChild62}>
                                    <Text style={styles.shuliaText}>八弓步</Text>
                                </View>
                            </View>
                            <View style={styles.AppCDetaChild7}>
                                <View style={styles.AppCDetaChild61}>
                                    <Text style={styles.kejietext}>逍遥绳</Text>
                                </View>
                                <View style={styles.AppCDetaChild62}>
                                    <Text style={styles.shuliaText}>拉:</Text>
                                    <Text style={styles.shuliaText}>桩步双手</Text>
                                    <Text style={styles.shuliaText}>拗步双手</Text>
                                </View>
                            </View>
                            <View style={styles.AppCDetaChild7}>
                                <View style={styles.AppCDetaChild61}>
                                    <Text style={styles.kejietext}>中正棍</Text>
                                </View>
                                <View style={styles.AppCDetaChild62}>
                                    <Text style={styles.shuliaText}>- - -</Text>
                                </View>
                            </View>
                            <View style={styles.AppCDetaChild7}>
                                <View style={styles.AppCDetaChild61}>
                                    <Text style={styles.kejietext}>推手</Text>
                                </View>
                                <View style={styles.AppCDetaChild62}>
                                    <Text style={styles.shuliaText}>左右</Text>
                                    <Text style={styles.shuliaText}>定步</Text>
                                </View>
                            </View>
                            <View style={styles.AppCDetaChild7}>
                                <View style={styles.AppCDetaChild61}>
                                    <Text style={styles.kejietext}>功，拳，械</Text>
                                </View>
                                <View style={styles.AppCDetaChild62}>
                                    <Text style={styles.shuliaText}>自然</Text>
                                    <Text style={styles.shuliaText}>活步</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/*提交按钮*/}
                    <TouchableWithoutFeedback>
                        <View style={styles.AdbanniuQ}>
                            <Text style={styles.AdbanniuText}>确认上课</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </View>
        );
    }


    componentDidMount() {
    }

}

const styles = StyleSheet.create({
    containerAppCourseSprice: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F7F7F7"
    },
    AppCDetaChild9:{
        width: width * 0.9,
        paddingTop: 15,
        paddingBottom:15
    },
    AppCDetaChild: {
        width: width * 0.9,
        paddingTop: 15
    },
    AppCDetaChild3:{
        width: width * 0.9,
        paddingTop: 15
    },
    AppCDetaChildLine2:{
        width: width * 0.9,
        height:1,
        backgroundColor:"#EAEAEA",
        marginTop:5
    },
    AppCDetaChildLine:{
        width: width * 0.9,
        height:1,
        backgroundColor:"#EAEAEA",
        marginTop:15
    },
    AppCDetaChildLine1:{
        width: width,
        height:5,
        backgroundColor:"#EAEAEA",
        marginTop:15
    },
    AppCDetaChild2:{
        width: width * 0.9,
        paddingTop: 15,
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    childText1: {
        color: "#282828",
        fontSize: 16,
        fontWeight: "bold"
    },
    allconCour: {
        width: width,
        backgroundColor: "#FFFFFF",
        alignItems: "center"
    },
    AppCDetaChild1: {
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 5
    },
    AppCDetaChild1Text: {
        color: "#B2B2B2",
        fontSize: 14
    },
    AppCDetaChild1Text1: {
        color: "#B06F42",
        fontSize: 14
    },
    AppCDetaChild12:{
        width:30,
        height:30,
        backgroundColor:"#D2D2D2",
        borderRadius:20
    },
    AppCDetaChild21:{
        flexDirection:"row",
        alignItems:"center"
    },
    TextXy:{
        color:"#B2B2B2",
        fontSize:13,
        paddingRight:5
    },
    AppCDetaChild1Text2:{
        color:"#B2B2B2",
        fontSize:14
    },
    AppCDetaChild1Text3:{
        color:"#767676",
        fontSize:14,
        lineHeight:20,
        paddingTop:10,
        fontWeight:"bold",
        paddingBottom: 10
    },
    AppCDetaChild4:{
        flexDirection:"row",
        justifyContent: "space-between",
        paddingBottom:10
    },
    AppCDetaChild41:{
        flexDirection:"row",
        alignItems:"center"
    },
    AppCDetaChild41Text:{
        color:"#B2B2B2",
        fontSize:14,
        paddingRight: 10
    },
    AppCDetaChild42Text:{
        color:"#282828",
        fontSize:15,
        fontWeight:"bold"
    },
    AppCDetaChild7:{
        flexDirection:"row",
    },
    AppCDetaChild6:{
        flexDirection:"row",
        paddingTop:5,
    },
    AppCDetaChild61:{
        alignItems:"center",
        justifyContent:"center",
        width:"30%",
        borderTopWidth:1,
        borderTopColor:"#D0C0B4",
        borderLeftColor:"#D0C0B4",
        borderLeftWidth:1,
        borderBottomColor:"#D0C0B4",
        borderBottomWidth:1,
        paddingTop:10,
        paddingBottom:10
    },
    AppCDetaChild62:{
        alignItems:"flex-start",
        width:"70%",
        borderTopWidth:1,
        borderTopColor:"#D0C0B4",
        borderLeftWidth:1,
        borderLeftColor:"#D0C0B4",
        borderBottomColor:"#D0C0B4",
        borderBottomWidth:1,
        borderRightColor:"#D0C0B4",
        borderRightWidth:1,
        paddingTop:10,
        paddingBottom:10
    },
    kejietext:{
        color:"#8A6246",
        fontSize:14
    },
    shuliaText:{
        color:"#282828",
        fontSize:14,
        paddingLeft:10
    },
    AdbanniuQ: {
        marginLeft: width * 0.1,
        width: width * 0.8,
        backgroundColor: "#8A6246",
        marginTop: 15,
        marginBottom:15,
        borderColor: "#8A6246",
        borderWidth: 1,
        borderRadius: 3,
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15
    },
    AdbanniuText: {
        color: "#FFFFFF",
        fontSize: 16
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
    shengyukejie:{
        position:"absolute",
        right:8,
        top:10,
        backgroundColor:"#F8F3F0",
        borderWidth:1,
        borderColor:"#AD917E",
        borderRadius:6,
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
