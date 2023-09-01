const express = require('express');
const logger = require('../lib/logger');
const departmentRouter = require('./sample');
const mongoRouter = require('./sample_mongo');

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
router.use('/sample', departmentRouter);

module.exports = router;
