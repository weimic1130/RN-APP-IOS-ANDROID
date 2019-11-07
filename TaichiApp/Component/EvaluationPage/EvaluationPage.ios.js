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
import {JFAPI} from './API/API'
import {
    Alert,
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
    Animated,
    ActivityIndicator, Picker, Modal
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

let {width, height} = Dimensions.get('window');
import global from '../global';
export default class EvaluationPageIos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: '',
            comment: '',
            catchData: ''
        }
    }

    static navigationOptions = {
        headerTitle: '评价',
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
                <View style={styles.AboutChild1}>
                    {
                        this.state.catchData.list ? <View style={{marginTop: 6, marginLeft: "3%", flexDirection: "row", alignItems: "center"}}>
                            <Image style={{width: 45, height: 45}} source={{uri: global.PicUrl+this.state.catchData.list[0].goodsImg}}/>
                            <Text style={{paddingLeft: 10}}>{this.state.catchData.list[0].goodsTitle}</Text>
                        </View> : <View style={{marginTop: 6, marginLeft: "3%", flexDirection: "row", alignItems: "center"}}>
                            <Image style={{width: 45, height: 45}} source={{uri: global.PicUrl+this.state.catchData.goodsImg}}/>
                            <Text style={{paddingLeft: 10}}>{this.state.catchData.goodsTitle}</Text>
                        </View>
                    }
                    <View style={styles.AboutChild12}>
                        <TextInput
                            value={this.state.comment}
                            onChangeText={(text) => {
                                this.setState({comment: text})
                            }}
                            multiline
                            style={{width: "95%", height: 100, paddingTop: 10, paddingBottom: 10, paddingVertical: 0, paddingLeft: 2, fontSize: 16}}
                            placeholder="宝贝收到您还满意吗？您的评价对我们很重要">
                        </TextInput>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => this.saveComment(this.state.catchData)}>
                    <View style={styles.AboutChild111}>
                        <Text style={styles.tuichuSty}>确认</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    // 提交评价
    saveComment = (item) => {
        if (this.state.comment == '') {
            Alert.alert('请输入要评价的内容');
            return;
        }
        let url = JFAPI.Savecomment;
        let formData = new FormData();
        formData.append('userId', this.state.userInfo.id);
        formData.append('orderId', item.orderId);
        formData.append('comment', this.state.comment);
        let opts = {
            method: "POST",
            body: formData
        };
        fetch(url, opts)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.code == 0) {
                    this.props.navigation.goBack();
                    this.props.navigation.state.params.refresh();
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    componentDidMount() {
        AsyncStorage.getItem('userInfo')
            .then(result => {
                console.log(JSON.parse(result));
                this.setState({
                    userInfo: JSON.parse(result)
                })
            }).catch(error => {
            console.log("读取失败");
        })
        this.setState({
            catchData: this.props.navigation.state.params.data
        })
        console.log(this.props.navigation.state.params.data);
    }

}

const styles = StyleSheet.create({
    containerAppSet: {
        flex: 1,
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
        backgroundColor: "#FFFFFF",
        marginTop: 5
    },
    AboutChild111: {
        width: "94%",
        marginLeft: "3%",
        backgroundColor: "#8A6246",
        marginTop: 30,
        alignItems: "center",
        height: 50,
        justifyContent: "center",
        marginBottom: 20
    },
    AboutChild12: {
        width: "94%",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginLeft: "3%",
        marginTop: 10
    },
    tuichuSty: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "bold"
    },
    SdsuInput: {
        width: "98%",
        paddingLeft: 2,
        fontSize: 16
    }
});
