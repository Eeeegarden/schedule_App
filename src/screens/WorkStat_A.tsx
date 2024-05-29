import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
/* react-native-chart-kit을 install할 때 react-native-svg도 같이 install 해 주세요.*/

const WorkStat_A = () => {
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

    return(
      <View style={{paddingVertical: 25}}>
        <Text style={[styles.boxtitle]}>나의 근무 시간 통계</Text>
        <BarChart
          data={data}
          width={Dimensions.get('window').width - 20}
          height={220}
          fromZero={true}
          showValuesOnTopOfBars={true}
          chartConfig={{
            backgroundColor: '#C8C8C8',
            backgroundGradientFrom: '#C8C8C8',
            backgroundGradientTo: '#C8C8C8',
            barPercentage: 1.4,
            decimalPlaces: 0,
            color: (opacity = 1) => `#0FCBAE`,
            fillShadowGradient: `#0FCBAE`,
            fillShadowGradientOpacity: 1,
            labelColor: (opacity = 1) => '#000000',
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        />
        <Text style={[styles.boxtitle, {marginTop: 30}]}>나의 이달 예상 월급</Text>
        <View style={[styles.box, {height: 80}]}>
          <Text style={[{margin: 18, textAlign:'center', fontSize: 27, fontWeight: 'bold'}]}>
            {salary}원
          </Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
    box: {
      width: Dimensions.get('window').width - 20,
      backgroundColor:"#C8C8C8",
      borderRadius: 16,
      marginVertical: 7,
      alignSelf: 'center',
    },
  
    boxtitle: {
      marginHorizontal: 25,
      fontSize: 15, 
      fontWeight: 'bold', 
    },
  });
      
export default WorkStat_A;