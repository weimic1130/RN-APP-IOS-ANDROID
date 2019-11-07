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
export default class BlankPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={{width:this.props.width,height:this.props.height,justifyContent: this.props.justify,alignItems:this.props.align}}>
                <Image source={require('./Images/k.png')}/>
                <Text style={styles.emptyAllText}>这里什么都没有,空空的</Text>
            </View>
        );
    }

    componentDidMount() {
    }
}

const styles = StyleSheet.create({
    emptyAll: {
        width: width,
        height:height,
        justifyContent: "center",
        alignItems: "center"
    },
    emptyAllText: {
        fontSize: 16,
        color: "#B2B2B2"
    }
});
