const express = require('express');
const router = express.Router();
const logger = require('../lib/logger');

// router - edukit1 - 센서 데이터 조회
// 쿼리의 프로퍼티 값을 배열로 준다.
// search?fieldtype=Humidity&fieldtype=Temperature&datetype=day&datetype=week
router.get('/edukit1/search', async (req, res) => {
  try {
    // fieldtype : Temperature , Humidity
    // datetype : day ,week , month
    let result = {};
    const queries = req.query;
    //배열은 includes , 객체는 in
    if (queries.fieldtype.includes('Humidity')) {
      console.log(`Humidity : ${queries.datetype[0]}`);
      result['Humidity'] = queries.datetype[0];
      console.log(result);
    } else {
      console.log(result);
      console.log(typeof result);
    }

    // 최종 응답
    // return res.status(200).json(result);
    return res.status(200).json('test');
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
