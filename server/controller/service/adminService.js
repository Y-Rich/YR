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
};

module.exports = service;