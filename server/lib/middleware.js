const logger = require('./logger');
const tokenUtil = require('./tokenUtil');
const tokenService = require('../controller/service/tokenService');
const middleware = {
  // 로그인 체크
  async isLoggedIn(req, res, next) {
    const token = req.headers && req.headers.accesstoken;
    // console.log(Object.keys(req.headers));
    logger.info(`(middleware.isLoggedIn.token) accesstoken:${token}`);

    // ACCESS TOKEN CHECK - 토큰이 있는 경우 / 검증 수행
    if (token) {
      const decoded = tokenUtil.verifyAccessToken(token);
      // access validation success / 서명일치,유효기간남음
      // ->  토큰 전달
      if (decoded[0] === false) {
        res.set({
          accessToken: token,
        }); // header 세팅`
        next(); // 미들웨어 통과(계속 진행)
      }
      // access validation fail  /  서명일치 , 유효기간 만료
      //  -> 유저id로 DB에 리프레시 토큰 가져오기
      else if (decoded[1] !== null) {
        async function getRefreshToken(params) {
          logger.debug(
            `(middleware.getRefreshToken.params) ${JSON.stringify(params)}`,
          );
          const result = await tokenService.getRefreshToken(params);
          if (result === null) {
            return res.status(401).json({ err: 'DB에 리프레시 없음.' });
          }
          logger.debug(
            `(middleware.getRefreshToken.result) ${JSON.stringify(result)}`,
          );
          return result.refreshToken;
        }
        const result = await getRefreshToken({ employeeID: decoded[1] });

        // - 리프레시 만료기간 확인
        const tokenCheck = tokenUtil.verifyRefreshToken(result, decoded[1]);
        //  기간 남아있다면 액세스토큰 갱신해서 클라이언트에 전송
        if (tokenCheck[0] === false) {
          const accessToken = await tokenUtil.renewAccessToken(tokenCheck[1]);
          logger.debug(`(middleware.makeToken.result) ${accessToken[1]}`);
          res.set({
            accessToken: accessToken,
          }); // header 세팅`
          next(); // 미들웨어 통과(계속 진행)
        }
        // - 리프레시 토큰 만료되면 DB 리프레시 토큰 삭제 + 클라이언트에 401에러 보냄.
        else if (tokenCheck[0] === true && tokenCheck[1] !== null) {
          // 비즈니스 로직 호출
          async function service(id) {
            const result = await tokenService.deleteToken({
              employeeID: id,
            });
            return result;
          }
          const result = service(tokenCheck[1]);
          logger.info(
            `(middleware.deleteToken.result) ${JSON.stringify(result)}`,
          );
          const err = new Error(
            'Unauthorized token please login and try again',
          );
          logger.error(err.toString());
          return res.status(401).json({ err: err.toString() });
        }
      }
      // access validation fail  - 서명불일치 or 기타
      // -> 401 재로그인
      else {
        console.error('access validation fail  - 서명불일치 or 기타');
        const err = new Error(
          'Unauthorized token please login and try again - validation fail ',
        );
        logger.error(err.toString());
        return res.status(401).json({ err: err.toString() });
      }
    }
    // 토큰없음. / 재로그인 401에러 응답
    else {
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
