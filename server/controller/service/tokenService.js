const logger = require('../../lib/logger');
const tokenDao = require('../dao/tokenDao');
const service = {
  // service - 등록

  //토큰셋 DB 등록
  async regToken(params) {
    let inserted = null;

    try {
      inserted = await tokenDao.insert(params);
      logger.debug(`(tokenService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(tokenService.reg) ${err.toString()}`);
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
