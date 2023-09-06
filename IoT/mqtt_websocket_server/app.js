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
const mqttClient = mqtt.connect("http://localhost:1883"); // MQTT Broker

mqttClient.on("connect", () => {
  console.log("Connected to MQTT Broker");

  // MQTT Topic에서 메시지를 수신
  mqttClient.subscribe("myEdukit"); // 구독할 MQTT 토픽
});

// WebSocket 연결 및 데이터 전송
wss.on("connection", function connection(ws) {
  console.log("WebSocket 클라이언트 연결됨");

  mqttClient.on("message", function (topic, message) {
    // MQTT로 수신한 데이터 (Buffer 형식)
    const mqttDataBuffer = message; // 데이터가 담긴 버퍼

    // Buffer를 문자열로 변환
    const mqttDataString = mqttDataBuffer.toString("utf-8");

    // 문자열을 JSON으로 파싱
    try {
      const mqttDataJson = JSON.parse(mqttDataString);
      console.log("파싱된 데이터:", mqttDataJson);

      //    const data = [{"key":"value"}]
      const serializedData = JSON.stringify(mqttDataJson);

      //    ws.send(mqttDataJson);
      ws.send(serializedData);
    } catch (error) {
      console.error(error);
    }
  });

  // mqtt topic publish
  const topic = "edukit/control";
  ws.on("message", function (message) {
    mqttClient.publish(topic, message);
  });
});

// Express 서버 시작
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
