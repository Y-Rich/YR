const { sequelize } = require('../batabase/connection_mysql');
const Department = require('./sample');

const db = {};

db.sequelize = sequelize;

// model 생성
db.Department = Department;

// model init
Department.init(sequelize);

module.exports = db;
