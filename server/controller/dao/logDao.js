const { Logs } = require('../models/index_mongo');

const dao = {
  // 로그 생성
  insertData(params) {
    return new Promise((resolve, reject) => {
      const data = new Logs(params);
      data
        .save()
        .then((inserted) => {
          resolve(inserted);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = dao;
