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
  // dao - search
  search(params) {
    return new Promise((resolve, reject) => {
      Token.findOne({
        where: { employeeID: params.employeeID },
      })
        .then((inserted) => {
          resolve(inserted);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // dao - delete
  delete(params) {
    return new Promise((resolve, reject) => {
      // User.findAll
      Token.destroy({
        where: { employeeID: params.employeeID },
      })
        .then((deleted) => {
          resolve({ deletedCount: deleted });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // dao - get
  getToken(params) {
    return new Promise((resolve, reject) => {
      Token.findOne({
        where: { employeeID: params.employeeID },
      })
        .then((selectedInfo) => {
          resolve(selectedInfo);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = dao;
