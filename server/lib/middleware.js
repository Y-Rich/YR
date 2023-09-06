const logger = require('./logger');
const tokenUtil = require('./tokenUtil');

const middleware = {
  // 로그인 체크
  isLoggedIn(req, res, next) {
    const token = req.headers && req.headers.accesstoken;
    // console.log(Object.keys(req.headers));
    logger.debug('(middleware.isLoggedIn.token) accesstoken:', token);
    // 토큰이 있는 경우 토큰 검증을 수행 한다.
    if (token) {
      const decoded = tokenUtil.verifyAccessToken(token);
      if (decoded) {
        // 1. 토큰 검증 성공 / 토큰 갱신
        const newToken = tokenUtil.makeToken(decoded);
        res.set({
          accessToken: newToken,
        }); // header 세팅`

        next(); // 미들웨어 통과(계속 진행)
      } else {
        // 2. 토큰 검증 실패 / 재로그인
        const err = new Error('Unauthorized token please login and try again');
        logger.error(err.toString());
        return res.status(401).json({ err: err.toString() });
      }
    } else {
      // 토큰없음. / 재로그인 401에러 응답
      const err = new Error('Token is missing. please login and try again');
      logger.error(err.toString());

      return res.status(401).json({ err: err.toString() });
    }
  },
};

module.exports = middleware;
