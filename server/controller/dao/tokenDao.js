const { Token } = require('../models/index');

const dao = {
  // dao - 토큰 저장
  insert(params) {
    return new Promise((resolve, reject) => {
      Token.create(params)
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
