const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const mongoService = require('../controller/service/mongoService');

// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
      title: req.body.title,
      slug: req.body.slug,
      published: req.body.published,
      content: req.body.content,
      tags: req.body.tags,
    };

    logger.info(`(mongo.reg.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await mongoService.reg(params);
    logger.info(`(mongo.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 특정조건으로 조회
router.get('/:published', async (req, res) => {
  try {
    const params = {
      published: req.params.published,
    };
    logger.info(`(mongo.list.params) ${JSON.stringify(params)}`);
    const result = await mongoService.list(params);
    logger.info(`(mongo.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// // 상세정보 조회
// router.get('/:id', async (req, res) => {
//   try {
//     const params = {
//       id: req.params.id,
//     };
//     logger.info(`(department.info.params) ${JSON.stringify(params)}`);

//     const result = await departmentService.info(params);
//     logger.info(`(department.info.result) ${JSON.stringify(result)}`);

//     // 최종 응답
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json({ err: err.toString() });
//   }
// });

// 수정
router.put('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      title: req.body.title,
      slug: req.body.slug,
      content: req.body.content,
      tags: req.body.tags,
    };
    logger.info(`(mongo.update.params) ${JSON.stringify(params)}`);

    const result = await mongoService.edit(params);
    logger.info(`(mongo.update.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 삭제
router.delete('/:published', async (req, res) => {
  try {
    const params = {
      published: req.params.published,
    };
    logger.info(`(mongo.delete.params) ${JSON.stringify(params)}`);

    const result = await mongoService.delete(params);
    logger.info(`(mongo.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
