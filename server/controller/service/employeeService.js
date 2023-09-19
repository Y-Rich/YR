const logger = require('../../lib/logger');
const employeeDao = require('../dao/employeeDao');
const hashUtil = require('../../lib/hashUtil');

const service = {
  // 회원가입
  async reg(params) {
    let inserted = null;
    let hashPassword = null;

    // 비밀번호 암호화
    try {
      hashPassword = await hashUtil.makePasswordHash(params.password);
    } catch (err) {
      logger.error(`(employeeService.reg - hashPassword) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    //  hashPassword로 비밀번호 변경해서 params 전달
    const newParams = {
      ...params,
      password: hashPassword,
    };

    // 회원 가입 서비스 로직 진행
    try {
      inserted = await employeeDao.insert(newParams);
      logger.debug(`(employeeService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(employeeService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  //로그인
  async login(params) {
    // 1.userid로 사용자 조회
    let user = null;
    try {
      user = await employeeDao.searchEmployee(params);
      logger.debug(`(employeeService.login) ${JSON.stringify(user)}`);
      // 2. 유저정보 유무 확인
      if (!user) {
        const err = new Error('Incorrect email');
        logger.error(err.toString(err));

        return new Promise((resolve, reject) => {
          reject(err);
        });
      }
    } catch (err) {
      logger.error(`(employeeService.login) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 3. 패스워드 일치 비교
    try {
      const checkPassword = await hashUtil.checkPasswordHash(
        params.password,
        user.password,
      );
      logger.debug(`(employeeService.checkPassword) ${checkPassword}`);

      // 패스워드 불일치시 에러 처리
      if (!checkPassword) {
        const err = new Error('Incorect password');
        logger.error(err.toString());

        return new Promise((resolve, reject) => {
          reject(err);
        });
      }
    } catch (err) {
      logger.error(`(employeeService.checkPassword) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(user);
    });
  },
  // 직급에 따라 전체 조회
  async positionList(params) {
    let result = null;

    try {
      result = await employeeDao.positionList(params);
      logger.debug(`(employeeService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(employeeService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // 상세조회
  async info(params) {
    let result = null;

    try {
      result = await employeeDao.selectInfo(params);
      logger.debug(`(employeeService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(employeeService.info) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(result);
    });
  },
  //회원정보 수정
  async edit(params) {
    let result = null;

    try {
      result = await employeeDao.update(params);
      logger.debug(`(employeeService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(employeeService.edit) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(result);
    });
  },
  //회원탈퇴
  async delete(params) {
    let result = null;

    try {
      result = await employeeDao.delete(params);
      logger.debug(`(employeeService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(employeeService.delete) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 회원 조회 - 비밀번호 재설정
  async findEmployee(params) {
    let result = null;

    try {
      result = await employeeDao.searchEmployeeforPW(params);
      logger.debug(
        `(employeeDao.searchEmployeeforPW) ${JSON.stringify(result)}`,
      );
    } catch (err) {
      logger.error(`(employeeDao.searchEmployeeforPW) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(result);
    });
  },

  //회원 비밀번호 수정
  async editPW(params) {
    let result = null;

    try {
      result = await employeeDao.updatePW(params);
      logger.debug(`(employeeService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(employeeService.edit) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(result);
    });
  },
};

module.exports = service;
