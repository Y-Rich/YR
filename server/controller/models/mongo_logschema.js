const mongoose = require('mongoose');
const { Schema } = mongoose;

// 9시간을 더한 현재 시간을 얻기 위한 함수
const getCurrentTimeWithOffset = () => {
  const currentTime = new Date();
  currentTime.setHours(currentTime.getHours() + 9); // 9시간 추가
  return currentTime.toISOString();
};

//- **사용자 접속이력** : 로그인 , 로그아웃 , 제어기능 사용내역 , 재고 조회 이력
// -> 로그인 , 로그아웃 ,
// - **생산관련 이력** : 공정 시작시간 , 종료시간 / 총 가동시간  / 제품 각 공정별 생산기록

const LogsSchema = new Schema({
  //employee
  employeeID: Number,
  name: String,
  email: String,
  positionID: Number,
  control: String, //제어기능 상세내역 - 뭘 제어했는지
  view: String, //  조회기능 상세내역 - 뭘 조회했는지
  //factory
  ProductName: String, //`product - ${Date.now()}`,
  Manufacturer: String, //'edukit2',
  startAt: String,
  endAt: String,
  //common - 공통사항
  Category: String, // employ , factory로 두 이력을 구분
  type: String,
  // employee 타입 내역 : [ login / logout / control - 에듀킷1,2 나눠서  / inventory-view(조회) / inventory-record(등록) ]
  // factory 타입 내역 : [에듀킷1,2 나눠서 -> 가동 : process-start , 중지: process-stop , 생산기록:line1,line2,line3 , 가동,중지 조회: time ]
  // 가동 중지 조회  ->   time-recent:  최근 가동시간, 최근 중지시간 ,최근가동시간 기준 현재까지 가동시간 , time-list  가동이력 , 중지이력,
  createdAt: {
    type: String,
    default: getCurrentTimeWithOffset, // 9시간 추가된 현재 시간을 기본값으로 사용
    immutable: true,
  },
});
//virtual('position'). 가상필드 추가
LogsSchema.virtual('position').get(function () {
  switch (this.positionID) {
    case 1:
      return 'manager';
    case 3:
      return 'worker';
    case 2:
      return 'supervisor';
    case 4:
      return 'supervisor_fac1';
    case 5:
      return 'supervisor_fac2';
    case 6:
      return 'worker_fac1_line1';
    case 7:
      return 'worker_fac1_line2';
    case 8:
      return 'worker_fac1_line3';
    case 9:
      return 'worker_fac2_line1';
    case 10:
      return 'worker_fac2_line2';
    case 11:
      return 'worker_fac2_line3';
    default:
      return 'unknown';
  }
});

module.exports = LogsSchema;
