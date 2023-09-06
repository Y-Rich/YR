const logger = require('../../lib/logger');
const lineDao = require('../dao/lineDao');

const service = {
  // department 입력
  async reg(params) {
    let inserted = null;

    try {
      inserted = await lineDao.insert(params);
      logger.debug(`(lineService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(lineService.reg) ${err.toString()}`);
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
