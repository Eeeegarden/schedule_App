import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Switch } from 'react-native';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  // 회원가입 로직
  const handleSignup = () => {
    console.log('Signing up...');
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
            <TouchableOpacity style={styles.emailbutton}>
                <Text>인증{'\n'}요청</Text>
            </TouchableOpacity>
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
        <View style={styles.inputRow}>
            <View style={styles.inputRow}>
                <TextInput
                style={styles.input}
                placeholder="인증 코드"
                value={verificationCode}
                onChangeText={setVerificationCode}
                />
            </View>
            <TouchableOpacity style={styles.authbutton}>
                <Text>인증</Text>
            </TouchableOpacity>
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
            />
        </View>
        <View style={styles.inputRow}>
            <TextInput
                style={styles.input}
                placeholder={isChecked ? "대표자명" : "생년월일"}
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
    authbutton: {
        backgroundColor: '#D9D9D9',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '20%',
        marginBottom: 10,
        marginLeft:10,
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
