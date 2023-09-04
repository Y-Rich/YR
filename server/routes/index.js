const express = require('express');
const logger = require('../lib/logger');
const sampleRouter = require('./sample');
const mongoRouter = require('./sample_mongo');
const departmentRouter = require('./department');
const userRouter = require('./user');

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

//부서 , 회원 , 에듀킷 1,2,3,호기 CRUD
router.use('/departments', departmentRouter);
router.use('/users', userRouter);

module.exports = router;
