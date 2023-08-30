const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();
const { NODE_ENV, PORT, LOGGER_LEVEL } = process.env;

const app = express();
// logger.info("app start");

// DB 연결 확인 및 table 생성
// models.sequelize
// 	.authenticate()
// 	.then(() => {
// 		logger.info("DB connection success");

// 		// sequelize sync (table 생성)
// 		models.sequelize
// 			.sync()
// 			.then(() => {
// 				logger.info("Sequelize sync success");
// 			})
// 			.catch((err) => {
// 				logger.error("Sequelize sync error", err);
// 			});
// 	})
// 	.catch((err) => {
// 		logger.error("DB Connection fail", err);
// 	});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static('uploads'));
// app.use('/', indexRouter);

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
  res.render('error');
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
