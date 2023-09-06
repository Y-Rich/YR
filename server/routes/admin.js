const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const adminService = require('../controller/service/adminService');
const { isLoggedIn } = require('../lib/middleware');

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
router.post('/permission', async (req, res) => {
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
router.get('/search', isLoggedIn, async (req, res) => {
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

module.exports = router;
