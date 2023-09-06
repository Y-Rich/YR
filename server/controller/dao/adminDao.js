const {
  Factory,
  ProductionLine,
  Position,
  Permission,
  Employee,
} = require('../models/index');

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
};

module.exports = dao;
