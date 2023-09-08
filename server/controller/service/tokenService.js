const logger = require('../../lib/logger');
const tokenDao = require('../dao/tokenDao');
const service = {
  // service - 등록

  // insert DB - refreshToken
  async regToken(params) {
    let inserted = null;

    try {
      inserted = await tokenDao.insert(params);
      logger.debug(`(tokenService.regToken) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(tokenService.regToken) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },

  // search DB  - refreshToken
  async searchToken(params) {
    let inserted = null;
    try {
      inserted = await tokenDao.search(params);
      logger.debug(`(tokenService.searchToken) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(tokenService.searchToken) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },

  // delete data  - refreshToken
  async deleteToken(params) {
    let result = null;
    try {
      result = await tokenDao.delete(params);
      logger.debug(`(tokenService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(tokenService.delete) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // get data  - refreshToken
  async getRefreshToken(params) {
    let result = null;

    try {
      logger.debug(`(tokenService.getToken.params) ${JSON.stringify(params)}`);
      result = await tokenDao.getToken(params);
      logger.debug(`(tokenService.getToken.result) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(tokenService.getToken) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(result);
    });
  },
};

module.exports = service;
