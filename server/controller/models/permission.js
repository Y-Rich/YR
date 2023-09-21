const Sequelize = require('sequelize');

module.exports = class Permission extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // "positionID": "3",  - 직원의 직급
        // "lineID": "6",   - 공장의 특정 공정라인
        // "view": "false",   - 모니터링 권한
        // "control": "false"   - 공정 제어권한

        permissionID: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        positionID: {
          type: Sequelize.INTEGER,
        },
        lineID: {
          type: Sequelize.INTEGER,
        },
        view: {
          type: Sequelize.BOOLEAN,
          defaultValue: false, // default 값을 false로 설정
        },
        control: {
          type: Sequelize.BOOLEAN,
          defaultValue: false, // default 값을 false로 설정
        },
      },
      {
        sequelize,
        underscored: true,
        timestamps: true,
        paranoid: true,
      },
    );
  }

  static associate(db) {
    db.Permission.belongsTo(db.Position, {
      foreignKey: {
        name: 'positionID',
        onDelete: 'SET NULL',
        as: 'Position',
      },
    });

    db.Permission.belongsTo(db.ProductionLine, {
      foreignKey: {
        name: 'lineID',
        onDelete: 'SET NULL',
        as: 'Line',
      },
    });
  }
};
