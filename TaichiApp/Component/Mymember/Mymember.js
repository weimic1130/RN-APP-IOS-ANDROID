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
import AsyncStorage from "@react-native-community/async-storage";

let {width, height} = Dimensions.get('window');
let self = this;
export default class Mymember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: ''
        }
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: '我的会员',
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        }
        // headerRight: (
        //     <TouchableWithoutFeedback onPress={() => navigation.state.params.gotoCDetails(self)}>
        //         <Text style={styles.naviGateSty}>课程详情</Text>
        //     </TouchableWithoutFeedback>
        // )
    })

    render() {
        return (
            <View style={styles.containerAppMymeber}>
                <ScrollView style={{flex: 1}}>
                    <ImageBackground style={styles.backStyMber} source={require('./Images/7.png')}>
                        <View style={styles.ViewAbsMber}>
                            <Text style={styles.meberText1}>会员等级</Text>
                            {
                                this.state.userInfo ? this.lessonTypeText(this.state.userInfo.level) : null
                            }
                        </View>
                    </ImageBackground>
                    <View style={{width: "95%", marginLeft: "2.5%", backgroundColor: "#FFFFFF", marginTop: 20}}>
                        <View>
                            <View style={styles.shenqinCon}>
                                <Text style={styles.shenqinconText}>申请考试</Text>
                            </View>
                            {
                                this.state.userInfo ? this.applyTest(this.state.userInfo.level) : null
                            }
                        </View>
                    </View>
                    {/*会员权益*/}
                    <View style={{width: "95%", marginLeft: "2.5%", backgroundColor: "#FFFFFF", marginTop: 20}}>
                        <View>
                            <View style={styles.shenqinCon}>
                                <Text style={styles.shenqinconText}>会员权益</Text>
                            </View>
                            <View>
                                <View style={styles.shenqinCon1N}>
                                    <View style={styles.shenqinCon112}>
                                        <View style={styles.shenqinCon1121}>
                                            <Image source={require('./Images/3.png')}/>
                                            <Text style={styles.shenqinCon1121Text}>专属标识</Text>
                                        </View>
                                        <View style={styles.shenqinCon1121}>
                                            <Image source={require('./Images/1.png')}/>
                                            <Text style={styles.shenqinCon1121Text}>会员福利</Text>
                                        </View>
                                        <View style={styles.shenqinCon1121}>
                                            <Image source={require('./Images/2.png')}/>
                                            <Text style={styles.shenqinCon1121Text}>会员折扣</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    // 通知消息
    GotoCourseDetails = () => {
        console.log("课程详情");
    }
    // 等级类型
    lessonTypeText = (type) => {
        switch (type) {
            case 0:
            case 1:
                return (<Text style={styles.meberText2}>问身</Text>)
                break;
            case 2:
                return (<Text style={styles.meberText2}>养正</Text>)
                break;
            case 3:
                return (<Text style={styles.meberText2}>弘毅一级</Text>)
                break;
            case 4:
                return (<Text style={styles.meberText2}>弘毅二级</Text>)
                break;
            case 5:
                return (<Text style={styles.meberText2}>弘毅三级</Text>)
                break;
            case 6:
                return (<Text style={styles.meberText2}>归真一级</Text>)
                break;
            case 7:
                return (<Text style={styles.meberText2}>归真二级</Text>)
                break;
            case 8:
                return (<Text style={styles.meberText2}>归真三级</Text>)
                break;
            case 9:
                return (<Text style={styles.meberText2}>圆明一级</Text>)
                break;
            case 10:
                return (<Text style={styles.meberText2}>圆明二级</Text>)
                break;
            case 11:
                return (<Text style={styles.meberText2}>圆明三级</Text>)
                break;
            default:
                return (<Text style={styles.meberText2}>空</Text>)
        }
    }
    // 申请考试
    applyTest = (type) => {
        switch (type) {
            case 0:
            case 1:
            case 2:
                return (
                    <View>
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/4.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>弘毅一级</Text>
                                </View>
                                <View>
                                    <TouchableWithoutFeedback onPress={() => this.gotoapplyTest()}>
                                        <View style={styles.shenqinCon11Text2}>
                                            <Text style={styles.shenqinCon11Text3}>申请</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>弘毅二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>弘毅三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/*归真*/}
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/5.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>归真一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>归真二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>归真三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/*圆明*/}
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/4.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>圆明一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>圆明二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1N}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>圆明三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )
                break;
            case 3:
                return (
                    <View>
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/4.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>弘毅一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>弘毅二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>弘毅三级</Text>
                                </View>
                                <View>
                                    <TouchableWithoutFeedback onPress={() => this.gotoapplyTest()}>
                                        <View style={styles.shenqinCon11Text2}>
                                            <Text style={styles.shenqinCon11Text3}>申请</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                        {/*归真*/}
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/5.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>归真一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>归真二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>归真三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/*圆明*/}
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/4.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>圆明一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>圆明二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1N}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>圆明三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )
                break;
            case 4:
                return (
                    <View>
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/4.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>弘毅一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>弘毅二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>弘毅三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/*归真*/}
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/5.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>归真一级</Text>
                                </View>
                                <View>
                                    <TouchableWithoutFeedback onPress={() => this.gotoapplyTest()}>
                                        <View style={styles.shenqinCon11Text2A}>
                                            <Text style={styles.shenqinCon11Text3}>申请</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>归真二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>归真三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/*圆明*/}
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/4.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>圆明一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>圆明二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1N}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>圆明三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )
                break;
            case 5:
                return (
                    <View>
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/4.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>弘毅一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>弘毅二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>弘毅三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/*归真*/}
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/5.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>归真一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>归真二级</Text>
                                </View>
                                <View>
                                    <TouchableWithoutFeedback onPress={() => this.gotoapplyTest()}>
                                        <View style={styles.shenqinCon11Text2A}>
                                            <Text style={styles.shenqinCon11Text3}>申请</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>归真三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/*圆明*/}
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/4.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>圆明一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>圆明二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1N}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>圆明三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )
                break;
            case 6:
                return (
                    <View>
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/4.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>弘毅一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>弘毅二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>弘毅三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/*归真*/}
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/5.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>归真一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>归真二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>归真三级</Text>
                                </View>
                                <View>
                                    <TouchableWithoutFeedback onPress={() => this.gotoapplyTest()}>
                                        <View style={styles.shenqinCon11Text2A}>
                                            <Text style={styles.shenqinCon11Text3}>申请</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                        {/*圆明*/}
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/4.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>圆明一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>圆明二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1N}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>圆明三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )
                break;
            case 7:
                return (
                    <View>
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/4.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>弘毅一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>弘毅二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>弘毅三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/*归真*/}
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/5.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>归真一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>归真二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>归真三级</Text>
                                </View>
                                <View>
                                    <TouchableWithoutFeedback onPress={() => this.gotoapplyTest()}>
                                        <View style={styles.shenqinCon11Text2}>
                                            <Text style={styles.shenqinCon11Text3}>申请</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                        {/*圆明*/}
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/4.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>圆明一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>圆明二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1N}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>圆明三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )
                break;
            case 8:
                return (
                    <View>
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/4.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>弘毅一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>弘毅二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>弘毅三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/*归真*/}
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/5.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>归真一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>归真二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>归真三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/*圆明*/}
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/4.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>圆明一级</Text>
                                </View>
                                <View>
                                    <TouchableWithoutFeedback onPress={() => this.gotoapplyTest()}>
                                        <View style={styles.shenqinCon11Text2}>
                                            <Text style={styles.shenqinCon11Text3}>申请</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>圆明二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1N}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>圆明三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )
                break;
            case 9:
                return (
                    <View>
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/4.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>弘毅一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>弘毅二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>弘毅三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/*归真*/}
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/5.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>归真一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>归真二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>归真三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/*圆明*/}
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/4.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>圆明一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>圆明二级</Text>
                                </View>
                                <View>
                                    <TouchableWithoutFeedback onPress={() => this.gotoapplyTest()}>
                                        <View style={styles.shenqinCon11Text2}>
                                            <Text style={styles.shenqinCon11Text3}>申请</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1N}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>圆明三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )
                break;
            case 10:
                return (
                    <View>
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/4.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>弘毅一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>弘毅二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>弘毅三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/*归真*/}
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/5.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>归真一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>归真二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>归真三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/*圆明*/}
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/4.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>圆明一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>圆明二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1N}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>圆明三级</Text>
                                </View>
                                <View>
                                    <TouchableWithoutFeedback onPress={() => this.gotoapplyTest()}>
                                        <View style={styles.shenqinCon11Text2}>
                                            <Text style={styles.shenqinCon11Text3}>申请</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                    </View>
                )
                break;
            case 11:
                return (
                    <View>
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/4.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>弘毅一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>弘毅二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>弘毅三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/*归真*/}
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/5.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>归真一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>归真二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>归真三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/*圆明*/}
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/4.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>圆明一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>圆明二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1N}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>圆明三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>已通过</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )
                break;
            default:
                return (
                    <View>
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/4.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>弘毅一级</Text>
                                </View>
                                <View>
                                    <TouchableWithoutFeedback onPress={() => this.gotoapplyTest()}>
                                        <View style={styles.shenqinCon11Text2}>
                                            <Text style={styles.shenqinCon11Text3}>申请</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>弘毅二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>弘毅三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/*归真*/}
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/5.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>归真一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>归真二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>归真三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/*圆明*/}
                        <View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}>
                                        <Image source={require('./Images/4.png')}/>
                                    </View>
                                    <Text style={styles.shenqinCon11Text}>圆明一级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>圆明二级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.shenqinCon1N}>
                                <View style={styles.shenqinCon11}>
                                    <View style={{width: 40}}></View>
                                    <Text style={styles.shenqinCon11Text}>圆明三级</Text>
                                </View>
                                <View>
                                    <View style={styles.shenqinCon11Text2A}>
                                        <Text style={styles.shenqinCon11Text3}>申请</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )
        }
    }
    gotoapplyTest = () => {
        console.log('前往填写申请考试详情页');
        let parameter = {
            data: this.state.userInfo
        };
        this.props.navigation.navigate('EnterExaminationN', parameter);
    }

    // 请求页面接口
    componentDidMount() {
        // 注册自定义导航右侧点击事件
        this.props.navigation.setParams({
            gotoCDetails: this.GotoCourseDetails
        })
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result)
                })
                console.log(this.state.userInfo);
            }).catch(error => {
            console.log("读取失败");
        })
    }

}

const styles = StyleSheet.create({
    containerAppMymeber: {
        flex: 1,
        backgroundColor: "#F4F3F2"
    },
    naviGateSty: {
        color: "#FFFFFF",
        paddingRight: 20
    },
    backStyMber: {
        width: '96%',
        marginLeft: "4%",
        height: 145,
        marginTop: 30
    },
    meberText1: {
        color: "#FFFFFF",
        fontSize: 13
    },
    meberText2: {
        fontSize: 33,
        color: "#EEE0D6",
        fontWeight: "bold",
        paddingTop: 15
    },
    ViewAbsMber: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 145
    },
    shenqinCon: {
        width: '94%',
        marginLeft: "3%",
        borderBottomColor: "#EAEAEA",
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        backgroundColor: "#FFFFFF"
    },
    shenqinCon1: {
        width: '94%',
        marginLeft: "3%",
        borderBottomColor: "#EAEAEA",
        paddingTop: 15,
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 15,
        borderBottomWidth: 1,
        backgroundColor: "#FFFFFF",
        flexDirection: "row"
    },
    shenqinCon1N: {
        width: '94%',
        marginLeft: "3%",
        paddingTop: 15,
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 15,
        backgroundColor: "#FFFFFF",
        flexDirection: "row"
    },
    shenqinCon11: {
        flexDirection: "row",
        alignItems: "center"
    },
    shenqinconText: {
        color: "#B2B2B2",
        fontSize: 14
    },
    shenqinCon11Text: {
        color: "#282828",
        fontSize: 15
    },
    shenqinCon11Text2: {
        backgroundColor: "#B06F42",
        width: 60,
        alignItems: "center",
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 10
    },
    shenqinCon11Text2A: {
        backgroundColor: "#DADADA",
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 10,
        width: 60,
        alignItems: "center"
    },
    shenqinCon11Text3: {
        color: "#FFFFFF",
        fontSize: 14
    },
    shenqinCon112: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%"
    },
    shenqinCon1121: {
        alignItems: "center"
    },
    shenqinCon1121Text: {
        color: "#282828",
        fontSize: 14,
        paddingTop: 10
    }
});
