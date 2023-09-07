const express = require('express');
const router = express.Router();
const logger = require('../lib/logger');
const lineService = require('../controller/service/lineService');
const MQTTconnect = require('../controller/connection_MQTT'); // MQTTconnect 모듈을 가져옵니다.

// MQTT 연결을 설정합니다. - MQTTconnect 모듈 require
const mqttClient = MQTTconnect();

//커멘드 셋
// MQTT  - 에듀킷 컨트롤 제어시 json형식으로 보내야함
const command = { tagId: 1, value: 1 };

// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
      departmentCode: req.body.departmentCode,
      linename: req.body.linename,
      code: req.body.code,
      description: req.body.description,
    };
    logger.info(`(line.reg.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await lineService.reg(params);
    logger.info(`(department.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});
// 에듀킷 시작
router.get('/start', async (req, res) => {
  try {
    command.tagId = 1;
    command.value = 1;
    const start = JSON.stringify(command);
    // 다른 곳에서 publish를 호출할 수 있습니다.
    mqttClient.publish('edukit/control', start, { qos: 0 }, function (err) {
      if (err) {
        console.error('Error publishing message:', err);
      } else {
        return res
          .status(200)
          .json('[command : start] Message published successfully');
      }
    });
    // 최종 응답
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// 에듀킷 정지
router.get('/stop', async (req, res) => {
  try {
    // 다른 곳에서 publish를 호출할 수 있습니다.
    command.tagId = 1;
    command.value = 0;
    const stop = JSON.stringify(command);
    mqttClient.publish('edukit/control', stop, { qos: 0 }, function (err) {
      if (err) {
        console.error('Error publishing message:', err);
      } else {
        console.log('Message published successfully');
        return res
          .status(200)
          .json('[command : stop] Message published successfully');
      }
    });
    // 최종 응답
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// 에듀킷 리셋
router.get('/reset', async (req, res) => {
  try {
    // 다른 곳에서 publish를 호출할 수 있습니다.
    command.tagId = 8;
    command.value = 1;
    const reset = JSON.stringify(command);
    mqttClient.publish('edukit/control', reset, { qos: 0 }, function (err) {
      if (err) {
        console.error('Error publishing message:', err);
      } else {
        console.log('Message published successfully');
        return res
          .status(200)
          .json('[command : reset] Message published successfully');
      }
    });
    // 최종 응답
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
