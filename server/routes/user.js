const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const userService = require('../controller/service/userService');
const tokenUtil = require('../lib/tokenUtil');

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

// 등록
router.post('/register', async (req, res) => {
  try {
    const params = {
      departmentCode: req.body.departmentCode,
      lineCode: req.body.lineCode,
      name: req.body.name,
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
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// 리스트 조회 - role 에따라 검색
router.get('/search', async (req, res) => {
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
router.get('/profile/:id', async (req, res) => {
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
router.put('/profile/:id', async (req, res) => {
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

    res.set('accessToken', token); // header 세팅
    // 최종 응답
    return res.status(200).json(payload);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});
module.exports = router;
