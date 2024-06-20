import React, { useState,useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { forHorizontalIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


function MainScreen({ navigation, addNotification }) {
  const [workplace, setWorkplace] = useState('');
  const [workplaceText, setWorkplaceText] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [businessNumberInputVisible, setBusinessNumberInputVisible] = useState(false);
  const [businessNumber, setBusinessNumber] = useState('');

  useEffect(() => {
    const fetchUserWorkplace = async () => {
      const userDoc = await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .get();
  
      if (userDoc.exists) {
        setWorkplace(userDoc.data().workplace);
      }
    };
  
    fetchUserWorkplace();
  }, []);

  
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

  const handleAddWorkplace = () => {
    setModalVisible(true); // 모달 열기
  };

  const handleBusinessNumberSubmit = async () => {
    try {
      const fetchedWorkplace = await firestore()
        .collection('workplace')
        .where('businessnumber', '==', businessNumber)
        .get();
  
      if (!fetchedWorkplace.empty) {
        const workplaceData = fetchedWorkplace.docs[0].data();
        setWorkplace(workplaceData.workplacename);
  
        // Firestore에 사용자 workplace 업데이트
        await firestore()
          .collection('users')
          .doc(auth().currentUser.uid)
          .update({ workplace: workplaceData.workplacename });
  
        setModalVisible(false); // 모달 닫기
      } else {
        alert('유효한 사업자 번호가 아닙니다.');
      }
    } catch (error) {
      console.error(error);
      alert('사업자 번호 등록 중 오류가 발생했습니다.');
    }
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
          <View style={styles.row}>
          <Text style={styles.cardTitle}>근무지</Text><TouchableOpacity style={styles.manageButton} onPress={handleAddWorkplace}>
                <Text style={styles.manageButtonText}>근무지 추가</Text>
        </TouchableOpacity>
        </View>
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{color:'black'}}>사업자 번호를 입력하세요</Text>
                        <TextInput
                            style={styles.businessNumberInput}
                            onChangeText={setBusinessNumber}
                        />
                        <TouchableOpacity style={styles.submitButton} onPress={handleBusinessNumberSubmit}>
                            <Text style={styles.submitButtonText}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%',
  },
  submitButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
  },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
  },
  businessNumberInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 20,
    marginRight: 10,
    
  },
  manageButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    marginLeft: 30,
    width:'40%'
  },
  manageButtonText: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
  },
  
});

export default MainScreen;