/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
// icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator, StackActions, NavigationActions, createAppContainer } from "react-navigation";
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
import { JFAPI } from './API/API';
let { width, height } = Dimensions.get('window');
import HTMLView from 'react-native-htmlview';
export default class AboutUsAndroid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeInex: 1,
            dataDetails: ''
        }
    }

    static navigationOptions = {
        headerTitle: '关于我们',
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
            <ScrollView style={styles.containerAppAbout}>
                <View style={styles.AboutChild}>
                    <Image source={require('./Images/1.png')} />
                    <Text style={styles.titleAb}>{this.state.dataDetails ? this.state.dataDetails.title : '悠然太极'}</Text>
                    {/*<Text style={styles.titleAb1}>版本号v1.0</Text>*/}
                </View>
                <View style={styles.AboutChild1}>
                    <View style={styles.AboutChild12}>
                        <Text style={styles.AboutChild12Text}>公司简介</Text>
                        {/* <Image source={require('./Images/2.png')} /> */}
                        <Text style={{ paddingTop: 5, paddingBottom: 5 }}>{this.state.dataDetails ? this.state.dataDetails.companyProfile : ''}</Text>
                    </View>
                    <View style={styles.AboutChild12}>
                        <Text style={styles.AboutChild12Text}>荣誉资质</Text>
                        {/* <Image source={require('./Images/2.png')} /> */}
                        <HTMLView style={{ paddingTop: 5 }} value={this.state.dataDetails ? this.state.dataDetails.honor : ''} />
                        {/*<Text>{this.state.dataDetails ? this.state.dataDetails.honor : ''}</Text>*/}
                    </View>
                    <View style={styles.AboutChild12N}>
                        <Text style={styles.AboutChild12Text}>联系方式</Text>
                        <Image source={require('./Images/2.png')} />
                    </View>
                    <View style={{ backgroundColor: "#F3F3F3", padding: 40 }}>
                        <Text style={{ textAlign: 'center', color: '#bbb' }}>
                            Copyright © 2019-2029
                        </Text>
                        <Text style={{ textAlign: 'center', color: '#bbb' }}>
                            悠然生活（厦门）文化传播有限公司版权所有
                        </Text>
                    </View>
                </View>
            </ScrollView >
        );
    }
    getMyabout = () => {
        let url = JFAPI.getWe;
        let opts = {
            method: "GET"
        };
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                if (res.code == 0) {
                    if (res.data) {
                        this.setState({
                            dataDetails: res.data
                        })
                    } else {
                        this.setState({
                            dataDetails: ''
                        })
                    }
                }
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    dataDetails: ''
                })
            })
    }

    componentDidMount() {
        this.getMyabout();
    }

}

const styles = StyleSheet.create({
    containerAppAbout: {
        flex: 1,
        // alignItems: "center",
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
        alignItems: 'center',
        marginTop: 35,
        justifyContent: "center"
    },
    AboutChild1: {
        width: width,
        backgroundColor: "#FFFFFF",
        marginTop: 30
    },
    AboutChild12: {
        width: "94%",
        // flexDirection:"row",
        // justifyContent:"space-between",
        marginLeft: "3%",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        // alignItems: "center",
        // height:50
    },
    AboutChild12N: {
        width: "94%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: "3%",
        alignItems: "center",
        height: 50
    },
    AboutChild12Text: {
        color: "#282828",
        fontSize: 16,
        paddingTop: 5
    }
});
