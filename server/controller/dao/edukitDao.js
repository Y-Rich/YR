// const { Edukit1, Edukit1Sensor } = require('../models/index_mongo');
const { Edukit_test, Edukit1Sensor } = require('../models/index_mongo');

const dao = {
  // 에듀킷 상태 저장
  insertData(params) {
    return new Promise((resolve, reject) => {
      // tagId 오름차순으로 정렬
      params.Wrapper.sort((a, b) => a.tagId - b.tagId);

      // date를 최상단으로 이동
      const dateObj = params.Wrapper.find((item) => item.name === 'DataTime');
      if (dateObj) {
        params.DataTime = dateObj.value;
        params.Wrapper = params.Wrapper.filter(
          (item) => item.name !== 'DataTime',
        );
        params.Wrapper.unshift(dateObj);
      }
      const data = new Edukit_test(params);
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

  insertImage(params) {
    return new Promise((resolve, reject) => {
      const data = new Edukit1Sensor(params);
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

  //온습도 데이터 저장
  insertSensData1(params) {
    return new Promise((resolve, reject) => {
      const data = new Edukit1Sensor(params);
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
