const env = require('dotenv');
const jwt = require('jsonwebtoken');

env.config();

accessSecretKey = process.env.JWT_ACC_Secret_Key;

const accOptions = {
  expiresIn: '1d', // 액세스 토큰 만료시간 (10분)   분,시간,일  (m,h,d)
  issuer: 'UVC_Project', //발행처
};

const tokenUtil = {
  // 토큰 생성
  makeToken(user) {
    const payload = {
      departmentCode: user.departmentCode,
      id: user.id,
      userid: user.userid,
      name: user.name,
      role: user.role,
    };

    const token = jwt.sign(payload, accessSecretKey, accOptions);

    return { token, payload };
  },
  //액세스 토큰의 만료여부를 판단한다.
  //유효하면 갱신 엑세스 토큰을 반환 , 만료되었으면 null반환.
  verifyAccessToken(token) {
    try {
      const decodedToken = jwt.verify(token, accessSecretKey); // 토큰을 해독하고 유효성 검사
      const expirationTime = decodedToken.exp * 1000; // 만료 일시 (초 단위)를 밀리초 단위로 변환
      if (Date.now() >= expirationTime) {
        // 현재 시간과 비교하여 토큰이 만료되었는지 여부 반환
        throw new Error('Access token has expired');
      } else {
        const { id, username, userid, role, email, phone } = decodedToken;
        const user = { id, username, userid, role, email, phone };
        const newAccessToken = makeAccessToken(user);
        return newAccessToken;
      }
    } catch (error) {
      console.error('Error verifying access token:', error);
      return null; // 토큰 해독 또는 유효성 검사에 실패하면 토큰을 만료된 것으로 간주
    }
  },
};

module.exports = tokenUtil;
