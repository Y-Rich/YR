const express = require('express');
const router = express.Router();
const logger = require('../lib/logger');
const MQTTconnectForControl = require('../controller/connection_MQTT_edukitControl'); // MQTTconnect 모듈을 가져옵니다.
const controlSet = require('../config/edukitConfig.json');
const logService = require('../controller/service/logService');
const tokenUtil = require('../lib/tokenUtil');

// MQTT 연결을 설정합니다. - MQTTconnect 모듈 require
const mqttClient = MQTTconnectForControl();

// MQTT  - 에듀킷 컨트롤 제어시 json형식으로 보내야함

//[edukit control  - edukit1]
/*
1. get 요청의 쿼리를 받아 commandSet에 등록되어있는 command를 mqtt publish
-> 쿼리에 명령값이 나타나므로 보안을 위해 post body로 데이터 받는다.
*/
router.post('/edukit1', (req, res) => {
  try {
    // json파일 require할때 자동으로 json.parse 해준다. -> 오브젝트체인 가능함.
    const parsed = controlSet;
    const controlList = parsed.controlSet;
    const command = req.body.command;

    // commandSet parameter Check / 없으면 error 처리
    if (command in controlList) {
      logger.debug(`command exists. command: ${command}`);
      let mes;
      // commandSet value parameter check + value modify
      if (req.body.value) {
        logger.debug(`value :${req.body.value}`);
        let mesObj = controlList[command];
        // 특정 commandSet value limit 적용
        if (req.body.command === 'DiceComparisonValue') {
          // req.body.value를 숫자로 변환합니다.
          const numericValue = parseInt(req.body.value);
          // isNaN 함수를 사용하여 숫자로 변환이 실패한 경우를 처리합니다.
          if (!isNaN(numericValue)) {
            // 범위를 비교합니다.
            if (numericValue >= 1 && numericValue <= 5) {
              logger.debug(`기준범위 내: ${numericValue}`);
              mesObj.value = numericValue.toString();
            } else {
              return res
                .status(400)
                .json(
                  `기준범위 초과. value: ${numericValue} , 범위: 1<=value<=5`,
                );
            }
          } else {
            return res
              .status(400)
              .json('[value type error]숫자로 변환할 수 없는 값입니다.');
          }
        } else {
          mesObj.value = req.body.value;
        }
        if (req.body.command === 'No1Delay') {
          // req.body.value를 숫자로 변환합니다.
          const numericValue = parseInt(req.body.value);
          // isNaN 함수를 사용하여 숫자로 변환이 실패한 경우를 처리합니다.
          if (!isNaN(numericValue)) {
            // 범위를 비교합니다.
            if (numericValue >= 80) {
              logger.debug(`기준범위 내: ${numericValue}`);
              mesObj.value = numericValue.toString();
            } else {
              return res
                .status(400)
                .json(
                  `기준범위 초과. value: ${numericValue} , 범위: 80<=value`,
                );
            }
          } else {
            return res
              .status(400)
              .json('[value type error]숫자로 변환할 수 없는 값입니다.');
          }
        } else {
          mesObj.value = req.body.value;
        }
        mes = JSON.stringify(mesObj);
      } else {
        mes = JSON.stringify(controlList[command]);
      }
      mqttClient.publish('edukit1/control', mes, { qos: 1 }, function (err) {
        if (err) {
          logger.error('[ edukit1/control ] Error publishing message:', err);
        } else {
          // 제어 로그 기록 - 액세스 토큰으로 사용자 정보 추출
          const asyncfunc = async () => {
            const token = req.headers && req.headers.accesstoken;
            const decoded = tokenUtil.decodeToken(token);
            const params = {
              ...decoded,
              type: 'edukit1/control',
              control: mes,
              Category: 'employee',
            };
            const result = await logService.control(params);
            logger.info(`(logService.control) logged successfully...`);
          };
          asyncfunc();
          return res
            .status(200)
            .json(`[ edukit1/control ] Message published command : ${command}`);
        }
      });
    } else {
      logger.error(
        `[ edukit1/control ]command not exists. command: ${command}`,
      );
      throw new Error('command not found');
    }
  } catch (error) {
    res.status(404).json({ error: error.toString() });
  }
});

//[edukit control  - edukit2]
router.post('/edukit2', (req, res) => {
  try {
    // json파일 require할때 자동으로 json.parse 해준다. -> 오브젝트체인 가능함.
    const parsed = controlSet;
    const controlList = parsed.controlSet;
    const command = req.body.command;

    // commandSet parameter Check / 없으면 error 처리
    if (command in controlList) {
      logger.debug(`command exists. command: ${command}`);
      let mes;
      // commandSet value parameter check + value modify
      if (req.body.value) {
        logger.debug(`value :${req.body.value}`);
        let mesObj = controlList[command];
        // 특정 commandSet value limit 적용
        if (req.body.command === 'DiceComparisonValue') {
          // req.body.value를 숫자로 변환합니다.
          const numericValue = parseInt(req.body.value);
          // isNaN 함수를 사용하여 숫자로 변환이 실패한 경우를 처리합니다.
          if (!isNaN(numericValue)) {
            // 범위를 비교합니다.
            if (numericValue >= 1 && numericValue <= 5) {
              logger.debug(`기준범위 내: ${numericValue}`);
              mesObj.value = numericValue.toString();
            } else {
              return res
                .status(400)
                .json(
                  `기준범위 초과. value: ${numericValue} , 범위: 1<=value<=5`,
                );
            }
          } else {
            return res
              .status(400)
              .json('[value type error]숫자로 변환할 수 없는 값입니다.');
          }
        } else {
          mesObj.value = req.body.value;
        }
        if (req.body.command === 'No1Delay') {
          // req.body.value를 숫자로 변환합니다.
          const numericValue = parseInt(req.body.value);
          // isNaN 함수를 사용하여 숫자로 변환이 실패한 경우를 처리합니다.
          if (!isNaN(numericValue)) {
            // 범위를 비교합니다.
            if (numericValue >= 150) {
              logger.debug(`기준범위 내: ${numericValue}`);
              mesObj.value = numericValue.toString();
            } else {
              return res
                .status(400)
                .json(
                  `기준범위 초과. value: ${numericValue} , 범위: 150<=value`,
                );
            }
          } else {
            return res
              .status(400)
              .json('[value type error]숫자로 변환할 수 없는 값입니다.');
          }
        } else {
          mesObj.value = req.body.value;
        }
        mes = JSON.stringify(mesObj);
      } else {
        mes = JSON.stringify(controlList[command]);
      }
      mqttClient.publish('edukit2/control', mes, { qos: 1 }, function (err) {
        if (err) {
          logger.error('[ edukit2/control ] Error publishing message:', err);
        } else {
          // 제어 로그 기록 - 액세스 토큰으로 사용자 정보 추출
          const asyncfunc = async () => {
            const token = req.headers && req.headers.accesstoken;
            const decoded = tokenUtil.decodeToken(token);
            const params = {
              ...decoded,
              type: 'edukit2/control',
              control: mes,
              Category: 'employee',
            };
            const result = await logService.control(params);
            logger.info(`(logService.control) logged successfully...`);
          };
          asyncfunc();
          return res
            .status(200)
            .json(`[ edukit2/control ] Message published command : ${command}`);
        }
      });
    } else {
      logger.error(
        `[ edukit2/control ]command not exists. command: ${command}`,
      );
      throw new Error('command not found');
    }
  } catch (error) {
    res.status(404).json({ error: error.toString() });
  }
});

/**
 * @swagger
 * tags:
 *   name: control
 *   description: control - 에듀킷을 제어함.commandSet에 등록되어있는 command를 mqtt publish
 */

// 완료 - Edukit1 제어 명령 실행

/**
 * @swagger
 * /control/edukit1:
 *   post:
 *     summary: Edukit1 제어 명령 실행
 *     tags: [control]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               command:
 *                 type: string
 *                 description: 제어 명령
 *               value:
 *                 type: string
 *                 description: 명령 값 (옵션)
 *             required:
 *               - command
 *     responses:
 *       200:
 *         description: 명령 실행 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 명령 실행 결과 메시지
 *       400:
 *         description: 잘못된 요청 형식
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 오류 메시지
 *       404:
 *         description: 명령이 존재하지 않음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 오류 메시지
 *       500:
 *         description: 명령 실행 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 오류 메시지
 */

// 완료 - Edukit2 제어 명령 실행

/**
 * @swagger
 * /control/edukit2:
 *   post:
 *     summary: Edukit2 제어 명령 실행
 *     tags: [control]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               command:
 *                 type: string
 *                 description: 제어 명령
 *               value:
 *                 type: string
 *                 description: 명령 값 (옵션)
 *             required:
 *               - command
 *     responses:
 *       200:
 *         description: 명령 실행 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 명령 실행 결과 메시지
 *       400:
 *         description: 잘못된 요청 형식
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 오류 메시지
 *       404:
 *         description: 명령이 존재하지 않음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 오류 메시지
 *       500:
 *         description: 명령 실행 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 오류 메시지
 */

module.exports = router;
