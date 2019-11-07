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
import {Platform, TouchableHighlight, DatePickerIOS, Button, Image, ImageBackground, Dimensions, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, ScrollView, Animated} from "react-native";

let {width, height} = Dimensions.get('window');
let codeTime = 60;
export default class NotificationMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

    static navigationOptions = {
        headerTitle: '消息',
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
            <View style={styles.containerAppNo}>
                <ScrollView style={{flex: 1}}>
                    <View style={styles.containerAppNoC1}>
                        <View style={styles.containerAppNoC2}>
                            <View style={styles.allPf}>
                                <Text style={styles.allPf1}>
                                    这个是系统消息的标题
                                </Text>
                                <Text style={styles.allPf2}>
                                    2019年09月12日 16:30
                                </Text>
                            </View>
                            <FontAwesome style={{paddingRight: 5}} name={'angle-right'} size={23} color="#B2B2B2"/>
                        </View>
                        <View style={styles.containerAppNoC2}>
                            <View style={styles.allPf}>
                                <Text style={styles.allPf1}>
                                    这个是系统消息的标题
                                </Text>
                                <Text style={styles.allPf2}>
                                    2019年09月12日 16:30
                                </Text>
                            </View>
                            <FontAwesome style={{paddingRight: 5}} name={'angle-right'} size={23} color="#B2B2B2"/>
                        </View>
                        <View style={styles.containerAppNoC2}>
                            <View style={styles.allPf}>
                                <Text style={styles.allPf1}>
                                    这个是系统消息的标题
                                </Text>
                                <Text style={styles.allPf2}>
                                    2019年09月12日 16:30
                                </Text>
                            </View>
                            <FontAwesome style={{paddingRight: 5}} name={'angle-right'} size={23} color="#B2B2B2"/>
                        </View>
                        <View style={styles.containerAppNoC2}>
                            <View style={styles.allPf}>
                                <Text style={styles.allPf1}>
                                    这个是系统消息的标题
                                </Text>
                                <Text style={styles.allPf2}>
                                    2019年09月12日 16:30
                                </Text>
                            </View>
                            <FontAwesome style={{paddingRight: 5}} name={'angle-right'} size={23} color="#B2B2B2"/>
                        </View>
                        <View style={styles.containerAppNoC2}>
                            <View style={styles.allPf}>
                                <Text style={styles.allPf1}>
                                    这个是系统消息的标题
                                </Text>
                                <Text style={styles.allPf2}>
                                    2019年09月12日 16:30
                                </Text>
                            </View>
                            <FontAwesome style={{paddingRight: 5}} name={'angle-right'} size={23} color="#B2B2B2"/>
                        </View>
                        <View style={styles.containerAppNoC2}>
                            <View style={styles.allPf}>
                                <Text style={styles.allPf1}>
                                    这个是系统消息的标题
                                </Text>
                                <Text style={styles.allPf2}>
                                    2019年09月12日 16:30
                                </Text>
                            </View>
                            <FontAwesome style={{paddingRight: 5}} name={'angle-right'} size={23} color="#B2B2B2"/>
                        </View>
                        <View style={styles.containerAppNoC2}>
                            <View style={styles.allPf}>
                                <Text style={styles.allPf1}>
                                    这个是系统消息的标题
                                </Text>
                                <Text style={styles.allPf2}>
                                    2019年09月12日 16:30
                                </Text>
                            </View>
                            <FontAwesome style={{paddingRight: 5}} name={'angle-right'} size={23} color="#B2B2B2"/>
                        </View>
                        <View style={styles.containerAppNoC2}>
                            <View style={styles.allPf}>
                                <Text style={styles.allPf1}>
                                    这个是系统消息的标题
                                </Text>
                                <Text style={styles.allPf2}>
                                    2019年09月12日 16:30
                                </Text>
                            </View>
                            <FontAwesome style={{paddingRight: 5}} name={'angle-right'} size={23} color="#B2B2B2"/>
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
    containerAppNo: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F7F7F7"
    },
    containerAppNoC1: {
        width: width,
        backgroundColor: "#FFFFFF",
        paddingBottom: 10
    },
    containerAppNoC2: {
        width: width * 0.94,
        borderBottomWidth: 0.5,
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomColor: "#DDDDDD",
        flexDirection: "row",
        marginLeft: width * 0.03,
        justifyContent: "space-between",
        alignItems: "center"
    },
    allPf: {
        paddingTop: 5,
        paddingBottom: 5
    },
    allPf1: {
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 14,
        color: "#3A3A3A"
    },
    allPf2: {
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 13,
        color: "#A8A8A8"
    }
});
