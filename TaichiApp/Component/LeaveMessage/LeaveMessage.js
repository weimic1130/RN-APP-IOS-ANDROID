/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createStackNavigator, StackActions, NavigationActions, createAppContainer} from "react-navigation";
import {FlatList, TouchableOpacity, ScrollView, Button, Platform, Image, ImageBackground, Dimensions, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from "react-native";
import Swiper from 'react-native-swiper';
// icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view'

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
export default class LeaveMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: ['拳友留言', '发布留言'],
            topic: [
                {
                    title: '非洲第一部落',
                    describe: '8192人',
                },
                {
                    title: '非洲第一部落',
                    describe: '8192人',
                },
                {
                    title: '非洲第一部落',
                    describe: '8192人',
                },
                {
                    title: '非洲第一部落',
                    describe: '8192人',
                },
                {
                    title: '非洲第一部落',
                    describe: '8192人',
                },
            ],
            slideshowArr: ['http://www.tantanscience.com/lipstickImg/tghb.png', 'http://www.tantanscience.com/lipstickImg/tghb.png']
        }
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: '我的留言',
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    })

    render() {
        return (
            <View style={styles.containerAppBoxDetails}>
                <ScrollableTabView
                    initialPage={0}
                    renderTabBar={() => <DefaultTabBar/>}
                    tabBarBackgroundColor='#fff'
                    tabBarActiveTextColor='#8A6246'
                    tabBarInactiveTextColor='#333'
                    tabBarUnderlineStyle={styles.tabBarUnderline}
                    tabBarTextStyle={{fontSize: 16}}
                >
                    <View tabLabel='拳友留言'>
                        <View style={styles.culturalcon}>
                            <ScrollView>
                                <View style={{backgroundColor: "#FFFFFF", width: width, alignItems: "center"}}>
                                    <View style={styles.pyquyuscon}>
                                        <View style={styles.pyquyuscon1}>
                                            <Image source={require('./Images/7.png')}/>
                                        </View>
                                        <View style={styles.pyquyuscon2}>
                                            <View style={styles.pyquyuscon21}>
                                                <View style={styles.pyquyuscon211}>
                                                    <View style={{flexDirection:"row",alignItems:"center"}}>
                                                        <Text style={styles.yhniche}>来自非洲的战神</Text>
                                                        <View style={styles.tieText1}>
                                                            <Text style={styles.tieText2}>圆明1级</Text>
                                                        </View>
                                                    </View>
                                                    <Text style={styles.yhnitime}>2019年12月12日 16:30</Text>
                                                </View>
                                            </View>
                                            <View style={{width: '100%', marginTop: 13}}>
                                                <Text style={styles.descconText}>泰与恒两卦。 “坤乾”是一种易书，出自商代，坤为金德，殷以 金德王，故坤乾为商代之易。</Text>
                                                <View style={{width:"55%", justifyContent:"space-between",marginTop:15,flexDirection:"row"}}>
                                                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                                                        <Image source={require('./Images/dianzan2.png')}/>
                                                        <Text style={{color:"#B2B2B2",fontSize:13,paddingLeft:7}}>1293</Text>
                                                    </View>
                                                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                                                        <Image source={require('./Images/huifu2.png')}/>
                                                        <Text style={{color:"#B2B2B2",fontSize:13,paddingLeft:7}}>1293</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.lineStyHei}></View>
                                    <View style={styles.pyquyuscon}>
                                        <View style={styles.pyquyuscon1}>
                                            <Image source={require('./Images/7.png')}/>
                                        </View>
                                        <View style={styles.pyquyuscon2}>
                                            <View style={styles.pyquyuscon21}>
                                                <View style={styles.pyquyuscon211}>
                                                    <View style={{flexDirection:"row",alignItems:"center"}}>
                                                        <Text style={styles.yhniche}>来自非洲的战神</Text>
                                                        <View style={styles.tieText1}>
                                                            <Text style={styles.tieText2}>圆明1级</Text>
                                                        </View>
                                                    </View>
                                                    <Text style={styles.yhnitime}>2019年12月12日 16:30</Text>
                                                </View>
                                            </View>
                                            <View style={{width: '100%', marginTop: 13}}>
                                                <Text style={styles.descconText}>泰与恒两卦。 “坤乾”是一种易书，出自商代，坤为金德，殷以 金德王，故坤乾为商代之易。</Text>
                                                <View style={{width:"55%", justifyContent:"space-between",marginTop:15,flexDirection:"row"}}>
                                                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                                                        <Image source={require('./Images/dianzan2.png')}/>
                                                        <Text style={{color:"#B2B2B2",fontSize:13,paddingLeft:7}}>1293</Text>
                                                    </View>
                                                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                                                        <Image source={require('./Images/huifu2.png')}/>
                                                        <Text style={{color:"#B2B2B2",fontSize:13,paddingLeft:7}}>1293</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                    <View tabLabel='发布留言'>
                        <View style={styles.culturalcon}>
                            <ScrollView>
                                <View style={{backgroundColor: "#FFFFFF", width: width, alignItems: "center"}}>
                                    <View style={styles.pyquyuscon}>
                                        <View style={styles.pyquyuscon1}>
                                            <Image source={require('./Images/7.png')}/>
                                        </View>
                                        <View style={styles.pyquyuscon2}>
                                            <View style={styles.pyquyuscon21}>
                                                <View style={styles.pyquyuscon211}>
                                                    <View style={{flexDirection:"row",alignItems:"center"}}>
                                                        <Text style={styles.yhniche}>来自非洲的战神</Text>
                                                        <View style={styles.tieText1}>
                                                            <Text style={styles.tieText2}>圆明1级</Text>
                                                        </View>
                                                    </View>
                                                    <Text style={styles.yhnitime}>2019年12月12日 16:30</Text>
                                                </View>
                                            </View>
                                            <View style={{width: '100%', marginTop: 13}}>
                                                <Text style={styles.descconText}>泰与恒两卦。 “坤乾”是一种易书，出自商代，坤为金德，殷以 金德王，故坤乾为商代之易。</Text>
                                                <View style={{width:"55%", justifyContent:"space-between",marginTop:15,flexDirection:"row"}}>
                                                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                                                        <Image source={require('./Images/dianzan2.png')}/>
                                                        <Text style={{color:"#B2B2B2",fontSize:13,paddingLeft:7}}>1293</Text>
                                                    </View>
                                                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                                                        <Image source={require('./Images/huifu2.png')}/>
                                                        <Text style={{color:"#B2B2B2",fontSize:13,paddingLeft:7}}>1293</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.lineStyHei}></View>
                                    <View style={styles.pyquyuscon}>
                                        <View style={styles.pyquyuscon1}>
                                            <Image source={require('./Images/7.png')}/>
                                        </View>
                                        <View style={styles.pyquyuscon2}>
                                            <View style={styles.pyquyuscon21}>
                                                <View style={styles.pyquyuscon211}>
                                                    <View style={{flexDirection:"row",alignItems:"center"}}>
                                                        <Text style={styles.yhniche}>来自非洲的战神</Text>
                                                        <View style={styles.tieText1}>
                                                            <Text style={styles.tieText2}>圆明1级</Text>
                                                        </View>
                                                    </View>
                                                    <Text style={styles.yhnitime}>2019年12月12日 16:30</Text>
                                                </View>
                                            </View>
                                            <View style={{width: '100%', marginTop: 13}}>
                                                <Text style={styles.descconText}>泰与恒两卦。 “坤乾”是一种易书，出自商代，坤为金德，殷以 金德王，故坤乾为商代之易。</Text>
                                                <View style={{width:"55%", justifyContent:"space-between",marginTop:15,flexDirection:"row"}}>
                                                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                                                        <Image source={require('./Images/dianzan2.png')}/>
                                                        <Text style={{color:"#B2B2B2",fontSize:13,paddingLeft:7}}>1293</Text>
                                                    </View>
                                                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                                                        <Image source={require('./Images/huifu2.png')}/>
                                                        <Text style={{color:"#B2B2B2",fontSize:13,paddingLeft:7}}>1293</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </ScrollableTabView>
            </View>
        );
    }


    // 请求页面接口
    componentDidMount(): void {
        this.props.navigation.setParams({navigatePress: this.gotoMessage})
    }

    componentWillMount() {
    }
}
const styles = StyleSheet.create({
    culturalcon: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    containerAppBoxDetails: {
        flex: 1,
        backgroundColor: '#F3F3F3',
        alignItems: 'center'
    },
    pyquyuscon: {
        flexDirection: "row",
        width: width * 0.9,
        marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15
    },
    pyquyuscon21: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    pyquyuscon1: {
        width: width * 0.2,
    },
    pyquyuscon2: {
        width: width * 0.72
    },
    pyquyuscon212: {
        flexDirection: "row",
        paddingRight: 10
    },
    yhniche: {
        color: "#757575",
        fontSize: 14
    },
    yhnitime: {
        color: "#B2B2B2",
        fontSize: 11,
        paddingTop: 5
    },
    diansas: {
        color: "#B2B2B2",
        fontSize: 13,
        paddingRight: 8
    },
    descconText: {
        color: "#282828",
        fontSize: 14,
        fontWeight: "bold"
    },
    lineStyHei:{
        width:width,
        height:8,
        backgroundColor:"#F3F3F3"
    },
    tieText1:{
        backgroundColor:"#B98A69",
        marginLeft:5,
        paddingTop:4,
        paddingBottom:4,
        paddingLeft:10,
        paddingRight:10,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:10
    },
    tieText2:{
        color:"#FFFFFF",
        fontSize:10
    },
    TtquyuG: {
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: "#FFFFFF",
        width: "100%",
        paddingLeft:10,
        paddingRight:10
    },
    TtquyuGEnd:{
        flexDirection: 'row',
        justifyContent: "flex-end",
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: "#FFFFFF",
        width: "100%",
        paddingLeft:10,
        paddingRight:10
    },
    Ttquyu: {
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        width: "100%",
        paddingLeft: 10,
        paddingRight:10
    },
    tabBarUnderline: {
        backgroundColor: '#FFFFFF',
        height: 1,
    }
});
