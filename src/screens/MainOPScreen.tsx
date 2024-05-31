import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput,Alert,Modal} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ManagementAlba from './ManagementAlba';

const MainOPScreen = ({navigation}) => {
    const [workplace, setWorkplace] = useState('');
    const [businessNumberInputVisible, setBusinessNumberInputVisible] = useState(false);
    const [businessNumber, setBusinessNumber] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [noticeText, setNoticeText] = useState('');
    const [numberNotifications, setNumberNotifications] = useState(3);

    // 현재 로그인한 사용자의 UID 가져오기
    const userUid = auth().currentUser.uid;

    {/* 오늘 날짜 불러오는 함수*/}
    const getTodayDate = () => {
        const today = new Date();
        return today.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleManageAlba = () => {
        // 알바 관리 스크린으로 이동
        navigation.navigate('ManagementAlba');
    };

    const fetchWorkplaceAndNotice = async () => {
        try {
            // owners 컬렉션에서 해당 사용자의 문서 가져오기
            const ownerDoc = await firestore().collection('owners').doc(userUid).get();
            
            if (!ownerDoc.exists) {
                console.log('해당 사용자의 데이터가 없습니다.');
                return;
            }
            
            const ownerData = ownerDoc.data();
            console.log('Owner Data:', ownerData); // Owner 데이터 확인
            
            // owners 컬렉션에서 가져온 사용자의 businessNumber 값으로 workplace 컬렉션에서 문서 가져오기
            if (ownerData && ownerData.businessnumber) {
                const workplaceDoc = await firestore().collection('workplace').where('businessnumber', '==', ownerData.businessnumber).get();
                
                if (workplaceDoc.empty) {
                    // 해당 businessNumber에 맞는 근무지가 없는 경우
                    console.log('uid 에러 : 해당 businessNumber에 맞는 근무지가 없습니다.');
                    return;
                }
        
                // 근무지 문서에서 notice 값을 가져와서 noticeText 상태 업데이트
                const workplaceData = workplaceDoc.docs[0].data(); // 첫 번째 문서의 데이터 가져오기
                console.log('Workplace Data:', workplaceData); // 근무지 데이터 확인
                setWorkplace(workplaceData.businessnumber); // 근무지 업데이트
                setNoticeText(workplaceData.notice); // 공지사항 업데이트
            } else {
                console.log('사용자 데이터 또는 사업자 번호가 없습니다.');
            }
        } catch (error) {
            console.error('Error fetching workplace and notice:', error);
        }
    };    

    useEffect(() => {
        // 화면이 마운트될 때 한 번 실행하여 근무지와 공지사항 가져오기
        fetchWorkplaceAndNotice();
    }, []);

    {/* 근무 공지사항 저장 함수 */}
    const saveNotice = async () => {
        try {
            // owners 컬렉션에서 해당 사용자의 문서 가져오기
            const ownerDoc = await firestore().collection('owners').doc(userUid).get();
            
            if (!ownerDoc.exists) {
                console.log('해당 사용자의 데이터가 없습니다.');
                return;
            }
            const ownerData = ownerDoc.data();
            
            // 현재 사용자의 businessNumber 값을 기준으로 근무지 문서를 찾음
            const workplaceDoc = await firestore().collection('workplace').where('businessnumber', '==', ownerData.businessnumber).get();
    
            if (workplaceDoc.empty) {
                // 해당 businessNumber에 맞는 근무지가 없는 경우
                console.log('공지 에러 : 해당 businessNumber에 맞는 근무지가 없습니다.');
                return;
            }
    
            // 근무지 문서가 있는 경우, 첫 번째 문서의 reference를 가져옴
            const workplaceRef = workplaceDoc.docs[0].ref;
    
            // 근무지 문서의 notice 필드를 업데이트
            await workplaceRef.update({ notice: noticeText });
            console.log('공지사항이 업데이트되었습니다:', noticeText); // 업데이트된 공지사항 로그로 출력
    
            // 알림 메시지 표시
            Alert.alert('공지사항이 저장되었습니다.');
        } catch (error) {
            console.error('Error saving notice:', error);
            // 에러 발생 시 알림 메시지 표시
            Alert.alert('공지사항을 저장하는 중에 오류가 발생했습니다.');
        }
    };    

    const handleAddWorkplace = () => {
        setModalVisible(true); // 모달 열기
    };

    const handleBusinessNumberSubmit = () => {
        // 여기서는 임의의 로직으로 사업자 번호에 맞는 근무지를 가져온다고 가정
        const fetchedWorkplace = ''; // 사업자 번호에 따른 근무지 가져오기
        setWorkplace(fetchedWorkplace); // 근무지 업데이트
        setModalVisible(false); // 모달 닫기
    };

    return (
        <View style={styles.container}>
            {/* 우측 상단의 알림 아이콘과 알림 개수 */}
            <TouchableOpacity style={styles.notificationButton}>
                <Icon name="bell" size={30} color="black"/> 
                {/* 알림 개수 표시 */}
                {
                    numberNotifications > 0 && (
                        <View style={styles.notificationBadge}>
                            <Text style={styles.notificationText}>{numberNotifications}</Text>
                        </View>
                    )
                }
            </TouchableOpacity>
    
            {/* 오늘 근무하는 사람 텍스트와 날짜 */}
            <View style={styles.titleContainer}>
                <Text style={styles.todayText}>오늘 근무하는 사람</Text>
            </View>
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{getTodayDate()}</Text>
            </View>
    
            {/* 알바 관리 버튼 */}
            <TouchableOpacity style={styles.manageButton} onPress={handleManageAlba}>
                <Text style={styles.manageButtonText}>알바 관리</Text>
            </TouchableOpacity>
    
            {/* 근무 공지사항 */}
            <View style={styles.noticeHeader}>
                <Text style={styles.noticeText}>근무 공지사항</Text>
                <TouchableOpacity style={styles.saveButton} onPress={saveNotice}>
                    <Text style={styles.saveButtonText}>저장</Text>
                </TouchableOpacity>
            </View>
            
            {/* 텍스트 입력 상자 */}
            <View>
                <TextInput
                    style={styles.noticeInput}
                    placeholder='공지사항을 입력해주세요.'
                    value={noticeText}
                    onChangeText={setNoticeText}
                    multiline={true}
                />
            </View>

            {/* 근무지 추가 버튼 */}
            <TouchableOpacity style={styles.manageButton} onPress={handleAddWorkplace}>
                <Text style={styles.manageButtonText}>근무지 추가</Text>
            </TouchableOpacity>

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
        </View>
    );    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    notificationButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    notificationBadge: {
        backgroundColor: 'red',
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: -5,
        right: -5
    },
    notificationText: {
        color: 'white',
        fontSize: 12
    },
    titleContainer: {
        width: '80%',
        alignItems: 'flex-start', 
        marginBottom: 10,
    },
    todayText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'left'
    },
    dateContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        width: '80%',
        textAlign: 'center'
    },
    dateText: {
        fontSize: 18,
        textAlign: 'left'
    },
    manageButton: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        width:'80%'
    },
    manageButtonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    noticeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginRight: '20%',
    },
    noticeInput: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        width: '100%',
        minHeight: 100,
        maxHeight: 200,
    },
    noticeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
    },
    saveButtonText: {
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
    submitButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
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
});


export default MainOPScreen;