const Sequelize = require('sequelize');

module.exports = class Token extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        employeeID: {
          type: Sequelize.INTEGER,
          unique: true,
        },
        refreshToken: {
          type: Sequelize.STRING(500),
          unique: true,
        },
      },
      {
        sequelize,
        underscored: true,
        timestamps: true,
        paranoid: false, // No need for soft delete in token table
      },
    );
  }
  static includeAttributes = ['refreshToken'];
};
