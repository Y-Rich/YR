const logger = require('./logger');
const tokenUtil = require('./tokenUtil');
const tokenService = require('../controller/service/tokenService');
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
        // 1. 토큰 검증 성공 / 서명일치,유효기간남음  / 토큰 전달
        res.set({
          accessToken: token,
        }); // header 세팅`
        next(); // 미들웨어 통과(계속 진행)
      } else if (decoded.hasOwnProperty('expired')) {
        // 2. 토큰 검증 실패 - 유효기간 만료
        // - 서명확인후 페이로드 담겨있는 유저id로 DB에 리프레시 토큰 가져오기
        async function getRefreshToken(params) {
          logger.debug(
            `(middleware.getRefreshToken.params) ${JSON.stringify(params)}`,
          );
          const result = await tokenService.getRefreshToken(params);
          logger.info(
            `(middleware.getRefreshToken.result) ${JSON.stringify(result)}`,
          );
          return result;
        }
        const result = getRefreshToken({ employeeID: decoded.expired });

        // - 리프레시 만료기간 확인
        const tokenCheck = tokenUtil.verifyRefreshToken(token);
        //  기간 남아있다면 액세스토큰 갱신해서 클라이언트에 전송
        if (tokenCheck !== null) {
          const { accessToken } = tokenUtil.makeAccessToken(result);
          logger.debug(
            `(middleware.makeToken.result) ${JSON.stringify(result)}`,
          );
          res.set({
            accessToken: accessToken,
          }); // header 세팅`
          next(); // 미들웨어 통과(계속 진행)
        }
        // - 리프레시 토큰 만료되면 DB 리프레시 토큰 삭제 + 클라이언트에 401에러 보냄.
        else {
          // 비즈니스 로직 호출
          async function service() {
            const result = await tokenService.deleteToken({
              employeeID: tokenCheck.expired,
            });
            return result;
          }
          const result = service();
          logger.info(
            `(middleware.deleteToken.result) ${JSON.stringify(result)}`,
          );
          const err = new Error(
            'Unauthorized token please login and try again',
          );
          logger.error(err.toString());
          return res.status(401).json({ err: err.toString() });
        }
      } else {
        // 2. 토큰 검증 실패  - 서명불일치 or 기타
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

  //권한확인
  isAuthorized(req, res, next) {
    //사용자의 토큰을 기반으로 권한을 확인한다.
  },
};

module.exports = middleware;
