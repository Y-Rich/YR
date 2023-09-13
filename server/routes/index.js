const express = require('express');
const sampleRouter = require('./sample');
const mongoRouter = require('./sample_mongo');
const controlRouter = require('./control');
const dataRouter = require('./data');
const employeeRouter = require('./employee');
const adminRouter = require('./admin');
const { isLoggedIn } = require('../lib/middleware');
const mockDataGen = require('../lib/mockDataGen');

const router = express.Router();

// ...(중간생략)...
router.get('/', (req, res) => {
  res.json('api라우팅테스트');
});
router.get('/test', (req, res) => {
  res.json('api라우팅테스트2');
});

router.get('/mockData', (req, res) => {
  mockDataGen();
  res.json('mockDataGen');
});

// Mongo CRUD test
router.use('/mongo', mongoRouter);
// MySQL CRUD test
router.use('/sample', sampleRouter);

// 직원 CRUD 라우터
router.use('/users', employeeRouter);

//에듀킷 1,2,3,개별공정+ 전체공정 컨트롤
router.use('/control', isLoggedIn, controlRouter);

//에듀킷 1,2,3,개별공정+ 전체공정에 대한 상태조회
// router.use('/status', isLoggedIn, controlRouter);

//에듀킷에 대한 공정 데이터 조회 [센서 데이터 포함]
router.use('/data', isLoggedIn, dataRouter);

// 전체관리용 라우트
router.use('/admin', isLoggedIn, adminRouter);

module.exports = router;
