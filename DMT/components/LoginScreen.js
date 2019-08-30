import React from 'react';
import {Image, StyleSheet, View, AsyncStorage, ScrollView} from 'react-native';
import MaterialButtonPrimary1 from "./login_symbols/MaterialButtonPrimary1";
import MaterialButtonViolet from "./login_symbols/MaterialButtonViolet";
import MaterialCheckboxWithLabel1 from "./login_symbols/MaterialCheckboxWithLabel1";
import MaterialButtonWithVioletText1 from "./login_symbols/MaterialButtonWithVioletText1";
import LoginTextBox from "./login_symbols/LoginTextBox";
import LoginHeader from "./login_symbols/LoginHeader";
import {registerForPushNotificationsAsync} from "./functions/DmtNotification";
import * as ToastAndroid from "react-native";
import configs from "../config";

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
        drawerIcon: (
            <Image source={require('../assets/icons/login_black.png')} style={{width: 24, height: 24}}/>
        )
    };

    state = {
        username: '',
        password: '',
        remember: false
    }

    handleChange = (name, value) => {
        this.setState({[name]: value})
    }

    handleSubmit = async () => {
        // TODO
        console.log("login clicked")

        const user = {
            id: 1,
            fname: "Tenusha",
            lname: "Guruge",
            email: "tenusha@gmail.com"
        }

        const result = await AsyncStorage.setItem("dmt_user", JSON.stringify(user))

        registerForPushNotificationsAsync().catch(err => {
            ToastAndroid.showWithGravityAndOffset(
                'notification server error!',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                100,
            );
        })
        this.props.navigation.navigate("Reload")
    }

    handleSignUp = async () => {
        this.props.navigation.navigate("Home")
    }

    handleToggle = () => {
        this.setState({remember: !this.state.remember})
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView style={styles.root}>
                <LoginHeader navigation={this.props.navigation}/>
                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
                    <View style={{width: 150, height: 150,backgroundColor: configs.theme,borderRadius:10}}>
                    <Image source={require('../assets/icons/login_logo.png')} style={{width: 150, height: 150}}/>
                    </View>
                </View>
                <View style={{flexDirection: "row", width: "100%"}}>
                    <Image source={require('../assets/icons/username.png')}
                           style={{width: 24, height: 24, marginTop: 30, marginLeft: 20}}/>
                    <LoginTextBox style={styles.materialFixedLabelTextbox} placeholder={'username'}
                                  value={this.state.username}
                                  handleChange={(value) => this.handleChange('username', value)}/>
                </View>
                <View style={{flexDirection: "row", width: "100%"}}>
                    <Image source={require('../assets/icons/password.png')}
                           style={{width: 24, height: 24, marginTop: 30, marginLeft: 20}}/>
                    <LoginTextBox style={styles.materialFixedLabelTextbox} placeholder={'password'}
                                  value={this.state.password}
                                  handleChange={(value) => this.handleChange('password', value)}/>
                </View>
                <MaterialCheckboxWithLabel1 style={styles.materialCheckboxWithLabel1} label={"Remember me"}
                                            checked={this.state.remember} handleToggle={this.handleToggle}/>
                <MaterialButtonPrimary1 style={styles.materialButtonPrimary1} handleSubmit={this.handleSubmit}/>
                <MaterialButtonViolet style={styles.materialButtonViolet} handleClick={this.handleSignUp}/>

                <MaterialButtonWithVioletText1
                    style={styles.materialButtonWithVioletText1}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "rgb(255,255,255)"
    },
    materialFixedLabelTextbox: {
        margin: 10,
        height: 50,
        width: "80%"
    },
    materialButtonPrimary1: {
        height: 40,
        opacity: 1,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10
    },
    materialButtonViolet: {
        height: 40,
        marginLeft: 15,
        marginRight: 15
    },
    materialCheckboxWithLabel1: {
        margin: 20,
        height: 40,
    },
    materialButtonWithVioletText1: {
        marginTop: 20,
        height: 36,
    }
});