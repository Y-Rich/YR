const mongoose = require('mongoose');
const moment = require('moment');
const edukit1SensorDataSchema = require('../controller/models/mongo_edukit1SensorSchema');
const edukit2SensorDataSchema = require('../controller/models/mongo_edukit2SensorSchema');

function mockDataGen_HumiAndTempAndPar() {
  // 스키마 정의
  // const sensorDataSchema = new mongoose.Schema({
  //   Humidity: Number,
  //   Temperature: Number,
  //   Particulates: Number,
  //   createdAt: Date,
  // });
  const SensorData = mongoose.model('Edukit1Sensor', edukit1SensorDataSchema);
  // const SensorData = mongoose.model('Edukit2Sensor', edukit2SensorDataSchema);

  // 데이터 생성 및 삽입
  const currentDateTime = moment().tz('Asia/Seoul'); // 한국 시간대(KST)를 사용하여 현재 시간을 얻음

  // 60일 전부터 현재까지의 데이터 생성
  const startDate = moment(currentDateTime).subtract(60, 'days');
  const endDate = currentDateTime;

  const dataToInsert = [];

  let currentDate = startDate;

  // 데이터 생성 및 배열에 추가
  while (currentDate.isBefore(endDate)) {
    const Humidity = Math.floor(Math.random() * 11) + 30; // 30~40 사이의 랜덤값
    const Temperature = Math.floor(Math.random() * 6) + 20; // 20~25 사이의 랜덤값
    const Particulates = Number(Math.random().toFixed(5)); // 0~0.9 사이의 랜덤값을 5자리로 제한

    dataToInsert.push({
      Humidity,
      Temperature,
      Particulates,
      createdAt: currentDate.format('YYYY-MM-DDTHH:mm:ss.SSS+09:00'), // YYYY-MM-DD HH:mm:ss   KST 형식으로 포맷팅
    });
    // 다음 데이터를 60초 후로 설정
    currentDate = currentDate.add(60, 'seconds');
  }

  // 데이터 배열을 일괄 삽입
  SensorData.insertMany(dataToInsert)
    .then(() => {
      console.log(`Inserted data for the past 60 days.`);
    })
    .catch((error) => {
      console.error(`Error inserting data: ${error}`);
    });
}

module.exports = mockDataGen_HumiAndTempAndPar;
