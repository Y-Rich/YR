const express = require('express');
const router = express.Router();
const logger = require('../lib/logger');
const lineService = require('../controller/service/lineService');
const MQTTconnectForControl = require('../controller/connection_MQTT_edukitControl'); // MQTTconnect 모듈을 가져옵니다.
const controlSet = require('../config/edukitConfig.json');

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
      // mqttClient.publish('edukit1/control', mes, { qos: 1 }, function (err) {
      mqttClient.publish('test1', mes, { qos: 1 }, function (err) {
        if (err) {
          logger.error('[ edukit1/control ] Error publishing message:', err);
        } else {
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
        console.log(`value :${req.body.value}`);
        let mesObj = controlList[command];
        mesObj.value = req.body.value;
        mes = JSON.stringify(mesObj);
      } else {
        mes = JSON.stringify(controlList[command]);
      }
      mqttClient.publish('edukit2/control', mes, { qos: 1 }, function (err) {
        if (err) {
          logger.error('[ edukit2/control ] Error publishing message:', err);
        } else {
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

module.exports = router;

/* 
// //커멘드 셋
// // MQTT  - 에듀킷 컨트롤 제어시 json형식으로 보내야함
// const command = { tagId: 1, value: 1 };

// // MQTT - test commands

// // 에듀킷 시작
// router.get('/start', async (req, res) => {
//   try {
//     command.tagId = 1;
//     command.value = 1;
//     const start = JSON.stringify(command);
//     // 다른 곳에서 publish를 호출할 수 있습니다.
//     mqttClient.publish('edukit/control', start, { qos: 0 }, function (err) {
//       if (err) {
//         console.error('Error publishing message:', err);
//       } else {
//         return res
//           .status(200)
//           .json('[command : start] Message published successfully');
//       }
//     });
//     // 최종 응답
//   } catch (err) {
//     return res.status(500).json({ err: err.toString() });
//   }
// });

// // 에듀킷 정지
// router.get('/stop', async (req, res) => {
//   try {
//     // 다른 곳에서 publish를 호출할 수 있습니다.
//     command.tagId = 1;
//     command.value = 0;
//     const stop = JSON.stringify(command);
//     mqttClient.publish('edukit/control', stop, { qos: 0 }, function (err) {
//       if (err) {
//         console.error('Error publishing message:', err);
//       } else {
//         console.log('Message published successfully');
//         return res
//           .status(200)
//           .json('[command : stop] Message published successfully');
//       }
//     });
//     // 최종 응답
//   } catch (err) {
//     return res.status(500).json({ err: err.toString() });
//   }
// });

// // 에듀킷 리셋
// router.get('/reset', async (req, res) => {
//   try {
//     // 다른 곳에서 publish를 호출할 수 있습니다.
//     command.tagId = 8;
//     command.value = 1;
//     const reset = JSON.stringify(command);
//     mqttClient.publish('edukit/control', reset, { qos: 0 }, function (err) {
//       if (err) {
//         console.error('Error publishing message:', err);
//       } else {
//         console.log('Message published successfully');
//         return res
//           .status(200)
//           .json('[command : reset] Message published successfully');
//       }
//     });
//     // 최종 응답
//   } catch (err) {
//     return res.status(500).json({ err: err.toString() });
//   }
// });

*/
