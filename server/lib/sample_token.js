/*eslint-disable*/
const jwt = require('jsonwebtoken');

const accessSecretKey = process.env.SECRETKEY;
const accOptions = {
  expiresIn: '10m', // 액세스 토큰 만료시간 (10분)
  issuer: 'My Sweet Home', //발행처
};
const refreshOptions = {
  expiresIn: '2d', // 리프레시 토큰 만료시간 (2일)
  issuer: 'My Sweet Home', //발행처
};

// 액세스 토큰 생성
function makeAccessToken(user) {
  const payload = {
    id: user.id,
    userid: user.userid,
    username: user.username,
    role: user.role,
    email: user.email,
    phone: user.phone,
  };
  const accessToken = jwt.sign(payload, accessSecretKey, accOptions);

  return accessToken;
}

function makeRefreshToken() {
  const payload = {
    dummy: 'sampletext',
  };

  const refreshToken = jwt.sign(payload, accessSecretKey, refreshOptions);

  return refreshToken;
}

//액세스 토큰의 만료여부를 판단한다.
//유효하면 갱신 엑세스 토큰을 반환 , 만료되었으면 null반환.
function verifyAccessToken(token) {
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
}
function verifyRefreshToken(token) {
  try {
    const decodedToken = jwt.verify(token, accessSecretKey);
    const expirationTime = decodedToken.exp * 1000;
    if (Date.now() >= expirationTime) {
      // 현재 시간과 비교하여 토큰이 만료되었는지 여부 반환
      throw new Error('refresh token has expired');
    } else {
      const { id, username, userid, role, email, phone } = decodedToken;
      const user = { id, username, userid, role, email, phone };
      const newAccessToken = makeAccessToken(user);
      return newAccessToken;
    }
  } catch (error) {
    console.error('Error verifying refresh token:', error);
    return null;
  }
}

module.exports = {
  makeAccessToken,
  makeRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
