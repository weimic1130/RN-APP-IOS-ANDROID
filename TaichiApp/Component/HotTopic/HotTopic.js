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
export default class HotTopic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: ['太极拳的由来', '太极球的显示', '等级介绍', '课程管理', '太极说']
        }
    }

    static navigationOptions = {
        headerTitle: '热门主题',
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        headerRight: (
            <TouchableWithoutFeedback onPress={() => alert("跳转")}>
                <Text style={{color: "#FFFFFF", paddingRight: 10}}>发帖</Text>
            </TouchableWithoutFeedback>
        )
    };

    render() {
        return (
            <View style={styles.containerAppTaichi}>
                <ScrollableTabView
                    initialPage={0}
                    renderTabBar={() => <ScrollableTabBar/>}
                    tabBarBackgroundColor='#fff'
                    tabBarActiveTextColor='#8A6246'
                    tabBarInactiveTextColor='#333'
                    tabBarUnderlineStyle={styles.tabBarUnderline}
                    tabBarTextStyle={{fontSize: 16}}
                >
                    <View tabLabel='太极拳的由来'>
                        <ScrollView>
                            <View style={styles.culturalcon}>
                                <View style={{backgroundColor: "#FFFFFF"}}>
                                    <View style={styles.containerAppTaiMoreChild1}>
                                        <View>
                                            <Image style={{width: 45, height: 45, borderRadius: 22}} source={require('./Images/tx.jpg')}/>
                                        </View>
                                        <View style={styles.containerAppTaiMoreChild12}>
                                            <View>
                                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                                    <Text style={styles.containerAppTaiMoreChild12Text1}>来自非洲的战神</Text>
                                                    <View style={styles.containerAppTaiMoreChild13}>
                                                        <Text style={styles.containerAppTaiMoreChild13Text}>拳正问身</Text>
                                                    </View>
                                                </View>
                                                <Text style={styles.containerAppTaiMoreChild12Text2}>9小时前</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.containerAppTaiMoreChild2}>
                                        <Text style={{lineHeight:20,color:"#8A6246",fontSize:14,fontWeight:"bold"}}>#太极拳的由来<Text style={{lineHeight:20,color:"#767676",fontSize:14}}>验实的方法，对自然现象进行归因的学 科。科学活动所得的知识是条件明确的、能经得起检验 的，而且不能与任何适用范围内的已知事实产生矛盾。 科学原仅指对自然现象之规律的探索与总结，但人文学 科也越来越多地被冠以“科学”之名。
                                        </Text></Text>
                                    </View>
                                    <View style={styles.containerAppTaiMoreChild3}>
                                        <Image style={styles.containerAppTaiMoreChild3Img} source={require('./Images/tx.jpg')} />
                                    </View>
                                    <View style={styles.containerAppTaiMoreChild4}>
                                        <View style={styles.containerAppTaiMoreChild41}>
                                            <Image style={styles.iconSize} source={require('./Images/2.png')} />
                                            <Text style={styles.containerAppTaiMoreChild41Text}>点赞</Text>
                                        </View>
                                        <View style={styles.containerAppTaiMoreChild41}>
                                            <Image style={styles.iconSize1} source={require('./Images/3.png')} />
                                            <Text style={styles.containerAppTaiMoreChild41Text}>评论</Text>
                                        </View>
                                        <View style={styles.containerAppTaiMoreChild41}>
                                            <Image style={styles.iconSize1} source={require('./Images/4.png')} />
                                            <Text style={styles.containerAppTaiMoreChild41Text}>转发</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.lineStyZdy}></View>
                                <View style={{backgroundColor: "#FFFFFF"}}>
                                    <View style={styles.containerAppTaiMoreChild1}>
                                        <View>
                                            <Image style={{width: 45, height: 45, borderRadius: 22}} source={require('./Images/tx.jpg')}/>
                                        </View>
                                        <View style={styles.containerAppTaiMoreChild12}>
                                            <View>
                                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                                    <Text style={styles.containerAppTaiMoreChild12Text1}>来自非洲的战神</Text>
                                                    <View style={styles.containerAppTaiMoreChild13}>
                                                        <Text style={styles.containerAppTaiMoreChild13Text}>拳正问身</Text>
                                                    </View>
                                                </View>
                                                <Text style={styles.containerAppTaiMoreChild12Text2}>9小时前</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.containerAppTaiMoreChild2}>
                                        <Text style={{lineHeight:20,color:"#8A6246",fontSize:14,fontWeight:"bold"}}>#太极拳的由来<Text style={{lineHeight:20,color:"#767676",fontSize:14}}>验实的方法，对自然现象进行归因的学 科。科学活动所得的知识是条件明确的、能经得起检验 的，而且不能与任何适用范围内的已知事实产生矛盾。 科学原仅指对自然现象之规律的探索与总结，但人文学 科也越来越多地被冠以“科学”之名。
                                        </Text></Text>
                                    </View>
                                    <View style={styles.containerAppTaiMoreChild3}>
                                        <Image style={styles.containerAppTaiMoreChild3Img} source={require('./Images/tx.jpg')} />
                                    </View>
                                    <View style={styles.containerAppTaiMoreChild4}>
                                        <View style={styles.containerAppTaiMoreChild41}>
                                            <Image style={styles.iconSize} source={require('./Images/2.png')} />
                                            <Text style={styles.containerAppTaiMoreChild41Text}>点赞</Text>
                                        </View>
                                        <View style={styles.containerAppTaiMoreChild41}>
                                            <Image style={styles.iconSize1} source={require('./Images/3.png')} />
                                            <Text style={styles.containerAppTaiMoreChild41Text}>评论</Text>
                                        </View>
                                        <View style={styles.containerAppTaiMoreChild41}>
                                            <Image style={styles.iconSize1} source={require('./Images/4.png')} />
                                            <Text style={styles.containerAppTaiMoreChild41Text}>转发</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View tabLabel='太极球的显示'>
                        <View style={styles.culturalcon}>
                            <View sytle={{backgroundColor: "#FFFFFF"}}>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View tabLabel='等级介绍'>
                        <View style={styles.culturalcon}>
                            <View sytle={{backgroundColor: "#FFFFFF"}}>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View tabLabel='课程管理'>
                        <View style={styles.culturalcon}>
                            <View sytle={{backgroundColor: "#FFFFFF"}}>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View tabLabel='太极说'>
                        <View style={styles.culturalcon}>
                            <View sytle={{backgroundColor: "#FFFFFF"}}>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.Ttquyu}>
                                    <View style={{width: width * 0.3}}>
                                        <Image style={{width: 110, height: 75}} source={require('./Images/rumen.png')}/>
                                    </View>
                                    <View style={{paddingLeft: 5, width: width * 0.6, justifyContent: "space-between"}}>
                                        <Text style={styles.tttitle}>广东惠州举行全民首届太极运动大会 吸引众多太极拳爱好者和游客
                                        </Text>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.ttdesc}>传统文化</Text>
                                            <Text style={styles.ttdesc}>10.1万阅读·1200评论</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollableTabView>
            </View>
        );
    }

    componentDidMount() {
    }

}

const styles = StyleSheet.create({
    containerAppTaichi: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F7F7F7"
    },
    tabBarUnderline: {
        backgroundColor: '#FFFFFF',
        height: 1,
    },
    culturalcon: {
        width: width,
        backgroundColor: "#FFFFFF",
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    Ttquyu: {
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        width: width * 0.96,
        marginLeft: width * 0.02
    },
    tttitle: {
        color: "#3A3A3A",
        fontSize: 14,
        fontWeight: 'bold'
    },
    ttdesc: {
        color: "#A8A8A8",
        fontSize: 12
    },
    containerAppTaiMoreChild1: {
        width: "94%",
        marginLeft: '3%',
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10
    },
    containerAppTaiMoreChild2: {
        paddingBottom: 10,
        width: "94%",
        marginLeft: '3%'
    },
    containerAppTaiMoreChild12: {
        width: "87%",
        paddingLeft: 10,
        justifyContent: "space-around"
    },
    containerAppTaiMoreChild12Text1: {
        color: "#282828",
        fontSize: 14
    },
    containerAppTaiMoreChild12Text2: {
        color: "#B2B2B2",
        fontSize: 12,
        paddingTop: 5
    },
    containerAppTaiMoreChild12Text3: {
        color: "#767676",
        fontSize: 13
    },
    containerAppTaiMoreChild13Text: {
        color: "#FFFFFF",
        fontSize: 10
    },
    containerAppTaiMoreChild13: {
        backgroundColor: "#B98A69",
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 8,
        marginLeft: 5
    },
    containerAppTaiMoreChild3:{
        flexDirection:"row",
        width: "94%",
        marginLeft: '3%'
    },
    containerAppTaiMoreChild4:{
        flexDirection:"row",
        width: "94%",
        marginLeft: '3%',
        justifyContent:"space-around",
        marginTop:10
    },
    containerAppTaiMoreChild3Img:{
        width:'100%',
        height:175,
        marginTop: 5
    },
    containerAppTaiMoreChild41:{
        alignItems:"center",
        justifyContent:"center"
    },
    containerAppTaiMoreChild41Text:{
        color:"#757575",
        fontSize:13,
        paddingTop:6
    },
    iconSize:{
        width:18,
        height:18
    },
    iconSize1:{
        width:17,
        height:17
    },
    lineStyZdy:{
        width:width,
        height:10,
        backgroundColor:"#F3F3F3",
        marginTop:10,
        marginBottom:10
    }
});
