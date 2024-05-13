import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View,Button,Switch } from 'react-native';
import {Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {signIn} from '../libs/auth';
import firestore from '@react-native-firebase/firestore';


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLoginPress = async () => {
        try{
            const {user} = await signIn({email, password});
            Alert.alert('로그인 성공');
            navigation.replace('MainScreen');
        }
        catch (e) {
            Alert.alert('로그인 실패');
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.appName}>AppName</Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputRow}>
                    <View style={styles.inputCol}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={setEmail}
                            />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry={true}
                            onChangeText={setPassword}
                            />
                    </View>
                    <TouchableOpacity onPress={handleLoginPress} style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>LOGIN</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('FindpwScreen')} style={styles.forgotPasswordButton}>
                    <Text style={styles.bottomButtonText}>비밀번호 찾기</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')} style={styles.signupButton}>
                    <Text style={styles.bottomButtonText}>회원 가입</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.googleLoginButton}>
            <Text style={styles.googleLoginButtonText}>구글로 로그인</Text>
            </TouchableOpacity>
            <Text>사업자는 일반 회원 가입으로</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
    },
    inputRow: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    inputCol: {
        flexDirection: 'column',
        height:100,
        flex: 2,
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 20,
        marginBottom: 10,
        flex: 1,
    },
    loginButton: {
        backgroundColor: '#D9D9D9',
        padding: 10,
        borderRadius: 5,
        marginLeft: 10, 
        alignItems: 'center',
    },
    loginButtonText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 60, 
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    bottomButtonText: {
        color: 'black',
        fontSize: 14,
    },
    forgotPasswordButton: {
        marginHorizontal:20,
    },
    signupButton: {
        marginHorizontal:20,
    },
    googleLoginButton: {
        backgroundColor: '#D9D9D9',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    googleLoginButtonText: {
        color: 'black',
        fontSize: 16,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    switch: {
        marginRight: 10,
    },
    button: {
        backgroundColor: '#D9D9D9',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
});

export default LoginScreen