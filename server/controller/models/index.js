const { sequelize } = require('../connection_mysql');
const Sample = require('./sample');
const Factory = require('./factory');
const ProductionLine = require('./productionLine');
const Position = require('./position');
const Permission = require('./permission');
const Employee = require('./employee');
const Token = require('./token');

const db = {};

db.sequelize = sequelize;

// model 생성
db.Sample = Sample;
db.Factory = Factory;
db.ProductionLine = ProductionLine;
db.Position = Position;
db.Permission = Permission;
db.Employee = Employee;
db.Token = Token;

// model init
Sample.init(sequelize);
Factory.init(sequelize);
ProductionLine.init(sequelize);
Position.init(sequelize);
Permission.init(sequelize);
Employee.init(sequelize);
Token.init(sequelize);

// association(관계 생성)
Factory.associate(db);
ProductionLine.associate(db);
Position.associate(db);
Permission.associate(db);
Employee.associate(db);

module.exports = db;
