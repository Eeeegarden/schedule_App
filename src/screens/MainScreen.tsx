import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

function MainScreen({ navigation, addNotification }) {
  const [workplaceText, setWorkplaceText] = useState('');
  const [notifications, setNotifications] = useState([]);

  const addNotificationAndWorkplace = () => {
    if (workplaceText.trim() !== '') {
      const newNotification = { id: Date.now().toString(), title: '알림 ', description: workplaceText };
      setNotifications([...notifications, newNotification]);
      addNotification(newNotification);
      setWorkplaceText('');
    }
  };

  const gotowork = () => {
    const newNotification = { id: Date.now().toString(), title: '출근', description: '박지완님이 출근했습니다.' };
    setNotifications([...notifications, newNotification]);
    addNotification(newNotification);
  };

  const gotohome = () => {
    const newNotification = { id: Date.now().toString(), title: '퇴근', description: '박지완님이 퇴근했습니다.' };
    setNotifications([...notifications, newNotification]);
    addNotification(newNotification);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.notificationButton} 
          onPress={() => navigation.navigate('NotificationScreen')}
        >
          <Text style={styles.notificationText}>●</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity 
          style={styles.card}
          onPress={() => alert('메모')}
        >
          <Text style={styles.cardDate}>05.31(금)</Text>
          <Text style={styles.cardTitle}>메모를 입력하세요.</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => alert('공지사항')}
        >
          <Text style={styles.cardTitle}>근무지 1 공지사항</Text>
          <Text style={styles.cardSubtitle}>공지사항 없음</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => alert('예정 근무')}
        >
          <Text style={styles.cardTitle}>근무지</Text>
          <Text style={styles.cardSubtitle}>예정 근무 : 2024-05-31</Text>
          <Text style={styles.cardSubtitle}>00:00 ~ 23:59</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.smallButton} onPress={(gotowork)}>
              <Text style={styles.smallButtonText}>출근</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallButton} onPress={(gotohome)}>
              <Text style={styles.smallButtonText}>퇴근</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* "근무지 추가" 버튼 및 TextInput 추가 */}
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="알림 보내기"
            onChangeText={(text) => setWorkplaceText(text)}
            value={workplaceText}
          />
          <TouchableOpacity style={styles.addButton} onPress={addNotificationAndWorkplace}>
            <Text style={styles.addButtonText}>추가</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#BFDBFE',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 0,
  },
  notificationButton: {
    marginTop: 4,
    marginRight: 16,
  },
  notificationText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  scrollView: {
    height: 650,
    width: '100%',
  },
  card: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    padding: 20,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 20,
    alignItems: 'center',
  },
  cardDate: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  cardSubtitle: {
    fontSize: 18,
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  smallButton: {
    marginHorizontal: 10,
  },
  smallButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    height: 80,
    backgroundColor: '#BFDBFE',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  footerButton: {
    width: 72,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#6495ED',
    padding: 10,
    borderRadius: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MainScreen;