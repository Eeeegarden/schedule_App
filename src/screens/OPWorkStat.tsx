import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const OPWorkStat = () => {
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

    const employee1Data = employeers.find(employee => employee.name === '알바생1').datasets[0].worktime;

    const hourwage = 9860;    // 시급
    let expected = employee1Data[3]; // 이번 달 근무 시간
    let salary = expected * hourwage;  // 근무 시간 * 시급

    const data = {
      labels: ['2024-01', '2024-02', '2024-03', '2024-04'],
      datasets: [{
        data: employee1Data,
      }]
    };

    return (
      <View style={styles.container}>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={[styles.cell]}>
              <Text style={[styles.text, styles.tableHeader]}>이 달의 아르바이트 근무 시간</Text>
            </View>
          </View>
          {employeers.map((employeer, index) => (
            <View key={index} style={styles.row}>
              <View style={[[styles.cell, styles.name]]}>
                <Text style={styles.text}>{employeer.name}</Text>
              </View>
              <View style={[styles.cell, { flex: 5 }]}>
                <Text style={styles.text}>
                  {employeer.datasets[0].worktime[3]}시간
                </Text>
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
  });
      
export default OPWorkStat;