/*eslint-disable*/
const express = require('express');
const router = express.Router();
const logger = require('../lib/logger');
const adminService = require('../controller/service/adminService');
const logService = require('../controller/service/logService');
const tokenUtil = require('../lib/tokenUtil');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin - 인사관리 / 공장 관리
 */

//완료 - 직급 등록

/**
 * @swagger
 * /admin/position:
 *   post:
 *     summary: 직급 등록
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               positionName:
 *                 type: string
 *                 description: 직급 이름
 *               description:
 *                 type: string
 *                 description: 직급에 대한 설명
 *             required:
 *               - positionName
 *     responses:
 *       201:
 *         description: 직급 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 position:
 *                   $ref: '#/components/schemas/Position'
 *       400:
 *         description: 요청 파라미터 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 오류 메시지
 *       500:
 *         description: 직급 등록에 실패했습니다.
 */

//완료 - 권한 등록

/**
 * @swagger
 * /admin/permission/{id}:
 *   post:
 *     summary: 권한 등록
 *     tags: [Admin]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: 직원 ID
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               positionID:
 *                 type: integer
 *                 description: 직급 ID
 *               lineID:
 *                 type: integer
 *                 description: 라인 ID
 *               view:
 *                 type: boolean
 *                 description: 조회 권한 여부
 *               control:
 *                 type: boolean
 *                 description: 제어 권한 여부
 *             required:
 *               - positionID
 *               - lineID
 *               - view
 *               - control
 *     responses:
 *       201:
 *         description: 권한 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 permission:
 *                   $ref: '#/components/schemas/Permission'
 *       400:
 *         description: 요청 파라미터 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 오류 메시지
 *       500:
 *         description: 권한 등록에 실패했습니다.
 */

//완료 - 전체 직원 조회

/**
 * @swagger
 * /admin/search:
 *   get:
 *     summary: 전체 직원 조회
 *     tags: [Admin]
 *     parameters:
 *       - name: positionID
 *         in: query
 *         description: 직급 ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 직원 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employees:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *       400:
 *         description: 요청 파라미터 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 오류 메시지
 *       500:
 *         description: 직원 조회에 실패했습니다.
 */

//완료 - 직원 권한 수정

/**
 * @swagger
 * /admin/permission:
 *   put:
 *     summary: 직원 권한 수정
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: 직원 ID
 *               positionID:
 *                 type: integer
 *                 description: 직급 ID
 *             required:
 *               - id
 *               - positionID
 *     responses:
 *       200:
 *         description: 직원 권한 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 성공 메시지
 *                 result:
 *                   $ref: '#/components/schemas/Employee'
 *       400:
 *         description: 요청 파라미터 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 오류 메시지
 *       500:
 *         description: 직원 권한 수정에 실패했습니다.
 */

//완료 - 공장 등록

/**
 * @swagger
 * /admin/factory:
 *   post:
 *     summary: 공장 등록
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               factoryName:
 *                 type: string
 *                 description: 공장 이름
 *               description:
 *                 type: string
 *                 description: 공장 설명
 *             required:
 *               - factoryName
 *     responses:
 *       201:
 *         description: 공장 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   $ref: '#/components/schemas/Factory'
 *       400:
 *         description: 요청 본문 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 오류 메시지
 *       500:
 *         description: 공장 등록에 실패했습니다.
 */

//완료 - 공장 조회

/**
 * @swagger
 * /admin/factory:
 *   get:
 *     summary: 공장 조회
 *     tags: [Admin]
 *     parameters:
 *       - name: factoryID
 *         in: query
 *         description: 공장 ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 공장 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 factory:
 *                   $ref: '#/components/schemas/Factory'
 *       400:
 *         description: 요청 파라미터 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 오류 메시지
 *       500:
 *         description: 공장 조회에 실패했습니다.
 */

//완료 - 공정 등록

/**
 * @swagger
 * /admin/productionline:
 *   post:
 *     summary: 공정 등록
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lineName:
 *                 type: string
 *                 description: 공정 이름
 *               factoryID:
 *                 type: integer
 *                 description: 공장 ID
 *               description:
 *                 type: string
 *                 description: 공정 설명
 *             required:
 *               - lineName
 *               - factoryID
 *     responses:
 *       201:
 *         description: 공정 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   $ref: '#/components/schemas/ProductionLine'
 *       400:
 *         description: 요청 본문 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 오류 메시지
 *       500:
 *         description: 공정 등록에 실패했습니다.
 */

// 완료 - 공장 데이터 조회

/**
 * @swagger
 * /admin/search/production-data:
 *   post:
 *     summary: 공장 데이터 조회
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               LineProdRate:
 *                 type: array
 *                 description: 생산률 데이터 요청
 *               Input:
 *                 type: array
 *                 description: 자재투입량 데이터 요청
 *               Output:
 *                 type: array
 *                 description: 생산량 데이터 요청
 *               Line1defectRate:
 *                 type: array
 *                 description: 1공정 불량률 데이터 요청
 *               Line2defectRate:
 *                 type: array
 *                 description: 2공정 불량률 데이터 요청
 *             required:
 *               - LineProdRate
 *               - Input
 *               - Output
 *               - Line1defectRate
 *               - Line2defectRate
 *     responses:
 *       200:
 *         description: 공장 데이터 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dailyAvgLineProdRate:
 *                   $ref: '#/components/schemas/ProductionData'
 *                 weeklyAvgLineProdRate:
 *                   $ref: '#/components/schemas/ProductionData'
 *                 monthlyAvgLineProdRate:
 *                   $ref: '#/components/schemas/ProductionData'
 *                 dailyAvgInput:
 *                   $ref: '#/components/schemas/ProductionData'
 *                 weeklyAvgInput:
 *                   $ref: '#/components/schemas/ProductionData'
 *                 monthlyAvgInput:
 *                   $ref: '#/components/schemas/ProductionData'
 *                 dailyAvgOutput:
 *                   $ref: '#/components/schemas/ProductionData'
 *                 weeklyAvgOutput:
 *                   $ref: '#/components/schemas/ProductionData'
 *                 monthlyAvgOutput:
 *                   $ref: '#/components/schemas/ProductionData'
 *                 dailyAvgLine1defectRate:
 *                   $ref: '#/components/schemas/ProductionData'
 *                 weeklyAvgLine1defectRate:
 *                   $ref: '#/components/schemas/ProductionData'
 *                 monthlyAvgLine1defectRate:
 *                   $ref: '#/components/schemas/ProductionData'
 *                 dailyAvgLine2defectRate:
 *                   $ref: '#/components/schemas/ProductionData'
 *                 weeklyAvgLine2defectRate:
 *                   $ref: '#/components/schemas/ProductionData'
 *                 monthlyAvgLine2defectRate:
 *                   $ref: '#/components/schemas/ProductionData'
 *       400:
 *         description: 요청 본문 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 오류 메시지
 *       500:
 *         description: 데이터 조회에 실패했습니다.
 */

// 완료 - 로그 기록 전체 조회

/**
 * @swagger
 * /admin/logs:
 *   get:
 *     summary: 로그 기록 전체 조회
 *     tags: [Admin]
 *     parameters:
 *       - name: list
 *         in: query
 *         required: true
 *         description: 조회할 로그 목록 (all)
 *         schema:
 *           type: string
 *       - name: category
 *         in: query
 *         required: false
 *         description: 로그 카테고리 (옵션)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 로그 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 logs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Log'
 *       400:
 *         description: 요청이 잘못됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 오류 메시지
 *       500:
 *         description: 로그 조회에 실패했습니다.
 */

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
    //쿼리있는지 확인
    if (!req.query.positionID) {
      return res
        .status(400)
        .json({ error: `Invalid query parameter.  No query parameter ` });
    }
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
    logger.info(`(admin.reg.params) ${JSON.stringify(params)}`);
    // 비즈니스 로직 호출
    const result = await adminService.regLine(params);
    logger.info(`(admin.reg.result) ${JSON.stringify(result)}`);

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

//  router -재고 정보 조회
router.get('/inventory', async (req, res) => {
  try {
    const params = {};
    const result = await adminService.inventory(params);
    logger.info(`(admin.inventory.result) ${JSON.stringify(result)}`);

    // 로그 기록- 액세스 토큰으로 사용자 정보 추출
    const asyncfunc = async () => {
      const token = req.headers && req.headers.accesstoken;
      const decoded = tokenUtil.decodeToken(token);
      const params = {
        ...decoded,
        type: 'inventory-view',
        Category: 'employee',
      };
      const result = await logService.control(params);
      logger.info(`(logService.control) logged successfully...`);
    };
    asyncfunc();

    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

//  router -재고 정보 등록 - 최근 문서 기반으로 최소 재고량 수정하여 새롭게 등록하는 방식
router.post('/inventory', async (req, res) => {
  try {
    if (
      !req.body.CurrentStock ||
      !req.body.MinimumStock ||
      !req.body.StoredProducts
    ) {
      return res.status(400).json({
        error:
          'Parameter error required: [CurrentStock , MinimumStock , StoredProducts]',
      });
    }
    const params = {
      CurrentStock: req.body.CurrentStock, //현재 재고량
      MinimumStock: req.body.MinimumStock, //남은 재고량
      StoredProducts: req.body.StoredProducts, //완제품 수량
    };
    logger.info(`(admin.updateInven.params) ${JSON.stringify(params)}`);
    // 비즈니스 로직 호출
    const result = await adminService.updateInven(params);
    logger.info(`(admin.updateInven.result) ${JSON.stringify(result)}`);
    // 로그 기록- 액세스 토큰으로 사용자 정보 추출
    const asyncfunc = async () => {
      const token = req.headers && req.headers.accesstoken;
      const decoded = tokenUtil.decodeToken(token);
      const params = {
        ...decoded,
        type: 'inventory-record',
        Category: 'employee',
      };
      const result = await logService.control(params);
      logger.info(`(logService.control) logged successfully...`);
    };
    asyncfunc();
    // 최종 응답
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// 입력값으로 받은 문자열을 날짜 형식인지 검사하는 정규 표현식
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

function isValidDate(dateString) {
  return dateRegex.test(dateString);
}

//  router - 최근 가동&중지이력 ,     총 가동시간 , 총 중지시간 조회
// 조회 일자  , 조회 타입
router.post('/operatingtime', async (req, res) => {
  try {
    // searchType로 로직이 분기되므로 가장먼저 판단한다.
    // 유효성 검사 - field
    if (!req.body.searchType) {
      return res
        .status(400)
        .json({ error: 'parameter error.. required field: searchType ' });
    }
    // 유효성 검사 - field
    if (!req.body.searchType == 'recent') {
      return res
        .status(400)
        .json({ error: 'parameter error.. allow : recent ' });
    }
    // logic - search : 최근 가동&중지이력
    let result = null;
    if (req.body.searchType == 'recent') {
      const params = {
        type: 'process-start',
        Manufacturer: 'edukit1',
      };
      logger.info(
        `(admin.searchOperatingTime.params) ${JSON.stringify(params)}`,
      );
      // 비즈니스 로직 호출
      result = await adminService.searchRecentTime(params);
      logger.info(
        `(admin.searchOperatingTime.result) ${JSON.stringify(result)}`,
      );
      // 로그 기록- 액세스 토큰으로 사용자 정보 추출
      const asyncfunc = async () => {
        const token = req.headers && req.headers.accesstoken;
        const decoded = tokenUtil.decodeToken(token);
        const params = {
          ...decoded,
          view: 'recent',
          type: 'time',
          Category: 'factory',
        };
        const result = await logService.FacTime(params);
        logger.info(`(logService.control) logged successfully...`);
      };
      asyncfunc();
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

//  router - 로그 기록 전체조회
router.get('/logs', async (req, res) => {
  try {
    // 유효성 검사 - 필드 & 값
    if (req.query && req.query.list) {
      const value = req.query.list;
      if (value == 'all') {
        let params = null;
        if (req.query.category) {
          params = {
            Category: req.query.category,
          };
        } else {
          params = {};
        }

        const result = await adminService.logList(params);
        logger.info(`(adminService.logList.result) ${JSON.stringify(result)}`);
        // 최종 응답
        return res.status(200).json(result);
      } else {
        return res.status(400).json({
          error: 'query parameter error.... required : list , value: all ',
        });
      }
    } else {
      return res.status(400).json({
        error: 'query parameter error.... required : list , value: all ',
      });
    }
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
