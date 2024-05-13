import * as React from 'react';
import { useState } from 'react';
<<<<<<< Updated upstream
import { StyleSheet, Text, TextInput, TouchableOpacity, View,Button,Switch } from 'react-native';
=======
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Button, Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
>>>>>>> Stashed changes

const MainScreen = () => {
    return (
<<<<<<< Updated upstream
        <View>
            <Text>메인 화면</Text>
=======
        <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ width: '100%', height: 100, backgroundColor: 'blue' }}>
                <TouchableOpacity
                    style={{ marginTop: 12, marginRight: 4 }}
                    onPress={() => alert('알림')}
                >
                    <Text style={{ textAlign: 'right', fontSize: 30, fontWeight: 'bold', color: 'red' }}>●</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ height: 650 }}>
                <TouchableOpacity
                    style={{ marginTop: 8, alignItems: 'center', borderWidth: 2, borderColor: 'gray', padding: 20, width: 300, borderRadius: 30 }}
                    onPress={() => alert('메모')}
                >
                    <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: 'bold' }}>05.08(금)</Text>
                    <Text style={{ textAlign: 'center', fontSize: 50, fontWeight: 'bold' }}>메모를 입력하세요.</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ marginTop: 4, alignItems: 'center', borderWidth: 2, borderColor: 'gray', padding: 20, width: 300, borderRadius: 30 }}
                    onPress={() => alert('공지사항')}
                >
                    <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: 'bold' }}>근무지 1 공지사항</Text>
                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>공지사항 없음</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ marginTop: 4, alignItems: 'center', borderWidth: 2, borderColor: 'gray', padding: 20, width: 300, borderRadius: 30 }}
                    onPress={() => alert('예정 근무')}
                >
                    <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: 'bold' }}>근무지</Text>
                    <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: 'bold' }}>예정 근무 : 2024-05-08</Text>
                    <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: 'bold' }}>00:00 ~ 23:59</Text>
                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>출근            근무 수정</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ marginTop: 8, alignItems: 'center', borderWidth: 2, borderColor: 'gray', padding: 20, width: 300, borderRadius: 30 }}
                    onPress={() => alert('근무지 추가')}
                >
                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>근무지 추가</Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={{ flexDirection: 'row', width: '100%', height: 40, backgroundColor: 'blue' }}>
                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => alert('근무지 추가')}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 4 }}>근무추가</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => alert('근무지 추가')}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15 }}>근무지</Text>
                </TouchableOpacity>
            </View>
>>>>>>> Stashed changes
        </View>
    );
};

<<<<<<< Updated upstream
export default MainScreen;
=======
export default MainScreen;
>>>>>>> Stashed changes
