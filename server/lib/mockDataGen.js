const mongoose = require('mongoose');
const moment = require('moment');
const edukit1SensorDataSchema = require('../controller/models/mongo_edukit1SensorSchema');
// const edukit2SensorDataSchema = require('../controller/models/mongo_edukit2SensorSchema');
const ProductSchema = require('../controller/models/mongo_productschema');

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
  // const currentDateTime = moment().tz('Asia/Seoul'); // 한국 시간대(KST)를 사용하여 현재 시간을 얻음

  // // 60일 전부터 현재까지의 데이터 생성
  // const startDate = moment(currentDateTime).subtract(60, 'days');
  // const endDate = currentDateTime;

  // 원하는 시작 날짜와 종료 날짜 설정
  let startDate = moment('2023-07-01T00:00:00').tz('Asia/Seoul'); // 시작 날짜 설정
  const endDate = moment('2023-09-15T15:59:59').tz('Asia/Seoul'); // 종료 날짜 설정

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

  // // 데이터 생성 및 삽입
  // const currentDateTime = moment().tz('Asia/Seoul'); // 한국 시간대(KST)를 사용하여 현재 시간을 얻음
  // // 60일 전부터 현재까지의 데이터 생성
  // let startDate = moment(currentDateTime).subtract(60, 'days');
  // const endDate = currentDateTime;
  const dataToInsert = [];

  // 원하는 시작 날짜와 종료 날짜 설정
  let startDate = moment('2023-09-18T00:00:00').tz('Asia/Seoul'); // 시작 날짜 설정
  const endDate = moment('2023-09-19T23:59:59').tz('Asia/Seoul'); // 종료 날짜 설정

  function generateProduct(factory, line, currentDate) {
    const ProductName = `product - ${Date.now()}`;
    const Manufacturer = factory;
    const Category = line;
    const createdAt = currentDate.format('YYYY-MM-DDTHH:mm:ss.SSS+09:00');
    return {
      ProductName,
      Manufacturer,
      Category,
      createdAt,
    };
  }
  while (startDate.isBefore(endDate)) {
    let count = [false, false];
    // Factory 1
    dataToInsert.push(generateProduct('edukit1', 'line1', startDate));
    // Factory 2
    dataToInsert.push(generateProduct('edukit2', 'line1', startDate));

    startDate = startDate.add(25, 'seconds');

    const num1 = Math.random();

    // line 2 확률 생산

    if (num1 < 0.98) {
      // 확률을 98%로 조정
      // Factory 1
      dataToInsert.push(generateProduct('edukit1', 'line2', startDate));
      count[0] = true;
    }
    // Factory 2
    if (num1 < 0.98) {
      // 확률을 98%로 조정
      // Factory 1
      dataToInsert.push(generateProduct('edukit2', 'line2', startDate));
      count[1] = true;
    }

    startDate = startDate.add(25, 'seconds');

    // line 3 확률 생산 -> line2 가 생성되야 실행
    if (count[0] == true) {
      const num2 = Math.random();
      if (num2 < 0.98) {
        // 확률을 98%로 조정
        // Factory 1
        dataToInsert.push(generateProduct('edukit1', 'line3', startDate));
      }
    }
    if (count[1] == true) {
      const num2 = Math.random();
      if (num2 < 0.98) {
        // 확률을 98%로 조정
        // Factory 2
        dataToInsert.push(generateProduct('edukit2', 'line3', startDate));
      }
    }
    startDate = startDate.add(50, 'seconds');
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
