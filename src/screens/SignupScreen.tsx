import * as React from 'react';
import { useState } from 'react';
import {signUp} from '../libs/auth';
import {createUser} from '../libs/user';
import {Alert} from 'react-native';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Switch } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const SignupScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [businessnumber, setBusinessNumber] = useState('');
    const [owner, setOwner] = useState('');

  // 회원가입 로직
    const handleSignup = async () => {
        try {
            if (password !== confirmPassword) {
                Alert.alert('비밀번호가 일치하지 않습니다.');
                return;
            }
            // 회원가입 시 추가 필드 처리 (사업자/일반 사용자에 따라 다름)
            let additionalData = {};
            if (isChecked) {
                additionalData = {
                // 사업자 관련 필드
                    businessnumber: businessnumber,
                    owner: owner
                };
            } 
            else {
                additionalData = {
                // 일반 사용자 관련 필드
                    name: name,
                    birth: birth,
                    workplaace: null
                };
            }

            const { user } = await signUp({ email, password, additionalData });
            
            Alert.alert('회원가입 성공');
            navigation.replace('LoginScreen');
        } 
        catch (e) {
            Alert.alert('회원가입 실패');
        }
    };


return (
    <View style={styles.container}>
        <View style={styles.inputRow}>
            <View style={styles.inputCol}>
                <TextInput
                style={styles.input}
                placeholder="이메일"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                />
                <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                />
            </View>
        </View>

        <View style={styles.inputRow}>
            <TextInput
            style={styles.input}
            placeholder="Password 확인"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            />
        </View>
        
        <View style={styles.switchContainer}>
            <Switch
            value={isChecked}
            onValueChange={setIsChecked}
            style={styles.switch}
            />
            <Text>사업자세요?</Text>
        </View>
        <View style={styles.inputRow}>
            <TextInput
                style={styles.input}
                placeholder={isChecked ? "사업자번호" : "이름"}
                value={isChecked ? businessnumber : name}
                onChangeText={isChecked ? setBusinessNumber : setName}
            />
        </View>
        <View style={styles.inputRow}>
            <TextInput
                style={styles.input}
                placeholder={isChecked ? "대표자명" : "생년월일"}
                value={isChecked ? owner : birth}
                onChangeText={isChecked ? setOwner : setBirth}
            />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text>가입</Text>
        </TouchableOpacity>
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
    inputRow: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        width: '80%',
    },
    inputCol: {
        flexDirection: 'column',
        marginBottom: 10,
        flex:5,
        height:100,
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 20,
        marginBottom: 10,
        flex: 5,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    switch: {
        marginRight: 10,
    },
    emailbutton: {
        backgroundColor: '#D9D9D9',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '30%',
        marginBottom: 10,
        marginLeft:20,
    },
    button: {
        backgroundColor: '#D9D9D9',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '50%',
        marginBottom: 10,
    },
});

export default SignupScreen;
