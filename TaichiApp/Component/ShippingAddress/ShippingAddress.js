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
import { JFAPI } from './API/API';
import {createStackNavigator, StackActions, NavigationActions, createAppContainer} from "react-navigation";
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
export default class ShippingAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AddressData:'',
            userInfo:'',
            userId:'',
            name:'',
            tel:'',
            address:'',
            postalCode:'',
            isDefault:''
        }
    }

    static navigationOptions = {
        headerTitle: '新增/修改收货地址',
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
            <View style={styles.containerAppSetShiping}>
                <View style={styles.AboutChild1}>
                    <View style={styles.AboutChild12}>
                        <Text style={styles.ShipText}>收货人：</Text>
                        <TextInput value={this.state.name} onChangeText={(text) => this.setState({name:text})} style={styles.SdsuInput} placeholder="请输入收货人的姓名"></TextInput>
                    </View>
                    <View style={styles.AboutChild12}>
                        <Text style={styles.ShipText}>手机号：</Text>
                        <TextInput value={this.state.tel} onChangeText={(text) => this.setState({tel:text})} style={styles.SdsuInput} placeholder="请输入收货人的手机号码"></TextInput>
                    </View>
                    <View style={styles.AboutChild12}>
                        <Text style={styles.ShipText}>详细地址：</Text>
                        <TextInput blurOnSubmit={true} value={this.state.address} onChangeText={(text) => this.setState({address:text})} multiline={true} style={styles.SdsuInput} placeholder="请输入收货人的详细地址"></TextInput>
                    </View>
                    <View style={styles.AboutChild12N}>
                        <Text style={styles.ShipText}>邮政编码：</Text>
                        <TextInput value={this.state.postalCode} onChangeText={(text) => this.setState({postalCode:text})} style={styles.SdsuInput} placeholder="请输入邮政编码"></TextInput>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => this.determineAddress()}>
                    <View style={styles.AboutChild111}>
                        <Text style={styles.tuichuSty}>确定</Text>
                    </View>
                </TouchableWithoutFeedback>
                {
                    this.state.AddressData ? <TouchableWithoutFeedback onPress={() => this.deleteAddress()}>
                        <View style={styles.AboutChild111sc}>
                            <Text style={styles.tuichuSty}>删除</Text>
                        </View>
                    </TouchableWithoutFeedback> : null
                }
            </View>
        );
    }
    // 删除地址
    deleteAddress = () => {
        Alert.alert(
            '提示',
            '是否要删除该地址?',
            [
                {text: '取消'},
                {text: "删除",onPress:() => this.cofirmDelete()}
            ]
        );
    }
    cofirmDelete = () => {
        let AddressData = this.state.AddressData;
        let url = JFAPI.deleteAddress;
        let formData = new FormData();
        formData.append('addressId',AddressData.id);
        let opts = {
            method:"POST",
            body:formData
        };
        fetch(url,opts)
            .then((response) => response.json())
            .then((res) => {
                if(res.code == 0){
                    this.props.navigation.goBack();
                    this.props.navigation.state.params.refresh();
                }else{
                    Alert.alert("删除失败");
                }
            })
            .catch((error) => {
                cosnole.log(error);
            })
    }
    // 添加收货地址
    determineAddress = () => {
        let type = this.state.AddressData;
        let url = JFAPI.userAddressCreate;
        if(type){
            let formData = new FormData();
            let name = this.state.name;
            let tel = this.state.tel;
            let address = this.state.address;
            let postalCode = this.state.postalCode;
            let isDefault = this.state.isDefault;
            if(name == ''){
                Alert.alert('请输入收货人姓名');
                return;
            }
            if(tel == '' || this.state.tel.length < 11){
                Alert.alert('请输入收货人手机号');
                return;
            }
            if(address == ''){
                Alert.alert('请输入收货人地址');
                return;
            }
            formData.append('userId',this.state.userInfo.id);
            formData.append('name',name);
            formData.append('tel',tel);
            formData.append('address',address);
            formData.append('postalCode',postalCode);
            formData.append('id',this.state.AddressData.id);
            formData.append('isDefault',1);
            let opts = {
                method:"POST",
                body:formData
            }
            console.log(opts);
            return;
            fetch(url,opts)
                .then((response) => response.json())
                .then((res) => {
                    console.log(res);
                    if(res.code == 0){
                        this.props.navigation.state.params.refresh()
                        this.props.navigation.goBack();
                    }else{
                        Alert.alert('修改失败');
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }else{
            console.log("新增");
            let formData = new FormData();
            let name = this.state.name;
            let tel = this.state.tel;
            let address = this.state.address;
            let postalCode = this.state.postalCode;
            let isDefault = this.state.isDefault;
            if(name == ''){
                Alert.alert('请输入收货人姓名');
                return;
            }
            if(tel == '' || this.state.tel.length < 11){
                Alert.alert('请输入收货人手机号');
                return;
            }
            if(address == ''){
                Alert.alert('请输入收货人地址');
                return;
            }
            formData.append('userId',this.state.userInfo.id);
            formData.append('name',name);
            formData.append('tel',tel);
            formData.append('address',address);
            formData.append('postalCode',postalCode);
            formData.append('isDefault',1);
            let opts = {
                method:"POST",
                body:formData
            }
            fetch(url,opts)
                .then((response) => response.json())
                .then((res) => {
                    if(res.code == 0){
                        this.props.navigation.state.params.refresh();
                        this.props.navigation.goBack();
                    }else{
                        Alert.alert('新增失败');
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('userInfo')
            .then(result => {
                this.setState({
                    userInfo: JSON.parse(result)
                })
            }).catch(error => {
            console.log("读取失败");
        })
        if(this.props.navigation.state.params.data){
            let editData = this.props.navigation.state.params.data;
            this.setState({
                AddressData:editData,
                address:editData.address,
                name:editData.name,
                postalCode:editData.postalCode,
                tel:editData.tel
            })
            console.log("修改");
        }else{
            console.log("新增");
        }
        console.log(this.props.navigation.state.params);
    }

}

const styles = StyleSheet.create({
    containerAppSetShiping: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F3F3F3"
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
        backgroundColor: "#8A6246",
        marginTop: 30,
        alignItems: "center",
        height: 50,
        justifyContent: "center",
        marginBottom:20
    },
    AboutChild111sc:{
        width: "94%",
        backgroundColor: "#8A6246",
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
    tuichuSty: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "bold"
    },
    SdsuInput:{
        width:"80%",
        paddingLeft: 10,
        fontSize:16
    },
    ShipText:{
        fontSize:15,
        color:"#282828"
    }
});
