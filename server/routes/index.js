const express = require('express');
const sampleRouter = require('./sample');
const mongoRouter = require('./sample_mongo');
const controlRouter = require('./control');
const dataRouter = require('./data');
const employeeRouter = require('./employee');
const adminRouter = require('./admin');
const { swaggerUi, specs } = require('../lib/swagger');

const { isLoggedIn } = require('../lib/middleware');
const {
  mockDataGen_Products,
  mockDataGen_HumiAndTempAndPar,
} = require('../lib/mockDataGen');

const router = express.Router();

// router - 라우팅 테스트
router.get('/test', (req, res) => {
  res.json('api라우팅테스트');
});

// Mongo CRUD test
router.use('/mongo', mongoRouter);
// MySQL CRUD test
router.use('/sample', sampleRouter);

// router - mockdata gen
router.get('/mockData', (req, res) => {
  // mockDataGen_HumiAndTempAndPar();
  mockDataGen_Products();
  res.json('mockDataGen_Products');
});

// router - swagger
router.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

// 직원 CRUD 라우터
router.use('/users', employeeRouter);

//에듀킷 1,2,3,개별공정+ 전체공정 컨트롤
router.use('/control', isLoggedIn, controlRouter);

//에듀킷에 대한 공정 데이터 조회 [센서 데이터 포함]
router.use('/data', isLoggedIn, dataRouter);

// 전체관리용 라우트
router.use('/admin', isLoggedIn, adminRouter);

module.exports = router;
