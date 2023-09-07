const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const db = {
  username: process.env.DB_SQL_ID,
  password: process.env.DB_SQL_PASS,
  database: process.env.DB_SQL_DATABASE,
  host: process.env.DB_SQL_HOST,
  port: process.env.DB_SQL_PORT,
  dialect: process.env.DB_SQL_DIALECT,
};

// sequelize 생성
const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  port: db.port,
  dialect: db.dialect,
});

exports.sequelize = sequelize;
