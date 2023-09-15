const {
  Factory,
  ProductionLine,
  Position,
  Permission,
  Employee,
} = require('../models/index');

const { Products } = require('../models/index_mongo');

const dao = {
  // dao - 공장 등록
  insertFactory(params) {
    return new Promise((resolve, reject) => {
      Factory.create(params)
        .then((inserted) => {
          resolve(inserted);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // dao - 공정라인 등록
  insertLine(params) {
    return new Promise((resolve, reject) => {
      ProductionLine.create(params)
        .then((inserted) => {
          resolve(inserted);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // dao - 직급 등록
  insertPosition(params) {
    return new Promise((resolve, reject) => {
      Position.create(params)
        .then((inserted) => {
          resolve(inserted);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // dao - 권한 등록
  insertPermission(params) {
    return new Promise((resolve, reject) => {
      Permission.create(params)
        .then((inserted) => {
          resolve(inserted);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // dao - 직원 권한 수정
  update(params) {
    return new Promise((resolve, reject) => {
      Employee.update(params, {
        // id를 조건으로 검색하여 update
        where: { employeeID: params.employeeID },
      })
        .then((updated) => {
          resolve({ updatedCount: updated });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // dao - 공장 전체 공정 조회
  selectList(params) {
    // where 검색 조건
    const setQuery = {};
    if (params.factoryID) {
      setQuery.where = {
        ...setQuery.where,
        factoryID: { [Op.like]: `%${params.factoryID}%` }, // like검색
      };
    }

    // order by 정렬 조건
    setQuery.order = [['factoryID', 'ASC']];

    return new Promise((resolve, reject) => {
      Factory.findAndCountAll({
        ...setQuery,
        include: [
          {
            model: ProductionLine,
            // attributes: ProductionLine.includeAttributes,
          },
        ],
      })
        .then((selectedList) => {
          resolve(selectedList);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // dao - 전체 직원 조회
  employeeList(params) {
    // where 검색 조건
    const setQuery = {};
    // if (params.positionID) {
    //   setQuery.where = {
    //     ...setQuery.where,
    //     positionID: { [Op.like]: `%${params.positionID}%` }, // like검색
    //   };
    // }
    // if (params.userid) {
    //   setQuery.where = {
    //     ...setQuery.where,
    //     userid: params.userid, // '='검색
    //   };
    // }

    // order by 정렬 조건
    setQuery.order = [['employeeID', 'DESC']];

    return new Promise((resolve, reject) => {
      Employee.findAndCountAll({
        ...setQuery,
        attributes: { exclude: ['password'] }, // password 필드 제외
        include: [
          {
            model: Position,
            as: 'Position',
            attributes: ['positionName', 'description'],
          },
        ],
      })
        .then((selectedList) => {
          resolve(selectedList);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // 생산 관련 일간 데이터 조회
  dailyProdData1(params) {
    return new Promise((resolve, reject) => {
      let searchField, date;
      if (params.Category) {
        searchField = params.Category; //data example : "line3"   [string]
        date = params.date; // data example : "2023-09-11"  [string]
      } else if (params.List) {
        searchField = params.List; //data example : ["line1","line2","line3"]   [string]
        date = params.date; // data example : "2023-09-11"  [string]
      } else if (params.Defect) {
        searchField = params.Defect; //data example : ["line1","line2","line3"]   [string]
        date = params.date; // data example : "2023-09-11"  [string]
      }
      const startDate = new Date(`${date}T00:00:00.000Z`);
      const endDate = new Date(`${date}T23:59:59.999Z`);
      // prodData 필드
      if (params.List) {
        Products.aggregate([
          {
            $match: {
              Category: { $in: searchField },
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
              _id: '$Category', // Tag 필드의 각 값 별로 그룹화
              count: { $sum: 1 }, // 각 그룹의 개수 합계
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
        ])
          .then((inserted) => {
            resolve(inserted);
          })
          .catch((err) => {
            reject(err);
          });
      } else if (params.Defect) {
        Products.aggregate([
          {
            $match: {
              Category: { $in: searchField },
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
              t1Sum: {
                $sum: {
                  $cond: {
                    if: { $eq: ['$Category', searchField[0]] },
                    then: 1,
                    else: 0,
                  },
                },
              },
              t2Sum: {
                $sum: {
                  $cond: {
                    if: { $eq: ['$Category', searchField[1]] },
                    then: 1,
                    else: 0,
                  },
                },
              },
            },
          },
          {
            $sort: { '_id.hour': 1 },
          },
          {
            $project: {
              _id: 0,
              hour: '$_id.hour',
              t1Sum: '$t1Sum',
              t2Sum: '$t2Sum',
              DefectProducts: { $subtract: ['$t1Sum', '$t2Sum'] }, //t1MinusT2
              DefectRatio: {
                $cond: {
                  if: { $eq: ['$t1Sum', 0] },
                  then: 0,
                  else: {
                    $divide: [{ $subtract: ['$t1Sum', '$t2Sum'] }, '$t1Sum'],
                  },
                },
              },
            },
          },
          {
            $group: {
              _id: null,
              total_t1sum: { $sum: '$t1Sum' },
              total_t2sum: { $sum: '$t2Sum' },
              Detail: {
                $push: {
                  hour: '$hour',
                  t1Sum: '$t1Sum',
                  t2Sum: '$t2Sum',
                  DefectProducts: '$DefectProducts',
                  DefectRatio: '$DefectRatio',
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              total_t1sum: 1,
              total_t2sum: 1,
              total_DefectProducts: {
                $subtract: ['$total_t1sum', '$total_t2sum'],
              }, //t1MinusT2
              total_DefectRatio: {
                $cond: {
                  if: { $eq: ['$total_t1sum', 0] },
                  then: 0,
                  else: {
                    $divide: [
                      { $subtract: ['$total_t1sum', '$total_t2sum'] },
                      '$total_t1sum',
                    ],
                  },
                },
              },
              Detail: 1,
            },
          },
        ])
          .then((inserted) => {
            resolve(inserted);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        Products.aggregate([
          {
            $match: {
              Category: searchField, // 특정 Category 값과 일치하는 문서를 필터링
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
              total: { $sum: 1 }, // 시간대별로 문서 수를 합산하여 "total" 필드에 저장
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
              total: 1, // total 필드 유지
            },
          },
        ])
          .then((inserted) => {
            resolve(inserted);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  },
  // 생산 관련 주간 데이터 조회
  weeklyProdData1(params) {
    return new Promise((resolve, reject) => {
      let date;
      if (params.Category) {
        searchField = params.Category; //data example : "line3"   [string]
        date = params.date; // data example : "2023-09-11"  [string]
      } else if (params.List) {
        searchField = params.List; //data example : ["line1","line2","line3"]   [string]
        date = params.date; // data example : "2023-09-11"  [string]
      } else if (params.Defect) {
        searchField = params.Defect; //data example : ["line1","line2","line3"]   [string]
        date = params.date; // data example : "2023-09-11"  [string]
      } else {
        const date = Object.values(params)[0]; //2023-09-11
        const sensorData = Object.keys(params)[0];
      }
      // 기준 날짜를 가져옵니다.
      const endDate = new Date(`${date}T23:59:59.999Z`);
      // 현재 날짜에서 7일을 뺍니다.
      const oneWeekAgo = new Date(endDate);
      oneWeekAgo.setDate(endDate.getDate() - 7);
      // 시작 날짜를 설정합니다 (일주일 전의 시작).
      const startDate = new Date(
        `${oneWeekAgo.toISOString().split('T')[0]}T00:00:00.000Z`,
      );
      if (params.List) {
        Products.aggregate([
          {
            $match: {
              Category: { $in: searchField },
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
              _id: '$Category', // Tag 필드의 각 값 별로 그룹화
              count: { $sum: 1 }, // 각 그룹의 개수 합계
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
        ])
          .then((inserted) => {
            resolve(inserted);
          })
          .catch((err) => {
            reject(err);
          });
      } else if (params.Defect) {
        Products.aggregate([
          {
            $match: {
              Category: { $in: searchField },
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
                  $dayOfMonth: {
                    $dateFromString: { dateString: '$createdAt' },
                  },
                },
              },
              t1Sum: {
                $sum: {
                  $cond: {
                    if: { $eq: ['$Category', searchField[0]] },
                    then: 1,
                    else: 0,
                  },
                },
              },
              t2Sum: {
                $sum: {
                  $cond: {
                    if: { $eq: ['$Category', searchField[1]] },
                    then: 1,
                    else: 0,
                  },
                },
              },
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
              day: '$_id.day',
              t1Sum: '$t1Sum',
              t2Sum: '$t2Sum',
              DefectProducts: { $subtract: ['$t1Sum', '$t2Sum'] }, //t1MinusT2
              DefectRatio: {
                $cond: {
                  if: { $eq: ['$t1Sum', 0] },
                  then: 0,
                  else: {
                    $divide: [{ $subtract: ['$t1Sum', '$t2Sum'] }, '$t1Sum'],
                  },
                },
              },
            },
          },
          {
            $group: {
              _id: null,
              total_t1sum: { $sum: '$t1Sum' },
              total_t2sum: { $sum: '$t2Sum' },
              Detail: {
                $push: {
                  day: '$day',
                  t1Sum: '$t1Sum',
                  t2Sum: '$t2Sum',
                  DefectProducts: '$DefectProducts',
                  DefectRatio: '$DefectRatio',
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              total_t1sum: 1,
              total_t2sum: 1,
              total_DefectProducts: {
                $subtract: ['$total_t1sum', '$total_t2sum'],
              }, //t1MinusT2
              total_DefectRatio: {
                $cond: {
                  if: { $eq: ['$total_t1sum', 0] },
                  then: 0,
                  else: {
                    $divide: [
                      { $subtract: ['$total_t1sum', '$total_t2sum'] },
                      '$total_t1sum',
                    ],
                  },
                },
              },
              Detail: 1,
            },
          },
        ])
          .then((inserted) => {
            resolve(inserted);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        Products.aggregate([
          {
            $match: {
              Category: searchField, // 특정 Category 값과 일치하는 문서를 필터링
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
                month: {
                  $month: { $dateFromString: { dateString: '$createdAt' } },
                },
                day: {
                  $dayOfMonth: {
                    $dateFromString: { dateString: '$createdAt' },
                  },
                },
                // hour: {
                //   $hour: { $dateFromString: { dateString: '$createdAt' } },
                // },
              },
              total: { $sum: 1 }, // 일자별로 문서 수를 합산하여 "total" 필드에 저장
            },
          },
          {
            $sort: {
              '_id.month': 1, // "day" 값을 오름차순으로 정렬
              '_id.day': 1, // "day" 값을 오름차순으로 정렬
            },
          },
          {
            $project: {
              _id: 0, // _id 필드 제거
              month: '$_id.month', // 날짜별 필드 재설정
              day: '$_id.day', // 날짜별 필드 재설정
              total: 1, // total 필드 유지
            },
          },
        ])
          .then((inserted) => {
            resolve(inserted);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  },
  // 생산 관련 월간 데이터 조회
  monthlyProdData1(params) {
    return new Promise((resolve, reject) => {
      let searchField, date;
      if (params.Category) {
        searchField = params.Category; //data example : "line3"   [string]
        date = params.date; // data example : "2023-09-11"  [string]
      } else if (params.List) {
        searchField = params.List; //data example : ["line1","line2","line3"]   [string]
        date = params.date; // data example : "2023-09-11"  [string]
      } else if (params.Defect) {
        searchField = params.Defect; //data example : ["line1","line2","line3"]   [string]
        date = params.date; // data example : "2023-09-11"  [string]
      } else {
        const date = Object.values(params)[0]; //2023-09-11
        const sensorData = Object.keys(params)[0];
      }
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
      if (params.List) {
        Products.aggregate([
          {
            $match: {
              Category: { $in: searchField },
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
              _id: '$Category', // Tag 필드의 각 값 별로 그룹화
              count: { $sum: 1 }, // 각 그룹의 개수 합계
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
        ])
          .then((inserted) => {
            resolve(inserted);
          })
          .catch((err) => {
            reject(err);
          });
      } else if (params.Defect) {
        Products.aggregate([
          {
            $match: {
              Category: { $in: searchField },
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
                  $dayOfMonth: {
                    $dateFromString: { dateString: '$createdAt' },
                  },
                },
              },
              t1Sum: {
                $sum: {
                  $cond: {
                    if: { $eq: ['$Category', searchField[0]] },
                    then: 1,
                    else: 0,
                  },
                },
              },
              t2Sum: {
                $sum: {
                  $cond: {
                    if: { $eq: ['$Category', searchField[1]] },
                    then: 1,
                    else: 0,
                  },
                },
              },
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
              day: '$_id.day',
              t1Sum: '$t1Sum',
              t2Sum: '$t2Sum',
              DefectProducts: { $subtract: ['$t1Sum', '$t2Sum'] }, //t1MinusT2
              DefectRatio: {
                $cond: {
                  if: { $eq: ['$t1Sum', 0] },
                  then: 0,
                  else: {
                    $divide: [{ $subtract: ['$t1Sum', '$t2Sum'] }, '$t1Sum'],
                  },
                },
              },
            },
          },
          {
            $group: {
              _id: null,
              total_t1sum: { $sum: '$t1Sum' },
              total_t2sum: { $sum: '$t2Sum' },
              Detail: {
                $push: {
                  day: '$day',
                  t1Sum: '$t1Sum',
                  t2Sum: '$t2Sum',
                  DefectProducts: '$DefectProducts',
                  DefectRatio: '$DefectRatio',
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              total_t1sum: 1,
              total_t2sum: 1,
              total_DefectProducts: {
                $subtract: ['$total_t1sum', '$total_t2sum'],
              }, //t1MinusT2
              total_DefectRatio: {
                $cond: {
                  if: { $eq: ['$total_t1sum', 0] },
                  then: 0,
                  else: {
                    $divide: [
                      { $subtract: ['$total_t1sum', '$total_t2sum'] },
                      '$total_t1sum',
                    ],
                  },
                },
              },
              Detail: 1,
            },
          },
        ])
          .then((inserted) => {
            resolve(inserted);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        Products.aggregate([
          {
            $match: {
              Category: searchField,
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
                  $dayOfMonth: {
                    $dateFromString: { dateString: '$createdAt' },
                  },
                },
              },
              total: { $sum: 1 },
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
              total: 1,
            },
          },
          {
            $group: {
              _id: null, // null을 사용하여 모든 결과를 하나로 그룹화합니다.
              totalsum: { $sum: '$total' }, // "total" 필드를 합산하여 "totalsum" 필드에 저장
              results: { $push: '$$ROOT' }, // 모든 결과를 "results" 필드에 저장
            },
          },
          {
            $project: {
              _id: 0,
              totalsum: 1,
              results: 1,
            },
          },
        ])
          .then((inserted) => {
            resolve(inserted);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  },
};

module.exports = dao;
