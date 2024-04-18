import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View,Button,Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home">
                <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon: () => <Entypo name="home" size={24} color="black"/>}}></Tab.Screen>
                <Tab.Screen name="Calendar" component={CalendarScreen} options={{tabBarIcon: () => <Entypo name="calendar" size={24} color="black"/>}}></Tab.Screen>
                <Tab.Screen name="Stat" component={StatScreen} options={{tabBarIcon: () => <Entypo name="bar-graph" size={24} color="black"/>}}></Tab.Screen>
                <Tab.Screen name="Preferences" component={PreferencesScreen} options={{tabBarIcon: () => <Entypo name="cog" size={24} color="black"/>}}></Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const HomeScreen = () => {
    return (
        <View>
            <Text>홈 화면</Text>
        </View>
    );
};

const CalendarScreen = () => {
    return (
        <View>
            <Text>캘린더 화면</Text>
        </View>
    );
};

const StatScreen = () => {
    return (
        <View>
            <Text>근무 통계 화면</Text>
        </View>
    );
};

const PreferencesScreen = () => {
    return (
        <View>
            <Text>환경 설정 화면</Text>
        </View>
    );
};

export { HomeScreen, CalendarScreen, StatScreen, PreferencesScreen };