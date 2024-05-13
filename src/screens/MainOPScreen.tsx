import * as React from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const MainOPScreen = () => {
    {/* 오늘 날짜 불러오는 함수*/}
    const getTodayDate = () => {
        const today = new Date();
        return today.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    {/* 근무 공지사항 텍스트 상태 */}
    const [noticeText, setNoticeText] = useState('');
    {/* 알림 개수 변수 */}
    const numberNotifications = 3;

    {/* 근무 공지사항 저장 함수 */}
    const saveNotice = () => {
        {/* 나중에 DB 저장 코드*/}
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
            <TouchableOpacity style={styles.manageButton}>
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
        alignItems: 'flex-start', //왼쪽 정렬
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
    }
});

export default MainOPScreen;