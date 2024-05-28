import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const parttimeManagement = () => {
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

  /*  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */
  /*  #                                                                                       # */
  /*  # 화면 전환 구현을 아직 못 해서 변수를 수정하면 각각의 화면이 뜨게 코드를 나눠 작성하였습니다. # */
  /*  #                                                                                       # */
  /*  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */
  
  let screen = 2;   //1 = 알바관리 창, 2 = 근무통계표 알바생, 3 = 근무통계표 관리자

  /* 1. 알바 관리 - 알바생 이름, 상태 출력 / 버튼으로 승인, 거절 선택 시 확인 열에 글자 출력 */
  /* - 아직 알바생 정보 출력 및 삭제 기능은 만들지 못했습니다.                             */
  if (screen === 1){
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


  /* 2. 근무 통계표(알바생) - 나의 근무 시간 통계 그래프 및 예상 월급 */
  /* - 첫번째 알바생을 로그인한 알바생이라고 가정하고 작성하였습니다. */
  else if (screen === 2){
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
  )} 

  /* 3. 근무 통계표(관리자) - 알바생들의 아르바이트 근무 시간 목록       */
  /* - 시간 단위로 정보를 저장하였습니다. 추후 분 단위로 수정하겠습니다. */
  else{
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
  )}
};

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

export default parttimeManagement;

//npm run start
//android studio 이용