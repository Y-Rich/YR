const Sequelize = require('sequelize');

module.exports = class ProductionLine extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        lineID: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        lineName: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        factoryID: {
          type: Sequelize.INTEGER,
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
    db.ProductionLine.belongsTo(db.Factory, {
      foreignKey: {
        name: 'factoryID',
        onDelete: 'SET NULL',
        as: 'Factory',
      },
    });

    db.ProductionLine.hasMany(db.Permission, {
      foreignKey: {
        name: 'lineID',
        onDelete: 'SET NULL',
        as: 'Permissions',
      },
    });
  }
  // static includeAttributes = ['lineID', 'lineName', 'description'];
};
