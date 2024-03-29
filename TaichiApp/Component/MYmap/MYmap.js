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
    Animated,
    ActivityIndicator, Picker, Modal
} from "react-native";

let {width, height} = Dimensions.get('window');
export default class MYmap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeInex: 1,
            StateMask: false,
            // 选择教练
            gender: '1',
            genderText: "教练1",
            passwordState:true
        }
    }

    static navigationOptions = {
        headerTitle: '账号与安全',
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
                    <View style={styles.AboutChild12}>
                        <Image source={require('./Images/1.png')}/>
                        <TextInput secureTextEntry={this.state.passwordState} style={styles.SdsuInput} placeholder="请输入旧密码"></TextInput>
                        <TouchableWithoutFeedback onPress={() => this.openWord()}>
                            <Image source={require('./Images/2.png')} />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.AboutChild12}>
                        <Image source={require('./Images/1.png')}/>
                        <TextInput secureTextEntry={true} style={styles.SdsuInput} placeholder="请输入新密码"></TextInput>
                    </View>
                    <View style={styles.AboutChild111}>
                        <Text style={styles.tuichuSty}>确定</Text>
                    </View>
                </View>
            </View>
        );
    }

    // 选择教练
    closePickerDemo(parameter) {
        let self = this;

        self.setState({
            StateMask: false
        })

        if (parameter == 2) {
            self.setState({
                gender: '1',
                StateMask: false,
                genderText: ''
            })
        }
        if (this.state.gender == 1) {
            this.setState({
                genderText: "教练1"
            })
        } else if (this.state.gender == 2) {
            this.setState({
                genderText: "教练2"
            })
        }
    }
    openWord = () =>{
        if(this.state.passwordState == false){
            this.setState({
                passwordState:true
            })
        }else if(this.state.passwordState == true){
            this.setState({
                passwordState:false
            })
        }
    }
    componentDidMount() {
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
