const express = require('express');
const createError = require('http-errors');
const env = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsConfig = require('./config/corsConfig.json');
const logger = require('./lib/logger');
const path = require('path');
const Models = require('./controller/models/index');
const indexRouter = require('./routes/index');

//MQTT connection module
const MongoDBconnect = require('./controller/connection_mongoDB');
const MQTTconnectForDataStore = require('./controller/connection_MQTT_dataStore');
const MQTTconnectForProducts = require('./controller/connection_MQTT_products');

// 환경변수 setting
env.config();
const { NODE_ENV, LOGGER_LEVEL } = process.env;
PORT = process.env.PORT || 8010;

const app = express();
logger.info(`app start`);

// connection - DB : MySQL
Models.sequelize
  .authenticate()
  .then(() => {
    logger.info('DB_MySQL connection success');

    // sequelize sync (table 생성)
    Models.sequelize
      .sync()
      .then(() => {
        logger.info('Sequelize sync success');
      })
      .catch((err) => {
        logger.error('Sequelize sync error', err);
      });
  })
  .catch((err) => {
    logger.error('DB_MySQL Connection fail', err);
  });

// connection - DB : MongoDB
MongoDBconnect();

// middleware settings
app.use(cors(corsConfig));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'templates')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connection - MQTT / 에듀킷 + 각종 데이터 구독 [센서 등등]
MQTTconnectForDataStore();

// connection - MQTT / 생산 통계위한 클라이언트
MQTTconnectForProducts();

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send error message
  res.status(err.status || 500);
  res.json(`${err.message}`);
});

app.listen(PORT, () => {
  logger.info(`server is running on port ${PORT}`);
});
