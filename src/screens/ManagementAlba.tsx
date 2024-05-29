import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const ManagementAlba = () => {
    const [employeers, setemployeers] = useState([
      { name: '알바생1', status: '근무', wait: true, approval: '', datasets: [{worktime : [37, 90, 48, 67]}] },
      { name: '알바생2', status: '근무', wait: false, approval: '', datasets: [{worktime : [0, 0, 0, 32]}] },
      { name: '알바생3', status: '휴가', wait: false, approval: '', datasets: [{worktime : [0, 0, 0, 64]}] },
      { name: '알바생4', status: '휴가', wait: true, approval: '', datasets: [{worktime : [0, 0, 0, 82]}] },
      { name: '알바생5', status: '근무', wait: false, approval: '', datasets: [{worktime : [0, 0, 0, 12]}] },
      { name: '알바생6', status: '근무', wait: false, approval: '', datasets: [{worktime : [0, 0, 0, 80]}] },
      { name: '알바생7', status: '휴가', wait: true, approval: '', datasets: [{worktime : [0, 0, 0, 34]}] },
      { name: '알바생8', status: '휴가', wait: false, approval: '', datasets: [{worktime : [0, 0, 0, 25]}] },
      { name: '알바생9', status: '근무', wait: false, approval: '', datasets: [{worktime : [0, 0, 0, 44]}] },
      { name: '알바생10', status: '근무', wait: true, approval: '', datasets: [{worktime : [0, 0, 0, 58]}] },
    ]);

    const pressButton = (index: number, text: string) => {
        const newEmployeers = [...employeers];
        newEmployeers[index].approval = text;
        newEmployeers[index].wait = false;
    
        setemployeers(newEmployeers);
    };

    return (
        <View style={styles.container}>
        <View style={styles.table}>
            <View style={styles.row}>
            <View style={[styles.cell, styles.name]}>
                <Text style={[styles.text, styles.tableHeader]}>이름</Text>
            </View>
            <View style={[styles.cell, { flex: 5 }]}>
                <Text style={[styles.text, styles.tableHeader]}>상태</Text>
            </View>
            <View style={[styles.cell, { flex: 2, alignItems: 'center' }]}>
                <Text style={[styles.text, styles.tableHeader]}>확인</Text>
            </View>
            </View>
            {employeers.map((employeer, index) => (
            <View key={index} style={styles.row}>
                <View style={[[styles.cell, styles.name]]}>
                <Text style={styles.text}>{employeer.name}</Text>
                </View>
                <View style={[styles.cell, { flex: 5 }]}>
                <Text style={styles.text}>
                    {employeer.status}
                    {employeer.wait && <Text> - 승인 대기 중</Text>}
                </Text>
                </View>
                <View style={[styles.cell, { flex: 2, alignItems: 'center' }]}>
                {employeer.wait && employeer.approval === '' ? (
                    <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => pressButton(index, '승인')}>
                        <Text style={styles.button}>승인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pressButton(index, '거절')}>
                        <Text style={styles.button}>거절</Text>
                    </TouchableOpacity>
                    </View>
                ) : (
                    <Text style={styles.text}>{employeer.approval}</Text>
                )}
                </View>
            </View>
            ))}
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    table: {
        width: '90%',
        marginVertical: 15,
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        paddingVertical: 18,
        paddingHorizontal: 12,
    },
    tableHeader: {
        fontWeight: 'bold',
    },
    name:{
        flex: 2,
        backgroundColor:'#c0c0c0',
    },
    text: {
        textAlign: 'left',
    },
    buttons: {
        flexDirection: 'row',
    },
    button: {
        fontSize: 11,
        marginHorizontal: 5,
        paddingVertical: 1,
        paddingHorizontal: 6,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
    },
});
      
export default ManagementAlba;