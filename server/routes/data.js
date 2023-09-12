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
    const parameter = { Temperature: params.Temperature[1] };
    console.log(parameter);
    // 1. 온도 일별 데이터 조회
    const result = await edukit1Service.searchTemp(parameter);

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// router.get('/search', async (req, res) => {
//   try {
//     const validQueries = ['positionID']; // 유효한 쿼리 매개변수 목록

//     // 모든 쿼리 파라미터가 유효한지 확인
//     for (const queryParam in req.query) {
//       if (!validQueries.includes(queryParam)) {
//         // 유효하지 않은 쿼리가 있을 경우, 400 Bad Request 상태 코드를 반환
//         return res
//           .status(400)
//           .json({ error: `Invalid query parameter: ${queryParam}` });
//       }
//     }
//     const params = {
//       positionID: req.query.positionID,
//     };
//     logger.info(`(employee.list.params) ${JSON.stringify(params)}`);

//     const result = await employeeService.positionList(params);
//     logger.info(`(employee.list.result) ${JSON.stringify(result)}`);

//     // 최종 응답
//     return res.status(200).json(result);
//   } catch (err) {
//     return res.status(500).json({ err: err.toString() });
//   }
// });

module.exports = router;
