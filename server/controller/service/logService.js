const logger = require('../../lib/logger');
const logDao = require('../dao/logDao');

const service = {
  //사용자 이력 - 로그인
  async login(params) {
    let inserted = null;

    try {
      inserted = await logDao.insertData(params);
      logger.debug(`(logDao.insertData) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(logDao.insertData) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  //사용자 이력 - 로그아웃
  async logout(params) {
    let inserted = null;

    try {
      inserted = await logDao.insertData(params);
      logger.debug(`(logDao.insertData) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(logDao.insertData) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  //사용자 이력 - control
  async control(params) {
    let inserted = null;

    try {
      inserted = await logDao.insertData(params);
      logger.debug(`(logDao.insertData) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(logDao.insertData) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  //사용자 이력 - view : 공정 시작시간 , 종료시간
  async FacTime(params) {
    let inserted = null;

    try {
      inserted = await logDao.insertData(params);
      logger.debug(`(logDao.viewData) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(logDao.viewData) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },

  // - **생산관련 이력** : 공정 시작시간 , 종료시간 / 총 가동시간  / 제품 각 공정별 생산기록

  //생산관련 이력 - 제품 각 공정별 생산기록
  async product(params) {
    let inserted = null;

    try {
      inserted = await logDao.insertData(params);
      logger.debug(`(logDao.insertData) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(logDao.insertData) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
};

module.exports = service;
