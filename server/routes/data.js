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

/**
 * @swagger
 * tags:
 *   name: data
 *   description: data - 각종 센서데이터 조회 / 투입량 , 생산량 , 불량률 , 라인별 공장별 생산량 데이터 조회
 */

//완료 - Edukit1 센서 데이터 조회

/**
 * @swagger
 * /data/edukit1/search:
 *   post:
 *     summary: Edukit1 센서 데이터 조회
 *     tags: [data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Temperature:
 *                 type: array
 *                 items:
 *                   - type: string
 *                   - type: string
 *                 description: 온도 데이터 조회 설정 [센서 유형, 조회 기간]
 *               Humidity:
 *                 type: array
 *                 items:
 *                   - type: string
 *                   - type: string
 *                 description: 습도 데이터 조회 설정 [센서 유형, 조회 기간]
 *               Particulates:
 *                 type: array
 *                 items:
 *                   - type: string
 *                   - type: string
 *                 description: 미세먼지 데이터 조회 설정 [센서 유형, 조회 기간]
 *             required:
 *               - Temperature
 *               - Humidity
 *               - Particulates
 *     responses:
 *       200:
 *         description: 센서 데이터 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dailyAvgTemp:
 *                   type: object
 *                   description: 일별 온도 평균 데이터
 *                 weeklyAvgTemp:
 *                   type: object
 *                   description: 주간 온도 평균 데이터
 *                 monthlyAvgTemp:
 *                   type: object
 *                   description: 월간 온도 평균 데이터
 *                 dailyAvgHumi:
 *                   type: object
 *                   description: 일별 습도 평균 데이터
 *                 weeklyAvgHumi:
 *                   type: object
 *                   description: 주간 습도 평균 데이터
 *                 monthlyAvgHumi:
 *                   type: object
 *                   description: 월간 습도 평균 데이터
 *                 dailyAvgPar:
 *                   type: object
 *                   description: 일별 미세먼지 평균 데이터
 *                 weeklyAvgPar:
 *                   type: object
 *                   description: 주간 미세먼지 평균 데이터
 *                 monthlyAvgPar:
 *                   type: object
 *                   description: 월간 미세먼지 평균 데이터
 *       400:
 *         description: 잘못된 요청 형식
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 오류 메시지
 *       500:
 *         description: 센서 데이터 조회 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: string
 *                   description: 오류 메시지
 */

// 완료 - Edukit1 생산 데이터 조회

/**
 * @swagger
 * /data/edukit1/search/production-data:
 *   post:
 *     summary: Edukit1 생산 데이터 조회
 *     tags: [data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               LineProdRate:
 *                 type: array
 *                 items:
 *                   - type: string
 *                   - type: string
 *                 description: 라인별 생산량 조회 설정 [라인 유형, 조회 기간]
 *               Input:
 *                 type: array
 *                 items:
 *                   - type: string
 *                   - type: string
 *                 description: 자재투입량 조회 설정 [라인 유형, 조회 기간]
 *               Output:
 *                 type: array
 *                 items:
 *                   - type: string
 *                   - type: string
 *                 description: 완제품 생산량 조회 설정 [라인 유형, 조회 기간]
 *               Line1defectRate:
 *                 type: array
 *                 items:
 *                   - type: string
 *                   - type: string
 *                 description: 1공정 불량률 조회 설정 [라인 유형, 조회 기간]
 *               Line2defectRate:
 *                 type: array
 *                 items:
 *                   - type: string
 *                   - type: string
 *                 description: 2공정 불량률 조회 설정 [라인 유형, 조회 기간]
 *             required:
 *               - LineProdRate
 *               - Input
 *               - Output
 *               - Line1defectRate
 *               - Line2defectRate
 *     responses:
 *       200:
 *         description: 생산 데이터 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dailyAvgLineProdRate:
 *                   type: object
 *                   description: 일별 라인별 생산량 평균 데이터
 *                 weeklyAvgLineProdRate:
 *                   type: object
 *                   description: 주간 라인별 생산량 평균 데이터
 *                 monthlyAvgLineProdRate:
 *                   type: object
 *                   description: 월간 라인별 생산량 평균 데이터
 *                 dailyAvgInput:
 *                   type: object
 *                   description: 일별 자재투입량 평균 데이터
 *                 weeklyAvgInput:
 *                   type: object
 *                   description: 주간 자재투입량 평균 데이터
 *                 monthlyAvgInput:
 *                   type: object
 *                   description: 월간 자재투입량 평균 데이터
 *                 dailyAvgOutput:
 *                   type: object
 *                   description: 일별 완제품 생산량 평균 데이터
 *                 weeklyAvgOutput:
 *                   type: object
 *                   description: 주간 완제품 생산량 평균 데이터
 *                 monthlyAvgOutput:
 *                   type: object
 *                   description: 월간 완제품 생산량 평균 데이터
 *                 dailyAvgLine1defectRate:
 *                   type: object
 *                   description: 일별 1공정 불량률 평균 데이터
 *                 weeklyAvgLine1defectRate:
 *                   type: object
 *                   description: 주간 1공정 불량률 평균 데이터
 *                 monthlyAvgLine1defectRate:
 *                   type: object
 *                   description: 월간 1공정 불량률 평균 데이터
 *                 dailyAvgLine2defectRate:
 *                   type: object
 *                   description: 일별 2공정 불량률 평균 데이터
 *                 weeklyAvgLine2defectRate:
 *                   type: object
 *                   description: 주간 2공정 불량률 평균 데이터
 *                 monthlyAvgLine2defectRate:
 *                   type: object
 *                   description: 월간 2공정 불량률 평균 데이터
 *       400:
 *         description: 잘못된 요청 형식
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 오류 메시지
 *       500:
 *         description: 생산 데이터 조회 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: string
 *                   description: 오류 메시지
 */

//완료 - Edukit2 센서 데이터 조회

/**
 * @swagger
 * /data/edukit2/search:
 *   post:
 *     summary: Edukit2 센서 데이터 조회
 *     tags: [data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Temperature:
 *                 type: array
 *                 items:
 *                   - type: string
 *                   - type: string
 *                 description: 온도 데이터 조회 설정 [센서 유형, 조회 기간]
 *               Humidity:
 *                 type: array
 *                 items:
 *                   - type: string
 *                   - type: string
 *                 description: 습도 데이터 조회 설정 [센서 유형, 조회 기간]
 *               Particulates:
 *                 type: array
 *                 items:
 *                   - type: string
 *                   - type: string
 *                 description: 미세먼지 데이터 조회 설정 [센서 유형, 조회 기간]
 *             required:
 *               - Temperature
 *               - Humidity
 *               - Particulates
 *     responses:
 *       200:
 *         description: 센서 데이터 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dailyAvgTemp:
 *                   type: object
 *                   description: 일별 온도 평균 데이터
 *                 weeklyAvgTemp:
 *                   type: object
 *                   description: 주간 온도 평균 데이터
 *                 monthlyAvgTemp:
 *                   type: object
 *                   description: 월간 온도 평균 데이터
 *                 dailyAvgHumi:
 *                   type: object
 *                   description: 일별 습도 평균 데이터
 *                 weeklyAvgHumi:
 *                   type: object
 *                   description: 주간 습도 평균 데이터
 *                 monthlyAvgHumi:
 *                   type: object
 *                   description: 월간 습도 평균 데이터
 *                 dailyAvgPar:
 *                   type: object
 *                   description: 일별 미세먼지 평균 데이터
 *                 weeklyAvgPar:
 *                   type: object
 *                   description: 주간 미세먼지 평균 데이터
 *                 monthlyAvgPar:
 *                   type: object
 *                   description: 월간 미세먼지 평균 데이터
 *       400:
 *         description: 잘못된 요청 형식
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 오류 메시지
 *       500:
 *         description: 센서 데이터 조회 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: string
 *                   description: 오류 메시지
 */

// 완료 - Edukit1 생산 데이터 조회

/**
 * @swagger
 * /data/edukit2/search/production-data:
 *   post:
 *     summary: Edukit2 생산 데이터 조회
 *     tags: [data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               LineProdRate:
 *                 type: array
 *                 items:
 *                   - type: string
 *                   - type: string
 *                 description: 라인별 생산량 조회 설정 [라인 유형, 조회 기간]
 *               Input:
 *                 type: array
 *                 items:
 *                   - type: string
 *                   - type: string
 *                 description: 자재투입량 조회 설정 [라인 유형, 조회 기간]
 *               Output:
 *                 type: array
 *                 items:
 *                   - type: string
 *                   - type: string
 *                 description: 완제품 생산량 조회 설정 [라인 유형, 조회 기간]
 *               Line1defectRate:
 *                 type: array
 *                 items:
 *                   - type: string
 *                   - type: string
 *                 description: 1공정 불량률 조회 설정 [라인 유형, 조회 기간]
 *               Line2defectRate:
 *                 type: array
 *                 items:
 *                   - type: string
 *                   - type: string
 *                 description: 2공정 불량률 조회 설정 [라인 유형, 조회 기간]
 *             required:
 *               - LineProdRate
 *               - Input
 *               - Output
 *               - Line1defectRate
 *               - Line2defectRate
 *     responses:
 *       200:
 *         description: 생산 데이터 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dailyAvgLineProdRate:
 *                   type: object
 *                   description: 일별 라인별 생산량 평균 데이터
 *                 weeklyAvgLineProdRate:
 *                   type: object
 *                   description: 주간 라인별 생산량 평균 데이터
 *                 monthlyAvgLineProdRate:
 *                   type: object
 *                   description: 월간 라인별 생산량 평균 데이터
 *                 dailyAvgInput:
 *                   type: object
 *                   description: 일별 자재투입량 평균 데이터
 *                 weeklyAvgInput:
 *                   type: object
 *                   description: 주간 자재투입량 평균 데이터
 *                 monthlyAvgInput:
 *                   type: object
 *                   description: 월간 자재투입량 평균 데이터
 *                 dailyAvgOutput:
 *                   type: object
 *                   description: 일별 완제품 생산량 평균 데이터
 *                 weeklyAvgOutput:
 *                   type: object
 *                   description: 주간 완제품 생산량 평균 데이터
 *                 monthlyAvgOutput:
 *                   type: object
 *                   description: 월간 완제품 생산량 평균 데이터
 *                 dailyAvgLine1defectRate:
 *                   type: object
 *                   description: 일별 1공정 불량률 평균 데이터
 *                 weeklyAvgLine1defectRate:
 *                   type: object
 *                   description: 주간 1공정 불량률 평균 데이터
 *                 monthlyAvgLine1defectRate:
 *                   type: object
 *                   description: 월간 1공정 불량률 평균 데이터
 *                 dailyAvgLine2defectRate:
 *                   type: object
 *                   description: 일별 2공정 불량률 평균 데이터
 *                 weeklyAvgLine2defectRate:
 *                   type: object
 *                   description: 주간 2공정 불량률 평균 데이터
 *                 monthlyAvgLine2defectRate:
 *                   type: object
 *                   description: 월간 2공정 불량률 평균 데이터
 *       400:
 *         description: 잘못된 요청 형식
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 오류 메시지
 *       500:
 *         description: 생산 데이터 조회 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: string
 *                   description: 오류 메시지
 */

module.exports = router;
