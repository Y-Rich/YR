const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const employeeService = require('../controller/service/employeeService');
const tokenService = require('../controller/service/tokenService');
const tokenUtil = require('../lib/tokenUtil');
const hashUtil = require('../lib/hashUtil');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 CRUD 기능
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: 회원가입
 *     tags: [Users]
 *     requestBody:
 *       description: 스키마 유의사항 확인바람.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               departmentCode:
 *                 type: string
 *                 example: "edukit01"
 *                 description: "네이밍규칙 edukit01,edukit02,edukit03...."
 *               name:
 *                 type: string
 *                 example: "영앤리치"
 *               userid:
 *                 type: string
 *                 example: "yhoon8"
 *                 description: "스키마 모델 참고.. unique key"
 *               password:
 *                 type: string
 *                 example: "1111"
 *               role:
 *                 type: string
 *                 example: "manager"
 *                 description: "manager , supervisor , worker"
 *               email:
 *                 type: string
 *                 example: "test@test.com"
 *               phone:
 *                 type: string
 *                 example: "010-1111-1111"
 *             required:
 *               - departmentCode
 *               - name
 *               - userid
 *               - password
 *               - role
 *               - email
 *               - phone
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *       500:
 *         description: 실패-Failed to create a new user
 */

/***
 * @swagger
 * /users/login:
 *   post:
 *     summary: 로그인
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: 로그인성공, 액세스토큰 발급
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Failed to login
 */

/**
 * @swagger
 * /users/search:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Failed to fetch users
 */

/**
 * @swagger
 * /users/profile/{id}:
 *   get:
 *     summary: Get a user by their ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to fetch
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Failed to fetch user details
 */

/**
 * @swagger
 * /users/profile/{id}:
 *   put:
 *     summary: Update a user by their ID
 *     tags: [Users]
 *     parameters:
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Updated user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Failed to update user details
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by their ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: Deleted user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Failed to delete user
 */

// router - 회원가입
router.post('/register', async (req, res) => {
  try {
    const params = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      phone: req.body.phone,
    };
    logger.info(`(employee.reg.params) ${JSON.stringify(params)}`);

    // // 입력값 null 체크
    // if (!params.name || !params.userid || !params.password) {
    //   const err = new Error('Not allowed null (name, userid, password)');
    //   logger.error(err.toString());

    //   res.status(500).json({ err: err.toString() });
    // }

    // 비즈니스 로직 호출
    const result = await employeeService.reg(params);
    logger.info(`(employee.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// router - 로그인
router.post('/login', async (req, res) => {
  try {
    const params = {
      email: req.body.email,
      password: req.body.password,
    };
    logger.info(`(employee.login.params) ${JSON.stringify(params)}`);

    // // 입력값 null 체크
    // if (!params.email || !params.password) {
    //   const err = new Error('Not allowed null (userid, password)');
    //   logger.error(err.toString());

    //   return res.status(500).json({ err: err.toString() });
    // }

    // 비즈니스 로직 호출
    const result = await employeeService.login(params);
    logger.info(`(user.token.result) ${JSON.stringify(result)}`);

    // 토큰 생성
    const { accessToken, refreshToken, payload } = tokenUtil.makeToken(result);

    //비즈니스 로직 호출 - 리프레시 토큰과 회원 ID를 DB에 저장
    const result_Token = await tokenService.regToken({
      employeeID: payload.employeeID,
      refreshToken,
    });
    logger.info(`(token.reg.result) ${JSON.stringify(result_Token)}`);

    res.set('accessToken', accessToken); // header 세팅
    // 최종 응답
    return res.status(200).json(payload);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// router - 전체 조회  - 직급에따라 검색
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

    const result = await employeeService.positionList(params);
    logger.info(`(employee.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// router - 직원 상세정보
router.get('/profile/:id', async (req, res) => {
  try {
    const params = {
      employeeID: req.params.id,
    };
    logger.info(`(employee.info.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await employeeService.info(params);

    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// router - 유저 수정 - 기본정보 [+ 비밀번호 ]
router.put('/profile/:id', async (req, res) => {
  try {
    const passwordParam = 'password'; // 패스워드 바디 파라미터 검사
    let hashPassword = null;
    let params = {};
    // 패스워드 파라미터가 있는지 확인 및 값체크
    if (
      req.body.hasOwnProperty(passwordParam) &&
      req.params.password !== undefined
    ) {
      // 있으면 암호화 진행
      try {
        hashPassword = await hashUtil.makePasswordHash(req.body.password);
      } catch (err) {
        logger.error(`(employee.edit.hashPassword) ${err.toString()}`);
        return res.status(500).json({ error: `hashPassword error` });
      }
      //  hashPassword로 비밀번호 변경해서 params 전달
      const pwParams = {
        password: hashPassword,
      };

      params = {
        employeeID: req.params.id,
        name: req.body.name,
        phone: req.body.phone,
        ...pwParams, // 비밀번호 파라미터 합치기
      };
    } else {
      params = {
        employeeID: req.params.id,
        name: req.body.name,
        phone: req.body.phone,
      };
    }

    logger.info(`(employee.edit.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await employeeService.edit(params);

    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// router - 회원 탈퇴
router.delete('/:id', async (req, res) => {
  try {
    const params = {
      employeeID: req.params.id,
    };
    logger.info(`(employee.delete.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await employeeService.delete(params);

    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
