const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const userService = require('../controller/service/userService');
const tokenUtil = require('../lib/tokenUtil');

// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
      departmentCode: req.body.departmentCode,
      name: req.body.name,
      userid: req.body.userid,
      password: req.body.password,
      role: req.body.role,
      email: req.body.email,
      phone: req.body.phone,
    };
    logger.info(`(user.reg.params) ${JSON.stringify(params)}`);

    // // 입력값 null 체크
    // if (!params.name || !params.userid || !params.password) {
    //   const err = new Error('Not allowed null (name, userid, password)');
    //   logger.error(err.toString());

    //   res.status(500).json({ err: err.toString() });
    // }

    // 비즈니스 로직 호출
    const result = await userService.reg(params);
    logger.info(`(user.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// 리스트 조회 - role 에따라 검색
router.get('/', async (req, res) => {
  try {
    const params = {
      role: req.query.role,
      // userid: req.query.userid,
    };
    logger.info(`(user.list.params) ${JSON.stringify(params)}`);

    const result = await userService.list(params);
    logger.info(`(user.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});
// 상세정보
router.get('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(department.info.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await userService.info(params);

    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// 유저 수정 - 기본정보
router.put('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      departmentCode: req.body.departmentCode,
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      phone: req.body.phone,
    };
    logger.info(`(department.edit.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await userService.edit(params);

    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// // 유저 수정 - 비밀번호 - 코드 수정해야됨
// router.put('/:id', async (req, res) => {
//   try {
//     const params = {
//       id: req.params.id,
//       departmentCode: req.body.departmentCode,
//       name: req.body.name,
//       role: req.body.role,
//       email: req.body.email,
//       phone: req.body.phone,
//     };
//     logger.info(`(department.edit.params) ${JSON.stringify(params)}`);

//     // 비즈니스 로직 호출
//     const result = await userService.edit(params);

//     // 최종 응답
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json({ err: err.toString() });
//   }
// });

// 유저 삭제
router.delete('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(department.delete.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await userService.delete(params);

    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// 로그인
router.post('/login', async (req, res) => {
  try {
    const params = {
      userid: req.body.userid,
      password: req.body.password,
    };
    logger.info(`(user.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.userid || !params.password) {
      const err = new Error('Not allowed null (userid, password)');
      logger.error(err.toString());

      return res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await userService.login(params);
    logger.info(`(user.token.result) ${JSON.stringify(result)}`);

    // 토큰 생성
    const { token, payload } = tokenUtil.makeToken(result);

    res.set('Authorization', token); // header 세팅
    // 최종 응답
    return res.status(200).json(payload);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});
module.exports = router;
