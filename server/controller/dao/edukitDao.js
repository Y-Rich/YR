// const { Edukit1, Edukit1Sensor } = require('../models/index_mongo');
const { Edukit_test, Edukit1Sensor } = require('../models/index_mongo');

const dao = {
  // 에듀킷 상태 저장
  insertData(params) {
    return new Promise((resolve, reject) => {
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
  // 에듀킷 상태 저장 - 2호기도 추가해야함.
  senslist1(params) {
    return new Promise((resolve, reject) => {
      const date = Object.values(params);
      const startDate = new Date(`${date}T00:00:00.000Z`);
      const endDate = new Date(`${date}T23:59:59.999Z`);
      // Edukit1Sensor.find({
      //   $and: [
      //     { createdAt: { $gte: startDate.toISOString() } },
      //     { createdAt: { $lte: endDate.toISOString() } },
      //   ],
      // })
      //   .select('Humidity') // 'Humidity' 필드만 선택
      //   .sort({ createdAt: 1 }) // 'createdAt' 필드를 오름차순으로 정렬

      Edukit1Sensor.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                {
                  $gte: [
                    { $dateFromString: { dateString: '$createdAt' } },
                    { $toDate: startDate },
                  ],
                },
                {
                  $lte: [
                    { $dateFromString: { dateString: '$createdAt' } },
                    { $toDate: endDate },
                  ],
                },
              ],
            },
          },
        },
        {
          $group: {
            _id: {
              year: {
                $year: { $dateFromString: { dateString: '$createdAt' } },
              },
              month: {
                $month: { $dateFromString: { dateString: '$createdAt' } },
              },
              day: {
                $dayOfMonth: { $dateFromString: { dateString: '$createdAt' } },
              },
              hour: {
                $hour: { $dateFromString: { dateString: '$createdAt' } },
              },
            },
            averageHumidity: { $avg: '$Humidity' },
          },
        },
        {
          $sort: {
            '_id.hour': 1, // "hour" 값을 오름차순으로 정렬
          },
        },
        {
          $project: {
            _id: 0, // _id 필드 제거
            hour: '$_id.hour', // 시간대 필드 재설정
            averageHumidity: 1, // averageHumidity 필드 유지
          },
        },
      ])
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
