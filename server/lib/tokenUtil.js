/*eslint-disable*/
const env = require('dotenv');
const jwt = require('jsonwebtoken');
const logger = require('./logger');
const employeeService = require('../controller/service/employeeService');

env.config();

accessSecretKey = process.env.JWT_ACC_Secret_Key;
refreshSecretKey = process.env.JWT_REF_Secret_Key;

const accOptions = {
  expiresIn: '6h', // 액세스 토큰 만료시간 (1일)   분,시간,일  (m,h,d)
  issuer: 'UVC_Project', //발행처
};
const refOptions = {
  expiresIn: '14d', // 액세스 토큰 만료시간 (2주)   분,시간,일  (m,h,d)
  issuer: 'UVC_Project', //발행처
};

const tokenUtil = {
  // 토큰 생성
  makeToken(user) {
    const payload = {
      employeeID: user.employeeID,
      email: user.email,
      name: user.name,
      positionID: user.positionID,
    };

    const accessToken = jwt.sign(payload, accessSecretKey, accOptions);
    const refreshToken = jwt.sign(payload, refreshSecretKey, refOptions);

    return { accessToken, refreshToken, payload };
  },
  // 로그인 사용자용  - 새로운 액세스토큰 발급
  makeAccessToken(user) {
    const payload = {
      employeeID: user.employeeID,
      email: user.email,
      name: user.name,
      positionID: user.positionID,
    };

    const accessToken = jwt.sign(payload, accessSecretKey, accOptions);

    return { accessToken, payload };
  },
  // 리프레시를 통한  갱신 -  새로운 액세스토큰 발급
  async renewAccessToken(token) {
    const id = jwt.decode(token).employeeID;
    const { employeeID, email, name, positionID } = await employeeService.info({
      employeeID: id,
    });
    const payload = {
      employeeID,
      email,
      name,
      positionID,
    };
    const accessToken = jwt.sign(payload, accessSecretKey, accOptions);

    return accessToken;
  },
  //액세스 토큰의 만료여부를 판단한다.
  //확인 사항 1. 서명확인 , 만료일자 확인
  verifyAccessToken(token) {
    try {
      // JWT Verify 메서드 호출
      const decodedToken = jwt.verify(token, accessSecretKey);
      // 검증성공 로직  - 토큰 그대로 리턴
      return [false, decodedToken];
    } catch (error) {
      if (error.message === 'jwt expired') {
        // 만료 토큰 처리
        const decoded = jwt.decode(token);
        logger.debug(
          `(verifyAccessToken) jwt expired. employeeID: ${decoded.employeeID}`,
        );
        const result = decoded.employeeID;
        return [true, result]; // 토큰이 만료되었음 - 갱신위해 ID 반환
      } else {
        logger.debug(
          '(verifyAccessToken) Error verifying access token:',
          error,
        );
        return [true, null];
      }
    }
  },
  //리프레시 토큰의 만료여부를 판단한다.
  verifyRefreshToken(token, id) {
    try {
      // JWT Verify 메서드 호출
      const decodedToken = jwt.verify(token, refreshSecretKey);
      // 검증성공 로직  - 토큰 그대로 리턴
      return [false, token];
    } catch (error) {
      if (error.message === 'jwt expired') {
        // 만료 토큰 처리
        logger.debug(`(verifyRereshToken) jwt expired. employeeID: ${id}`);
        return [true, id]; // 토큰이 만료되었음 -DB 삭제 위해 ID 반환
      } else {
        logger.debug(
          '(verifyRereshToken) Error verifying access token:',
          error,
        );
        return [true, null];
      }
    }
  },

  // 회원 확인을 위해 페이로드 확인
  decodeToken(token) {
    const decodedToken = jwt.decode(token, accessSecretKey); // 토큰을 해독하고 유효성 검사
    // const { employeeID } = decodedToken;
    return decodedToken; //DB조회용 employeeID
  },
};

module.exports = tokenUtil;
