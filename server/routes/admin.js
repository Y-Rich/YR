const express = require('express');
const router = express.Router();
const logger = require('../lib/logger');
const adminService = require('../controller/service/adminService');

// management - employees

//position - 직급 등록
router.post('/position', async (req, res) => {
  try {
    const params = {
      positionName: req.body.positionName,
      description: req.body.description,
    };
    logger.info(`(position.reg.params) ${JSON.stringify(params)}`);
    // 비즈니스 로직 호출
    const result = await adminService.regPosition(params);
    logger.info(`(position.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

//permission - 권한 등록
router.post('/permission/:id', async (req, res) => {
  try {
    const params = {
      positionID: req.body.positionID,
      lineID: req.body.lineID,
      view: req.body.view,
      control: req.body.control,
    };
    logger.info(`(permission.reg.params) ${JSON.stringify(params)}`);
    // 비즈니스 로직 호출
    const result = await adminService.regPermission(params);
    logger.info(`(permission.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

//employee - 전체 직원 조회
router.get('/search', async (req, res) => {
  try {
    const validQueries = ['positionID']; // 유효한 쿼리 매개변수 목록

    // 모든 쿼리 파라미터가 유효한지 확인
    for (const queryParam in req.query) {
      if (!validQueries.includes(queryParam)) {
        // 유효하지 않은 쿼리가 있을 경우, 400 Bad Request 상태 코드를 반환
        return res
          .status(400)
          .json({ error: `Invalid query parameter: ${queryParam}` });
      }
    }
    const params = {
      positionID: req.query.positionID,
    };
    logger.info(`(employee.list.params) ${JSON.stringify(params)}`);

    const result = await adminService.employeeList(params);
    logger.info(`(employee.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// 매니저 직급미만은 권한 수정 못해야함 -> auth 미들웨어 처리
//permission - 직원 권한 수정
router.put('/permission', async (req, res) => {
  try {
    //유효성 검사
    // 1. body properties check
    if (!req.body.id || !req.body.positionID) {
      return res.status(400).json({
        error:
          '[params check] Invalid parameter... allow :[id, positionID] , required: both ',
      });
    }

    // 2. :id 파라미터 유효성 검사
    const employeeID = parseInt(req.body.id);
    const positionID = parseInt(req.body.positionID);
    if (isNaN(employeeID) || employeeID <= 0) {
      return res
        .status(400)
        .json({ error: '[params check] Invalid employee ID......' });
    }
    if (isNaN(positionID) || positionID <= 0) {
      return res
        .status(400)
        .json({ error: '[params check] Invalid employee ID......' });
    }

    // 로직 진행.
    const params = { employeeID: employeeID, positionID: positionID };

    logger.debug(`(adminService.edit.params) ${JSON.stringify(params)}`);
    // 비즈니스 로직 호출
    const result = await adminService.edit(params);
    logger.info(`(adminService.edit.result) ${JSON.stringify(result)}`);

    // 최종 응답
    return res.status(200).json({
      message: 'Employee information updated successfully',
      result: result,
    });
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// management - factory

// factory - 공장등록
router.post('/factory', async (req, res) => {
  try {
    const params = {
      factoryName: req.body.factoryName,
      description: req.body.description,
    };
    logger.info(`(factory.reg.params) ${JSON.stringify(params)}`);
    // 비즈니스 로직 호출
    const result = await adminService.regFac(params);
    logger.info(`(factory.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

//  factory -공장 조회 // factoryID
router.get('/factory', async (req, res) => {
  try {
    const params = {
      factoryID: req.query.factoryID,
    };
    logger.info(`(factory.list.params) ${JSON.stringify(params)}`);

    const result = await adminService.facList(params);
    logger.info(`(factory.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

//productionLine - 공정 등록
router.post('/productionline', async (req, res) => {
  try {
    const params = {
      lineName: req.body.lineName,
      factoryID: req.body.factoryID,
      description: req.body.description,
    };
    logger.info(`(line.reg.params) ${JSON.stringify(params)}`);
    // 비즈니스 로직 호출
    const result = await adminService.regLine(params);
    logger.info(`(line.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// router - 전체공장에 대한  투입량 , 생산량 , 불량률 , 라인별 생산량 데이터 조회
router.post('/search/production-data', async (req, res) => {
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
      //테스트완료
      if ('LineProdRate' === prodData) {
        if (params[prodData][0] === 'Day') {
          const parameter = {
            List: ['line1', 'line2', 'line3'],
            date: params.LineProdRate[1],
          };
          // 1. 라인별 생산량 일별 데이터 조회 - 로직 호출
          const result = await adminService.searchDailyAvg_Prod(parameter);
          dataSet['dailyAvgLineProdRate'] = result;
        } else if (params[prodData][0] === 'Week') {
          // 1.  라인별 생산량 주간 데이터 조회 - 로직 호출
          const parameter = {
            List: ['line1', 'line2', 'line3'],
            date: params.LineProdRate[1],
          };
          const result = await adminService.searchWeeklyAvg_Prod(parameter);
          dataSet['weeklyAvgLineProdRate'] = result;
        } else if (params[prodData][0] === 'Month') {
          // 1. 라인별 생산량 월간 데이터 조회 - 로직 호출
          const parameter = {
            List: ['line1', 'line2', 'line3'],
            date: params.LineProdRate[1],
          };
          const result = await adminService.searchMonthlyAvg_Prod(parameter);
          dataSet['monthlyAvgLineProdRate'] = result;
        }
        //테스트완료
      } else if ('Input' === prodData) {
        if (params[prodData][0] === 'Day') {
          const parameter = {
            Category: 'line1',
            date: params.Input[1],
          };
          // 2. 자재투입량 일별 데이터 조회 - 로직 호출
          const result = await adminService.searchDailyAvg_Prod(parameter);
          dataSet['dailyAvgInput'] = result;
        } else if (params[prodData][0] === 'Week') {
          // 2. 자재투입량 주간 데이터 조회 - 로직 호출
          const parameter = {
            Category: 'line1',
            date: params.Input[1],
          };
          const result = await adminService.searchWeeklyAvg_Prod(parameter);
          dataSet['weeklyAvgInput'] = result;
        } else if (params[prodData][0] === 'Month') {
          // 2. 자재투입량 월간 데이터 조회 - 로직 호출
          const parameter = {
            Category: 'line1',
            date: params.Input[1],
          };
          const result = await adminService.searchMonthlyAvg_Prod(parameter);
          dataSet['monthlyAvgInput'] = result;
        }
      }
      //테스트완료
      else if ('Output' === prodData) {
        if (params[prodData][0] === 'Day') {
          const parameter = {
            Category: 'line3',
            date: params.Output[1],
          };
          // 3. 완제품 일별 데이터 조회 - 로직 호출
          const result = await adminService.searchDailyAvg_Prod(parameter);
          dataSet['dailyAvgOutput'] = result;
        } else if (params[prodData][0] === 'Week') {
          // 3. 완제품 주간 데이터 조회 - 로직 호출
          const parameter = {
            Category: 'line3',
            date: params.Output[1],
          };
          const result = await adminService.searchWeeklyAvg_Prod(parameter);
          dataSet['weeklyAvgOutput'] = result;
        } else if (params[prodData][0] === 'Month') {
          // 3. 완제품 월간 데이터 조회 - 로직 호출
          const parameter = {
            Category: 'line3',
            date: params.Output[1],
          };
          const result = await adminService.searchMonthlyAvg_Prod(parameter);
          dataSet['monthlyAvgOutput'] = result;
        }
      }
      //테스트완료
      else if ('Line1defectRate' === prodData) {
        if (params[prodData][0] === 'Day') {
          const parameter = {
            Defect: ['line1', 'line2'],
            date: params.Line1defectRate[1],
          };
          // 4. 1공정 불량률 일별 데이터 조회 - 로직 호출
          const result = await adminService.searchDailyAvg_Prod(parameter);
          dataSet['dailyAvgLine1defectRate'] = result;
        } else if (params[prodData][0] === 'Week') {
          // 4. 1공정 불량률 주간 데이터 조회 - 로직 호출
          const parameter = {
            Defect: ['line1', 'line2'], //순서 지켜야함
            date: params.Line1defectRate[1],
          };
          const result = await adminService.searchWeeklyAvg_Prod(parameter);
          dataSet['weeklyAvgLine1defectRate'] = result;
        } else if (params[prodData][0] === 'Month') {
          // 4. 1공정 불량률 월간 데이터 조회 - 로직 호출
          const parameter = {
            Defect: ['line1', 'line2'],
            date: params.Line1defectRate[1],
          };
          const result = await adminService.searchMonthlyAvg_Prod(parameter);
          dataSet['monthlyAvgLine1defectRate'] = result;
        }
      }
      //테스트완료
      else if ('Line2defectRate' === prodData) {
        if (params[prodData][0] === 'Day') {
          const parameter = {
            Defect: ['line2', 'line3'],
            date: params.Line2defectRate[1],
          };
          // 5. 자재투입량 일별 데이터 조회 - 로직 호출
          const result = await adminService.searchDailyAvg_Prod(parameter);
          dataSet['dailyAvgLine2defectRate'] = result;
        } else if (params[prodData][0] === 'Week') {
          // 5. 자재투입량 주간 데이터 조회 - 로직 호출
          const parameter = {
            Defect: ['line2', 'line3'],
            date: params.Line2defectRate[1],
          };
          const result = await adminService.searchWeeklyAvg_Prod(parameter);
          dataSet['weeklyAvgLine2defectRate'] = result;
        } else if (params[prodData][0] === 'Month') {
          // 5. 자재투입량 월간 데이터 조회 - 로직 호출
          const parameter = {
            Defect: ['line2', 'line3'],
            date: params.Line2defectRate[1],
          };
          const result = await adminService.searchMonthlyAvg_Prod(parameter);
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
