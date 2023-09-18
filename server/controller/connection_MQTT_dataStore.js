const mqtt = require('mqtt');
const logger = require('../lib/logger');
const edukit1Service = require('./service/edukit1Service');
const edukit2Service = require('./service/edukit2Service');
const fs = require('fs');
const path = require('path');
const commandSet = require('../config/edukitConfig.json');
const command = commandSet.controlSet;

const addr = 'mqtt://192.168.0.44:1883'; // 교육장
// const addr = 'mqtt://localhost:1883'; // 집에서 테스트

let scenario_edukit1 = [null, 26, 28, 28, false, false, false];
let scenario_edukit2 = [null, 26, 28, 28, false, false, false];
// 에듀킷 상태  , 시나리오 기준값1 [속도조절], 시나리오 기준값2[정지] ,시나리오 기준값3 [재개],
// 시나리오 상태 - 속도조절 , 시나리오 상태 - 정지 ,  이전 가동이력(6)
// 27도 [속도조절] → 28도 [정지 및 재가동 구간]

const MQTTconnect = () => {
  const client = mqtt.connect(addr, {
    clientId: 'client-NodeAPIServer-DB',
    protocolVersion: 4,
  });

  client.on('connect', function () {
    logger.info('[ dataStore ]Connected to MQTT broker...');

    // topic : edukit1                    - 에듀킷 1호기의 전체 데이터
    // topic : edukit1/environment/data   - 1호기 온습도
    // topic : edukit1/vision/data        - 1호기 비전센서 주사위값
    // topic : edukit1/vision/data/image       - 1호기 비전센서 이미지
    const topic_DB = [
      'edukit1',
      'edukit1/environment/data',
      'edukit1/vision/data',
      'edukit1/vision/data/image',
      'edukit2',
      'edukit2/environment/data',
      'edukit2/vision/data',
      'edukit2/vision/data/image',
    ];

    client.subscribe(topic_DB, { qos: 1 }, function (err) {
      if (err) {
        logger.error('[ dataStore ] Error subscribing to topic:', err);
      } else {
        logger.info(`[ dataStore ] Subscribed to topic: ${topic_DB}`);
      }
    });
  });

  // message type - Buffer
  // DataSerializaion Process :  message -> tostring -> json parsing
  // 이벤트 핸들러 - 토픽에서 메시지 발행 확인시
  client.on('message', async function (topic, message) {
    try {
      const parsedMes = message.toString();
      //edukit1 - 센서데이터  - 온습도
      if (topic === 'edukit1/environment/data') {
        // 비즈니스 로직 호출
        let data = JSON.parse(parsedMes);
        if (!data.Temperature || !data.Humidity || !data.Particulates) {
          throw new Error(
            'Property missing....[edukit1] parsedMes.Temperature ||parsedMes.Humidity ||parsedMes.Particulates',
          );
        } else {
          const result = await edukit1Service.saveTempAndHumi(
            JSON.parse(parsedMes),
          );
          logger.debug(
            `(edukit1Service.saveTempAndHumi.result) : data insert successfully on mongoDB server`,
          );
          //시나리오 적용
          // scenario - 센서 기준값    -> 특정 온도 기준에 도달할때 액션을 한번만 주어야 한다.
          // 시나리오 2 종료시 재 가동 프로세스 -> 이전 가동이력과 재기동 온도 기준을 확인
          if (
            scenario_edukit1[0] == false &&
            scenario_edukit1[5] == true &&
            scenario_edukit1[6] == true &&
            data.Temperature <= scenario_edukit1[3] &&
            data.Temperature > scenario_edukit1[1]
          ) {
            scenario_edukit1[6] = false; //이력삭제
            scenario_edukit1[5] = false;
            logger.info(
              '[edukit1 - scenario 2 ] 시나리오 2 종료 - 감속 가동 시작',
            );
            //액션
            let control1 = command.start;
            control1.value = 1;
            client.publish(
              'edukit1/control',
              JSON.stringify(control1),
              { qos: 0 },
              function (err, message) {
                if (err) {
                  logger.error(
                    '[ edukit1/log ] Error publishing message:',
                    err,
                  );
                }
              },
            );
            let control2 = command.No1Delay;
            control2.value = 150;
            client.publish(
              'edukit1/control',
              JSON.stringify(control2),
              { qos: 0 },
              function (err, message) {
                if (err) {
                  logger.error(
                    '[ edukit1/log ] Error publishing message:',
                    err,
                  );
                }
              },
            );
            //edukit1/log  - 로그 발송
            let mes = {
              Manufacturer: 'edukit1',
              type: 'scenario 2',
              createdAt: Date.now(),
              message: '시나리오 2 종료- 감속 가동 시작',
            };
            client.publish(
              'edukit1/log',
              JSON.stringify(mes),
              { qos: 0 },
              function (err, message) {
                if (err) {
                  logger.error(
                    '[ edukit1/log ] Error publishing message:',
                    err,
                  );
                }
              },
            );
            client.publish(
              'edukit/scenario',
              JSON.stringify(mes),
              { qos: 1 },
              function (err, message) {
                if (err) {
                  logger.error(
                    '[ edukit1/log ] Error publishing message:',
                    err,
                  );
                }
              },
            );
          }

          //가동 중일때만 적용해야됨
          if (scenario_edukit1[0] == true) {
            // 평상시
            if (data.Temperature < scenario_edukit1[1]) {
              logger.info(
                '[edukit1 - scenario 1 ] skip process... 정상온도 범위 ',
              );
            }
            //속도조절
            else if (
              scenario_edukit1[4] == false &&
              scenario_edukit1[5] == false &&
              data.Temperature > scenario_edukit1[1] &&
              data.Temperature < scenario_edukit1[2]
            ) {
              logger.info(
                '[edukit1 - scenario 1 ] 시나리오 1 발생 - 온도상승. 속도 제어',
              );
              scenario_edukit1[4] = true;
              //액션
              let control = command.No1Delay;
              control.value = 150;
              client.publish(
                'edukit1/control',
                JSON.stringify(control),
                { qos: 1 },
                function (err, message) {
                  if (err) {
                    logger.error(
                      '[ edukit1/log ] Error publishing message:',
                      err,
                    );
                  }
                },
              );

              //edukit1/log  - 로그 발송
              let mes = {
                Manufacturer: 'edukit1',
                type: 'scenario 1',
                createdAt: Date.now(),
                message: '시나리오 1 발생 - 온도상승. 속도 제어',
              };
              client.publish(
                'edukit1/log',
                JSON.stringify(mes),
                { qos: 1 },
                function (err, message) {
                  if (err) {
                    logger.error(
                      '[ edukit1/log ] Error publishing message:',
                      err,
                    );
                  }
                },
              );
              client.publish(
                'edukit/scenario',
                JSON.stringify(mes),
                { qos: 1 },
                function (err, message) {
                  if (err) {
                    logger.error(
                      '[ edukit1/log ] Error publishing message:',
                      err,
                    );
                  }
                },
              );
            } else if (
              scenario_edukit1[4] == true &&
              scenario_edukit1[5] == false &&
              data.Temperature <= scenario_edukit1[1]
            ) {
              logger.info(
                '[edukit1 - scenario 1 ] 시나리오 1 종료 - 가동속도 복귀',
              );
              scenario_edukit1[4] = false;
              //액션
              let control = command.No1Delay;
              control.value = 80;
              client.publish(
                'edukit1/control',
                JSON.stringify(control),
                { qos: 1 },
                function (err, message) {
                  if (err) {
                    logger.error(
                      '[ edukit1/log ] Error publishing message:',
                      err,
                    );
                  }
                },
              );
              //edukit1/log  - 로그 발송
              let mes = {
                Manufacturer: 'edukit1',
                type: 'scenario 1',
                createdAt: Date.now(),
                message: '시나리오 1 종료 - 가동속도 복귀',
              };
              client.publish(
                'edukit1/log',
                JSON.stringify(mes),
                { qos: 1 },
                function (err, message) {
                  if (err) {
                    logger.error(
                      '[ edukit1/log ] Error publishing message:',
                      err,
                    );
                  }
                },
              );
              client.publish(
                'edukit/scenario',
                JSON.stringify(mes),
                { qos: 1 },
                function (err, message) {
                  if (err) {
                    logger.error(
                      '[ edukit1/log ] Error publishing message:',
                      err,
                    );
                  }
                },
              );
            }
            //정지
            else if (
              scenario_edukit1[4] == true &&
              scenario_edukit1[5] == false &&
              data.Temperature > scenario_edukit1[2]
            ) {
              logger.info(
                '[edukit1 - scenario 2 ] 시나리오 2 발생 - 온도상승. 가동 중지',
              );
              scenario_edukit1[5] = true; //정지
              scenario_edukit1[6] = true; // 가동이력 남김
              //액션
              let control = command.start;
              control.value = 0;
              client.publish(
                'edukit1/control',
                JSON.stringify(control),
                { qos: 1 },
                function (err, message) {
                  if (err) {
                    logger.error(
                      '[ edukit1/log ] Error publishing message:',
                      err,
                    );
                  }
                },
              );
              //edukit1/log  - 로그 발송
              let mes = {
                Manufacturer: 'edukit1',
                type: 'scenario 2',
                createdAt: Date.now(),
                message: '시나리오 2 발생 - 온도상승. 가동 중지',
              };
              client.publish(
                'edukit1/log',
                JSON.stringify(mes),
                { qos: 1 },
                function (err, message) {
                  if (err) {
                    logger.error(
                      '[ edukit1/log ] Error publishing message:',
                      err,
                    );
                  }
                },
              );
              client.publish(
                'edukit/scenario',
                JSON.stringify(mes),
                { qos: 1 },
                function (err, message) {
                  if (err) {
                    logger.error(
                      '[ edukit1/log ] Error publishing message:',
                      err,
                    );
                  }
                },
              );
            }
          }
        }
      }
      //edukit1 -  에듀킷 상태 데이터
      if (topic === 'edukit1') {
        let parsedMessage = JSON.parse(parsedMes);
        // tagId 오름차순으로 정렬
        parsedMessage.Wrapper.sort((a, b) => a.tagId - b.tagId);

        // date를 최상단으로 이동
        const dateObj = parsedMessage.Wrapper.find(
          (item) => item.name === 'DataTime',
        );
        if (dateObj) {
          parsedMessage.DataTime = dateObj.value;
          parsedMessage.Wrapper = parsedMessage.Wrapper.filter(
            (item) => item.name !== 'DataTime',
          );
          parsedMessage.Wrapper.unshift(dateObj);
        }

        //1.  비즈니스 로직 호출 [상태데이터 DB저장]
        const result = await edukit1Service.saveStatus(parsedMessage);
        logger.debug(
          `(edukit1Service.saveStatus.result) : data insert successfully on mongoDB server`,
        );
        // scenario - 가동 상태 기록
        if (scenario_edukit1[0] === null) {
          // 서버시작시 가동상태 전역으로 변수설정
          scenario_edukit1[0] = Boolean(parsedMessage.Wrapper[1].value);
          logger.debug('[edukit1-scenario] skip process...  서버시작');
        } else if (
          scenario_edukit1[0] !== null &&
          scenario_edukit1[0] === parsedMessage.Wrapper[1].value
        ) {
          // 가동상태가 메모값과 같으면 skip
          logger.debug('[edukit1-scenario] skip process...');
        } else if (
          scenario_edukit1[0] !== null &&
          scenario_edukit1[0] !== parsedMessage.Wrapper[1].value
        ) {
          // 가동상태가 메모값과 다르면 상태값 업데이트
          scenario_edukit1[0] = Boolean(parsedMessage.Wrapper[1].value);
          logger.debug('[edukit1-scenario] type changed....');
        }
      }
      //edukit2 - 센서데이터  - 온습도
      if (topic === 'edukit2/environment/data') {
        // 비즈니스 로직 호출
        let data = JSON.parse(parsedMes);
        if (!data.Temperature || !data.Humidity || !data.Particulates) {
          throw new Error(
            'Property missing....[edukit2] parsedMes.Temperature ||parsedMes.Humidity ||parsedMes.Particulates',
          );
        } else {
          const result = await edukit2Service.saveTempAndHumi(
            JSON.parse(parsedMes),
          );
          logger.debug(
            `(edukit2Service.saveTempAndHumi.result) : data insert successfully on mongoDB server`,
          );
          //시나리오 적용
          // scenario - 센서 기준값    -> 특정 온도 기준에 도달할때 액션을 한번만 주어야 한다.
          // 시나리오 2 종료시 재 가동 프로세스 -> 이전 가동이력과 재기동 온도 기준을 확인
          if (
            scenario_edukit2[0] == false &&
            scenario_edukit2[5] == true &&
            scenario_edukit2[6] == true &&
            data.Temperature <= scenario_edukit2[3] &&
            data.Temperature > scenario_edukit2[1]
          ) {
            scenario_edukit2[6] = false; //이력삭제
            scenario_edukit2[5] = false;
            logger.info(
              '[edukit2 - scenario 2 ] 시나리오 2 종료 - 감속 가동 시작',
            );
            //액션
            let control1 = command.start;
            control1.value = 1;
            client.publish(
              'edukit2/control',
              JSON.stringify(control1),
              { qos: 0 },
              function (err, message) {
                if (err) {
                  logger.error(
                    '[ edukit2/log ] Error publishing message:',
                    err,
                  );
                }
              },
            );
            let control2 = command.No1Delay;
            control2.value = 200;
            client.publish(
              'edukit2/control',
              JSON.stringify(control2),
              { qos: 0 },
              function (err, message) {
                if (err) {
                  logger.error(
                    '[ edukit2/log ] Error publishing message:',
                    err,
                  );
                }
              },
            );
            //edukit2/log  - 로그 발송
            let mes = {
              Manufacturer: 'edukit2',
              type: 'scenario 2',
              createdAt: Date.now(),
              message: '시나리오 2 종료- 감속 가동 시작',
            };
            client.publish(
              'edukit2/log',
              JSON.stringify(mes),
              { qos: 0 },
              function (err, message) {
                if (err) {
                  logger.error(
                    '[ edukit2/log ] Error publishing message:',
                    err,
                  );
                }
              },
            );
            client.publish(
              'edukit/scenario',
              JSON.stringify(mes),
              { qos: 1 },
              function (err, message) {
                if (err) {
                  logger.error(
                    '[ edukit2/log ] Error publishing message:',
                    err,
                  );
                }
              },
            );
          }

          //가동 중일때만 적용해야됨
          if (scenario_edukit2[0] == true) {
            // 평상시
            if (data.Temperature < scenario_edukit2[1]) {
              logger.info(
                '[edukit2 - scenario 1 ] skip process... 정상온도 범위 ',
              );
            }
            //속도조절
            else if (
              scenario_edukit2[4] == false &&
              scenario_edukit2[5] == false &&
              data.Temperature > scenario_edukit2[1] &&
              data.Temperature < scenario_edukit2[2]
            ) {
              logger.info(
                '[edukit2 - scenario 1 ] 시나리오 1 발생 - 온도상승. 속도 제어',
              );
              scenario_edukit2[4] = true;
              //액션
              let control = command.No1Delay;
              control.value = 200;
              client.publish(
                'edukit2/control',
                JSON.stringify(control),
                { qos: 1 },
                function (err, message) {
                  if (err) {
                    logger.error(
                      '[ edukit2/log ] Error publishing message:',
                      err,
                    );
                  }
                },
              );

              //edukit2/log  - 로그 발송
              let mes = {
                Manufacturer: 'edukit2',
                type: 'scenario 1',
                createdAt: Date.now(),
                message: '시나리오 1 발생 - 온도상승. 속도 제어',
              };
              client.publish(
                'edukit2/log',
                JSON.stringify(mes),
                { qos: 1 },
                function (err, message) {
                  if (err) {
                    logger.error(
                      '[ edukit2/log ] Error publishing message:',
                      err,
                    );
                  }
                },
              );
              client.publish(
                'edukit/scenario',
                JSON.stringify(mes),
                { qos: 1 },
                function (err, message) {
                  if (err) {
                    logger.error(
                      '[ edukit2/log ] Error publishing message:',
                      err,
                    );
                  }
                },
              );
            } else if (
              scenario_edukit2[4] == true &&
              scenario_edukit2[5] == false &&
              data.Temperature <= scenario_edukit2[1]
            ) {
              logger.info(
                '[edukit2 - scenario 1 ] 시나리오 1 종료 - 가동속도 복귀',
              );
              scenario_edukit2[4] = false;
              //액션
              let control = command.No1Delay;
              control.value = 150;
              client.publish(
                'edukit2/control',
                JSON.stringify(control),
                { qos: 1 },
                function (err, message) {
                  if (err) {
                    logger.error(
                      '[ edukit2/log ] Error publishing message:',
                      err,
                    );
                  }
                },
              );
              //edukit2/log  - 로그 발송
              let mes = {
                Manufacturer: 'edukit2',
                type: 'scenario 1',
                createdAt: Date.now(),
                message: '시나리오 1 종료 - 가동속도 복귀',
              };
              client.publish(
                'edukit2/log',
                JSON.stringify(mes),
                { qos: 1 },
                function (err, message) {
                  if (err) {
                    logger.error(
                      '[ edukit2/log ] Error publishing message:',
                      err,
                    );
                  }
                },
              );
              client.publish(
                'edukit/scenario',
                JSON.stringify(mes),
                { qos: 1 },
                function (err, message) {
                  if (err) {
                    logger.error(
                      '[ edukit2/log ] Error publishing message:',
                      err,
                    );
                  }
                },
              );
            }
            //정지
            else if (
              scenario_edukit2[4] == true &&
              scenario_edukit2[5] == false &&
              data.Temperature > scenario_edukit2[2]
            ) {
              logger.info(
                '[edukit2 - scenario 2 ] 시나리오 2 발생 - 온도상승. 가동 중지',
              );
              scenario_edukit2[5] = true; //정지
              scenario_edukit2[6] = true; // 가동이력 남김
              //액션
              let control = command.start;
              control.value = 0;
              client.publish(
                'edukit2/control',
                JSON.stringify(control),
                { qos: 1 },
                function (err, message) {
                  if (err) {
                    logger.error(
                      '[ edukit2/log ] Error publishing message:',
                      err,
                    );
                  }
                },
              );
              //edukit2/log  - 로그 발송
              let mes = {
                Manufacturer: 'edukit2',
                type: 'scenario 2',
                createdAt: Date.now(),
                message: '시나리오 2 발생 - 온도상승. 가동 중지',
              };
              client.publish(
                'edukit2/log',
                JSON.stringify(mes),
                { qos: 1 },
                function (err, message) {
                  if (err) {
                    logger.error(
                      '[ edukit2/log ] Error publishing message:',
                      err,
                    );
                  }
                },
              );
              client.publish(
                'edukit/scenario',
                JSON.stringify(mes),
                { qos: 1 },
                function (err, message) {
                  if (err) {
                    logger.error(
                      '[ edukit2/log ] Error publishing message:',
                      err,
                    );
                  }
                },
              );
            }
          }
        }
      }
      //edukit2 -  에듀킷 상태 데이터
      if (topic === 'edukit2') {
        let parsedMessage = JSON.parse(parsedMes);
        // tagId 오름차순으로 정렬
        parsedMessage.Wrapper.sort((a, b) => a.tagId - b.tagId);

        // date를 최상단으로 이동
        const dateObj = parsedMessage.Wrapper.find(
          (item) => item.name === 'DataTime',
        );
        if (dateObj) {
          parsedMessage.DataTime = dateObj.value;
          parsedMessage.Wrapper = parsedMessage.Wrapper.filter(
            (item) => item.name !== 'DataTime',
          );
          parsedMessage.Wrapper.unshift(dateObj);
        }

        //1.  비즈니스 로직 호출 [상태데이터 DB저장]
        const result = await edukit2Service.saveStatus(parsedMessage);
        logger.debug(
          `(edukit2Service.saveStatus.result) : data insert successfully on mongoDB server`,
        );
        // scenario - 가동 상태 기록
        if (scenario_edukit2[0] === null) {
          // 서버시작시 가동상태 전역으로 변수설정
          scenario_edukit2[0] = Boolean(parsedMessage.Wrapper[1].value);
          logger.debug('[edukit2-scenario] skip process...  서버시작');
        } else if (
          scenario_edukit2[0] !== null &&
          scenario_edukit2[0] === parsedMessage.Wrapper[1].value
        ) {
          // 가동상태가 메모값과 같으면 skip
          logger.debug('[edukit2-scenario] skip process...');
        } else if (
          scenario_edukit2[0] !== null &&
          scenario_edukit2[0] !== parsedMessage.Wrapper[1].value
        ) {
          // 가동상태가 메모값과 다르면 상태값 업데이트
          scenario_edukit2[0] = Boolean(parsedMessage.Wrapper[1].value);
          logger.debug('[edukit2-scenario] type changed....');
        }
      }

      // // 센서 이미지 저장
      // else if (topic === 'edukit2/vision/data/image') {
      //   // console.log(Object.entries(message));
      //   saveImageFileLocal(message); //로컬 폴더에 파일저장
      //   // saveImageFileDB(message); //mongoDB에 파일저장
      // }
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
