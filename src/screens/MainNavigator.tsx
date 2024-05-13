import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
{/* 화면 import */}
import MainScreen from './MainScreen';
import MainOPScreen from './MainOPScreen';
import TestScreen1 from './TestScreen1';
import TestScreen2 from './TestScreen2';
import TestScreen3 from './TestScreen3';
import TestScreen4 from './TestScreen4';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
    {/* 테스트용 관리자 변수 */}
    const isAdmin = true;
    {/* 초기 탭을 관리자 권한에 따라 변경 */}
    const initialRouteName = isAdmin ? "Main_OP" : "Main";

    return (
        <Tab.Navigator 
        initialRouteName={initialRouteName}
        screenOptions={{tabBarActiveTintColor: 'black'}}>
            {!isAdmin && <Tab.Screen name="Main" component={MainScreen} options={{title: '홈', headerShown: false, tabBarIcon: ({color, size}) => (<Entypo name="home" size={size} color={color}/>)}}/>}
            {isAdmin && <Tab.Screen name="Main_OP" component={MainOPScreen} options={{title: '홈', headerShown: false, tabBarIcon: ({color, size}) => (<Entypo name="home" size={size} color={color}/>)}}/>}
            <Tab.Screen name="Calendar" component={TestScreen1} options={{title: '캘린더', headerShown: false, tabBarIcon: ({color, size}) => (<Entypo name="calendar" size={size} color={color}/>)}}/>
            {!isAdmin && <Tab.Screen name="Stat" component={TestScreen2} options={{title: '통계', headerShown: false, tabBarIcon: ({color, size}) => (<Entypo name="bar-graph" size={size} color={color}/>)}}/>}
            {isAdmin && <Tab.Screen name="Stat_OP" component={TestScreen3} options={{title: '통계', headerShown: false, tabBarIcon: ({color, size}) => (<Entypo name="bar-graph" size={size} color={color}/>)}}/>}
            <Tab.Screen name="Preferences" component={TestScreen4} options={{title: '설정', headerShown: false, tabBarIcon: ({color, size}) => (<Entypo name="cog" size={size} color={color}/>)}}/>
        </Tab.Navigator>
    )
}

export default MainNavigator;