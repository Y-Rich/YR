const {
  Edukit1Sensor,
  Edukit2Sensor,
  Products,
} = require('../models/index_mongo');

const dao = {
  // 에듀킷 상태 저장
  insertData(params) {
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

  // 생산품 등록
  insertProduct(params) {
    return new Promise((resolve, reject) => {
      const Product = new Products(params);
      Product.save()
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
  // 에듀킷 일간 센서데이터 조회 - 2호기도 추가해야함.
  dailySensList1(params) {
    return new Promise((resolve, reject) => {
      const date = Object.values(params)[0];
      const sensorData = Object.keys(params)[0];
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
              hour: {
                $hour: { $dateFromString: { dateString: '$createdAt' } },
              },
            },
            average: { $avg: `$${sensorData}` },
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
            average: 1, // average 필드 유지
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
  // 에듀킷 주간 센서데이터 조회 - 2호기도 추가해야함.
  weeklySensList1(params) {
    return new Promise((resolve, reject) => {
      const date = Object.values(params)[0]; //2023-09-11
      const sensorData = Object.keys(params)[0];
      // 기준 날짜를 가져옵니다.
      const endDate = new Date(`${date}T23:59:59.999Z`);
      // 현재 날짜에서 7일을 뺍니다.
      const oneWeekAgo = new Date(endDate);
      oneWeekAgo.setDate(endDate.getDate() - 7);
      // 시작 날짜를 설정합니다 (일주일 전의 시작).
      const startDate = new Date(
        `${oneWeekAgo.toISOString().split('T')[0]}T00:00:00.000Z`,
      );
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
              // year: {
              //   $year: { $dateFromString: { dateString: '$createdAt' } },
              // },
              // month: {
              //   $month: { $dateFromString: { dateString: '$createdAt' } },
              // },
              day: {
                $dayOfMonth: { $dateFromString: { dateString: '$createdAt' } },
              },
              // hour: {
              //   $hour: { $dateFromString: { dateString: '$createdAt' } },
              // },
            },
            average: { $avg: `$${sensorData}` },
          },
        },
        {
          $sort: {
            '_id.day': 1, // "day" 값을 오름차순으로 정렬
          },
        },
        {
          $project: {
            _id: 0, // _id 필드 제거
            day: '$_id.day', // 시간대 필드 재설정
            average: 1, // average 필드 유지
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

  // 에듀킷 월간 센서데이터 조회 - 2호기도 추가해야함.
  monthlySensList1(params) {
    return new Promise((resolve, reject) => {
      const date = Object.values(params)[0]; //2023-08-11
      const sensorData = Object.keys(params)[0];
      // 기준 날짜를 가져옵니다.
      const currentDate = new Date(`${date}T00:00:00.000Z`);
      // 해당 월의 첫 번째 날짜를 구합니다.
      const firstDayOfMonth = new Date(
        currentDate.getUTCFullYear(),
        // 월은 0부터 시작하므로 현재 월을 그대로 사용
        currentDate.getUTCMonth(),
        1,
      );
      // 해당 월의 마지막 날짜를 구합니다.
      const lastDayOfMonth = new Date(
        currentDate.getUTCFullYear(),
        // 월은 0부터 시작하므로 다음 월의 0일을 마지막 날짜로 사용 //1일 보정
        currentDate.getUTCMonth() + 1,
        1,
      );

      // UTC 시간 차이를 보정합니다.
      const utcOffset = currentDate.getTimezoneOffset();
      firstDayOfMonth.setMinutes(
        firstDayOfMonth.getMinutes() + utcOffset + 18 * 60,
      );
      lastDayOfMonth.setMinutes(
        lastDayOfMonth.getMinutes() + utcOffset + 18 * 60,
      );

      const startDate = firstDayOfMonth;
      const endDate = lastDayOfMonth;

      console.log(`startDate: ${startDate} , endDate: ${endDate}`);

      Edukit1Sensor.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                {
                  $gte: [
                    { $dateFromString: { dateString: '$createdAt' } },
                    startDate,
                  ],
                },
                {
                  $lte: [
                    { $dateFromString: { dateString: '$createdAt' } },
                    endDate,
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
            },
            average: { $avg: `$${sensorData}` },
          },
        },
        {
          $sort: {
            '_id.year': 1,
            '_id.month': 1,
            '_id.day': 1,
          },
        },
        {
          $project: {
            _id: 0,
            year: '$_id.year',
            month: '$_id.month',
            day: '$_id.day',
            average: 1,
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
