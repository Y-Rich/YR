const express = require('express');
const createError = require('http-errors');
const env = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsConfig = require('./config/corsConfig.json');
const logger = require('./lib/logger');
const path = require('path');
const sqlModels = require('./controller/models/index');
const indexRouter = require('./routes/index');
const connect = require('./controller/batabase/connection_mongoDB');
const { swaggerUi, specs } = require('./lib/swagger');

// 환경변수 setting
env.config();
const { NODE_ENV, LOGGER_LEVEL } = process.env;
PORT = process.env.PORT || 8010;

const app = express();
logger.info(`app start`);

// DB connection - MySQL
// DB 연결 확인 및 table 생성
sqlModels.sequelize
  .authenticate()
  .then(() => {
    logger.info('DB_MySQL connection success');

    // sequelize sync (table 생성)
    sqlModels.sequelize
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

// DB connection - MongoDB
connect();

//////
//////
//////
//////
//////
//////
app.use(cors(corsConfig));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
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

  // render the error page
  res.status(err.status || 500);
  res.json(`${err.message}`);
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
