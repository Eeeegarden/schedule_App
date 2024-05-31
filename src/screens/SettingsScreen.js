import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Handle logout logic here
    // For example, clear user session, navigate to login screen, etc.
    alert('Logged out');
  };

  const handleContact = () => {
    // Handle contact logic here
    alert('Contact us');
  };

  const handleNotificationSettings = () => {
    // Handle notification settings logic here
    alert('Notification settings');
  };

  const handleVersionInfo = () => {
    // Handle version info logic here
    alert('Version info');
  };

  const handleAttendanceNotification = (type) => {
    // Handle attendance notification logic here
    alert(`${type} 알림`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>이름 : 박지완</Text>
        <Text style={styles.headerText}>이메일 : w@naver.com</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.headerText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.middle}>
        <TouchableOpacity style={styles.middleItem} onPress={handleContact}>
          <Text style={styles.middleText}>문의하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.middleItem} onPress={handleNotificationSettings}>
          <Text style={styles.middleText}>알림 설정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.middleItem} onPress={handleVersionInfo}>
          <Text style={styles.middleText}>버전 정보</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => handleAttendanceNotification('출근')}>
          <Text style={styles.footerText}>출근 알림</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => handleAttendanceNotification('퇴근')}>
          <Text style={styles.footerText}>퇴근 알림</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  middle: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  middleItem: {
    marginBottom: 10,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  middleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  footerButton: {
    backgroundColor: '#6495ED',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default SettingsScreen;
