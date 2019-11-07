/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    TouchableWithoutFeedback,
    Image,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView, Modal, Platform, CameraRoll, Alert, NativeModules
} from "react-native";
import BlankPages from '../BlankPages/BlankPages';
let {width, height} = Dimensions.get('window');
import global from '../global';
import ImageViewer from 'react-native-image-zoom-viewer';
export default class BoxerCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coachdata:'',
            activeInex: 1,
            modalVisible:false,
            QrcodeArr:[],
            index:0
        }
    }
    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: navigation.state.params.title,
        headerStyle: {
            backgroundColor: "#323232"
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
            fontWeight: 'bold'
        },
    })

    render() {
        return (
            <View style={styles.containerAppboxCard}>
                {
                    this.state.coachdata ? <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
                        <View style={styles.boxCardChild}>
                            {
                             this.state.coachdata.headurl ? <Image style={styles.headImg} source={{uri:global.PicUrl + this.state.coachdata.headurl}} /> : <Image style={styles.headImg} source={require('./Images/bj.png')} />
                            }
                            <View style={styles.boxCardChild1}>
                                <Text style={styles.boxCardChild1Text1}>{this.state.coachdata.nickName ? this.state.coachdata.nickName : this.state.coachdata.realName}</Text>
                                <Text style={styles.boxCardChild1Text2}>{this.state.coachdata.sex == 1 ? '男' : '女'}{this.state.coachdata.address == '' || this.state.coachdata.address == 'undefined' || !this.state.coachdata.address ? '' : '·'+this.state.coachdata.address }</Text>
                                <View style={styles.boxCardChild1Text3}>
                                    <Text style={styles.boxCardChild1Text4}>
                                        {
                                            this.lessonTypeText(this.state.coachdata.level)
                                        }
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.boxCardChild}>
                            <Text style={styles.TextChild1}>
                                {
                                    this.state.coachdata.introduce == 'undefined' || this.state.coachdata.introduce == '' ? '' : this.state.coachdata.introduce
                                }
                            </Text>
                        </View>
                        {
                            this.state.coachdata.wxQrcode ? <TouchableWithoutFeedback onPress={() => this.setState({modalVisible:true})}>
                                <View style={styles.boxCardChild}>
                                    <Image resizeMode="contain" style={{width:width,height:height}} source={{uri:global.PicUrl + this.state.coachdata.wxQrcode}} />
                                </View>
                            </TouchableWithoutFeedback> : null
                        }
                        {/*<View style={styles.boxCardChild2}>*/}
                        {/*    <Text>再来一个</Text>*/}
                        {/*</View>*/}
                    </ScrollView> : <BlankPages width={width} height={height} align={'center'} justify={'center'}  />
                }
                <Modal
                    visible={this.state.modalVisible}
                    transparent={true}
                    onRequestClose={() => this.setState({modalVisible: false})}>
                    <ImageViewer
                        menuContext={{'saveToLocal':"保存到相册","cancel":"取消"}}
                        onClick={() => this.setState({modalVisible:false})}
                        onSave={(url) => {this.savePhoto(url)}}
                        imageUrls={this.state.QrcodeArr} index={this.state.index}/>
                </Modal>
            </View>
        );
    }
    savePhoto(url){
        let self = this;
            let promise = CameraRoll.saveToCameraRoll(url);
            promise.then(function(result){
                Alert.alert('已保存到系统相册');
            }).catch(function(err){
                Alert.alert('保存失败！\n'+err);
                console.log(err);
            })
    }
    // 当前等级
    lessonTypeText = (type) => {
        switch (type) {
            case 0:
            case 1:
                return ('问身')
                break;
            case 2:
                return ('养正')
                break;
            case 3:
                return ('弘毅一级')
                break;
            case 4:
                return ('弘毅二级')
                break;
            case 5:
                return ('弘毅三级')
                break;
            case 6:
                return ('归真一级')
                break;
            case 7:
                return ('归真二级')
                break;
            case 8:
                return ('归真三级')
                break;
            case 9:
                return ('圆明一级')
                break;
            case 10:
                return ('圆明二级')
                break;
            case 11:
                return ('圆明三级')
                break;
            default:
                return (<TextInput editable={false} style={{width: "75%"}} placeholder="空"></TextInput>)
        }
    }
    openSetting = () => {
        NativeModules.OpenSettings.openNetworkSettings((data) => {
            console.log('call back data', data);
        })
    }
    componentDidMount() {
        if(this.props.navigation.state.params.data){
            this.setState({
                coachdata:this.props.navigation.state.params.data,
                QrcodeArr:this.state.QrcodeArr.concat({url:global.PicUrl + this.props.navigation.state.params.data.wxQrcode})
            })
            console.log(this.state.QrcodeArr);
        }
    }

}

const styles = StyleSheet.create({
    containerAppboxCard: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F5F4F3"
    },
    boxCardChild:{
        width:width * 0.9,
        flexDirection:"row",
        paddingTop: 10
    },
    boxCardChild2:{
        width:width * 0.9,
        flexDirection:"row",
        paddingTop: 15,
        paddingBottom:15,
        justifyContent: "space-around",
        backgroundColor:"#FFFFFF",
        marginTop:15,
        shadowColor:"#DDDDDD",
        shadowOpacity:0.5,
        shadowRadius:8
    },
    boxCardChild3:{
        width:width * 0.9,
        flexDirection:"row",
        paddingTop: 15,
        paddingBottom:15,
        justifyContent: "space-around",
        backgroundColor:"#FFFFFF",
        marginTop:15,
        shadowColor:"#DDDDDD",
        shadowOpacity:0.5,
        shadowRadius:8
    },
    boxCardChild4:{
        width:width * 0.9,
        paddingBottom:15,
        backgroundColor:"#FFFFFF"
    },
    headImg:{
        width:80,
        height:80,
        borderRadius:20
    },
    boxCardChild1:{
        justifyContent:"space-around",
        paddingLeft:15,
        paddingTop:5
    },
    boxCardChild1Text1:{
        fontSize:19,
        color:"#323232",
        fontWeight: "bold"
    },
    boxCardChild1Text2:{
        color:"#8A6246",
        fontSize: 14,
        fontWeight: "bold",
        paddingTop:5,
        paddingBottom:5
    },
    boxCardChild1Text3:{
        backgroundColor:"#A97B5B",
        width:65,
        alignItems: "center",
        borderRadius: 8,
        paddingLeft: 5,
        paddingRight:5
    },
    boxCardChild1Text4:{
        fontSize:12,
        color:"#FFFFFF",
        paddingTop:3,
        paddingBottom:3,
        fontWeight:"bold"
    },
    TextChild1:{
        color:"#8C7A6E",
        fontSize:12,
        lineHeight:16
    },
    boxCardChild2Text:{
        color:"#B2B2B2",
        fontSize:12,
        paddingTop:10
    },
    boxCardChild21:{
        alignItems:"center"
    },
    boxCardChild32:{
        width:"84%",
        justifyContent:"space-around"
    },
    boxCardChild31:{
        alignItems:"center"
    },
    boxCardChild31Text1:{
        fontSize:26,
        color:"#282828"
    },
    boxCardChild31Text2:{
        color:"#B2B2B2",
        fontSize:13
    },
    boxCardChild31Text3:{
        color:"#282828",
        fontSize:14
    },
    boxCardChild41:{
        flexDirection:"row",
        justifyContent:"space-around",
        width:"94%",
        paddingTop:10
    },
    boxCardChild411:{
        alignItems:"center"
    },
    boxCardChild411Text1:{
        color:"#B2B2B2",
        fontSize:12,
        paddingTop:5
    }
});
