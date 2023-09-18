const mqtt = require('mqtt');
const logger = require('../lib/logger');
const edukit1Service = require('../controller/service/edukit1Service');
const edukit2Service = require('../controller/service/edukit2Service');
const logService = require('../controller/service/logService');

const addr = 'mqtt://192.168.0.44:1883'; // 교육장
// const addr = 'mqtt://localhost:1883'; // 집에서 테스트

const MQTTconnectForProducts = () => {
  // 기준값 전역으로 설정
  let memo = -1;
  let memo1 = -1;
  let memo2 = -1;
  let memo3 = -1;
  let IsFacrunning_edukit1 = -1;
  let IsFacrunning_edukit2 = -1;

  // 제품 생산 통계처리위한 클라이언트
  const MQTTconnect = () => {
    const client = mqtt.connect(addr, {
      clientId: 'client-NodeAPIServer-products',
      protocolVersion: 4,
    });

    client.on('connect', function () {
      logger.info('[ products ]Connected to MQTT broker...');

      const topic = ['edukit1', 'edukit2', 'edukit1/log', 'edukit2/log'];

      client.subscribe(topic, { qos: 1 }, function (err) {
        if (err) {
          logger.error('[ products ] Error subscribing to topic:', err);
        } else {
          logger.info(`[ products ] Subscribed to topic: ${topic}`);
        }
      });
    });

    client.on('message', async function (topic, message) {
      // logger.info(`[ products ] message: ${message} , topic: ${topic}`);
      try {
        //parse the message + data arranged
        if (topic === 'edukit1') {
          let data = dataParser(message);
          let IsFactoryrunning = data.Wrapper[1].value;
          let No1Count = Number(data.Wrapper[15].value);
          let No2Count = Number(data.Wrapper[16].value);
          let No3Count = Number(data.Wrapper[17].value);

          //로그기록 - 공정 시작시간 , 종료시간
          //false-false-false-true-true-true-true-false-false-false.....
          //불리언 값 바뀔 때 액션 주어야하고 , 바뀐 값을 기준으로 잡아야한다.
          if (IsFactoryrunning == true) {
            if (IsFacrunning_edukit1 == -1) {
              logger.debug(
                '[IsFacrunning_edukit1] skip process.... 서버 시작....',
              );
              IsFacrunning_edukit1 = true;
            } else if (IsFacrunning_edukit1 == false) {
              logger.debug('IsFacrunning_edukit1 : type changed');
              IsFacrunning_edukit1 = true;
              // 로그 기록
              const asyncfunc = async () => {
                const params = {
                  Manufacturer: 'edukit1',
                  type: 'process-start',
                  Category: 'factory',
                };
                const result = await logService.FacTime(params);
                logger.info(`(logService.FacTime) logged successfully...`);

                const { Manufacturer, Category, type, createdAt, ...rest } =
                  result;
                let mes = {
                  Manufacturer: Manufacturer,
                  Category: Category,
                  type: type,
                  createdAt: Date.now(),
                  message: '공정 시작.',
                };
                //edukit1/log  - 로그 발송
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
              };
              asyncfunc();
            } else if (IsFacrunning_edukit1 == true) {
              logger.debug('IsFacrunning_edukit1 : skip process');
            }
          } else if (IsFactoryrunning == false) {
            if (IsFacrunning_edukit1 == -1) {
              logger.debug(
                '[IsFacrunning_edukit1] skip process.... 서버 시작....',
              );
              IsFacrunning_edukit1 = false;
            } else if (IsFacrunning_edukit1 == true) {
              logger.debug('IsFacrunning_edukit1 : type changed');
              IsFacrunning_edukit1 = false;
              // 로그 기록
              const asyncfunc = async () => {
                const params = {
                  Manufacturer: 'edukit1',
                  type: 'process-stop',
                  Category: 'factory',
                };
                const result = await logService.FacTime(params);
                logger.info(`(logService.FacTime) logged successfully...`);

                const { Manufacturer, Category, type, createdAt, ...rest } =
                  result;
                let mes = {
                  Manufacturer: Manufacturer,
                  Category: Category,
                  type: type,
                  createdAt: Date.now(),
                  message: '공정 종료.',
                };
                //edukit1/log  - 로그 발송
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
              };
              asyncfunc();
            } else if (IsFacrunning_edukit1 == false) {
              logger.debug('IsFacrunning_edukit1 : skip process');
            }
          }

          // 가동중이면 생산제품 태그 확인하여 기록하고 투입자재량 , 불량품 , 생산품을 DB 저장한다.
          // 리셋여부를 판단한다. 0-1-2-3-4-5 -0-1-2-3 -0-1-2-3-4
          if (IsFactoryrunning) {
            //1 공정 - 1차 제품 / 재고 반출
            if (memo1 == No1Count) {
              logger.debug('skip process');
            } else if (memo1 < No1Count) {
              if (memo1 == -1) {
                logger.debug('skip process.... 서버 시작....');
                memo1 = Number(No1Count);
              } else {
                const params = {
                  ProductName: `product - ${Date.now()}`,
                  Manufacturer: 'edukit1',
                  Category: 'line1',
                };
                const product = await edukit1Service.regProduct(params);
                logger.info(`(edukit1Service.regProduct) edukit1 자재 반출`);
                logger.info(`${product}`);
                // 로그 기록
                const asyncfunc = async (params) => {
                  const modified = {
                    ProductName: params.ProductName,
                    Manufacturer: params.Manufacturer,
                    type: params.Category,
                    Category: 'factory',
                  };
                  const result = await logService.product(modified);
                  logger.info(`(logService.product) logged successfully...`);

                  const {
                    ProductName,
                    Manufacturer,
                    type,
                    Category,
                    createdAt,
                    ...rest
                  } = result;
                  let mes = {
                    ProductName: ProductName,
                    Manufacturer: Manufacturer,
                    type: type,
                    Category: Category,
                    createdAt: Date.now(),
                    message: '자재 반출',
                  };
                  //edukit1/log  - 로그 발송
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
                };
                asyncfunc(params);
                memo1 = Number(No1Count);
              }
            } else if (memo1 > No1Count) {
              memo1 = Number(No1Count);
            }

            //2 공정 - 1차 제품  가공 / 재고 반출
            if (memo2 == No2Count) {
              logger.debug('skip process');
            } else if (memo2 < No2Count) {
              if (memo2 == -1) {
                logger.debug('skip process.... 서버 시작....');
                memo2 = Number(No2Count);
              } else {
                const params = {
                  ProductName: `product - ${Date.now()}`,
                  Manufacturer: 'edukit1',
                  Category: 'line2',
                };
                const product = await edukit1Service.regProduct(params);
                logger.info(`(edukit1Service.regProduct) edukit1 가공 완료`);
                logger.info(`${product}`);
                // 로그 기록
                const asyncfunc = async (params) => {
                  const modified = {
                    ProductName: params.ProductName,
                    Manufacturer: params.Manufacturer,
                    type: params.Category,
                    Category: 'factory',
                  };
                  const result = await logService.product(modified);
                  logger.info(`(logService.product) logged successfully...`);

                  const {
                    ProductName,
                    Manufacturer,
                    type,
                    Category,
                    createdAt,
                    ...rest
                  } = result;
                  let mes = {
                    ProductName: ProductName,
                    Manufacturer: Manufacturer,
                    type: type,
                    Category: Category,
                    createdAt: Date.now(),
                    message: '가공 완료',
                  };
                  //edukit1/log  - 로그 발송
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
                };
                asyncfunc(params);
                memo2 = Number(No2Count);
              }
            } else if (memo2 > No2Count) {
              memo2 = Number(No2Count);
            }

            //3공정  - 완제품 카운트
            if (memo3 == No3Count) {
              logger.debug('skip process');
            } else if (memo3 < No3Count) {
              if (memo3 == -1) {
                logger.debug('skip process.... 서버 시작....');
                memo3 = Number(No3Count);
              } else {
                const params = {
                  ProductName: `product - ${Date.now()}`,
                  Manufacturer: 'edukit1',
                  Category: 'line3',
                };
                const product = await edukit1Service.regProduct(params);
                logger.info(`(edukit1Service.regProduct) edukit1 완제품 출하`);
                logger.info(`${product}`);
                // 로그 기록
                const asyncfunc = async (params) => {
                  const modified = {
                    ProductName: params.ProductName,
                    Manufacturer: params.Manufacturer,
                    type: params.Category,
                    Category: 'factory',
                  };
                  const result = await logService.product(modified);
                  logger.info(`(logService.product) logged successfully...`);

                  const {
                    ProductName,
                    Manufacturer,
                    type,
                    Category,
                    createdAt,
                    ...rest
                  } = result;
                  let mes = {
                    ProductName: ProductName,
                    Manufacturer: Manufacturer,
                    type: type,
                    Category: Category,
                    createdAt: Date.now(),
                    message: '완제품 출하',
                  };
                  //edukit1/log  - 로그 발송
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
                };
                asyncfunc(params);
                memo3 = Number(No3Count);
              }
            } else if (memo3 > No3Count) {
              memo3 = Number(No3Count);
            }
          }
        }

        if (topic === 'edukit2') {
          let data = dataParser(message);
          let IsFactoryrunning = data.Wrapper[1].value;
          let No1Count = Number(data.Wrapper[15].value);
          let No2Count = Number(data.Wrapper[16].value);
          let No3Count = Number(data.Wrapper[17].value);

          //로그기록 - 공정 시작시간 , 종료시간
          //false-false-false-true-true-true-true-false-false-false.....
          //불리언 값 바뀔 때 액션 주어야하고 , 바뀐 값을 기준으로 잡아야한다.
          if (IsFactoryrunning == true) {
            if (IsFacrunning_edukit2 == -1) {
              logger.debug(
                '[IsFacrunning_edukit2] skip process.... 서버 시작....',
              );
              IsFacrunning_edukit2 = true;
            } else if (IsFacrunning_edukit2 == false) {
              logger.debug('IsFacrunning_edukit2 : type changed');
              IsFacrunning_edukit2 = true;
              // 로그 기록
              const asyncfunc = async () => {
                const params = {
                  Manufacturer: 'edukit2',
                  type: 'process-start',
                  Category: 'factory',
                };
                const result = await logService.FacTime(params);
                logger.info(`(logService.FacTime) logged successfully...`);

                const { Manufacturer, Category, type, createdAt, ...rest } =
                  result;
                let mes = {
                  Manufacturer: Manufacturer,
                  Category: Category,
                  type: type,
                  createdAt: Date.now(),
                  message: '공정 시작.',
                };
                //edukit2/log  - 로그 발송
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
              };
              asyncfunc();
            } else if (IsFacrunning_edukit2 == true) {
              logger.debug('IsFacrunning_edukit2 : skip process');
            }
          } else if (IsFactoryrunning == false) {
            if (IsFacrunning_edukit2 == -1) {
              logger.debug(
                '[IsFacrunning_edukit2] skip process.... 서버 시작....',
              );
              IsFacrunning_edukit2 = false;
            } else if (IsFacrunning_edukit2 == true) {
              logger.debug('IsFacrunning_edukit2 : type changed');
              IsFacrunning_edukit2 = false;
              // 로그 기록
              const asyncfunc = async () => {
                const params = {
                  Manufacturer: 'edukit2',
                  type: 'process-stop',
                  Category: 'factory',
                };
                const result = await logService.FacTime(params);
                logger.info(`(logService.FacTime) logged successfully...`);

                const { Manufacturer, Category, type, createdAt, ...rest } =
                  result;
                let mes = {
                  Manufacturer: Manufacturer,
                  Category: Category,
                  type: type,
                  createdAt: Date.now(),
                  message: '공정 종료.',
                };
                //edukit2/log  - 로그 발송
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
              };
              asyncfunc();
            } else if (IsFacrunning_edukit2 == false) {
              logger.debug('IsFacrunning_edukit2 : skip process');
            }
          }

          // 가동중이면 생산제품 태그 확인하여 기록하고 투입자재량 , 불량품 , 생산품을 DB 저장한다.
          // 리셋여부를 판단한다. 0-1-2-3-4-5 -0-1-2-3 -0-1-2-3-4
          if (IsFactoryrunning) {
            //1 공정 - 1차 제품 / 재고 반출
            if (memo1 == No1Count) {
              logger.debug('skip process');
            } else if (memo1 < No1Count) {
              if (memo1 == -1) {
                logger.debug('skip process.... 서버 시작....');
                memo1 = Number(No1Count);
              } else {
                const params = {
                  ProductName: `product - ${Date.now()}`,
                  Manufacturer: 'edukit2',
                  Category: 'line1',
                };
                const product = await edukit2Service.regProduct(params);
                logger.info(`(edukit2Service.regProduct) edukit2 자재 반출`);
                logger.info(`${product}`);
                // 로그 기록
                const asyncfunc = async (params) => {
                  const modified = {
                    ProductName: params.ProductName,
                    Manufacturer: params.Manufacturer,
                    type: params.Category,
                    Category: 'factory',
                  };
                  const result = await logService.product(modified);
                  logger.info(`(logService.product) logged successfully...`);

                  const {
                    ProductName,
                    Manufacturer,
                    type,
                    Category,
                    createdAt,
                    ...rest
                  } = result;
                  let mes = {
                    ProductName: ProductName,
                    Manufacturer: Manufacturer,
                    type: type,
                    Category: Category,
                    createdAt: Date.now(),
                    message: '자재 반출',
                  };
                  //edukit2/log  - 로그 발송
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
                };
                asyncfunc(params);
                memo1 = Number(No1Count);
              }
            } else if (memo1 > No1Count) {
              memo1 = Number(No1Count);
            }

            //2 공정 - 1차 제품  가공 / 재고 반출
            if (memo2 == No2Count) {
              logger.debug('skip process');
            } else if (memo2 < No2Count) {
              if (memo2 == -1) {
                logger.debug('skip process.... 서버 시작....');
                memo2 = Number(No2Count);
              } else {
                const params = {
                  ProductName: `product - ${Date.now()}`,
                  Manufacturer: 'edukit2',
                  Category: 'line2',
                };
                const product = await edukit2Service.regProduct(params);
                logger.info(`(edukit2Service.regProduct) edukit2 가공 완료`);
                logger.info(`${product}`);
                // 로그 기록
                const asyncfunc = async (params) => {
                  const modified = {
                    ProductName: params.ProductName,
                    Manufacturer: params.Manufacturer,
                    type: params.Category,
                    Category: 'factory',
                  };
                  const result = await logService.product(modified);
                  logger.info(`(logService.product) logged successfully...`);

                  const {
                    ProductName,
                    Manufacturer,
                    type,
                    Category,
                    createdAt,
                    ...rest
                  } = result;
                  let mes = {
                    ProductName: ProductName,
                    Manufacturer: Manufacturer,
                    type: type,
                    Category: Category,
                    createdAt: Date.now(),
                    message: '가공 완료',
                  };
                  //edukit2/log  - 로그 발송
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
                };
                asyncfunc(params);
                memo2 = Number(No2Count);
              }
            } else if (memo2 > No2Count) {
              memo2 = Number(No2Count);
            }

            //3공정  - 완제품 카운트
            if (memo3 == No3Count) {
              logger.debug('skip process');
            } else if (memo3 < No3Count) {
              if (memo3 == -1) {
                logger.debug('skip process.... 서버 시작....');
                memo3 = Number(No3Count);
              } else {
                const params = {
                  ProductName: `product - ${Date.now()}`,
                  Manufacturer: 'edukit2',
                  Category: 'line3',
                };
                const product = await edukit2Service.regProduct(params);
                logger.info(`(edukit2Service.regProduct) edukit2 완제품 출하`);
                logger.info(`${product}`);
                // 로그 기록
                const asyncfunc = async (params) => {
                  const modified = {
                    ProductName: params.ProductName,
                    Manufacturer: params.Manufacturer,
                    type: params.Category,
                    Category: 'factory',
                  };
                  const result = await logService.product(modified);
                  logger.info(`(logService.product) logged successfully...`);

                  const {
                    ProductName,
                    Manufacturer,
                    type,
                    Category,
                    createdAt,
                    ...rest
                  } = result;
                  let mes = {
                    ProductName: ProductName,
                    Manufacturer: Manufacturer,
                    type: type,
                    Category: Category,
                    createdAt: Date.now(),
                    message: '완제품 출하',
                  };
                  //edukit2/log  - 로그 발송
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
                };
                asyncfunc(params);
                memo3 = Number(No3Count);
              }
            } else if (memo3 > No3Count) {
              memo3 = Number(No3Count);
            }
          }
        }
      } catch (error) {
        logger.error('[ products ]Error parsing message:', error);
      }
    });

    client.on('error', function (error) {
      logger.error('[ products ] MQTT Error:', error);
    });
  };
  return MQTTconnect;
};

const dataParser = (message) => {
  let parsedMessage = JSON.parse(message);
  // tagId 오름차순으로 정렬
  parsedMessage.Wrapper.sort((a, b) => a.tagId - b.tagId);

  return parsedMessage;
};

module.exports = MQTTconnectForProducts();

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
