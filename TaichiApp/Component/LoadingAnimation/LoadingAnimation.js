/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
// icon
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
    Animated, ActivityIndicator
} from "react-native";

let {width, height} = Dimensions.get('window');
let codeTime = 60;
export default class LoadingAnimation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        if(this.props.show){
            return (
                <View style={styles.loadingCon}>
                    <View style={{borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.5)', width: 100, height: 100, alignItems: 'center'}}>
                        <ActivityIndicator animating={true} color='white' style={{marginTop: 12, width: 60, height: 60,}} size="large"/>
                        <Text style={{color: "#ffffff", fontSize: 13}}>加载中...</Text>
                    </View>
                </View>
            );
        }else{
            return <View/>
        }
    }

    componentDidMount() {
    }
}

const styles = StyleSheet.create({
    loadingCon: {
        flex: 1,
        height: height,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        position:"absolute"
    }
});
