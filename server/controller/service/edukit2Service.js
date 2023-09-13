const logger = require('../../lib/logger');
const edukit2Dao = require('../dao/edukit2Dao');

const service = {
  // 에듀킷 상태 데이터 저장 서비스로직
  async saveStatus(params) {
    let inserted = null;

    try {
      inserted = await edukit2Dao.insertData(params);
      // logger.debug(`(edukit2Service.insertData) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(edukit2Service.insertData) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  // 비전센서 이미지 저장 서비스로직
  async saveImage(params) {
    let inserted = null;

    try {
      inserted = await edukit2Dao.insertImage(params);
      // logger.debug(`(edukit2Service.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(edukit2Service.saveImage) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  // 제품 등록 서비스로직
  async regProduct(params) {
    let inserted = null;

    try {
      inserted = await edukit2Dao.insertProduct(params);
      logger.debug(`(edukit2Service.regProduct) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(edukit2Service.reg) ${err.toString()}`);
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
      inserted = await edukit2Dao.insertSensData1(params);
      // logger.debug(
      //   `(edukit2Service.insertSensData1) ${JSON.stringify(inserted)}`,
      // );
    } catch (err) {
      logger.error(`(edukit2Service.insertSensData1) ${err.toString()}`);
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
      inserted = await edukit2Dao.dailySensList1(params);
      // logger.debug(`(edukit2Dao.dailySensList1) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(edukit2Dao.dailySensList1) ${err.toString()}`);
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
      inserted = await edukit2Dao.weeklySensList1(params);
      // logger.debug(`(edukit2Dao.weeklySensList1) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(edukit2Dao.weeklySensList1) ${err.toString()}`);
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
      inserted = await edukit2Dao.monthlySensList1(params);
      // logger.debug(`(edukit2Dao.monthlySensList1) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(edukit2Dao.monthlySensList1) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },

  //생산관련 서비스 로직
  async searchDailyAvg_Prod(params) {
    let inserted = null;
    try {
      inserted = await edukit2Dao.dailyProdData1(params);
      // logger.debug(`(edukit2Dao.dailyProdData1) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(edukit2Dao.dailyProdData1) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  async searchWeeklyAvg_Prod(params) {
    let inserted = null;
    try {
      inserted = await edukit2Dao.weeklyProdData1(params);
      // logger.debug(`(edukit2Dao.weeklyProdData1) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(edukit2Dao.weeklyProdData1) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  async searchMonthlyAvg_Prod(params) {
    let inserted = null;
    try {
      inserted = await edukit2Dao.monthlyProdData1(params);
      // logger.debug(`(edukit2Dao.monthlyProdData1) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(edukit2Dao.monthlyProdData1) ${err.toString()}`);
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
