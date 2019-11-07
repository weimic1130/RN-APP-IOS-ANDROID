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
    FlatList,
    Animated
} from "react-native";
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view'

let { width, height } = Dimensions.get('window');
let codeTime = 60;
export default class DetailsCraft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: '',
        }
    }

    static navigationOptions = {
        headerTitle: '练拳详情',
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
            <View style={styles.containerAppTaiLqd}>
                <ScrollView>
                    <View style={styles.allContainerLqd}>
                        <View style={styles.childContainer1N}>
                            <View style={styles.childContainer1NContent}>
                                <View style={styles.childContainerCh}>
                                    <Text style={styles.childContainerText}>日期</Text>
                                </View>
                                <View style={styles.childContainerCh2}>
                                    <Text style={styles.childContainerText}>次数</Text>
                                </View>
                                <View style={styles.childContainerCh3}>
                                    <Text style={styles.childContainerText}>运动时长</Text>
                                </View>
                                <View style={styles.childContainerCh4}>
                                    <Text style={styles.childContainerText}>动作准确性</Text>
                                </View>
                            </View>
                        </View>
                        <FlatList
                            data={this.state.dataList}
                            renderItem={({ item }) => this.renderCell(item)}
                            keyExtractor={item => item.id}
                        />

                    </View>
                </ScrollView>
            </View>
        );
    }

    renderCell = (item) => {
        return (
            <View style={styles.childContainer1N}>
                <View style={styles.childContainer1NContent}>
                    <View style={styles.childContainerCh}>
                        <Text style={styles.childContainerText}>2019-01-08</Text>
                    </View>
                    <View style={styles.childContainerCh2}>
                        <Text style={styles.childContainerText}>100</Text>
                    </View>
                    <View style={styles.childContainerCh3}>
                        <Text style={styles.childContainerText}>1200</Text>
                    </View>
                    <View style={styles.childContainerCh4}>
                        <Text style={styles.childContainerText}>99%</Text>
                    </View>
                </View>
            </View>
        );
    }


    componentDidMount() {

        this.setState({
            dataList: [
                { id: 1 },
                { id: 2 }
            ]
        });

    }

}

const styles = StyleSheet.create({
    containerAppTaiLqd: {
        flex: 1,
        backgroundColor: "#F3F3F3"
    },
    allContainerLqd: {
        width: width,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center"
    },
    childContainer: {
        width: "92%",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 10
    },
    childContainerCh: {
        width: "24%"
    },
    childContainerCh2: {
        width: "22%",
        alignItems: "center"
    },
    childContainerCh3: {
        width: "22%",
        alignItems: "center"
    },
    childContainerCh4: {
        width: "22%",
        alignItems: "center"
    },
    childContainer1: {
        width: "92%",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 10
    },
    childContainer1N: {
        width: "94%",
        flexDirection: "row",
        flexWrap: "wrap",
        marginLeft: "4%",
        justifyContent: "space-around"

    },

    childContainer1NContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    childContainerText: {
        fontSize: 13,
        color: "#B2B2B2"
    }
});
