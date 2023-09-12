const express = require('express');
const router = express.Router();
const logger = require('../lib/logger');
const edukit1Service = require('../controller/service/edukit1Service');
// router - edukit1 - 센서 데이터 조회
// 원하는 센서 데이터 값을 프로퍼티 키로 주고 , 제공받기 원하는 기간 데이터 값을 프로퍼티 value에 배열로 준다.
router.post('/edukit1/search', async (req, res) => {
  try {
    const params = req.body;
    // fieldtype : Temperature , Humidity , Particulates
    // datetype : 'Day', 'Week', 'Month'
    const allowedFieldTypes = ['Humidity', 'Temperature', 'Particulates'];
    const allowedDateTypes = ['Day', 'Week', 'Month'];
    // 프로퍼티 키 검사
    for (const fieldType in params) {
      if (!allowedFieldTypes.includes(fieldType)) {
        throw new Error(
          `fieldtype "${fieldType}" incorrect. expected: [Humidity, Temperature, Particulates]`,
        );
      }
      const [dateType, dateValue] = params[fieldType];
      // dateType 검사
      if (!allowedDateTypes.includes(dateType)) {
        throw new Error(
          `datetype "${dateType}" incorrect. expected: [Day, Week, Month]`,
        );
      }
    }
    let dataSet = {};
    // sensorDataSearch
    for (const sensorData in params) {
      if ('Temperature' === sensorData) {
        if (params[sensorData][0] === 'Day') {
          const parameter = { Temperature: params.Temperature[1] };
          // 1. 온도 일별 데이터 조회 - 로직 호출
          const result = await edukit1Service.searchDailyAvg(parameter);
          dataSet['dailyAvgTemp'] = result;
        } else if (params[sensorData][0] === 'Week') {
          // 1. 온도 주간 데이터 조회 - 로직 호출
          const parameter = { Temperature: params.Temperature[1] };
          const result = await edukit1Service.searchWeeklyAvg(parameter);
          dataSet['weeklyAvgTemp'] = result;
        } else if (params[sensorData][0] === 'Month') {
          // 1. 온도 월간 데이터 조회 - 로직 호출
          const parameter = { Temperature: params.Temperature[1] };
          const result = await edukit1Service.searchMonthlyAvg(parameter);
          dataSet['monthlyAvgTemp'] = result;
        }
      } else if ('Humidity' === sensorData) {
        if (params[sensorData][0] === 'Day') {
          const parameter = { Humidity: params.Humidity[1] };
          // 2. 습도 일별 데이터 조회 - 로직 호출
          const result = await edukit1Service.searchDailyAvg(parameter);
          dataSet['dailyAvgHumi'] = result;
        } else if (params[sensorData][0] === 'Week') {
          // 2. 습도 주간 데이터 조회 - 로직 호출
          const parameter = { Humidity: params.Humidity[1] };
          const result = await edukit1Service.searchWeeklyAvg(parameter);
          dataSet['weeklyAvgHumi'] = result;
        } else if (params[sensorData][0] === 'Month') {
          // 2. 습도 월간 데이터 조회 - 로직 호출
          const parameter = { Humidity: params.Humidity[1] };
          const result = await edukit1Service.searchMonthlyAvg(parameter);
          dataSet['monthlyAvgTemp'] = result;
        }
      } else if ('Particulates' === sensorData) {
        if (params[sensorData][0] === 'Day') {
          const parameter = { Particulates: params.Particulates[1] };
          // 3. 미세먼지 일별 데이터 조회 - 로직 호출
          const result = await edukit1Service.searchDailyAvg(parameter);
          dataSet['dailyAvgPar'] = result;
        } else if (params[sensorData][0] === 'Week') {
          // 3. 미세먼지 주간 데이터 조회 - 로직 호출
          const parameter = { Particulates: params.Particulates[1] };
          const result = await edukit1Service.searchWeeklyAvg(parameter);
          dataSet['weeklyAvgPar'] = result;
        } else if (params[sensorData][0] === 'Month') {
          // 3. 미세먼지 월간 데이터 조회 - 로직 호출
          const parameter = { Particulates: params.Particulates[1] };
          const result = await edukit1Service.searchMonthlyAvg(parameter);
          dataSet['monthlyAvgTemp'] = result;
        }
      }
    }
    return res.status(200).json(dataSet);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
