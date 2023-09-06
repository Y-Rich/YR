const Sequelize = require('sequelize');

module.exports = class Token extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        accessToken: {
          type: Sequelize.STRING(200),
        },
        refreshToken: {
          type: Sequelize.STRING(200),
          allowNull: false,
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
};
