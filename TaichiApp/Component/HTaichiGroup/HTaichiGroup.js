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
export default class HTaichiGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerTitle: 'xxx的太极团',
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
                    <View style={{backgroundColor:"#FFFFFF",marginTop:7}}>
                        <View style={styles.containerAppTaiMoreChild1}>
                            <View>
                                <Image style={{width:45,height:45,borderRadius:22}} source={require('./Images/bj.png')} />
                            </View>
                            <View style={styles.containerAppTaiMoreChild12}>
                                <View>
                                    <Text style={styles.containerAppTaiMoreChild12Text1}>这里是群名称<Text style={{color:"#B2B2B2",fontSize:14}}>（20人）</Text></Text>
                                    <Text style={styles.containerAppTaiMoreChild12Text2}>来自非洲的战神：我就不信打不过你</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.containerAppTaiMoreChild1}>
                            <View style={styles.containerAppTaiMoreChild11}>
                                <Image style={{width:45,height:45,borderRadius:22}} source={require('./Images/bj.png')} />
                            </View>
                            <View style={styles.containerAppTaiMoreChild12}>
                                <View>
                                    <Text style={styles.containerAppTaiMoreChild12Text1}>这里是群名称<Text style={{color:"#B2B2B2",fontSize:14}}>（20人）</Text></Text>
                                    <Text style={styles.containerAppTaiMoreChild12Text2}>来自非洲的战神：我就不信打不过你</Text>
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
        paddingTop:17,
        paddingBottom:17
    },
    containerAppTaiMoreChild12:{
        width:"87%",
        paddingLeft:10,
        justifyContent: "space-around"
    },
    containerAppTaiMoreChild12Text1:{
        color:"#B06F42",
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
    }
});
