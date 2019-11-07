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
export default class LoadingAnimationN extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        if(this.props.show){
            return (
                <View style={styles.loadingCon}>
                    <View style={{borderRadius: 10, justifyContent:"center", backgroundColor: 'rgba(0,0,0,0.5)', width: 100, height: 100, alignItems: 'center'}}>
                        <ActivityIndicator animating={true} color='white' style={{width: 60, height: 60,}} size="large"/>
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
