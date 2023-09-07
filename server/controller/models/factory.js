const Sequelize = require('sequelize');

module.exports = class Factory extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        factoryID: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        factoryName: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
        },
      },
      {
        sequelize,
        underscored: true, // true: underscored, false: camelCase
        timestamps: true, // createAt, updatedAt
        paranoid: true, // deletedAt
      },
    );
  }

  static associate(db) {
    db.Factory.hasMany(db.ProductionLine, {
      foreignKey: {
        name: 'factoryID',
        onDelete: 'SET NULL',
        as: 'ProductionLines',
      },
    });
  }
};

// // tableName: 'tableName', // table명을 수동으로 생성 함
// // freezeTableName: true, // true: table명의 복수형 변환을 막음
// underscored: true, // true: underscored, false: camelCase
// timestamps: true, // createAt, updatedAt
// paranoid: true, // deletedAt

// type : Data type
// allowNull : NOT NULL 조건인지 아닌지 (default: true)
// unique : Unique조건인지 아닌지에 대한 옵션. column하나로만 이루어진 unique라면 true/false로 지정한다. 복수개의 column이라면 동일한 문자열을 각 column의 unique속성에 넣어준다.
// comment : column에 대한 comment
// validate : 각 column에 대한 validation check옵션을 넣어준다.
