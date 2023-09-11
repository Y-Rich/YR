const logger = require('../../lib/logger');
const edukitDao = require('../dao/edukitDao');

const service = {
  // CRUD - Create
  async saveStatus(params) {
    let inserted = null;

    try {
      inserted = await edukitDao.insertData(params);
      // logger.debug(`(edukit1Service.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(edukit1Service.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  // 비전센서 이미지 저장
  async saveImage(params) {
    let inserted = null;

    try {
      inserted = await edukitDao.insertImage(params);
      // logger.debug(`(edukit1Service.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(edukit1Service.saveImage) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },

  async saveTempAndHumi(params) {
    let inserted = null;

    try {
      inserted = await edukitDao.insertSensData1(params);
      logger.debug(
        `(edukit1Service.insertSensData1) ${JSON.stringify(inserted)}`,
      );
    } catch (err) {
      logger.error(`(edukit1Service.insertSensData1) ${err.toString()}`);
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
