const express = require('express');
const router = express.Router();
const edukit1Service = require('../controller/service/edukit1Service');
const edukit2Service = require('../controller/service/edukit2Service');

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
// router - edukit1 - 투입량 , 생산량 , 불량률 , 라인별 공장별 생산량 데이터 조회
router.post('/edukit1/search/production-data', async (req, res) => {
  try {
    const params = req.body;

    // fieldtype : LineProdRate  , Input ,Output , Line1defectRate ,Line2defectRate
    // datetype : 'Day', 'Week', 'Month'
    const allowedFieldTypes = [
      'LineProdRate',
      'Input',
      'Output',
      'Line1defectRate',
      'Line2defectRate',
    ];
    const allowedDateTypes = ['Day', 'Week', 'Month'];
    // 프로퍼티 키 검사
    for (const fieldType in params) {
      if (!allowedFieldTypes.includes(fieldType)) {
        throw new Error(
          `fieldtype "${fieldType}" incorrect. expected: ['LineProdRate', 'Input',"Output" , "Line1defectRate" ,"Line2defectRate"]`,
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
    // DataSearch
    for (const prodData in params) {
      // 테스트 완료
      if ('LineProdRate' === prodData) {
        if (params[prodData][0] === 'Day') {
          const parameter = {
            List: ['line1', 'line2', 'line3'],
            date: params.LineProdRate[1],
          };
          // 1. 라인별 생산량 일별 데이터 조회 - 로직 호출
          const result = await edukit1Service.searchDailyAvg_Prod(parameter);
          dataSet['dailyAvgLineProdRate'] = result;
        } else if (params[prodData][0] === 'Week') {
          // 1.  라인별 생산량 주간 데이터 조회 - 로직 호출
          const parameter = {
            List: ['line1', 'line2', 'line3'],
            date: params.LineProdRate[1],
          };
          const result = await edukit1Service.searchWeeklyAvg_Prod(parameter);
          dataSet['weeklyAvgLineProdRate'] = result;
        } else if (params[prodData][0] === 'Month') {
          // 1. 라인별 생산량 월간 데이터 조회 - 로직 호출
          const parameter = {
            List: ['line1', 'line2', 'line3'],
            date: params.LineProdRate[1],
          };
          const result = await edukit1Service.searchMonthlyAvg_Prod(parameter);
          dataSet['monthlyAvgLineProdRate'] = result;
        }
      }
      // 테스트 완료
      else if ('Input' === prodData) {
        if (params[prodData][0] === 'Day') {
          const parameter = {
            Category: 'line1',
            date: params.Input[1],
          };
          // 2. 자재투입량 일별 데이터 조회 - 로직 호출
          const result = await edukit1Service.searchDailyAvg_Prod(parameter);
          dataSet['dailyAvgInput'] = result;
        } else if (params[prodData][0] === 'Week') {
          // 2. 자재투입량 주간 데이터 조회 - 로직 호출
          const parameter = {
            Category: 'line1',
            date: params.Input[1],
          };
          const result = await edukit1Service.searchWeeklyAvg_Prod(parameter);
          dataSet['weeklyAvgInput'] = result;
        } else if (params[prodData][0] === 'Month') {
          // 2. 자재투입량 월간 데이터 조회 - 로직 호출
          const parameter = {
            Category: 'line1',
            date: params.Input[1],
          };
          const result = await edukit1Service.searchMonthlyAvg_Prod(parameter);
          dataSet['monthlyAvgInput'] = result;
        }
      }
      //테스트 완료
      else if ('Output' === prodData) {
        if (params[prodData][0] === 'Day') {
          const parameter = {
            Category: 'line3',
            date: params.Output[1],
          };
          // 3. 완제품 일별 데이터 조회 - 로직 호출
          const result = await edukit1Service.searchDailyAvg_Prod(parameter);
          dataSet['dailyAvgOutput'] = result;
        } else if (params[prodData][0] === 'Week') {
          // 3. 완제품 주간 데이터 조회 - 로직 호출
          const parameter = {
            Category: 'line3',
            date: params.Output[1],
          };
          const result = await edukit1Service.searchWeeklyAvg_Prod(parameter);
          dataSet['weeklyAvgOutput'] = result;
        } else if (params[prodData][0] === 'Month') {
          // 3. 완제품 월간 데이터 조회 - 로직 호출
          const parameter = {
            Category: 'line3',
            date: params.Output[1],
          };
          const result = await edukit1Service.searchMonthlyAvg_Prod(parameter);
          dataSet['monthlyAvgOutput'] = result;
        }
      }
      //테스트 완료
      else if ('Line1defectRate' === prodData) {
        if (params[prodData][0] === 'Day') {
          const parameter = {
            Defect: ['line1', 'line2'],
            date: params.Line1defectRate[1],
          };
          // 4. 1공정 불량률 일별 데이터 조회 - 로직 호출
          const result = await edukit1Service.searchDailyAvg_Prod(parameter);
          dataSet['dailyAvgLine1defectRate'] = result;
        } else if (params[prodData][0] === 'Week') {
          // 4. 1공정 불량률 주간 데이터 조회 - 로직 호출
          const parameter = {
            Defect: ['line1', 'line2'], //순서 지켜야함
            date: params.Line1defectRate[1],
          };
          const result = await edukit1Service.searchWeeklyAvg_Prod(parameter);
          dataSet['weeklyAvgLine1defectRate'] = result;
        } else if (params[prodData][0] === 'Month') {
          // 4. 1공정 불량률 월간 데이터 조회 - 로직 호출
          const parameter = {
            Defect: ['line1', 'line2'],
            date: params.Line1defectRate[1],
          };
          const result = await edukit1Service.searchMonthlyAvg_Prod(parameter);
          dataSet['monthlyAvgLine1defectRate'] = result;
        }
      }
      //테스트 완료
      else if ('Line2defectRate' === prodData) {
        if (params[prodData][0] === 'Day') {
          const parameter = {
            Defect: ['line2', 'line3'],
            date: params.Line2defectRate[1],
          };
          // 5. 자재투입량 일별 데이터 조회 - 로직 호출
          const result = await edukit1Service.searchDailyAvg_Prod(parameter);
          dataSet['dailyAvgLine2defectRate'] = result;
        } else if (params[prodData][0] === 'Week') {
          // 5. 자재투입량 주간 데이터 조회 - 로직 호출
          const parameter = {
            Defect: ['line2', 'line3'],
            date: params.Line2defectRate[1],
          };
          const result = await edukit1Service.searchWeeklyAvg_Prod(parameter);
          dataSet['weeklyAvgLine2defectRate'] = result;
        } else if (params[prodData][0] === 'Month') {
          // 5. 자재투입량 월간 데이터 조회 - 로직 호출
          const parameter = {
            Defect: ['line2', 'line3'],
            date: params.Line2defectRate[1],
          };
          const result = await edukit1Service.searchMonthlyAvg_Prod(parameter);
          dataSet['monthlyAvgLine2defectRate'] = result;
        }
      }
    }
    return res.status(200).json(dataSet);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// - 라인별 생산량(lineProdRate) -> 라인별로 집계된 결과 조회
// - 자재 출하량(input) -> 일자별로 "line1"의 전체 데이터 조회
// - 일별 1호기 불량률(line1defectRate) -> 당일 1공정 생산량 - 2공정 생산량
// - 일별 2호기 불량률(line2defectRate) -> 당일 2공정 생산량 - 3공정 생산량
// - [ 실제로는 1호기 불량인데 3호기에서 피킹하는 경우가 있으나 1호기 불량이면 3호기에서
// 피킹 안한다고 가정한다.]
// - 일별 생산량(output) -> category "line3"의 전체 데이터 조회

// [요청 예시]
// {
// "LineProdRate" : ["Day" , "2023-09-11"],
// "FacProdRate" : ["Week" , "2023-09-11"],
// "Output":["Month" , "2023-09-11"]
// }

// router - edukit2 - 센서 데이터 조회
router.post('/edukit2/search', async (req, res) => {
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
          const result = await edukit2Service.searchDailyAvg(parameter);
          dataSet['dailyAvgTemp'] = result;
        } else if (params[sensorData][0] === 'Week') {
          // 1. 온도 주간 데이터 조회 - 로직 호출
          const parameter = { Temperature: params.Temperature[1] };
          const result = await edukit2Service.searchWeeklyAvg(parameter);
          dataSet['weeklyAvgTemp'] = result;
        } else if (params[sensorData][0] === 'Month') {
          // 1. 온도 월간 데이터 조회 - 로직 호출
          const parameter = { Temperature: params.Temperature[1] };
          const result = await edukit2Service.searchMonthlyAvg(parameter);
          dataSet['monthlyAvgTemp'] = result;
        }
      } else if ('Humidity' === sensorData) {
        if (params[sensorData][0] === 'Day') {
          const parameter = { Humidity: params.Humidity[1] };
          // 2. 습도 일별 데이터 조회 - 로직 호출
          const result = await edukit2Service.searchDailyAvg(parameter);
          dataSet['dailyAvgHumi'] = result;
        } else if (params[sensorData][0] === 'Week') {
          // 2. 습도 주간 데이터 조회 - 로직 호출
          const parameter = { Humidity: params.Humidity[1] };
          const result = await edukit2Service.searchWeeklyAvg(parameter);
          dataSet['weeklyAvgHumi'] = result;
        } else if (params[sensorData][0] === 'Month') {
          // 2. 습도 월간 데이터 조회 - 로직 호출
          const parameter = { Humidity: params.Humidity[1] };
          const result = await edukit2Service.searchMonthlyAvg(parameter);
          dataSet['monthlyAvgTemp'] = result;
        }
      } else if ('Particulates' === sensorData) {
        if (params[sensorData][0] === 'Day') {
          const parameter = { Particulates: params.Particulates[1] };
          // 3. 미세먼지 일별 데이터 조회 - 로직 호출
          const result = await edukit2Service.searchDailyAvg(parameter);
          dataSet['dailyAvgPar'] = result;
        } else if (params[sensorData][0] === 'Week') {
          // 3. 미세먼지 주간 데이터 조회 - 로직 호출
          const parameter = { Particulates: params.Particulates[1] };
          const result = await edukit2Service.searchWeeklyAvg(parameter);
          dataSet['weeklyAvgPar'] = result;
        } else if (params[sensorData][0] === 'Month') {
          // 3. 미세먼지 월간 데이터 조회 - 로직 호출
          const parameter = { Particulates: params.Particulates[1] };
          const result = await edukit2Service.searchMonthlyAvg(parameter);
          dataSet['monthlyAvgTemp'] = result;
        }
      }
    }
    return res.status(200).json(dataSet);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});
// router - edukit2 - 투입량 , 생산량 , 불량률 , 라인별 공장별 생산량 데이터 조회
router.post('/edukit2/search/production-data', async (req, res) => {
  try {
    const params = req.body;

    // fieldtype : LineProdRate  , Input ,Output , Line1defectRate ,Line2defectRate
    // datetype : 'Day', 'Week', 'Month'
    const allowedFieldTypes = [
      'LineProdRate',
      'Input',
      'Output',
      'Line1defectRate',
      'Line2defectRate',
    ];
    const allowedDateTypes = ['Day', 'Week', 'Month'];
    // 프로퍼티 키 검사
    for (const fieldType in params) {
      if (!allowedFieldTypes.includes(fieldType)) {
        throw new Error(
          `fieldtype "${fieldType}" incorrect. expected: ['LineProdRate', 'Input',"Output" , "Line1defectRate" ,"Line2defectRate"]`,
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
    // DataSearch
    for (const prodData in params) {
      // 테스트 완료
      if ('LineProdRate' === prodData) {
        if (params[prodData][0] === 'Day') {
          const parameter = {
            List: ['line1', 'line2', 'line3'],
            date: params.LineProdRate[1],
          };
          // 1. 라인별 생산량 일별 데이터 조회 - 로직 호출
          const result = await edukit2Service.searchDailyAvg_Prod(parameter);
          dataSet['dailyAvgLineProdRate'] = result;
        } else if (params[prodData][0] === 'Week') {
          // 1.  라인별 생산량 주간 데이터 조회 - 로직 호출
          const parameter = {
            List: ['line1', 'line2', 'line3'],
            date: params.LineProdRate[1],
          };
          const result = await edukit2Service.searchWeeklyAvg_Prod(parameter);
          dataSet['weeklyAvgLineProdRate'] = result;
        } else if (params[prodData][0] === 'Month') {
          // 1. 라인별 생산량 월간 데이터 조회 - 로직 호출
          const parameter = {
            List: ['line1', 'line2', 'line3'],
            date: params.LineProdRate[1],
          };
          const result = await edukit2Service.searchMonthlyAvg_Prod(parameter);
          dataSet['monthlyAvgLineProdRate'] = result;
        }
      }
      // 테스트 완료
      else if ('Input' === prodData) {
        if (params[prodData][0] === 'Day') {
          const parameter = {
            Category: 'line1',
            date: params.Input[1],
          };
          // 2. 자재투입량 일별 데이터 조회 - 로직 호출
          const result = await edukit2Service.searchDailyAvg_Prod(parameter);
          dataSet['dailyAvgInput'] = result;
        } else if (params[prodData][0] === 'Week') {
          // 2. 자재투입량 주간 데이터 조회 - 로직 호출
          const parameter = {
            Category: 'line1',
            date: params.Input[1],
          };
          const result = await edukit2Service.searchWeeklyAvg_Prod(parameter);
          dataSet['weeklyAvgInput'] = result;
        } else if (params[prodData][0] === 'Month') {
          // 2. 자재투입량 월간 데이터 조회 - 로직 호출
          const parameter = {
            Category: 'line1',
            date: params.Input[1],
          };
          const result = await edukit2Service.searchMonthlyAvg_Prod(parameter);
          dataSet['monthlyAvgInput'] = result;
        }
      }
      //테스트 완료
      else if ('Output' === prodData) {
        if (params[prodData][0] === 'Day') {
          const parameter = {
            Category: 'line3',
            date: params.Output[1],
          };
          // 3. 완제품 일별 데이터 조회 - 로직 호출
          const result = await edukit2Service.searchDailyAvg_Prod(parameter);
          dataSet['dailyAvgOutput'] = result;
        } else if (params[prodData][0] === 'Week') {
          // 3. 완제품 주간 데이터 조회 - 로직 호출
          const parameter = {
            Category: 'line3',
            date: params.Output[1],
          };
          const result = await edukit2Service.searchWeeklyAvg_Prod(parameter);
          dataSet['weeklyAvgOutput'] = result;
        } else if (params[prodData][0] === 'Month') {
          // 3. 완제품 월간 데이터 조회 - 로직 호출
          const parameter = {
            Category: 'line3',
            date: params.Output[1],
          };
          const result = await edukit2Service.searchMonthlyAvg_Prod(parameter);
          dataSet['monthlyAvgOutput'] = result;
        }
      }
      //테스트 완료
      else if ('Line1defectRate' === prodData) {
        if (params[prodData][0] === 'Day') {
          const parameter = {
            Defect: ['line1', 'line2'],
            date: params.Line1defectRate[1],
          };
          // 4. 1공정 불량률 일별 데이터 조회 - 로직 호출
          const result = await edukit2Service.searchDailyAvg_Prod(parameter);
          dataSet['dailyAvgLine1defectRate'] = result;
        } else if (params[prodData][0] === 'Week') {
          // 4. 1공정 불량률 주간 데이터 조회 - 로직 호출
          const parameter = {
            Defect: ['line1', 'line2'], //순서 지켜야함
            date: params.Line1defectRate[1],
          };
          const result = await edukit2Service.searchWeeklyAvg_Prod(parameter);
          dataSet['weeklyAvgLine1defectRate'] = result;
        } else if (params[prodData][0] === 'Month') {
          // 4. 1공정 불량률 월간 데이터 조회 - 로직 호출
          const parameter = {
            Defect: ['line1', 'line2'],
            date: params.Line1defectRate[1],
          };
          const result = await edukit2Service.searchMonthlyAvg_Prod(parameter);
          dataSet['monthlyAvgLine1defectRate'] = result;
        }
      }
      //테스트 완료
      else if ('Line2defectRate' === prodData) {
        if (params[prodData][0] === 'Day') {
          const parameter = {
            Defect: ['line2', 'line3'],
            date: params.Line2defectRate[1],
          };
          // 5. 자재투입량 일별 데이터 조회 - 로직 호출
          const result = await edukit2Service.searchDailyAvg_Prod(parameter);
          dataSet['dailyAvgLine2defectRate'] = result;
        } else if (params[prodData][0] === 'Week') {
          // 5. 자재투입량 주간 데이터 조회 - 로직 호출
          const parameter = {
            Defect: ['line2', 'line3'],
            date: params.Line2defectRate[1],
          };
          const result = await edukit2Service.searchWeeklyAvg_Prod(parameter);
          dataSet['weeklyAvgLine2defectRate'] = result;
        } else if (params[prodData][0] === 'Month') {
          // 5. 자재투입량 월간 데이터 조회 - 로직 호출
          const parameter = {
            Defect: ['line2', 'line3'],
            date: params.Line2defectRate[1],
          };
          const result = await edukit2Service.searchMonthlyAvg_Prod(parameter);
          dataSet['monthlyAvgLine2defectRate'] = result;
        }
      }
    }
    return res.status(200).json(dataSet);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});
module.exports = router;
