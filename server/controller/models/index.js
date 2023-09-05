const { sequelize } = require('../batabase/connection_mysql');
const Sample = require('./sample');
const Department = require('./department');
const Line = require('./line');
const User = require('./user');

const db = {};

db.sequelize = sequelize;

// model 생성
db.Sample = Sample;
db.Department = Department;
db.Line = Line;
db.User = User;

// model init
Sample.init(sequelize);
Department.init(sequelize);
Line.init(sequelize);
User.init(sequelize);

// association(관계 생성)
Department.associate(db);
Line.associate(db);
User.associate(db);

module.exports = db;
