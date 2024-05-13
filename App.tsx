import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View,Button,Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignupScreen from "./src/screens/SignupScreen";
import LoginScreen from "./src/screens/LoginScreen";
import FindpwScreen from "./src/screens/FindpwScreen";
import MainNavigator from './src/screens/MainNavigator';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
      <Stack.Screen name="SignupScreen" component={SignupScreen} options={{headerShown: false}}/>
      <Stack.Screen name="FindpwScreen" component={FindpwScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* 테스트로 인해 순서 변경 했습니다 */}
        <Stack.Screen
          name="MainNavigator"
          component={MainNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={MyStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;