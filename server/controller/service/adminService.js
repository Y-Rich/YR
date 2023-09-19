const logger = require('../../lib/logger');
const adminDao = require('../dao/adminDao');
const service = {
  // service - 등록

  // 공장 등록
  async regFac(params) {
    let inserted = null;

    try {
      inserted = await adminDao.insertFactory(params);
      logger.debug(`(adminService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(adminService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  // 공정 등록
  async regLine(params) {
    let inserted = null;

    try {
      inserted = await adminDao.insertLine(params);
      logger.debug(`(adminService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(adminService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  // 직급 등록
  async regPosition(params) {
    let inserted = null;

    try {
      inserted = await adminDao.insertPosition(params);
      logger.debug(`(adminService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(adminService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  // 권한 등록
  async regPermission(params) {
    let inserted = null;

    try {
      inserted = await adminDao.insertPermission(params);
      logger.debug(`(adminService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(adminService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },

  //회원정보 수정
  async edit(params) {
    let result = null;

    try {
      result = await adminDao.update(params);
      logger.debug(`(adminService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(adminService.edit) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // service - 조회

  // 전체 공장 및 전체 공정 조회
  async facList(params) {
    let result = null;

    try {
      result = await adminDao.selectList(params);
      logger.debug(`(adminService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(adminService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 전체 직원 조회
  async employeeList(params) {
    let result = null;

    try {
      result = await adminDao.employeeList(params);
      logger.debug(`(adminService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(adminService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 재고정보 조회
  async inventory(params) {
    let result = null;

    try {
      result = await adminDao.searchInventory(params);
    } catch (err) {
      logger.error(`(adminService.searchInventory) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // 재고정보 등록
  async updateInven(params) {
    let inserted = null;

    try {
      inserted = await adminDao.updateInven(params);
      logger.debug(`(adminDao.updateInven) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(adminDao.updateInven) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },

  // 시간조회 - 최근 가동시간,최근 중지시간 , 최근가동시간 기준 현재까지 가동시간
  async searchRecentTime(params) {
    let result = null;

    try {
      result = await adminDao.searchLog(params);
    } catch (err) {
      logger.error(`(adminService.searchLog) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 로그기록 조회
  async logList(params) {
    let result = null;

    try {
      result = await adminDao.searchLogs(params);
    } catch (err) {
      logger.error(`(adminService.searchLogs) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  //생산관련 서비스 로직
  async searchDailyAvg_Prod(params) {
    let inserted = null;
    try {
      inserted = await adminDao.dailyProdData1(params);
      // logger.debug(`(adminDao.dailyProdData1) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(adminDao.dailyProdData1) ${err.toString()}`);
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
      inserted = await adminDao.weeklyProdData1(params);
      // logger.debug(`(adminDao.weeklyProdData1) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(adminDao.weeklyProdData1) ${err.toString()}`);
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
      inserted = await adminDao.monthlyProdData1(params);
      // logger.debug(`(adminDao.monthlyProdData1) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(adminDao.monthlyProdData1) ${err.toString()}`);
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
