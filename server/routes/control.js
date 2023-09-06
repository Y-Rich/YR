const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const lineService = require('../controller/service/lineService');

// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
      departmentCode: req.body.departmentCode,
      linename: req.body.linename,
      code: req.body.code,
      description: req.body.description,
    };
    logger.info(`(line.reg.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await lineService.reg(params);
    logger.info(`(department.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
