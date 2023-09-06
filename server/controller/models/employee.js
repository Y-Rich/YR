const Sequelize = require('sequelize');

module.exports = class Employee extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        employeeID: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        positionID: {
          type: Sequelize.INTEGER,
          defaultValue: 3, // default 값을 worker로 설정
        },
        phone: {
          type: Sequelize.STRING(20),
          allowNull: false,
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
    db.Employee.belongsTo(db.Position, {
      foreignKey: {
        name: 'positionID',
        onDelete: 'SET NULL',
        as: 'Position',
      },
    });
  }
};
