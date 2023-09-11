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
  // CRUD - Read / 특정조건으로
  //네이밍 컨벤션 유지
  async list(params) {
    let result = null;

    try {
      result = await mongoDao.selectList(params);
      logger.debug(`(mongoService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(mongoService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // // selectInfo
  // async info(params) {
  //   let result = null;

  //   try {
  //     result = await departmentDao.selectInfo(params);
  //     logger.debug(`(departmentService.info) ${JSON.stringify(result)}`);
  //   } catch (err) {
  //     logger.error(`(departmentService.info) ${err.toString()}`);
  //     return new Promise((resolve, reject) => {
  //       reject(err);
  //     });
  //   }

  //   return new Promise((resolve) => {
  //     resolve(result);
  //   });
  // },
  // update
  async edit(params) {
    let result = null;

    try {
      result = await mongoDao.update(params);
      logger.debug(`(mongoService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(mongoService.edit) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // delete
  async delete(params) {
    let result = null;

    try {
      result = await mongoDao.delete(params);
      logger.debug(`(mongoService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(mongoService.delete) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
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
};

module.exports = service;
