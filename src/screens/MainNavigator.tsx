import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
{/* 화면 import */}
import MainScreen from './MainScreen';
import MainOPScreen from './MainOPScreen';
import TestScreen1 from './TestScreen1';
import MyWorkStat from './MyWorkStat';
import OPWorkStat from './OPWorkStat';
import TestScreen4 from './TestScreen4';
import SettingScreen from './SettingScreen';
import NotificationScreen from './NotificationScreen';
import CalendarScreen from './CalenderScreen';

const Tab = createBottomTabNavigator();

const MainNavigator = ({ route }) => {
    const { screen } = route.params;
    const [initialRouteName, setInitialRouteName] = React.useState(screen);
    const [isAdmin, setIsAdmin] = React.useState(screen === 'Main_OP');

    return (
        <Tab.Navigator initialRouteName={initialRouteName} screenOptions={{ tabBarActiveTintColor: 'black' }}>
            {!isAdmin && (
                <Tab.Screen
                    name="Main"
                    component={MainScreen}
                    options={{
                        title: '홈',
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (<Entypo name="home" size={size} color={color} />)
                    }}
                />
            )}
            {isAdmin && (
                <Tab.Screen
                    name="Main_OP"
                    component={MainOPScreen}
                    options={{
                        title: '홈',
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (<Entypo name="home" size={size} color={color} />)
                    }}
                />
            )}
            <Tab.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{
                    title: '캘린더',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<Entypo name="calendar" size={size} color={color} />)
                }}
            />
            {!isAdmin && (
                <Tab.Screen
                    name="Stat"
                    component={MyWorkStat}
                    options={{
                        title: '통계',
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (<Entypo name="bar-graph" size={size} color={color} />)
                    }}
                />
            )}
            {isAdmin && (
                <Tab.Screen
                    name="Stat_OP"
                    component={OPWorkStat}
                    options={{
                        title: '통계',
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (<Entypo name="bar-graph" size={size} color={color} />)
                    }}
                />
            )}
            <Tab.Screen
                name="Preferences"
                component={SettingScreen}
                options={{
                    title: '설정',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<Entypo name="cog" size={size} color={color} />)
                }}
            />
        </Tab.Navigator>
    );
};

export default MainNavigator;