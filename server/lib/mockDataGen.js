const mongoose = require('mongoose');
const moment = require('moment');
const sensorDataSchema = require('../controller/models/edukit1_sensor_schema');

function mockDataGen_HumiAndTemp() {
  // 스키마 정의
  // const sensorDataSchema = new mongoose.Schema({
  //   Humidity: Number,
  //   Temperature: Number,
  //   createdAt: Date,
  // });
  const SensorData = mongoose.model('Edukit1Sensor', sensorDataSchema);

  // 데이터 생성 및 삽입
  const currentDateTime = moment().tz('Asia/Seoul'); // 한국 시간대(KST)를 사용하여 현재 시간을 얻음

  // 14일 전부터 현재까지의 데이터 생성
  const startDate = moment(currentDateTime).subtract(14, 'days');
  const endDate = currentDateTime;

  const dataToInsert = [];

  let currentDate = startDate;

  // 데이터 생성 및 배열에 추가
  while (currentDate.isBefore(endDate)) {
    const Humidity = Math.floor(Math.random() * 11) + 30; // 30~40 사이의 랜덤값
    const Temperature = Math.floor(Math.random() * 6) + 20; // 20~25 사이의 랜덤값

    dataToInsert.push({
      Humidity,
      Temperature,
      createdAt: currentDate.format('YYYY-MM-DDTHH:mm:ss.SSS+09:00'), // YYYY-MM-DD HH:mm:ss   KST 형식으로 포맷팅
    });
    // 다음 데이터를 30초 후로 설정
    currentDate = currentDate.add(30, 'seconds');
  }

  // 데이터 배열을 일괄 삽입
  SensorData.insertMany(dataToInsert)
    .then(() => {
      console.log(`Inserted data for the past 14 days.`);
    })
    .catch((error) => {
      console.error(`Error inserting data: ${error}`);
    });
}

module.exports = mockDataGen_HumiAndTemp;
