const mqtt = require('mqtt');
const logger = require('../lib/logger');
const edukit1Service = require('./service/edukit1Service');

const addr = 'mqtt://192.168.0.44:1883'; // 교육장
const addr2 = 'mqtt://localhost:1883'; // 집에서 테스트

const MQTTconnect = () => {
  const client = mqtt.connect(addr2, {
    clientId: 'edukit-' + Math.random().toString(16).substr(2, 8),
    protocolVersion: 4,
  });

  // publish 기능을 내보냅니다.
  function publish(topic, message, options, callback) {
    client.publish(topic, message, options, callback);
  }

  client.on('connect', function () {
    logger.debug('Connected to MQTT broker...');

    // const topic = 'edukit1'
    const topic = ['test1', 'test2', '$SYS/broker/version'];
    const topic_control = ['edukit/control'];
    const topic_dataForDB = ['edukit1'];

    client.subscribe(topic, { qos: 0 }, function (err) {
      if (err) {
        logger.error('Error subscribing to topic:', err);
      } else {
        logger.info(`Subscribed to topic: ${topic}`);
      }
    });
  });

  // message - 버퍼형식
  // message -> tostring -> json parsing
  client.on('message', async function (topic, message) {
    try {
      const parsedMessage = message.toString();
      logger.debug(`Received message on topic ${topic}: ${parsedMessage}`);
      if (topic === 'edukit1') {
        // 비즈니스 로직 호출
        const result = await edukit1Service.reg(JSON.parse(parsedMessage));
        // logger.info(`(edukit1.reg.result) : data insert successfully on mongoDB server: ${result}`);
      }
    } catch (error) {
      logger.error('Error parsing message:', error);
    }
  });

  client.on('error', function (error) {
    logger.error('MQTT Error:', error);
  });

  return {
    publish, // 다른 모듈에서 사용할 수 있도록 publish 함수를 내보냅니다.
  };
};
module.exports = MQTTconnect;

/* 
1.  시스템 예약 Topic(‘$’)
 - 시스템에 의해 예약된 특수한 목적의 Topic이기에 Client에서는 사용할 수 없습니다. 
 -  ‘$SYS/’ Topic은 Server의 고유 정보를 모니터링 하기 위해 사용됩니다. 
 
 $SYS/broker/load/bytes/received

수신된 총 데이터양(Byte)

$SYS/broker/load/bytes/sent

송신된 총 데이터양(Byte)

$SYS/broker/clients/connected

연결중인 Client 개수

$SYS/broker/clients/disconnected

연결이 끊어진 Client 개수

$SYS/broker/clients/maximum

Broker에 연결되었던 최대 Client 개수

$SYS/broker/clients/total

Connected와 Disconnected상태의 Client 개수

$SYS/broker/messages/received

수신된 모든 타입의 총 메시지 개수

$SYS/broker/messages/sent

송신한 모든 타입의 총 메시지 개수

$SYS/broker/messages/publish/dropped

Broker 제한으로 인해 버린 총 PUBLISH 메시지 개수

$SYS/broker/messages/publish/received

수신 된 총 PUBLISH 메시지 개수

$SYS/broker/messages/publish/sent

송신 된 총 PUBLISH 메시지 개수

$SYS/broker/messages/retained/count

Retain 메시지 개수

$SYS/broker/subscriptions/count

Subscription 개수

$SYS/broker/uptime

Broker 가동시간

$SYS/broker/version

Broker 버전
*/
