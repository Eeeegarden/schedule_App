import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View,Button,Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignupScreen from "./src/screens/SignupScreen";
import LoginScreen from "./src/screens/LoginScreen";
import FindpwScreen from "./src/screens/FindpwScreen";
import MainNavigator from "./src/screens/MainNavigator";
import ManagementAlba from "./src/screens/ManagementAlba";
import MyWorkStat from "./src/screens/MyWorkStat";


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
      {/* <Stack.Screen
          name="Test"
          component={MyWorkStat}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="Auth"
          component={MyStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainNavigator"
          component={MainNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// import React, { useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './screens/HomeScreen';
// import NotificationScreen from './screens/NotificationScreen';
// import SettingsScreen from './screens/SettingsScreen';

// const Stack = createStackNavigator();

// function App() {
//   const [notifications, setNotifications] = useState([]);

//   const addNotification = (title, description) => {
//     setNotifications([
//       ...notifications,
//       { id: (notifications.length + 1).toString(), title, description },
//     ]);
//   };

//   const clearNotifications = () => {
//     setNotifications([]);
//   };

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home">
//           {props => <HomeScreen {...props} addNotification={addNotification} />}
//         </Stack.Screen>
//         <Stack.Screen name="Notifications">
//           {props => (
//             <NotificationScreen
//               {...props}
//               notifications={notifications}
//               clearNotifications={clearNotifications}
//             />
//           )}
//         </Stack.Screen>
//         <Stack.Screen name="Settings" component={SettingsScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;
