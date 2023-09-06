const env = require('dotenv');
const jwt = require('jsonwebtoken');
const logger = require('./logger');

env.config();

accessSecretKey = process.env.JWT_ACC_Secret_Key;

const accOptions = {
  expiresIn: '20s', // 액세스 토큰 만료시간 (10분)   분,시간,일  (m,h,d)
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

    const token = jwt.sign(payload, accessSecretKey, accOptions);

    return { token, payload };
  },
  //액세스 토큰의 만료여부를 판단한다.
  //확인 사항 1. 서명확인 , 만료일자 확인
  verifyAccessToken(token) {
    try {
      const decodedToken = jwt.verify(token, accessSecretKey); // 토큰을 해독하고 유효성 검사

      // 서명 확인 및 만료 여부 확인
      if (decodedToken) {
        const expirationTime = decodedToken.exp * 1000; // 만료 일시 (초 단위)를 밀리초 단위로 변환
        if (Date.now() >= expirationTime) {
          logger.debug('Access token has expired');
          return null; // 토큰이 만료되었음을 반환
        } else {
          return token; // 토큰이 유효하면 토큰 자체를 반환
        }
      } else {
        logger.debug('Error verifying access token. Signature mismatch');
        return null; // 서명 불일치 또는 다른 문제로 토큰 유효성 검사 실패 시 null 반환
      }
    } catch (error) {
      logger.debug('Error verifying access token:', error);
      return null; // 예외 발생 시 토큰을 만료된 것으로 간주하고 null 반환
    }
  },
};

module.exports = tokenUtil;
