const { Op } = require('sequelize');
const { User, Department } = require('../models/index');

const dao = {
  // 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      User.create(params)
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
  // 전체 조회 - 특정 조건에 맞는 리스트 : 예시) 사용자 role
  selectList(params) {
    // where 검색 조건
    const setQuery = {};
    if (params.role) {
      setQuery.where = {
        ...setQuery.where,
        role: { [Op.like]: `%${params.role}%` }, // like검색
      };
    }
    // if (params.userid) {
    //   setQuery.where = {
    //     ...setQuery.where,
    //     userid: params.userid, // '='검색
    //   };
    // }

    // order by 정렬 조건
    setQuery.order = [['id', 'DESC']];

    return new Promise((resolve, reject) => {
      User.findAndCountAll({
        ...setQuery,
        attributes: { exclude: ['password'] }, // password 필드 제외
        include: [
          {
            model: Department,
            as: 'Department',
            attributes: ['name', 'code'],
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
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      // User.findAll
      User.findByPk(params.id, {
        include: [
          {
            model: Department,
            as: 'Department',
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
  // 로그인용 아이디로 사용자 검색
  selectUser(params) {
    return new Promise((resolve, reject) => {
      User.findOne({
        attributes: [
          'departmentCode',
          'id',
          'userid',
          'password',
          'name',
          'role',
        ],
        where: {
          userid: params.userid,
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
  update(params) {
    return new Promise((resolve, reject) => {
      User.update(params, {
        // id를 조건으로 검색하여 update
        where: { id: params.id },
      })
        .then(([updated]) => {
          resolve({ updatedCount: updated });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  delete(params) {
    return new Promise((resolve, reject) => {
      // User.findAll
      User.destroy({
        where: { id: params.id },
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
