const { Op } = require('sequelize');
const { Employee, Position } = require('../models/index');

const dao = {
  // 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      Employee.create(params)
        .then((inserted) => {
          // password는 제외하고 리턴함
          const insertedResult = { ...inserted };
          delete insertedResult.dataValues.password;
          resolve(inserted);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 특정 직급 전체 조회
  positionList(params) {
    // where 검색 조건
    const setQuery = {};
    if (params.positionID) {
      setQuery.where = {
        ...setQuery.where,
        positionID: { [Op.like]: `%${params.positionID}%` }, // like검색
      };
    }
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
  // 직원 상세조회
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      // User.findAll
      Employee.findByPk(params.employeeID, {
        include: [
          {
            model: Position,
            as: 'Position',
          },
        ],
        // attributes: { exclude: ['password'] }, // password 필드 제외
      })
        .then((selectedInfo) => {
          resolve(selectedInfo);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 로그인 -  이메일로 사용자 검색
  searchEmployee(params) {
    return new Promise((resolve, reject) => {
      Employee.findOne({
        attributes: [
          'employeeID',
          'email',
          'password',
          'name',
          'positionID',
          'phone',
        ],
        where: {
          email: params.email,
        },
      })
        .then((selectedOne) => {
          resolve(selectedOne);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 직원 정보 수정
  update(params) {
    return new Promise((resolve, reject) => {
      Employee.update(params, {
        // id를 조건으로 검색하여 update
        where: { employeeID: params.employeeID },
      })
        .then(([updated]) => {
          resolve({ updatedCount: updated });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 직원 정보 삭제
  delete(params) {
    return new Promise((resolve, reject) => {
      // User.findAll
      Employee.destroy({
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
};

module.exports = dao;
