const { Blog } = require('../models/index_mongo');

const dao = {
  // 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      const article = new Blog(params);
      article
        .save()
        .then((inserted) => {
          resolve(inserted);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // 특정조건 리스트 조회
  selectList(params) {
    return new Promise((resolve, reject) => {
      Blog.find(params)
        // Blog.find()
        .then((selectedList) => {
          resolve(selectedList);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // 상세정보 조회
  // selectInfo(params) {
  //   return new Promise((resolve, reject) => {
  //     Department.findByPk(params.id)
  //       .then((selectedInfo) => {
  //         resolve(selectedInfo);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // },

  // 수정
  update(params) {
    const { id, ...targetObj } = params;
    return new Promise((resolve, reject) => {
      Blog.updateOne({ _id: id }, targetObj)
        .then((updated) => {
          resolve({
            matchedCount: updated.matchedCount,
            modifiedCount: updated.modifiedCount,
            acknowledged: updated.acknowledged,
            upsertedId: updated.upsertedId,
            upsertedCount: updated.upsertedCount,
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  //   const res = await Person.updateOne({ name: 'Jean-Luc Picard' }, { ship: 'USS Enterprise' });
  // res.matchedCount; // Number of documents matched
  // res.modifiedCount; // Number of documents modified
  // res.acknowledged; // Boolean indicating everything went smoothly.
  // res.upsertedId; // null or an id containing a document that had to be upserted.
  // res.upsertedCount; // Number indicating how many documents had to be upserted. Will either be 0 or 1.

  // 삭제
  delete(params) {
    return new Promise((resolve, reject) => {
      Blog.deleteOne(params)
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
