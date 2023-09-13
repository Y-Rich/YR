const logger = require('../../lib/logger');
const edukit1Dao = require('../dao/edukit1Dao');

const service = {
  // CRUD - Create
  async saveStatus(params) {
    let inserted = null;

    try {
      inserted = await edukit1Dao.insertData(params);
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
      inserted = await edukit1Dao.insertImage(params);
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
  //
  async regProduct(params) {
    let inserted = null;

    try {
      inserted = await edukit1Dao.insertProduct(params);
      logger.debug(`(edukit1Service.regProduct) ${JSON.stringify(inserted)}`);
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

  //센서 서비스로직
  async saveTempAndHumi(params) {
    let inserted = null;

    try {
      inserted = await edukit1Dao.insertSensData1(params);
      // logger.debug(
      //   `(edukit1Service.insertSensData1) ${JSON.stringify(inserted)}`,
      // );
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
  async searchDailyAvg(params) {
    let inserted = null;
    try {
      inserted = await edukit1Dao.dailySensList1(params);
      // logger.debug(`(edukit1Dao.dailySensList1) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(edukit1Dao.dailySensList1) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  async searchWeeklyAvg(params) {
    let inserted = null;
    try {
      inserted = await edukit1Dao.weeklySensList1(params);
      // logger.debug(`(edukit1Dao.weeklySensList1) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(edukit1Dao.weeklySensList1) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  async searchMonthlyAvg(params) {
    let inserted = null;
    try {
      inserted = await edukit1Dao.monthlySensList1(params);
      // logger.debug(`(edukit1Dao.monthlySensList1) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(edukit1Dao.monthlySensList1) ${err.toString()}`);
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
