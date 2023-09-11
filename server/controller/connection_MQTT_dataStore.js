const mqtt = require('mqtt');
const logger = require('../lib/logger');
const edukit1Service = require('./service/edukit1Service');
const fs = require('fs');
const path = require('path');

// const addr = 'mqtt://192.168.0.44:1883'; // 교육장
const addr = 'mqtt://localhost:1883'; // 집에서 테스트

const MQTTconnect = () => {
  const client = mqtt.connect(addr, {
    clientId: 'client-NodeAPIServer',
    protocolVersion: 4,
  });

  client.on('connect', function () {
    logger.debug('[ dataStore ]Connected to MQTT broker...');

    // topic : edukit1                    - 에듀킷 1호기의 전체 데이터
    // topic : edukit1/environment/data   - 1호기 온습도
    // topic : edukit1/vision/data        - 1호기 비전센서 주사위값
    // topic : edukit1/vision/data/image       - 1호기 비전센서 이미지
    const topic_DB = [
      'edukit1',
      'edukit1/environment/data',
      'edukit1/vision/data',
      'edukit1/vision/data/image',
    ];

    client.subscribe(topic_DB, { qos: 1 }, function (err) {
      if (err) {
        logger.error('[ edukit1/dataStore ] Error subscribing to topic:', err);
      } else {
        logger.info(`[ edukit1/dataStore ] Subscribed to topic: ${topic_DB}`);
      }
    });
  });

  // message type - Buffer
  // DataSerializaion Process :  message -> tostring -> json parsing
  // 이벤트 핸들러 - 토픽에서 메시지 발행 확인시
  client.on('message', async function (topic, message) {
    try {
      const parsedMes = message.toString();

      //토픽 메세지 확인
      if (
        topic === 'edukit1/vision/data' ||
        topic === 'edukit1/environment/data'
      ) {
        logger.debug(
          `[ dataStore ]Received message on topic ${topic}: ${parsedMes}`,
        );
        // 비즈니스 로직 호출
        const result = await edukit1Service.saveTempAndHumi(
          JSON.parse(parsedMes),
        );
        //온습도 데이터 저장
      }
      // 센서 이미지 저장
      else if (topic === 'edukit1/vision/data/image') {
        // console.log(Object.entries(message));
        saveImageFileLocal(message); //로컬 폴더에 파일저장
        // saveImageFileDB(message); //mongoDB에 파일저장
      }
      // 에듀킷 상태 데이터 저장
      if (topic === 'edukit1') {
        // 비즈니스 로직 호출
        const result = await edukit1Service.saveStatus(JSON.parse(parsedMes));
        logger.info(
          `(edukit1.reg.result) : data insert successfully on mongoDB server: ${result}`,
        );
      }
    } catch (error) {
      logger.error('[ dataStore ]Error parsing message:', error);
    }
  });

  client.on('error', function (error) {
    logger.error('[ dataStore ] MQTT Error:', error);
  });
};

const folderPath = path.join(__dirname, 'images'); // 이미지를 저장할 폴더 경로
// const fileName = `received_image_${Date.now()}.png`;
const fileName = `received_image.png`;

const saveImageFileLocal = (byteArray) => {
  // const fileName = `received_image_${Date.now()}.png`;
  // 폴더 경로가 없으면 생성
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  // 이미지 파일 저장 경로 생성
  const filePath = path.join(folderPath, fileName);

  // 이미지 파일 저장
  fs.writeFileSync(filePath, Buffer.from(byteArray));
};
const saveImageFileDB = async (byteArray) => {
  const result = await edukit1Service.saveImage({
    image: Buffer.from(byteArray),
  });
  logger.debug(
    `[ edukit1Service.saveImage ] image saved.... result : ${result}`,
  );
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
