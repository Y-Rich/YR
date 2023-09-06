const express = require('express');
const sampleRouter = require('./sample');
const mongoRouter = require('./sample_mongo');
const controlRouter = require('./control');
const employeeRouter = require('./employee');
const adminRouter = require('./admin');

const router = express.Router();

// ...(중간생략)...
router.get('/', (req, res) => {
  res.json('api라우팅테스트');
});
router.get('/test', (req, res) => {
  res.json('api라우팅테스트2');
});

// Mongo CRUD test
router.use('/mongo', mongoRouter);
// MySQL CRUD test
router.use('/sample', sampleRouter);

// 직원 CRUD 라우터
router.use('/users', employeeRouter);

//에듀킷 1,2,3,호기 CRUD 라우트
router.use('/control', controlRouter);

// 전체관리용 라우트
router.use('/admin', adminRouter);

module.exports = router;
