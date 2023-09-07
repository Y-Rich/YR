const mongoose = require('mongoose');
const env = require('dotenv');
const logger = require('../../lib/logger');

env.config();
const { DB_MONGO_ID, DB_MONGO_PASS } = process.env;

const connect = () => {
  const MONGO_DB_URI = `mongodb+srv://${DB_MONGO_ID}:${DB_MONGO_PASS}@cluster0.o1o8pkd.mongodb.net/?retryWrites=true&w=majority`;

  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }
  mongoose
    .connect(MONGO_DB_URI, {
      dbName: 'team_project_sample', //// dbName 옵션 : DB 없으면 해당 이름으로 새롭게 생성
      // useNewUrlParser: true,
    })
    .then(() => {
      logger.info('몽고디비 connection success');
    })
    .catch((err) => {
      logger.error('몽고디비 연결 에러', err);
    });
};

mongoose.connection.on('error', (error) => {
  logger.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
  logger.info('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  connect();
});

module.exports = connect;
