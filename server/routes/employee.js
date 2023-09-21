const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const employeeService = require('../controller/service/employeeService');
const logService = require('../controller/service/logService');

const tokenService = require('../controller/service/tokenService');
const tokenUtil = require('../lib/tokenUtil');
const hashUtil = require('../lib/hashUtil');
const { isLoggedIn } = require('../lib/middleware');
const mailSender = require('../lib/nodeMailer');
const env = require('dotenv');
env.config();
const { SECRET } = process.env;

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: Employee - 유저 CRUD 기능
 */

//완료 - 회원가입

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: 사용자 회원가입
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 사용자 이메일 주소
 *               password:
 *                 type: string
 *                 description: 사용자 비밀번호
 *               name:
 *                 type: string
 *                 description: 사용자 이름
 *               phone:
 *                 type: string
 *                 description: 사용자 전화번호
 *             required:
 *               - email
 *               - password
 *               - name
 *               - phone
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/Employee'
 *       400:
 *         description: 이메일, 비밀번호, 이름, 전화번호는 필수입니다.
 *       500:
 *         description: 회원가입에 실패했습니다.
 */

//완료 - 로그인

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: 사용자 로그인
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 사용자 이메일 주소
 *               password:
 *                 type: string
 *                 description: 사용자 비밀번호
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: 로그인 성공, 액세스 토큰 발급
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/Employee'
 *       400:
 *         description: 이메일과 비밀번호는 필수입니다.
 *       401:
 *         description: 이메일 또는 비밀번호가 잘못되었습니다.
 *       500:
 *         description: 로그인에 실패했습니다.
 */

//완료 - 직원 상세 정보 조회

/**
 * @swagger
 * /users/profile/{id}:
 *   get:
 *     summary: 직원 상세 정보 조회
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 직원의 고유 ID
 *     responses:
 *       200:
 *         description: 직원 상세 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       401:
 *         description: unauthorized.로그인 권한이 필요.
 *       500:
 *         description: 조회에 실패했습니다.
 */

//완료 - 유저 정보 수정

/**
 * @swagger
 * /users/profile/{id}:
 *   put:
 *     summary: 유저 정보 수정
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 수정 대상 유저의 고유 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 유저 이름
 *               phone:
 *                 type: string
 *                 description: 유저 전화번호
 *               password:
 *                 type: string
 *                 description: 변경할 비밀번호
 *     responses:
 *       200:
 *         description: 유저 정보 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/Employee'
 *       500:
 *         description: 유저 정보 수정에 실패했습니다.
 */

//완료 - 회원 탈퇴

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: 회원 탈퇴
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 탈퇴할 회원의 고유 ID
 *     responses:
 *       200:
 *         description: 회원 탈퇴 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: 탈퇴 결과 메시지
 *       500:
 *         description: 회원 탈퇴에 실패했습니다.
 */

/**
 * @swagger
 * /users/logout:
 *   get:
 *     summary: 로그아웃
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: 로그아웃 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: 로그아웃 결과 메시지
 *       500:
 *         description: 로그아웃에 실패했습니다.
 */

/**
 * @swagger
 * /users/password-reset:
 *   post:
 *     summary: 비밀번호 재설정(1)
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 사용자 이메일 주소
 *               toEmail:
 *                 type: string
 *                 description: 수신할 이메일 주소
 *               secret:
 *                 type: string
 *                 description: 사내 발급 시크릿 키
 *             required:
 *               - email
 *               - toEmail
 *               - secret
 *     responses:
 *       200:
 *         description: 비밀번호 재설정 이메일 전송 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: 이메일 전송 결과 메시지
 *       401:
 *         description: 파라미터 오류 또는 유효하지 않은 시크릿 키
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: 오류 메시지
 *       500:
 *         description: 이메일 전송에 실패했습니다.
 */

/**
 * @swagger
 * /users/password:
 *   put:
 *     summary: 비밀번호 재설정(2)
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 사용자 이메일 주소
 *               password:
 *                 type: string
 *                 description: 새로운 비밀번호
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: 비밀번호 업데이트 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 업데이트 성공 메시지
 *       400:
 *         description: 파라미터 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 오류 메시지
 *       500:
 *         description: 비밀번호 업데이트에 실패했습니다.
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

    // 유효성 검사 - 입력값 null 체크
    if (!params.email || !params.password || !params.name || !params.phone) {
      const err = new Error('Not allowed null (email, name, phone, password)');
      logger.error(err.toString());

      res.status(400).json({ err: err.toString() });
    }

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
  let payload;
  try {
    const params = {
      email: req.body.email,
      password: req.body.password,
    };
    logger.info(`(employee.login.params) ${JSON.stringify(params)}`);

    // 유효성 검사 - 입력값 null 체크
    if (!params.email || !params.password) {
      const err = new Error('Not allowed null (email, password)');
      logger.error(err.toString());

      return res.status(401).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await employeeService.login(params);
    logger.info(`(employee.login.result) ${JSON.stringify(result)}`);

    //비즈니스 로직 호출 - 리프레시 토큰 DB 체크
    const tokenCheck = await tokenService.searchToken({
      employeeID: result.employeeID,
    });
    logger.debug(`(token.searchToken.result) ${JSON.stringify(tokenCheck)}`);

    // 리프레시 토큰이 DB에 없다면 토큰 프로세스 계속 진행
    if (tokenCheck === null) {
      const { accessToken, refreshToken, payload } =
        tokenUtil.makeToken(result);
      logger.debug(`(tokenUtil.makeToken.result) ${JSON.stringify(result)}`);
      //비즈니스 로직 호출 - 리프레시 토큰과 회원 ID를 DB에 저장
      const insertToken = await tokenService.regToken({
        employeeID: payload.employeeID,
        refreshToken,
      });
      logger.info(`(token.reg.result) ${JSON.stringify(insertToken)}`);

      // 로그인 로그 서비스 로직 추가
      await logService.login({
        ...payload,
        type: 'login',
        Category: 'employee',
      });
      logger.info(`(logService.login) logged successfully.`);

      res.set('accessToken', accessToken); // header 세팅
      return res.status(200).json(payload);
    }
    // 리프레시 토큰있으면 액세스 토큰 발급 + 페이로드 제공
    else {
      const { accessToken, payload } = tokenUtil.makeAccessToken(result);
      // 로그인 로그 서비스 로직 추가
      await logService.login({
        ...payload,
        type: 'login',
        Category: 'employee',
      });
      logger.info(`(logService.login) logged successfully.`);
      res.set('accessToken', accessToken); // header 세팅
      return res.status(200).json(payload);
    }
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// router - 직원상세정보
router.get('/profile/:id', isLoggedIn, async (req, res) => {
  try {
    const params = {
      employeeID: req.params.id,
    };
    logger.debug(`(employee.info.params) ${JSON.stringify(params)}`);

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

// router - 로그아웃
router.get('/logout', async (req, res) => {
  // 토큰을 보내면 해당 토큰에 담겨있는 유저id로 DB에 리프레시토큰 삭제 요청
  try {
    const token = req.headers && req.headers.accesstoken;
    logger.debug(`(employee.logout.token) accesstoken:${token}`);
    // 토큰 확인
    const decoded = tokenUtil.decodeToken(token);
    const id = decoded.employeeID;
    // 비즈니스 로직 호출
    logger.info(`(employee.logout.decoded) ${JSON.stringify(id)}`);
    const result = await tokenService.deleteToken({ employeeID: id });
    // 로그아웃 로그 서비스 로직 추가
    await logService.logout({
      ...decoded,
      type: 'logout',
      Category: 'employee',
    });
    logger.info(`(logService.logout) logged successfully.`);
    // 최종 응답
    return res.status(200).json('successfully logout.... ');
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// router - 비밀번호 재설정(1)
router.post('/password-reset', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(401).json('parameter error.... required : req.body');
    }
    if (!req.body.email || !req.body.toEmail || !req.body.secret) {
      return res
        .status(401)
        .json('parameter error.... required field: email , toEmail , secret ');
    }
    const params = {
      email: req.body.email, // 찾으려는 이메일
      toEmail: req.body.toEmail, // 수신할 이메일
      secret: req.body.secret, // 사내 발급 시크릿키
    };
    // 시크릿키 검증
    if (params.secret != SECRET) {
      return res.status(401).json('parameter error....  invalid secret key. ');
    }

    // 직원 찾기 서비스 로직 호출
    const employee = {
      email: req.body.email,
    };
    const findResult = await employeeService.findEmployee(employee);
    if (findResult !== null) {
      logger.info(
        `(employeeService.findEmployee.result) user exists... ${findResult.dataValues.email}`,
      );
    } else {
      return res.status(401).json({ error: '해당 유저를 찾을수 없습니다. ' });
    }
    // 메일 발송
    const result = await mailSender.sendGmail(params, employee.email);
    console.log(result);
    logger.info(`(mailSender.sendGmail) sent password-reset email.`);
    return res.status(200).json('sent password-reset email.......');
  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
});

// router - 비밀번호 재설정(2)
router.put('/password', async (req, res) => {
  try {
    // 패스워드 파라미터가 있는지 확인 및 값체크
    if (!req.body) {
      return res
        .status(400)
        .json({ error: 'body parameter error... required: email , password' });
    }

    let hashPassword = null;

    if (req.body.email && req.body.password) {
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
      const params = {
        email: req.body.email,
        ...pwParams, // 비밀번호 파라미터 합치기
      };
      logger.info(`(employee.editPW.params) ${JSON.stringify(params)}`);

      // 비즈니스 로직 호출
      const result = await employeeService.editPW(params);
      // 최종 응답
      return res
        .status(200)
        .json({ message: '성공적으로 업데이트 되었습니다.' });
    } else if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ err: 'body parameter error. required: email,password' });
    }
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
