const mongoose = require('mongoose');
const moment = require('moment');
// const edukit1SensorDataSchema = require('../controller/models/mongo_edukit1SensorSchema');
const edukit2SensorDataSchema = require('../controller/models/mongo_edukit2SensorSchema');
const ProductSchema = require('../controller/models/mongo_productschema');

function mockDataGen_HumiAndTempAndPar() {
  // 스키마 정의
  // const sensorDataSchema = new mongoose.Schema({
  //   Humidity: Number,
  //   Temperature: Number,
  //   Particulates: Number,
  //   createdAt: Date,
  // });
  // const SensorData = mongoose.model('Edukit1Sensor', edukit1SensorDataSchema);
  const SensorData = mongoose.model('Edukit2Sensor', edukit2SensorDataSchema);

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

function mockDataGen_Products() {
  const Product = mongoose.model('Products', ProductSchema);

  // 데이터 생성 및 삽입
  const currentDateTime = moment().tz('Asia/Seoul'); // 한국 시간대(KST)를 사용하여 현재 시간을 얻음

  // 60일 전부터 현재까지의 데이터 생성
  const startDate = moment(currentDateTime).subtract(60, 'days');
  const endDate = currentDateTime;

  const dataToInsert = [];

  let currentDate = startDate;
  let text1 = ['edukit2', 'edukit1'];
  let text2 = ['line1', 'line2', 'line3'];

  // 데이터 생성 및 배열에 추가
  while (currentDate.isBefore(endDate)) {
    let num = Math.random();
    let tx1, tx2;
    if (num >= 0.45) {
      tx1 = text1[0];
    } else {
      tx1 = text1[1];
    }
    // 라인별 생산량 - line1>=line2>=line3
    if (num >= 0.6) {
      tx2 = text2[0];
    } else if (num >= 0.3) {
      tx2 = text2[1];
    } else {
      tx2 = text2[2];
    }
    const ProductName = `product - ${Date.now()}`;
    const Manufacturer = `${tx1}`;
    const Category = `${tx2}`;

    dataToInsert.push({
      ProductName,
      Manufacturer,
      Category,
      createdAt: currentDate.format('YYYY-MM-DDTHH:mm:ss.SSS+09:00'), // YYYY-MM-DD HH:mm:ss   KST 형식으로 포맷팅
    });
    // 다음 데이터를 15초 후로 설정
    // 24*60*60 초 = 86400 , 3등분 ->28800 , 1일 웨이퍼 평균 생산량 약 2000개 ->약 15초마다 생산
    currentDate = currentDate.add(15, 'seconds');
  }

  // 데이터 배열을 일괄 삽입
  Product.insertMany(dataToInsert)
    .then(() => {
      console.log(`Inserted data for the past 60 days.`);
    })
    .catch((error) => {
      console.error(`Error inserting data: ${error}`);
    });
}

module.exports = { mockDataGen_HumiAndTempAndPar, mockDataGen_Products };
