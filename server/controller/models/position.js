const Sequelize = require('sequelize');

module.exports = class Position extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        positionID: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        positionName: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
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
    db.Position.hasMany(db.Permission, {
      foreignKey: {
        name: 'positionID',
        onDelete: 'SET NULL',
        as: 'Permissions',
      },
    });

    db.Employee.belongsTo(db.Position, {
      foreignKey: {
        name: 'positionID',
        onDelete: 'SET NULL',
        as: 'Position',
      },
    });
  }
};
