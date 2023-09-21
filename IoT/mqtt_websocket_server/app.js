const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");
const mqtt = require("mqtt");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

//cors설정
const allowedOrigins = [
  "http://localhost:3001",
  "http://192.168.0.71:3001",
  "http://192.168.0.44:3001",
  "http://192.168.0.44:3000",
  "http://192.168.0.64:3001",
  "http://192.168.0.127:3001",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

// MQTT Broker에 연결
const mqttClient = mqtt.connect("http://192.168.0.44:1883"); // MQTT Broker

mqttClient.on("connect", () => {
  console.log("Connected to MQTT Edukit Broker");

  // MQTT Topic에서 메시지를 수신
  mqttClient.subscribe("edukit1"); // 구독할 MQTT 토픽(Edukit1)
  mqttClient.subscribe("edukit1/environment/data"); // 구독할 MQTT 토픽(Arduino1 data)
  mqttClient.subscribe("edukit1/vision/data"); // 구독할 MQTT 토픽(vision data)
  mqttClient.subscribe("edukit1/vision/data/image"); // 구독할 MQTT 토픽(vision image data)

  mqttClient.subscribe("edukit2"); // 구독할 MQTT 토픽(Edukit1)
  mqttClient.subscribe("edukit2/environment/data"); // 구독할 MQTT 토픽(Arduino1 data)
  mqttClient.subscribe("edukit2/vision/data"); // 구독할 MQTT 토픽(vision data)
  mqttClient.subscribe("edukit2/vision/data/image"); // 구독할 MQTT 토픽(vision image data)

  // 서버에서 메시지를 수신
  mqttClient.subscribe("edukit1/log"); // 구독할 MQTT 토픽(Edukit1)
  mqttClient.subscribe("edukit2/log"); // 구독할 MQTT 토픽(Arduino1 data)
  mqttClient.subscribe("edukit/scenario"); // 구독할 MQTT 토픽(Arduino1 data)

  // WebSocket 연결 및 데이터 전송
  wss.on("connection", function connection(ws) {
    console.log("WebSocket 클라이언트 연결됨");

    mqttClient.on("message", function (topic, message) {
      // 1공장 에듀킷 데이터
      if (topic == "edukit1") {
        // MQTT로 수신한 데이터 (Buffer 형식)
        const mqttDataBuffer = message; // 데이터가 담긴 버퍼

        // Buffer를 문자열로 변환
        const mqttDataString = mqttDataBuffer.toString("utf-8");

        // 문자열을 JSON으로 파싱
        try {
          const mqttDataJson = JSON.parse(mqttDataString);
          // console.log("파싱된 데이터:", mqttDataJson);
          console.log("edukit1 받음");

          //    const data = [{"key":"value"}]
          const serializedData = {
            topic: "edukit1",
            data: JSON.stringify(mqttDataJson),
          };

          //    ws.send(mqttDataJson);
          ws.send(JSON.stringify(serializedData));
        } catch (error) {
          console.error(error);
        }
      }

      // 1공장 아두이노 데이터
      if (topic == "edukit1/environment/data") {
        // MQTT로 수신한 데이터 (Buffer 형식)
        const mqttDataBuffer = message; // 데이터가 담긴 버퍼

        // Buffer를 문자열로 변환
        const mqttDataString = mqttDataBuffer.toString("utf-8");

        // 문자열을 JSON으로 파싱
        try {
          const mqttDataJson = JSON.parse(mqttDataString);
          // console.log("파싱된 데이터:", mqttDataJson);
          console.log("edukit1/environment/data 받음");

          //    const data = [{"key":"value"}]
          const serializedData = {
            topic: "edukit1/environment/data",
            data: JSON.stringify(mqttDataJson),
          };

          //    ws.send(mqttDataJson);
          ws.send(JSON.stringify(serializedData));
        } catch (error) {
          console.error(error);
        }
      }

      // 1공장 비전센서 주사위 데이터
      if (topic == "edukit1/vision/data") {
        // MQTT로 수신한 데이터 (Buffer 형식)
        const mqttDataBuffer = message; // 데이터가 담긴 버퍼
        // console.log(mqttDataBuffer);

        // Buffer를 문자열로 변환
        const mqttDataString = mqttDataBuffer.toString("utf-8");
        // console.log(mqttDataString);

        // 문자열을 JSON으로 파싱
        try {
          const mqttDataJson = JSON.parse(mqttDataString);
          // console.log("파싱된 데이터:", mqttDataJson);
          console.log("edukit1/vision/data 받음");

          // //    const data = [{"key":"value"}]
          // const serializedData = {
          //   topic: "environment/data",
          //   data: JSON.stringify(mqttDataJson),
          // };

          // //    ws.send(mqttDataJson);
          // ws.send(JSON.stringify(mqttDataJson));
        } catch (error) {
          console.error(error);
        }
      }

      // 2공장 에듀킷 데이터
      if (topic == "edukit2") {
        // MQTT로 수신한 데이터 (Buffer 형식)
        const mqttDataBuffer = message; // 데이터가 담긴 버퍼

        // Buffer를 문자열로 변환
        const mqttDataString = mqttDataBuffer.toString("utf-8");

        // 문자열을 JSON으로 파싱
        try {
          const mqttDataJson = JSON.parse(mqttDataString);
          // console.log("파싱된 데이터:", mqttDataJson);
          console.log("edukit2 받음");

          //    const data = [{"key":"value"}]
          const serializedData = {
            topic: "edukit2",
            data: JSON.stringify(mqttDataJson),
          };

          //    ws.send(mqttDataJson);
          ws.send(JSON.stringify(serializedData));
        } catch (error) {
          console.error(error);
        }
      }

      // 2공장 아두이노 데이터
      if (topic == "edukit2/environment/data") {
        // MQTT로 수신한 데이터 (Buffer 형식)
        const mqttDataBuffer = message; // 데이터가 담긴 버퍼

        // Buffer를 문자열로 변환
        const mqttDataString = mqttDataBuffer.toString("utf-8");

        // 문자열을 JSON으로 파싱
        try {
          const mqttDataJson = JSON.parse(mqttDataString);
          // console.log("파싱된 데이터:", mqttDataJson);
          console.log("edukit2/environment/data 받음");

          //    const data = [{"key":"value"}]
          const serializedData = {
            topic: "edukit2/environment/data",
            data: JSON.stringify(mqttDataJson),
          };

          //    ws.send(mqttDataJson);
          ws.send(JSON.stringify(serializedData));
        } catch (error) {
          console.error(error);
        }
      }

      // 서버 로그데이터
      // 공장 1
      if (topic == "edukit1/log") {
        // MQTT로 수신한 데이터 (Buffer 형식)
        const mqttDataBuffer = message; // 데이터가 담긴 버퍼

        // Buffer를 문자열로 변환
        const mqttDataString = mqttDataBuffer.toString("utf-8");

        // 문자열을 JSON으로 파싱
        try {
          const mqttDataJson = JSON.parse(mqttDataString);
          console.log("파싱된 데이터:", mqttDataJson);
          console.log("edukit1/log 받음");

          //    const data = [{"key":"value"}]
          const serializedData = {
            topic: "edukit1/log",
            data: JSON.stringify(mqttDataJson),
          };

          //    ws.send(mqttDataJson);
          ws.send(JSON.stringify(serializedData));
        } catch (error) {
          console.error(error);
        }
      }

      // 공장 2
      if (topic == "edukit2/log") {
        // MQTT로 수신한 데이터 (Buffer 형식)
        const mqttDataBuffer = message; // 데이터가 담긴 버퍼

        // Buffer를 문자열로 변환
        const mqttDataString = mqttDataBuffer.toString("utf-8");

        // 문자열을 JSON으로 파싱
        try {
          const mqttDataJson = JSON.parse(mqttDataString);
          console.log("파싱된 데이터:", mqttDataJson);
          console.log("edukit2/log 받음");

          //    const data = [{"key":"value"}]
          const serializedData = {
            topic: "edukit2/log",
            data: JSON.stringify(mqttDataJson),
          };

          //    ws.send(mqttDataJson);
          ws.send(JSON.stringify(serializedData));
        } catch (error) {
          console.error(error);
        }
      }

      // 시나리오
      if (topic == "edukit/scenario") {
        // MQTT로 수신한 데이터 (Buffer 형식)
        const mqttDataBuffer = message; // 데이터가 담긴 버퍼

        // Buffer를 문자열로 변환
        const mqttDataString = mqttDataBuffer.toString("utf-8");

        // 문자열을 JSON으로 파싱
        try {
          const mqttDataJson = JSON.parse(mqttDataString);
          console.log("파싱된 데이터:", mqttDataJson);
          console.log("edukit/scenario 받음");

          //    const data = [{"key":"value"}]
          const serializedData = {
            topic: "edukit/scenario",
            data: JSON.stringify(mqttDataJson),
          };

          //    ws.send(mqttDataJson);
          ws.send(JSON.stringify(serializedData));
        } catch (error) {
          console.error(error);
        }
      }
    });

    // // mqtt topic publish
    // // 1공장
    // const topic1 = "edukit1/control";
    // ws.on("message", function (message) {
    //   mqttClient.publish(topic1, message);
    //   console.log("제어 명령:", message);
    // });

    // // 2공장
    // const topic2 = "edukit2/control";
    // ws.on("message", function (message) {
    //   mqttClient.publish(topic2, message);
    //   console.log("제어 명령:", message);
    // });
  });
});

// Express 서버 시작
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
